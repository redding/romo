var RomoOnkey = function(element) {
  this.elem = element;
  this.defaultTriggerOn = 'keydown';

  this.doInit();

  this.triggerOn = Romo.data(this.elem, 'romo-onkey-on') || this.defaultTriggerOn;
  Romo.on(this.elem, this.triggerOn, Romo.proxy(this.onTrigger, this));

  this.elem.trigger('romoOnkey:ready', [this]);
}

RomoOnkey.prototype.doInit = function() {
  // override as needed
}

RomoOnkey.prototype.onTrigger = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doTrigger(e);
  }
}

RomoOnkey.prototype.doTrigger = function(triggerEvent) {
  Romo.trigger(this.elem, 'romoOnkey:trigger', [triggerEvent, this]);
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-onkey-auto="true"]').forEach(function(elem) { new RomoOnkey(elem); });
});
