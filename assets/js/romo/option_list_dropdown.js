$.fn.romoOptionListDropdown = function() {
  return $.map(this, function(element) {
    return new RomoOptionListDropdown(element);
  });
}

var RomoOptionListDropdown = function(element) {
  this.elem = $(element);

  this.prevValue       = '';
  this.optionListItems = [];

  var selCustomization = this.elem.data('romo-option-list-dropdown-item-selector-customization') || '';
  this.itemSelector    = 'LI[data-romo-option-list-dropdown-item="opt"]:not(.disabled)'+selCustomization;
  this.focusStyleClass = this.elem.data('romo-option-list-focus-style-class');

  this.doInit();
  this._bindElem();

  this.elem.trigger('romoOptionListDropdown:ready', [this]);
}

RomoOptionListDropdown.prototype.bodyElem = function() {
  return this.romoDropdown.bodyElem;
}

RomoOptionListDropdown.prototype.popupElem = function() {
  return this.romoDropdown.popupElem;
}

RomoOptionListDropdown.prototype.selectedItemElem = function() {
  return this.romoDropdown.bodyElem.find('LI.selected');
}

RomoOptionListDropdown.prototype.selectedItemValue = function() {
  // need to use `attr` so it will always read from the DOM
  // using `data` works the first time but does some elem caching or something
  // so it won't work subsequent times.
  return this.elem.attr('data-romo-option-list-dropdown-selected-value');
}

RomoOptionListDropdown.prototype.selectedItemText = function() {
  // need to use `attr` so it will always read from the DOM
  // using `data` works the first time but does some elem caching or something
  // so it won't work subsequent times.
  return this.elem.attr('data-romo-option-list-dropdown-selected-text');
}

RomoOptionListDropdown.prototype.optionFilterValue = function() {
  return this.optionFilterElem.val();
}

RomoOptionListDropdown.prototype.optItemElems = function() {
  return this.romoDropdown.bodyElem.find('LI[data-romo-option-list-dropdown-item="opt"]');
}

RomoOptionListDropdown.prototype.optgroupItemElems = function() {
  return this.romoDropdown.bodyElem.find('LI[data-romo-option-list-dropdown-item="optgroup"]');
}

RomoOptionListDropdown.prototype.doInit = function() {
  // override as needed
}

RomoOptionListDropdown.prototype.doSetNewValue = function(newValue) {
  this.selectedItemElem().removeClass('selected');
  this.romoDropdown.bodyElem.find(
    'LI[data-romo-option-list-dropdown-option-value="'+newValue+'"]'
  ).addClass('selected');
  this.doSetSelectedValueAndText(
    newValue,
    this.selectedItemElem().data('romo-option-list-dropdown-option-display-text')
  );
}

RomoOptionListDropdown.prototype.doSetSelectedValueAndText = function(newValue, newText) {
  // need to use `attr` to persist selected values to the DOM for back button logic
  // to work.  using `data` won't persist changes to DOM and breaks back button logic.
  this.elem.attr('data-romo-option-list-dropdown-selected-value', newValue);
  this.elem.attr('data-romo-option-list-dropdown-selected-text',  newText);

  this.prevValue = newValue;
}

/*
Options are specified as a list of items.  Each 'option' item object
has either display text or html, a value, and can optionally be
selected or disabled.  Each 'optgroup' item object has a label and
a list of items.  Option groups cannot contain other option groups in
their items.

Example:
[ { 'type': 'option', 'value': 'a', 'displayText': 'A', 'displayHtml': 'A' },
  { 'type': 'option', 'value': 'b', 'displayText': 'B', 'displayHtml': 'B', 'selected': true },
  { 'type': 'option', 'value': 'c', 'displayText': 'C', 'displayHtml': 'C', 'disabled': true },
  { 'type': 'optgroup', 'label': 'Numbers', 'items': [
    { 'type': 'option', 'value': '1', 'displayText': '1', 'displayHtml': '<span>1</span>' },
    { 'type': 'option', 'value': '2', 'displayText': '2', 'displayHtml': '<span>2</span>' },
    { 'type': 'option', 'value': '3', 'displayText': '3', 'displayHtml': '<span>3</span>' }
  ] },
  { 'type': 'optgroup', 'label': 'Symbols', 'items': [
    { 'type': 'option', 'value': 'exclamation', 'displayText': '!', 'displayHtml': '<span>!</span>' },
    { 'type': 'option', 'value': 'at',          'displayText': '@', 'displayHtml': '<span>@</span>' },
    { 'type': 'option', 'value': 'pound',       'displayText': '#', 'displayHtml': '<span>#</span>' }
  ] }
]
*/

