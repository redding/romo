var RomoModal = RomoComponent(function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoModal:ready', [this]);
});

RomoModal.prototype.popupOpen = function() {
  return Romo.hasClass(this.popupElem, 'romo-modal-open') === true;
}

RomoModal.prototype.popupClosed = function() {
  return Romo.hasClass(this.popupElem, 'romo-modal-open') === false;
}

RomoModal.prototype.doToggle = function() {
  if (this.popupOpen()) {
    Romo.pushFn(Romo.proxy(this.doPopupClose, this));
  } else {
    Romo.pushFn(Romo.proxy(this.doPopupOpen, this));
  }
  Romo.trigger(this.elem, 'romoModal:toggle', [this]);
}

RomoModal.prototype.doPopupOpen = function() {
  Romo.popupStack.addElem(
    this.popupElem,
    Romo.proxy(this._openPopup,       this),
    Romo.proxy(this._closePopup,      this),
    Romo.proxy(this.doPlacePopupElem, this)
  );
}

RomoModal.prototype.doPopupClose = function() {
  Romo.popupStack.closeThru(this.popupElem);
}

RomoModal.prototype.doPlacePopupElem = function() {
  var viewportHeight = document.documentElement.clientHeight;
  var viewportWidth  = document.documentElement.clientWidth;

  if (Romo.data(this.elem, 'romo-modal-max-height') === 'detect') {
    var pad           = Romo.data(this.elem, 'romo-modal-max-height-detect-pad') || 10;
    var contentTop    = this.contentElem.getBoundingClientRect().top;
    var contentBottom = this.contentElem.getBoundingClientRect().bottom;
    var bodyBottom    = this.bodyElem.getBoundingClientRect().bottom;
    var padBottom     = bodyBottom - contentBottom;

    var maxHeight = viewportHeight - contentTop - padBottom - pad;
    Romo.setStyle(this.contentElem, 'max-height', maxHeight.toString() + 'px');
  }

  var popupOffsetHeight = this.popupElem.offsetHeight;
  var popupOffsetWidth  = this.popupElem.offsetWidth;
  var minHeightWidth    = 75;
  var centerTop         = (viewportHeight / 2) - (popupOffsetHeight / 2);
  var centerLeft        = (viewportWidth  / 2) - (popupOffsetWidth / 2);

  var offsetTop = viewportHeight * 0.15;
  if (centerTop < offsetTop) { offsetTop = centerTop; }
  if (offsetTop < minHeightWidth) { offsetTop = minHeightWidth; }

  var offsetLeft = centerLeft;
  if (offsetLeft < minHeightWidth) { offsetLeft = minHeightWidth; }

  Romo.setStyle(this.popupElem, 'top',  offsetTop + 'px');
  Romo.setStyle(this.popupElem, 'left', offsetLeft + 'px');
}

// private

RomoModal.prototype._openPopup = function() {
  if (Romo.data(this.elem, 'romo-modal-content-elem') !== undefined) {
    var contentElem = Romo.f(Romo.data(this.elem, 'romo-modal-content-elem'))[0];
    this._loadBodySuccess(contentElem.innerHTML);
  } else {
    this.romoAjax.doInvoke();
  }

  Romo.addClass(this.popupElem, 'romo-modal-open');
  this.doPlacePopupElem();

  Romo.trigger(this.elem, 'romoModal:popupOpen', [this]);
}

RomoModal.prototype._closePopup = function() {
  Romo.removeClass(this.popupElem, 'romo-modal-open');

  if (Romo.data(this.elem, 'romo-modal-clear-content') === true) {
    Romo.updateHtml(this.contentElem, '');
  }

  Romo.trigger(this.elem, 'romoModal:popupClose', [this]);
}

RomoModal.prototype._bindElem = function() {
  this._bindPopup();
  this._bindAjax();
  this._bindBody();

  if (Romo.data(this.elem, 'romo-modal-disable-click-invoke') !== true) {
    Romo.on(this.elem, 'click', Romo.proxy(this._onToggle, this));
  }
  Romo.on(this.elem, 'romoModal:triggerToggle',     Romo.proxy(this._onToggle,     this));
  Romo.on(this.elem, 'romoModal:triggerPopupOpen',  Romo.proxy(this._onPopupOpen,  this));
  Romo.on(this.elem, 'romoModal:triggerPopupClose', Romo.proxy(this._onPopupClose, this));
}

