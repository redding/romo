$.fn.romoOnkey = function() {
  return $.map(this, function(element) {
    return new RomoOnkey(element);
  });
}

var RomoOnkey = function(element) {
  this.elem = $(element);
  this.defaultTriggerOn = 'keydown';

  this.doInit();

  this.triggerOn = this.elem.data('romo-onkey-on') || this.defaultTriggerOn;
  this.elem.on(this.triggerOn, $.proxy(this.onTrigger, this));

  this.elem.trigger('onkey:ready', [this]);
}

RomoOnkey.prototype.doInit = function() {
  // override as needed
}

RomoOnkey.prototype.onTrigger = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this.doTrigger(e);
  }
}

RomoOnkey.prototype.doTrigger = function(triggerEvent) {
  this.elem.trigger('onkey:trigger', [triggerEvent, this]);
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-onkey-auto="true"]').romoOnkey();
});
