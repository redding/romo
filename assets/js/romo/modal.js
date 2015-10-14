$.fn.romoModal = function() {
  return $.map(this, function(element) {
    return new RomoModal(element);
  });
}

var RomoModal = function(element) {
  this.elem = $(element);
  this.popupElem = $('<div class="romo-modal-popup"><div class="romo-modal-body"></div></div>');
  this.popupElem.appendTo(this.elem.closest(this.elem.data('romo-modal-append-to-closest') || 'body'));
  this.bodyElem = this.popupElem.find('> .romo-modal-body');
  this.contentElem = $();
  this.closeElem = $();
  this.dragElem = $();
  this.romoInvoke = this.elem.romoInvoke()[0];

  if (this.elem.data('romo-modal-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-modal-style-class'));
  }

  this.elem.unbind('click');
  this.elem.on('click', $.proxy(this.onToggleClick, this));
  this.elem.on('modal:triggerToggle', $.proxy(this.onToggleClick, this));
  this.elem.on('modal:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('modal:triggerPopupClose', $.proxy(this.onPopupClose, this));
  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadBodyStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadBodySuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadBodyError(xhr);
  }, this));

  this.doBindElemKeyUp();

  this.doInit();
  this.doInitBody();

  this.elem.trigger('modal:ready', [this]);
}

RomoModal.prototype.doInit = function() {
  // override as needed
}

RomoModal.prototype.doInitBody = function() {
  this.doResetBody();

  this.contentElem = this.bodyElem.find('.romo-modal-content').last();
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }
  this.closeElem = this.popupElem.find('[data-romo-modal-close="true"]');
  this.dragElem = this.popupElem.find('[data-romo-modal-drag="true"]');

  var css = {
    'min-width':  this.elem.data('romo-modal-min-width'),
    'max-width':  this.elem.data('romo-modal-max-width'),
    'width':      this.elem.data('romo-modal-width'),
    'min-height': this.elem.data('romo-modal-min-height'),
    'height':     this.elem.data('romo-modal-height'),
    'overflow-x': 'auto',
    'overflow-y': 'auto'
  }

  if (this.elem.data('romo-modal-max-height') === undefined) {
    this.elem.attr('data-romo-modal-max-height', 'detect');
  }
  if (this.elem.data('romo-modal-max-height') !== 'detect') {
    css['max-height'] = this.elem.data('romo-modal-max-height');
  }

  this.contentElem.css(css);

  this.closeElem.unbind('click');
  this.closeElem.on('click', $.proxy(this.onPopupClose, this));

  this.dragElem.addClass('romo-modal-grab');
  this.dragElem.on('mousedown', $.proxy(this.onMouseDown, this));
}

RomoModal.prototype.doResetBody = function() {
  this.contentElem.css({
    'min-width':  '',
    'max-width':  '',
    'width':      '',
    'min-height': '',
    'max-height': '',
    'height':     '',
    'overflow':   ''
  });

  this.closeElem.off('click', $.proxy(this.onPopupClose, this));
}

RomoModal.prototype.doLoadBodyStart = function() {
  this.bodyElem.html('');
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('modal:loadBodyStart', [this]);
}

RomoModal.prototype.doLoadBodySuccess = function(data) {
  Romo.initHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('modal:loadBodySuccess', [data, this]);
}

RomoModal.prototype.doLoadBodyError = function(xhr) {
  this.elem.trigger('modal:loadBodyError', [xhr, this]);
}

RomoModal.prototype.onToggleClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doToggle();
  }
}

RomoModal.prototype.doToggle = function() {
  if (this.popupElem.hasClass('romo-modal-open')) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  } else {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
  this.elem.trigger('modal:toggle', [this]);
}

RomoModal.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if ((this.elem.hasClass('disabled') === false) &&
      (this.popupElem.hasClass('romo-modal-open') === false)) {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
}

RomoModal.prototype.doPopupOpen = function() {
  this.romoInvoke.doInvoke();
  this.popupElem.addClass('romo-modal-open');
  this.doPlacePopupElem();

  // bind an event to close the popup when clicking away from the
  // popup.  Bind on a timeout to allow time for any toggle
  // click event to propagate.  If no timeout, we'll bind this
  // event, then the toggle click will propagate which will call
  // this event and immediately close the popup.
  setTimeout($.proxy(function() {
    this.doBindWindowBodyClick();
  }, this), 100);

  // bind "esc" keystroke to toggle close
  this.doBindWindowBodyKeyUp();

  // bind window resizes reposition modal
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('modal:popupOpen', [this]);
}

