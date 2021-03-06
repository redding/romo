var RomoSelect = RomoComponent(function(elem) {
  this.elem = elem;

  this.defaultCaretClass     = undefined;
  this.defaultCaretPaddingPx = 5;
  this.defaultCaretWidthPx   = 18;
  this.defaultCaretPosition  = 'right'

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoSelect:ready', [this]);
});

RomoSelect.prototype.doSetValue = function(value) {
  var values = Romo.array(value).filter(Romo.proxy(function(v) {
    return Romo.find(this.elem, 'OPTION[value="'+v+'"]')[0] !== undefined;
  }, this));

  this._setValues(values);
  if (this.romoSelectedOptionsList !== undefined) {
    var items = values.map(Romo.proxy(function(value) {
      return {
        'value':       value,
        'displayText': Romo.find(this.elem, 'OPTION[value="'+value+'"]')[0].innerText.trim()
      };
    }, this));
    this.romoSelectedOptionsList.doSetItems(items);
  } else {
    this.romoSelectDropdown.doSetSelectedItem(values[0]);
  }
  this._refreshUI();
}

// private

RomoSelect.prototype._bindElem = function() {
  this._bindSelectDropdown();
  this._bindSelectedOptionsList();

  Romo.on(this.elem, 'romoSelect:triggerToggle', Romo.proxy(function(e) {
    Romo.trigger(this.romoSelectDropdown.elem, 'romoSelectDropdown:triggerToggle', []);
  }, this));
  Romo.on(this.elem, 'romoSelect:triggerPopupOpen', Romo.proxy(function(e) {
    Romo.trigger(this.romoSelectDropdown.elem, 'romoSelectDropdown:triggerPopupOpen', []);
  }, this));
  Romo.on(this.elem, 'romoSelect:triggerPopupClose', Romo.proxy(function(e) {
    Romo.trigger(this.romoSelectDropdown.elem, 'romoSelectDropdown:triggerPopupClose', []);
  }, this));

  this.doSetValue(this._elemValues());

  if (Romo.attr(this.elem, 'id') !== undefined) {
    var labelElem = Romo.f('label[for="'+Romo.attr(this.elem, 'id')+'"]');
    Romo.on(labelElem, 'click', Romo.proxy(function(e) {
      e.preventDefault();
      this.romoSelectDropdown.doFocus();
    }, this));
  }

  Romo.on(window, "pageshow", Romo.proxy(function(e) {
    this._refreshUI();
  }, this));

  Romo.on(this.elem, 'romoSelect:triggerSetValue', Romo.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));
}

