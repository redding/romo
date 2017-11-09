var RomoTooltip = RomoComponent(function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoTooltip:ready', [this]);
});

RomoTooltip.prototype.popupOpen = function() {
  return Romo.hasClass(this.popupElem, 'romo-tooltip-open') === true;
}

RomoTooltip.prototype.popupClosed = function() {
  return Romo.hasClass(this.popupElem, 'romo-tooltip-open') === false;
}

RomoTooltip.prototype.doPopupOpen = function() {
  var scrollParentElems = Romo.scrollableParents(this.elem).concat([window]);
  Romo.on(scrollParentElems, 'scroll', Romo.proxy(this._onScrollableParentsScroll, this));

  if (this.romoAjax !== undefined) {
    this.romoAjax.doInvoke();
  } else {
    this._setBodyHtml(Romo.data(this.elem, 'romo-tooltip-content'));
  }
  Romo.addClass(this.popupElem, 'romo-tooltip-open');
  this.doPlacePopupElem();

  var bodyElem = Romo.f('body')[0];
  Romo.on(bodyElem, 'romoModal:mousemove',       Romo.proxy(this._onModalPopupChange, this));
  Romo.on(bodyElem, 'romoPopupStack:popupClose', Romo.proxy(this._onModalPopupChange, this));
  Romo.on(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  Romo.trigger(this.elem, 'romoTooltip:popupOpen', [this]);
}

RomoTooltip.prototype.doPopupClose = function() {
  Romo.removeClass(this.popupElem, 'romo-tooltip-open');

  var scrollParentElems = Romo.scrollableParents(this.elem).concat([window]);
  Romo.off(scrollParentElems, 'scroll', Romo.proxy(this._onScrollableParentsScroll, this));

  var bodyElem = Romo.f('body')[0];
  Romo.off(bodyElem, 'romoModal:mousemove',       Romo.proxy(this._onModalPopupChange, this));
  Romo.off(bodyElem, 'romoPopupStack:popupClose', Romo.proxy(this._onModalPopupChange, this));
  Romo.off(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  Romo.trigger(this.elem, 'romoTooltip:popupClose', [this]);
}

RomoTooltip.prototype.doPlacePopupElem = function() {
  var configHeight = Romo.data(this.elem, 'romo-tooltip-height') ||
                     Romo.data(this.elem, 'romo-tooltip-max-height');
  var configPosition = this.popupPosition;

  if (configHeight === 'detect' && (configPosition === 'top' || configPosition === 'bottom')) {
    var popupHeight       = this.popupElem.offsetHeight;
    var topAvailHeight    = this._getPopupMaxAvailableHeight('top');
    var bottomAvailHeight = this._getPopupMaxAvailableHeight('bottom');

    if (popupHeight < topAvailHeight && popupHeight < bottomAvailHeight) {
      // if it fits both ways, use the config position way
      configHeight = this._getPopupMaxAvailableHeight(configPosition);
    } else if (topAvailHeight > bottomAvailHeight) {
      configPosition = 'top';
      configHeight   = topAvailHeight;
    } else {
      configPosition = 'bottom';
      configHeight   = bottomAvailHeight;
    }

    Romo.setStyle(this.bodyElem, 'max-height', configHeight.toString() + 'px');
  }

  var elemRect   = this.elem.getBoundingClientRect();
  var elemOffset = Romo.offset(this.elem);

  var elemHeight = elemRect.height;
  var elemWidth  = elemRect.width;
  var elemTop    = elemOffset.top;
  var elemLeft   = elemOffset.left

  var popupOffsetHeight = this.popupElem.offsetHeight;
  var popupOffsetWidth  = this.popupElem.offsetWidth;

  var pad = 6 + 1; // arrow size + spacing

  Romo.setData(this.popupElem, 'romo-tooltip-arrow-position', configPosition);

  var posTop  = undefined;
  var posLeft = undefined;
  switch (configPosition) {
    case 'top':
      posTop  = elemTop - popupOffsetHeight - pad;
      posLeft = elemLeft + (elemWidth / 2) - (popupOffsetWidth / 2);
      break;
    case 'bottom':
      posTop  = elemTop + elemHeight + pad;
      posLeft = elemLeft + (elemWidth / 2) - (popupOffsetWidth / 2);
      break;
    case 'left':
      posTop  = elemTop + (elemHeight / 2) - (popupOffsetHeight / 2);
      posLeft = elemLeft - popupOffsetWidth - pad;
      break;
    case 'right':
      posTop  = elemTop + (elemHeight / 2) - (popupOffsetHeight / 2);
      posLeft = elemLeft + elemWidth + pad;
      break;
  }

  Romo.setStyle(this.popupElem, 'top',  posTop + 'px');
  Romo.setStyle(this.popupElem, 'left', posLeft + 'px');
}

RomoTooltip.prototype.doSetContent = function(value) {
  Romo.setData(this.elem, 'romo-tooltip-content', value);
  this._setBodyHtml(Romo.data(this.elem, 'romo-tooltip-content'));
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
}

RomoTooltip.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  Romo.setStyle(this.popupElem, 'z-index', relativeZIndex + 1100); // see z-index.css
}

// private

RomoTooltip.prototype._bindElem = function() {
  this._bindPopup();
  if (Romo.data(this.elem, 'romo-tooltip-content') === undefined) {
    this._bindAjax();
  }
  this._bindBody();

  this.hoverState = 'out';
  this.delayEnter = 0;
  this.delayLeave = 0;

  if (Romo.data(this.elem, 'romo-tooltip-delay') !== undefined && Romo.data(this.elem, 'romo-tooltip-delay') !== '') {
    this.delayEnter = Romo.data(this.elem, 'romo-tooltip-delay');
    this.delayLeave = Romo.data(this.elem, 'romo-tooltip-delay');
  }
  if (Romo.data(this.elem, 'romo-tooltip-delay-enter') !== undefined && Romo.data(this.elem, 'romo-tooltip-delay-enter') !== '') {
    this.delayEnter = Romo.data(this.elem, 'romo-tooltip-delay-enter');
  }
  if (Romo.data(this.elem, 'romo-tooltip-delay-leave') !== undefined && Romo.data(this.elem, 'romo-tooltip-delay-leave') !== '') {
    this.delayLeave = Romo.data(this.elem, 'romo-tooltip-delay-leave');
  }

  Romo.on(this.elem, 'mouseenter',                    Romo.proxy(this._onToggleEnter, this));
  Romo.on(this.elem, 'mouseleave',                    Romo.proxy(this._onToggleLeave, this));
  Romo.on(this.elem, 'romoTooltip:triggerPopupOpen',  Romo.proxy(this._onPopupOpen,   this));
  Romo.on(this.elem, 'romoTooltip:triggerPopupClose', Romo.proxy(this._onPopupClose,  this));
  Romo.on(this.elem, 'romoTooltip:triggerSetContent', Romo.proxy(this._onSetContent,  this));

  Romo.on(window, 'resize', Romo.proxy(this._onResizeWindow, this))
}

RomoTooltip.prototype._bindPopup = function() {
  this.popupElem = Romo.elems('<div class="romo-tooltip-popup"><div class="romo-tooltip-arrow"></div><div class="romo-tooltip-body"></div></div>')[0];
  var popupParentElem = Romo.closest(this.elem, Romo.data(this.elem, 'romo-tooltip-append-to-closest') || 'body');
  Romo.append(popupParentElem, this.popupElem);

  this.bodyElem = Romo.children(this.popupElem).find(Romo.proxy(function(childElem){
    return Romo.is(childElem, '.romo-tooltip-body');
  }, this));
  if (Romo.data(this.elem, 'romo-tooltip-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-tooltip-style-class'));
  }

  this.popupPosition = Romo.data(this.elem, 'romo-tooltip-position') || 'top';
  Romo.setData(this.popupElem, 'romo-tooltip-position', this.popupPosition);

  this.popupAlignment = Romo.data(this.elem, 'romo-tooltip-alignment') || 'center';
  Romo.setData(this.popupElem, 'romo-tooltip-alignment', this.popupAlignment);

  this.doSetPopupZIndex(this.elem);

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  Romo.on(this.popupElem, 'click', function(e) {
    e.stopPropagation();
  })

  Romo.parentChildElems.add(this.elem, [this.popupElem]);
}

