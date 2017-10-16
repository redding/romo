var RomoModal = function(element) {
  this.elem = element;
  this.doInitPopup();
  this.romoAjax = new RomoAjax(this.elem);
  this.romoAjax.doUnbindElem(); // disable auto invoke on click

  if (Romo.data(this.elem, 'romo-modal-disable-click-invoke') !== true) {
    Romo.on(this.elem, 'click', Romo.proxy(this.onToggleClick, this));
  }
  Romo.on(this.elem, 'romoModal:triggerToggle', Romo.proxy(this.onToggleClick, this));
  Romo.on(this.elem, 'romoModal:triggerPopupOpen', Romo.proxy(this.onPopupOpen, this));
  Romo.on(this.elem, 'romoModal:triggerPopupClose', Romo.proxy(this.onPopupClose, this));
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

  this.doBindElemKeyUp();

  this.doInit();
  this.doInitBody();

  Romo.trigger(this.elem, 'romoModal:ready', [this]);
}

RomoModal.prototype.doInit = function() {
  // override as needed
}

RomoModal.prototype.doInitPopup = function() {
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

RomoModal.prototype.doInitBody = function() {
  this.doResetBody();


  var contentElems = Romo.find(this.bodyElem, '.romo-modal-content');
  this.contentElem = contentElems[contentElems.length - 1];
  if (this.contentElem === undefined) {
    this.contentElem = this.bodyElem;
  }

  this.closeElem = Romo.find(this.popupElem, '[data-romo-modal-close="true"]')[0];
  Romo.on(this.closeElem, 'click', Romo.proxy(this.onPopupClose, this));

  this.dragElem = Romo.find(this.popupElem, '[data-romo-modal-drag="true"]')[0];
  Romo.addClass(this.dragElem, 'romo-modal-grab');
  Romo.on(this.dragElem, 'mousedown', Romo.proxy(this.onMouseDown, this));

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

RomoModal.prototype.doResetBody = function() {
  Romo.setStyle(this.contentElem, 'min-width',  '');
  Romo.setStyle(this.contentElem, 'max-width',  '');
  Romo.setStyle(this.contentElem, 'width',      '');
  Romo.setStyle(this.contentElem, 'min-height', '');
  Romo.setStyle(this.contentElem, 'max-height', '');
  Romo.setStyle(this.contentElem, 'height',     '');
  Romo.setStyle(this.contentElem, 'overflow',   '');

  Romo.off(this.closeElem, 'click', Romo.proxy(this.onPopupClose, this));
}

RomoModal.prototype.doLoadBodyStart = function() {
  Romo.updateHtml(this.bodyElem, '');
  this.doInitBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoModal:loadBodyStart', [this]);
}

RomoModal.prototype.doLoadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  Romo.trigger(this.elem, 'romoModal:loadBodySuccess', [data, this]);
}

RomoModal.prototype.doLoadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoModal:loadBodyError', [xhr, this]);
}

RomoModal.prototype.onToggleClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doToggle();
  }
}

RomoModal.prototype.doToggle = function() {
  if (Romo.hasClass(this.popupElem, 'romo-modal-open')) {
    setTimeout(Romo.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  } else {
    setTimeout(Romo.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
  Romo.trigger(this.elem, 'romoModal:toggle', [this]);
}

RomoModal.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if ((Romo.hasClass(this.elem, 'disabled') === false) &&
      (Romo.hasClass(this.popupElem, 'romo-modal-open') === false)) {
    setTimeout(Romo.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
}

RomoModal.prototype.doPopupOpen = function() {
  if (Romo.data(this.elem, 'romo-modal-content-elem') !== undefined) {
    var contentElem = Romo.elems(Romo.data(this.elem, 'romo-modal-content-elem'))[0];
    this.doLoadBodySuccess(contentElem.outerHTML);
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
    this.doBindWindowBodyClick();
  }, this), 100);

  // bind "esc" keystroke to toggle close
  this.doBindWindowBodyKeyUp();

  // bind window resizes reposition modal
  Romo.on(window, 'resize', Romo.proxy(this.onResizeWindow, this));

  Romo.trigger(this.elem, 'romoModal:popupOpen', [this]);
}

RomoModal.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    setTimeout(Romo.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  }
}

RomoModal.prototype.doPopupClose = function() {
  Romo.trigger(Romo.f('body')[0], 'romoModal:popupclose');
  Romo.removeClass(this.popupElem, 'romo-modal-open');

  // unbind any event to close the popup when clicking away from it
  this.doUnBindWindowBodyClick();

  // unbind "esc" keystroke to toggle close
  this.doUnBindWindowBodyKeyUp();

  // unbind window resizes reposition modal
  Romo.off(window, 'resize', Romo.proxy(this.onResizeWindow, this));

  // clear the content elem markup if configured to
  if (Romo.data(this.elem, 'romo-modal-clear-content') === true) {
    Romo.updateHtml(this.contentElem, '');
  }

  Romo.trigger(this.elem, 'romoModal:popupClose', [this]);
}

RomoModal.prototype.onMouseDown = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.doDragStart(e);
  return false;
}

