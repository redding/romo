$.fn.romoModalForm = function() {
  return $.map(this, function(element) {
    return new RomoModalForm(element);
  });
}

var RomoModalForm = function(element) {
  this.elem = $(element);

  this.modal = this.elem.romoModal()[0];
  this.doBindModal();

  this.form = undefined;
  this.elem.on('modalForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  this.elem.on('modal:loadBodySuccess', $.proxy(function(e, data, modal) {
    this.doBindForm();
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

  this.elem.on('modal:ready', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:ready', [modal, this]);
  }, this));
  this.elem.on('modal:toggle', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:toggle', [modal, this]);
  }, this));
  this.elem.on('modal:popupOpen', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:popupOpen', [modal, this]);
  }, this));
  this.elem.on('modal:popupClose', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:popupClose', [modal, this]);
  }, this));
  this.elem.on('modal:dragStart', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:dragStart', [modal, this]);
  }, this));
  this.elem.on('modal:dragMove', $.proxy(function(e, placeX, placeY, modal) {
    this.elem.trigger('modalForm:modal:dragMove', [placeX, placeY, modal, this]);
  }, this));
  this.elem.on('modal:dragStop', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:dragStop', [modal, this]);
  }, this));
  this.elem.on('modal:loadBodyStart', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:loadBodyStart', [modal, this]);
  }, this));
  this.elem.on('modal:loadBodySuccess', $.proxy(function(e, data, modal) {
    this.elem.trigger('modalForm:modal:loadBodySuccess', [data, modal, this]);
  }, this));
  this.elem.on('modal:loadBodyError', $.proxy(function(e, xhr, modal) {
    this.elem.trigger('modalForm:modal:loadBodyError', [xhr, modal, this]);
  }, this));
  this.elem.on('modal:dismiss', $.proxy(function(e, modal) {
    this.elem.trigger('modalForm:modal:dismiss', [modal, this]);
  }, this));
}

RomoModalForm.prototype.doBindForm = function() {
  var formElem = this.modal.popupElem.find('[data-romo-form-auto="modalForm"]');

  formElem.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:clearMsgs', [form, this]);
  }, this));
  formElem.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('modalForm:form:ready', [form, this]);
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

  var submitElement = this.modal.popupElem.find('[data-romo-form-submit="true"]')[0];
  var indicatorElements = this.modal.popupElem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-modalForm-auto="true"]').romoModalForm();
});