RomoTooltip.prototype._bindAjax = function() {
  this.romoAjax = new RomoAjax(this.elem);
  this.romoAjax.doUnbindElem(); // disable auto invoke on click

  Romo.on(this.elem, 'romoAjax:callStart', Romo.proxy(function(e, romoAjax) {
    this._loadBodyStart();
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callSuccess', Romo.proxy(function(e, data, romoAjax) {
    this._loadBodySuccess(data);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callError', Romo.proxy(function(e, xhr, romoAjax) {
    this._loadBodyError(xhr);
    return false;
  }, this));
}

RomoTooltip.prototype._bindBody = function() {
  this._resetBody();

  Romo.setStyle(this.bodyElem, 'min-width',  Romo.data(this.elem, 'romo-tooltip-min-width'));
  Romo.setStyle(this.bodyElem, 'max-width',  Romo.data(this.elem, 'romo-tooltip-max-width'));
  Romo.setStyle(this.bodyElem, 'width',      Romo.data(this.elem, 'romo-tooltip-width'));
  Romo.setStyle(this.bodyElem, 'min-height', Romo.data(this.elem, 'romo-tooltip-min-height'));
  Romo.setStyle(this.bodyElem, 'height',     Romo.data(this.elem, 'romo-tooltip-height'));

  if (Romo.data(this.elem, 'romo-tooltip-max-height') === undefined) {
    Romo.setData(this.elem, 'romo-tooltip-max-height', 'detect');
  }
  if (Romo.data(this.elem, 'romo-tooltip-max-height') !== 'detect') {
    Romo.setStyle(this.bodyElem, 'max-height', Romo.data(this.elem, 'romo-tooltip-max-height'));
  }
}

