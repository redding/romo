var RomoSelectDropdown = RomoComponent(function(elem, optionElemsParentElem) {
  this.elem = elem;

  this.filterHiddenClass     = 'romo-select-filter-hidden';
  this.optionElemSelector    = ':not(.'+this.filterHiddenClass+')';
  this.optionElemsParentElem = (optionElemsParentElem || Romo.find(this.elem, '.romo-select-dropdown-options-parent')[0]);

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoSelectDropdown:ready', [this]);
});

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

RomoSelectDropdown.prototype.doSetSelectedItem = function(newValue) {
  this.romoOptionListDropdown.doSetSelectedItem(newValue);
}

RomoSelectDropdown.prototype.doFocus = function(openOnFocus) {
  this.romoOptionListDropdown.doFocus(openOnFocus);
}

// private

RomoSelectDropdown.prototype._bindElem = function() {
  Romo.setData(this.elem, 'romo-option-list-focus-style-class', 'romo-select-focus');

  if (Romo.data(this.elem, 'romo-select-dropdown-no-filter') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-option-list-dropdown-no-filter',
      Romo.data(this.elem, 'romo-select-dropdown-no-filter')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-filter-placeholder') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-option-list-dropdown-filter-placeholder',
      Romo.data(this.elem, 'romo-select-dropdown-filter-placeholder')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-filter-indicator') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-option-list-dropdown-filter-indicator',
      Romo.data(this.elem, 'romo-select-dropdown-filter-indicator')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-filter-indicator-width-px') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-option-list-dropdown-filter-indicator-width-px',
      Romo.data(this.elem, 'romo-select-dropdown-filter-indicator-width-px')
    );
  }
  if (Romo.data(this.elem, 'romo-select-dropdown-open-on-focus') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-option-list-dropdown-open-on-focus',
      Romo.data(this.elem, 'romo-select-dropdown-open-on-focus')
    );
  }

  Romo.on(
    this.elem,
    'romoOptionListDropdown:romoDropdown:toggle',
    Romo.proxy(function(e, romoDropdown) {
      Romo.trigger(
        this.elem,
        'romoSelectDropdown:romoDropdown:toggle',
        [romoDropdown, this]
      );
    }, this)
  );
  Romo.on(
    this.elem,
    'romoOptionListDropdown:romoDropdown:popupOpen',
    Romo.proxy(function(e, romoDropdown) {
      Romo.trigger(
        this.elem,
        'romoSelectDropdown:romoDropdown:popupOpen',
        [romoDropdown, this]
      );
    }, this)
  );
  Romo.on(
    this.elem,
    'romoOptionListDropdown:romoDropdown:popupClose',
    Romo.proxy(function(e, romoDropdown) {
      Romo.trigger(
        this.elem,
        'romoSelectDropdown:romoDropdown:popupClose',
        [romoDropdown, this]
      );
    }, this)
  );
  Romo.on(
    this.elem,
    'romoOptionListDropdown:itemSelected',
    Romo.proxy(function(e, itemValue, itemDisplayText, romoOptionListDropdown) {
      Romo.trigger(
        this.elem,
        'romoSelectDropdown:itemSelected',
        [itemValue, itemDisplayText, this]
      );
    }, this)
  );
  Romo.on(
    this.elem,
    'romoOptionListDropdown:newItemSelected',
    Romo.proxy(function(e, itemValue, itemDisplayText, romoOptionListDropdown) {
      var custOptElem = Romo.find(
        this.optionElemsParentElem,
        'OPTION[data-romo-select-dropdown-custom-option="true"]'
      )[0];
      if (Romo.find(this.optionElemsParentElem, 'OPTION[value="'+itemValue+'"]').length === 0){
        // a custom value is being selected. add a custom option elem and update its value/text
        if (custOptElem === undefined) {
          Romo.appendHtml(
            this.optionElemsParentElem,
            '<option data-romo-select-dropdown-custom-option="true"></option>'
          );
          custOptElem = Romo.find(
            this.optionElemsParentElem,
            'OPTION[data-romo-select-dropdown-custom-option="true"]'
          )[0];
        }
        Romo.setAttr(custOptElem, 'value', itemValue);
        Romo.updateText(custOptElem,  itemDisplayText);
      } else if (custOptElem !== undefined) {
        // a non custom value is being selected. remove any existing custom option
        Romo.remove(custOptElem);
      }
      Romo.trigger(
        this.elem,
        'romoSelectDropdown:newItemSelected',
        [itemValue, itemDisplayText, this]
      );
    }, this)
  );
  Romo.on(
    this.elem,
    'romoOptionListDropdown:change',
    Romo.proxy(function(e, newValue, prevValue, romoOptionListDropdown) {
      Romo.trigger(this.elem, 'romoSelectDropdown:change', [newValue, prevValue, this]);
    }, this)
  );


  Romo.on(this.elem, 'romoSelectDropdown:triggerToggle', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoOptionListDropdown:triggerToggle', []);
  }, this));
  Romo.on(this.elem, 'romoSelectDropdown:triggerPopupOpen', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoOptionListDropdown:triggerPopupOpen', []);
  }, this));
  Romo.on(this.elem, 'romoSelectDropdown:triggerPopupClose', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoOptionListDropdown:triggerPopupClose', []);
  }, this));

  this.romoOptionListDropdown = new RomoOptionListDropdown(this.elem);

  Romo.on(
    this.elem,
    'romoOptionListDropdown:filterChange',
    Romo.proxy(function(e, filterValue, romoOptionListDropdown) {
      var elems    = Romo.find(this.optionElemsParentElem, 'OPTION');
      var wbFilter = new RomoWordBoundaryFilter(filterValue, elems, function(elem) {
        // The romo word boundary filter by default considers a space, "-" and "_"
        // as word boundaries.  We want to also consider other non-word characters
        // (such as ":", "/", ".", "?", "=", "&") as word boundaries as well.
        return elem.textContent.replace(/\W/g, ' ');
      });

      Romo.removeClass(wbFilter.matchingItems, this.filterHiddenClass);
      Romo.addClass(wbFilter.notMatchingItems, this.filterHiddenClass);
      this._setListItems();

      if (filterValue !== '') {
        Romo.trigger(
          this.romoOptionListDropdown.elem,
          'romoOptionListDropdown:triggerListOptionsUpdate',
          [this.optItemElems()[0]]
        );
      } else {
        Romo.trigger(
          this.elem,
          'romoOptionListDropdown:triggerListOptionsUpdate',
          [this.selectedItemElem()]
        );
      }
    }, this)
  );

  this._sanitizeOptions();
  this._setListItems();
  Romo.trigger(
    this.elem,
    'romoOptionListDropdown:triggerListOptionsUpdate',
    [this.selectedItemElem()]
  );

  if (Romo.attr(this.elem, 'id') !== undefined) {
    var labelElem = Romo.f('label[for="'+Romo.attr(this.elem, 'id')+'"]');
    Romo.on(labelElem, 'click', Romo.proxy(function(e) {
      e.preventDefault();
      this.elem.focus();
    }, this));
  }
}