RomoModal.prototype.doDragStart = function(e) {
  this.dragElem.addClass('romo-modal-grabbing');
  this.dragElem.removeClass('romo-modal-grab');

  this.popupElem.css('width', this.popupElem.width()+'px');
  this.popupElem.css('height', this.popupElem.height()+'px');

  this._dragDiffX = e.clientX - this.popupElem[0].offsetLeft;
  this._dragDiffY = e.clientY - this.popupElem[0].offsetTop;
  $(window).on('mousemove', Romo.proxy(this.onMouseMove, this));
  $(window).on('mouseup',   Romo.proxy(this.onMouseUp, this));

  this.elem.trigger("romoModal:dragStart", [this]);
}

RomoModal.prototype.onMouseMove = function(e) {
  Romo.trigger(Romo.f('body'), 'romoModal:mousemove');
  e.preventDefault();
  e.stopPropagation();
  this.doDragMove(e.clientX, e.clientY);
  return false;
}

RomoModal.prototype.doDragMove = function(clientX, clientY) {
  var placeX = clientX - this._dragDiffX;
  var placeY = clientY - this._dragDiffY;
  Romo.setStyle(this.popupElem, 'left', placeX+'px');
  Romo.setStyle(this.popupElem, 'top',  placeY+'px');

  Romo.trigger(this.elem, "romoModal:dragMove", [placeX, placeY, this]);
}

RomoModal.prototype.onMouseUp = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.doDragStop(e);
  return false;
}

RomoModal.prototype.doDragStop = function(e) {
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

RomoModal.prototype.doBindElemKeyUp = function() {
  Romo.on(this.elem,      'keyup', Romo.proxy(this.onElemKeyUp, this));
  Romo.on(this.popupElem, 'keyup', Romo.proxy(this.onElemKeyUp, this));
}

RomoModal.prototype.doUnBindElemKeyUp = function() {
  Romo.off(this.elem,      'keyup', Romo.proxy(this.onElemKeyUp, this));
  Romo.off(this.popupElem, 'keyup', Romo.proxy(this.onElemKeyUp, this));
}

RomoModal.prototype.onElemKeyUp = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    if (Romo.hasClass(this.popupElem, 'romo-modal-open')) {
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

RomoModal.prototype.doBindWindowBodyClick = function() {
  Romo.on(Romo.f('body')[0], 'click', Romo.proxy(this.onWindowBodyClick, this));
}

RomoModal.prototype.doUnBindWindowBodyClick = function() {
  Romo.off(Romo.f('body')[0], 'click', Romo.proxy(this.onWindowBodyClick, this));
}

RomoModal.prototype.onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && Romo.parents(e.target, '.romo-modal-popup').length === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoModal.prototype.doBindWindowBodyKeyUp = function() {
  Romo.on(Romo.f('body')[0], 'keyup', Romo.proxy(this.onWindowBodyKeyUp, this));
}

RomoModal.prototype.doUnBindWindowBodyKeyUp = function() {
  Romo.off(Romo.f('body')[0], 'keyup', Romo.proxy(this.onWindowBodyKeyUp, this));
}

RomoModal.prototype.onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
  }
  return true;
}

RomoModal.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoModal.prototype.doPlacePopupElem = function() {
  var w = this.popupElem.offsetWidth;
  var h = this.popupElem.offsetHeight;
  var min = 75;
  var centerTop  = window.innerHeight / 2 - h / 2;
  var centerLeft = window.innerWidth  / 2 - w / 2;
  var css = {};

  css.top = window.innerHeight * 0.15;
  if (centerTop < css.top) { css.top = centerTop; }
  if (css.top < min) { css.top = min; }

  css.left = centerLeft;
  if (css.left < min) { css.left = min; }

  Romo.setStyle(this.popupElem, 'top',  css.top);
  Romo.setStyle(this.popupElem, 'left', css.left);

  if (Romo.data(this.elem, 'romo-modal-max-height') === 'detect') {
    var pad = Romo.data(this.elem, 'romo-modal-max-height-detect-pad') || 10;
    var contentTop = this.contentElem.getBoundingClientRect().top;
    var contentBottom = this.contentElem.getBoundingClientRect().bottom;
    var bodyBottom = this.bodyElem.getBoundingClientRect().bottom;
    var padBottom = bodyBottom - contentBottom;

    var maxHeight = window.innerHeight - contentTop - padBottom - pad;
    Romo.setStyle(this.contentElem, 'max-height', maxHeight.toString() + 'px');
  }
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-modal-auto="true"]').forEach(function(elem) { new RomoModal(elem); });
});
