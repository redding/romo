$.fn.romoInvoke = function() {
  return $.map(this, function(elem) {
    return new RomoInvoke($(elem))
  })
}

var RomoInvoke = function(element) {
  this.elem = $(element)
  this.targetElem = $(this.elem.data('invoke-target'))

  this.elem.unbind('click')
  this.elem.on('click', $.proxy(this.onClick, this))

  this.doInit()
  this._trigger('invoke:ready', [this])
}

RomoInvoke.prototype.doInit = function() {
  // override as needed
}

RomoInvoke.prototype.onClick = function(e) {
  if (e != undefined) {
    e.preventDefault()
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doInvoke()
  }
}

RomoInvoke.prototype.doInvoke = function() {
  var loadHref = this.elem.attr('href')
  if (loadHref != undefined) {
    this.doLoad(loadHref)
  }

  this._trigger('invoke:invoke', [this])
}

RomoInvoke.prototype.doLoad = function(href) {
  this._trigger('invoke:loadStart', [this])

  $.ajax({
    url:     href,
    success: $.proxy(this.onLoadAjaxSuccess, this),
    error:   $.proxy(this.onLoadAjaxError,   this)
  })
}

RomoInvoke.prototype.onLoadAjaxSuccess = function(data, status, xhr) {
  this._trigger('invoke:loadSuccess', [data, this])
}

RomoInvoke.prototype.onLoadAjaxError = function(xhr, errorType, error) {
  this._trigger('invoke:loadError', [xhr, this])
}

RomoInvoke.prototype._trigger = function(event_name, event_data) {
  this.elem.trigger(event_name, event_data)
  if (this.targetElem != undefined) {
    this.targetElem.trigger(event_name, event_data)
  }
}

Romo.onInitUI(function(e) {
  $(e.target).find('.romo-invoke[data-invoke-auto="true"]').romoInvoke()
})
