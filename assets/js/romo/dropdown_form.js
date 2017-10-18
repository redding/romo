var RomoDropdownForm = function(elem) {
  this.elem = elem;

  this.romoDropdown = new RomoDropdown(this.elem);
  this.doBindDropdown();

  this.romoForm = undefined;
  Romo.on(this.elem, 'romoDropdownForm:romoForm:triggerSubmit', Romo.proxy(function(e) {
    if (this.romoForm != undefined) {
      Romo.trigger(this.romoForm.elem, 'romoForm:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  Romo.on(this.elem, 'romoDropdown:loadBodySuccess', Romo.proxy(function(e, data, romoDropdown) {
    this.doBindForm();
    Romo.trigger(this.elem, 'romoDropdownForm:formReady', [this.romoForm, this]);
  }, this));

  this.doInit();
  Romo.trigger(this.elem, 'romoDropdownForm:ready', [this]);
}

RomoDropdownForm.prototype.doInit = function() {
  // override as needed
}

RomoDropdownForm.prototype.doBindDropdown = function() {
if (Romo.data(this.elem, 'romo-dropdown-clear-content') === undefined) {
    Romo.setData(this.elem, 'romo-dropdown-clear-content', 'true');
  }

  Romo.on(this.elem, 'romoDropdown:ready', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:ready', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:toggle', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:toggle', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:popupOpen', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:popupOpen', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:popupClose', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:popupClose', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:loadBodyStart', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:loadBodyStart', [romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:loadBodySuccess', Romo.proxy(function(e, data, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:loadBodySuccess', [data, romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:loadBodyError', Romo.proxy(function(e, xhr, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:loadBodyError', [xhr, romoDropdown, this]);
  }, this));
  Romo.on(this.elem, 'romoDropdown:dismiss', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoDropdown:dismiss', [romoDropdown, this]);
  }, this));
}

RomoDropdownForm.prototype.doBindForm = function() {
  var formElem = Romo.find(this.romoDropdown.popupElem, '[data-romo-form-auto="dropdownForm"]')[0];

  Romo.on(formElem, 'romoForm:clearMsgs', Romo.proxy(function(e, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:clearMsgs', [romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:ready', Romo.proxy(function(e, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:ready', [romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:confirmSubmit', Romo.proxy(function(e, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:confirmSubmit', [romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:beforeSubmit', Romo.proxy(function(e, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:beforeSubmit', [romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:submitSuccess', Romo.proxy(function(e, data, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:submitSuccess', [data, romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:submitInvalidMsgs', Romo.proxy(function(e, msgs, xhr, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:submitInvalidMsgs', [msgs, xhr, romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:submitXhrError', Romo.proxy(function(e, xhr, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:submitXhrError', [xhr, romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:submitError', Romo.proxy(function(e, xhr, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:submitError', [xhr, romoForm, this]);
  }, this));
  Romo.on(formElem, 'romoForm:browserSubmit', Romo.proxy(function(e, romoForm) {
    Romo.trigger(this.elem, 'romoDropdownForm:romoForm:browserSubmit', [romoForm, this]);
  }, this));

  var submitElem   = Romo.find(this.romoDropdown.popupElem, '[data-romo-form-submit]')[0];
  var spinnerElems = Romo.find(this.romoDropdown.popupElem, '[data-romo-spinner-auto="true"]');
  this.romoForm = new RomoForm(formElem, submitElem, spinnerElems);
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-dropdownForm-auto="true"]').forEach(function(elem) { new RomoDropdownForm(elem); });
});

