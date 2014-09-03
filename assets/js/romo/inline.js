$.fn.romoInline = function() {
  return $.map(this, function(element) {
    return new RomoInline(element);
  });
}

var RomoInline = function(element) {
  this.elem = $(element);
  this.toggleElem = $(this.elem.data('romo-inline-toggle'));

  this.elem.on('invoke:invoke', $.proxy(function(e, invoke) {
    this.doInvoke();
  }, this));
  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadSuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadError(xhr);
  }, this));

  this.doBindDismiss();
  this.doInit();
  this.elem.trigger('inline:ready', [this]);
}

RomoInline.prototype.doInit = function() {
  // override as needed
}

RomoInline.prototype.doInvoke = function() {
  this.elem.show();
  this.toggleElem.hide();
  this.elem.trigger('inline:invoke', [this]);
}

RomoInline.prototype.doLoadStart = function() {
  this.elem.html('');
  this.elem.trigger('inline:loadStart', [this]);
}

RomoInline.prototype.doLoadSuccess = function(data) {
  Romo.initHtml(this.elem, data);
  this.doBindDismiss();
  this.elem.trigger('inline:loadSuccess', [data, this]);
}

RomoInline.prototype.doLoadError = function(xhr) {
  this.elem.trigger('inline:loadError', [xhr, this]);
}

RomoInline.prototype.doBindDismiss = function() {
  var dismissElem = this.elem.find('[data-romo-inline-dismiss="true"]');
  dismissElem.unbind('click');
  dismissElem.on('click', $.proxy(this.onDismissClick, this));
}

RomoInline.prototype.onDismissClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.doDismiss();
}

RomoInline.prototype.doDismiss = function() {
  this.toggleElem.show();
  this.elem.hide();
  this.elem.trigger('inline:dismiss', [this]);
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-inline-auto="true"]').romoInline();
});

