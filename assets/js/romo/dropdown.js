var RomoDropdown = function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoDropdown:ready', [this]);
}

RomoDropdown.prototype.popupOpen = function() {
  return Romo.hasClass(this.popupElem, 'romo-dropdown-open') === true;
}

RomoDropdown.prototype.popupClosed = function() {
  return Romo.hasClass(this.popupElem, 'romo-dropdown-open') === false;
}

RomoDropdown.prototype.doInit = function() {
  // override as needed
}

RomoDropdown.prototype.doToggle = function() {
  if (this.popupOpen()) {
    setTimeout(Romo.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  } else {
    setTimeout(Romo.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
  Romo.trigger(this.elem, 'romoDropdown:toggle', [this]);
}

RomoDropdown.prototype.doPopupOpen = function() {
  if (Romo.data(this.elem, 'romo-dropdown-content-elem') !== undefined) {
    var contentElem = Romo.elems(Romo.data(this.elem, 'romo-dropdown-content-elem'))[0];
    this._loadBodySuccess(contentElem.outerHTML);
  } else {
    this.romoAjax.doInvoke();
  }

  Romo.addClass(this.popupElem, 'romo-dropdown-open');
  this.doPlacePopupElem();

  // bind an event to close the popup when clicking away from the
  // popup.  Bind on a timeout to allow time for any toggle
  // click event to propagate.  If no timeout, we'll bind this
  // event, then the toggle click will propagate which will call
  // this event and immediately close the popup.
  setTimeout(Romo.proxy(function() {
    this._bindWindowBodyClick();
  }, this), 1);

  // bind "esc" keystroke to toggle close
  this._bindWindowBodyKeyUp();

  // bind window resizes reposition dropdown
  Romo.on(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  Romo.trigger(this.elem, 'romoDropdown:popupOpen', [this]);
}

RomoDropdown.prototype.doPopupClose = function() {
  Romo.removeClass(this.popupElem, 'romo-dropdown-open');

  // unbind any event to close the popup when clicking away from it
  this._unBindWindowBodyClick();

  // unbind "esc" keystroke to toggle close
  this._unBindWindowBodyKeyUp();

  // unbind window resizes reposition dropdown
  Romo.off(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  // clear the content elem markup if configured to
  if (Romo.data(this.elem, 'romo-dropdown-clear-content') === true) {
    Romo.updateHtml(this.contentElem, '');
  }

  Romo.trigger(this.elem, 'romoDropdown:popupClose', [this]);
}

RomoDropdown.prototype.doPlacePopupElem = function() {
  if (Romo.parents(this.elem, '.romo-modal-popup').length !== 0) {
    Romo.setStyle(this.popupElem, 'position', 'fixed');
  }

  var pos    = Romo.assign({}, this.elem.getBoundingClientRect(), Romo.offset(this.elem));
  var w      = this.popupElem.offsetWidth;
  var h      = this.popupElem.offsetHeight;
  var offset = {};

  var configHeight = Romo.data(this.elem, 'romo-dropdown-height') ||
                     Romo.data(this.elem, 'romo-dropdown-max-height');
  var configPosition = this.popupPosition;

  if (configHeight === 'detect') {
    var popupHeight       = parseInt(Romo.css(this.popupElem, 'height'), 10);
    var topAvailHeight    = this._getPopupMaxAvailableHeight('top');
    var bottomAvailHeight = this._getPopupMaxAvailableHeight('bottom');

    if (popupHeight < topAvailHeight && popupHeight < bottomAvailHeight) {
      // if it fits both ways, use the config position way
      configHeight = this._getPopupMaxAvailableHeight(configPosition);
    } else if (topAvailHeight > bottomAvailHeight) {
      configPosition = 'top';
      configHeight = topAvailHeight;
    } else {
      configPosition = 'bottom';
      configHeight = bottomAvailHeight;
    }

    // remove any height difference between the popup and content elems
    // assumes popup height always greater than or equal to content height
    configHeight = configHeight - (h - this.contentElem.offsetHeight);
    Romo.setStyle(this.contentElem, 'max-height', configHeight.toString() + 'px');
  }

  if(h > configHeight) {
    h = configHeight;
  }

  switch (configPosition) {
    case 'top':
      var pad = 2;
      Romo.assign(offset, { top: pos.top - h - pad });
      break;
    case 'bottom':
      var pad = 2;
      Romo.assign(offset, { top: pos.top + pos.height + pad });
      break;
  }
  switch (this.popupAlignment) {
    case 'left':
      Romo.assign(offset, { left: pos.left });
      break;
    case 'right':
      Romo.assign(offset, { left: pos.left + pos.width - w });
      break;
  }

  Romo.setStyle(this.popupElem, 'top',  this._roundPosOffsetVal(offset.top));
  Romo.setStyle(this.popupElem, 'left', this._roundPosOffsetVal(offset.left));
}

RomoDropdown.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  Romo.setStyle(this.popupElem, 'z-index', relativeZIndex + 1200); // see z-index.css
}

// private

RomoDropdown.prototype._bindElem = function() {
  this._bindPopup();
  this._bindAjax();
  this._bindBody();
  this._bindElemKeyUp();

  if (Romo.data(this.elem, 'romo-dropdown-disable-click-invoke') !== true) {
    Romo.on(this.elem, 'click', Romo.proxy(this._onToggle, this));
  }
  Romo.on(this.elem, 'romoDropdown:triggerToggle',     Romo.proxy(this._onToggle,     this));
  Romo.on(this.elem, 'romoDropdown:triggerPopupOpen',  Romo.proxy(this._onPopupOpen,  this));
  Romo.on(this.elem, 'romoDropdown:triggerPopupClose', Romo.proxy(this._onPopupClose, this));
}

RomoDropdown.prototype._bindPopup = function() {
  this.popupElem = Romo.elems('<div class="romo-dropdown-popup"><div class="romo-dropdown-body"></div></div>')[0];
  var popupParentElem = Romo.closest(this.elem, Romo.data(this.elem, 'romo-dropdown-append-to-closest') || 'body');
  Romo.append(popupParentElem, this.popupElem);

  Romo.on(this.popupElem, 'romoModal:popupOpen', Romo.proxy(function(e) {
    this._unBindWindowBodyClick();
    this._unBindWindowBodyKeyUp();
    this._unBindElemKeyUp();
  }, this));
  Romo.on(this.popupElem, 'romoModal:popupClose', Romo.proxy(function(e) {
    this._bindWindowBodyClick();
    this._bindWindowBodyKeyUp();
    this._bindElemKeyUp();
  }, this));

  this.bodyElem = Romo.find(this.popupElem, '> .romo-dropdown-body')[0];
  if (Romo.data(this.elem, 'romo-dropdown-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-dropdown-style-class'));
  }

  this.contentElem = undefined;

  var positionData = this._parsePositionData(Romo.data(this.elem, 'romo-dropdown-position'));
  this.popupPosition  = positionData.position  || 'bottom';
  this.popupAlignment = positionData.alignment || 'left';
  Romo.setData(this.popupElem, 'romo-dropdown-position',  this.popupPosition);
  Romo.setData(this.popupElem, 'romo-dropdown-alignment', this.popupAlignment);

  this.doSetPopupZIndex(this.elem);

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  Romo.on(this.popupElem, 'click', function(e) {
    e.stopPropagation();
  })

  // the popup should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem is removed.
  // delay adding it b/c other components may `append` generated dropdowns
  // meaning the dropdown is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the popup.
  setTimeout(Romo.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.popupElem]);
  }, this), 1);
}