RomoSelect.prototype._bindSelectedOptionsList = function() {
  this.romoSelectedOptionsList = undefined;
  if (this.elem.multiple === true) {
    if (Romo.data(this.elem, 'romo-select-multiple-item-class') !== undefined) {
      Romo.setData(
        this.romoSelectDropdown.elem,
        'romo-selected-options-list-item-class',
        Romo.data(this.elem, 'romo-select-multiple-item-class')
      );
    }
    if (Romo.data(this.elem, 'romo-select-multiple-max-rows') !== undefined) {
      Romo.setData(
        this.romoSelectDropdown.elem,
        'romo-selected-options-list-max-rows',
        Romo.data(this.elem, 'romo-select-multiple-max-rows')
      );
    }

    this.romoSelectedOptionsList = new RomoSelectedOptionsList(this.romoSelectDropdown.elem);
    Romo.on(
      this.romoSelectedOptionsList.elem,
      'romoSelectedOptionsList:itemClick',
      Romo.proxy(function(e, itemValue, romoSelectedOptionsList) {
        var currentValues = this._elemValues();
        var index         = currentValues.indexOf(itemValue);
        if (index > -1) {
          currentValues.splice(index, 1);
          this._setValues(currentValues);
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
        Romo.trigger(this.romoSelectDropdown.elem, 'romoDropdown:triggerPopupClose', []);
        this.romoSelectDropdown.doFocus(false);
      }, this)
    );

    Romo.before(this.elemWrapper, this.romoSelectedOptionsList.elem);
    this.romoSelectedOptionsList.doRefreshUI();
  }
}

RomoSelect.prototype._bindSelectDropdown = function() {
  this.romoSelectDropdown = new RomoSelectDropdown(this._buildSelectDropdownElem(), this.elem);

  Romo.on(
    this.romoSelectDropdown.elem,
    'romoSelectDropdown:romoDropdown:toggle',
    Romo.proxy(function(e, romoDropdown, romoSelectDropdown) {
      Romo.trigger(this.elem, 'romoSelect:romoDropdown:toggle', [romoDropdown, this]);
    }, this)
  );
  Romo.on(
    this.romoSelectDropdown.elem,
    'romoSelectDropdown:romoDropdown:popupOpen',
    Romo.proxy(function(e, romoDropdown, romoSelectDropdown) {
      Romo.trigger(this.elem, 'romoSelect:romoDropdown:popupOpen', [romoDropdown, this]);
    }, this)
  );
  Romo.on(
    this.romoSelectDropdown.elem,
    'romoSelectDropdown:romoDropdown:popupClose',
    Romo.proxy(function(e, romoDropdown, romoSelectDropdown) {
      Romo.trigger(this.elem, 'romoSelect:romoDropdown:popupClose', [romoDropdown, this]);
    }, this)
  );

  Romo.on(
    this.romoSelectDropdown.elem,
    'romoSelectDropdown:itemSelected',
    Romo.proxy(function(e, itemValue, itemDisplayText, romoSelectDropdown) {
      this.romoSelectDropdown.doFocus();
      Romo.trigger(this.elem, 'romoSelect:itemSelected', [itemValue, itemDisplayText, this]);
    }, this)
  );
  Romo.on(
    this.romoSelectDropdown.elem,
    'romoSelectDropdown:newItemSelected',
    Romo.proxy(function(e, itemValue, itemDisplayText, romoSelectDropdown) {
      if (this.romoSelectedOptionsList !== undefined) {
        var currentValues = this._elemValues();
        if (!currentValues.includes(itemValue)) {
          this._setValues(currentValues.concat([itemValue]));
          this.romoSelectedOptionsList.doAddItem({
            'value':       itemValue,
            'displayText': itemDisplayText
          });
        }
      } else {
        this._setValues([itemValue]);
      }
      this._refreshUI();
      Romo.trigger(this.elem, 'romoSelect:newItemSelected', [itemValue, itemDisplayText, this]);
    }, this)
  );
  Romo.on(
    this.romoSelectDropdown.elem,
    'romoSelectDropdown:change',
    Romo.proxy(function(e, newValue, prevValue, romoSelectDropdown) {
      Romo.trigger(this.elem, 'change');
      if (this.romoSelectedOptionsList !== undefined) {
        Romo.trigger(
          this.elem,
          'romoSelect:multipleChange',
          [this._elemValues(), newValue, this]
        );
      } else {
        Romo.trigger(this.elem, 'romoSelect:change', [newValue, prevValue, this]);
      }
    }, this)
  );
}

RomoSelect.prototype._buildSelectDropdownElem = function() {
  var romoSelectDropdownElem = Romo.elems(
    '<div class="romo-select romo-btn" tabindex="0">'+
      '<span class="romo-select-text"></span>'+
    '</div>'
  )[0];

  Romo.setData(romoSelectDropdownElem, 'romo-dropdown-overflow-x', 'hidden');
  Romo.setData(romoSelectDropdownElem, 'romo-dropdown-width',      'elem');

  if (Romo.data(this.elem, 'romo-select-dropdown-position') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-dropdown-position',
      Romo.data(this.elem, 'romo-select-dropdown-position')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-style-class') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-dropdown-style-class',
      Romo.data(this.elem, 'romo-select-dropdown-style-class')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-min-height') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-dropdown-min-height',
      Romo.data(this.elem, 'romo-select-dropdown-min-height')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-max-height') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-dropdown-max-height',
      Romo.data(this.elem, 'romo-select-dropdown-max-height')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-height') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-dropdown-height',
      Romo.data(this.elem, 'romo-select-dropdown-height')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-append-to-closest') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-append-to-closest',
      Romo.data(this.elem, 'romo-select-dropdown-append-to-closest')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-append-to') !== undefined) {
    Romo.setData(
      romoOptionListDropdownElem,
      'romo-dropdown-append-to',
      Romo.data(this.elem, 'romo-select-dropdown-append-to')
    );
  }
  if (Romo.data(this.elem, 'romo-select-filter-placeholder') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-filter-placeholder',
      Romo.data(this.elem, 'romo-select-filter-placeholder')
    );
  }
  if (Romo.data(this.elem, 'romo-select-filter-indicator') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-filter-indicator',
      Romo.data(this.elem, 'romo-select-filter-indicator')
    );
  }
  if (Romo.data(this.elem, 'romo-select-filter-indicator-width-px') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-filter-indicator-width-px',
      Romo.data(this.elem, 'romo-select-filter-indicator-width-px')
    );
  }
  if (Romo.data(this.elem, 'romo-select-no-filter') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-no-filter',
      Romo.data(this.elem, 'romo-select-no-filter')
    );
  }
  if (Romo.data(this.elem, 'romo-select-custom-option') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-custom-option',
      Romo.data(this.elem, 'romo-select-custom-option')
    );
  }
  if (Romo.data(this.elem, 'romo-select-custom-option-prompt') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-custom-option-prompt',
      Romo.data(this.elem, 'romo-select-custom-option-prompt')
    );
  }
  if (Romo.data(this.elem, 'romo-select-open-on-focus') !== undefined) {
    Romo.setData(
      romoSelectDropdownElem,
      'romo-select-dropdown-open-on-focus',
      Romo.data(this.elem, 'romo-select-open-on-focus')
    );
  }

  if (Romo.data(romoSelectDropdownElem, 'romo-dropdown-max-height') === undefined) {
    Romo.setData(romoSelectDropdownElem, 'romo-dropdown-max-height', 'detect');
  }

  if (Romo.attr(this.elem, 'class') !== undefined) {
    Romo.addClass(romoSelectDropdownElem, Romo.attr(this.elem, 'class'));
  }
  if (Romo.attr(this.elem, 'style') !== undefined) {
    Romo.setAttr(romoSelectDropdownElem, 'style', Romo.attr(this.elem, 'style'));
  }
  Romo.setStyle(romoSelectDropdownElem, 'width', Romo.width(this.elem)+'px');
  if (Romo.attr(this.elem, 'disabled') !== undefined) {
    Romo.setAttr(this.romoSelectDropdown.elem, 'disabled', Romo.attr(this.elem, 'disabled'));
  }

  Romo.after(this.elem, romoSelectDropdownElem);
  Romo.hide(this.elem);

  this.elemWrapper = Romo.elems('<div class="romo-select-wrapper"></div>')[0];
  if (Romo.data(this.elem, 'romo-select-btn-group') === true) {
    Romo.addClass(this.elemWrapper, 'romo-btn-group');
  }
  Romo.before(romoSelectDropdownElem, this.elemWrapper);
  Romo.append(this.elemWrapper, romoSelectDropdownElem);
  Romo.parentChildElems.add(this.elem, [this.elemWrapper]);

  this.caretElem = undefined;
  var caretClass = Romo.data(this.elem, 'romo-select-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    this.caretElem = Romo.elems('<i class="romo-select-caret '+caretClass+'"></i>')[0];
    Romo.setStyle(
      this.caretElem,
      'line-height',
      Romo.css(romoSelectDropdownElem, 'line-height')
    );
    Romo.on(this.caretElem, 'click', Romo.proxy(this._onCaretClick, this));
    Romo.append(romoSelectDropdownElem, this.caretElem);

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
      romoSelectDropdownElem,
      'padding-'+caretPosition,
      dropdownPaddingPx+'px'
    );
  }

  return romoSelectDropdownElem;
}

