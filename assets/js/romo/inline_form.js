$.fn.romoInlineForm = function() {
  return $.map(this, function(element) {
    return new RomoInlineForm(element)
  })
}

var RomoInlineForm = function(element) {
  this.elem = $(element)

  this.form = undefined
  this.doBindForm()
  this.elem.on('inline:loadSuccess', $.proxy(function(e, data, inline) {
    this.doBindForm()
  }, this))

  this.doInit()
  this.inline = this.elem.romoInline()[0]
  this.elem.trigger('inlineForm:ready', [this])
}

RomoInlineForm.prototype.doInit = function() {
  // override as needed
}

RomoInlineForm.prototype.doBindForm = function() {
  this.form = this.elem.find('[data-romo-form-auto="inlineForm"]')

  this.form.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('form:clearMsgs', [form, this])
  }, this))
  this.form.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('form:ready', [form, this])
  }, this))
  this.form.on('form:beforeSubmit', $.proxy(function(e, form) {
    this.elem.trigger('form:beforeSubmit', [form, this])
  }, this))
  this.form.on('form:submitSuccess', $.proxy(function(e, data, form) {
    this.elem.trigger('form:submitSuccess', [data, form, this])
  }, this))
  this.form.on('form:submitInvalidMsgs', $.proxy(function(e, msgs, xhr, form) {
    this.elem.trigger('form:submitInvalidMsgs', [msgs, xhr, form, this])
  }, this))
  this.form.on('form:submitXhrError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('form:submitXhrError', [xhr, form, this])
  }, this))
  this.form.on('form:submitError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('form:submitError', [xhr, form, this])
  }, this))

  var submitElement = this.elem.find('[data-romo-form-submit="true"]')[0]
  this.form.romoForm(submitElement);
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-inlineForm-auto="true"]').romoInlineForm()
})
