$.fn.romoForm = function() {
  return $.map(this, function(elem, submitElem) {
    return new RomoForm($(elem), $(submitElem))
  })
}

var RomoForm = function(element, submitElement) {
  this.elem = $(element)
  this.submit = this.elem.find('button[type="submit"], input[type="submit"]')
  this.submitElem = $(submitElement || this.submit)

  this.elem.on('keypress', $.proxy(this.onFormKeyPress, this))
  this.submit.unbind('click')
  this.submitElem.unbind('click')
  this.submitElem.on('click', $.proxy(this.onSubmitClick, this))

  this.doInit()
  this.elem.trigger('form:clearMsgs', [this])
  this.elem.trigger('form:ready', [this])
}

RomoForm.prototype.doInit = function() {
  // override as needed
}

RomoForm.prototype.onFormKeyPress = function(e) {
  var target = $(e.target)

  if(target.is(':not(TEXTAREA)') && e.which == 13) {
    e.preventDefault()
    this.onSubmitClick()
  }
}

RomoForm.prototype.onSubmitClick = function(e) {
  if (e != undefined) {
    e.preventDefault()
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doSubmit()
  }
}

RomoForm.prototype.doSubmit = function(e) {
  this.elem.trigger('form:beforeSubmit', [this])

  var type = this.elem.attr('method')
  if(type.toUpperCase() == 'GET') {
    var data = this.elem.serialize()
  } else {
    var data = new FormData(this.elem[0])
  }

  $.ajax({
    url:         this.elem.attr('action'),
    type:        type,
    dataType:    this._getXhrDataType(),
    data:        data,
    processData: false,
    contentType: false,
    success:     $.proxy(this.onSubmitSuccess, this),
    error:       $.proxy(this.onSubmitError, this)
  })
}

RomoForm.prototype.onSubmitSuccess = function(data, status, xhr) {
  this.elem.trigger('form:clearMsgs')
  this.elem.trigger('form:submitSuccess', [data, this]);
}

RomoForm.prototype.onSubmitError = function(xhr, errorType, error) {
  this.elem.trigger('form:clearMsgs')

  if(xhr.status == '422') {
    this.elem.trigger('form:submitInvalidMsgs', [$.parseJSON(xhr.responseText), xhr, this])
  } else {
    this.elem.trigger('form:submitXhrError', [xhr, this])
  }
  // TODO: switch arg order to xhr, this.form - update modal/inline
  this.form.trigger('form:submitError', [xhr, this]);
}

RomoForm.prototype._getXhrDataType = function() {
  if(this.elem.data('form-xhr-data-type') != undefined) {
    return this.elem.data('form-xhr-data-type');
  } else {
    return 'json';
  }
}

Romo.onInitUI(function(e) {
  $(e.target).find('.romo-form[data-form-auto="true"]').romoForm()
})

