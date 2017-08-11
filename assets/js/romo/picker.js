$.fn.romoPicker = function() {
  return $.map(this, function(element) {
    return new RomoPicker(element);
  });
}

var RomoPicker = function(element) {
  this.elem = $(element);

  this.defaultCaretClass     = undefined;
  this.defaultCaretPaddingPx = 5;
  this.defaultCaretPosition  = 'right'

  this.defaultOptionItems = this._buildDefaultOptionItems();

  this.doInit();
  this._bindElem();
  this.doRefreshUI();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoOptionListDropdown.elem.focus();
    }, this));
  }

  $(window).on("pageshow", $.proxy(function(e) {
    var selectedVal = this.romoOptionListDropdown.selectedItemValue();
    if (selectedVal !== this.elem[0].value) {
      this.doSetValue(selectedVal);
    }
  }, this));

  this.elem.on('romoPicker:triggerSetValue', $.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));

  this.elem.trigger('romoPicker:ready', [this]);
}

RomoPicker.prototype.doInit = function() {
  // override as needed
}

RomoPicker.prototype.doRefreshUI = function() {
  var text = this.romoOptionListDropdown.selectedItemText();
  if (text === '') {
    text = '&nbsp;'
  }
  this.romoOptionListDropdown.elem.find('.romo-picker-text').html(text);
}

RomoPicker.prototype.doSetValue = function(value) {
  this.romoOptionListDropdown.doSetNewValue(value);
  this._setNewValue(value);
}

/* private */

RomoPicker.prototype._bindElem = function() {
  this._bindOptionListDropdown();
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

  this.elem.on('romoOptionListDropdown:filterChange', $.proxy(function(e, filterValue, romoOptionListDropdown) {
    this.romoOptionListDropdown.elem.trigger('romoAjax:triggerInvoke', [{ 'filter': filterValue }]);
  }, this));

  this.romoOptionListDropdown.doSetListItems(this.defaultOptionItems);
}

RomoPicker.prototype._bindOptionListDropdown = function() {
  this.romoOptionListDropdown = this._buildOptionListDropdownElem().romoOptionListDropdown(this.elem)[0];

  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:dropdown:toggle', $.proxy(function(e, dropdown, optionListDropdown) {
    this.elem.trigger('romoPicker:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:dropdown:popupOpen', $.proxy(function(e, dropdown, optionListDropdown) {
    this.elem.trigger('romoPicker:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:dropdown:popupClose', $.proxy(function(e, dropdown, optionListDropdown) {
    this.elem.trigger('romoPicker:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:itemSelected', $.proxy(function(e, newValue, prevValue, optionListDropdown) {
    this.romoOptionListDropdown.elem.focus();
    this.elem.trigger('romoPicker:itemSelected', [newValue, prevValue, this]);
  }, this));
  this.romoOptionListDropdown.elem.on('romoOptionListDropdown:change', $.proxy(function(e, newValue, prevValue, optionListDropdown) {
    this._setNewValue(newValue);
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
  this.romoOptionListDropdown.elem.attr('data-romo-ajax-disable-default-invoke-on', true);
  this.romoOptionListDropdown.elem.attr('data-romo-ajax-url-attr', 'data-romo-picker-url');
  this.romoOptionListDropdown.elem.attr('data-romo-ajax-auto', false);

  this.romoOptionListDropdown.elem.on('romoAjax:callStart', $.proxy(function(e, data, romoAjax) {
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerFilterIndicatorStart', []);
  }, this));
  this.romoOptionListDropdown.elem.on('romoAjax:callSuccess', $.proxy(function(e, data, romoAjax) {
    this.romoOptionListDropdown.doSetListItems(this.defaultOptionItems.concat(data));
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerFilterIndicatorStop', []);
  }, this));
  this.romoOptionListDropdown.elem.on('romoAjax:callError', $.proxy(function(e, xhr, romoAjax) {
    this.romoOptionListDropdown.doSetListItems(this.defaultOptionItems);
    this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerFilterIndicatorStop', []);
  }, this));

  this.romoOptionListDropdown.elem.romoAjax();
}

RomoPicker.prototype._buildDefaultOptionItems = function(e) {
  var items = []

  if (this.elem.data('romo-picker-empty-option') === true) {
    items.push({
      'type':        'option',
      'value':       '',
      'displayText': '',
      'displayHtml': '&nbsp;'
    });
  }

  return items;
}

RomoPicker.prototype._onCaretClick = function(e) {
  if (this.elem.prop('disabled') === false) {
    this.romoOptionListDropdown.elem.focus();
    this.elem.trigger('romoPicker:triggerPopupOpen');
  }
}

RomoPicker.prototype._setNewValue = function(newValue) {
  this.elem[0].value = newValue;
  this.doRefreshUI();
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

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-picker-auto="true"]').romoPicker();
});
