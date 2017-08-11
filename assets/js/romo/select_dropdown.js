$.fn.romoSelectDropdown = function(optionElemsParent) {
  return $.map(this, function(element) {
    return new RomoSelectDropdown(element, optionElemsParent);
  });
}

var RomoSelectDropdown = function(element, optionElemsParent) {
  this.elem = $(element);

  this.filterHiddenClass = 'romo-select-filter-hidden';

  var optsParent   = (optionElemsParent || this.elem.find('.romo-select-dropdown-options-parent'));
  this.optionElems = optsParent.children();

  this.doInit();
  this._bindElem();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.elem.focus();
    }, this));
  }

  this.elem.trigger('selectDropdown:ready', [this]);
}

RomoSelectDropdown.prototype.bodyElem = function() {
  return this.romoOptionListDropdown.bodyElem();
}

RomoSelectDropdown.prototype.popupElem = function() {
  return this.romoOptionListDropdown.popupElem();
}

RomoSelectDropdown.prototype.selectedItemElem = function() {
  return this.romoOptionListDropdown.selectedItemElem();
}

RomoSelectDropdown.prototype.selectedItemValue = function() {
  return this.romoOptionListDropdown.selectedItemValue();
}

RomoSelectDropdown.prototype.selectedItemText = function() {
  return this.romoOptionListDropdown.selectedItemText();
}

RomoSelectDropdown.prototype.optItemElems = function() {
  return this.romoOptionListDropdown.optItemElems();
}

RomoSelectDropdown.prototype.optgroupItemElems = function() {
  return this.romoOptionListDropdown.optgroupItemElems();
}

RomoSelectDropdown.prototype.doInit = function() {
  // override as needed
}

RomoSelectDropdown.prototype.doSetNewValue = function(newValue) {
  this.romoOptionListDropdown.doSetNewValue(newValue);
}

/* private */

RomoSelectDropdown.prototype._bindElem = function() {
  this.elem.attr('data-romo-option-list-dropdown-item-selector-customization', ':not(.'+this.filterHiddenClass+')');
  this.elem.attr('data-romo-option-list-focus-style-class', 'romo-select-focus');

  if (this.elem.data('romo-select-dropdown-no-filter') !== undefined) {
    this.elem.attr('data-romo-option-list-dropdown-no-filter', this.elem.data('romo-select-dropdown-no-filter'));
  }
  if (this.elem.data('romo-select-dropdown-filter-placeholder') !== undefined) {
    this.elem.attr('data-romo-option-list-dropdown-filter-placeholder', this.elem.data('romo-select-dropdown-filter-placeholder'));
  }
  if (this.elem.data('romo-select-dropdown-filter-indicator') !== undefined) {
    this.elem.attr('data-romo-option-list-dropdown-filter-indicator', this.elem.data('romo-select-dropdown-filter-indicator'));
  }
  if (this.elem.data('romo-select-dropdown-filter-indicator-width-px') !== undefined) {
    this.elem.attr('data-romo-option-list-dropdown-filter-indicator-width-px', this.elem.data('romo-select-dropdown-filter-indicator-width-px'));
  }

  this.elem.on('romoOptionListDropdown:dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:toggle', [dropdown, this]);
  }, this));
  this.elem.on('romoOptionListDropdown:dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.elem.on('romoOptionListDropdown:dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:popupClose', [dropdown, this]);
  }, this));
  this.elem.on('romoOptionListDropdown:itemSelected', $.proxy(function(e, newValue, prevValue, romoOptionListDropdown) {
    this.elem.trigger('selectDropdown:itemSelected', [newValue, prevValue, this]);
  }, this));
  this.elem.on('romoOptionListDropdown:change', $.proxy(function(e, newValue, prevValue, romoOptionListDropdown) {
    this.elem.trigger('selectDropdown:change', [newValue, prevValue, this]);
  }, this));


  this.elem.on('selectDropdown:triggerToggle', $.proxy(function(e) {
    this.elem.trigger('romoOptionListDropdown:triggerToggle', []);
  }, this));
  this.elem.on('selectDropdown:triggerPopupOpen', $.proxy(function(e) {
    this.elem.trigger('romoOptionListDropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('selectDropdown:triggerPopupClose', $.proxy(function(e) {
    this.elem.trigger('romoOptionListDropdown:triggerPopupClose', []);
  }, this));

  this.romoOptionListDropdown = this.elem.romoOptionListDropdown()[0];

  this.elem.on('romoOptionListDropdown:filterChange', $.proxy(function(e, filterValue, romoOptionListDropdown) {
    var wbFilter = new RomoWordBoundaryFilter(filterValue, this.optItemElems(), function(elem) {
      // The romo word boundary filter by default considers a space, "-" and "_" as word boundaries.
      // We want to also consider other non-word characters (such as ":", "/", ".", "?", "=", "&")
      // as word boundaries as well.
      return elem[0].textContent.replace(/\W/g, ' ');
    });

    wbFilter.matchingElems.show();
    wbFilter.notMatchingElems.hide();
    wbFilter.matchingElems.removeClass(this.filterHiddenClass);
    wbFilter.notMatchingElems.addClass(this.filterHiddenClass);

    if (filterValue !== '') {
      this.elem.trigger('romoOptionListDropdown:triggerListOptionsUpdate', [wbFilter.matchingElems.first()]);
    } else {
      this.elem.trigger('romoOptionListDropdown:triggerListOptionsUpdate', [this.selectedItemElem()]);
    }
  }, this));

  this.romoOptionListDropdown.doSetListItems(this._buildOptionList(this.optionElems));
}

RomoSelectDropdown.prototype._buildOptionList = function(optionElems) {
  var list = [];

  $.each(optionElems, $.proxy(function(idx, optionNode) {
    if (optionNode.tagName === "OPTION") {
      list.push(this._buildOptionItem($(optionNode)));
    } else if (optionNode.tagName === "OPTGROUP") {
      list.push(this._buildOptGroupItem($(optionNode)));
    }
  }, this));

  return list;
}

RomoSelectDropdown.prototype._buildOptionItem = function(optionElem) {
  var item = {}

  item['type']        = 'option';
  item['value']       = (optionElem.attr('value') || '');
  item['displayText'] = (optionElem.text().trim() || '');
  item['displayHtml'] = (optionElem.text().trim() || '&nbsp;');

  if (optionElem.prop('selected')) {
    item['selected'] = true;
  }
  if (optionElem.attr('disabled') !== undefined) {
    item['disabled'] = true;
  }

  return item;
}

RomoSelectDropdown.prototype._buildOptGroupItem = function(optGroupElem) {
  var item = {};

  item['type']  = 'optgroup';
  item['label'] = optGroupElem.attr('label');
  item['items'] = this._buildOptionList(optGroupElem.children());

  return item;
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-dropdown-auto="true"]').romoSelectDropdown();
});
