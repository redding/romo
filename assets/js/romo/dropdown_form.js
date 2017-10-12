var RomoDropdownForm = function(element) {
  this.elem = $(element);

  this.romoDropdown = new RomoDropdown(this.elem);
  this.doBindDropdown();

  this.form = undefined;
  this.elem.on('dropdownForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  this.elem.on('romoDropdown:loadBodySuccess', $.proxy(function(e, data, romoDropdown) {
    this.doBindForm();
    this.elem.trigger('dropdownForm:formReady', [this.form, this]);
  }, this));

  this.doInit();
  this.elem.trigger('dropdownForm:ready', [this]);
}

RomoDropdownForm.prototype.doInit = function() {
  // override as needed
}

RomoDropdownForm.prototype.doBindDropdown = function() {
if (this.elem.data('romo-dropdown-clear-content') === undefined) {
    this.elem.attr('data-romo-dropdown-clear-content', 'true');
  }

  this.elem.on('romoDropdown:ready', $.proxy(function(e, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:ready', [romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:toggle', $.proxy(function(e, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:toggle', [romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:popupOpen', $.proxy(function(e, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:popupOpen', [romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:popupClose', $.proxy(function(e, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:popupClose', [romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:loadBodyStart', $.proxy(function(e, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:loadBodyStart', [romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:loadBodySuccess', $.proxy(function(e, data, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:loadBodySuccess', [data, romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:loadBodyError', $.proxy(function(e, xhr, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:loadBodyError', [xhr, romoDropdown, this]);
  }, this));
  this.elem.on('romoDropdown:dismiss', $.proxy(function(e, romoDropdown) {
    this.elem.trigger('dropdownForm:romoDropdown:dismiss', [romoDropdown, this]);
  }, this));
}

RomoDropdownForm.prototype.doBindForm = function() {
  var formElem = this.romoDropdown.popupElem.find('[data-romo-form-auto="dropdownForm"]');

  formElem.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:clearMsgs', [form, this]);
  }, this));
  formElem.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:ready', [form, this]);
  }, this));
  formElem.on('form:confirmSubmit', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:confirmSubmit', [form, this]);
  }, this));
  formElem.on('form:beforeSubmit', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:beforeSubmit', [form, this]);
  }, this));
  formElem.on('form:submitSuccess', $.proxy(function(e, data, form) {
    this.elem.trigger('dropdownForm:form:submitSuccess', [data, form, this]);
  }, this));
  formElem.on('form:submitInvalidMsgs', $.proxy(function(e, msgs, xhr, form) {
    this.elem.trigger('dropdownForm:form:submitInvalidMsgs', [msgs, xhr, form, this]);
  }, this));
  formElem.on('form:submitXhrError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('dropdownForm:form:submitXhrError', [xhr, form, this]);
  }, this));
  formElem.on('form:submitError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('dropdownForm:form:submitError', [xhr, form, this]);
  }, this));
  formElem.on('form:browserSubmit', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:browserSubmit', [form, this]);
  }, this));

  var submitElement = this.romoDropdown.popupElem.find('[data-romo-form-submit]')[0];
  var indicatorElements = this.romoDropdown.popupElem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-dropdownForm-auto="true"]').forEach(function(elem) { new RomoDropdownForm(elem); });
});