RomoDropdown.prototype._bindAjax = function() {
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

RomoDropdown.prototype._bindBody = function() {
  this._resetBody();

  var contentElems = Romo.find(this.bodyElem, '.romo-dropdown-content');
  this.contentElem = contentElems[contentElems.length - 1];
  if (this.contentElem === undefined) {
    this.contentElem = this.bodyElem;
  }

  this.closeElem = Romo.find(this.popupElem, '[data-romo-dropdown-close="true"]')[0];
  Romo.on(this.closeElem, 'click', Romo.proxy(this.onPopupClose, this));

  Romo.setStyle(this.contentElem, 'min-height', Romo.data(this.elem, 'romo-dropdown-min-height'));
  Romo.setStyle(this.contentElem, 'height',     Romo.data(this.elem, 'romo-dropdown-height'));
  Romo.setStyle(this.contentElem, 'overflow-x', Romo.data(this.elem, 'romo-dropdown-overflow-x') || 'auto');
  Romo.setStyle(this.contentElem, 'overflow-y', Romo.data(this.elem, 'romo-dropdown-overflow-y') || 'auto');

  if (Romo.data(this.elem, 'romo-dropdown-max-height') === undefined) {
    Romo.setData(this.elem, 'romo-dropdown-max-height', 'detect');
  }
  if (Romo.data(this.elem, 'romo-dropdown-max-height') !== 'detect') {
    Romo.setStyle(this.contentElem, 'max-height', Romo.data(this.elem, 'romo-dropdown-max-height'));
  }

  if (Romo.data(this.elem, 'romo-dropdown-width') === 'elem') {
    Romo.setStyle(this.popupElem, 'width', Romo.css(this.elem, 'width'));
  } else {
    Romo.setStyle(this.contentElem, 'min-width', Romo.data(this.elem, 'romo-dropdown-min-width'));
    Romo.setStyle(this.contentElem, 'max-width', Romo.data(this.elem, 'romo-dropdown-max-width'));
    Romo.setStyle(this.contentElem, 'width',     Romo.data(this.elem, 'romo-dropdown-width'));
  }
}

RomoDropdown.prototype._resetBody = function() {
  Romo.rmStyle(this.contentElem, 'min-width');
  Romo.rmStyle(this.contentElem, 'max-width');
  Romo.rmStyle(this.contentElem, 'width');
  Romo.rmStyle(this.contentElem, 'min-height');
  Romo.rmStyle(this.contentElem, 'max-height');
  Romo.rmStyle(this.contentElem, 'height');
  Romo.rmStyle(this.contentElem, 'overflow-x');
  Romo.rmStyle(this.contentElem, 'overflow-y');
}

RomoDropdown.prototype._loadBodyStart = function() {
  Romo.updateHtml(this.bodyElem, '');
  this._bindBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoDropdown:loadBodyStart', [this]);
}

RomoDropdown.prototype._loadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this._bindBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoDropdown:loadBodySuccess', [data, this]);
}

