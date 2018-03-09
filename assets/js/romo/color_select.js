var RomoColorSelect = RomoComponent(function(elem) {
  this.elem = elem;

  this.defaultCaretClass     = undefined;
  this.defaultCaretPaddingPx = 5;
  this.defaultCaretWidthPx   = 18;
  this.defaultCaretPosition  = 'right'

  this.defaultValuesDelim = ',';
  this.defaultOptionItems = this._buildDefaultOptionItems();

  this.doRefreshColorItemsJson();
  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoColorSelect:ready', [this]);
});

RomoColorSelect.prototype.doSetValue = function(value) {
  var items, values, displayText;

  items = Romo.array(value).map(Romo.proxy(function(v) {
    return this.colorItems.find(function(i) { return i.value === v; });
  }, this));
  items = items.filter(function(i) { return i !== undefined; });
  items = items.map(function(i) {
    return {
      'value':       i.value,
      'displayText': i.displayText
    };
  });
  values = items.map(function(i) { return i.value; });

  if (this.romoSelectedOptionsList !== undefined) {
    displayText = '';
    this.romoSelectedOptionsList.doSetItems(items);
  } else if (items[0]) {
    displayText = items[0].displayText;
    this.romoOptionListDropdown.doSetSelectedItem(values[0]);
  } else {
    displayText = Romo.data(this.elem, 'romo-color-select-empty-option-display-text') || '';
    this.romoOptionListDropdown.doSetSelectedItem(undefined);
  }
  this._setValuesAndDisplayText(values, displayText);
  this._refreshUI();
}

RomoColorSelect.prototype.doRefreshColorItemsJson = function() {
  var items, values;
  itemTuples = Romo.data(this.elem, 'romo-color-select-items-json');
  values     = this._elemValues();

  this.colorItems = itemTuples.map(Romo.proxy(function(itemTuple) {
    return this._buildColorItem(values, {
      'value': itemTuple[0],
      'name':  itemTuple[1]
    });
  }, this));
}

// private

RomoColorSelect.prototype._buildColorItem = function(elemValues, itemData) {
  return {
    'value':       itemData.value,
    'displayText': itemData.name,
    'displayHtml': this._buildColorItemDisplayHtml(itemData),
    'selected':    elemValues.includes(itemData.value)
  }
}

RomoColorSelect.prototype._buildColorItemDisplayHtml = function(itemData) {
  return (
    '<div class="romo-color-select-item">'+
      '<div class="romo-color-select-item-color"'+
           'style="background-color: '+itemData.value+'">&nbsp;</div>'+
      '<div class="romo-color-select-item-name">'+itemData.name+'</div>'+
    '</div>'
  );
}

RomoColorSelect.prototype._bindElem = function() {
  this._bindOptionListDropdown();
  this._bindSelectedOptionsList();

  Romo.on(this.elem, 'romoColorSelect:triggerToggle', Romo.proxy(function(e) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerToggle', []);
  }, this));
  Romo.on(this.elem, 'romoColorSelect:triggerPopupOpen', Romo.proxy(function(e) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerPopupOpen', []);
  }, this));
  Romo.on(this.elem, 'romoColorSelect:triggerPopupClose', Romo.proxy(function(e) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerPopupClose', []);
  }, this));
  Romo.on(this.elem, 'romoColorSelect:triggerRefreshColorItemsJson', Romo.proxy(function(e) {
    this.doRefreshColorItemsJson();
  }, this));

  this._setUnfilteredListItems();
  this.doSetValue(this._elemValues());

  if (Romo.attr(this.elem, 'id') !== undefined) {
    var labelElem = Romo.f('label[for="'+Romo.attr(this.elem, 'id')+'"]');
    Romo.on(labelElem, 'click', Romo.proxy(function(e) {
      e.preventDefault();
      this.romoOptionListDropdown.doFocus();
    }, this));
  }

  Romo.on(window, "pageshow", Romo.proxy(function(e) {
    this._refreshUI();
  }, this));

  Romo.on(this.elem, 'romoColorSelect:triggerSetValue', Romo.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));
}

