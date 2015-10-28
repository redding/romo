$.fn.romoInvoke = function() {
  return $.map(this, function(element) {
    return new RomoInvoke(element);
  });
}

var RomoInvoke = function(element) {
  this.elem = $(element);
  this.targetElem = $(this.elem.data('romo-invoke-target'));
  this.invokeOn = this.elem.data('romo-invoke-on') || 'click';
  this.invokeAttr = this.elem.data('romo-invoke-attr') || 'href';
  this.invokeMethod = this.elem.data('romo-invoke-method') || 'GET';
  this.loadOnlyOnce = this.elem.data('romo-invoke-load-once') === true;

  this.elem.unbind(this.invokeOn);

  this.doInit();
  this.doBindInvoke();
  this._trigger('invoke:ready', [this]);
}

RomoInvoke.prototype.doInit = function() {
  // override as needed
}

RomoInvoke.prototype.doBindInvoke = function() {
  this.doUnBindInvoke();
  this.elem.on(this.invokeOn, $.proxy(this.onInvoke, this));
  this.elem.on('invoke:triggerInvoke', $.proxy(this.onInvoke, this));
}

RomoInvoke.prototype.doUnBindInvoke = function() {
  this.elem.off(this.invokeOn, $.proxy(this.onInvoke, this));
  this.elem.off('invoke:triggerInvoke', $.proxy(this.onInvoke, this));
}

RomoInvoke.prototype.onInvoke = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doInvoke();
  }
}

RomoInvoke.prototype.doInvoke = function() {
  var loadHref = this.elem.attr(this.invokeAttr);
  if (this.loadOnlyOnce === true) {
    this.elem.removeAttr(this.invokeAttr);
  }
  if (loadHref !== undefined) {
    this.doLoad(loadHref);
  } else {
    this._trigger('invoke:invoke', [this]);
  }
}

RomoInvoke.prototype.doLoad = function(href) {
  this._trigger('invoke:loadStart', [this]);

  $.ajax({
    type:    this.invokeMethod,
    url:     href,
    success: $.proxy(this.onLoadAjaxSuccess, this),
    error:   $.proxy(this.onLoadAjaxError,   this)
  });
}

RomoInvoke.prototype.onLoadAjaxSuccess = function(data, status, xhr) {
  this._trigger('invoke:invoke', [this]);
  this._trigger('invoke:loadSuccess', [data, this]);
}

RomoInvoke.prototype.onLoadAjaxError = function(xhr, errorType, error) {
  this._trigger('invoke:invoke', [this]);
  this._trigger('invoke:loadError', [xhr, this]);
}

RomoInvoke.prototype._trigger = function(event_name, event_data) {
  this.elem.trigger(event_name, event_data);
  if (this.targetElem !== undefined) {
    this.targetElem.trigger(event_name, event_data);
  }
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-invoke-auto="true"]').romoInvoke();
});
