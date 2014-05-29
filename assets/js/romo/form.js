$.fn.romoForm = function() {
  return $.map(this, function(elem, submitElem) {
    return new RomoForm($(elem), submitElem)
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

  if (this.elem.data('form-reload-page') === true) {
    this.elem.on('form:submitSuccess', function(e, data, form) {
      Romo.reloadPage()
    })
  }

  this.doInit()
  this.elem.trigger('form:clearMsgs', [this])
  this.elem.trigger('form:ready', [this])
}

RomoForm.prototype.doInit = function() {
  // override as needed
}

RomoForm.prototype.onFormKeyPress = function(e) {
  var target = $(e.target)

  if(target.is(':not(TEXTAREA)') && e.which === 13 /* Enter */) {
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

RomoForm.prototype.doSubmit = function() {
  this.elem.trigger('form:beforeSubmit', [this])

  if (this.elem.attr('method').toUpperCase() === 'GET') {
    this._doGetSubmit()
  } else {
    this._doNonGetSubmit()
  }
}

RomoForm.prototype.onSubmitSuccess = function(data, status, xhr) {
  this.elem.trigger('form:clearMsgs')
  this.elem.trigger('form:submitSuccess', [data, this])
}

RomoForm.prototype.onSubmitError = function(xhr, errorType, error) {
  this.elem.trigger('form:clearMsgs')

  if(xhr.status === '422') {
    this.elem.trigger('form:submitInvalidMsgs', [$.parseJSON(xhr.responseText), xhr, this])
  } else {
    this.elem.trigger('form:submitXhrError', [xhr, this])
  }
  this.elem.trigger('form:submitError', [xhr, this])
}

RomoForm.prototype._doGetSubmit = function() {
  var data = this._getSerializeObj()

  if (this.elem.data('form-redirect-page') === true) {
    Romo.redirectPage(this.elem.attr('action') + '?' + $.param(data))
  } else {
    this._doAjaxSubmit(data)
  }
}

RomoForm.prototype._doNonGetSubmit = function() {
  this._doAjaxSubmit(this._getFormData())
}

RomoForm.prototype._doAjaxSubmit = function(data) {
  $.ajax({
    url:         this.elem.attr('action'),
    type:        this.elem.attr('method'),
    dataType:    this._getXhrDataType(),
    data:        data,
    processData: false,
    contentType: false,
    success:     $.proxy(this.onSubmitSuccess, this),
    error:       $.proxy(this.onSubmitError, this)
  })
}

RomoForm.prototype._getFormData = function() {
  var formData = new FormData()

  $.each(this._getSerializeObj(), function(k, v){ formData.append(k, v) })
  $.each(this.elem.find('INPUT[type="file"]'), function(i, fileInput) {
    formData.append($(fileInput).attr('name'), fileInput.files)
  })

  return formData
}

RomoForm.prototype._getSerializeObj = function() {
  var listNamesDelims = this._getListValueInputNamesDelims()

  return this.elem.serializeArray().reduce(function(prev, curr) {
    if (listNamesDelims[curr.name] !== undefined) {
      prev[curr.name] = $.map([prev[curr.name], curr.value], function(v) {
        return v // $.map removes null/undefined vals, this acts like a compact function
      }).join(listNamesDelims[curr.name])
    } else if ($.isArray(prev[curr.name]) === true) {
      prev[curr.name].push(curr.value)
    } else if (prev[curr.name] !== undefined) {
      prev[curr.name] = [ prev[curr.name], curr.value ]
    } else {
      prev[curr.name] = curr.value
    }

    return prev
  }, {})
}

RomoForm.prototype._getListValueInputNamesDelims = function() {
  return $.map(this.elem.find('[data-form-list-values="true"]'), function(item){
    return item // onverts the collection to an array
  }).reduce(function(prev, curr) {
    prev[$(curr).attr('name')] = $(curr).data('form-list-values-delim') || ','
    return prev
  }, {})
}

RomoForm.prototype._getXhrDataType = function() {
  if(this.elem.data('form-xhr-data-type') !== undefined) {
    return this.elem.data('form-xhr-data-type')
  } else {
    return 'json'
  }
}

Romo.onInitUI(function(e) {
  $(e.target).find('.romo-form[data-form-auto="true"]').romoForm()
})
