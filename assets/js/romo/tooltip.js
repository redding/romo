var RomoTooltip = function(element) {
  this.elem = $(element);
  this.doInitPopup();

  this.hoverState = 'out';
  this.delayEnter = 0;
  this.delayLeave = 0;
  if (this.elem.data('romo-tooltip-delay') !== undefined && this.elem.data('romo-tooltip-delay') !== '') {
    this.delayEnter = this.elem.data('romo-tooltip-delay');
    this.delayLeave = this.elem.data('romo-tooltip-delay');
  }
  if (this.elem.data('romo-tooltip-delay-enter') !== undefined && this.elem.data('romo-tooltip-delay-enter') !== '') {
    this.delayEnter = this.elem.data('romo-tooltip-delay-enter');
  }
  if (this.elem.data('romo-tooltip-delay-leave') !== undefined && this.elem.data('romo-tooltip-delay-leave') !== '') {
    this.delayLeave = this.elem.data('romo-tooltip-delay-leave');
  }

  if (this.elem.data('romo-tooltip-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-tooltip-style-class'));
  }

  this.elem.on('mouseenter', $.proxy(this.onToggleEnter, this));
  this.elem.on('mouseleave', $.proxy(this.onToggleLeave, this));
  this.elem.on('tooltip:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('tooltip:triggerPopupClose', $.proxy(this.onPopupClose, this));
  this.elem.on('tooltip:triggerSetContent', $.proxy(this.onSetContent, this));
  $(window).on('resize', $.proxy(this.onResizeWindow, this))

  this.doInit();
  this.doInitBody();
  if (this.elem.data('romo-tooltip-content') === undefined) {
    this.doBindAjax();
  }

  this.elem.trigger('tooltip:ready', [this]);
}

RomoTooltip.prototype.doInit = function() {
  // override as needed
}

RomoTooltip.prototype.doInitPopup = function() {
  this.popupElem = $('<div class="romo-tooltip-popup"><div class="romo-tooltip-arrow"></div><div class="romo-tooltip-body"></div></div>');
  this.popupElem.appendTo(this.elem.closest(this.elem.data('romo-tooltip-append-to-closest') || 'body'));

  this.bodyElem = this.popupElem.find('> .romo-tooltip-body');

  this.popupPosition = this.elem.data('romo-tooltip-position') || 'top';
  this.popupElem.attr('data-romo-tooltip-position', this.popupPosition);

  this.popupAlignment = this.elem.data('romo-tooltip-alignment') || 'center';
  this.popupElem.attr('data-romo-tooltip-alignment', this.popupAlignment);

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
  // delay adding it b/c other components may `append` generated tooltips
  // meaning the tooltip is removed and then re-added.  if added immediately
  // the "remove" part will incorrectly remove the popup.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [this.popupElem]);
  }, this), 1);
}

RomoTooltip.prototype.doInitBody = function() {
  this.doResetBody();

  this.bodyElem.css({
    'min-width':  this.elem.data('romo-tooltip-min-width'),
    'max-width':  this.elem.data('romo-tooltip-max-width'),
    'width':      this.elem.data('romo-tooltip-width'),
    'min-height': this.elem.data('romo-tooltip-min-height'),
    'height':     this.elem.data('romo-tooltip-height')
  });

  if (this.elem.data('romo-tooltip-max-height') === undefined) {
    this.elem.attr('data-romo-tooltip-max-height', 'detect');
  }
  if (this.elem.data('romo-tooltip-max-height') !== 'detect') {
    this.bodyElem.css({
      'max-height': this.elem.data('romo-tooltip-max-height')
    });
  }
}

RomoTooltip.prototype.doResetBody = function() {
  this.bodyElem.css({
    'min-width':  '',
    'max-width':  '',
    'width':      '',
    'min-height': '',
    'max-height': '',
    'height':     '',
  });
}

RomoTooltip.prototype.doBindAjax = function() {
  this.romoAjax = new RomoAjax(this.elem);
  this.romoAjax.doUnbindElem(); // disable auto invoke on click

  this.elem.on('romoAjax:callStart', $.proxy(function(e, romoAjax) {
    this.doLoadBodyStart();
    return false;
  }, this));
  this.elem.on('romoAjax:callSuccess', $.proxy(function(e, data, romoAjax) {
    this.doLoadBodySuccess(data);
    return false;
  }, this));
  this.elem.on('romoAjax:callError', $.proxy(function(e, xhr, romoAjax) {
    this.doLoadBodyError(xhr);
    return false;
  }, this));
}

RomoTooltip.prototype.doLoadBodyStart = function() {
  this._setBodyHtml('');
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('tooltip:loadBodyStart', [this]);
}

