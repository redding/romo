var RomoTooltip = function(element) {
  this.elem = element;
  this.doInitPopup();

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

  if (Romo.data(this.elem, 'romo-tooltip-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-tooltip-style-class'));
  }

  Romo.on(this.elem, 'mouseenter', Romo.proxy(this.onToggleEnter, this));
  Romo.on(this.elem, 'mouseleave', Romo.proxy(this.onToggleLeave, this));
  Romo.on(this.elem, 'romoTooltip:triggerPopupOpen', Romo.proxy(this.onPopupOpen, this));
  Romo.on(this.elem, 'romoTooltip:triggerPopupClose', Romo.proxy(this.onPopupClose, this));
  Romo.on(this.elem, 'romoTooltip:triggerSetContent', Romo.proxy(this.onSetContent, this));
  Romo.on(window, 'resize', Romo.proxy(this.onResizeWindow, this))

  this.doInit();
  this.doInitBody();
  if (Romo.data(this.elem, 'romo-tooltip-content') === undefined) {
    this.doBindAjax();
  }

  Romo.trigger(this.elem, 'romoTooltip:ready', [this]);
}

RomoTooltip.prototype.doInit = function() {
  // override as needed
}

RomoTooltip.prototype.doInitPopup = function() {
  this.popupElem = Romo.elems('<div class="romo-tooltip-popup"><div class="romo-tooltip-arrow"></div><div class="romo-tooltip-body"></div></div>')[0];
  var popupParentElem = Romo.closest(this.elem, Romo.data(this.elem, 'romo-tooltip-append-to-closest') || 'body');
  Romo.append(popupParentElem, this.popupElem);

  this.bodyElem = Romo.find(this.popupElem, '> .romo-tooltip-body')[0];

  this.popupPosition = Romo.data(this.elem, 'romo-tooltip-position') || 'top';
  Romo.setData(this.popupElem, 'romo-tooltip-position', this.popupPosition);

  this.popupAlignment = Romo.data(this.elem, 'romo-tooltip-alignment') || 'center';
  Romo.setData(this.popupElem, 'romo-tooltip-alignment', this.popupAlignment);

  this.doSetPopupZIndex(this.elem);

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  Romo.on(this.popupElem, 'click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })

  // the popup should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem is removed.
  // delay adding it b/c other components may `append` generated tooltips
  // meaning the tooltip is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the popup.
  setTimeout(Romo.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.popupElem]);
  }, this), 1);
}

RomoTooltip.prototype.doInitBody = function() {
  this.doResetBody();

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

RomoTooltip.prototype.doResetBody = function() {
  Romo.setStyle(this.bodyElem, 'min-width',  '');
  Romo.setStyle(this.bodyElem, 'max-width',  '');
  Romo.setStyle(this.bodyElem, 'width',      '');
  Romo.setStyle(this.bodyElem, 'min-height', '');
  Romo.setStyle(this.bodyElem, 'max-height', '');
  Romo.setStyle(this.bodyElem, 'height',     '');
}

RomoTooltip.prototype.doBindAjax = function() {
  this.romoAjax = new RomoAjax(this.elem);
  this.romoAjax.doUnbindElem(); // disable auto invoke on click

  Romo.on(this.elem, 'romoAjax:callStart', Romo.proxy(function(e, romoAjax) {
    this.doLoadBodyStart();
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callSuccess', Romo.proxy(function(e, data, romoAjax) {
    this.doLoadBodySuccess(data);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callError', Romo.proxy(function(e, xhr, romoAjax) {
    this.doLoadBodyError(xhr);
    return false;
  }, this));
}

RomoTooltip.prototype.doLoadBodyStart = function() {
  this._setBodyHtml('');
  this.doInitBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoTooltip:loadBodyStart', [this]);
}

RomoTooltip.prototype.doLoadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoTooltip:loadBodySuccess', [data, this]);
}

RomoTooltip.prototype.doLoadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoTooltip:loadBodyError', [xhr, this]);
}

RomoTooltip.prototype.onToggleEnter = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.hoverState = 'in';
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(Romo.proxy(function() {
      if (this.hoverState ==='in') {
        this.doPopupOpen();
      }
    }, this), this.delayEnter);
  }
}

RomoTooltip.prototype.onToggleLeave = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.hoverState = 'out';
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(Romo.proxy(function() {
      if (this.hoverState === 'out') {
        this.doPopupClose();
      }
    }, this), this.delayLeave);
  }
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.hoverState === 'in') {
    this.doPlacePopupElem();
  }
}

RomoTooltip.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doPopupOpen();
  }
}

RomoTooltip.prototype.doPopupOpen = function() {
  if (this.romoAjax !== undefined) {
    this.romoAjax.doInvoke();
  } else {
    this._setBodyHtml(Romo.data(this.elem, 'romo-tooltip-content'));
  }
  Romo.addClass(this.popupElem, 'romo-tooltip-open');
  this.doPlacePopupElem();

  if (Romo.parents(this.elem, '.romo-modal-popup').length !== 0) {
    var bodyElem = Romo.f('body')[0];
    Romo.on(bodyElem, 'romoModal:mousemove',  Romo.proxy(this.onModalPopupChange, this));
    Romo.on(bodyElem, 'romoModal:popupclose', Romo.proxy(this.onModalPopupChange, this));
  }
  Romo.on(window, 'resize', Romo.proxy(this.onResizeWindow, this));

  Romo.trigger(this.elem, 'romoTooltip:popupOpen', [this]);
}

