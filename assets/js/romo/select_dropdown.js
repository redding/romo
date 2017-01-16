$.fn.romoSelectDropdown = function(optionElemsParent) {
  return $.map(this, function(element) {
    return new RomoSelectDropdown(element, optionElemsParent);
  });
}

var RomoSelectDropdown = function(element, optionElemsParent) {
  this.elem      = $(element);
  this.prevValue = '';

  this.filterHiddenClass = 'romo-select-filter-hidden';
  this.itemSelector      = 'LI[data-romo-select-item="opt"]:not(.disabled):not(.'+this.filterHiddenClass+')';

  var optsParent    = (optionElemsParent || this.elem.find('.romo-select-dropdown-options-parent'));
  this.optionElems  = optsParent.children();
  this.optionList   = this._buildOptionList(this.optionElems);
  this.optionFilter = undefined;

  this.doInit();
  this.doBindDropdown();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.elem.focus();
    }, this));
  }

  this.elem.trigger('selectDropdown:ready', [this]);
}

RomoSelectDropdown.prototype.selectedListing = function() {
  return this.romoDropdown.bodyElem.find('LI.selected');
}

RomoSelectDropdown.prototype.doInit = function() {
  // override as needed
}

RomoSelectDropdown.prototype.doSetNewValue = function(newValue) {
  this.selectedListing().removeClass('selected');
  this.romoDropdown.bodyElem.find('LI[data-romo-select-option-value="'+newValue+'"]').addClass('selected');

  this.prevValue = newValue;
}

RomoSelectDropdown.prototype.doBindDropdown = function() {
  this.romoDropdown = this.elem.romoDropdown()[0];
  this.romoDropdown.doSetPopupZIndex(this.elem);
  this.romoDropdown.bodyElem.addClass('romo-select-option-list');

  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));

  this.romoDropdown.elem.on('keydown', $.proxy(this.onElemKeyDown, this));
  this.romoDropdown.popupElem.on('keydown', $.proxy(this.onElemKeyDown, this));

  this.romoDropdown.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.elem.on('selectDropdown:triggerToggle', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('selectDropdown:triggerPopupOpen', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('selectDropdown:triggerPopupClose', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));

  this.romoDropdown.bodyElem.html('');

  if (this.elem.data('romo-select-dropdown-no-filter') !== true) {
    this.optionFilter = this._buildOptionFilter();
    var optionFilterWrapper = $('<div class="romo-select-dropdown-option-filter-wrapper"></div>');
    optionFilterWrapper.append(this.optionFilter);
    this.romoDropdown.popupElem.prepend(optionFilterWrapper);
    this.doBindDropdownOptionFilter();
  }

  this.romoDropdown.bodyElem.append(this.optionList);

  this.romoDropdown.bodyElem.find(this.itemSelector).on('mouseenter', $.proxy(this.onItemEnter, this));
  this.romoDropdown.bodyElem.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.popupElem.on('mousedown', $.proxy(this.onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this.onPopupMouseUp, this));
}

RomoSelectDropdown.prototype.doBindDropdownOptionFilter = function() {
  this.optionFilter.romoIndicatorTextInput();
  this.optionFilter.romoOnkey();

  this.romoDropdown.elem.on('focus', $.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // remove any manual elem focus when elem is actually focused
    this.optionFilterFocused = false;
    this.romoDropdown.elem.removeClass('romo-select-focus');
  }, this));
  this.romoDropdown.elem.on('blur', $.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // close the dropdown when elem is blurred
    // remove any manual focus as well
    this.romoDropdown.elem.removeClass('romo-select-focus');
    this.blurTimeoutId = setTimeout($.proxy(function() {
      if (this.popupMouseDown !== true && this.optionFilterFocused !== true) {
        this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
  this.optionFilter.on('focus', $.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // manually make the elem focused when its filter is focused
    this.optionFilterFocused = true;
    this.romoDropdown.elem.addClass('romo-select-focus');
  }, this));
  this.optionFilter.on('blur', $.proxy(function(e) {
    // remove any manual elem focus when its filter is blurred
    this.optionFilterFocused = false;
    this.romoDropdown.elem.removeClass('romo-select-focus');
  }, this));

  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.optionFilter.trigger('indicatorTextInput:triggerPlaceIndicator');
    this.optionFilter.focus();
    this.doFilterOptionElems();
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.optionFilter.val('');
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClosedByEsc', $.proxy(function(e, dropdown) {
    this.romoDropdown.elem.focus();
  }, this));
  this.optionFilter.on('click', $.proxy(function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  }, this));
  this.romoDropdown.popupElem.on('click', $.proxy(function(e) {
    this.optionFilter.focus();
  }, this));

  this.onkeySearchTimeout = undefined;
  this.onkeySearchDelay   = 100; // 0.1 secs, want it to be really responsive

  this.optionFilter.on('onkey:trigger', $.proxy(function(e, triggerEvent, onkey) {
    // TODO: incorp this timeout logic into the onkey component so don't have to repeat it
    clearTimeout(this.onkeySearchTimeout);
    this.onkeySearchTimeout = setTimeout($.proxy(function() {
      if (Romo.nonInputTextKeyCodes().indexOf(triggerEvent.keyCode) === -1 /* Input Text */) {
        this.doFilterOptionElems();
      }
    }, this), this.onkeySearchDelay);
  }, this));
}

