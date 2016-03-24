$.fn.romoSelect = function() {
  return $.map(this, function(element) {
    return new RomoSelect(element);
  });
}

var RomoSelect = function(element) {
  this.elem = $(element);

  this.defaultCaretClass   = undefined;
  this.defaultCaretWidthPx = 0;

  this.doInit();
  this.doBindSelectDropdown();
  this.doRefreshUI();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoSelectDropdown.elem.focus();
    }, this));
  }

  $(window).on("pageshow", $.proxy(function(e) {
    var selectedVal = this.elem.find('option[selected]').attr('value');
    if (selectedVal === undefined) {
      selectedVal = '';
    }
    if (selectedVal !== this.elem[0].value) {
      this.doSetValue(selectedVal);
    }
  }, this));

  this.elem.on('select:triggerSetValue', $.proxy(function(e, value) {
    this.doSetValue(value)
  }, this));

  this.elem.trigger('select:ready', [this]);
}

RomoSelect.prototype.doInit = function() {
  // override as needed
}

RomoSelect.prototype.doBindSelectDropdown = function() {
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

  this.romoSelectDropdown.elem.on('selectDropdown:itemSelected', $.proxy(function(e, newValue, prevValue, selectDropdown) {
    this.romoSelectDropdown.elem.focus();
    this.elem.trigger('select:itemSelected', [newValue, prevValue, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:change', $.proxy(function(e, newValue, prevValue, selectDropdown) {
    this._setNewValue(newValue);
    this.elem.trigger('change');
    this.elem.trigger('select:change', [newValue, prevValue, this]);
  }, this));

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

RomoSelect.prototype.doRefreshUI = function() {
  var text = this.romoSelectDropdown.selectedListing().text() || '&nbsp;';
  this.romoSelectDropdown.elem.find('.romo-select-text').html(text);
}

RomoSelect.prototype.doSetValue = function(value) {
  this.romoSelectDropdown.doSetNewValue(value);
  this._setNewValue(value);
}

RomoSelect.prototype.onCaretClick = function(e) {
  if (this.elem.prop('disabled') === false) {
    this.romoSelectDropdown.elem.focus();
    this.elem.trigger('select:triggerPopupOpen');
  }
}

RomoSelect.prototype._setNewValue = function(newValue) {
  this.elem[0].value = newValue;
  this.doRefreshUI();
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

  var caretClass = this.elem.data('romo-select-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    var caret = $('<i class="romo-select-caret '+caretClass+'"></i>');
    caret.css({'line-height': romoSelectDropdownElem.css('line-height')});
    caret.on('click', $.proxy(this.onCaretClick, this));

    var caretWidthPx   = this.elem.data('romo-select-caret-width-px') || this.defaultCaretWidthPx;
    // left-side spacing
    // + caret width
    // - 1 px select styling optical illusion
    // + right-side spacing
    var caretPaddingPx = 4 + caretWidthPx - 1 + 4;
    romoSelectDropdownElem.css({'padding-right': caretPaddingPx + 'px'});
    romoSelectDropdownElem.append(caret);
  }

  return romoSelectDropdownElem;
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-auto="true"]').romoSelect();
});