RomoTooltip.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doPopupClose();
  }
}

RomoTooltip.prototype.doPopupClose = function() {
  Romo.removeClass(this.popupElem, 'romo-tooltip-open');

  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    var bodyElem = Romo.f('body')[0];
    Romo.off(bodyElem, 'romoModal:mousemove',  Romo.proxy(this.onModalPopupChange, this));
    Romo.off(bodyElem, 'romoModal:popupclose', Romo.proxy(this.onModalPopupChange, this));
  }
  Romo.off(window, 'resize', Romo.proxy(this.onResizeWindow, this));

  Romo.trigger(this.elem, 'romoTooltip:popupClose', [this]);
}

RomoTooltip.prototype.onModalPopupChange = function(e) {
  if (e !== undefined) {
    this.doPopupClose();
  }
  return true;
}

RomoTooltip.prototype.onSetContent = function(e, value) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doSetContent(value);
}

RomoTooltip.prototype.doSetContent = function(value) {
  Romo.setData(this.elem, 'romo-tooltip-content', value);
  this._setBodyHtml(Romo.data(this.elem, 'romo-tooltip-content'));
  this.doPlacePopupElem();
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoTooltip.prototype.doPlacePopupElem = function() {
  if (Romo.parents(this.elem, '.romo-modal-popup').length !== 0) {
    Romo.setStyle(this.popupElem, 'position', 'fixed');
  }

  var pos = Romo.assign({}, this.elem.getBoundingClientRect(), Romo.offset(this.elem));
  var w = this.popupElem.offsetWidth;
  var h = this.popupElem.offsetHeight;
  var pad = 6 + 1; // arrow size + spacing
  var offset = {};

  var configHeight = Romo.data(this.elem, 'romo-tooltip-height') || Romo.data(this.elem, 'romo-tooltip-max-height');
  var configPosition = this.popupPosition;

  if (configHeight === 'detect' && (configPosition === 'top' || configPosition === 'bottom')) {
    var popupHeight = parseInt(Romo.css(this.popupElem, 'height'));
    var topAvailHeight = this._getPopupMaxAvailableHeight('top');
    var bottomAvailHeight = this._getPopupMaxAvailableHeight('bottom');

    if (popupHeight < topAvailHeight && popupHeight < bottomAvailHeight) {
      // if it fits both ways, use the config position way
      configHeight = this._getPopupMaxAvailableHeight(configPosition);
      Romo.setData(this.popupElem, 'romo-tooltip-arrow-position', configPosition);
    } else if (topAvailHeight > bottomAvailHeight) {
      configPosition = 'top';
      configHeight = topAvailHeight;
      Romo.setData(this.popupElem, 'data-romo-tooltip-arrow-position', 'top');
    } else {
      configPosition = 'bottom';
      configHeight = bottomAvailHeight;
      Romo.setData(this.popupElem, 'data-romo-tooltip-arrow-position', 'bottom');
    }

    Romo.setStyle(this.bodyElem, 'max-height', configHeight.toString() + 'px');
  } else {
    Romo.setData(this.popupElem, 'romo-tooltip-arrow-position', configPosition);
  }


  if(h > configHeight) {
    h = configHeight;
  }

  switch (configPosition) {
    case 'top':
      Romo.assign(offset, { top: pos.top - h - pad, left: pos.left + pos.width / 2 - w / 2 });
      break;
    case 'bottom':
      Romo.assign(offset, { top: pos.top + pos.height + pad, left: pos.left + pos.width / 2 - w / 2 });
      break;
    case 'left':
      Romo.assign(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left - w - pad });
      break;
    case 'right':
      Romo.assign(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left + pos.width + pad });
      break;
  }

  Romo.setStyle(this.popupElem, 'top',  offset.top);
  Romo.setStyle(this.popupElem, 'left', offset.left);
}

RomoTooltip.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  Romo.setStyle(this.popupElem, 'z-index', relativeZIndex + 1100); // see z-index.css
}

// private

RomoTooltip.prototype._getPopupMaxAvailableHeight = function(position) {
  var maxHeight = undefined;

  switch (position) {
    case 'top':
      var elemTop = this.elem.getBoundingClientRect().top;
      maxHeight = elemTop - this._getPopupMaxHeightDetectPad(position);
      break;
    case 'bottom':
      var elemBottom = this.elem.getBoundingClientRect().bottom;
      maxHeight = window.innerHeight - elemBottom - this._getPopupMaxHeightDetectPad(position);
      break;
  }

  return maxHeight;
}

RomoTooltip.prototype._getPopupMaxHeightDetectPad = function(position) {
  return Romo.data(this.elem, 'romo-tooltip-max-height-detect-pad-'+position) || Romo.data(this.elem, 'romo-tooltip-max-height-detect-pad') || 10;
}

RomoTooltip.prototype._setBodyHtml = function(content) {
  Romo.updateHtml(this.bodyElem, content || '');
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-tooltip-auto="true"]').forEach(function(elem) { new RomoTooltip(elem); });
});
