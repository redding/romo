var RomoPicker = function(element) {
  this.elem = $(element);

  this.defaultCaretClass     = undefined;
  this.defaultCaretPaddingPx = 5;
  this.defaultCaretPosition  = 'right'
  this.defaultValuesDelim    = ',';

  this.defaultOptionItems  = this._buildDefaultOptionItems();
  this.filteredOptionItems = [];

  this.doInit();
  this._bindElem();

  this.doSetValue(this._elemValues());

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoOptionListDropdown.doFocus();
    }, this));
  }

  $(window).on("pageshow", $.proxy(function(e) {
    this._refreshUI();
  }, this));

  this.elem.on('romoPicker:triggerSetValue', $.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));

  this.elem.trigger('romoPicker:ready', [this]);
}

RomoPicker.prototype.doInit = function() {
  // override as needed
}

RomoPicker.prototype.doSetValue = function(values) {
  var value = undefined;
  if (Array.isArray(values)) {
    value = values.join(this._elemValuesDelim());
  } else {
    value = values;
  }
  $.ajax({
    type:    'GET',
    url:     this.elem.data('romo-picker-url'),
    data:    { 'values': value },
    success: $.proxy(function(data, status, xhr) { this.doSetValueDatas(data); }, this),
  });
}

RomoPicker.prototype.doSetValueDatas = function(valueDatas) {
  var datas = undefined;
  if (Array.isArray(valueDatas)) {
    datas = valueDatas;
  } else {
    datas = [valueDatas];
  }
  var values       = datas.map(function(data) { return data.value; });
  var displayTexts = datas.map(function(data) { return data.displayText; });

  if (this.romoSelectedOptionsList !== undefined) {
    this._setValuesAndDisplayText(values, '');
    this.romoSelectedOptionsList.doSetItems(datas);
  } else {
    var displayText = displayTexts[0] ||
                      this.elem.data('romo-picker-empty-option-display-text') ||
                      '';
    this._setValuesAndDisplayText(values, displayText);
    this.romoOptionListDropdown.doSetSelectedValueAndText(
      values[0],
      displayText
    );
  }
  this._refreshUI();
}

/* private */

