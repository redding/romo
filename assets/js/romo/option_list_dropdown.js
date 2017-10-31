var RomoOptionListDropdown = function(elem) {
  this.elem = elem;

  this.prevValue       = '';
  this.optionListItems = [];

  var selCustomization = Romo.data(this.elem, 'romo-option-list-dropdown-item-selector-customization') || '';
  this.itemSelector    = 'LI[data-romo-option-list-dropdown-item="opt"]:not(.disabled)'+selCustomization;
  this.focusStyleClass = Romo.data(this.elem, 'romo-option-list-focus-style-class');
  this.openOnFocus     = Romo.data(this.elem, 'romo-option-list-dropdown-open-on-focus');

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoOptionListDropdown:ready', [this]);
}

RomoOptionListDropdown.prototype.bodyElem = function() {
  return this.romoDropdown.bodyElem;
}

RomoOptionListDropdown.prototype.popupElem = function() {
  return this.romoDropdown.popupElem;
}

RomoOptionListDropdown.prototype.popupOpen = function() {
  return this.romoDropdown.popupOpen();
}

RomoOptionListDropdown.prototype.popupClosed = function() {
  return this.romoDropdown.popupClosed();
}

RomoOptionListDropdown.prototype.selectedItemElem = function() {
  return Romo.find(this.romoDropdown.bodyElem, 'LI.selected')[0];
}

RomoOptionListDropdown.prototype.selectedItemValue = function() {
  return Romo.data(this.elem, 'romo-option-list-dropdown-selected-value');
}

RomoOptionListDropdown.prototype.selectedItemText = function() {
  return Romo.data(this.elem, 'romo-option-list-dropdown-selected-text');
}

RomoOptionListDropdown.prototype.optionFilterValue = function() {
  return this.optionFilterElem.value;
}

RomoOptionListDropdown.prototype.optItemElems = function() {
  return Romo.find(this.romoDropdown.bodyElem, 'LI[data-romo-option-list-dropdown-item="opt"]');
}

RomoOptionListDropdown.prototype.optgroupItemElems = function() {
  return Romo.find(this.romoDropdown.bodyElem, 'LI[data-romo-option-list-dropdown-item="optgroup"]');
}

RomoOptionListDropdown.prototype.doInit = function() {
  // override as needed
}

RomoOptionListDropdown.prototype.doSetSelectedItem = function(itemValue) {
  var oldSelectedElem = this.selectedItemElem();
  if (oldSelectedElem !== undefined) {
    Romo.removeClass(oldSelectedElem, 'selected');
  }
  if (itemValue !== undefined) {
    var itemElem = Romo.find(
      this.romoDropdown.bodyElem,
      'LI[data-romo-option-list-dropdown-option-value="'+itemValue+'"]'
    )[0];
    Romo.addClass(itemElem, 'selected');
  }
  var selectedElem = this.selectedItemElem();
  if (selectedElem !== undefined) {
    this.doSetSelectedValueAndText(
      Romo.data(selectedElem, 'romo-option-list-dropdown-option-value'),
      Romo.data(selectedElem, 'romo-option-list-dropdown-option-display-text')
    );
  } else {
    this.doSetSelectedValueAndText('', '');
  }
}

RomoOptionListDropdown.prototype.doSetSelectedValueAndText = function(value, text) {
  Romo.setData(this.elem, 'romo-option-list-dropdown-selected-value', value);
  Romo.setData(this.elem, 'romo-option-list-dropdown-selected-text',  text);

  this.prevValue = value;
}

RomoOptionListDropdown.prototype.doFocus = function(openOnFocus) {
  if (openOnFocus === true) {
    this.openOnFocus = true;
  } else if (openOnFocus === false) {
    this.openOnFocus = false;
  }
  this.elem.focus();
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
  Romo.update(this.optionListContainerElem, this._buildListElem(itemsList));

  this._updateOptionsListUI();

  var itemElems = Romo.find(this.optionListContainerElem, this.itemSelector);
  Romo.on(itemElems, 'mouseenter', Romo.proxy(this._onItemEnter, this));
  Romo.on(itemElems, 'click',      Romo.proxy(this._onItemClick, this));
}