RomoSelect.prototype._setValues = function(newValues) {
  var currentValues = this._elemValues();

  var unsetValues = currentValues.filter(function(value) {
    return newValues.indexOf(value) === -1;
  });
  var unsetElems = unsetValues.map(Romo.proxy(function(value) {
    return Romo.find(this.elem, 'OPTION[value="'+value+'"]')[0];
  }, this));
  var setElems = newValues.map(Romo.proxy(function(value) {
    return Romo.find(this.elem, 'OPTION[value="'+value+'"]')[0];
  }, this));

  // set the property before modifying the DOM, Safari has a bug where it won't
  // allow setting the property if the DOM is updated first
  unsetElems.forEach(Romo.proxy(function(unsetElem) {
    unsetElem.selected = false;
    Romo.rmAttr(unsetElem, 'selected');
  }, this));
  setElems.forEach(Romo.proxy(function(setElem) {
    setElem.selected = true;
    Romo.setAttr(setElem, 'selected', 'selected');
  }, this));
}

RomoSelect.prototype._elemValues = function() {
  var selectedOptElems = Romo.find(this.elem, 'OPTION[selected]');
  if (selectedOptElems.length === 0 && this.romoSelectedOptionsList === undefined) {
    // if a non-multi select has no selected options, treat the first option as selected
    var firstOptElem = Romo.find(this.elem, 'OPTION')[0];
    if (firstOptElem !== undefined) {
      selectedOptElems = [firstOptElem];
    }
  }
  return selectedOptElems.map(function(selectedOptElem) {
    return (Romo.attr(selectedOptElem, 'value') || '');
  });
}