RomoOptionListDropdown.prototype.doSetListItems = function(itemsList) {
  this.optionListItems = itemsList;
  this.optionListContainer.html(this._buildListElem(itemsList));

  this._updateOptionsListUI();

  this.optionListContainer.find(this.itemSelector).on('mouseenter', $.proxy(this._onItemEnter, this));
  this.optionListContainer.find(this.itemSelector).on('click',      $.proxy(this._onItemClick, this));
}

/* private */

RomoOptionListDropdown.prototype._bindElem = function() {
  this.elem.on('keydown',             $.proxy(this._onElemKeyDown, this));
  this.elem.on('dropdown:popupOpen',  $.proxy(this._onPopupOpen,   this));
  this.elem.on('dropdown:popupClose', $.proxy(this._onPopupClose,  this));

  this.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('romoOptionListDropdown:dropdown:toggle', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('romoOptionListDropdown:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('romoOptionListDropdown:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.elem.on('romoOptionListDropdown:triggerListOptionsUpdate', $.proxy(function(e, highlightOptionElem) {
   this._updateOptionsListUI(highlightOptionElem);
  }, this));

  this.elem.on('romoOptionListDropdown:triggerToggle', $.proxy(function(e) {
    this.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('romoOptionListDropdown:triggerPopupOpen', $.proxy(function(e) {
    this.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('romoOptionListDropdown:triggerPopupClose', $.proxy(function(e) {
    this.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));

  this.elem.on('romoOptionListDropdown:triggerFilterIndicatorStart', $.proxy(function(e) {
    this.optionFilterElem.trigger(
      'indicatorTextInput:triggerIndicatorStart',
      [Romo.getComputedStyle(this.optionFilterElem[0], "height")]
    );
  }, this));
  this.elem.on('romoOptionListDropdown:triggerFilterIndicatorStop', $.proxy(function(e) {
    this.optionFilterElem.trigger('indicatorTextInput:triggerIndicatorStop', []);
  }, this));

  this.romoDropdown = this.elem.romoDropdown()[0];
  this.romoDropdown.doSetPopupZIndex(this.elem);

  this.romoDropdown.popupElem.on('keydown',   $.proxy(this._onElemKeyDown,    this));
  this.romoDropdown.popupElem.on('mousedown', $.proxy(this._onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this._onPopupMouseUp,   this));

  this.romoDropdown.bodyElem.addClass('romo-input-option-list');
  this.romoDropdown.bodyElem.html('');

  if (this.elem.data('romo-option-list-dropdown-no-filter') !== true) {
    this.optionFilterElem = this._buildOptionFilter();
    var optionFilterWrapperElem = $('<div class="romo-option-list-dropdown-filter-wrapper"></div>');
    optionFilterWrapperElem.append(this.optionFilterElem);
    this.romoDropdown.popupElem.prepend(optionFilterWrapperElem);
    this._bindDropdownOptionFilter();
  }

  this.romoDropdown.bodyElem.append($('<div class="romo-option-list-dropdown-container"></div>'));
  this.optionListContainer = this.romoDropdown.bodyElem.find('.romo-option-list-dropdown-container');

  this.doSetListItems([]);
}

RomoOptionListDropdown.prototype._buildListElem = function(itemsList, listClass) {
  var listElem = $('<ul></ul>');

  listElem.addClass(listClass);
  $.each(itemsList, $.proxy(function(idx, item) {
    if (item.type === 'option') {
      listElem.append(this._buildListOptionElem(item));
    } else if (item.type === 'optgroup') {
      listElem.append(this._buildListOptGroupElem(item));
      listElem.append(this._buildListElem(item.items, 'romo-option-list-optgroup'));
    }
  }, this));

  return listElem;
}

RomoOptionListDropdown.prototype._buildListOptionElem = function(item) {
  var itemElem    = $('<li data-romo-option-list-dropdown-item="opt"></li>');
  var value       = item.value       || '';
  var displayText = item.displayText || '';
  var displayHtml = item.displayHtml || item.displayText || '&nbsp;'

  itemElem.attr('data-romo-option-list-dropdown-option-value',        value);
  itemElem.attr('data-romo-option-list-dropdown-option-display-text', displayText);
  itemElem.html(displayHtml);

  if (item.selected === true) {
    itemElem.addClass('selected');
    this.prevValue = value; // the last option marked selected is used
  }
  if (item.disabled === true) {
    itemElem.addClass('disabled');
  }

  return itemElem;
}

RomoOptionListDropdown.prototype._buildListOptGroupElem = function(item) {
  var itemElem = $('<li data-romo-option-list-dropdown-item="optgroup"></li>');

  itemElem.text(item.label);

  return itemElem;
}

RomoOptionListDropdown.prototype._buildOptionFilter = function() {
  var filter = $('<input type="text" size="1" class="romo-option-list-dropdown-filter"></input>');

  if (this.elem.data('romo-option-list-dropdown-filter-placeholder') !== undefined) {
    filter.attr('placeholder', this.elem.data('romo-option-list-dropdown-filter-placeholder'));
  }
  filter.attr('data-romo-indicator-text-input-elem-display',       "block");
  filter.attr('data-romo-indicator-text-input-indicator-position', "right");
  if (this.elem.data('romo-option-list-dropdown-filter-indicator') !== undefined) {
    filter.attr('data-romo-indicator-text-input-indicator', this.elem.data('romo-option-list-dropdown-filter-indicator'));
  }
  if (this.elem.data('romo-option-list-dropdown-filter-indicator-width-px') !== undefined) {
    filter.attr('data-romo-indicator-text-input-indicator-width-px', this.elem.data('romo-option-list-dropdown-filter-indicator-width-px'));
  }
  filter.attr('data-romo-form-disable-enter-submit', "true");
  filter.attr('data-romo-onkey-on', "keydown");

  filter.attr('autocomplete', 'off');

  return filter;
}

RomoOptionListDropdown.prototype._bindDropdownOptionFilter = function() {
  this.optionFilterElem.romoIndicatorTextInput();
  this.optionFilterElem.romoOnkey();

  this.romoDropdown.elem.on('focus', $.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // remove any manual elem focus when elem is actually focused
    this.optionFilterFocused = false;
    this.romoDropdown.elem.removeClass(this.focusStyleClass);
  }, this));
  this.romoDropdown.elem.on('blur', $.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // close the dropdown when elem is blurred
    // remove any manual focus as well
    this.romoDropdown.elem.removeClass(this.focusStyleClass);
    this.blurTimeoutId = setTimeout($.proxy(function() {
      if (this.popupMouseDown !== true && this.optionFilterFocused !== true) {
        this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
  this.optionFilterElem.on('focus', $.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // manually make the elem focused when its filter is focused
    this.optionFilterFocused = true;
    this.romoDropdown.elem.addClass(this.focusStyleClass);
  }, this));
  this.optionFilterElem.on('blur', $.proxy(function(e) {
    // remove any manual elem focus when its filter is blurred
    this.optionFilterFocused = false;
    this.romoDropdown.elem.removeClass(this.focusStyleClass);
  }, this));

  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.optionFilterElem.trigger('indicatorTextInput:triggerPlaceIndicator');
    this.optionFilterElem.focus();
    this._filterOptionElems();
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.optionFilterElem.val('');
    /*
    don't call `_filterOptionElems()` here.  we need to keep the option markup as is
    until the popup is opened again so selecting an option works.  selecting an option
    depends on the selected item elem method which requires the markup to be in place
    */
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClosedByEsc', $.proxy(function(e, dropdown) {
    this.romoDropdown.elem.focus();
  }, this));
  this.optionFilterElem.on('click', $.proxy(function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  }, this));
  this.romoDropdown.popupElem.on('click', $.proxy(function(e) {
    this.optionFilterElem.focus();
  }, this));

  this.onkeySearchTimeout = undefined;
  this.onkeySearchDelay   = 100; // 0.1 secs, want it to be really responsive

  this.optionFilterElem.on('onkey:trigger', $.proxy(function(e, triggerEvent, onkey) {
    // TODO: incorp this timeout logic into the onkey component so don't have to repeat it
    clearTimeout(this.onkeySearchTimeout);
    this.onkeySearchTimeout = setTimeout($.proxy(function() {
      if (Romo.nonInputTextKeyCodes().indexOf(triggerEvent.keyCode) === -1 /* Input Text */) {
        this._filterOptionElems();
      }
    }, this), this.onkeySearchDelay);
  }, this));
}

RomoOptionListDropdown.prototype._filterOptionElems = function() {
  this.elem.trigger('romoOptionListDropdown:filterChange', [this.optionFilterElem.val(), this]);
}

RomoOptionListDropdown.prototype._updateOptionsListUI = function(highlightOptionElem) {
  this.romoDropdown.doPlacePopupElem();
  if (highlightOptionElem !== undefined) {
    this._highlightItem(highlightOptionElem);
    this._scrollTopToItem(highlightOptionElem);
  } else {
    this._highlightItem(this.selectedItemElem());
    this._scrollTopToItem(this.selectedItemElem());
  }
}

RomoOptionListDropdown.prototype._selectHighlightedItem = function() {
  var curr = this._getHighlightedItemElem();
  if (curr.length !== 0) {
    var prevValue = this.prevValue;
    var newValue  = curr.data('romo-option-list-dropdown-option-value');

    this.romoDropdown.doPopupClose();
    this.elem.trigger('romoOptionListDropdown:itemSelected', [newValue, prevValue, this]);

    if (newValue !== prevValue) {
      this.doSetNewValue(newValue);
      this.elem.trigger('romoOptionListDropdown:change', [newValue, prevValue, this]);
    }
  }
}

RomoOptionListDropdown.prototype._onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this._highlightItem(this.selectedItemElem());
    this._scrollTopToItem(this.selectedItemElem());
  }
  $('body').on('keydown', $.proxy(this._onPopupOpenBodyKeyDown, this));
}

RomoOptionListDropdown.prototype._onPopupClose = function(e) {
  this._highlightItem($());
  $('body').off('keydown', $.proxy(this._onPopupOpenBodyKeyDown, this));
}

RomoOptionListDropdown.prototype._onItemEnter = function(e) {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this._highlightItem($(e.target));
}

RomoOptionListDropdown.prototype._onItemClick = function(e) {
  if (this.blurTimeoutId !== undefined) {
    clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = undefined;
  }
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this._selectHighlightedItem();
}

RomoOptionListDropdown.prototype._onPopupMouseDown = function(e) {
  this.popupMouseDown = true;
}

RomoOptionListDropdown.prototype._onPopupMouseUp = function(e) {
  this.popupMouseDown = false;
}

RomoOptionListDropdown.prototype._onPopupOpenBodyKeyDown = function(e) {
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
    this._selectHighlightedItem();
    return false;
  } else if (e.keyCode === 9 /* Tab */ ) {
    e.preventDefault();
    return false;
  } else {
    return true;
  }
}

RomoOptionListDropdown.prototype._onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open') === false) {
      if (e.keyCode === 40 /* Down */  || e.keyCode === 38 /* Up */) {
        this.romoDropdown.doPopupOpen();
        return false;
      } else if (this.optionFilterElem !== undefined &&
                 Romo.nonInputTextKeyCodes().indexOf(e.keyCode) === -1 /* Input Text */)  {
        if (e.metaKey === false) {
          // don't prevent default on Cmd-* keys (preserve Cmd-R refresh, etc)
          e.preventDefault();
          this.optionFilterElem.val(e.key);
          this.romoDropdown.doPopupOpen();
        }
        e.stopPropagation();
        return true;
      } else {
        return true;
      }
    }
  }
  return true;
}