/* private */

RomoOptionListDropdown.prototype._bindElem = function() {
  Romo.on(this.elem, 'keydown',                 Romo.proxy(this._onElemKeyDown, this));
  Romo.on(this.elem, 'romoDropdown:popupOpen',  Romo.proxy(this._onPopupOpen,   this));
  Romo.on(this.elem, 'romoDropdown:popupClose', Romo.proxy(this._onPopupClose,  this));

  Romo.on(this.elem, 'romoDropdown:toggle', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoOptionListDropdown:romoDropdown:toggle', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:popupOpen', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoOptionListDropdown:romoDropdown:popupOpen', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:popupClose', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoOptionListDropdown:romoDropdown:popupClose', [romoDropdown, this]);
  }, this));

  Romo.on(this.elem, 'romoOptionListDropdown:triggerListOptionsUpdate', Romo.proxy(function(e, highlightOptionElem) {
   this._updateOptionsListUI(highlightOptionElem);
  }, this));

  Romo.on(this.elem, 'romoOptionListDropdown:triggerToggle', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoDropdown:triggerToggle', []);
  }, this));
  Romo.on(this.elem, 'romoOptionListDropdown:triggerPopupOpen', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoDropdown:triggerPopupOpen', []);
  }, this));
  Romo.on(this.elem, 'romoOptionListDropdown:triggerPopupClose', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoDropdown:triggerPopupClose', []);
  }, this));

  Romo.on(this.elem, 'romoOptionListDropdown:triggerFilterSpinnerStart', Romo.proxy(function(e) {
    Romo.trigger(
      this.optionFilterElem,
      'romoIndicatorTextInput:triggerSpinnerStart',
      [Romo.css(this.optionFilterElem, "height")]
    );
  }, this));
  Romo.on(this.elem, 'romoOptionListDropdown:triggerFilterSpinnerStop', Romo.proxy(function(e) {
    Romo.trigger(this.optionFilterElem, 'romoIndicatorTextInput:triggerSpinnerStop', []);
  }, this));

  this.romoDropdown = new RomoDropdown(this.elem);
  this.romoDropdown.doSetPopupZIndex(this.elem);

  Romo.on(this.romoDropdown.popupElem, 'keydown',   Romo.proxy(this._onElemKeyDown,    this));
  Romo.on(this.romoDropdown.popupElem, 'mousedown', Romo.proxy(this._onPopupMouseDown, this));
  Romo.on(this.romoDropdown.popupElem, 'mouseup',   Romo.proxy(this._onPopupMouseUp,   this));

  Romo.addClass(this.romoDropdown.bodyElem, 'romo-input-option-list');
  Romo.updateHtml(this.romoDropdown.bodyElem, '');

  if (Romo.data(this.elem, 'romo-option-list-dropdown-no-filter') !== true) {
    this.optionFilterElem = this._buildOptionFilter();
    var optionFilterWrapperElem = Romo.elems('<div class="romo-option-list-dropdown-filter-wrapper"></div>')[0];
    optionFilterWrapperElem.append(this.optionFilterElem);
    Romo.prepend(this.romoDropdown.popupElem, optionFilterWrapperElem);
    this._bindDropdownOptionFilter();
  }

  this.romoDropdown.bodyElem.append(Romo.elems('<div class="romo-option-list-dropdown-container"></div>')[0]);
  this.optionListContainerElem = Romo.find(this.romoDropdown.bodyElem, '.romo-option-list-dropdown-container')[0];

  this.doSetListItems([]);
}

RomoOptionListDropdown.prototype._buildListElem = function(itemsList, listClass) {
  var listElem = Romo.elems('<ul></ul>')[0];

  if (listClass !== undefined) {
    Romo.addClass(listElem, listClass);
  }
  itemsList.forEach(Romo.proxy(function(item) {
    if (item.type === 'option') {
      Romo.append(listElem, this._buildListOptionElem(item));
    } else if (item.type === 'optgroup') {
      Romo.append(listElem, this._buildListOptGroupElem(item));
      Romo.append(listElem, this._buildListElem(item.items, 'romo-option-list-optgroup'));
    }
  }, this));

  return listElem;
}

