$.fn.romoSelectDropdown = function(optionElemsParent) {
  return $.map(this, function(element) {
    return new RomoSelectDropdown(element, optionElemsParent);
  });
}

var RomoSelectDropdown = function(element, optionElemsParent) {
  this.elem = $(element);

  this.filterHiddenClass  = 'romo-select-filter-hidden';
  this.optionElemSelector = ':not(.'+this.filterHiddenClass+')';
  this.optionElemsParent  = (optionElemsParent || this.elem.find('.romo-select-dropdown-options-parent'));

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

RomoSelectDropdown.prototype.popupOpen = function() {
  return this.romoOptionListDropdown.popupOpen();
}

RomoSelectDropdown.prototype.popupClosed = function() {
  return this.romoOptionListDropdown.popupClosed();
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

RomoSelectDropdown.prototype.optionFilterValue = function() {
  return this.romoOptionListDropdown.optionFilterValue();
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

RomoSelectDropdown.prototype.doSetSelectedItem = function(newValue) {
  this.romoOptionListDropdown.doSetSelectedItem(newValue);
}

/* private */

RomoSelectDropdown.prototype._bindElem = function() {
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
  if (this.elem.data('romo-select-dropdown-open-on-focus') !== undefined) {
    this.elem.attr('data-romo-option-list-dropdown-open-on-focus', this.elem.data('romo-select-dropdown-open-on-focus'));
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
  this.elem.on('romoOptionListDropdown:itemSelected', $.proxy(function(e, itemValue, itemDisplayText, romoOptionListDropdown) {
    this.elem.trigger('selectDropdown:itemSelected', [itemValue, itemDisplayText, this]);
  }, this));
  this.elem.on('romoOptionListDropdown:newItemSelected', $.proxy(function(e, itemValue, itemDisplayText, romoOptionListDropdown) {
    var custOptElem = this.optionElemsParent.find('OPTION[data-romo-select-dropdown-custom-option="true"]');
    if (this.optionElemsParent.find('OPTION[value="'+itemValue+'"]').length === 0){
      // a custom value is being selected. add a custom option elem and update its value/text
      if (custOptElem.length === 0) {
        this.optionElemsParent.append('<option data-romo-select-dropdown-custom-option="true"></option>');
        custOptElem = this.optionElemsParent.find('OPTION[data-romo-select-dropdown-custom-option="true"]');
      }
      custOptElem.attr('value', itemValue);
      custOptElem.text(itemDisplayText);
    } else if (custOptElem.length !== 0) {
      // a non custom value is being selected. remove any existing custom option
      custOptElem.remove();
    }
    this.elem.trigger('selectDropdown:newItemSelected', [itemValue, itemDisplayText, this]);
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
    var elems    = this.optionElemsParent.find('OPTION');
    var wbFilter = new RomoWordBoundaryFilter(filterValue, elems, function(elem) {
      // The romo word boundary filter by default considers a space, "-" and "_"
      // as word boundaries.  We want to also consider other non-word characters
      // (such as ":", "/", ".", "?", "=", "&") as word boundaries as well.
      return elem[0].textContent.replace(/\W/g, ' ');
    });

    wbFilter.matchingElems.removeClass(this.filterHiddenClass);
    wbFilter.notMatchingElems.addClass(this.filterHiddenClass);
    this._setListItems();

    if (filterValue !== '') {
      this.romoOptionListDropdown.elem.trigger('romoOptionListDropdown:triggerListOptionsUpdate', [this.optItemElems().first()]);
    } else {
      this.elem.trigger('romoOptionListDropdown:triggerListOptionsUpdate', [this.selectedItemElem()]);
    }
  }, this));

  this._sanitizeOptions();
  this._setListItems();
  this.elem.trigger('romoOptionListDropdown:triggerListOptionsUpdate', [this.selectedItemElem()]);
}

RomoSelectDropdown.prototype._sanitizeOptions = function() {
  // set any options without a value to value=""
  // all options are required to have a value for things to work
  // this and the select component assume value attrs for all options
  $.each(this.optionElemsParent.find('OPTION'), $.proxy(function(idx, optionNode) {
    var optElem = $(optionNode);
    if (optElem.attr('value') === undefined) {
      optElem.attr('value', '');
    }
  }, this));
}

RomoSelectDropdown.prototype._setListItems = function() {
  var optElems = this.optionElemsParent.children(this.optionElemSelector);
  var items    = this._buildOptionListItems(optElems).concat(this._buildCustomOptionItems());
  this.romoOptionListDropdown.doSetListItems(items);
}

RomoSelectDropdown.prototype._buildOptionListItems = function(optionElems) {
  var list = [];

  $.each(optionElems, $.proxy(function(idx, optionNode) {
    if (optionNode.tagName === "OPTION") {
      list.push(this._buildOptionItem($(optionNode)));
    } else if (optionNode.tagName === "OPTGROUP") {
      var optGroupItem = this._buildOptGroupItem($(optionNode));
      if (optGroupItem.items.length !== 0) {
        list.push(optGroupItem);
      }
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
  item['items'] = this._buildOptionListItems(optGroupElem.children(this.optionElemSelector));

  return item;
}

RomoSelectDropdown.prototype._buildCustomOptionItems = function() {
  var items = [];

  var value = this.romoOptionListDropdown.optionFilterValue();
  if (value !== '' && this.elem.data('romo-select-dropdown-custom-option') === true) {
    var prompt = this.elem.data('romo-select-dropdown-custom-option-prompt');
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

RomoSelectDropdown.prototype._buildCustomOptionItem = function(value) {
  return {
    'type':        'option',
    'value':       value,
    'displayText': value,
    'displayHtml': value
  };
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-dropdown-auto="true"]').romoSelectDropdown();
});
