$.fn.romoSelect = function() {
  return $.map(this, function(element) {
    return new RomoSelect(element);
  });
}

var RomoSelect = function(element) {
  this.elem = $(element);

  this.defaultCaretClass     = undefined;
  this.defaultCaretPaddingPx = 5;
  this.defaultCaretPosition  = 'right'

  this.doInit();
  this._bindElem();

  this.doSetValue(this.elem[0].value);

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoSelectDropdown.elem.focus();
    }, this));
  }

  $(window).on("pageshow", $.proxy(function(e) {
    this._refreshUI();
  }, this));

  this.elem.on('select:triggerSetValue', $.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));

  this.elem.trigger('select:ready', [this]);
}

RomoSelect.prototype.doInit = function() {
  // override as needed
}

RomoSelect.prototype.doSetValue = function(value) {
  // TODO: support multi
  // if value is an Array
  //   assume list of values
  //   if sel opt list
  //     `doSetListItems(value-text-items)`  // build items from values/options
  //     set select dropdown to ''
  //     set value
  //   else
  //     set select dropdown to data[0].value, data[0].displayText
  //     set data[0].value
  //   end
  // else
  //   if sel opt list
  //     `doSetListItems([{value, text}])`   // lookup text from options
  //     set select dropdown to ''
  //     set value
  //   else
  //     set select dropdown to value, text
  //     set value
  //   end
  // end
  this.romoSelectDropdown.doSetSelectedItem(value);
  this._setValue(value);

  this._refreshUI();
}

/* private */

