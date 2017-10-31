var RomoPicker = function(elem) {
  this.elem = elem;

  this.defaultCaretClass     = undefined;
  this.defaultCaretPaddingPx = 5;
  this.defaultCaretPosition  = 'right'
  this.defaultValuesDelim    = ',';

  this.defaultOptionItems  = this._buildDefaultOptionItems();
  this.filteredOptionItems = [];

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoPicker:ready', [this]);
}

RomoPicker.prototype.doInit = function() {
  // override as needed
}

RomoPicker.prototype.doSetValue = function(values) {
  var value = Romo.array(values).join(this._elemValuesDelim());
  Romo.ajax({
    type:    'GET',
    url:     Romo.data(this.elem, 'romo-picker-url'),
    data:    { 'values': value },
    success: Romo.proxy(function(data, status, xhr) {
      this.doSetValueDatas(JSON.parse(data));
    }, this),
  });
}

RomoPicker.prototype.doSetValueDatas = function(valueDatas) {
  var datas        = Romo.array(valueDatas);
  var values       = datas.map(function(data) { return data.value; });
  var displayTexts = datas.map(function(data) { return data.displayText; });

  if (this.romoSelectedOptionsList !== undefined) {
    this._setValuesAndDisplayText(values, '');
    this.romoSelectedOptionsList.doSetItems(datas);
  } else {
    var displayText = displayTexts[0] ||
                      Romo.data(this.elem, 'romo-picker-empty-option-display-text') ||
                      '';
    this._setValuesAndDisplayText(values, displayText);
    this.romoOptionListDropdown.doSetSelectedValueAndText(
      values[0],
      displayText
    );
  }
  this._refreshUI();
}

// private

RomoPicker.prototype._bindElem = function() {
  this._bindOptionListDropdown();
  this._bindSelectedOptionsList();
  this._bindAjax();

  Romo.on(this.elem, 'romoPicker:triggerToggle', Romo.proxy(function(e) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerToggle', []);
  }, this));
  Romo.on(this.elem, 'romoPicker:triggerPopupOpen', Romo.proxy(function(e) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerPopupOpen', []);
  }, this));
  Romo.on(this.elem, 'romoPicker:triggerPopupClose', Romo.proxy(function(e) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerPopupClose', []);
  }, this));

  this.romoOptionListDropdown.doSetListItems(this.defaultOptionItems);

  this.doSetValue(this._elemValues());

  if (Romo.attr(this.elem, 'id') !== undefined) {
    var labelElem = Romo.f('label[for="'+Romo.attr(this.elem, 'id')+'"]')[0];
    Romo.on(labelElem, 'click', Romo.proxy(function(e) {
      this.romoOptionListDropdown.doFocus();
    }, this));
  }

  Romo.on(window, "pageshow", Romo.proxy(function(e) {
    this._refreshUI();
  }, this));

  Romo.on(this.elem, 'romoPicker:triggerSetValue', Romo.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));
}

RomoPicker.prototype._bindSelectedOptionsList = function() {
  this.romoSelectedOptionsList = undefined;
  if (this.elem.multiple === true) {
    if (Romo.data(this.elem, 'romo-picker-multiple-item-class') !== undefined) {
      Romo.setData(this.romoOptionListDropdown.elem, 'romo-selected-options-list-item-class', Romo.data(this.elem, 'romo-picker-multiple-item-class'));
    }
    if (Romo.data(this.elem, 'romo-picker-multiple-max-rows') !== undefined) {
      Romo.setData(this.romoOptionListDropdown.elem, 'romo-selected-options-list-max-rows', Romo.data(this.elem, 'romo-picker-multiple-max-rows'));
    }

    this.romoSelectedOptionsList = new RomoSelectedOptionsList(this.romoOptionListDropdown.elem);
    Romo.on(this.romoSelectedOptionsList.elem, 'romoSelectedOptionsList:itemClick', Romo.proxy(function(e, itemValue, romoSelectedOptionsList) {
      var currentValues = this._elemValues();
      var index         = currentValues.indexOf(itemValue);
      if (index > -1) {
        currentValues.splice(index, 1);
        this._setValuesAndDisplayText(currentValues, '');
      }
      this.romoSelectedOptionsList.doRemoveItem(itemValue);
      this._refreshUI();
    }, this));
    Romo.on(this.romoSelectedOptionsList.elem, 'romoSelectedOptionsList:listClick', Romo.proxy(function(e, romoSelectedOptionsList) {
      Romo.trigger(this.romoOptionListDropdown.elem, 'romoDropdown:triggerPopupClose', []);
      this.romoOptionListDropdown.doFocus(false);
    }, this));

    Romo.before(this.elemWrapper, this.romoSelectedOptionsList.elem);
    this.romoSelectedOptionsList.doRefreshUI();
  }
}