RomoColorSelect.prototype._bindSelectedOptionsList = function() {
  this.romoSelectedOptionsList = undefined;
  if (this.elem.multiple === true) {
    if (Romo.data(this.elem, 'romo-color-select-multiple-item-class') !== undefined) {
      Romo.setData(
        this.romoOptionListDropdown.elem,
        'romo-selected-options-list-item-class',
        Romo.data(this.elem, 'romo-color-select-multiple-item-class')
      );
    }
    if (Romo.data(this.elem, 'romo-color-select-multiple-max-rows') !== undefined) {
      Romo.setData(
        this.romoOptionListDropdown.elem,
        'romo-selected-options-list-max-rows',
        Romo.data(this.elem, 'romo-color-select-multiple-max-rows')
      );
    }

    this.romoSelectedOptionsList = new RomoSelectedOptionsList(this.romoOptionListDropdown.elem);
    Romo.on(
      this.romoSelectedOptionsList.elem,
      'romoSelectedOptionsList:itemClick',
      Romo.proxy(function(e, itemValue, romoSelectedOptionsList) {
        var currentValues = this._elemValues();
        var index         = currentValues.indexOf(itemValue);
        if (index > -1) {
          currentValues.splice(index, 1);
          this._setValuesAndDisplayText(currentValues, '');
        }
        this.romoSelectedOptionsList.doRemoveItem(itemValue);
        this._refreshUI();

        Romo.trigger(this.elem, 'change');
        Romo.trigger(
          this.elem,
          'romoSelect:multipleChange',
          [currentValues, itemValue, this]
        );
      }, this)
    );
    Romo.on(
      this.romoSelectedOptionsList.elem,
      'romoSelectedOptionsList:listClick',
      Romo.proxy(function(e, romoSelectedOptionsList) {
        Romo.trigger(this.romoOptionListDropdown.elem, 'romoDropdown:triggerPopupClose', []);
        this.romoOptionListDropdown.doFocus(false);
      }, this)
    );

    Romo.before(this.elemWrapper, this.romoSelectedOptionsList.elem);
    this.romoSelectedOptionsList.doRefreshUI();
  }
}