RomoOptionListDropdown.prototype._scrollTopToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = item.height() / 2;

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoOptionListDropdown.prototype._scrollBottomToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = scroll[0].offsetHeight - item.height();

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoOptionListDropdown.prototype._nextListItem = function() {
  var curr = this._getHighlightedItemElem();
  if (curr.length === 0) {
    return curr;
  }
  var next = Romo.selectNext(curr, this.itemSelector+', UL.romo-option-list-optgroup');
  if (next.length === 0) {
    // curr is either the last ungrouped opt elem in the overall
    // list OR is the last opt elem in a grouped list.

    // if the hightlighted opt elem is in an opt group list, use
    // its list as the reference elem.  otherwise keep using the
    // hightlighted opt elem itself.
    curr = curr.closest('UL.romo-option-list-optgroup') || curr;
    next = Romo.selectNext(curr, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  while (next.hasClass('romo-option-list-optgroup') && next.children().size() === 0) {
    // keep trying until you find a opt group list with options or an option or nothing
    curr = next;
    next = Romo.selectNext(curr, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  if (next.length === 0) {
    // curr is the last opt elem (grouped or not) in the overall
    // list.  get the the first opt elem in the overall list
    next = this.romoDropdown.bodyElem.find(this.itemSelector).first();
  } else if (next.hasClass('romo-option-list-optgroup')) {
    // curr (grouped or not) is before an opt group list. get
    // the first opt elem in that list.
    next = next.find(this.itemSelector).first();
  }
  // otherwise curr (grouped or not) is before an opt elem.
  // use that opt elem.

  return next;
}

RomoOptionListDropdown.prototype._prevListItem = function() {
  var curr = this._getHighlightedItemElem();
  if (curr.length === 0) {
    return curr;
  }

  var prev = Romo.selectPrev(curr, this.itemSelector+', UL.romo-option-list-optgroup');
  if (prev.length === 0) {
    // curr is either the first ungrouped opt elem in the overall
    // list OR is the first opt elem in a grouped list

    // if the hightlighted opt elem is in an opt group list, use
    // its list as the reference elem.  otherwise keep using the
    // hightlighted opt elem itself.
    curr = curr.closest('UL.romo-option-list-optgroup') || curr;
    prev = Romo.selectPrev(curr, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  while (prev.hasClass('romo-option-list-optgroup') && prev.children().size() === 0) {
    // keep trying until you find a opt group list with options or an option or nothing
    curr = prev;
    prev = Romo.selectPrev(curr, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  if (prev.length === 0) {
    // curr is the first opt elem (grouped or not) in the overall
    // list.  get the the last opt elem in the overall list
    prev = this.romoDropdown.bodyElem.find(this.itemSelector).last();
  } else if (prev.hasClass('romo-option-list-optgroup')) {
    // curr (grouped or not) is after an opt group list.  get
    // the last opt elem in that list.
    prev = prev.find(this.itemSelector).last();
  }
  // otherwise curr (grouped or not) is after an opt elem.
  // use that opt elem.

  return prev;
}

RomoOptionListDropdown.prototype._highlightItem = function(item) {
  this._getHighlightedItemElem().removeClass('romo-option-list-dropdown-highlight');
  item.addClass('romo-option-list-dropdown-highlight');
}

RomoOptionListDropdown.prototype._getHighlightedItemElem = function() {
  return this.romoDropdown.bodyElem.find('LI.romo-option-list-dropdown-highlight');
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-option-list-dropdown-auto="true"]').romoOptionListDropdown();
});
