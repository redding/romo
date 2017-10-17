var RomoModal = function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoModal:ready', [this]);
}

RomoDropdown.prototype.popupOpen = function() {
  return Romo.hasClass(this.popupElem, 'romo-modal-open') === true;
}

RomoDropdown.prototype.popupClosed = function() {
  return Romo.hasClass(this.popupElem, 'romo-modal-open') === false;
}

RomoModal.prototype.doInit = function() {
  // override as needed
}

RomoModal.prototype.doToggle = function() {
  if (this.popupOpen()) {
    setTimeout(Romo.proxy(function() {
      this.doPopupClose();
    }, this), 1);
  } else {
    setTimeout(Romo.proxy(function() {
      this.doPopupOpen();
    }, this), 1);
  }
  Romo.trigger(this.elem, 'romoModal:toggle', [this]);
}

RomoModal.prototype.doPopupOpen = function() {
  if (Romo.data(this.elem, 'romo-modal-content-elem') !== undefined) {
    var contentElem = Romo.elems(Romo.data(this.elem, 'romo-modal-content-elem'))[0];
    this._loadBodySuccess(contentElem.outerHTML);
  } else {
    this.romoAjax.doInvoke();
  }

  Romo.addClass(this.popupElem, 'romo-modal-open');
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

  // bind window resizes reposition modal
  Romo.on(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  Romo.trigger(this.elem, 'romoModal:popupOpen', [this]);
}

RomoModal.prototype.doPopupClose = function() {
  Romo.trigger(Romo.f('body')[0], 'romoModal:popupclose');
  Romo.removeClass(this.popupElem, 'romo-modal-open');

  // unbind any event to close the popup when clicking away from it
  this._unBindWindowBodyClick();

  // unbind "esc" keystroke to toggle close
  this._unBindWindowBodyKeyUp();

  // unbind window resizes reposition modal
  Romo.off(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  // clear the content elem markup if configured to
  if (Romo.data(this.elem, 'romo-modal-clear-content') === true) {
    Romo.updateHtml(this.contentElem, '');
  }

  Romo.trigger(this.elem, 'romoModal:popupClose', [this]);
}

RomoModal.prototype.doPlacePopupElem = function() {
  var w          = this.popupElem.offsetWidth;
  var h          = this.popupElem.offsetHeight;
  var min        = 75;
  var centerTop  = window.innerHeight / 2 - h / 2;
  var centerLeft = window.innerWidth  / 2 - w / 2;
  var css        = {};

  css.top = window.innerHeight * 0.15;
  if (centerTop < css.top) { css.top = centerTop; }
  if (css.top < min) { css.top = min; }

  css.left = centerLeft;
  if (css.left < min) { css.left = min; }

  Romo.setStyle(this.popupElem, 'top',  css.top);
  Romo.setStyle(this.popupElem, 'left', css.left);

  if (Romo.data(this.elem, 'romo-modal-max-height') === 'detect') {
    var pad           = Romo.data(this.elem, 'romo-modal-max-height-detect-pad') || 10;
    var contentTop    = this.contentElem.getBoundingClientRect().top;
    var contentBottom = this.contentElem.getBoundingClientRect().bottom;
    var bodyBottom    = this.bodyElem.getBoundingClientRect().bottom;
    var padBottom     = bodyBottom - contentBottom;

    var maxHeight = window.innerHeight - contentTop - padBottom - pad;
    Romo.setStyle(this.contentElem, 'max-height', maxHeight.toString() + 'px');
  }
}

// private

RomoDropdown.prototype._bindElem = function() {
  this._bindPopup();
  this._bindAjax();
  this._bindBody();
  this._bindElemKeyUp();

  if (Romo.data(this.elem, 'romo-modal-disable-click-invoke') !== true) {
    Romo.on(this.elem, 'click', Romo.proxy(this._onToggle, this));
  }
  Romo.on(this.elem, 'romoModal:triggerToggle',     Romo.proxy(this._onToggle,     this));
  Romo.on(this.elem, 'romoModal:triggerPopupOpen',  Romo.proxy(this._onPopupOpen,  this));
  Romo.on(this.elem, 'romoModal:triggerPopupClose', Romo.proxy(this._onPopupClose, this));
}

RomoDropdown.prototype._bindPopup = function() {
  this.popupElem = Romo.elems('<div class="romo-modal-popup"><div class="romo-modal-body"></div></div>')[0];
  var popupParentElem = Romo.closest(this.elem, Romo.data(this.elem, 'romo-dropdown-append-to-closest') || 'body');
  Romo.append(popupParentElem, this.popupElem)

  this.bodyElem = Romo.find(this.popupElem, '> .romo-modal-body')[0];
  if (Romo.data(this.elem, 'romo-modal-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-modal-style-class'));
  }

  this.contentElem = undefined;
  this.closeElem   = undefined;
  this.dragElem    = undefined;

  // the popup should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem is removed.
  // delay adding it b/c other components may `append` generated modals
  // meaning the modal is removed and then re-added.  if added immediately
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

RomoModal.prototype._bindBody = function() {
  this._resetBody();

  var contentElems = Romo.find(this.bodyElem, '.romo-modal-content');
  this.contentElem = contentElems[contentElems.length - 1];
  if (this.contentElem === undefined) {
    this.contentElem = this.bodyElem;
  }

  this.closeElem = Romo.find(this.popupElem, '[data-romo-modal-close="true"]')[0];
  Romo.on(this.closeElem, 'click', Romo.proxy(this._onPopupClose, this));

  this.dragElem = Romo.find(this.popupElem, '[data-romo-modal-drag="true"]')[0];
  Romo.addClass(this.dragElem, 'romo-modal-grab');
  Romo.on(this.dragElem, 'mousedown', Romo.proxy(this._onMouseDown, this));

  var css = {
    'min-width':  Romo.data(this.elem, 'romo-modal-min-width'),
    'max-width':  Romo.data(this.elem, 'romo-modal-max-width'),
    'width':      Romo.data(this.elem, 'romo-modal-width'),
    'min-height': Romo.data(this.elem, 'romo-modal-min-height'),
    'height':     Romo.data(this.elem, 'romo-modal-height'),
    'overflow-x': 'auto',
    'overflow-y': 'auto'
  }

  if (Romo.data(this.elem, 'romo-modal-max-height') === undefined) {
    Romo.setAttr(this.elem, 'data-romo-modal-max-height', 'detect');
  }
  if (Romo.data(this.elem, 'romo-modal-max-height') !== 'detect') {
    css['max-height'] = Romo.data(this.elem, 'romo-modal-max-height');
  }

  for (var key in css) {
    Romo.setStyle(this.contentElem, key, css[key]);
  }
}

RomoModal.prototype._resetBody = function() {
  Romo.setStyle(this.contentElem, 'min-width',  '');
  Romo.setStyle(this.contentElem, 'max-width',  '');
  Romo.setStyle(this.contentElem, 'width',      '');
  Romo.setStyle(this.contentElem, 'min-height', '');
  Romo.setStyle(this.contentElem, 'max-height', '');
  Romo.setStyle(this.contentElem, 'height',     '');
  Romo.setStyle(this.contentElem, 'overflow',   '');

  Romo.off(this.closeElem, 'click', Romo.proxy(this.onPopupClose, this));
}

RomoModal.prototype._loadBodyStart = function() {
  Romo.updateHtml(this.bodyElem, '');
  this._bindBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoModal:loadBodyStart', [this]);
}

RomoModal.prototype._loadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this._bindBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoModal:loadBodySuccess', [data, this]);
}

RomoModal.prototype._loadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoModal:loadBodyError', [xhr, this]);
}