RomoSelectDropdown.prototype.doFilterOptionElems = function() {
  var wbFilter = new RomoWordBoundaryFilter(
    this.optionFilter.val(),
    this.romoDropdown.bodyElem.find('LI[data-romo-select-item="opt"]'),
    function(elem) {
      return elem[0].textContent;
    }
  );

  wbFilter.matchingElems.show();
  wbFilter.notMatchingElems.hide();
  wbFilter.matchingElems.removeClass(this.filterHiddenClass);
  wbFilter.notMatchingElems.addClass(this.filterHiddenClass);

  this.romoDropdown.doPlacePopupElem();
  if (this.optionFilter.val() !== '') {
    this._highlightItem(wbFilter.matchingElems.first());
    this._scrollTopToItem(wbFilter.matchingElems.first());
  } else {
    this._highlightItem(this.selectedListing());
    this._scrollTopToItem(this.selectedListing());
  }
}

RomoSelectDropdown.prototype.doSelectHighlightedItem = function() {
  var curr = this._getHighlightedItem();
  if (curr.length !== 0) {
    var prevValue = this.prevValue;
    var newValue  = curr.data('romo-select-option-value');

    this.romoDropdown.doPopupClose();
    this.elem.trigger('selectDropdown:itemSelected', [newValue, prevValue, this]);

    if (newValue !== prevValue) {
      this.doSetNewValue(newValue);
      this.elem.trigger('selectDropdown:change', [newValue, prevValue, this]);
    }
  }
}

RomoSelectDropdown.prototype.onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this._highlightItem(this.selectedListing());
    this._scrollTopToItem(this.selectedListing());
  }
  $('body').on('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelectDropdown.prototype.onPopupClose = function(e) {
  this._highlightItem($());
  $('body').off('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelectDropdown.prototype.onItemEnter = function(e) {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this._highlightItem($(e.target));
}

RomoSelectDropdown.prototype.onItemClick = function(e) {
  if (this.blurTimeoutId !== undefined) {
    clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = undefined;
  }
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this.doSelectHighlightedItem();
}

RomoSelectDropdown.prototype.onPopupMouseDown = function(e) {
  this.popupMouseDown = true;
}

RomoSelectDropdown.prototype.onPopupMouseUp = function(e) {
  this.popupMouseDown = false;
}

RomoSelectDropdown.prototype.onPopupOpenBodyKeyDown = function(e) {
  if (e !== undefined) {
    e.stopPropagation();
  }

  var scroll = this.romoDropdown.bodyElem;

  if (e.keyCode === 38 /* Up */) {
    var prev = this._prevListItem();

    this._highlightItem(prev);
    if (scroll.offset().top > prev.offset().top) {
      this._scrollTopToItem(prev);
    } else if ((scroll.offset().top + scroll.height()) < prev.offset().top) {
      this._scrollTopToItem(prev);
    }

    return false;
  } else if(e.keyCode === 40 /* Down */) {
    var next = this._nextListItem();

    this._highlightItem(next);
    if ((scroll.offset().top + scroll.height()) < next.offset().top + next.height()) {
      this._scrollBottomToItem(next);
    } else if (scroll.offset().top > next.offset().top) {
      this._scrollTopToItem(next);
    }

    return false;
  } else if (e.keyCode === 13 /* Enter */ ) {
    this.doSelectHighlightedItem();
    return false;
  } else if (e.keyCode === 9 /* Tab */ ) {
    e.preventDefault();
    return false;
  } else {
    return true;
  }
}

RomoSelectDropdown.prototype.onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open') === false) {
      if (e.keyCode === 40 /* Down */  || e.keyCode === 38 /* Up */) {
        this.romoDropdown.doPopupOpen();
        return false;
      } else if (this.optionFilter !== undefined &&
                 Romo.nonInputTextKeyCodes().indexOf(e.keyCode) === -1 /* Input Text */)  {
        if (e.metaKey === false) {
          // don't prevent default on Cmd-* keys (preserve Cmd-R refresh, etc)
          e.preventDefault();
        }
        e.stopPropagation();
        this.optionFilter.val(e.key);
        this.romoDropdown.doPopupOpen();
        return true;
      } else {
        return true;
      }
    }
  }
  return true;
}