RomoTooltip.prototype._resetBody = function() {
  Romo.rmStyle(this.bodyElem, 'min-width');
  Romo.rmStyle(this.bodyElem, 'max-width');
  Romo.rmStyle(this.bodyElem, 'width');
  Romo.rmStyle(this.bodyElem, 'min-height');
  Romo.rmStyle(this.bodyElem, 'max-height');
  Romo.rmStyle(this.bodyElem, 'height');
}

RomoTooltip.prototype._loadBodyStart = function() {
  this._setBodyHtml('');
  this._bindBody();
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
  Romo.trigger(this.elem, 'romoTooltip:loadBodyStart', [this]);
}

RomoTooltip.prototype._loadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this._bindBody();
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
  Romo.trigger(this.elem, 'romoTooltip:loadBodySuccess', [data, this]);
}

RomoTooltip.prototype._loadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoTooltip:loadBodyError', [xhr, this]);
}

RomoTooltip.prototype._getPopupMaxAvailableHeight = function(position) {
  var maxHeight = undefined;

  switch (position) {
    case 'top':
      var elemTop = this.elem.getBoundingClientRect().top;
      maxHeight = elemTop - this._getPopupMaxHeightDetectPad(position);
      break;
    case 'bottom':
      var viewportHeight = document.documentElement.clientHeight;
      var elemBottom     = this.elem.getBoundingClientRect().bottom;
      maxHeight = viewportHeight - elemBottom - this._getPopupMaxHeightDetectPad(position);
      break;
  }

  return maxHeight;
}

RomoTooltip.prototype._getPopupMaxHeightDetectPad = function(position) {
  return (
    Romo.data(this.elem, 'romo-tooltip-max-height-detect-pad-'+position) ||
    Romo.data(this.elem, 'romo-tooltip-max-height-detect-pad')           ||
    10
  );
}

RomoTooltip.prototype._setBodyHtml = function(content) {
  var contentElems = Romo.elems(content);
  if (contentElems.length !== 0) {
    Romo.update(this.bodyElem, contentElems);
  } else {
    Romo.updateText(this.bodyElem, content || '');
  }
}

// event functions

RomoTooltip.prototype.romoEvFn._onToggleEnter = function(e) {
  this.hoverState = 'in';
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(Romo.proxy(function() {
      if (this.hoverState ==='in') {
        this.doPopupOpen();
      }
    }, this), this.delayEnter);
  }

  return false;
}

RomoTooltip.prototype.romoEvFn._onToggleLeave = function(e) {
  this.hoverState = 'out';
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(Romo.proxy(function() {
      if (this.hoverState === 'out') {
        this.doPopupClose();
      }
    }, this), this.delayLeave);
  }

  return false;
}

RomoTooltip.prototype.romoEvFn._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doPopupOpen();
  }
}

RomoTooltip.prototype.romoEvFn._onPopupClose = function(e) {
  this.doPopupClose();
}

RomoTooltip.prototype.romoEvFn._onModalPopupChange = function(e) {
  this.doPopupClose();
}

RomoTooltip.prototype.romoEvFn._onSetContent = function(e, value) {
  this.doSetContent(value);
}

RomoTooltip.prototype.romoEvFn._onScrollableParentsScroll = function(e) {
  this.doPopupClose();
}

RomoTooltip.prototype.romoEvFn._onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

// init

Romo.addElemsInitSelector('[data-romo-tooltip-auto="true"]', RomoTooltip);
