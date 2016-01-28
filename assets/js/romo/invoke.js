$.fn.romoInvoke = function() {
  return $.map(this, function(element) {
    return new RomoInvoke(element);
  });
}

var RomoInvoke = function(element) {
  this.elem = $(element);
  this.targetElem    = $(this.elem.data('romo-invoke-target'));
  this.invokeOn      = this.elem.data('romo-invoke-on') || 'click';
  this.invokeAttr    = this.elem.data('romo-invoke-attr') || 'href';
  this.invokeMethod  = this.elem.data('romo-invoke-method') || 'GET';
  this.loadOnlyOnce  = this.elem.data('romo-invoke-load-once') === true;
  this.invokeQueued  = false;
  this.invokeRunning = false;

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
  this.invokeQueued = true;
  if (this.invokeRunning === false) {
    this._doInvoke();
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
  this._trigger('invoke:loadSuccess', [data, this]);
  this._doCompleteInvoke();
}

RomoInvoke.prototype.onLoadAjaxError = function(xhr, errorType, error) {
  this._trigger('invoke:loadError', [xhr, this]);
  this._doCompleteInvoke();
}

// private

RomoInvoke.prototype._doCompleteInvoke = function() {
  this._trigger('invoke:invoke', [this]);
  if (this.invokeQueued === true) {
    this._doInvoke();
  } else {
    this.invokeRunning = false;
  }
}

RomoInvoke.prototype._doInvoke = function() {
  this.invokeQueued  = false;
  this.invokeRunning = true;
  var loadHref = this.elem.attr(this.invokeAttr);
  if (this.loadOnlyOnce === true) {
    this.elem.removeAttr(this.invokeAttr);
  }
  if (loadHref !== undefined) {
    this.doLoad(loadHref);
  } else {
    this._doCompleteInvoke();
  }
}

RomoInvoke.prototype._trigger = function(event_name, event_data) {
  if (this.targetElem[0] !== undefined) {
    this.targetElem.trigger(event_name, event_data);
  } else {
    this.elem.trigger(event_name, event_data);
  }
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-invoke-auto="true"]').romoInvoke();
});