RomoColorSelect.prototype._bindOptionListDropdown = function() {
  this.romoOptionListDropdown = new RomoOptionListDropdown(
    this._buildOptionListDropdownElem()
  );

  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:romoDropdown:toggle',
    Romo.proxy(function(e, romoDropdown, optionListDropdown) {
      Romo.trigger(this.elem, 'romoColorSelect:romoDropdown:toggle', [romoDropdown, this]);
    }, this)
  );
  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:romoDropdown:popupOpen',
    Romo.proxy(function(e, romoDropdown, optionListDropdown) {
      Romo.trigger(this.elem, 'romoColorSelect:romoDropdown:popupOpen', [romoDropdown, this]);
    }, this)
  );
  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:romoDropdown:popupClose',
    Romo.proxy(function(e, romoDropdown, optionListDropdown) {
      Romo.trigger(this.elem, 'romoColorSelect:romoDropdown:popupClose', [romoDropdown, this]);
    }, this)
  );

  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:filterChange',
    Romo.proxy(function(e, filterValue, romoOptionListDropdown) {
      var wbFilter = new RomoWordBoundaryFilter(filterValue, this.colorItems, function(item) {
        // The romo word boundary filter by default considers a space, "-" and "_"
        // as word boundaries.  We want to also consider other non-word characters
        // (such as ":", "/", ".", "?", "=", "&") as word boundaries as well.
        return item.displayText.replace(/\W/g, ' ');
      });

      wbFilter.matchingItems.forEach(function(i){    i.hidden = false; });
      wbFilter.notMatchingItems.forEach(function(i){ i.hidden = true;  });

      if (filterValue !== '') {
        this._setFilteredListItems();
        Romo.trigger(
          this.romoOptionListDropdown.elem,
          'romoOptionListDropdown:triggerListOptionsUpdate',
          [this.romoOptionListDropdown.optItemElems()[0]]
        );
      } else {
        this._setUnfilteredListItems();
        Romo.trigger(
          this.elem,
          'romoOptionListDropdown:triggerListOptionsUpdate',
          [this.romoOptionListDropdown.selectedItemElem()]
        );
      }
    }, this)
  );
  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:itemSelected',
    Romo.proxy(function(e, itemValue, itemDisplayText, optionListDropdown) {
      this.romoOptionListDropdown.doFocus();
      Romo.trigger(this.elem, 'romoColorSelect:itemSelected', [itemValue, itemDisplayText, this]);
    }, this)
  );
  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:newItemSelected',
    Romo.proxy(function(e, itemValue, itemDisplayText, optionListDropdown) {
      if (this.romoSelectedOptionsList !== undefined) {
        var currentValues = this._elemValues();
        if (!currentValues.includes(itemValue)) {
          this._setValuesAndDisplayText(currentValues.concat([itemValue]), '');
          this.romoSelectedOptionsList.doAddItem({
            'value':       itemValue,
            'displayText': itemDisplayText
          });
        }
      } else {
        this._setValuesAndDisplayText([itemValue], itemDisplayText);
      }
      this._refreshUI();
      Romo.trigger(this.elem, 'romoColorSelect:newItemSelected', [itemValue, itemDisplayText, this]);
    }, this)
  );
  Romo.on(
    this.romoOptionListDropdown.elem,
    'romoOptionListDropdown:change',
    Romo.proxy(function(e, newValue, prevValue, optionListDropdown) {
      Romo.trigger(this.elem, 'change');
      if (this.romoSelectedOptionsList !== undefined) {
        Romo.trigger(
          this.elem,
          'romoColorSelect:multipleChange',
          [this._elemValues(), newValue, this]
        );
      } else {
        Romo.trigger(this.elem, 'romoColorSelect:change', [newValue, prevValue, this]);
      }

    }, this)
  );
}