RomoSelect.prototype._bindElem = function() {
  this._bindSelectDropdown();
  this._bindSelectedOptionsList();

  this.elem.on('select:triggerToggle', $.proxy(function(e) {
    this.romoSelectDropdown.elem.trigger('selectDropdown:triggerToggle', []);
  }, this));
  this.elem.on('select:triggerPopupOpen', $.proxy(function(e) {
    this.romoSelectDropdown.elem.trigger('selectDropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('select:triggerPopupClose', $.proxy(function(e) {
    this.romoSelectDropdown.elem.trigger('selectDropdown:triggerPopupClose', []);
  }, this));
}

RomoSelect.prototype._bindSelectedOptionsList = function() {
  this.romoSelectedOptionsList = undefined;
  if (this.elem.prop('multiple') === true) {
    if (this.elem.data('romo-select-multiple-item-class') !== undefined) {
      this.romoSelectDropdown.elem.attr('data-romo-selected-options-list-item-class', this.elem.data('romo-select-multiple-item-class'));
    }
    if (this.elem.data('romo-select-multiple-max-rows') !== undefined) {
      this.romoSelectDropdown.elem.attr('data-romo-selected-options-list-max-rows', this.elem.data('romo-select-multiple-max-rows'));
    }
    this.romoSelectedOptionsList = new RomoSelectedOptionsList(this.romoSelectDropdown.elem);
    this.elemWrapper.before(this.romoSelectedOptionsList.elem);
    this.romoSelectedOptionsList.doRefreshUI();
  }
}

RomoSelect.prototype._bindSelectDropdown = function() {
  this.romoSelectDropdown = this._buildSelectDropdownElem().romoSelectDropdown(this.elem)[0];

  this.romoSelectDropdown.elem.on('selectDropdown:dropdown:toggle', $.proxy(function(e, dropdown, selectDropdown) {
    this.elem.trigger('select:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:dropdown:popupOpen', $.proxy(function(e, dropdown, selectDropdown) {
    this.elem.trigger('select:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:dropdown:popupClose', $.proxy(function(e, dropdown, selectDropdown) {
    this.elem.trigger('select:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.romoSelectDropdown.elem.on('selectDropdown:itemSelected', $.proxy(function(e, itemValue, itemDisplayText, selectDropdown) {
    // TODO: if sel opt list, do nothing
    this.romoSelectDropdown.elem.focus();
    this.elem.trigger('select:itemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:newItemSelected', $.proxy(function(e, itemValue, itemDisplayText, selectDropdown) {
    // TODO: support multi
    if (this.romoSelectedOptionsList !== undefined) {
      this.romoSelectedOptionsList.doAddItem({
        'value':       itemValue,
        'displayText': itemDisplayText
      });
      // set append-values
    } else {
      this._setValue(itemValue);
    }

    this._refreshUI();
    this.elem.trigger('select:newItemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:change', $.proxy(function(e, newValue, prevValue, selectDropdown) {
    this.elem.trigger('change');
    this.elem.trigger('select:change', [newValue, prevValue, this]);
  }, this));
}

RomoSelect.prototype._buildSelectDropdownElem = function() {
  var romoSelectDropdownElem = $('<div class="romo-select romo-btn" tabindex="0"><span class="romo-select-text"></span></div>');

  romoSelectDropdownElem.attr('data-romo-dropdown-position', this.elem.data('romo-select-dropdown-position'));
  romoSelectDropdownElem.attr('data-romo-dropdown-style-class', this.elem.data('romo-select-dropdown-style-class'));
  romoSelectDropdownElem.attr('data-romo-dropdown-min-height', this.elem.data('romo-select-dropdown-min-height'));
  romoSelectDropdownElem.attr('data-romo-dropdown-max-height', this.elem.data('romo-select-dropdown-max-height'));
  romoSelectDropdownElem.attr('data-romo-dropdown-height', this.elem.data('romo-select-dropdown-height'));
  romoSelectDropdownElem.attr('data-romo-dropdown-overflow-x', 'hidden');
  romoSelectDropdownElem.attr('data-romo-dropdown-width', 'elem');
  if (romoSelectDropdownElem.data('romo-dropdown-max-height') === undefined) {
    romoSelectDropdownElem.attr('data-romo-dropdown-max-height', 'detect');
  }
  if (this.elem.data('romo-select-filter-placeholder') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-filter-placeholder', this.elem.data('romo-select-filter-placeholder'));
  }
  if (this.elem.data('romo-select-filter-indicator') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-filter-indicator', this.elem.data('romo-select-filter-indicator'));
  }
  if (this.elem.data('romo-select-filter-indicator-width-px') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-filter-indicator-width-px', this.elem.data('romo-select-filter-indicator-width-px'));
  }
  if (this.elem.data('romo-select-no-filter') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-no-filter', this.elem.data('romo-select-no-filter'));
  }
  if (this.elem.data('romo-select-custom-option') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-custom-option', this.elem.data('romo-select-custom-option'));
  }
  if (this.elem.data('romo-select-custom-option-prompt') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-custom-option-prompt', this.elem.data('romo-select-custom-option-prompt'));
  }
  if (this.elem.data('romo-select-open-on-focus') !== undefined) {
    romoSelectDropdownElem.attr('data-romo-select-dropdown-open-on-focus', this.elem.data('romo-select-open-on-focus'));
  }

  var classList = this.elem.attr('class') !== undefined ? this.elem.attr('class').split(/\s+/) : [];
  $.each(classList, function(idx, classItem) {
    romoSelectDropdownElem.addClass(classItem);
  });
  if (this.elem.attr('style') !== undefined) {
    romoSelectDropdownElem.attr('style', this.elem.attr('style'));
  }
  romoSelectDropdownElem.css({'width': this.elem.css('width')});
  if (this.elem.attr('disabled') !== undefined) {
    this.romoSelectDropdown.elem.attr('disabled', this.elem.attr('disabled'));
  }

  this.elem.after(romoSelectDropdownElem);
  this.elem.hide();

  this.elemWrapper = $('<div class="romo-select-wrapper"></div>');
  if (this.elem.data('romo-select-btn-group') === true) {
    this.elemWrapper.addClass('romo-btn-group');
  }
  romoSelectDropdownElem.before(this.elemWrapper);
  this.elemWrapper.append(romoSelectDropdownElem);

  // the elem wrapper should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem (select) is removed.
  // delay adding it b/c other components may `append` generated selects
  // meaning the select is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the wrapper.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.elemWrapper]);
  }, this), 1);

  this.caretElem = $();
  var caretClass = this.elem.data('romo-select-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    this.caretElem = $('<i class="romo-select-caret '+caretClass+'"></i>');
    this.caretElem.css('line-height', parseInt(Romo.getComputedStyle(romoSelectDropdownElem[0], "line-height"), 10)+'px');
    this.caretElem.on('click', $.proxy(this._onCaretClick, this));
    romoSelectDropdownElem.append(this.caretElem);

    var caretPaddingPx = this._getCaretPaddingPx();
    var caretWidthPx   = this._getCaretWidthPx();
    var caretPosition  = this._getCaretPosition();

    // add a pixel to account for the default input border
    this.caretElem.css(caretPosition, caretPaddingPx+1);

    // left-side padding
    // + caret width
    // + right-side padding
    var dropdownPaddingPx = caretPaddingPx + caretWidthPx + caretPaddingPx;
    romoSelectDropdownElem.css('padding-'+caretPosition, dropdownPaddingPx+'px');
  }

  return romoSelectDropdownElem;
}

RomoSelect.prototype._setValue = function(value) {
  // TODO: support multi
  // where given value is an array
  // and wehre elme[0].value is an array
  var prevOptElem = this.elem.find('OPTION[value="'+this.elem[0].value+'"]');
  var newOptElem  = this.elem.find('OPTION[value="'+value+'"]');

  prevOptElem.removeAttr('selected');
  prevOptElem.prop('selected', false);
  newOptElem.attr('selected', 'selected');
  newOptElem.prop('selected', true);
}

RomoSelect.prototype._refreshUI = function() {
  var text = undefined;
  if (this.romoSelectedOptionsList !== undefined) {
    text = '';
    this.romoSelectedOptionsList.doRefreshUI();
  } else {
    text = this.elem.find('OPTION[selected="selected"]').text().trim();
  }
  if (text === '') {
    text = '&nbsp;'
  }
  this.romoSelectDropdown.elem.find('.romo-select-text').html(text);
}

RomoSelect.prototype._onCaretClick = function(e) {
  if (this.elem.prop('disabled') === false) {
    this.romoSelectDropdown.elem.focus();
    this.elem.trigger('select:triggerPopupOpen');
  }
}

RomoSelect.prototype._getCaretPaddingPx = function() {
  return (
    this.elem.data('romo-select-caret-padding-px') ||
    this.defaultCaretPaddingPx
  );
}

RomoSelect.prototype._getCaretWidthPx = function() {
  return (
    this.elem.data('romo-select-caret-width-px') ||
    parseInt(Romo.getComputedStyle(this.caretElem[0], "width"), 10)
  );
}

RomoSelect.prototype._getCaretPosition = function() {
  return (
    this.elem.data('romo-select-caret-position') ||
    this.defaultCaretPosition
  );
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-auto="true"]').romoSelect();
});