RomoOptionListDropdown.prototype._buildListOptionElem = function(item) {
  var itemElem    = Romo.elems('<li data-romo-option-list-dropdown-item="opt"></li>')[0];
  var value       = item.value       || '';
  var displayText = item.displayText || '';
  var displayHtml = item.displayHtml || item.displayText || '<span>&nbsp;</span>'

  Romo.setData(itemElem, 'romo-option-list-dropdown-option-value',        value);
  Romo.setData(itemElem, 'romo-option-list-dropdown-option-display-text', displayText);

  var displayElems = Romo.elems(displayHtml);
  if (displayElems.length !== 0) {
    Romo.update(itemElem, displayElems);
  } else {
    Romo.updateText(itemElem, displayHtml);
  }

  if (item.selected === true) {
    Romo.addClass(itemElem, 'selected');
    this.prevValue = value; // the last option marked selected is used
  }
  if (item.disabled === true) {
    Romo.addClass(itemElem, 'disabled');
  }

  return itemElem;
}

RomoOptionListDropdown.prototype._buildListOptGroupElem = function(item) {
  var itemElem = Romo.elems('<li data-romo-option-list-dropdown-item="optgroup"></li>')[0];
  Romo.updateText(itemElem, item.label);

  return itemElem;
}

RomoOptionListDropdown.prototype._buildOptionFilter = function() {
  var filterElem = Romo.elems('<input type="text" size="1" class="romo-option-list-dropdown-filter"></input>')[0];

  if (Romo.data(this.elem, 'romo-option-list-dropdown-filter-placeholder') !== undefined) {
    Romo.setAttr(filterElem, 'placeholder', Romo.data(this.elem, 'romo-option-list-dropdown-filter-placeholder'));
  }
  Romo.setData(filterElem, 'romo-indicator-text-input-elem-display',       "block");
  Romo.setData(filterElem, 'romo-indicator-text-input-indicator-position', "right");
  if (Romo.data(this.elem, 'romo-option-list-dropdown-filter-indicator') !== undefined) {
    Romo.setData(filterElem, 'romo-indicator-text-input-indicator', Romo.data(this.elem, 'romo-option-list-dropdown-filter-indicator'));
  }
  if (Romo.data(this.elem, 'romo-option-list-dropdown-filter-indicator-width-px') !== undefined) {
    Romo.setData(filterElem, 'romo-indicator-text-input-indicator-width-px', Romo.data(this.elem, 'romo-option-list-dropdown-filter-indicator-width-px'));
  }
  Romo.setData(filterElem, 'romo-form-disable-enter-submit', "true");
  Romo.setData(filterElem, 'romo-onkey-on',                  "keydown");
  Romo.setData(filterElem, 'romo-onkey-delay-ms',            100); // 0.1 secs, want it to be really responsive

  Romo.setAttr(filterElem, 'autocomplete', 'off');

  return filterElem;
}