RomoSelectDropdown.prototype._scrollTopToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = item.height() / 2;

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelectDropdown.prototype._scrollBottomToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = scroll[0].offsetHeight - item.height();

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelectDropdown.prototype._buildOptionList = function(optionElems, listClass) {
  var list = $('<ul></ul>');
  list.addClass(listClass);
  $.each(optionElems, $.proxy(function(idx, elem) {
    if (elem.tagName === "OPTION") {
      list.append(this._buildOptionListItem(elem));
    } else if (elem.tagName === "OPTGROUP") {
      list.append(this._buildOptGroupListItem(elem));
      list.append(this._buildOptionList($(elem).children(), 'romo-select-optgroup'));
    }
  }, this));
  return list;
}

RomoSelectDropdown.prototype._buildOptionListItem = function(optionElem) {
  var opt   = $(optionElem);
  var item  = $('<li data-romo-select-item="opt"></li>');
  var value = opt.attr('value') || '';

  item.attr('data-romo-select-option-value', value);
  item.html(opt.text().trim() || '&nbsp;');
  if (opt.prop('selected')) {
    item.addClass('selected');
    this.prevValue = value; // the last option marked selected is used
  }
  if (opt.attr('disabled') !== undefined) {
    item.addClass('disabled');
  }

  return item;
}

RomoSelectDropdown.prototype._buildOptGroupListItem = function(optGroupElem) {
  var optgroup = $(optGroupElem);
  var item = $('<li data-romo-select-item="optgroup"></li>');

  item.text(optgroup.attr('label'));

  return item;
}

RomoSelectDropdown.prototype._buildOptionFilter = function() {
  var filter = $('<input type="text" class="romo-select-dropdown-option-filter"></input>');

  if (this.elem.data('romo-select-dropdown-filter-placeholder') !== undefined) {
    filter.attr('placeholder', this.elem.data('romo-select-dropdown-filter-placeholder'));
  }
  filter.attr('data-romo-indicator-text-input-elem-display', "block");
  filter.attr('data-romo-indicator-text-input-indicator-position', "right");
  if (this.elem.data('romo-select-dropdown-filter-indicator') !== undefined) {
    filter.attr('data-romo-indicator-text-input-indicator', this.elem.data('romo-select-dropdown-filter-indicator'));
  }
  if (this.elem.data('romo-select-dropdown-filter-indicator-width-px') !== undefined) {
    filter.attr('data-romo-indicator-text-input-indicator-width-px', this.elem.data('romo-select-dropdown-filter-indicator-width-px'));
  }
  filter.attr('data-romo-form-disable-enter-submit', "true");
  filter.attr('data-romo-onkey-on', "keydown");

  filter.attr('autocomplete', 'off');

  return filter;
}

RomoSelectDropdown.prototype._nextListItem = function() {
  var curr = this._getHighlightedItem();
  if (curr.length === 0) {
    return curr;
  }
  var currList = curr.closest('UL');
  var next     = Romo.selectNext(curr, this.itemSelector);

  while (next.length === 0) {
    currList = Romo.selectNext(currList, 'UL');
    if (currList.length !== 0) {
      next = currList.find(this.itemSelector).first();
    } else {
      next = this.romoDropdown.bodyElem.find(this.itemSelector).first();
    }
  }
  return next;
}

RomoSelectDropdown.prototype._prevListItem = function() {
  var curr = this._getHighlightedItem();
  if (curr.length === 0) {
    return curr;
  }
  var currList = curr.closest('UL');
  var prev     = Romo.selectPrev(curr, this.itemSelector);

  while (prev.length === 0) {
    currList = Romo.selectPrev(currList, 'UL');
    if (currList.length !== 0) {
      prev = currList.find(this.itemSelector).last();
    } else {
      prev = this.romoDropdown.bodyElem.find(this.itemSelector).last();
    }
  }
  return prev;
}

RomoSelectDropdown.prototype._highlightItem = function(item) {
  this._getHighlightedItem().removeClass('romo-select-highlight');
  item.addClass('romo-select-highlight');
}

RomoSelectDropdown.prototype._getHighlightedItem = function() {
  return this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-dropdown-auto="true"]').romoSelectDropdown();
});
