var RomoInline = function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  this.doBindDismiss();
  Romo.trigger(this.elem, 'romoInline:ready', [this]);
}

RomoInline.prototype.doInit = function() {
  // override as needed
}

RomoInline.prototype.doShow = function() {
  Romo.show(this.elem);
  Romo.hide(this.toggleElem);
  Romo.trigger(this.elem, 'romoInline:show', [this]);
}

RomoInline.prototype.doDismiss = function() {
  Romo.show(this.toggleElem);
  Romo.hide(this.elem);
  Romo.trigger(this.elem, 'romoInline:dismiss', [this]);
}

// private

RomoDropdown.prototype._bindElem = function() {
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
  this.dismissElem = Romo.find(this.elem, '[data-romo-inline-dismiss]')[0];
  Romo.on(this.dismissElem, 'click', Romo.proxy(this._onDismissClick, this));
}

RomoInline.prototype._loadStart = function() {
  Romo.updateHtml(this.elem, '');
  Romo.trigger(this.elem, 'romoInline:loadStart', [this]);
}

RomoInline.prototype._loadSuccess = function(data) {
  this.doShow();
  Romo.initUpdateHtml(this.elem, data);
  this.doBindDismiss();
  Romo.trigger(this.elem, 'romoInline:loadSuccess', [data, this]);
}

RomoInline.prototype._loadError = function(xhr) {
  this.doShow();
  Romo.trigger(this.elem, 'romoInline:loadError', [xhr, this]);
}

RomoInline.prototype._onDismissClick = function(e) {
  e.preventDefault();

  if (Romo.data(this.dismissElem, 'romo-inline-dismiss') === 'confirm') {
    Romo.trigger(this.elem, 'romoInline:confirmDismiss', [this]);
  } else if (Romo.hasClass(this.dismissElem, 'disabled') === false) {
    this.doDismiss();
  }
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-inline-auto="true"]').forEach(function(elem) { new RomoInline(elem); });
});

