$.fn.romoInline = function() {
  return $.map(this, function(element) {
    return new RomoInline(element);
  });
}

var RomoInline = function(element) {
  this.elem        = $(element);
  this.toggleElem  = $(this.elem.data('romo-inline-toggle'));
  this.dismissElem = undefined;

  this.elem.on('inline:triggerDismiss', $.proxy(this.onDismissClick, this));
  this.elem.on('inline:triggerShow',  $.proxy(function(e) {
    this.doShow();
  }, this));

  this.elem.on('romoAjax:callStart', $.proxy(function(e, romoAjax) {
    this.doLoadStart();
    return false;
  }, this));
  this.elem.on('romoAjax:callSuccess', $.proxy(function(e, data, romoAjax) {
    this.doLoadSuccess(data);
    return false;
  }, this));
  this.elem.on('romoAjax:callError', $.proxy(function(e, xhr, romoAjax) {
    this.doLoadError(xhr);
    return false;
  }, this));

  this.doBindDismiss();
  this.doInit();
  this.elem.trigger('inline:ready', [this]);
}

RomoInline.prototype.doInit = function() {
  // override as needed
}

RomoInline.prototype.doLoadStart = function() {
  this.elem.html('');
  this.elem.trigger('inline:loadStart', [this]);
}

RomoInline.prototype.doLoadSuccess = function(data) {
  this.doShow();
  Romo.initHtml(this.elem, data);
  this.doBindDismiss();
  this.elem.trigger('inline:loadSuccess', [data, this]);
}

RomoInline.prototype.doLoadError = function(xhr) {
  this.doShow();
  this.elem.trigger('inline:loadError', [xhr, this]);
}

RomoInline.prototype.doBindDismiss = function() {
  this.dismissElem = this.elem.find('[data-romo-inline-dismiss]');
  this.dismissElem.unbind('click');
  this.dismissElem.on('click', $.proxy(this.onDismissClick, this));
}

RomoInline.prototype.onDismissClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.dismissElem.data('romo-inline-dismiss') === 'confirm') {
    this.elem.trigger('inline:confirmDismiss', [this]);
  } else if (this.dismissElem.hasClass('disabled') === false) {
    this.doDismiss();
  }
}

RomoInline.prototype.doDismiss = function() {
  this.toggleElem.show();
  this.elem.hide();
  this.elem.trigger('inline:dismiss', [this]);
}

RomoInline.prototype.doShow = function() {
  this.elem.show();
  this.toggleElem.hide();
  this.elem.trigger('inline:show', [this]);
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-inline-auto="true"]').romoInline();
});