RomoModal.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  }
}

RomoModal.prototype.doPopupClose = function() {
  $('body').trigger('modal:popupclose');
  this.popupElem.removeClass('romo-modal-open');

  // unbind any event to close the popup when clicking away from it
  this.doUnBindWindowBodyClick();

  // unbind "esc" keystroke to toggle close
  this.doUnBindWindowBodyKeyUp();

  // unbind window resizes reposition modal
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  // clear the content elem markup if configured to
  if (this.elem.data('romo-modal-clear-content') === true) {
    this.contentElem.html('');
  }

  this.elem.trigger('modal:popupClose', [this]);
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
  $(window).on('mousemove', $.proxy(this.onMouseMove, this));
  $(window).on('mouseup',   $.proxy(this.onMouseUp, this));

  this.elem.trigger("modal:dragStart", [this]);
}

RomoModal.prototype.onMouseMove = function(e) {
  $('body').trigger('modal:mousemove');
  e.preventDefault();
  e.stopPropagation();
  this.doDragMove(e.clientX, e.clientY);
  return false;
}

RomoModal.prototype.doDragMove = function(clientX, clientY) {
  var placeX = clientX - this._dragDiffX;
  var placeY = clientY - this._dragDiffY;
  this.popupElem.css({ left: placeX+'px' , top: placeY+'px' });

  this.elem.trigger("modal:dragMove", [placeX, placeY, this]);
}

RomoModal.prototype.onMouseUp = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.doDragStop(e);
  return false;
}

RomoModal.prototype.doDragStop = function(e) {
  this.dragElem.addClass('romo-modal-grab');
  this.dragElem.removeClass('romo-modal-grabbing');
  this.popupElem.css('width', '');
  this.popupElem.css('height', '');

  $(window).off('mousemove', $.proxy(this.onMouseMove, this));
  $(window).off('mouseup',   $.proxy(this.onMouseUp, this));
  delete this._dragDiffX;
  delete this._dragDiffY;

  this.elem.trigger("modal:dragStop", [this]);
}

RomoModal.prototype.doBindElemKeyUp = function() {
  this.elem.on('keyup', $.proxy(this.onElemKeyUp, this));
  this.popupElem.on('keyup', $.proxy(this.onElemKeyUp, this));
}

RomoModal.prototype.doUnBindElemKeyUp = function() {
  this.elem.off('keyup', $.proxy(this.onElemKeyUp, this));
  this.popupElem.off('keyup', $.proxy(this.onElemKeyUp, this));
}

RomoModal.prototype.onElemKeyUp = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.popupElem.hasClass('romo-modal-open')) {
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
  $('body').on('click', $.proxy(this.onWindowBodyClick, this));
}

RomoModal.prototype.doUnBindWindowBodyClick = function() {
  $('body').off('click', $.proxy(this.onWindowBodyClick, this));
}

RomoModal.prototype.onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && $(e.target).parents('.romo-modal-popup').size() === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoModal.prototype.doBindWindowBodyKeyUp = function() {
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));
}

RomoModal.prototype.doUnBindWindowBodyKeyUp = function() {
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));
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
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var min = 75;
  var centerTop  = $(window).height() / 2 - h / 2;
  var centerLeft = $(window).width()  / 2 - w / 2;
  var css = {};

  css.top = $(window).height() * 0.15;
  if (centerTop < css.top) { css.top = centerTop; }
  if (css.top < min) { css.top = min; }

  css.left = centerLeft;
  if (css.left < min) { css.left = min; }

  this.popupElem.css(css);

  if (this.elem.data('romo-modal-max-height') === 'detect') {
    var pad = this.elem.data('romo-modal-max-height-detect-pad') || 10;
    var contentTop = this.contentElem[0].getBoundingClientRect().top;
    var contentBottom = this.contentElem[0].getBoundingClientRect().bottom;
    var bodyBottom = this.bodyElem[0].getBoundingClientRect().bottom;
    var padBottom = bodyBottom - contentBottom;

    var maxHeight = $(window).height() - contentTop - padBottom - pad;
    this.contentElem.css({'max-height': maxHeight.toString() + 'px'});
  }
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-modal-auto="true"]').romoModal();
});
