var RomoCurrencyTextInput = function(elem) {
  this.elem            = elem;
  this.hiddenInputElem = undefined;

  this.defaultIndicatorPosition       = 'left';
  this.defaultInputNameSuffix         = "romo-currency-display"
  this.defaultFormatThousandsDelim    = ',';
  this.defaultFormatDecimalDelim      = '.';
  this.defaultFormatNumDecimalPlaces  = 2;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoCurrencyTextInput:ready', [this]);
}

RomoCurrencyTextInput.prototype.doInit = function() {
  // override as needed
}

RomoCurrencyTextInput.prototype.doSetValue = function(value) {
  this.elem.value = value;
  this._refreshInputValue();
}

// private

RomoCurrencyTextInput.prototype._bindElem = function() {
  this._bindIndicatorTextInput();

  this.hiddenInputElem = this._getHiddenInputElem();
  Romo.before(this.elem, this.hiddenInputElem);
  Romo.setAttr(this.elem, 'name', this._getNewInputName());

  Romo.on(this.elem, 'change', Romo.proxy(function(e) {
    this._refreshInputValue();
  }, this));
  Romo.on(this.elem, 'romoOnkey:trigger', Romo.proxy(function(e, triggerEvent, romoOnkey) {
    this._refreshInputValue(true);
  }, this));
  Romo.on(this.elem, 'romoCurrencyTextInput:triggerUpdateInputValue', Romo.proxy(function(e) {
    this._refreshInputValue();
  }, this));

  new RomoOnkey(this.elem)

  this._refreshInputValue();
}

RomoCurrencyTextInput.prototype._bindIndicatorTextInput = function() {
  Romo.setData(
    this.elem,
    'romo-indicator-text-input-indicator-position',
    Romo.data(this.elem, 'romo-currency-text-input-indicator-position') || this.defaultIndicatorPosition
  );

  if (Romo.data(this.elem, 'romo-currency-text-input-indicator') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-indicator-text-input-indicator',
      Romo.data(this.elem, 'romo-currency-text-input-indicator')
    );
  }
  if (Romo.data(this.elem, 'romo-currency-text-input-indicator-width-px') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-indicator-text-input-indicator-width-px',
      Romo.data(this.elem, 'romo-currency-text-input-indicator-width-px')
    );
  }
  if (Romo.data(this.elem, 'romo-currency-text-input-indicator-padding-px') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-indicator-text-input-indicator-padding-px',
      Romo.data(this.elem, 'romo-currency-text-input-indicator-padding-px')
    );
  }
  if (Romo.data(this.elem, 'romo-currency-text-input-elem-display') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-indicator-text-input-elem-display',
      Romo.data(this.elem, 'romo-currency-text-input-elem-display')
    );
  }
  if (Romo.data(this.elem, 'romo-currency-text-input-btn-group') !== undefined) {
    Romo.setData(
      this.elem,
      'romo-indicator-text-input-btn-group',
      Romo.data(this.elem, 'romo-currency-text-input-btn-group')
    );
  }

  Romo.on(this.elem, 'romoIndicatorTextInput:indicatorClick', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoCurrencyTextInput:indicatorClick', []);
  }, this));

  Romo.on(this.elem, 'romoCurrencyTextInput:triggerPlaceIndicator', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerPlaceIndicator', []);
  }, this));
  Romo.on(this.elem, 'romoCurrencyTextInput:triggerEnable', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerEnable', []);
  }, this));
  Romo.on(this.elem, 'romoCurrencyTextInput:triggerDisable', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerDisable', []);
  }, this));
  Romo.on(this.elem, 'romoCurrencyTextInput:triggerShow', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerShow', []);
  }, this));
  Romo.on(this.elem, 'romoCurrencyTextInput:triggerHide', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerHide', []);
  }, this));

  new RomoIndicatorTextInput(this.elem);
}

RomoCurrencyTextInput.prototype._refreshInputValue = function(skipRefreshElemValue) {
  var unFormattedValue = this._unFormatCurrencyValue(this.elem.value);
  this.hiddenInputElem.value = unFormattedValue;
  if (!skipRefreshElemValue) {
    if (Romo.data(this.elem, 'romo-currency-text-input-format-for-currency') !== false) {
      this.elem.value = this._formatCurrencyValue(unFormattedValue);
    } else {
      this.elem.value = unFormattedValue;
    }
  }
}

RomoCurrencyTextInput.prototype._formatCurrencyValue = function(sanitizedValue) {
  return RomoCurrency.format(sanitizedValue, {
    'thousandsDelim':   this._getFormatThousandsDelim(),
    'decimalDelim':     this._getFormatDecimalDelim(),
    'numDecimalPlaces': this._getFormatNumDecimalPlaces()
  });
}

RomoCurrencyTextInput.prototype._unFormatCurrencyValue = function(inputValue) {
  return RomoCurrency.unFormat(inputValue, {
    'numDecimalPlaces': this._getFormatNumDecimalPlaces()
  });
}

RomoCurrencyTextInput.prototype._getFormatThousandsDelim = function() {
  return (
    Romo.data(this.elem, 'romo-currency-text-input-format-thousands-delim') ||
    this.defaultFormatThousandsDelim
  );
}

RomoCurrencyTextInput.prototype._getFormatDecimalDelim = function() {
  return (
    Romo.data(this.elem, 'romo-currency-text-input-format-decimal-delim') ||
    this.defaultFormatDecimalDelim
  );
}

RomoCurrencyTextInput.prototype._getFormatNumDecimalPlaces = function() {
  var places = Romo.data(this.elem, 'romo-currency-text-input-format-num-decimal-places');
  return !isNaN(places = Math.abs(places)) ? places : this.defaultFormatNumDecimalPlaces;
}

RomoCurrencyTextInput.prototype._getHiddenInputElem = function() {
  return Romo.elems(
    '<input type="hidden" ' +
           'name="'+Romo.attr(this.elem, 'name')+'" ' +
           'value="'+this.elem.value+'"' +
    '>'
  )[0];
}

RomoCurrencyTextInput.prototype._getNewInputName = function() {
  return (
    Romo.attr(this.elem, 'name')+
    '-'+
    (Romo.data(this.elem, 'romo-currency-text-input-name-suffix') || this.defaultInputNameSuffix)
  );
}

// event functions

// init

Romo.addElemsInitSelector('[data-romo-currency-text-input-auto="true"]', RomoCurrencyTextInput);
