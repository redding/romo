$.fn.romoTooltip = function() {
  return $.map(this, function(elem) {
    return new RomoTooltip($(elem))
  })
}

var RomoTooltip = function(element) {
  this.elem = $(element)
  this.popupElem = $('<div class="romo-tooltip-popup"><div class="romo-tooltip-arrow"></div><div class="romo-tooltip-body"></div></div>')
  this.popupElem.appendTo('body')
  this.arrowElem = this.popupElem.find('> .romo-tooltip-arrow')
  this.bodyElem  = this.popupElem.find('> .romo-tooltip-body')

  this.hoverState = 'out'
  this.delayEnter = 0
  this.delayLeave = 0
  if (this.elem.data('tooltip-delay') != undefined && this.elem.data('tooltip-delay') != '') {
    this.delayEnter = this.elem.data('tooltip-delay')
    this.delayLeave = this.elem.data('tooltip-delay')
  }
  if (this.elem.data('tooltip-delay-enter') != undefined && this.elem.data('tooltip-delay-enter') != '') {
    this.delayEnter = this.elem.data('tooltip-delay-enter')
  }
  if (this.elem.data('tooltip-delay-leave') != undefined && this.elem.data('tooltip-delay-leave') != '') {
    this.delayLeave = this.elem.data('tooltip-delay-leave')
  }

  this.popupPosition = this.elem.data('tooltip-position') || 'top'
  this.popupElem.attr('data-tooltip-position', this.popupPosition)
  this.elem.on('mouseenter', $.proxy(this.onToggleEnter, this))
  this.elem.on('mouseleave', $.proxy(this.onToggleLeave, this))
  $(window).on('resize', $.proxy(this.onResizeWindow, this))
  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e != undefined) {
      e.stopPropagation()
    }
  })

  this.bodyElem.addClass(this.elem.data('tooltip-style-class'))
  this.bodyElem.css('min-width', this.elem.data('tooltip-min-width'))
  this.bodyElem.css('max-width', this.elem.data('tooltip-max-width'))
  this.bodyElem.css('width', this.elem.data('tooltip-width'))
  this.bodyElem.css('min-height', this.elem.data('tooltip-min-height'))
  this.bodyElem.css('max-height', this.elem.data('tooltip-max-height'))
  this.bodyElem.css('height', this.elem.data('tooltip-height'))
  this.bodyElem.html(this.elem.data('tooltip-content') || '')
  // TODO: tooltip-href handling

  this.doInit()
  this.elem.trigger('tooltip:onReady', [this])
}

RomoTooltip.prototype.doInit = function() {
  // override as needed
}

RomoTooltip.prototype.onToggleEnter = function(e) {
  if (e != undefined) {
    e.preventDefault()
  }

  this.hoverState = 'in'
  if (this.elem.hasClass('disabled') === false) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState ==='in') {
        this.doPopupOpen()
      }
    }, this), this.delayEnter)
  }
}

RomoTooltip.prototype.onToggleLeave = function(e) {
  if (e != undefined) {
    e.preventDefault()
  }

  this.hoverState = 'out'
  if (this.elem.hasClass('disabled') === false) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState === 'out') {
        this.doPopupClose()
      }
    }, this), this.delayLeave)
  }
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  if (this.elem.hasClass('disabled') === false && this.hoverState === 'in') {
    this.doPlacePopupElem()
  }
}
RomoTooltip.prototype.doPopupOpen = function() {
  this.popupElem.addClass('romo-tooltip-open')
  this.doPlacePopupElem()

  this.elem.trigger('tooltip:onPopupOpen', [this])
}

RomoTooltip.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-tooltip-open')

  this.elem.trigger('tooltip:onPopupClose', [this])
}

RomoTooltip.prototype.doPlacePopupElem = function() {
  var pos = $.extend({}, this.elem[0].getBoundingClientRect(), this.elem.offset())
  var w = this.popupElem[0].offsetWidth
  var h = this.popupElem[0].offsetHeight

  var pad = 6 + 1 // arrow size + spacing
  var offset = {}

  switch (this.popupPosition) {
    case 'top':
      $.extend(offset, { top: pos.top - h - pad, left: pos.left + pos.width / 2 - w / 2 })
      break
    case 'bottom':
      $.extend(offset, { top: pos.top + pos.height + pad, left: pos.left + pos.width / 2 - w / 2 })
      break
    case 'left':
      $.extend(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left - w - pad })
      break
    case 'right':
      $.extend(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left + pos.width + pad })
      break
  }

  this.popupElem.offset(offset)
}

Romo.onInitUI(function(e) {
  $(e.target).find('.romo-tooltip[data-tooltip-auto="true"]').romoTooltip()
})
