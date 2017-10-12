var RomoForm = function(element, givenSubmitElement, givenIndicatorElements) {
  this.elem = $(element);
  this.defaultSubmitElem = this.elem.find('button[type="submit"], input[type="submit"], [data-romo-form-submit]');
  this.submitElem = $(givenSubmitElement || this.defaultSubmitElem);
  this.defaultIndicatorElems = this.elem.find('[data-romo-indicator-auto="true"]');
  this.indicatorElems = $(givenIndicatorElements || this.defaultIndicatorElems);
  this.changeSubmitElems = this.elem.find('[data-romo-form-change-submit="true"]');
  this.onkeySubmitElems = this.elem.find('[data-romo-form-onkey-submit="true"]');

  this.defaultListValuesDelim = ',';
  this.onkeyDefaultSubmitDelay = 300;  // 0.3 secs
  this.submitQueued  = false;
  this.submitRunning = false;

  this.removeEmptyGetParams = this.elem.data('romo-form-remove-empty-get-params')
  if (this.removeEmptyGetParams === undefined) {
    this.removeEmptyGetParams = true;
  }

  this.decodeParams = this.elem.data('romo-form-decode-params')
  if (this.decodeParams === undefined) {
    this.decodeParams = true;
  }

  this.doInit();
  this.doBindForm();
  this.elem.trigger('form:clearMsgs', [this]);
  this.elem.trigger('form:ready', [this]);
}

RomoForm.prototype.doInit = function() {
  // override as needed
}

RomoForm.prototype.doBindForm = function() {
  this.defaultSubmitElem.unbind('click');
  this.submitElem.unbind('click');
  this.submitElem.on('click', $.proxy(this.onSubmitClick, this));

  this.changeSubmitElems.on('change', $.proxy(function(e) {
    this.elem.trigger('form:triggerSubmit');
  }, this));
  this.onkeySubmitElems.on('onkey:trigger', $.proxy(function(e, triggerEvent, onkey) {
    clearTimeout(this.onkeySubmitTimeout);
    this.onkeySubmitTimeout = setTimeout($.proxy(function() {
      this.elem.trigger('form:triggerSubmit');
    }, this), onkey.elem.data('romo-form-onkey-submit-delay') || this.onkeyDefaultSubmitDelay);
  }, this));
  this.elem.on('form:triggerSubmit', $.proxy(this.onSubmitClick, this));

  this.elem.on('keypress', $.proxy(this.onFormKeyPress, this));

  if (this.elem.data('romo-form-reload-page') === true) {
    this.elem.on('form:submitSuccess', function(e, data, form) {
      Romo.reloadPage();
    })
  }

}

RomoForm.prototype.onFormKeyPress = function(e) {
  if (this.elem.data('romo-form-disable-keypress') !== true) {
    var targetElem = $(e.target);
    if (targetElem.is(':not(TEXTAREA)') && e.keyCode === 13 /* Enter */) {
      e.preventDefault();
      if (this.elem.data('romo-form-disable-enter-submit') !== true &&
          targetElem.data('romo-form-disable-enter-submit') !== true) {
        this.onSubmitClick();
      }
    }
  }
}

RomoForm.prototype.onSubmitClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.submitElem.data('romo-form-submit') === 'confirm') {
    this.elem.trigger('form:confirmSubmit', [this]);
  } else if (this.submitElem.hasClass('disabled') === false) {
    this.doSubmit();
  }
}

RomoForm.prototype.doSubmit = function() {
  this.submitQueued = true;
  if (this.submitRunning === false) {
    this._doSubmit();
  }
}

RomoForm.prototype.onSubmitSuccess = function(data, status, xhr) {
  this.elem.trigger('form:clearMsgs');
  this.elem.trigger('form:submitSuccess', [data, this]);
  this._doCompleteSubmit();
}

