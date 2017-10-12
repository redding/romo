var RomoCurrencyTextInput = function(element) {
  this.elem            = $(element);
  this.hiddenInputElem = undefined;

  this.defaultIndicatorPosition       = 'left';
  this.defaultInputNameSuffix         = "romo-currency-display"
  this.defaultFormatThousandsDelim    = ',';
  this.defaultFormatDecimalDelim      = '.';
  this.defaultFormatNumDecimalPlaces  = 2;

  this.doInit();
  this.doBindElem();

  this.elem.trigger('romoCurrencyTextInput:ready', [this]);
}

RomoCurrencyTextInput.prototype.doInit = function() {
  // override as needed
}

RomoCurrencyTextInput.prototype.doBindElem = function() {
  this.doBindIndicatorTextInput();

  this.hiddenInputElem = this._getHiddenInputElem();
  this.elem.before(this.hiddenInputElem);
  this.elem.attr('name', this._getNewInputName());

  this.elem.on('change', $.proxy(function(e) {
    this.doUpdateInputValue();
  }, this));
  this.elem.on('romoCurrencyTextInput:triggerUpdateInputValue', $.proxy(function(e) {
    this.doUpdateInputValue();
  }, this));

  this.doUpdateInputValue();
}

RomoCurrencyTextInput.prototype.doUpdateInputValue = function() {
  var unFormattedValue = this._unFormatCurrencyValue(this.elem.val());
  this.hiddenInputElem.val(unFormattedValue);
  if (this.elem.data('romo-currency-text-input-format-for-currency') !== false) {
    this.elem.val(this._formatCurrencyValue(unFormattedValue));
  } else {
    this.elem.val(unFormattedValue);
  }
}

RomoCurrencyTextInput.prototype.doSetValue = function(value) {
  this.elem.val(value);
  this.doUpdateInputValue();
}

RomoCurrencyTextInput.prototype.doBindIndicatorTextInput = function() {
  this.elem.attr(
    'data-romo-indicator-text-input-indicator-position',
    this.elem.data('romo-currency-text-input-indicator-position') || this.defaultIndicatorPosition
  );

  if (this.elem.data('romo-currency-text-input-indicator') !== undefined) {
    this.elem.attr(
      'data-romo-indicator-text-input-indicator',
      this.elem.data('romo-currency-text-input-indicator')
    );
  }
  if (this.elem.data('romo-currency-text-input-indicator-width-px') !== undefined) {
    this.elem.attr(
      'data-romo-indicator-text-input-indicator-width-px',
      this.elem.data('romo-currency-text-input-indicator-width-px')
    );
  }
  if (this.elem.data('romo-currency-text-input-indicator-padding-px') !== undefined) {
    this.elem.attr(
      'data-romo-indicator-text-input-indicator-padding-px',
      this.elem.data('romo-currency-text-input-indicator-padding-px')
    );
  }
  if (this.elem.data('romo-currency-text-input-elem-display') !== undefined) {
    this.elem.attr(
      'data-romo-indicator-text-input-elem-display',
      this.elem.data('romo-currency-text-input-elem-display')
    );
  }
  if (this.elem.data('romo-currency-text-input-btn-group') !== undefined) {
    this.elem.attr(
      'data-romo-indicator-text-input-btn-group',
      this.elem.data('romo-currency-text-input-btn-group')
    );
  }

  this.elem.on('indicatorTextInput:indicatorClick', $.proxy(function(e) {
    this.elem.trigger('romoCurrencyTextInput:indicatorClick', []);
  }, this));

  this.elem.on('romoCurrencyTextInput:triggerPlaceIndicator', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerPlaceIndicator', []);
  }, this));
  this.elem.on('romoCurrencyTextInput:triggerEnable', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerEnable', []);
  }, this));
  this.elem.on('romoCurrencyTextInput:triggerDisable', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerDisable', []);
  }, this));
  this.elem.on('romoCurrencyTextInput:triggerShow', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerShow', []);
  }, this));
  this.elem.on('romoCurrencyTextInput:triggerHide', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerHide', []);
  }, this));

  this.elem.romoIndicatorTextInput();
}

// private

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
    this.elem.data('romo-currency-text-input-format-thousands-delim') ||
    this.defaultFormatThousandsDelim
  );
}

RomoCurrencyTextInput.prototype._getFormatDecimalDelim = function() {
  return (
    this.elem.data('romo-currency-text-input-format-decimal-delim') ||
    this.defaultFormatDecimalDelim
  );
}

RomoCurrencyTextInput.prototype._getFormatNumDecimalPlaces = function() {
  var places = this.elem.data('romo-currency-text-input-format-num-decimal-places');
  return !isNaN(places = Math.abs(places)) ? places : this.defaultFormatNumDecimalPlaces;
}

RomoCurrencyTextInput.prototype._getHiddenInputElem = function() {
  return $('<input type="hidden" name="'+this.elem.attr('name')+'" value="'+this.elem.val()+'">');;
}

RomoCurrencyTextInput.prototype._getNewInputName = function() {
  return (
    this.elem.attr('name')+
    '-'+
    (this.elem.data('romo-currency-text-input-name-suffix') || this.defaultInputNameSuffix)
  );
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-currency-text-input-auto="true"]').forEach(function(elem) { new RomoCurrencyTextInput(elem); });
});
