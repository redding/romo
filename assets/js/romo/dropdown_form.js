var RomoDropdownForm = RomoComponent(function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem()

  Romo.trigger(this.elem, 'romoDropdownForm:ready', [this]);
});

// private

RomoDropdownForm.prototype._bindElem = function() {
  Romo.on(this.elem, 'romoDropdownForm:romoForm:triggerSubmit', Romo.proxy(function(e) {
    if (this.romoForm !== undefined) {
      Romo.trigger(this.romoForm.elem, 'romoForm:triggerSubmit', []);
    }
  }, this));
  Romo.on(this.elem, 'romoDropdown:loadBodySuccess', Romo.proxy(function(e, data, romoDropdown) {
    this._bindForm();
    Romo.trigger(this.elem, 'romoDropdownForm:formReady', [this.romoForm, this]);
  }, this));

  this._bindDropdown();
  this._bindForm();
}

RomoDropdownForm.prototype._bindDropdown = function() {
  this.romoDropdown = new RomoDropdown(this.elem);

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

RomoDropdownForm.prototype._bindForm = function() {
  this.romoForm = undefined;
  var formElem = Romo.find(this.romoDropdown.popupElem, '[data-romo-form-auto="dropdownForm"]')[0];

  if (formElem !== undefined) {
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

    var submitElems  = Romo.find(this.romoDropdown.popupElem, '[data-romo-form-submit]');
    var spinnerElems = Romo.find(this.romoDropdown.popupElem, '[data-romo-spinner-auto="true"]');

    this.romoForm = new RomoForm(formElem, submitElems, spinnerElems);
  }
}

// event functions

// init

Romo.addElemsInitSelector('[data-romo-dropdownForm-auto="true"]', RomoDropdownForm);