RomoForm.prototype.onSubmitError = function(xhr, errorType, error) {
  this.elem.trigger('form:clearMsgs');

  if(xhr.status === 422) {
    this.elem.trigger('form:submitInvalidMsgs', [$.parseJSON(xhr.responseText), xhr, this]);
  } else {
    this.elem.trigger('form:submitXhrError', [xhr, this]);
  }
  this.elem.trigger('form:submitError', [xhr, this]);
  this.indicatorElems.trigger('indicator:triggerStop');
  this._doCompleteSubmit();
}

// private

RomoForm.prototype._doCompleteSubmit = function() {
  this.elem.trigger('form:submitComplete', [this]);
  if (this.submitQueued === true) {
    this._doSubmit();
  } else {
    this.submitRunning = false;
  }
}

RomoForm.prototype._doSubmit = function() {
  this.submitQueued  = false;
  this.submitRunning = true;
  this.indicatorElems.trigger('indicator:triggerStart');
  this.elem.trigger('form:beforeSubmit', [this]);

  if(this.elem.data('romo-form-browser-submit') === true) {
    this._doBrowserSubmit();
  } else if (this.elem.attr('method').toUpperCase() === 'GET') {
    this._doNonBrowserGetSubmit();
  } else {
    this._doNonBrowserNonGetSubmit();
  }
}

RomoForm.prototype._doBrowserSubmit = function() {
  this.elem.submit();
  this.elem.trigger('form:browserSubmit', [this]);
}

RomoForm.prototype._doNonBrowserGetSubmit = function() {
  var data = this._getSerializeObj();

  if (this.elem.data('romo-form-redirect-page') === true) {
    var paramString = Romo.param(data, {
      removeEmpty:  this.removeEmptyGetParams,
      decodeValues: this.decodeParams
    });
    if (paramString !== '') {
      Romo.redirectPage(this.elem.attr('action') + '?' + paramString);
    } else {
      Romo.redirectPage(this.elem.attr('action'));
    }

  } else {
    this._doAjaxSubmit(data, true);
  }
}

RomoForm.prototype._doNonBrowserNonGetSubmit = function() {
  this._doAjaxSubmit(this._getFormData(), false);
}

RomoForm.prototype._doAjaxSubmit = function(data, process) {
  $.ajax({
    url:         this.elem.attr('action'),
    type:        this.elem.attr('method'),
    dataType:    this._getXhrDataType(),
    data:        data,
    processData: process,
    contentType: false,
    success:     $.proxy(this.onSubmitSuccess, this),
    error:       $.proxy(this.onSubmitError, this)
  });
}

RomoForm.prototype._getFormData = function() {
  var formData = new FormData();

  $.each(this._getSerializeObj(), function(k, v){ formData.append(k, v) });
  $.each(this.elem.find('INPUT[type="file"]'), function(i, fileInput) {
    var attrName = $(fileInput).attr('name')
    $.each(fileInput.files, function(i, file) { formData.append(attrName, file) });
  });

  return formData;
}

RomoForm.prototype._getSerializeObj = function() {
  var listNamesDelims = this._getListValueInputNamesDelims();

  return this.elem.serializeArray().reduce(function(prev, curr) {
    if (listNamesDelims[curr.name] !== undefined) {
      prev[curr.name] = $.map([prev[curr.name], curr.value], function(v) {
        return v; // $.map removes null/undefined vals, this acts like a compact function
      }).join(listNamesDelims[curr.name])
    } else {
      prev[curr.name] = curr.value;
    }

    return prev;
  }, {});
}

RomoForm.prototype._getListValueInputNamesDelims = function() {
  return Romo.toArray(this.elem.find('[data-romo-form-list-values="true"]')).reduce($.proxy(function(prev, curr) {
    prev[$(curr).attr('name')] = $(curr).data('romo-form-list-values-delim') || this.defaultListValuesDelim;
    return prev;
  }, this), {});
}

RomoForm.prototype._getXhrDataType = function() {
  if(this.elem.data('romo-form-xhr-data-type') !== undefined) {
    return this.elem.data('romo-form-xhr-data-type');
  } else {
    return 'json';
  }
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-form-auto="true"]').forEach(function(elem) { new RomoForm(elem); });
});

