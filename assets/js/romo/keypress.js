$.fn.romoKeypress = function() {
  return $.map(this, function(element) {
    return new RomoKeypress(element);
  });
}

var RomoKeypress = function(element) {
  this.elem = $(element);
  this.defaultTriggerOn = 'keydown';

  this.doInit();

  this.triggerOn = this.elem.data('romo-keypress-on') || this.defaultTriggerOn;
  this.elem.on(this.triggerOn, $.proxy(this.onTrigger, this));

  this.elem.trigger('keypress:ready', [this]);
}

RomoKeypress.prototype.doInit = function() {
  // override as needed
}

RomoKeypress.prototype.onTrigger = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this.doTrigger(e);
  }
}

RomoKeypress.prototype.doTrigger = function(triggerEvent) {
  this.elem.trigger('keypress:trigger', [triggerEvent, this]);
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-keypress-auto="true"]').romoKeypress();
});
