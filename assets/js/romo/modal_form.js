var RomoModalForm = function(element) {
  this.elem = $(element);

  this.romoModal = new RomoModal(this.elem);
  this.doBindModal();

  this.form = undefined;
  this.elem.on('modalForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  this.elem.on('romoModal:loadBodySuccess', $.proxy(function(e, data, romoModal) {
    this.doBindForm();
    this.elem.trigger('modalForm:formReady', [this.form, this]);
  }, this));

  this.doInit();
  this.elem.trigger('modalForm:ready', [this]);
}

RomoModalForm.prototype.doInit = function() {
  // override as needed
}

RomoModalForm.prototype.doBindModal = function() {
  if (this.elem.data('romo-modal-clear-content') === undefined) {
    this.elem.attr('data-romo-modal-clear-content', 'true');
  }

  this.elem.on('romoModal:ready', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:ready', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:toggle', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:toggle', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:popupOpen', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:popupOpen', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:popupClose', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:popupClose', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:dragStart', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:dragStart', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:dragMove', $.proxy(function(e, placeX, placeY, romoModal) {
    this.elem.trigger('modalForm:romoModal:dragMove', [placeX, placeY, romoModal, this]);
  }, this));
  this.elem.on('romoModal:dragStop', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:dragStop', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:loadBodyStart', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:loadBodyStart', [romoModal, this]);
  }, this));
  this.elem.on('romoModal:loadBodySuccess', $.proxy(function(e, data, romoModal) {
    this.elem.trigger('modalForm:romoModal:loadBodySuccess', [data, romoModal, this]);
  }, this));
  this.elem.on('romoModal:loadBodyError', $.proxy(function(e, xhr, romoModal) {
    this.elem.trigger('modalForm:romoModal:loadBodyError', [xhr, romoModal, this]);
  }, this));
  this.elem.on('romoModal:dismiss', $.proxy(function(e, romoModal) {
    this.elem.trigger('modalForm:romoModal:dismiss', [romoModal, this]);
  }, this));
}

RomoModalForm.prototype.doBindForm = function() {
  var formElem = this.romoModal.popupElem.find('[data-romo-form-auto="modalForm"]');

  formElem.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:clearMsgs', [form, this]);
  }, this));
  formElem.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:ready', [form, this]);
  }, this));
  formElem.on('form:confirmSubmit', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:confirmSubmit', [form, this]);
  }, this));
  formElem.on('form:beforeSubmit', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:beforeSubmit', [form, this]);
  }, this));
  formElem.on('form:submitSuccess', $.proxy(function(e, data, form) {
    this.elem.trigger('modalForm:form:submitSuccess', [data, form, this]);
  }, this));
  formElem.on('form:submitInvalidMsgs', $.proxy(function(e, msgs, xhr, form) {
    this.elem.trigger('modalForm:form:submitInvalidMsgs', [msgs, xhr, form, this]);
  }, this));
  formElem.on('form:submitXhrError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('modalForm:form:submitXhrError', [xhr, form, this]);
  }, this));
  formElem.on('form:submitError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('modalForm:form:submitError', [xhr, form, this]);
  }, this));
  formElem.on('form:browserSubmit', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:browserSubmit', [form, this]);
  }, this));

  var submitElement = this.romoModal.popupElem.find('[data-romo-form-submit]')[0];
  var spinnerElements = this.romoModal.popupElem.find('[data-romo-spinner-auto="true"]');
  this.form = formElem.romoForm(submitElement, spinnerElements)[0];
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-modalForm-auto="true"]').forEach(function(elem) { new RomoModalForm(elem); });
});

