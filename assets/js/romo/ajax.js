var RomoAjax = function(elem) {
  this.elem       = elem;
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
  this._bindElem();

  this._trigger('romoAjax:ready', [this]);
}

RomoAjax.prototype.doInit = function() {
  // override as needed
}

RomoAjax.prototype.doInvoke = function(data) {
  this.invokeQueued     = true;
  this.queuedInvokeData = data;
  if (this.invokeRunning === false) {
    this._invoke();
  }
}

RomoAjax.prototype.doUnbindElem = function() {
  if (this.invokeOn !== undefined) {
    Romo.off(this.elem, this.invokeOn, Romo.proxy(this._onInvoke, this));
  }
  Romo.off(this.elem, 'romoAjax:triggerInvoke', Romo.proxy(this._onTriggerInvoke, this));
}

// private

RomoAjax.prototype._bindElem = function() {
  this.doUnbindElem();
  if (this.invokeOn !== undefined) {
    Romo.on(this.elem, this.invokeOn, Romo.proxy(this._onInvoke, this));
  }
  Romo.on(this.elem, 'romoAjax:triggerInvoke', Romo.proxy(this._onTriggerInvoke, this));
}

RomoAjax.prototype._onInvoke = function(e) {
  e.preventDefault();

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doInvoke();
  }
}

RomoAjax.prototype._onTriggerInvoke = function(e, data) {
  e.stopPropagation();

  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doInvoke(data);
  }
}

RomoAjax.prototype._invoke = function() {
  this.invokeQueued  = false;
  this.invokeRunning = true;

  var data = this.queuedInvokeData;
  this.queuedInvokeData = undefined;

  var callUrl = Romo.attr(this.elem, this.urlAttr);
  if (this.callOnlyOnce === true) {
    Romo.removeAttr(this.elem, this.urlAttr);
  }
  if (callUrl !== undefined) {
    this._call(callUrl, data);
  } else {
    this._completeInvoke();
  }
}

RomoAjax.prototype._call = function(callUrl, data) {
  this._trigger('romoAjax:callStart', [this]);

  Romo.ajax({
    type:    this.callMethod,
    url:     callUrl,
    data:    (data || {}),
    success: Romo.proxy(this._onCallSuccess, this),
    error:   Romo.proxy(this._onCallError,   this)
  });
}

RomoAjax.prototype._onCallSuccess = function(data, status, xhr) {
  this._trigger('romoAjax:callSuccess', [data, this]);
  this._completeInvoke();
}

RomoAjax.prototype._onCallError = function(xhr, errorType, error) {
  this._trigger('romoAjax:callError', [xhr, this]);
  this._completeInvoke();
}

RomoAjax.prototype._completeInvoke = function() {
  this._trigger('romoAjax:invoke', [this]);
  if (this.invokeQueued === true) {
    this._invoke();
  } else {
    this.invokeRunning = false;
  }
}

RomoAjax.prototype._trigger = function(eventName, eventData) {
  if (this.targetElem !== undefined) {
    Romo.trigger(this.targetElem, eventName, eventData);
  } else {
    Romo.trigger(this.elem, eventName, eventData);
  }
}

Romo.addElemsInitSelector('[data-romo-ajax-auto="true"]', RomoAjax);