RomoOptionListDropdown.prototype._bindDropdownOptionFilter = function() {
  this.romoIndicatorTextInput = new RomoIndicatorTextInput(this.optionFilterElem);
  new RomoOnkey(this.optionFilterElem);

  Romo.on(this.romoDropdown.elem, 'focus', Romo.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // remove any manual elem focus when elem is actually focused
    this.optionFilterFocused = false;
    Romo.removeClass(this.romoDropdown.elem, this.focusStyleClass);

    if (this.openOnFocus === true) {
      Romo.trigger(this.romoDropdown.elem, 'romoDropdown:triggerPopupOpen', []);
    } else {
      this.openOnFocus = Romo.data(this.elem, 'romo-option-list-dropdown-open-on-focus');
    }
  }, this));
  Romo.on(this.romoDropdown.elem, 'blur', Romo.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // close the dropdown when elem is blurred
    // remove any manual focus as well
    Romo.removeClass(this.romoDropdown.elem, this.focusStyleClass);
    this.blurTimeoutId = setTimeout(Romo.proxy(function() {
      if (this.popupMouseDown !== true && this.optionFilterFocused !== true) {
        Romo.trigger(this.romoDropdown.elem, 'romoDropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
  Romo.on(this.optionFilterElem, 'focus', Romo.proxy(function(e) {
    if (this.blurTimeoutId !== undefined) {
      clearTimeout(this.blurTimeoutId);
    }
    // manually make the elem focused when its filter is focused
    this.optionFilterFocused = true;
    Romo.addClass(this.romoDropdown.elem, this.focusStyleClass);
  }, this));
  Romo.on(this.optionFilterElem, 'blur', Romo.proxy(function(e) {
    // remove any manual elem focus when its filter is blurred
    this.optionFilterFocused = false;
    Romo.removeClass(this.romoDropdown.elem, this.focusStyleClass);
  }, this));

  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupOpen', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.optionFilterElem, 'romoIndicatorTextInput:triggerPlaceIndicator');
    this.optionFilterElem.focus();
    this._filterOptionElems();
    this.openOnFocus = false;
  }, this));
  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupClose', Romo.proxy(function(e, romoDropdown) {
    this.optionFilterElem.value = '';
    /*
    don't call `_filterOptionElems()` here.  we need to keep the option markup as is
    until the popup is opened again so selecting an option works.  selecting an option
    depends on the selected item elem method which requires the markup to be in place
    */
  }, this));
  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupClosedByEsc', Romo.proxy(function(e, romoDropdown) {
    this.romoDropdown.elem.focus();
  }, this));
  Romo.on(this.optionFilterElem, 'click', Romo.proxy(function(e) {
    e.stopPropagation();
  }, this));
  Romo.on(this.romoDropdown.popupElem, 'click', Romo.proxy(function(e) {
    this.optionFilterElem.focus();
  }, this));

  Romo.on(this.optionFilterElem, 'romoOnkey:trigger', Romo.proxy(function(e, triggerEvent, romoOnkey) {
    if (Romo.nonInputTextKeyCodes().indexOf(triggerEvent.keyCode) === -1 /* Input Text */) {
      this._filterOptionElems();
    }
  }, this));
}

RomoOptionListDropdown.prototype._filterOptionElems = function() {
  Romo.trigger(this.elem, 'romoOptionListDropdown:filterChange', [this.optionFilterElem.value, this]);
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
  var currElem = this._getHighlightedItemElem();
  if (currElem !== undefined) {
    var prevValue = this.prevValue;
    var newValue  = Romo.data(currElem, 'romo-option-list-dropdown-option-value');
    var newText   = Romo.data(currElem, 'romo-option-list-dropdown-option-display-text');

    this.romoDropdown.doPopupClose();

    Romo.trigger(this.elem, 'romoOptionListDropdown:itemSelected', [newValue, newText, this]);
    if (newValue !== prevValue) {
      this.doSetSelectedItem(newValue);
      Romo.trigger(this.elem, 'romoOptionListDropdown:newItemSelected', [newValue, newText, this]);
      // always publish the item selected events before publishing any change events
      Romo.trigger(this.elem, 'romoOptionListDropdown:change', [newValue, prevValue, this]);
    }
  }
}

RomoOptionListDropdown.prototype._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this._highlightItem(this.selectedItemElem());
    this._scrollTopToItem(this.selectedItemElem());
  }
  Romo.on(Romo.f('body')[0], 'keydown', Romo.proxy(this._onPopupOpenBodyKeyDown, this));
}

RomoOptionListDropdown.prototype._onPopupClose = function(e) {
  this._highlightItem(undefined);
  Romo.off(Romo.f('body')[0], 'keydown', Romo.proxy(this._onPopupOpenBodyKeyDown, this));
}

RomoOptionListDropdown.prototype._onItemEnter = function(e) {
  this._highlightItem(e.target);
  return false;
}

