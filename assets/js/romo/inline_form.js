$.fn.romoInlineForm = function() {
  return $.map(this, function(element) {
    return new RomoInlineForm(element);
  });
}

var RomoInlineForm = function(element) {
  this.elem = $(element);

  this.inline = this.elem.romoInline()[0];
  this.doBindInline();

  this.form = undefined;
  this.elem.on('inlineForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  this.elem.on('inline:loadSuccess', $.proxy(function(e, data, inline) {
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
  this.elem.on('inline:ready', $.proxy(function(e, inline) {
    this.elem.trigger('inlineForm:inline:ready', [inline, this]);
  }, this));
  this.elem.on('inline:invoke', $.proxy(function(e, inline) {
    this.elem.trigger('inlineForm:inline:invoke', [inline, this]);
  }, this));
  this.elem.on('inline:loadStart', $.proxy(function(e, inline) {
    this.elem.trigger('inlineForm:inline:loadStart', [inline, this]);
  }, this));
  this.elem.on('inline:loadSuccess', $.proxy(function(e, data, inline) {
    this.elem.trigger('inlineForm:inline:loadSuccess', [data, inline, this]);
  }, this));
  this.elem.on('inline:loadError', $.proxy(function(e, xhr, inline) {
    this.elem.trigger('inlineForm:inline:loadError', [xhr, inline, this]);
  }, this));
  this.elem.on('inline:dismiss', $.proxy(function(e, inline) {
    this.elem.trigger('inlineForm:inline:dismiss', [inline, this]);
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
  var indicatorElements = this.elem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-inlineForm-auto="true"]').romoInlineForm();
});

