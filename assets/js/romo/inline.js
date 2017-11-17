var RomoInline = RomoComponent(function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoInline:ready', [this]);
});

RomoInline.prototype.doShow = function() {
  Romo.show(this.elem);
  if (this.toggleElem !== undefined) {
    Romo.hide(this.toggleElem);
  }
  Romo.trigger(this.elem, 'romoInline:show', [this]);
}

RomoInline.prototype.doDismiss = function() {
  if (this.toggleElem !== undefined) {
    Romo.show(this.toggleElem);
  }
  Romo.hide(this.elem);
  Romo.trigger(this.elem, 'romoInline:dismiss', [this]);
}

// private

RomoInline.prototype._bindElem = function() {
  this._bindDismiss();

  this.toggleElem = Romo.f(Romo.data(this.elem, 'romo-inline-toggle'))[0];

  Romo.on(this.elem, 'romoInline:triggerDismiss', Romo.proxy(this._onDismissClick, this));
  Romo.on(this.elem, 'romoInline:triggerShow',    Romo.proxy(function(e) {
    this.doShow();
  }, this));

  Romo.on(this.elem, 'romoAjax:callStart', Romo.proxy(function(e, romoAjax) {
    this._loadStart();
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callSuccess', Romo.proxy(function(e, data, romoAjax) {
    this._loadSuccess(data);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callError', Romo.proxy(function(e, xhr, romoAjax) {
    this._loadError(xhr);
    return false;
  }, this));
}

RomoInline.prototype._bindDismiss = function() {
  this.dismissElems = Romo.find(this.elem, '[data-romo-inline-dismiss]');
  Romo.on(this.dismissElems, 'click', Romo.proxy(this._onDismissClick, this));
}

RomoInline.prototype._loadStart = function() {
  Romo.updateHtml(this.elem, '');
  Romo.trigger(this.elem, 'romoInline:loadStart', [this]);
}

RomoInline.prototype._loadSuccess = function(data) {
  this.doShow();
  Romo.initUpdateHtml(this.elem, data);
  this._bindDismiss();
  Romo.trigger(this.elem, 'romoInline:loadSuccess', [data, this]);
}

RomoInline.prototype._loadError = function(xhr) {
  this.doShow();
  Romo.trigger(this.elem, 'romoInline:loadError', [xhr, this]);
}

// event functions

RomoInline.prototype.romoEvFn._onDismissClick = function(e) {
  e.preventDefault();

  var disabled = this.dismissElems.reduce(function(disabled, dismissElem) {
    return disabled || Romo.hasClass(dismissElem, 'disabled');
  }, false);
  if (!disabled) {
    var confirm = this.dismissElems.reduce(function(confirm, dismissElem) {
      return confirm || Romo.data(dismissElem, 'romo-inline-dismiss') === 'confirm';
    }, false);
    if (confirm) {
      Romo.trigger(this.elem, 'romoInline:confirmDismiss', [this]);
    } else {
      this.doDismiss();
    }
  }
}

// init

Romo.addElemsInitSelector('[data-romo-inline-auto="true"]', RomoInline);
