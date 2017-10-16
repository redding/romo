var RomoInline = function(element) {
  this.elem        = element;
  this.toggleElem  = Romo.f(Romo.data(this.elem, 'romo-inline-toggle'))[0];
  this.dismissElem = undefined;

  Romo.on(this.elem, 'romoInline:triggerDismiss', Romo.proxy(this.onDismissClick, this));
  Romo.on(this.elem, 'romoInline:triggerShow',  Romo.proxy(function(e) {
    this.doShow();
  }, this));

  Romo.on(this.elem, 'romoAjax:callStart', Romo.proxy(function(e, romoAjax) {
    this.doLoadStart();
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callSuccess', Romo.proxy(function(e, data, romoAjax) {
    this.doLoadSuccess(data);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callError', Romo.proxy(function(e, xhr, romoAjax) {
    this.doLoadError(xhr);
    return false;
  }, this));

  this.doBindDismiss();
  this.doInit();
  Romo.trigger(this.elem, 'romoInline:ready', [this]);
}

RomoInline.prototype.doInit = function() {
  // override as needed
}

RomoInline.prototype.doLoadStart = function() {
  Romo.updateHtml(this.elem, '');
  Romo.trigger(this.elem, 'romoInline:loadStart', [this]);
}

RomoInline.prototype.doLoadSuccess = function(data) {
  this.doShow();
  Romo.initHtml(this.elem, data);
  this.doBindDismiss();
  Romo.trigger(this.elem, 'romoInline:loadSuccess', [data, this]);
}

RomoInline.prototype.doLoadError = function(xhr) {
  this.doShow();
  Romo.trigger(this.elem, 'romoInline:loadError', [xhr, this]);
}

RomoInline.prototype.doBindDismiss = function() {
  this.dismissElem = Romo.find(this.elem, '[data-romo-inline-dismiss]')[0];
  Romo.on(this.dismissElem, 'click', Romo.proxy(this.onDismissClick, this));
}

RomoInline.prototype.onDismissClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (Romo.data(this.dismissElem, 'romo-inline-dismiss') === 'confirm') {
    Romo.trigger(this.elem, 'romoInline:confirmDismiss', [this]);
  } else if (Romo.hasClass(this.dismissElem, 'disabled') === false) {
    this.doDismiss();
  }
}

RomoInline.prototype.doDismiss = function() {
  Romo.show(this.toggleElem);
  Romo.hide(this.elem);
  Romo.trigger(this.elem, 'romoInline:dismiss', [this]);
}

RomoInline.prototype.doShow = function() {
  Romo.show(this.elem);
  Romo.hide(this.toggleElem);
  Romo.trigger(this.elem, 'romoInline:show', [this]);
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-inline-auto="true"]').forEach(function(elem) { new RomoInline(elem); });
});

