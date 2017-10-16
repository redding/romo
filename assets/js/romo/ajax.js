var RomoAjax = function(element) {
  this.elem       = element;
  this.targetElem = Romo.f(Romo.data(this.elem, 'romo-ajax-target'))[0];

  this.defaultInvokeOn = 'click';
  this.invokeOn        = Romo.data(this.elem, 'romo-ajax-invoke-on');

  if (this.invokeOn === undefined && Romo.data(this.elem, 'romo-ajax-disable-default-invoke-on') !== true) {
    this.invokeOn = this.defaultInvokeOn;
  }

  this.callMethod   = Romo.data(this.elem, 'romo-ajax-call-method') || 'GET';
  this.urlAttr      = Romo.data(this.elem, 'romo-ajax-url-attr')    || 'href';
  this.callOnlyOnce = Romo.data(this.elem, 'romo-ajax-call-once') === true;

  this.invokeQueued  = false;
  this.invokeRunning = false;

  this.queuedInvokeData = undefined;

  this.doInit();
  this.doBindElem();
  this._trigger('romoAjax:ready', [this]);
}

RomoAjax.prototype.doInit = function() {
  // override as needed
}

RomoAjax.prototype.doBindElem = function() {
  this.doUnbindElem();
  if (this.invokeOn !== undefined) {
    Romo.on(this.elem, this.invokeOn, Romo.proxy(this.onInvoke, this));
  }
  Romo.on(this.elem, 'romoAjax:triggerInvoke', Romo.proxy(this.onTriggerInvoke, this));
}

RomoAjax.prototype.doUnbindElem = function() {
  if (this.invokeOn !== undefined) {
    Romo.off(this.elem, this.invokeOn, Romo.proxy(this.onInvoke, this));
  }
  Romo.off(this.elem, 'romoAjax:triggerInvoke', Romo.proxy(this.onTriggerInvoke, this));
}

RomoAjax.prototype.onInvoke = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doInvoke();
  }
}

RomoAjax.prototype.onTriggerInvoke = function(e, data) {
  if (e !== undefined) {
    e.stopPropagation();
  }

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doInvoke(data);
  }
}

RomoAjax.prototype.doInvoke = function(data) {
  this.invokeQueued     = true;
  this.queuedInvokeData = data;
  if (this.invokeRunning === false) {
    this._doInvoke();
  }
}

RomoAjax.prototype.doCall = function(callUrl, data) {
  this._trigger('romoAjax:callStart', [this]);

  Romo.ajax({
    type:    this.callMethod,
    url:     callUrl,
    data:    (data || {}),
    success: Romo.proxy(this.onCallSuccess, this),
    error:   Romo.proxy(this.onCallError,   this)
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

  var data = this.queuedInvokeData;
  this.queuedInvokeData = undefined;

  var callUrl = Romo.attr(this.elem, this.urlAttr);
  if (this.callOnlyOnce === true) {
    Romo.removeAttr(this.elem, this.urlAttr);
  }
  if (callUrl !== undefined) {
    this.doCall(callUrl, data);
  } else {
    this._doCompleteInvoke();
  }
}

RomoAjax.prototype._trigger = function(event_name, event_data) {
  if (this.targetElem[0] !== undefined) {
    Romo.trigger(this.targetElem, event_name, event_data);
  } else {
    Romo.trigger(this.elem, event_name, event_data);
  }
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-ajax-auto="true"]').forEach(function(elem) { new RomoAjax(elem); });
});
