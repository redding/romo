var RomoModalForm = function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoModalForm:ready', [this]);
}

RomoModalForm.prototype.doInit = function() {
  // override as needed
}

// private

RomoModalForm.prototype._bindElem = function() {
  Romo.on(this.elem, 'romoModalForm:romoForm:triggerSubmit', Romo.proxy(function(e) {
    if (this.romoForm !== undefined) {
      Romo.trigger(this.romoForm.elem, 'romoForm:triggerSubmit', []);
    }
  }, this));
  Romo.on(this.elem, 'romoModal:loadBodySuccess', Romo.proxy(function(e, data, romoModal) {
    this._bindForm();
    Romo.trigger(this.elem, 'romoModalForm:formReady', [this.romoForm, this]);
  }, this));

  this._bindModal();
  this._bindForm();
}

RomoModalForm.prototype._bindModal = function() {
  this.romoModal = new RomoModal(this.elem);

  if (Romo.data(this.elem, 'romo-modal-clear-content') === undefined) {
    Romo.setData(this.elem, 'romo-modal-clear-content', 'true');
  }

  Romo.on(this.elem, 'romoModal:ready', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:ready', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:toggle', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:toggle', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:popupOpen', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:popupOpen', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:popupClose', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:popupClose', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:dragStart', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:dragStart', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:dragMove', Romo.proxy(function(e, placeX, placeY, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:dragMove', [placeX, placeY, romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:dragStop', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:dragStop', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:loadBodyStart', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:loadBodyStart', [romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:loadBodySuccess', Romo.proxy(function(e, data, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:loadBodySuccess', [data, romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:loadBodyError', Romo.proxy(function(e, xhr, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:loadBodyError', [xhr, romoModal, this]);
  }, this));
  Romo.on(this.elem, 'romoModal:dismiss', Romo.proxy(function(e, romoModal) {
    Romo.trigger(this.elem, 'romoModalForm:romoModal:dismiss', [romoModal, this]);
  }, this));
}

RomoModalForm.prototype.doBindForm = function() {
  this.romoForm = undefined;
  var formElem = Romo.find(this.romoModal.popupElem, '[data-romo-form-auto="modalForm"]')[0];

  if (formElem !== undefined) {
    Romo.on(formElem, 'romoForm:clearMsgs', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:clearMsgs', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:ready', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:ready', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:confirmSubmit', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:confirmSubmit', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:beforeSubmit', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:beforeSubmit', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitSuccess', Romo.proxy(function(e, data, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:submitSuccess', [data, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitInvalidMsgs', Romo.proxy(function(e, msgs, xhr, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:submitInvalidMsgs', [msgs, xhr, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitXhrError', Romo.proxy(function(e, xhr, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:submitXhrError', [xhr, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitError', Romo.proxy(function(e, xhr, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:submitError', [xhr, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:browserSubmit', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoModalForm:romoForm:browserSubmit', [romoForm, this]);
    }, this));

    var submitElem   = Romo.find(this.romoModal.popupElem, '[data-romo-form-submit]')[0];
    var spinnerElems = Romo.find(this.romoModal.popupElem, '[data-romo-spinner-auto="true"]');

    this.romoForm = new RomoForm(formElem, submitElem, spinnerElems);
  }
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-modalForm-auto="true"]').forEach(function(elem) { new RomoModalForm(elem); });
});
