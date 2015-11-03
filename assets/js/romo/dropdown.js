$.fn.romoDropdown = function() {
  return $.map(this, function(element) {
    return new RomoDropdown(element);
  });
}

var RomoDropdown = function(element) {
  this.elem = $(element);
  this.doInitPopup();
  this.romoInvoke = this.elem.romoInvoke()[0];

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

  this.doBindElemKeyUp();

  this.doInit();
  this.doInitBody();

  this.elem.trigger('dropdown:ready', [this]);
}

RomoDropdown.prototype.doInit = function() {
  // override as needed
}

RomoDropdown.prototype.doInitPopup = function() {
  this.popupElem = $('<div class="romo-dropdown-popup"><div class="romo-dropdown-body"></div></div>');
  this.popupElem.appendTo(this.elem.closest(this.elem.data('romo-dropdown-append-to-closest') || 'body'));

  this.popupElem.on('modal:popupOpen', $.proxy(function(e) {
    this.doUnBindWindowBodyClick();
    this.doUnBindWindowBodyKeyUp();
    this.doUnBindElemKeyUp();
  }, this));
  this.popupElem.on('modal:popupClose', $.proxy(function(e) {
    this.doBindWindowBodyClick();
    this.doBindWindowBodyKeyUp();
    this.doBindElemKeyUp();
  }, this));

  this.bodyElem = this.popupElem.find('> .romo-dropdown-body');
  if (this.elem.data('romo-dropdown-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-dropdown-style-class'));
  }

  this.contentElem = $();

  var positionData = this._parsePositionData(this.elem.data('romo-dropdown-position'));
  this.popupPosition  = positionData.position  || 'bottom';
  this.popupAlignment = positionData.alignment || 'left';
  this.popupElem.attr('data-romo-dropdown-position',  this.popupPosition);
  this.popupElem.attr('data-romo-dropdown-alignment', this.popupAlignment);
  this.popupElem.attr('data-romo-dropdown-fixed', this.elem.data('romo-dropdown-fixed'));

  this.doSetPopupZIndex(this.elem);

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })

  // the popup should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem is removed.
  // delay adding it b/c other components may `append` generated dropdowns
  // meaning the dropdown is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the popup.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.popupElem]);
  }, this), 1);
}

RomoDropdown.prototype.doInitBody = function() {
  this.doResetBody();

  this.contentElem = this.bodyElem.find('.romo-dropdown-content').last();
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }

  this.closeElem = this.popupElem.find('[data-romo-dropdown-close="true"]');
  this.closeElem.unbind('click');
  this.closeElem.on('click', $.proxy(this.onPopupClose, this));

  this.contentElem.css({
    'min-height': this.elem.data('romo-dropdown-min-height'),
    'height':     this.elem.data('romo-dropdown-height'),
    'overflow-x': this.elem.data('romo-dropdown-overflow-x') || 'auto',
    'overflow-y': this.elem.data('romo-dropdown-overflow-y') || 'auto'
  });

  if (this.elem.data('romo-dropdown-max-height') === undefined) {
    this.elem.attr('data-romo-dropdown-max-height', 'detect');
  }
  if (this.elem.data('romo-dropdown-max-height') !== 'detect') {
    this.contentElem.css({
      'max-height': this.elem.data('romo-dropdown-max-height')
    });
  }

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

  if (this.elem.hasClass('disabled') === false &&
      this.elem.data('romo-dropdown-disable-toggle') !== true) {
    this.doToggle();
    return true;
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

  if (this.elem.hasClass('disabled') === false &&
      this.popupElem.hasClass('romo-dropdown-open') === false) {
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
    this.doBindWindowBodyClick();
  }, this), 100);

  // bind "esc" keystroke to toggle close
  this.doBindWindowBodyKeyUp();

  // bind window resizes reposition dropdown
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('dropdown:popupOpen', [this]);
}

RomoDropdown.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false &&
      this.popupElem.hasClass('romo-dropdown-open') === true) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  }
}

