var RomoModal = function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoModal:ready', [this]);
}

RomoModal.prototype.popupOpen = function() {
  return Romo.hasClass(this.popupElem, 'romo-modal-open') === true;
}

RomoModal.prototype.popupClosed = function() {
  return Romo.hasClass(this.popupElem, 'romo-modal-open') === false;
}

RomoModal.prototype.doInit = function() {
  // override as needed
}

RomoModal.prototype.doToggle = function() {
  if (this.popupOpen()) {
    setTimeout(Romo.proxy(this.doPopupClose, this), 1);
  } else {
    setTimeout(Romo.proxy(this.doPopupOpen, this), 1);
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
  setTimeout(Romo.proxy(this.doBindWindowBodyClick, this), 1);

  // bind "esc" keystroke to toggle close
  this.doBindWindowBodyKeyUp();

  // bind window resizes reposition modal
  Romo.on(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  Romo.trigger(this.elem, 'romoModal:popupOpen', [this]);
}

RomoModal.prototype.doPopupClose = function() {
  Romo.trigger(Romo.f('body')[0], 'romoModal:popupclose');
  Romo.removeClass(this.popupElem, 'romo-modal-open');

  // unbind any event to close the popup when clicking away from it
  this.doUnBindWindowBodyClick();

  // unbind "esc" keystroke to toggle close
  this.doUnBindWindowBodyKeyUp();

  // unbind window resizes reposition modal
  Romo.off(window, 'resize', Romo.proxy(this._onResizeWindow, this));

  // clear the content elem markup if configured to
  if (Romo.data(this.elem, 'romo-modal-clear-content') === true) {
    Romo.updateHtml(this.contentElem, '');
  }

  Romo.trigger(this.elem, 'romoModal:popupClose', [this]);
}

RomoModal.prototype.doPlacePopupElem = function() {
  var popupOffsetHeight = this.popupElem.offsetHeight;
  var popupOffsetWidth  = this.popupElem.offsetWidth;
  var minHeightWidth    = 75;
  var viewportHeight    = document.documentElement.clientHeight;
  var viewportWidth     = document.documentElement.clientWidth;
  var centerTop         = (viewportHeight / 2) - (popupOffsetHeight / 2);
  var centerLeft        = (viewportWidth  / 2) - (popupOffsetWidth / 2);

  var offsetTop = viewportHeight * 0.15;
  if (centerTop < offsetTop) { offsetTop = centerTop; }
  if (offsetTop < minHeightWidth) { offsetTop = minHeightWidth; }

  var offsetLeft = centerLeft;
  if (offsetLeft < minHeightWidth) { offsetLeft = minHeightWidth; }

  Romo.setStyle(this.popupElem, 'top',  offsetTop + 'px');
  Romo.setStyle(this.popupElem, 'left', offsetLeft + 'px');

  if (Romo.data(this.elem, 'romo-modal-max-height') === 'detect') {
    var pad           = Romo.data(this.elem, 'romo-modal-max-height-detect-pad') || 10;
    var contentTop    = this.contentElem.getBoundingClientRect().top;
    var contentBottom = this.contentElem.getBoundingClientRect().bottom;
    var bodyBottom    = this.bodyElem.getBoundingClientRect().bottom;
    var padBottom     = bodyBottom - contentBottom;

    var maxHeight = viewportHeight - contentTop - padBottom - pad;
    Romo.setStyle(this.contentElem, 'max-height', maxHeight.toString() + 'px');
  }
}

RomoModal.prototype.doBindElemKeyUp = function() {
  Romo.on(this.elem,      'keyup', Romo.proxy(this._onElemKeyUp, this));
  Romo.on(this.popupElem, 'keyup', Romo.proxy(this._onElemKeyUp, this));
}

RomoModal.prototype.doUnBindElemKeyUp = function() {
  Romo.off(this.elem,      'keyup', Romo.proxy(this._onElemKeyUp, this));
  Romo.off(this.popupElem, 'keyup', Romo.proxy(this._onElemKeyUp, this));
}

RomoModal.prototype.doBindWindowBodyClick = function() {
  Romo.on(Romo.f('body')[0], 'click', Romo.proxy(this._onWindowBodyClick, this));
}

RomoModal.prototype.doUnBindWindowBodyClick = function() {
  Romo.off(Romo.f('body')[0], 'click', Romo.proxy(this._onWindowBodyClick, this));
}

RomoModal.prototype.doBindWindowBodyKeyUp = function() {
  Romo.on(Romo.f('body')[0], 'keyup', Romo.proxy(this._onWindowBodyKeyUp, this));
}

RomoModal.prototype.doUnBindWindowBodyKeyUp = function() {
  Romo.off(Romo.f('body')[0], 'keyup', Romo.proxy(this._onWindowBodyKeyUp, this));
}

// private

RomoModal.prototype._bindElem = function() {
  this._bindPopup();
  this._bindAjax();
  this._bindBody();
  this.doBindElemKeyUp();

  if (Romo.data(this.elem, 'romo-modal-disable-click-invoke') !== true) {
    Romo.on(this.elem, 'click', Romo.proxy(this._onToggle, this));
  }
  Romo.on(this.elem, 'romoModal:triggerToggle',     Romo.proxy(this._onToggle,     this));
  Romo.on(this.elem, 'romoModal:triggerPopupOpen',  Romo.proxy(this._onPopupOpen,  this));
  Romo.on(this.elem, 'romoModal:triggerPopupClose', Romo.proxy(this._onPopupClose, this));
}

RomoModal.prototype._bindPopup = function() {
  this.popupElem = Romo.elems('<div class="romo-modal-popup"><div class="romo-modal-body"></div></div>')[0];
  var popupParentElem = Romo.closest(this.elem, Romo.data(this.elem, 'romo-dropdown-append-to-closest') || 'body');
  Romo.append(popupParentElem, this.popupElem)

  this.bodyElem = Romo.children(this.popupElem).find(Romo.proxy(function(childElem){
    return Romo.is(childElem, '.romo-modal-body');
  }, this));
  if (Romo.data(this.elem, 'romo-modal-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-modal-style-class'));
  }

  this.contentElem = undefined;
  this.closeElems  = [];
  this.dragElems   = [];

  // the popup should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem is removed.
  // delay adding it b/c other components may `append` generated modals
  // meaning the modal is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the popup.
  setTimeout(Romo.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.popupElem]);
  }, this), 1);
}

