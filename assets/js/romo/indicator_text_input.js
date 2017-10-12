var RomoIndicatorTextInput = function(element) {
  this.elem = $(element);

  this.defaultIndicatorClass     = undefined;
  this.defaultIndicatorPaddingPx = 5;
  this.defaultIndicatorPosition  = 'right';

  this.doInit();
  this._bindElem();

  this.elem.trigger('indicatorTextInput:ready', [this]);
}

RomoIndicatorTextInput.prototype.doInit = function() {
  // override as needed
}

RomoIndicatorTextInput.prototype.doEnable = function() {
  this.elem.prop('disabled', false);
  this.elem.removeClass('disabled');
  this.indicatorElem.removeClass('disabled');
}

RomoIndicatorTextInput.prototype.doDisable = function() {
  this.elem.prop('disabled', true);
  this.elem.addClass('disabled');
  this.indicatorElem.addClass('disabled');
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

/* private */

RomoIndicatorTextInput.prototype._bindElem = function() {
  var elemWrapper = $('<div class="romo-indicator-text-input-wrapper"></div>');
  elemWrapper.css({'display': (this.elem.data('romo-indicator-text-input-elem-display') || 'inline-block')});
  if (this.elem.data('romo-indicator-text-input-btn-group') === true) {
    elemWrapper.addClass('romo-btn-group');
  }

  this.elem.before(elemWrapper);
  elemWrapper.append(this.elem);

  // the elem wrapper should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem (input) is removed.
  // delay adding it b/c the `append` statement above is not a "move", it is
  // a "remove" and "add" so if added immediately the "remove" part will
  // incorrectly remove the wrapper.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [elemWrapper]);
  }, this), 1);

  this.indicatorElem = $();
  var indicatorClass = this.elem.data('romo-indicator-text-input-indicator') || this.defaultIndicatorClass;
  if (indicatorClass !== undefined && indicatorClass !== 'none') {
    this.indicatorElem = $('<div class="romo-indicator-text-input-indicator"><div><i class="'+indicatorClass+'"></i></div></div>');
    this.elem.after(this.indicatorElem);
    this.indicatorElem.on('click', $.proxy(this._onIndicatorClick, this));
    this._placeIndicatorElem();

    this.indicatorIconContainerElem = this.indicatorElem.find('div');
    if (this.elem.data('romo-indicator-text-input-indicator-basis-size') !== undefined) {
      this.indicatorIconContainerElem.attr(
        'data-romo-indicator-basis-size',
        this.elem.data('romo-indicator-text-input-indicator-basis-size')
      )
    }
    this.indicatorIconContainerElem.romoIndicator();

    this.elem.on('indicatorTextInput:triggerPlaceIndicator', $.proxy(function(e) {
      this._placeIndicatorElem();
    }, this));
    this.elem.on('indicatorTextInput:triggerIndicatorStart', $.proxy(function(e, basisSize) {
      this.indicatorIconContainerElem.trigger('indicator:triggerStart', [basisSize]);
    }, this));
    this.elem.on('indicatorTextInput:triggerIndicatorStop', $.proxy(function(e) {
      this.indicatorIconContainerElem.trigger('indicator:triggerStop');
    }, this));
  }

  this.elem.on('indicatorTextInput:triggerEnable', $.proxy(function(e) {
    this.doEnable();
  }, this));
  this.elem.on('indicatorTextInput:triggerDisable', $.proxy(function(e) {
    this.doDisable();
  }, this));
  this.elem.on('indicatorTextInput:triggerShow', $.proxy(function(e) {
    this.doShow();
  }, this));
  this.elem.on('indicatorTextInput:triggerHide', $.proxy(function(e) {
    this.doHide();
  }, this));
}

RomoIndicatorTextInput.prototype._placeIndicatorElem = function() {
  if (this.indicatorElem !== undefined) {
    this.indicatorElem.css({'line-height': this.elem.css('height')});
    if (this.elem.prop('disabled') === true) {
      this.indicatorElem.addClass('disabled');
    }
    if (this.elem.css('display') === 'none') {
      this._hide(this.indicatorElem);
    }

    var indicatorPaddingPx = this._getIndicatorPaddingPx();
    var indicatorWidthPx   = this._getIndicatorWidthPx();
    var indicatorPosition  = this._getIndicatorPosition();

    // add a pixel to account for the default input border
    this.indicatorElem.css(indicatorPosition, indicatorPaddingPx+1);

    // left-side padding
    // + indicator width
    // + right-side padding
    var inputPaddingPx = indicatorPaddingPx + indicatorWidthPx + indicatorPaddingPx;
    this.elem.css('padding-'+indicatorPosition, inputPaddingPx+'px');
  }
}

RomoIndicatorTextInput.prototype._onIndicatorClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (this.elem.prop('disabled') === false) {
    this.elem.focus();
    this.elem.trigger('indicatorTextInput:indicatorClick');
  }
}

// private

RomoIndicatorTextInput.prototype._show = function(elem) {
  elem.css('display', '');
}

RomoIndicatorTextInput.prototype._hide = function(elem) {
  elem.css('display', 'none');
}

RomoIndicatorTextInput.prototype._getIndicatorPaddingPx = function() {
  return (
    this.elem.data('romo-indicator-text-input-indicator-padding-px') ||
    this.defaultIndicatorPaddingPx
  );
}

RomoIndicatorTextInput.prototype._getIndicatorWidthPx = function() {
  return (
    this.elem.data('romo-indicator-text-input-indicator-width-px') ||
    parseInt(Romo.getComputedStyle(this.indicatorElem[0], "width"), 10)
  );
}

RomoIndicatorTextInput.prototype._getIndicatorPosition = function() {
  return (
    this.elem.data('romo-indicator-text-input-indicator-position') ||
    this.defaultIndicatorPosition
  );
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-indicator-text-input-auto="true"]').forEach(function(elem) { new RomoIndicatorTextInput(elem); });
});
