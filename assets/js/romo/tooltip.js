$.fn.romoTooltip = function() {
  return $.map(this, function(elem) {
    return new RomoTooltip($(elem));
  })
}

// Tooltip

var RomoTooltip = function(element) {
  this.elem = $(element);
  this.toggleElem = this.elem.find('> .romo-tooltip-toggle');
  this.popupElem  = this.elem.find('> .romo-tooltip-popup');
  this.bodyElem   = this.popupElem.find('> .romo-tooltip-body');

  this.hoverState = 'out'
  this.delayEnter = 0
  this.delayLeave = 0

  if (this.toggleElem.data('delay') != undefined && this.toggleElem.data('delay') != '') {
    this.delayEnter = this.toggleElem.data('delay');
    this.delayLeave = this.toggleElem.data('delay');
  }
  if (this.toggleElem.data('delay-enter') != undefined && this.toggleElem.data('delay-enter') != '') {
    this.delayEnter = this.toggleElem.data('delay-enter');
  }
  if (this.toggleElem.data('delay-leave') != undefined && this.toggleElem.data('delay-leave') != '') {
    this.delayLeave = this.toggleElem.data('delay-leave');
  }

  this.toggleElem.on('mouseenter', $.proxy(this.onToggleEnter, this));
  this.toggleElem.on('mouseleave', $.proxy(this.onToggleLeave, this));

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e != undefined) {
      e.stopPropagation();
    }
  })

  if (this.bodyElem.data('min-width') != undefined && this.elem.data('min-width') != '') {
    this.bodyElem.css('min-width', this.bodyElem.data('min-width'));
  }
  if (this.bodyElem.data('max-width') != undefined && this.elem.data('max-width') != '') {
    this.bodyElem.css('max-width', this.bodyElem.data('max-width'));
  }
  if (this.bodyElem.data('width') != undefined && this.elem.data('width') != '') {
    this.bodyElem.css('width', this.bodyElem.data('width'));
  }
  if (this.bodyElem.data('min-height') != undefined && this.elem.data('min-height') != '') {
    this.bodyElem.css('min-height', this.bodyElem.data('min-height'));
  }
  if (this.bodyElem.data('max-height') != undefined && this.elem.data('max-height') != '') {
    this.bodyElem.css('max-height', this.bodyElem.data('max-height'));
  }
  if (this.bodyElem.data('height') != undefined && this.elem.data('height') != '') {
    this.bodyElem.css('height', this.bodyElem.data('height'));
  }

  this.doInit();
  this.elem.trigger('tooltip:onReady', [this]);
}

RomoTooltip.prototype.doInit = function() {
  // override as needed
}

RomoTooltip.prototype.onToggleEnter = function(e) {
  if (e != undefined) {
    e.preventDefault();
  }

  this.hoverState = 'in';
  if (this.toggleElem.hasClass('disabled') == false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState == 'in') {
        this.doPopupOpen();
      }
    }, this), this.delayEnter);
  }
}

RomoTooltip.prototype.onToggleLeave = function(e) {
  if (e != undefined) {
    e.preventDefault();
  }

  this.hoverState = 'out';
  if (this.toggleElem.hasClass('disabled') == false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState == 'out') {
        this.doPopupClose();
      }
    }, this), this.delayLeave);
  }
}

RomoTooltip.prototype.doPopupOpen = function() {
  this.popupElem.addClass('romo-tooltip-open');

  this.elem.trigger('tooltip:onPopupOpen', [this]);
}

RomoTooltip.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-tooltip-open');

  this.elem.trigger('tooltip:onPopupClose', [this]);
}

Romo.onInitUI(function(e) {
  $(e.target).find('.romo-tooltip[data-romo-auto="true"]').romoTooltip();
});