RomoModal.prototype._onToggle = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doToggle();
  }
  return false;
}

RomoModal.prototype._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupClosed()) {
    setTimeout(Romo.proxy(function() {
      this.doPopupOpen();
    }, this), 1);
  }
}

RomoModal.prototype._onPopupClose = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupOpen()) {
    setTimeout(Romo.proxy(function() {
      this.doPopupClose();
    }, this), 1);
  }
}

RomoModal.prototype.onMouseDown = function(e) {
  this._dragStart(e);
  return false;
}

RomoModal.prototype._dragStart = function(e) {
  Romo.addClass(this.dragElem, 'romo-modal-grabbing');
  Romo.removeClass(this.dragElem, 'romo-modal-grab');

  Romo.setStyle(this.popupElem, 'width',  Romo.css(this.popupElem, 'width');
  Romo.setStyle(this.popupElem, 'height', Romo.css(this.popupElem, 'height');

  this._dragDiffX = e.clientX - this.popupElem.offsetLeft;
  this._dragDiffY = e.clientY - this.popupElem.offsetTop;
  Romo.on(window, 'mousemove', Romo.proxy(this._onMouseMove, this));
  Romo.on(window, 'mouseup',   Romo.proxy(this._onMouseUp,   this));

  Romo.trigger(this.elem, "romoModal:dragStart", [this]);
}

RomoModal.prototype._onMouseMove = function(e) {
  Romo.trigger(Romo.f('body')[0], 'romoModal:mousemove');
  this._dragMove(e.clientX, e.clientY);
  return false;
}

RomoModal.prototype._dragMove = function(clientX, clientY) {
  var placeX = clientX - this._dragDiffX;
  var placeY = clientY - this._dragDiffY;
  Romo.setStyle(this.popupElem, 'left', placeX+'px');
  Romo.setStyle(this.popupElem, 'top',  placeY+'px');

  Romo.trigger(this.elem, "romoModal:dragMove", [placeX, placeY, this]);
}

RomoModal.prototype.onMouseUp = function(e) {
  this._dragStop(e);
  return false;
}

RomoModal.prototype._dragStop = function(e) {
  Romo.addClass(this.dragElem, 'romo-modal-grab');
  Romo.removeClass(this.dragElem, 'romo-modal-grabbing');

  Romo.setStyle(this.popupElem, 'width',  '');
  Romo.setStyle(this.popupElem, 'height', '');

  Romo.off(window, 'mousemove', Romo.proxy(this.onMouseMove, this));
  Romo.off(window, 'mouseup',   Romo.proxy(this.onMouseUp, this));
  delete this._dragDiffX;
  delete this._dragDiffY;

  Romo.trigger(this.elem, "romoModal:dragStop", [this]);
}

RomoModal.prototype._bindElemKeyUp = function() {
  Romo.on(this.elem,      'keyup', Romo.proxy(this._onElemKeyUp, this));
  Romo.on(this.popupElem, 'keyup', Romo.proxy(this._onElemKeyUp, this));
}

RomoModal.prototype._unBindElemKeyUp = function() {
  Romo.off(this.elem,      'keyup', Romo.proxy(this._onElemKeyUp, this));
  Romo.off(this.popupElem, 'keyup', Romo.proxy(this._onElemKeyUp, this));
}

RomoModal.prototype._onElemKeyUp = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    if (this.popupOpen()) {
      if(e.keyCode === 27 /* Esc */ ) {
        this.doPopupClose();
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

RomoModal.prototype._bindWindowBodyClick = function() {
  Romo.on(Romo.f('body')[0], 'click', Romo.proxy(this._onWindowBodyClick, this));
}

RomoModal.prototype._unBindWindowBodyClick = function() {
  Romo.off(Romo.f('body')[0], 'click', Romo.proxy(this._onWindowBodyClick, this));
}

RomoModal.prototype._onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && Romo.parents(e.target, '.romo-modal-popup').length === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoModal.prototype._bindWindowBodyKeyUp = function() {
  Romo.on(Romo.f('body')[0], 'keyup', Romo.proxy(this._onWindowBodyKeyUp, this));
}

RomoModal.prototype._uBindWindowBodyKeyUp = function() {
  Romo.off(Romo.f('body')[0], 'keyup', Romo.proxy(this._onWindowBodyKeyUp, this));
}

RomoModal.prototype._onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
    Romo.trigger(this.elem, 'romoModal:popupClosedByEsc', [this]);
  }
  return true;
}

RomoModal.prototype._onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-modal-auto="true"]').forEach(function(elem) { new RomoModal(elem); });
});