RomoPicker.prototype._bindOptionListDropdown = function() {
  this.romoOptionListDropdown = new RomoOptionListDropdown(
    this._buildOptionListDropdownElem()
  );

  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:romoDropdown:toggle', Romo.proxy(function(e, romoDropdown, optionListDropdown) {
    Romo.trigger(this.elem, 'romoPicker:romoDropdown:toggle', [romoDropdown, this]);
  }, this));
  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:romoDropdown:popupOpen', Romo.proxy(function(e, romoDropdown, optionListDropdown) {
    Romo.trigger(this.elem, 'romoPicker:romoDropdown:popupOpen', [romoDropdown, this]);
  }, this));
  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:romoDropdown:popupClose', Romo.proxy(function(e, romoDropdown, optionListDropdown) {
    Romo.trigger(this.elem, 'romoPicker:romoDropdown:popupClose', [romoDropdown, this]);
  }, this));

  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:filterChange', Romo.proxy(function(e, filterValue, romoOptionListDropdown) {
    if (filterValue !== '') {
      // immediately update the custom opt as the filter changes
      // but keep the current filtered option items
      this._setListItems(this.filteredOptionItems.concat(this._buildCustomOptionItems()));
      // this will update with the new filtered items plus the custom on ajax callback
      Romo.trigger(this.elem, 'romoAjax:triggerInvoke', [{ 'filter': filterValue }]);
    } else {
      this._setListItems(this.defaultOptionItems.concat(this._buildCustomOptionItems()));
    }
  }, this));
  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:itemSelected', Romo.proxy(function(e, itemValue, itemDisplayText, optionListDropdown) {
    this.romoOptionListDropdown.doFocus();
    Romo.trigger(this.elem, 'romoPicker:itemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:newItemSelected', Romo.proxy(function(e, itemValue, itemDisplayText, optionListDropdown) {
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
    Romo.trigger(this.elem, 'romoPicker:newItemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  Romo.on(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:change', Romo.proxy(function(e, newValue, prevValue, optionListDropdown) {
    Romo.trigger(this.elem, 'change');
    Romo.trigger(this.elem, 'romoPicker:change', [newValue, prevValue, this]);
  }, this));
}

RomoPicker.prototype._buildOptionListDropdownElem = function() {
  var romoOptionListDropdownElem = Romo.elems('<div class="romo-picker romo-btn" tabindex="0"><span class="romo-picker-text"></span></div>')[0];

  Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-overflow-x',           'hidden');
  Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-width',                'elem');
  Romo.setData(romoOptionListDropdownElem, 'romo-option-list-focus-style-class', 'romo-picker-focus');

  if (Romo.data(this.elem, 'romo-picker-dropdown-position') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-position', Romo.data(this.elem, 'romo-picker-dropdown-position'));
  }
  if (Romo.data(this.elem, 'romo-picker-dropdown-style-class') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-style-class', Romo.data(this.elem, 'romo-picker-dropdown-style-class'));
  }
  if (Romo.data(this.elem, 'romo-picker-dropdown-min-height') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-min-height', Romo.data(this.elem, 'romo-picker-dropdown-min-height'));
  }
  if (Romo.data(this.elem, 'romo-picker-dropdown-max-height') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-max-height', Romo.data(this.elem, 'romo-picker-dropdown-max-height'));
  }
  if (Romo.data(this.elem, 'romo-picker-dropdown-height') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-height', Romo.data(this.elem, 'romo-picker-dropdown-height'));
  }
  if (Romo.data(this.elem, 'romo-picker-filter-placeholder') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-option-list-dropdown-filter-placeholder', Romo.data(this.elem, 'romo-picker-filter-placeholder'));
  }
  if (Romo.data(this.elem, 'romo-picker-filter-indicator') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-option-list-dropdown-filter-indicator', Romo.data(this.elem, 'romo-picker-filter-indicator'));
  }
  if (Romo.data(this.elem, 'romo-picker-filter-indicator-width-px') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-option-list-filter-indicator-width-px', Romo.data(this.elem, 'romo-picker-filter-indicator-width-px'));
  }
  if (Romo.data(this.elem, 'romo-picker-no-filter') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-option-list-dropdown-no-filter', Romo.data(this.elem, 'romo-picker-no-filter'));
  }
  if (Romo.data(this.elem, 'romo-picker-open-on-focus') !== undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-option-list-dropdown-open-on-focus', Romo.data(this.elem, 'romo-picker-open-on-focus'));
  }

  if (Romo.data(romoOptionListDropdownElem, 'romo-dropdown-max-height') === undefined) {
    Romo.setData(romoOptionListDropdownElem, 'romo-dropdown-max-height', 'detect');
  }

  if (Romo.attr(this.elem, 'class') !== undefined) {
    Romo.addClass(romoSelectDropdownElem, Romo.attr(this.elem, 'class'));
  }
  if (Romo.attr(this.elem, 'style') !== undefined) {
    Romo.setAttr(romoOptionListDropdownElem, 'style', Romo.attr(this.elem, 'style'));
  }
  Romo.setStyle(romoOptionListDropdownElem, 'width', Romo.css(this.elem, 'width'));
  if (Romo.attr(this.elem, 'disabled') !== undefined) {
    Romo.setAttr(this.romoOptionListDropdown.elem, 'disabled', Romo.attr(this.elem, 'disabled'));
  }

  Romo.after(this.elem, romoOptionListDropdownElem);
  Romo.hide(this.elem);

  this.elemWrapper = Romo.elems('<div class="romo-picker-wrapper"></div>')[0];
  if (Romo.data(this.elem, 'romo-picker-btn-group') === true) {
    Romo.addClass(this.elemWrapper, 'romo-btn-group');
  }
  Romo.before(romoOptionListDropdownElem, this.elemWrapper);
  Romo.append(this.elemWrapper, romoOptionListDropdownElem);

  // the elem wrapper should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem (picker input) is removed.
  // delay adding it b/c other components may `append` generated pickers
  // meaning the picker is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the wrapper.
  setTimeout(Romo.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.elemWrapper]);
  }, this), 1);

  this.caretElem = undefined;
  var caretClass = Romo.data(this.elem, 'romo-picker-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    this.caretElem = Romo.elems('<i class="romo-picker-caret '+caretClass+'"></i>')[0];
    Romo.setStyle(this.caretElem, 'line-height', parseInt(Romo.css(romoOptionListDropdownElem, "line-height"), 10)+'px');
    Romo.on(this.caretElem, 'click', Romo.proxy(this._onCaretClick, this));
    Romo.append(romoOptionListDropdownElem, this.caretElem);

    var caretPaddingPx = this._getCaretPaddingPx();
    var caretWidthPx   = this._getCaretWidthPx();
    var caretPosition  = this._getCaretPosition();

    // add a pixel to account for the default input border
    Romo.setStyle(this.caretElem, caretPosition, caretPaddingPx+1);

    // left-side padding
    // + caret width
    // + right-side padding
    var dropdownPaddingPx = caretPaddingPx + caretWidthPx + caretPaddingPx;
    Romo.setStyle(romoOptionListDropdownElem, 'padding-'+caretPosition, dropdownPaddingPx+'px');
  }

  return romoOptionListDropdownElem;
}