RomoPicker.prototype._bindElem = function() {
  this._bindOptionListDropdown();
  this._bindSelectedOptionsList();
  this._bindAjax();

  this.elem.on('romoPicker:triggerToggle', $.proxy(function(e) {
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerToggle', []);
  }, this));
  this.elem.on('romoPicker:triggerPopupOpen', $.proxy(function(e) {
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('romoPicker:triggerPopupClose', $.proxy(function(e) {
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerPopupClose', []);
  }, this));

  this.romoOptionListDropdown.doSetListItems(this.defaultOptionItems);
}

RomoPicker.prototype._bindSelectedOptionsList = function() {
  this.romoSelectedOptionsList = undefined;
  if (this.elem.prop('multiple') === true) {
    if (this.elem.data('romo-picker-multiple-item-class') !== undefined) {
      this.romoOptionListDropdown.elem.attr('data-romo-selected-options-list-item-class', this.elem.data('romo-picker-multiple-item-class'));
    }
    if (this.elem.data('romo-picker-multiple-max-rows') !== undefined) {
      this.romoOptionListDropdown.elem.attr('data-romo-selected-options-list-max-rows', this.elem.data('romo-picker-multiple-max-rows'));
    }

    this.romoSelectedOptionsList = new RomoSelectedOptionsList(this.romoOptionListDropdown.elem);
    this.romoSelectedOptionsList.elem.on('romoSelectedOptionsList:itemClick', $.proxy(function(e, itemValue, romoSelectedOptionsList) {
      var currentValues = this._elemValues();
      var index         = currentValues.indexOf(itemValue);
      if (index > -1) {
        currentValues.splice(index, 1);
        this._setValuesAndDisplayText(currentValues, '');
      }
      this.romoSelectedOptionsList.doRemoveItem(itemValue);
      this._refreshUI();
    }, this));
    this.romoSelectedOptionsList.elem.on('romoSelectedOptionsList:listClick', $.proxy(function(e, romoSelectedOptionsList) {
      this.romoOptionListDropdown.elem.trigger('romoDropdown:triggerPopupClose', []);
      this.romoOptionListDropdown.doFocus(false);
    }, this));

    this.elemWrapper.before(this.romoSelectedOptionsList.elem);
    this.romoSelectedOptionsList.doRefreshUI();
  }
}

RomoPicker.prototype._bindOptionListDropdown = function() {
  this.romoOptionListDropdown = this._buildOptionListDropdownElem().romoOptionListDropdown(this.elem)[0];

  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:romoDropdown:toggle', $.proxy(function(e, romoDropdown, optionListDropdown) {
    this.elem.trigger('romoPicker:romoDropdown:toggle', [romoDropdown, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:romoDropdown:popupOpen', $.proxy(function(e, romoDropdown, optionListDropdown) {
    this.elem.trigger('romoPicker:romoDropdown:popupOpen', [romoDropdown, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:romoDropdown:popupClose', $.proxy(function(e, romoDropdown, optionListDropdown) {
    this.elem.trigger('romoPicker:romoDropdown:popupClose', [romoDropdown, this]);
  }, this));

  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:filterChange', $.proxy(function(e, filterValue, romoOptionListDropdown) {
    if (filterValue !== '') {
      // immediately update the custom opt as the filter changes
      // but keep the current filtered option items
      this._setListItems(this.filteredOptionItems.concat(this._buildCustomOptionItems()));
      // this will update with the new filtered items plus the custom on ajax callback
      this.elem.trigger('romoAjax:triggerInvoke', [{ 'filter': filterValue }]);
    } else {
      this._setListItems(this.defaultOptionItems.concat(this._buildCustomOptionItems()));
    }
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:itemSelected', $.proxy(function(e, itemValue, itemDisplayText, optionListDropdown) {
    this.romoOptionListDropdown.doFocus();
    this.elem.trigger('romoPicker:itemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:newItemSelected', $.proxy(function(e, itemValue, itemDisplayText, optionListDropdown) {
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
    this.elem.trigger('romoPicker:newItemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:change', $.proxy(function(e, newValue, prevValue, optionListDropdown) {
    this.elem.trigger('change');
    this.elem.trigger('romoPicker:change', [newValue, prevValue, this]);
  }, this));
}

RomoPicker.prototype._buildOptionListDropdownElem = function() {
  var romoOptionListDropdownElem = $('<div class="romo-picker romo-btn" tabindex="0"><span class="romo-picker-text"></span></div>');

  romoOptionListDropdownElem.attr('data-romo-option-list-focus-style-class', 'romo-picker-focus');

  romoOptionListDropdownElem.attr('data-romo-dropdown-position', this.elem.data('romo-picker-dropdown-position'));
  romoOptionListDropdownElem.attr('data-romo-dropdown-style-class', this.elem.data('romo-picker-dropdown-style-class'));
  romoOptionListDropdownElem.attr('data-romo-dropdown-min-height', this.elem.data('romo-picker-dropdown-min-height'));
  romoOptionListDropdownElem.attr('data-romo-dropdown-max-height', this.elem.data('romo-picker-dropdown-max-height'));
  romoOptionListDropdownElem.attr('data-romo-dropdown-height', this.elem.data('romo-picker-dropdown-height'));
  romoOptionListDropdownElem.attr('data-romo-dropdown-overflow-x', 'hidden');
  romoOptionListDropdownElem.attr('data-romo-dropdown-width', 'elem');
  if (romoOptionListDropdownElem.data('romo-dropdown-max-height') === undefined) {
    romoOptionListDropdownElem.attr('data-romo-dropdown-max-height', 'detect');
  }
  if (this.elem.data('romo-picker-filter-placeholder') !== undefined) {
    romoOptionListDropdownElem.attr('data-romo-option-list-dropdown-filter-placeholder', this.elem.data('romo-picker-filter-placeholder'));
  }
  if (this.elem.data('romo-picker-filter-indicator') !== undefined) {
    romoOptionListDropdownElem.attr('data-romo-option-list-dropdown-filter-indicator', this.elem.data('romo-picker-filter-indicator'));
  }
  if (this.elem.data('romo-picker-filter-indicator-width-px') !== undefined) {
    romoOptionListDropdownElem.attr('data-romo-option-list-filter-indicator-width-px', this.elem.data('romo-picker-filter-indicator-width-px'));
  }
  if (this.elem.data('romo-picker-no-filter') !== undefined) {
    romoOptionListDropdownElem.attr('data-romo-option-list-dropdown-no-filter', this.elem.data('romo-picker-no-filter'));
  }
  if (this.elem.data('romo-picker-open-on-focus') !== undefined) {
    romoOptionListDropdownElem.attr('data-romo-option-list-dropdown-open-on-focus', this.elem.data('romo-picker-open-on-focus'));
  }

  var classList = this.elem.attr('class') !== undefined ? this.elem.attr('class').split(/\s+/) : [];
  $.each(classList, function(idx, classItem) {
    romoOptionListDropdownElem.addClass(classItem);
  });
  if (this.elem.attr('style') !== undefined) {
    romoOptionListDropdownElem.attr('style', this.elem.attr('style'));
  }
  romoOptionListDropdownElem.css({'width': this.elem.css('width')});
  if (this.elem.attr('disabled') !== undefined) {
    this.romoOptionListDropdown.elem.attr('disabled', this.elem.attr('disabled'));
  }

  this.elem.after(romoOptionListDropdownElem);
  this.elem.hide();

  this.elemWrapper = $('<div class="romo-picker-wrapper"></div>');
  if (this.elem.data('romo-picker-btn-group') === true) {
    this.elemWrapper.addClass('romo-btn-group');
  }
  romoOptionListDropdownElem.before(this.elemWrapper);
  this.elemWrapper.append(romoOptionListDropdownElem);

  // the elem wrapper should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem (picker input) is removed.
  // delay adding it b/c other components may `append` generated pickers
  // meaning the picker is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the wrapper.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.elemWrapper]);
  }, this), 1);

  this.caretElem = $();
  var caretClass = this.elem.data('romo-picker-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    this.caretElem = $('<i class="romo-picker-caret '+caretClass+'"></i>');
    this.caretElem.css('line-height', parseInt(Romo.getComputedStyle(romoOptionListDropdownElem[0], "line-height"), 10)+'px');
    this.caretElem.on('click', $.proxy(this._onCaretClick, this));
    romoOptionListDropdownElem.append(this.caretElem);

    var caretPaddingPx = this._getCaretPaddingPx();
    var caretWidthPx   = this._getCaretWidthPx();
    var caretPosition  = this._getCaretPosition();

    // add a pixel to account for the default input border
    this.caretElem.css(caretPosition, caretPaddingPx+1);

    // left-side padding
    // + caret width
    // + right-side padding
    var dropdownPaddingPx = caretPaddingPx + caretWidthPx + caretPaddingPx;
    romoOptionListDropdownElem.css('padding-'+caretPosition, dropdownPaddingPx+'px');
  }

  return romoOptionListDropdownElem;
}

RomoPicker.prototype._bindAjax = function() {
  this.elem.attr('data-romo-ajax-disable-default-invoke-on', true);
  this.elem.attr('data-romo-ajax-url-attr', 'data-romo-picker-url');
  this.elem.attr('data-romo-ajax-auto', false);

  this.elem.on('romoAjax:callStart', $.proxy(function(e, data, romoAjax) {
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerFilterIndicatorStart', []);
    return false;
  }, this));
  this.elem.on('romoAjax:callSuccess', $.proxy(function(e, data, romoAjax) {
    this.filteredOptionItems = data;
    this._setListItems(this.filteredOptionItems.concat(this._buildCustomOptionItems()));
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerFilterIndicatorStop', []);
    return false;
  }, this));
  this.elem.on('romoAjax:callError', $.proxy(function(e, xhr, romoAjax) {
    this._setListItems(this.defaultOptionItems.concat(this._buildCustomOptionItems()));
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerFilterIndicatorStop', []);
    return false;
  }, this));

  this.romoAjax = new RomoAjax(this.elem);
}

RomoPicker.prototype._setListItems = function(items) {
  this.romoOptionListDropdown.doSetListItems(items);
  this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerListOptionsUpdate', [this.romoOptionListDropdown.optItemElems().first()]);
}

RomoPicker.prototype._buildDefaultOptionItems = function() {
  var items = []

  if (this.elem.data('romo-picker-empty-option') === true) {
    items.push({
      'type':        'option',
      'value':       '',
      'displayText': (this.elem.data('romo-picker-empty-option-display-text') || ''),
      'displayHtml': '&nbsp;'
    });
  }

  return items;
}

RomoPicker.prototype._buildCustomOptionItems = function() {
  var items = [];

  var value = this.romoOptionListDropdown.optionFilterValue();
  if (value !== '' && this.elem.data('romo-picker-custom-option') === true) {
    var prompt = this.elem.data('romo-picker-custom-option-prompt');
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
  this.elem[0].value = newValues.join(this._elemValuesDelim());

  // store the display text on the DOM to compliment the value being stored on the
  // DOM via the elem above.  need to use `attr` to persist selected values to the
  // DOM for back button logic to work.  using `data` won't persist changes to DOM
  // and breaks how the component deals with back-button behavior.
  this.elem.attr('data-romo-picker-display-text', displayText);
}

RomoPicker.prototype._elemValues = function() {
  return this.elem[0].value.split(this._elemValuesDelim()).filter(function(v){ return v !== ''; });
}

RomoPicker.prototype._elemValuesDelim = function() {
  return this.elem.data('romo-picker-values-delim') || this.defaultValuesDelim;
}

RomoPicker.prototype._refreshUI = function() {
  // need to use `attr` so it will always read from the DOM
  // using `data` works the first time but does some elem caching or something
  // so it won't work subsequent times.
  var text = this.elem.attr('data-romo-picker-display-text');
  if (this.romoSelectedOptionsList !== undefined) {
    this.romoSelectedOptionsList.doRefreshUI();
  }
  if (text === '') {
    text = '&nbsp;'
  }
  this.romoOptionListDropdown.elem.find('.romo-picker-text').html(text);
}

RomoPicker.prototype._onCaretClick = function(e) {
  if (this.elem.prop('disabled') === false) {
    this.romoOptionListDropdown.doFocus();
    this.elem.trigger('romoPicker:triggerPopupOpen');
  }
}

RomoPicker.prototype._getCaretPaddingPx = function() {
  return (
    this.elem.data('romo-picker-caret-padding-px') ||
    this.defaultCaretPaddingPx
  );
}

RomoPicker.prototype._getCaretWidthPx = function() {
  return (
    this.elem.data('romo-picker-caret-width-px') ||
    parseInt(Romo.getComputedStyle(this.caretElem[0], "width"), 10)
  );
}

RomoPicker.prototype._getCaretPosition = function() {
  return (
    this.elem.data('romo-picker-caret-position') ||
    this.defaultCaretPosition
  );
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-picker-auto="true"]').forEach(function(elem) { new RomoPicker(elem); });
});
