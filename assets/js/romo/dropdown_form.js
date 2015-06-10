$.fn.romoDropdownForm = function() {
  return $.map(this, function(element) {
    return new RomoDropdownForm(element);
  });
}

var RomoDropdownForm = function(element) {
  this.elem = $(element);

  this.dropdown = this.elem.romoDropdown()[0];
  this.doBindDropdown();

  this.form = undefined;
  this.elem.on('dropdownForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  this.elem.on('dropdown:loadBodySuccess', $.proxy(function(e, data, dropdown) {
    this.doBindForm();
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

  this.elem.on('dropdown:ready', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:ready', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:toggle', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:popupClose', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:loadBodyStart', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:loadBodyStart', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:loadBodySuccess', $.proxy(function(e, data, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:loadBodySuccess', [data, dropdown, this]);
  }, this));
  this.elem.on('dropdown:loadBodyError', $.proxy(function(e, xhr, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:loadBodyError', [xhr, dropdown, this]);
  }, this));
  this.elem.on('dropdown:dismiss', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:dismiss', [dropdown, this]);
  }, this));
}

RomoDropdownForm.prototype.doBindForm = function() {
  var formElem = this.dropdown.popupElem.find('[data-romo-form-auto="dropdownForm"]');

  formElem.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:clearMsgs', [form, this]);
  }, this));
  formElem.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:ready', [form, this]);
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

  var submitElement = this.dropdown.popupElem.find('[data-romo-form-submit="true"]')[0];
  var indicatorElements = this.dropdown.popupElem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-dropdownForm-auto="true"]').romoDropdownForm();
});