RomoDropdown.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-dropdown-open');

  // unbind any event to close the popup when clicking away from it
  this.doUnBindWindowBodyClick();

  // unbind "esc" keystroke to toggle close
  this.doUnBindWindowBodyKeyUp();

  // unbind window resizes reposition dropdown
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  // clear the content elem markup if configured to
  if (this.elem.data('romo-dropdown-clear-content') === true) {
    this.contentElem.html('');
  }

  this.elem.trigger('dropdown:popupClose', [this]);
}

RomoDropdown.prototype.doBindElemKeyUp = function() {
  this.elem.on('keyup', $.proxy(this.onElemKeyUp, this));
  this.popupElem.on('keyup', $.proxy(this.onElemKeyUp, this));
}

RomoDropdown.prototype.doUnBindElemKeyUp = function() {
  this.elem.off('keyup', $.proxy(this.onElemKeyUp, this));
  this.popupElem.off('keyup', $.proxy(this.onElemKeyUp, this));
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

RomoDropdown.prototype.doBindWindowBodyClick = function() {
  $('body').on('click', $.proxy(this.onWindowBodyClick, this));
  $('body').on('modal:mousemove', $.proxy(this.onWindowBodyClick, this));
}

RomoDropdown.prototype.doUnBindWindowBodyClick = function() {
  $('body').off('click', $.proxy(this.onWindowBodyClick, this));
  $('body').off('modal:mousemove', $.proxy(this.onWindowBodyClick, this));
}

RomoDropdown.prototype.onWindowBodyClick = function(e) {
  // if not clicked on the popup elem or the elem
  var target = $(e.target);
  if (e !== undefined &&
      target.parents('.romo-dropdown-popup').size() === 0 &&
      target.closest(this.elem).size() === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoDropdown.prototype.doBindWindowBodyKeyUp = function() {
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));
}

RomoDropdown.prototype.doUnBindWindowBodyKeyUp = function() {
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));
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
    this.popupElem.offset(this.elem.offset());
  }

  var pos = $.extend({}, this.elem[0].getBoundingClientRect(), this.elem.offset());
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var offset = {};

  var configHeight = this.elem.data('romo-dropdown-height') || this.elem.data('romo-dropdown-max-height');
  var configPosition = this.popupPosition;

  if (configHeight === 'detect') {
    var popupHeight = this.popupElem.height();
    var topAvailHeight = this._getPopupMaxAvailableHeight('top');
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

    this.contentElem.css({'max-height': configHeight.toString() + 'px'});
  }

  if(h > configHeight) {
    h = configHeight;
  }

  switch (configPosition) {
    case 'top':
      var pad = 2;
      $.extend(offset, { top: pos.top - h - pad });
      break;
    case 'bottom':
      var pad = 2;
      $.extend(offset, { top: pos.top + pos.height + pad });
      break;
  }
  switch (this.popupAlignment) {
    case 'left':
      $.extend(offset, { left: pos.left });
      break;
    case 'right':
      $.extend(offset, { left: pos.left + pos.width - w });
      break;
  }

  this.popupElem.offset(offset);
}

RomoDropdown.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  this.popupElem.css({'z-index': relativeZIndex + 1200}); // see z-index.css
}

RomoDropdown.prototype._parsePositionData = function(posString) {
  var posData = (posString || '').split(',');
  return { position: posData[0], alignment: posData[1] };
}

RomoDropdown.prototype._getPopupMaxAvailableHeight = function(position) {
  var maxHeight = undefined;

  switch (position) {
    case 'top':
      var elemTop = this.elem[0].getBoundingClientRect().top;
      maxHeight = elemTop - this._getPopupMaxHeightDetectPad(position);
      break;
    case 'bottom':
      var elemBottom = this.elem[0].getBoundingClientRect().bottom;
      maxHeight = $(window).height() - elemBottom - this._getPopupMaxHeightDetectPad(position);
      break;
  }

  return maxHeight;
}

RomoDropdown.prototype._getPopupMaxHeightDetectPad = function(position) {
  return this.elem.data('romo-dropdown-max-height-detect-pad-'+position) || this.elem.data('romo-dropdown-max-height-detect-pad') || 10;
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-dropdown-auto="true"]').romoDropdown();
});
