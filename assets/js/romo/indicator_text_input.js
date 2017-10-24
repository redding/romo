var RomoIndicatorTextInput = function(elem) {
  this.elem = elem;

  this.defaultIndicatorClass     = undefined;
  this.defaultIndicatorPaddingPx = 5;
  this.defaultIndicatorPosition  = 'right';

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoIndicatorTextInput:ready', [this]);
}

RomoIndicatorTextInput.prototype.doInit = function() {
  // override as needed
}

RomoIndicatorTextInput.prototype.doEnable = function() {
  this.elem.disabled = false;
  Romo.removeClass(this.elem, 'disabled');
  Romo.removeClass(this.indicatorElem, 'disabled');
}

RomoIndicatorTextInput.prototype.doDisable = function() {
  this.elem.disabled = true;
  Romo.addClass(this.elem, 'disabled');
  Romo.addClass(this.indicatorElem, 'disabled');
}

RomoIndicatorTextInput.prototype.doShow = function() {
  this._show(this.elem);
  this._show(this.indicatorElem);
  this._placeIndicatorElem();
}

RomoIndicatorTextInput.prototype.doHide = function() {
  this._hide(this.elem);
  this._hide(this.indicatorElem);
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

  // the elem wrapper should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem (input) is removed.
  // delay adding it b/c the `append` statement above is not a "move", it is
  // a "remove" and "add" so if added immediately the "remove" part will
  // incorrectly remove the wrapper.
  setTimeout(Romo.proxy(function() {
    Romo.parentChildElems.add(this.elem, [elemWrapper]);
  }, this), 1);

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
    Romo.setStyle(this.indicatorElem, 'line-height', Romo.css(this.elem, 'height'));
    if (this.elem.disabled === true) {
      Romo.addClass(this.indicatorElem, 'disabled');
    }
    if (Romo.css(this.elem, 'display') === 'none') {
      this._hide(this.indicatorElem);
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

RomoIndicatorTextInput.prototype._onIndicatorClick = function(e) {
  if (this.elem.disabled === false) {
    this.elem.focus();
    Romo.trigger(this.elem, 'romoIndicatorTextInput:indicatorClick');
  }
  return false;
}

// private

RomoIndicatorTextInput.prototype._show = function(elem) {
  Romo.show(elem);
}

RomoIndicatorTextInput.prototype._hide = function(elem) {
  Romo.hide(elem);
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
    parseInt(Romo.css(this.indicatorElem, "width"), 10)
  );
}

RomoIndicatorTextInput.prototype._getIndicatorPosition = function() {
  return (
    Romo.data(this.elem, 'romo-indicator-text-input-indicator-position') ||
    this.defaultIndicatorPosition
  );
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-indicator-text-input-auto="true"]').forEach(function(elem) { new RomoIndicatorTextInput(elem); });
});
