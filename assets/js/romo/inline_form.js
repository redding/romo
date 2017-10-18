var RomoInlineForm = function(element) {
  this.elem = $(element);

  this.romoInline = new RomoInline(this.elem);
  this.doBindInline();

  this.form = undefined;
  this.elem.on('inlineForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.elem.on('inlineForm:romoInline:triggerInvoke', $.proxy(function(e) {
    this.romoInline.elem.trigger('romoInline:triggerInvoke', []);
  }, this));
  this.elem.on('inlineForm:romoInline:triggerDismiss', $.proxy(function(e) {
    this.romoInline.elem.trigger('romoInline:triggerDismiss', []);
  }, this));
  this.doBindForm();
  this.elem.on('romoInline:loadSuccess', $.proxy(function(e, data, romoInline) {
    this.doBindForm();
    this.elem.trigger('inlineForm:formReady', [this.form, this]);
  }, this));

  this.doInit();
  this.elem.trigger('inlineForm:ready', [this]);
}

RomoInlineForm.prototype.doInit = function() {
  // override as needed
}

RomoInlineForm.prototype.doBindInline = function() {
  this.elem.on('romoInline:ready', $.proxy(function(e, romoInline) {
    this.elem.trigger('inlineForm:romoInline:ready', [romoInline, this]);
  }, this));
  this.elem.on('romoInline:loadStart', $.proxy(function(e, romoInline) {
    this.elem.trigger('inlineForm:romoInline:loadStart', [romoInline, this]);
  }, this));
  this.elem.on('romoInline:loadSuccess', $.proxy(function(e, data, romoInline) {
    this.elem.trigger('inlineForm:romoInline:loadSuccess', [data, romoInline, this]);
  }, this));
  this.elem.on('romoInline:loadError', $.proxy(function(e, xhr, romoInline) {
    this.elem.trigger('inlineForm:romoInline:loadError', [xhr, romoInline, this]);
  }, this));
  this.elem.on('romoInline:show', $.proxy(function(e, romoInline) {
    this.elem.trigger('inlineForm:romoInline:show', [romoInline, this]);
  }, this));
  this.elem.on('romoInline:dismiss', $.proxy(function(e, romoInline) {
    this.elem.trigger('inlineForm:romoInline:dismiss', [romoInline, this]);
  }, this));
  this.elem.on('romoInline:confirmDismiss', $.proxy(function(e, romoInline) {
    this.elem.trigger('inlineForm:romoInline:confirmDismiss', [romoInline, this]);
  }, this));
}

RomoInlineForm.prototype.doBindForm = function() {
  var formElem = this.elem.find('[data-romo-form-auto="inlineForm"]');

  formElem.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('inlineForm:form:clearMsgs', [form, this]);
  }, this));
  formElem.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('inlineForm:form:ready', [form, this]);
  }, this));
  formElem.on('form:confirmSubmit', $.proxy(function(e, form) {
    this.elem.trigger('inlineForm:form:confirmSubmit', [form, this]);
  }, this));
  formElem.on('form:beforeSubmit', $.proxy(function(e, form) {
    this.elem.trigger('inlineForm:form:beforeSubmit', [form, this]);
  }, this));
  formElem.on('form:submitSuccess', $.proxy(function(e, data, form) {
    this.elem.trigger('inlineForm:form:submitSuccess', [data, form, this]);
  }, this));
  formElem.on('form:submitInvalidMsgs', $.proxy(function(e, msgs, xhr, form) {
    this.elem.trigger('inlineForm:form:submitInvalidMsgs', [msgs, xhr, form, this]);
  }, this));
  formElem.on('form:submitXhrError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('inlineForm:form:submitXhrError', [xhr, form, this]);
  }, this));
  formElem.on('form:submitError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('inlineForm:form:submitError', [xhr, form, this]);
  }, this));

  var submitElement = this.elem.find('[data-romo-form-submit]')[0];
  var spinnerElements = this.elem.find('[data-romo-spinner-auto="true"]');
  this.form = formElem.romoForm(submitElement, spinnerElements)[0];
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-inlineForm-auto="true"]').forEach(function(elem) { new RomoInlineForm(elem); });
});

