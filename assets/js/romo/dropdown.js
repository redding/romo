$.fn.romoDropdown = function() {
  return $.map(this, function(element) {
    return new RomoDropdown(element);
  });
}

var RomoDropdown = function(element) {
  this.elem = $(element);
  this.popupElem = $('<div class="romo-dropdown-popup"><div class="romo-dropdown-body"></div></div>');
  this.popupElem.appendTo('body');
  this.doSetPopupZIndex(this.elem);
  this.bodyElem = this.popupElem.find('> .romo-dropdown-body');
  this.contentElem = $();
  this.romoInvoke = this.elem.romoInvoke()[0];

  var positionData = this._parsePositionData(this.elem.data('romo-dropdown-position'));
  this.popupPosition  = positionData.position  || 'bottom';
  this.popupAlignment = positionData.alignment || 'left';
  this.popupElem.attr('data-romo-dropdown-position',  this.popupPosition);
  this.popupElem.attr('data-romo-dropdown-alignment', this.popupAlignment);
  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })

  if (this.elem.data('romo-dropdown-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-dropdown-style-class'));
  }

  this.elem.unbind('click');
  this.elem.on('click', $.proxy(this.onToggleClick, this));
  this.elem.on('dropdown:triggerToggle', $.proxy(this.onToggleClick, this));
  this.elem.on('dropdown:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('dropdown:triggerPopupClose', $.proxy(this.onPopupClose, this));
  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadBodyStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadBodySuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadBodyError(xhr);
  }, this));
  this.elem.on('keyup', $.proxy(this.onElemKeyUp, this));
  this.popupElem.on('keyup', $.proxy(this.onElemKeyUp, this));

  this.doInit();
  this.doInitBody();

  this.elem.trigger('dropdown:ready', [this]);
}

RomoDropdown.prototype.doInit = function() {
  // override as needed
}

RomoDropdown.prototype.doInitBody = function() {
  this.doResetBody();

  this.contentElem = this.bodyElem.find('.romo-dropdown-content');
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }

  this.contentElem.css({
    'min-height': this.elem.data('romo-dropdown-min-height'),
    'max-height': this.elem.data('romo-dropdown-max-height'),
    'height':     this.elem.data('romo-dropdown-height'),
    'overflow-x': this.elem.data('romo-dropdown-overflow-x') || 'auto',
    'overflow-y': this.elem.data('romo-dropdown-overflow-y') || 'auto'
  });

  if (this.elem.data('romo-dropdown-width') === 'elem') {
    this.popupElem.css({
      'width': this.elem.css('width')
    });
  } else {
    this.contentElem.css({
      'min-width':  this.elem.data('romo-dropdown-min-width'),
      'max-width':  this.elem.data('romo-dropdown-max-width'),
      'width':      this.elem.data('romo-dropdown-width')
    });
  }
}

RomoDropdown.prototype.doResetBody = function() {
  this.contentElem.css({
    'min-width':  '',
    'max-width':  '',
    'width':      '',
    'min-height': '',
    'max-height': '',
    'height':     '',
    'overflow-x': '',
    'overflow-y': ''
  });
}

RomoDropdown.prototype.doLoadBodyStart = function() {
  this.bodyElem.html('');
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('dropdown:loadBodyStart', [this]);
}

RomoDropdown.prototype.doLoadBodySuccess = function(data) {
  Romo.initHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('dropdown:loadBodySuccess', [data, this]);
}

RomoDropdown.prototype.doLoadBodyError = function(xhr) {
  this.elem.trigger('dropdown:loadBodyError', [xhr, this]);
}

RomoDropdown.prototype.onToggleClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    if (!this.popupElem.hasClass('romo-dropdown-open') ||
         this.elem.data('romo-dropdown-disable-toggle') !== true) {
      this.doToggle();
      return true;
    }
  }
  return false;
}

RomoDropdown.prototype.doToggle = function() {
  if (this.popupElem.hasClass('romo-dropdown-open')) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  } else {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
  this.elem.trigger('dropdown:toggle', [this]);
}

RomoDropdown.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if ((this.elem.hasClass('disabled') === false) &&
      (this.popupElem.hasClass('romo-dropdown-open') === false)) {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
}

RomoDropdown.prototype.doPopupOpen = function() {
  this.romoInvoke.doInvoke();
  this.popupElem.addClass('romo-dropdown-open');
  this.doPlacePopupElem();

  // bind an event to close the popup when clicking away from the
  // popup.  Bind on a timeout to allow time for any toggle
  // click event to propagate.  If no timeout, we'll bind this
  // event, then the toggle click will propagate which will call
  // this event and immediately close the popup.
  setTimeout($.proxy(function() {
    $('body').on('click', $.proxy(this.onWindowBodyClick, this));
    $('body').on('modal:mousedown', $.proxy(this.onWindowBodyClick, this));
  }, this), 100);
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('dropdown:popupOpen', [this]);
}

RomoDropdown.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  }
}

RomoDropdown.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-dropdown-open');

  $('body').off('click', $.proxy(this.onWindowBodyClick, this));
  $('body').off('modal:mousedown', $.proxy(this.onWindowBodyClick, this));
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('dropdown:popupClose', [this]);
}

RomoDropdown.prototype.onElemKeyUp = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.popupElem.hasClass('romo-dropdown-open')) {
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

RomoDropdown.prototype.onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && $(e.target).parents('.romo-dropdown-popup').size() === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoDropdown.prototype.onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
  }
  return true;
}

RomoDropdown.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoDropdown.prototype.doPlacePopupElem = function() {
  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    this.popupElem.css({'position': 'fixed'});
  }

  var pos = $.extend({}, this.elem[0].getBoundingClientRect(), this.elem.offset());
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var pad = 2;
  var offset = {};

  switch (this.popupPosition) {
    case 'top':
      $.extend(offset, { top: pos.top - h - pad });
      break;
    case 'bottom':
      $.extend(offset, { top: pos.top + pos.height + pad });
      break;
  }
  switch (this.popupAlignment) {
    case 'left':
      $.extend(offset, { left: pos.left });
      break;
    case 'right':
      $.extend(offset, { left: pos.right - w });
      break;
  }

  this.popupElem.offset(offset);

  if (this.elem.data('romo-dropdown-max-height') === 'detect') {
    var pad = this.elem.data('romo-dropdown-max-height-detect-pad') || 10;
    var contentTop = this.contentElem[0].getBoundingClientRect().top;
    var maxHeight = $(window).height() - contentTop - pad;
    this.contentElem.css({'max-height': maxHeight.toString() + 'px'});
  }
}

RomoDropdown.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  this.popupElem.css({'z-index': relativeZIndex + 1200}); // see z-index.css
}

RomoDropdown.prototype._parsePositionData = function(posString) {
  var posData = (posString || '').split(',');
  return { position: posData[0], alignment: posData[1] };
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-dropdown-auto="true"]').romoDropdown();
});
