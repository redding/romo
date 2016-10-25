$.fn.romoSelectDropdown = function(optionElemsParent) {
  return $.map(this, function(element) {
    return new RomoSelectDropdown(element, optionElemsParent);
  });
}

var RomoSelectDropdown = function(element, optionElemsParent) {
  this.elem         = $(element);
  this.itemSelector = 'LI[data-romo-select-item="opt"]:not(.disabled)';
  this.prevValue    = '';

  var optsParent   = (optionElemsParent || this.elem.find('.romo-select-dropdown-options-parent'));
  this.optionElems = optsParent.children();
  this.optionList  = this._buildOptionList(this.optionElems);

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
  this.romoDropdown.elem.on('blur', $.proxy(function(e) {
    this.blurTimeoutId = setTimeout($.proxy(function() {
      if (this.popupMouseDown !== true) {
        this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
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
  this.romoDropdown.bodyElem.append(this.optionList);

  this.romoDropdown.bodyElem.find(this.itemSelector).on('mouseenter', $.proxy(this.onItemEnter, this));
  this.romoDropdown.bodyElem.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.popupElem.on('mousedown', $.proxy(this.onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this.onPopupMouseUp, this));
}

RomoSelectDropdown.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.prevValue;
  var newValue  = this.romoDropdown.bodyElem.find('LI.romo-select-highlight').data('romo-select-option-value');

  this.romoDropdown.doPopupClose();
  this.elem.trigger('selectDropdown:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this.doSetNewValue(newValue);
    this.elem.trigger('selectDropdown:change', [newValue, prevValue, this]);
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
  } else {
    return true;
  }
}

RomoSelectDropdown.prototype.onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open') === false) {
      if(e.keyCode === 40 /* Down */ ) {
        this.romoDropdown.doPopupOpen();
        return false;
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

RomoSelectDropdown.prototype._nextListItem = function() {
  var listOrItemSelector = 'UL, '+this.itemSelector;
  var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
  var next = this._nextAll(curr, listOrItemSelector).first();

  if (next.size() === 0) {
    next = this._nextAll(curr.closest('UL'), listOrItemSelector).first();
  }
  if (next.size() !== 0 && next[0].tagName === 'UL') {
    next = next.find(this.itemSelector).first()
  }
  if (next.size() === 0) {
    next = this.romoDropdown.bodyElem.find(this.itemSelector).first();
  }
  return next;
}

RomoSelectDropdown.prototype._prevListItem = function() {
  var listOrItemSelector = 'UL, '+this.itemSelector;
  var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
  var prev = this._prevAll(curr, listOrItemSelector).last();

  if (prev.size() === 0) {
    prev = this._prevAll(curr.closest('UL'), listOrItemSelector).last();
  }
  if (prev.size() !== 0 && prev[0].tagName === 'UL') {
    prev = prev.find(this.itemSelector).last()
  }
  if (prev.size() === 0) {
    prev = this.romoDropdown.bodyElem.find(this.itemSelector).last();
  }
  return prev;
}

RomoSelectDropdown.prototype._nextAll = function(elem, selector) {
  var els = $();
  var el = elem.next();
  while( el.length ) {
    if (selector === undefined || el.is(selector)) {
      els = els.add(el);
    }
    el = el.next();
  }
  return els;
}

RomoSelectDropdown.prototype._prevAll = function(elem, selector) {
  var els = $();
  var el = elem.prev();
  while( el.length ) {
    if (selector === undefined || el.is(selector)) {
      els = els.add(el);
    }
    el = el.prev();
  }
  return els;
}

RomoSelectDropdown.prototype._highlightItem = function(item) {
  this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
  item.addClass('romo-select-highlight');
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-dropdown-auto="true"]').romoSelectDropdown();
});