RomoModal.prototype._bindAjax = function() {
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

  this.closeElems = Romo.find(this.popupElem, '[data-romo-modal-close="true"]');
  this.closeElems.forEach(Romo.proxy(function(closeElem) {
    Romo.on(closeElem, 'click', Romo.proxy(this._onPopupClose, this));
  }, this));

  this.dragElems = Romo.find(this.popupElem, '[data-romo-modal-drag="true"]');
  this.dragElems.forEach(Romo.proxy(function(dragElem) {
    Romo.on(dragElem, 'mousedown', Romo.proxy(this._onMouseDown, this));
    Romo.addClass(dragElem, 'romo-modal-grab');
  }, this));

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
    Romo.setData(this.elem, 'romo-modal-max-height', 'detect');
  }
  if (Romo.data(this.elem, 'romo-modal-max-height') !== 'detect') {
    css['max-height'] = Romo.data(this.elem, 'romo-modal-max-height');
  }

  for (var key in css) {
    Romo.setStyle(this.contentElem, key, css[key]);
  }
}

RomoModal.prototype._resetBody = function() {
  if (this.contentElem !== undefined) {
    Romo.rmStyle(this.contentElem, 'min-width');
    Romo.rmStyle(this.contentElem, 'max-width');
    Romo.rmStyle(this.contentElem, 'width');
    Romo.rmStyle(this.contentElem, 'min-height');
    Romo.rmStyle(this.contentElem, 'max-height');
    Romo.rmStyle(this.contentElem, 'height');
    Romo.rmStyle(this.contentElem, 'overflow');
  }

  this.closeElems.forEach(Romo.proxy(function(closeElem) {
    Romo.off(closeElem, 'click', Romo.proxy(this._onPopupClose, this));
  }, this));
}

RomoModal.prototype._loadBodyStart = function() {
  Romo.updateHtml(this.bodyElem, '');
  this._bindBody();
  setTimeout(Romo.proxy(this.doPlacePopupElem, this), 1);
  Romo.trigger(this.elem, 'romoModal:loadBodyStart', [this]);
}

RomoModal.prototype._loadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this._bindBody();
  setTimeout(Romo.proxy(this.doPlacePopupElem, this), 1);
  Romo.trigger(this.elem, 'romoModal:loadBodySuccess', [data, this]);
}

RomoModal.prototype._loadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoModal:loadBodyError', [xhr, this]);
}

RomoModal.prototype._onToggle = function(e) {
  e.preventDefault();

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doToggle();
  }
}

RomoModal.prototype._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupClosed()) {
    setTimeout(Romo.proxy(this.doPopupOpen, this), 1);
  }
}

RomoModal.prototype._onPopupClose = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupOpen()) {
    setTimeout(Romo.proxy(this.doPopupClose, this), 1);
  }
}

RomoModal.prototype._onMouseDown = function(e) {
  this._dragStart(e);
  return false;
}

RomoModal.prototype._dragStart = function(e) {
  this.dragElems.forEach(Romo.proxy(function(dragElem) {
    Romo.addClass(dragElem, 'romo-modal-grabbing');
    Romo.removeClass(dragElem, 'romo-modal-grab');
  }, this));

  Romo.setStyle(this.popupElem, 'width',  Romo.css(this.popupElem, 'width'));
  Romo.setStyle(this.popupElem, 'height', Romo.css(this.popupElem, 'height'));

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

RomoModal.prototype._onMouseUp = function(e) {
  this._dragStop(e);
  return false;
}

RomoModal.prototype._dragStop = function(e) {
  this.dragElems.forEach(Romo.proxy(function(dragElem) {
    Romo.addClass(dragElem, 'romo-modal-grab');
    Romo.removeClass(dragElem, 'romo-modal-grabbing');
  }, this));

  Romo.rmStyle(this.popupElem, 'width');
  Romo.rmStyle(this.popupElem, 'height');

  Romo.off(window, 'mousemove', Romo.proxy(this._onMouseMove, this));
  Romo.off(window, 'mouseup',   Romo.proxy(this._onMouseUp, this));
  delete this._dragDiffX;
  delete this._dragDiffY;

  Romo.trigger(this.elem, "romoModal:dragStop", [this]);
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

RomoModal.prototype._onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && Romo.parents(e.target, '.romo-modal-popup').length === 0) {
    this.doPopupClose();
  }
  return true;
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

Romo.addElemsInitSelector('[data-romo-modal-auto="true"]', RomoModal);
