var RomoIndicatorTextInput = RomoComponent(function(elem) {
  this.elem = elem;

  this.defaultIndicatorClass     = undefined;
  this.defaultIndicatorPaddingPx = 5;
  this.defaultIndicatorPosition  = 'right';

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoIndicatorTextInput:ready', [this]);
});

RomoIndicatorTextInput.prototype.doEnable = function() {
  this.elem.disabled = false;
  Romo.removeClass([this.elem, this.indicatorElem], 'disabled');
}

RomoIndicatorTextInput.prototype.doDisable = function() {
  this.elem.disabled = true;
  Romo.addClass([this.elem, this.indicatorElem], 'disabled');
}

RomoIndicatorTextInput.prototype.doShow = function() {
  Romo.show([this.elem, this.indicatorElem]);
  this._placeIndicatorElem();
}

RomoIndicatorTextInput.prototype.doHide = function() {
  Romo.hide([this.elem, this.indicatorElem]);
}

// private

RomoIndicatorTextInput.prototype._bindElem = function() {
  var elemWrapper = Romo.elems('<div class="romo-indicator-text-input-wrapper"></div>')[0];
  Romo.setStyle(elemWrapper, 'display', (Romo.data(this.elem, 'romo-indicator-text-input-elem-display') || 'inline-block'));
  if (Romo.data(this.elem, 'romo-indicator-text-input-btn-group') === true) {
    Romo.addClass(elemWrapper, 'romo-btn-group');
  }

  Romo.before(this.elem, elemWrapper);
  Romo.append(elemWrapper, this.elem);
  Romo.parentChildElems.add(this.elem, [elemWrapper]);

  this.indicatorElem = undefined;
  var indicatorClass = Romo.data(this.elem, 'romo-indicator-text-input-indicator') || this.defaultIndicatorClass;
  if (indicatorClass !== undefined && indicatorClass !== 'none') {
    this.indicatorElem = Romo.elems('<div class="romo-indicator-text-input-indicator"><div><i class="'+indicatorClass+'"></i></div></div>')[0];
    Romo.after(this.elem, this.indicatorElem);
    Romo.on(this.indicatorElem, 'click', Romo.proxy(this._onIndicatorClick, this));
    this._placeIndicatorElem();

    this.indicatorIconContainerElem = Romo.find(this.indicatorElem, 'div')[0];
    if (Romo.data(this.elem, 'romo-indicator-text-input-spinner-basis-size') !== undefined) {
      Romo.setData(
        this.indicatorIconContainerElem,
        'romo-spinner-basis-size',
        Romo.data(this.elem, 'romo-indicator-text-input-spinner-basis-size')
      )
    }
    new RomoSpinner(this.indicatorIconContainerElem);

    Romo.on(this.elem, 'romoIndicatorTextInput:triggerPlaceIndicator', Romo.proxy(function(e) {
      this._placeIndicatorElem();
    }, this));
    Romo.on(this.elem, 'romoIndicatorTextInput:triggerSpinnerStart', Romo.proxy(function(e, basisSize) {
      Romo.trigger(this.indicatorIconContainerElem, 'romoSpinner:triggerStart', [basisSize]);
    }, this));
    Romo.on(this.elem, 'romoIndicatorTextInput:triggerSpinnerStop', Romo.proxy(function(e) {
      Romo.trigger(this.indicatorIconContainerElem, 'romoSpinner:triggerStop');
    }, this));
  }

  Romo.on(this.elem, 'romoIndicatorTextInput:triggerEnable', Romo.proxy(function(e) {
    this.doEnable();
  }, this));
  Romo.on(this.elem, 'romoIndicatorTextInput:triggerDisable', Romo.proxy(function(e) {
    this.doDisable();
  }, this));
  Romo.on(this.elem, 'romoIndicatorTextInput:triggerShow', Romo.proxy(function(e) {
    this.doShow();
  }, this));
  Romo.on(this.elem, 'romoIndicatorTextInput:triggerHide', Romo.proxy(function(e) {
    this.doHide();
  }, this));
}

RomoIndicatorTextInput.prototype._placeIndicatorElem = function() {
  if (this.indicatorElem !== undefined) {
    Romo.setStyle(this.indicatorElem, 'line-height', Romo.height(this.elem)+'px');
    if (this.elem.disabled === true) {
      Romo.addClass(this.indicatorElem, 'disabled');
    }
    if (Romo.css(this.elem, 'display') === 'none') {
      Romo.hide(this.indicatorElem);
    }

    var indicatorPaddingPx = this._getIndicatorPaddingPx();
    var indicatorWidthPx   = this._getIndicatorWidthPx();
    var indicatorPosition  = this._getIndicatorPosition();

    // add a pixel to account for the default input border
    Romo.setStyle(this.indicatorElem, indicatorPosition, indicatorPaddingPx+1+'px');

    // left-side padding
    // + indicator width
    // + right-side padding
    var inputPaddingPx = indicatorPaddingPx + indicatorWidthPx + indicatorPaddingPx;
    Romo.setStyle(this.elem, 'padding-'+indicatorPosition, inputPaddingPx+'px');
  }
}

RomoIndicatorTextInput.prototype._getIndicatorPaddingPx = function() {
  return (
    Romo.data(this.elem, 'romo-indicator-text-input-indicator-padding-px') ||
    this.defaultIndicatorPaddingPx
  );
}

RomoIndicatorTextInput.prototype._getIndicatorWidthPx = function() {
  return (
    Romo.data(this.elem, 'romo-indicator-text-input-indicator-width-px') ||
    Romo.width(this.indicatorElem)
  );
}

RomoIndicatorTextInput.prototype._getIndicatorPosition = function() {
  return (
    Romo.data(this.elem, 'romo-indicator-text-input-indicator-position') ||
    this.defaultIndicatorPosition
  );
}

// event functions

RomoIndicatorTextInput.prototype.romoEvFn._onIndicatorClick = function(e) {
  e.preventDefault();

  if (this.elem.disabled === false) {
    this.elem.focus();
    Romo.trigger(this.elem, 'romoIndicatorTextInput:indicatorClick');
  }
}

// init

Romo.addElemsInitSelector('[data-romo-indicator-text-input-auto="true"]', RomoIndicatorTextInput);