RomoModal.prototype._bindPopup = function() {
  this.popupElem = Romo.elems(
    '<div class="romo-modal-popup">' +
      '<div class="romo-modal-body"></div>' +
    '</div>'
  )[0];

  var popupParentElem;
  var appendToClosestSel = Romo.data(this.elem, 'romo-modal-append-to-closest');
  if (appendToClosestSel !== undefined) {
    popupParentElem = Romo.closest(this.elem, appendToClosestSel);
  } else {
    popupParentElem = Romo.f(
      Romo.data(this.elem, 'romo-modal-append-to') || 'BODY'
    )[0];
  }
  Romo.append(popupParentElem, this.popupElem);

  this.bodyElem = Romo.children(this.popupElem, '.romo-modal-body')[0];
  if (Romo.data(this.elem, 'romo-modal-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-modal-style-class'));
  }

  this.contentElem = undefined;
  this.closeElems  = [];
  this.dragElems   = [];

  Romo.parentChildElems.add(this.elem, [this.popupElem]);
  Romo.on(this.popupElem, 'romoParentChildElems:childRemoved', Romo.proxy(function(e, childElem) {
    Romo.popupStack.closeThru(this.popupElem);
  }, this));
  Romo.on(this.popupElem, 'romoPopupStack:popupClosedByEsc', Romo.proxy(function(e, romoPopupStack) {
    Romo.trigger(this.elem, 'romoModal:popupClosedByEsc', [this]);
  }, this));

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
  Romo.on(this.closeElems, 'click', Romo.proxy(this._onPopupClose, this));

  this.dragElems = Romo.find(this.popupElem, '[data-romo-modal-drag="true"]');
  Romo.on(this.dragElems, 'mousedown', Romo.proxy(this._onMouseDown, this));
  Romo.addClass(this.dragElems, 'romo-modal-grab');

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

  Romo.off(this.closeElems, 'click', Romo.proxy(this._onPopupClose, this));
}

RomoModal.prototype._loadBodyStart = function() {
  Romo.updateHtml(this.bodyElem, '');
  this._bindBody();
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
  Romo.trigger(this.elem, 'romoModal:loadBodyStart', [this]);
}

RomoModal.prototype._loadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this._bindBody();
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
  Romo.trigger(this.elem, 'romoModal:loadBodySuccess', [data, this]);
}

RomoModal.prototype._loadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoModal:loadBodyError', [xhr, this]);
}

RomoModal.prototype._dragStart = function(e) {
  Romo.addClass(this.dragElems, 'romo-modal-grabbing');
  Romo.removeClass(this.dragElems, 'romo-modal-grab');

  Romo.popupStack.closeTo(this.popupElem);

  Romo.setStyle(this.popupElem, 'width',  Romo.width(this.popupElem)+'px');
  Romo.setStyle(this.popupElem, 'height', Romo.height(this.popupElem)+'px');

  this._dragDiffX = e.clientX - this.popupElem.offsetLeft;
  this._dragDiffY = e.clientY - this.popupElem.offsetTop;
  Romo.on(window, 'mousemove', Romo.proxy(this._onMouseMove, this));
  Romo.on(window, 'mouseup',   Romo.proxy(this._onMouseUp,   this));

  Romo.trigger(this.elem, "romoModal:dragStart", [this]);
}

RomoModal.prototype._dragMove = function(clientX, clientY) {
  var placeX = clientX - this._dragDiffX;
  var placeY = clientY - this._dragDiffY;
  Romo.setStyle(this.popupElem, 'left', placeX+'px');
  Romo.setStyle(this.popupElem, 'top',  placeY+'px');

  Romo.trigger(this.elem, "romoModal:dragMove", [placeX, placeY, this]);
}

RomoModal.prototype._dragStop = function(e) {
  Romo.addClass(this.dragElems, 'romo-modal-grab');
  Romo.removeClass(this.dragElems, 'romo-modal-grabbing');

  Romo.rmStyle(this.popupElem, 'width');
  Romo.rmStyle(this.popupElem, 'height');

  Romo.off(window, 'mousemove', Romo.proxy(this._onMouseMove, this));
  Romo.off(window, 'mouseup',   Romo.proxy(this._onMouseUp, this));
  delete this._dragDiffX;
  delete this._dragDiffY;

  Romo.trigger(this.elem, "romoModal:dragStop", [this]);
}

// event functions

RomoModal.prototype.romoEvFn._onToggle = function(e) {
  e.preventDefault();

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doToggle();
  }
}

RomoModal.prototype.romoEvFn._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupClosed()) {
    this.doPopupOpen();
  }
}

RomoModal.prototype.romoEvFn._onPopupClose = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupOpen()) {
    this.doPopupClose();
  }
}

RomoModal.prototype.romoEvFn._onMouseDown = function(e) {
  this._dragStart(e);
  return false;
}

RomoModal.prototype.romoEvFn._onMouseMove = function(e) {
  Romo.trigger(Romo.f('body')[0], 'romoModal:mousemove');
  this._dragMove(e.clientX, e.clientY);
  return false;
}

RomoModal.prototype.romoEvFn._onMouseUp = function(e) {
  this._dragStop(e);
  return false;
}

// init

Romo.popupStack.addStyleClass('romo-modal-popup');
Romo.addElemsInitSelector('[data-romo-modal-auto="true"]', RomoModal);