RomoOptionListDropdown.prototype._onItemClick = function(e) {
  if (this.blurTimeoutId !== undefined) {
    clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = undefined;
  }
  this._selectHighlightedItem();
  return false;
}

RomoOptionListDropdown.prototype._onPopupMouseDown = function(e) {
  this.popupMouseDown = true;
}

RomoOptionListDropdown.prototype._onPopupMouseUp = function(e) {
  this.popupMouseDown = false;
}

RomoOptionListDropdown.prototype._onPopupOpenBodyKeyDown = function(e) {
  e.stopPropagation();

  var scrollElem   = this.romoDropdown.bodyElem;
  var scrollOffset = Romo.offset(scrollElem);
  var scrollHeight = parseInt(Romo.css(scrollElem, 'height'), 10);

  if (e.keyCode === 38 /* Up */) {
    var prevElem = this._prevListItem();
    if(prevElem === undefined){ return false; }

    var prevOffset = Romo.offset(prevElem);

    this._highlightItem(prevElem);

    if (scrollOffset.top > prevOffset.top) {
      this._scrollTopToItem(prevElem);
    } else if ((scrollOffset.top + scrollHeight) < prevOffset.top) {
      this._scrollTopToItem(prevElem);
    }

    return false;
  } else if(e.keyCode === 40 /* Down */) {
    var nextElem = this._nextListItem();
    if(nextElem === undefined){ return false; }

    var nextOffset = Romo.offset(nextElem);
    var nextHeight = parseInt(Romo.css(nextElem, 'height'), 10);

    this._highlightItem(nextElem);

    if ((scrollOffset.top + scrollHeight) < (nextOffset.top + nextHeight)) {
      this._scrollBottomToItem(nextElem);
    } else if (scrollOffset.top > nextOffset.top) {
      this._scrollTopToItem(nextElem);
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
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    if (this.romoDropdown.popupClosed()) {
      if (e.keyCode === 40 /* Down */  || e.keyCode === 38 /* Up */) {
        this.romoDropdown.doPopupOpen();
        return false;
      } else if (this.optionFilterElem !== undefined &&
                 Romo.nonInputTextKeyCodes().indexOf(e.keyCode) === -1 /* Input Text */)  {
        // don't prevent default on Cmd-* keys (preserve Cmd-R refresh, etc)
        if (e.metaKey === false) {
          e.preventDefault();
          if (e.keyCode !== 8) { /* Backspace */
            this.optionFilterElem.value = e.key;
          }
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

RomoOptionListDropdown.prototype._scrollTopToItem = function(itemElem) {
  if (itemElem !== undefined) {
    var scrollElem = this.romoDropdown.bodyElem;
    scrollElem.scrollTop = 0;

    var scrollOffsetTop = Romo.offset(scrollElem).top;
    var selOffsetTop    = Romo.offset(itemElem).top;
    var selOffset       = parseInt(Romo.css(itemElem, 'height'), 10) / 2;

    scrollElem.scrollTop = selOffsetTop - scrollOffsetTop - selOffset;
  }
}

RomoOptionListDropdown.prototype._scrollBottomToItem = function(itemElem) {
  if (itemElem !== undefined) {
    var scrollElem = this.romoDropdown.bodyElem;
    scrollElem.scrollTop = 0;

    var scrollOffsetTop = Romo.offset(scrollElem).top;
    var selOffsetTop    = Romo.offset(itemElem).top;
    var selOffset       = scrollElem.offsetHeight - parseInt(Romo.css(itemElem, 'height'), 10);

    scrollElem.scrollTop = selOffsetTop - scrollOffsetTop - selOffset;
  }
}

RomoOptionListDropdown.prototype._nextListItem = function() {
  var currElem = this._getHighlightedItemElem();
  if (currElem === undefined) {
    return Romo.find(this.optionListContainerElem, this.itemSelector)[0];
  }

  var nextElem = Romo.next(currElem, this.itemSelector+', UL.romo-option-list-optgroup');
  if (nextElem == undefined) {
    // currElem is either the last ungrouped opt elem in the overall
    // list OR is the last opt elem in a grouped list.

    // if the hightlighted opt elem is in an opt group list, use
    // its list as the reference elem.  otherwise keep using the
    // hightlighted opt elem itself.
    currElem = Romo.closest(currElem, 'UL.romo-option-list-optgroup') || currElem;
    nextElem = Romo.next(currElem, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  while (
    nextElem !== undefined                               &&
    Romo.hasClass(nextElem, 'romo-option-list-optgroup') &&
    Romo.children(nextElem).length === 0
  ) {
    // keep trying until you find a opt group list with options or an option or nothing
    currElem = nextElem;
    nextElem = Romo.next(currElem, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  if (nextElem === undefined) {
    // currElem is the last opt elem (grouped or not) in the overall
    // list.  get the the first opt elem in the overall list
    nextElem = Romo.find(this.romoDropdown.bodyElem, this.itemSelector)[0];
  } else if (Romo.hasClass(nextElem, 'romo-option-list-optgroup')) {
    // currElem (grouped or not) is before an opt group list. get
    // the first opt elem in that list.
    nextElem = Romo.find(nextElem, this.itemSelector)[0];
  }
  // otherwise currElem (grouped or not) is before an opt elem.
  // use that opt elem.

  return nextElem;
}

RomoOptionListDropdown.prototype._prevListItem = function() {
  var currElem = this._getHighlightedItemElem();
  if (currElem === undefined) {
    var itemElems = Romo.find(this.optionListContainerElem, this.itemSelector);
    return itemElems[itemElems.length - 1];
  }

  var prevElem = Romo.prev(currElem, this.itemSelector+', UL.romo-option-list-optgroup');
  if (prevElem === undefined) {
    // currElem is either the first ungrouped opt elem in the overall
    // list OR is the first opt elem in a grouped list

    // if the hightlighted opt elem is in an opt group list, use
    // its list as the reference elem.  otherwise keep using the
    // hightlighted opt elem itself.
    currElem = Romo.closest(currElem, 'UL.romo-option-list-optgroup') || currElem;
    prevElem = Romo.prev(currElem, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  while (
    prevElem !== undefined                               &&
    Romo.hasClass(prevElem, 'romo-option-list-optgroup') &&
    Romo.children(prevElem).length === 0
  ) {
    // keep trying until you find a opt group list with options or an option or nothing
    currElem = prevElem;
    prevElem = Romo.prev(currElem, this.itemSelector+', UL.romo-option-list-optgroup');
  }
  if (prevElem === undefined) {
    // currElem is the first opt elem (grouped or not) in the overall
    // list.  get the the last opt elem in the overall list
    var itemElems = Romo.find(this.romoDropdown.bodyElem, this.itemSelector);
    prevElem = itemElems[itemElems.length - 1];
  } else if (Romo.hasClass(prevElem, 'romo-option-list-optgroup')) {
    // currElem (grouped or not) is after an opt group list.  get
    // the last opt elem in that list.
    var childItemElems = Romo.find(prevElem, this.itemSelector);
    prevElem = childItemElems[childItemElems.length - 1];
  }
  // otherwise currElem (grouped or not) is after an opt elem.
  // use that opt elem.

  return prevElem;
}

RomoOptionListDropdown.prototype._highlightItem = function(itemElem) {
  var highlightedItemElem = this._getHighlightedItemElem()
  if (highlightedItemElem !== undefined) {
    Romo.removeClass(highlightedItemElem, 'romo-option-list-dropdown-highlight');
  }
  if (itemElem) {
    Romo.addClass(itemElem, 'romo-option-list-dropdown-highlight');
  }
}

RomoOptionListDropdown.prototype._getHighlightedItemElem = function() {
  return Romo.find(this.romoDropdown.bodyElem, 'LI.romo-option-list-dropdown-highlight')[0];
}

Romo.addElemsInitSelector('[data-romo-option-list-dropdown-auto="true"]', RomoOptionListDropdown);