RomoSelect.prototype._refreshUI = function() {
  var text = '';
  if (this.romoSelectedOptionsList !== undefined) {
    this.romoSelectedOptionsList.doRefreshUI();
  } else if (this._elemValues().length !== 0) {
    var optionElem = Romo.find(this.elem, 'OPTION[value="'+this._elemValues()[0]+'"]')[0];
    if (optionElem !== undefined) {
      text = optionElem.innerText.trim();
    }
  }

  var textElem = Romo.find(this.romoSelectDropdown.elem, '.romo-select-text')[0];
  if (text === '') {
    Romo.updateHtml(textElem, '<span>&nbsp;</span>');
  } else {
    Romo.updateText(textElem, text);
  }
}

RomoSelect.prototype._getCaretPaddingPx = function() {
  return (
    Romo.data(this.elem, 'romo-select-caret-padding-px') ||
    this.defaultCaretPaddingPx
  );
}

RomoSelect.prototype._getCaretWidthPx = function() {
  return (
    Romo.data(this.elem, 'romo-select-caret-width-px') ||
    this._parseCaretWidthPx()
  );
}

RomoSelect.prototype._getCaretPosition = function() {
  return (
    Romo.data(this.elem, 'romo-select-caret-position') ||
    this.defaultCaretPosition
  );
}

RomoSelect.prototype._parseCaretWidthPx = function() {
  var widthPx = Romo.width(this.caretElem);
  if (isNaN(widthPx)) {
    widthPx = this.defaultCaretWidthPx;
  }
  return widthPx;
}

// event functions

RomoSelect.prototype.romoEvFn._onCaretClick = function(e) {
  if (this.elem.disabled === false) {
    this.romoSelectDropdown.doFocus();
    Romo.trigger(this.elem, 'romoSelect:triggerPopupOpen');
  }
}

// init

Romo.addElemsInitSelector('[data-romo-select-auto="true"]', RomoSelect);
