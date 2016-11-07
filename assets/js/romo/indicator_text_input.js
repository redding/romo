$.fn.romoIndicatorTextInput = function() {
  return $.map(this, function(element) {
    return new RomoIndicatorTextInput(element);
  });
}

var RomoIndicatorTextInput = function(element) {
  this.elem = $(element);
  this.defaultIndicatorClass   = undefined;
  this.defaultIndicatorWidthPx = 0;

  this.doInit();
  this.doBindElem();

  this.elem.trigger('indicatorTextInput:ready', [this]);
}

RomoIndicatorTextInput.prototype.doInit = function() {
  // override as needed
}

RomoIndicatorTextInput.prototype.doBindElem = function() {
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
  // incorrectly remove the wrapper.  Any value will do - I chose 1 arbitrarily.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [elemWrapper]);
  }, this), 1);

  this.elem.attr('autocomplete', 'off');

  this.indicatorElem = $();
  var indicatorClass = this.elem.data('romo-indicator-text-input-indicator') || this.defaultIndicatorClass;
  if (indicatorClass !== undefined && indicatorClass !== 'none') {
    this.indicatorElem = $('<i class="romo-indicator-text-input-indicator '+indicatorClass+'"></i>');
    this.elem.after(this.indicatorElem);
    this.indicatorElem.on('click', $.proxy(this.onIndicatorClick, this));
    this.doPlaceIndicatorElem();

    this.elem.on('indicatorTextInput:triggerPlaceIndicator', $.proxy(function(e) {
      this.doPlaceIndicatorElem();
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

RomoIndicatorTextInput.prototype.doPlaceIndicatorElem = function() {
  if (this.indicatorElem !== undefined) {
    this.indicatorElem.css({'line-height': this.elem.css('height')});
    if (this.elem.prop('disabled') === true) {
      this.indicatorElem.addClass('disabled');
    }
    if (this.elem.css('display') === 'none') {
      this._hide(this.indicatorElem);
    }

    var indicatorWidthPx = this.elem.data('romo-indicator-text-input-indicator-width-px') || this.defaultIndicatorWidthPx;
    // left-side spacing
    // + indicator width
    // + right-side spacing
    var indicatorPaddingPx = 4 + indicatorWidthPx + 4;
    this.elem.css({'padding-right': indicatorPaddingPx + 'px'});
  }
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
  this.doPlaceIndicatorElem();
}

RomoIndicatorTextInput.prototype.doHide = function() {
  this._hide(this.elem);
  this._hide(this.indicatorElem);
}

RomoIndicatorTextInput.prototype.onIndicatorClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (this.elem.prop('disabled') === false) {
    this.elem.focus();
  }
}

// private

RomoIndicatorTextInput.prototype._show = function(elem) {
  elem.css('display', '');
}

RomoIndicatorTextInput.prototype._hide = function(elem) {
  elem.css('display', 'none');
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-indicator-text-input-auto="true"]').romoIndicatorTextInput();
});