RomoPicker.prototype._bindAjax = function() {
  Romo.setData(this.elem, 'romo-ajax-disable-default-invoke-on', true);
  Romo.setData(this.elem, 'romo-ajax-url-attr', 'data-romo-picker-url');
  Romo.setData(this.elem, 'romo-ajax-auto', false);

  Romo.on(this.elem, 'romoAjax:callStart', Romo.proxy(function(e, data, romoAjax) {
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerFilterSpinnerStart', []);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callSuccess', Romo.proxy(function(e, data, romoAjax) {
    this.filteredOptionItems = JSON.parse(data);
    this._setListItems(this.filteredOptionItems.concat(this._buildCustomOptionItems()));
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerFilterSpinnerStop', []);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callError', Romo.proxy(function(e, xhr, romoAjax) {
    this._setListItems(this.defaultOptionItems.concat(this._buildCustomOptionItems()));
    Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerFilterSpinnerStop', []);
    return false;
  }, this));

  this.romoAjax = new RomoAjax(this.elem);
}

RomoPicker.prototype._setListItems = function(items) {
  this.romoOptionListDropdown.doSetListItems(items);
  Romo.trigger(this.romoOptionListDropdown.elem, 'romoOptionListDropdown:triggerListOptionsUpdate', [this.romoOptionListDropdown.optItemElems()[0]]);
}

RomoPicker.prototype._buildDefaultOptionItems = function() {
  var items = []

  if (Romo.data(this.elem, 'romo-picker-empty-option') === true) {
    items.push({
      'type':        'option',
      'value':       '',
      'displayText': (Romo.data(this.elem, 'romo-picker-empty-option-display-text') || ''),
      'displayHtml': '<span>&nbsp;</span>'
    });
  }

  return items;
}

RomoPicker.prototype._buildCustomOptionItems = function() {
  var items = [];

  var value = this.romoOptionListDropdown.optionFilterValue();
  if (value !== '' && Romo.data(this.elem, 'romo-picker-custom-option') === true) {
    var prompt = Romo.data(this.elem, 'romo-picker-custom-option-prompt');
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

RomoPicker.prototype._buildCustomOptionItem = function(value) {
  return {
    'type':        'option',
    'value':       value,
    'displayText': value,
    'displayHtml': value
  };
}

RomoPicker.prototype._setValuesAndDisplayText = function(newValues, displayText) {
  this.elem.value = newValues.join(this._elemValuesDelim());
  Romo.setData(this.elem, 'romo-picker-display-text', displayText);
}

RomoPicker.prototype._elemValues = function() {
  return this.elem.value.split(this._elemValuesDelim()).filter(function(v){ return v !== ''; });
}

RomoPicker.prototype._elemValuesDelim = function() {
  return Romo.data(this.elem, 'romo-picker-values-delim') || this.defaultValuesDelim;
}

RomoPicker.prototype._refreshUI = function() {
  var text = Romo.data(this.elem, 'romo-picker-display-text') || '';
  if (this.romoSelectedOptionsList !== undefined) {
    this.romoSelectedOptionsList.doRefreshUI();
  }

  var textElem = Romo.find(this.romoOptionListDropdown.elem, '.romo-picker-text')[0];
  if (text === '') {
    Romo.updateHtml(textElem, '<span>&nbsp;</span>');
  } else {
    Romo.updateText(textElem, text);
  }
}

RomoPicker.prototype._onCaretClick = function(e) {
  if (this.elem.disabled === false) {
    this.romoOptionListDropdown.doFocus();
    Romo.trigger(this.elem, 'romoPicker:triggerPopupOpen');
  }
}

RomoPicker.prototype._getCaretPaddingPx = function() {
  return (
    Romo.data(this.elem, 'romo-picker-caret-padding-px') ||
    this.defaultCaretPaddingPx
  );
}

RomoPicker.prototype._getCaretWidthPx = function() {
  return (
    Romo.data(this.elem, 'romo-picker-caret-width-px') ||
    parseInt(Romo.css(this.caretElem, "width"), 10)
  );
}

RomoPicker.prototype._getCaretPosition = function() {
  return (
    Romo.data(this.elem, 'romo-picker-caret-position') ||
    this.defaultCaretPosition
  );
}

Romo.addElemsInitSelector('[data-romo-picker-auto="true"]', RomoPicker);