RomoDropdown.prototype._loadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoDropdown:loadBodyError', [xhr, this]);
}

RomoDropdown.prototype._onToggle = function(e) {
  if (
    Romo.hasClass(this.elem, 'disabled') === false &&
    Romo.data(this.elem, 'romo-dropdown-disable-toggle') !== true
  ) {
    this.doToggle();
  }

  return false;
}

RomoDropdown.prototype._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupClosed()) {
    setTimeout(Romo.proxy(function() {
      this.doPopupOpen();
    }, this), 1);
  }
}

RomoDropdown.prototype._onPopupClose = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupOpen()) {
    setTimeout(Romo.proxy(function() {
      this.doPopupClose();
    }, this), 1);
  }
}

RomoDropdown.prototype._bindElemKeyUp = function() {
  Romo.on(this.elem,      'keyup', Romo.proxy(this._onElemKeyUp, this));
  Romo.on(this.popupElem, 'keyup', Romo.proxy(this._onElemKeyUp, this));
}

RomoDropdown.prototype._unBindElemKeyUp = function() {
  Romo.off(this.elem,      'keyup', Romo.proxy(this._onElemKeyUp, this));
  Romo.off(this.popupElem, 'keyup', Romo.proxy(this._onElemKeyUp, this));
}

RomoDropdown.prototype._onElemKeyUp = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    if (this.popupOpen()) {
      if(e.keyCode === 27 /* Esc */ ) {
        this.doPopupClose();
        Romo.trigger(this.elem, 'romoDropdown:popupClosedByEsc', [this]);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  return true;
}

RomoDropdown.prototype._bindWindowBodyClick = function() {
  var bodyElem = Romo.f('body')[0];
  Romo.on(bodyElem, 'click',               Romo.proxy(this._onWindowBodyClick, this));
  Romo.on(bodyElem, 'romoModal:mousemove', Romo.proxy(this._onWindowBodyClick, this));
}

RomoDropdown.prototype._unBindWindowBodyClick = function() {
  var bodyElem = Romo.f('body')[0];
  Romo.off(bodyElem, 'click',               Romo.proxy(this._onWindowBodyClick, this));
  Romo.off(bodyElem, 'romoModal:mousemove', Romo.proxy(this._onWindowBodyClick, this));
}

RomoDropdown.prototype._onWindowBodyClick = function(e) {
  // if not clicked on the popup elem or the elem
  if (e !== undefined) {
    var parentPopupElems = Romo.parents(e.target, '.romo-dropdown-popup');

    var elemIsParentOfTarget = Romo.parents(e.target).reduce(
      Romo.proxy(function(isParent, parentElem) {
        return isParent || (parentElem == this.elem);
      }, this),
      false
    );

    if (parentPopupElems.length === 0 && elemIsParentOfTarget === false) {
      this.doPopupClose();
    }
  }
  return true;
}

RomoDropdown.prototype._bindWindowBodyKeyUp = function() {
  var bodyElem = Romo.f('body')[0];
  Romo.on(bodyElem, 'keyup', Romo.proxy(this._onWindowBodyKeyUp, this));
}

RomoDropdown.prototype._nBindWindowBodyKeyUp = function() {
  var bodyElem = Romo.f('body')[0];
  Romo.off(bodyElem, 'keyup', Romo.proxy(this._onWindowBodyKeyUp, this));
}

RomoDropdown.prototype._onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
    Romo.trigger(this.elem, 'romoDropdown:popupClosedByEsc', [this]);
  }
  return true;
}

RomoDropdown.prototype._onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoDropdown.prototype._parsePositionData = function(posString) {
  var posData = (posString || '').split(',');
  return { position: posData[0], alignment: posData[1] };
}

RomoDropdown.prototype._getPopupMaxAvailableHeight = function(position) {
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

RomoDropdown.prototype._getPopupMaxHeightDetectPad = function(position) {
  return Romo.data(this.elem, 'romo-dropdown-max-height-detect-pad-'+position) || Romo.data(this.elem, 'romo-dropdown-max-height-detect-pad') || 10;
}

RomoDropdown.prototype._roundPosOffsetVal = function(value) {
  return Math.round(value*100) / 100;
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-dropdown-auto="true"]').forEach(function(elem) { new RomoDropdown(elem); });
});
