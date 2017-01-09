$.fn.romoAjax = function() {
  return $.map(this, function(element) {
    return new RomoAjax(element);
  });
}

var RomoAjax = function(element) {
  this.elem       = $(element);
  this.targetElem = $(this.elem.data('romo-ajax-target'));

  this.invokeOn     = this.elem.data('romo-ajax-invoke-on')   || 'click';
  this.callMethod   = this.elem.data('romo-ajax-call-method') || 'GET';
  this.urlAttr      = this.elem.data('romo-ajax-url-attr')    || 'href';
  this.callOnlyOnce = this.elem.data('romo-ajax-call-once') === true;

  this.invokeQueued  = false;
  this.invokeRunning = false;

  this.elem.unbind(this.invokeOn);

  this.doInit();
  this.doBindElem();
  this._trigger('romoAjax:ready', [this]);
}

RomoAjax.prototype.doInit = function() {
  // override as needed
}

RomoAjax.prototype.doBindElem = function() {
  this.doUnbindElem();
  this.elem.on(this.invokeOn, $.proxy(this.onInvoke, this));
  this.elem.on('romoAjax:triggerInvoke', $.proxy(this.onInvoke, this));
}

RomoAjax.prototype.doUnbindElem = function() {
  this.elem.off(this.invokeOn, $.proxy(this.onInvoke, this));
  this.elem.off('romoAjax:triggerInvoke', $.proxy(this.onInvoke, this));
}

RomoAjax.prototype.onInvoke = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doInvoke();
  }
}

RomoAjax.prototype.doInvoke = function() {
  this.invokeQueued = true;
  if (this.invokeRunning === false) {
    this._doInvoke();
  }
}

RomoAjax.prototype.doCall = function(callUrl) {
  this._trigger('romoAjax:callStart', [this]);

  $.ajax({
    type:    this.callMethod,
    url:     callUrl,
    success: $.proxy(this.onCallSuccess, this),
    error:   $.proxy(this.onCallError,   this)
  });
}

RomoAjax.prototype.onCallSuccess = function(data, status, xhr) {
  this._trigger('romoAjax:callSuccess', [data, this]);
  this._doCompleteInvoke();
}

RomoAjax.prototype.onCallError = function(xhr, errorType, error) {
  this._trigger('romoAjax:callError', [xhr, this]);
  this._doCompleteInvoke();
}

// private

RomoAjax.prototype._doCompleteInvoke = function() {
  this._trigger('romoAjax:invoke', [this]);
  if (this.invokeQueued === true) {
    this._doInvoke();
  } else {
    this.invokeRunning = false;
  }
}

RomoAjax.prototype._doInvoke = function() {
  this.invokeQueued  = false;
  this.invokeRunning = true;
  var callUrl = this.elem.attr(this.urlAttr);
  if (this.callOnlyOnce === true) {
    this.elem.removeAttr(this.urlAttr);
  }
  if (callUrl !== undefined) {
    this.doCall(callUrl);
  } else {
    this._doCompleteInvoke();
  }
}

RomoAjax.prototype._trigger = function(event_name, event_data) {
  if (this.targetElem[0] !== undefined) {
    this.targetElem.trigger(event_name, event_data);
  } else {
    this.elem.trigger(event_name, event_data);
  }
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-ajax-auto="true"]').romoAjax();
});