RomoColorSelect.prototype._buildOptionListDropdownElem = function() {
  var romoOptionListDropdownElem = Romo.elems(
    '<div class="romo-color-select romo-btn" tabindex="0">'+
      '<span class="romo-color-select-text"></span>'+
    '</div>'
  )[0];

  Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-overflow-x', 'hidden');
  Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-width',      'elem');
  Romo.setData(
    romoOptionListDropdownElem,
    'romo-option-list-focus-style-class',
    'romo-color-select-focus'
  );

  if (Romo.data(this.elem, 'romo-color-select-dropdown-position') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-position',
      Romo.data(this.elem, 'romo-color-select-dropdown-position')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-dropdown-style-class') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-style-class',
      Romo.data(this.elem, 'romo-color-select-dropdown-style-class')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-dropdown-min-height') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-min-height',
      Romo.data(this.elem, 'romo-color-select-dropdown-min-height')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-dropdown-max-height') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-max-height',
      Romo.data(this.elem, 'romo-color-select-dropdown-max-height')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-dropdown-height') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-height',
      Romo.data(this.elem, 'romo-color-select-dropdown-height')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-dropdown-append-to-closest') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-append-to-closest',
      Romo.data(this.elem, 'romo-color-select-dropdown-append-to-closest')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-dropdown-append-to') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-append-to',
      Romo.data(this.elem, 'romo-color-select-dropdown-append-to')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-filter-placeholder') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-option-list-dropdown-filter-placeholder',
      Romo.data(this.elem, 'romo-color-select-filter-placeholder')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-filter-indicator') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-option-list-dropdown-filter-indicator',
      Romo.data(this.elem, 'romo-color-select-filter-indicator')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-filter-indicator-width-px') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-option-list-filter-indicator-width-px',
      Romo.data(this.elem, 'romo-color-select-filter-indicator-width-px')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-no-filter') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-option-list-dropdown-no-filter',
      Romo.data(this.elem, 'romo-color-select-no-filter')
    );
  }
  if (Romo.data(this.elem, 'romo-color-select-open-on-focus') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-option-list-dropdown-open-on-focus',
      Romo.data(this.elem, 'romo-color-select-open-on-focus')
    );
  }

  if (Romo.data(romoOptionListDropdownElem, 'romo-dropdown-max-height') === undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-max-height', 'detect');
  }

  if (Romo.attr(this.elem, 'class') !== undefined) {
    Romo.addClass(romoOptionListDropdownElem, Romo.attr(this.elem, 'class'));
  }
  if (Romo.attr(this.elem, 'style') !== undefined) {
    Romo.setAttr(romoOptionListDropdownElem, 'style', Romo.attr(this.elem, 'style'));
  }
  Romo.setStyle(romoOptionListDropdownElem, 'width', Romo.width(this.elem)+'px');
  if (Romo.attr(this.elem, 'disabled') !== undefined) {
    Romo.setAttr(this.romoOptionListDropdown.elem, 'disabled', Romo.attr(this.elem, 'disabled'));
  }

  Romo.after(this.elem, romoOptionListDropdownElem);
  Romo.hide(this.elem);

  this.elemWrapper = Romo.elems('<div class="romo-color-select-wrapper"></div>')[0];
  if (Romo.data(this.elem, 'romo-color-select-btn-group') === true) {
    Romo.addClass(this.elemWrapper, 'romo-btn-group');
  }
  Romo.before(romoOptionListDropdownElem, this.elemWrapper);
  Romo.append(this.elemWrapper, romoOptionListDropdownElem);
  Romo.parentChildElems.add(this.elem, [this.elemWrapper]);

  this.caretElem = undefined;
  var caretClass = Romo.data(this.elem, 'romo-color-select-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    this.caretElem = Romo.elems('<i class="romo-color-select-caret '+caretClass+'"></i>')[0];
    Romo.setStyle(
      this.caretElem,
      'line-height',
      Romo.css(romoOptionListDropdownElem, 'line-height')
    );
    Romo.on(this.caretElem, 'click', Romo.proxy(this._onCaretClick, this));
    Romo.append(romoOptionListDropdownElem, this.caretElem);

    var caretPaddingPx = this._getCaretPaddingPx();
    var caretWidthPx   = this._getCaretWidthPx();
    var caretPosition  = this._getCaretPosition();

    // add a pixel to account for the default input border
    Romo.setStyle(this.caretElem, caretPosition, caretPaddingPx+1+'px');

    // left-side padding
    // + caret width
    // + right-side padding
    var dropdownPaddingPx = caretPaddingPx + caretWidthPx + caretPaddingPx;
    Romo.setStyle(
      romoOptionListDropdownElem,
      'padding-'+caretPosition,
      dropdownPaddingPx+'px'
    );
  }

  return romoOptionListDropdownElem;
}

RomoColorSelect.prototype._setUnfilteredListItems = function() {
  this.romoOptionListDropdown.doSetListItems(
    this.defaultOptionItems.concat(this._buildOptionItems())
  );
}

RomoColorSelect.prototype._setFilteredListItems = function() {
  this.romoOptionListDropdown.doSetListItems(
    this._buildOptionItems().concat(this._buildCustomOptionItems())
  );
}

RomoColorSelect.prototype._buildOptionItems = function() {
  return this.colorItems.filter(function(i) { return i.hidden !== true; }).map(function(i) {
    return {
      'type':        'option',
      'value':       i.value,
      'displayText': i.displayText,
      'displayHtml': i.displayHtml,
      'selected':    i.selected
    }
  });
}