RomoTooltip.prototype.doLoadBodySuccess = function(data) {
  Romo.initHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('tooltip:loadBodySuccess', [data, this]);
}

RomoTooltip.prototype.doLoadBodyError = function(xhr) {
  this.elem.trigger('tooltip:loadBodyError', [xhr, this]);
}

RomoTooltip.prototype.onToggleEnter = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.hoverState = 'in';
  if (this.elem.hasClass('disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(function() {
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
  if (this.elem.hasClass('disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState === 'out') {
        this.doPopupClose();
      }
    }, this), this.delayLeave);
  }
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  if (this.elem.hasClass('disabled') === false && this.hoverState === 'in') {
    this.doPlacePopupElem();
  }
}

RomoTooltip.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doPopupOpen();
  }
}

RomoTooltip.prototype.doPopupOpen = function() {
  if (this.romoAjax !== undefined) {
    this.romoAjax.doInvoke();
  } else {
    this._setBodyHtml(this.elem.data('romo-tooltip-content'));
  }
  this.popupElem.addClass('romo-tooltip-open');
  this.doPlacePopupElem();

  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    $('body').on('romoModal:mousemove',  $.proxy(this.onModalPopupChange, this));
    $('body').on('romoModal:popupclose', $.proxy(this.onModalPopupChange, this));
  }
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('tooltip:popupOpen', [this]);
}

RomoTooltip.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doPopupClose();
  }
}

RomoTooltip.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-tooltip-open');

  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    $('body').off('romoModal:mousemove',  $.proxy(this.onModalPopupChange, this));
    $('body').off('romoModal:popupclose', $.proxy(this.onModalPopupChange, this));
  }
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('tooltip:popupClose', [this]);
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
  this.elem.data('romo-tooltip-content', value);
  this._setBodyHtml(this.elem.data('romo-tooltip-content'));
  this.doPlacePopupElem();
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoTooltip.prototype.doPlacePopupElem = function() {
  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    this.popupElem.css({'position': 'fixed'});
  }

  var pos = $.extend({}, this.elem[0].getBoundingClientRect(), this.elem.offset());
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var pad = 6 + 1; // arrow size + spacing
  var offset = {};

  var configHeight = this.elem.data('romo-tooltip-height') || this.elem.data('romo-tooltip-max-height');
  var configPosition = this.popupPosition;

  if (configHeight === 'detect' && (configPosition === 'top' || configPosition === 'bottom')) {
    var popupHeight = this.popupElem.height();
    var topAvailHeight = this._getPopupMaxAvailableHeight('top');
    var bottomAvailHeight = this._getPopupMaxAvailableHeight('bottom');

    if (popupHeight < topAvailHeight && popupHeight < bottomAvailHeight) {
      // if it fits both ways, use the config position way
      configHeight = this._getPopupMaxAvailableHeight(configPosition);
      this.popupElem.attr('data-romo-tooltip-arrow-position', configPosition);
    } else if (topAvailHeight > bottomAvailHeight) {
      configPosition = 'top';
      configHeight = topAvailHeight;
      this.popupElem.attr('data-romo-tooltip-arrow-position', 'top');
    } else {
      configPosition = 'bottom';
      configHeight = bottomAvailHeight;
      this.popupElem.attr('data-romo-tooltip-arrow-position', 'bottom');
    }

    this.bodyElem.css({'max-height': configHeight.toString() + 'px'});
  } else {
    this.popupElem.attr('data-romo-tooltip-arrow-position', configPosition);
  }


  if(h > configHeight) {
    h = configHeight;
  }

  switch (configPosition) {
    case 'top':
      $.extend(offset, { top: pos.top - h - pad, left: pos.left + pos.width / 2 - w / 2 });
      break;
    case 'bottom':
      $.extend(offset, { top: pos.top + pos.height + pad, left: pos.left + pos.width / 2 - w / 2 });
      break;
    case 'left':
      $.extend(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left - w - pad });
      break;
    case 'right':
      $.extend(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left + pos.width + pad });
      break;
  }

  this.popupElem.offset(offset);
}

RomoTooltip.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  this.popupElem.css({'z-index': relativeZIndex + 1100}); // see z-index.css
}

// private

RomoTooltip.prototype._getPopupMaxAvailableHeight = function(position) {
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

RomoTooltip.prototype._getPopupMaxHeightDetectPad = function(position) {
  return this.elem.data('romo-tooltip-max-height-detect-pad-'+position) || this.elem.data('romo-tooltip-max-height-detect-pad') || 10;
}

RomoTooltip.prototype._setBodyHtml = function(content) {
  this.bodyElem.html(content || '');
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-tooltip-auto="true"]').forEach(function(elem) { new RomoTooltip(elem); });
});
