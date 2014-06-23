$.fn.romoModal = function() {
  return $.map(this, function(element) {
    return new RomoModal(element);
  });
}

var RomoModal = function(element) {
  this.elem = $(element);
  this.popupElem = $('<div class="romo-modal-popup"><div class="romo-modal-body"></div></div>');
  this.popupElem.appendTo('body');
  this.bodyElem = this.popupElem.find('> .romo-modal-body');
  this.contentElem = $();
  this.closeElem = $();
  this.romoInvoke = this.elem.romoInvoke()[0];

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })

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

  this.doInit();
  this.doInitBody();

  this.elem.trigger('modal:ready', [this]);
}

RomoModal.prototype.doInit = function() {
  // override as needed
}

RomoModal.prototype.doInitBody = function() {
  this.doResetBody();

  this.contentElem = this.bodyElem.find('.romo-modal-content');
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }
  this.closeElem = this.popupElem.find('[data-romo-modal-close="true"]');

  this.contentElem.css({
    'min-width':  this.elem.data('romo-modal-min-width'),
    'max-width':  this.elem.data('romo-modal-max-width'),
    'width':      this.elem.data('romo-modal-width'),
    'min-height': this.elem.data('romo-modal-min-height'),
    'max-height': this.elem.data('romo-modal-max-height'),
    'height':     this.elem.data('romo-modal-height'),
    'overflow':   'scroll'
  });

  this.closeElem.unbind('click');
  this.closeElem.on('click', $.proxy(this.onPopupClose, this));
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
    this.doPopupClose();
  } else {
    this.doPopupOpen();
  }
  this.elem.trigger('modal:toggle', [this]);
}

RomoModal.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doPopupOpen();
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
    $('body').on('click', $.proxy(this.onWindowBodyClick, this));
  }, this), 100);

  // bind "esc" keystroke to toggle close
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));

  // bind window resizes reposition modal
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('modal:popupOpen', [this]);
}

RomoModal.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doPopupClose();
  }
}

RomoModal.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-modal-open');

  // unbind any event to close the popup when clicking away from it
  $('body').off('click', $.proxy(this.onWindowBodyClick, this));

  // unbind "esc" keystroke to toggle close
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));

  // unbind window resizes reposition modal
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('modal:popupClose', [this]);
}

RomoModal.prototype.onWindowBodyClick = function(e) {
  this.doPopupClose();
}

RomoModal.prototype.onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
  }
}

RomoModal.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
}

RomoModal.prototype.doPlacePopupElem = function() {
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  min = 75;
  var css = {};

  $.extend(css, { top:  $(window).height() / 2 - h / 2 });
  if (css.top < min) { css.top = min; }

  $.extend(css, { left: $(window).width()  / 2 - w / 2 });
  if (css.left <  min) { css.left = min; }
  this.popupElem.css(css);
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-modal-auto="true"]').romoModal();
});
