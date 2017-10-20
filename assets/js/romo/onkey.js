var RomoOnkey = function(elem) {
  this.elem = elem;

  this.defaultTriggerOn = 'keydown';
  this.defaultDelayMs   = 0;
  this.delayTimeout     = undefined;

  this.doInit();

  this.triggerOn = Romo.data(this.elem, 'romo-onkey-on') || this.defaultTriggerOn;
  Romo.on(this.elem, this.triggerOn, Romo.proxy(this._onTrigger, this));

  Romo.trigger(this.elem, 'romoOnkey:ready', [this]);
}

RomoOnkey.prototype.doInit = function() {
  // override as needed
}

// private

RomoOnkey.prototype._onTrigger = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this._doTrigger(e);
  }
}

RomoOnkey.prototype._doTrigger = function(triggerEvent) {
  clearTimeout(this.delayTimeout);
  this.delayTimeout = setTimeout(
    Romo.proxy(function() {
      Romo.trigger(this.elem, 'romoOnkey:trigger', [triggerEvent, this]);
    }, this),
    Romo.data(this.elem, 'romo-onkey-delay-ms') || this.defaultDelayMs
  );
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-onkey-auto="true"]').forEach(function(elem) { new RomoOnkey(elem); });
});