RomoSelectDropdown.prototype._sanitizeOptions = function() {
  // set any options without a value to value=""
  // all options are required to have a value for things to work
  // this and the select component assume value attrs for all options
  Romo.find(this.optionElemsParentElem, 'OPTION').forEach(Romo.proxy(function(optElem) {
    if (Romo.attr(optElem, 'value') === undefined) {
      Romo.setAttr(optElem, 'value', '');
    }
  }, this));
}

RomoSelectDropdown.prototype._setListItems = function() {
  var optElems = Romo.children(this.optionElemsParentElem, this.optionElemSelector);
  var items    = this._buildOptionListItems(optElems).concat(this._buildCustomOptionItems());
  this.romoOptionListDropdown.doSetListItems(items);
}

RomoSelectDropdown.prototype._buildOptionListItems = function(optionElems) {
  var items = [];

  optionElems.forEach(Romo.proxy(function(optElem) {
    if (optElem.tagName === "OPTION") {
      items.push(this._buildOptionItem(optElem));
    } else if (optElem.tagName === "OPTGROUP") {
      var optGroupItem = this._buildOptGroupItem(optElem);
      if (optGroupItem.items.length !== 0) {
        items.push(optGroupItem);
      }
    }
  }, this));

  return items;
}

RomoSelectDropdown.prototype._buildOptionItem = function(optionElem) {
  var item = {}

  item['type']        = 'option';
  item['value']       = (Romo.attr(optionElem, 'value') || '');
  item['displayText'] = (optionElem.innerText.trim() || '');
  item['displayHtml'] = (optionElem.innerText.trim() || '<span>&nbsp;</span>');

  if (optionElem.selected) {
    item['selected'] = true;
  }
  if (Romo.attr(optionElem, 'disabled') !== undefined) {
    item['disabled'] = true;
  }

  return item;
}

RomoSelectDropdown.prototype._buildOptGroupItem = function(optGroupElem) {
  var item = {};

  item['type']  = 'optgroup';
  item['label'] = Romo.attr(optGroupElem, 'label');
  item['items'] = this._buildOptionListItems(Romo.children(optGroupElem, this.optionElemSelector));

  return item;
}

RomoSelectDropdown.prototype._buildCustomOptionItems = function() {
  var items = [];

  var value = this.romoOptionListDropdown.optionFilterValue();
  if (value !== '' && Romo.data(this.elem, 'romo-select-dropdown-custom-option') === true) {
    var prompt = Romo.data(this.elem, 'romo-select-dropdown-custom-option-prompt');
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
    'displayHtml': '<span>'+value+'</span>'
  };
}

// event functions

// init

Romo.addElemsInitSelector('[data-romo-select-dropdown-auto="true"]', RomoSelectDropdown);