RomoColorSelect.prototype._buildDefaultOptionItems = function() {
  var items = [];

  if (Romo.data(this.elem, 'romo-color-select-empty-option') === true) {
    var text = Romo.data(this.elem, 'romo-color-select-empty-option-display-text') || '';
    items.push({
      'type':        'option',
      'value':       '',
      'displayText': text,
      'displayHtml': '<span>'+text+'</span>'
    });
  }

  return items;
}

RomoColorSelect.prototype._buildCustomOptionItems = function() {
  var items = [];

  var value = this.romoOptionListDropdown.optionFilterValue();
  if (value !== '' && Romo.data(this.elem, 'romo-color-select-custom-option') === true) {
    var prompt = Romo.data(this.elem, 'romo-color-select-custom-option-prompt');
    if (prompt !== undefined) {
      items.push({
        'type':  'optgroup',
        'label': prompt,
        'items': [this._buildCustomOptionItem(value)]
      });
    } else {
      items.push(this._buildCustomOptionItem(value));
    }
  }

  return items;
}

RomoColorSelect.prototype._buildCustomOptionItem = function(value) {
  return {
    'type':        'option',
    'value':       value,
    'displayText': value,
    'displayHtml': '<span>'+value+'</span>'
  };
}

RomoColorSelect.prototype._setValuesAndDisplayText = function(newValues, displayText) {
  this.elem.value = newValues.join(this._elemValuesDelim());
  this.colorItems.forEach(function(colorItem) {
    if (newValues.includes(colorItem.value)) {
      colorItem.selected = true;
    } else {
      colorItem.selected = false;
    }
  });
  Romo.setData(this.elem, 'romo-color-select-display-text', displayText);
}

RomoColorSelect.prototype._elemValues = function() {
  return this.elem.value.split(this._elemValuesDelim()).filter(function(v){ return v !== ''; });
}

RomoColorSelect.prototype._elemValuesDelim = function() {
  return Romo.data(this.elem, 'romo-color-select-values-delim') || this.defaultValuesDelim;
}

RomoColorSelect.prototype._refreshUI = function() {
  if (this.romoSelectedOptionsList !== undefined) {
    this.romoSelectedOptionsList.doRefreshUI();
  }

  var textElem = Romo.find(this.romoOptionListDropdown.elem, '.romo-color-select-text')[0];
  var text     = Romo.data(this.elem, 'romo-color-select-display-text') || '';
  if (text === '') {
    Romo.updateHtml(textElem, '<span>&nbsp;</span>');
  } else {
    Romo.updateText(textElem, text);
  }
}

RomoColorSelect.prototype._getCaretPaddingPx = function() {
  return (
    Romo.data(this.elem, 'romo-color-select-caret-padding-px') ||
    this.defaultCaretPaddingPx
  );
}

RomoColorSelect.prototype._getCaretWidthPx = function() {
  return (
    Romo.data(this.elem, 'romo-color-select-caret-width-px') ||
    this._parseCaretWidthPx()
  );
}

RomoColorSelect.prototype._getCaretPosition = function() {
  return (
    Romo.data(this.elem, 'romo-color-select-caret-position') ||
    this.defaultCaretPosition
  );
}

RomoColorSelect.prototype._parseCaretWidthPx = function() {
  var widthPx = Romo.width(this.caretElem);
  if (isNaN(widthPx)) {
    widthPx = this.defaultCaretWidthPx;
  }
  return widthPx;
}

// event functions

RomoColorSelect.prototype.romoEvFn._onCaretClick = function(e) {
  if (this.elem.disabled === false) {
    this.romoOptionListDropdown.doFocus();
    Romo.trigger(this.elem, 'romoColorSelect:triggerPopupOpen');
  }
}

// init

Romo.addElemsInitSelector('[data-romo-color-select-auto="true"]', RomoColorSelect);
