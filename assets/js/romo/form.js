var RomoForm = function(formElem, givenSubmitElems, givenSpinnerElems) {
  this.elem = formElem;

  var defaultSubmitElems = Romo.find(
    this.elem,
    'button[type="submit"], input[type="submit"], [data-romo-form-submit]'
  );
  this.submitElems = (givenSubmitElems || []).concat(defaultSubmitElems || []);

  var defaultSpinnerElems = Romo.find(this.elem, '[data-romo-indicator-auto="true"]');
  this.spinnerElems = (givenSpinnerElems || []).concat(defaultSpinnerElems || []);

  this.changeSubmitElems = Romo.find(this.elem, '[data-romo-form-change-submit="true"]');
  this.onkeySubmitElems  = Romo.find(this.elem, '[data-romo-form-onkey-submit="true"]');

  this.defaultListValuesDelim  = ',';
  this.onkeyDefaultSubmitDelay = 300;  // 0.3 secs
  this.submitQueued            = false;
  this.submitRunning           = false;

  this.removeEmptyGetParams = Romo.data(this.elem, 'romo-form-remove-empty-get-params');
  if (this.removeEmptyGetParams === undefined) {
    this.removeEmptyGetParams = true;
  }

  this.decodeParams = Romo.data(this.elem, 'romo-form-decode-params');
  if (this.decodeParams === undefined) {
    this.decodeParams = true;
  }

  this._bindFormElem();
  this.doInit();

  Romo.trigger(this.elem, 'romoForm:clearMsgs', [this]);
  Romo.trigger(this.elem, 'romoForm:ready',     [this]);
}

RomoForm.prototype.doInit = function() {
  // override as needed
}

RomoForm.prototype.doSubmit = function() {
  this.submitQueued = true;
  if (this.submitRunning === false) {
    this._doSubmit();
  }
}

// private

RomoForm.prototype._bindFormElem = function() {
  this.submitElems.forEach(Romo.proxy(function(submitElem) {
    Romo.on(submitElem, 'click', Romo.proxy(this._onSubmitClick, this));
  }, this));

  this.changeSubmitElems.forEach(Romo.proxy(function(changeSubmitElem) {
    Romo.on(changeSubmitElem, 'change', Romo.proxy(function(e) {
      Romo.trigger(this.elem, 'romoForm:triggerSubmit');
    }, this));
  }, this));

  this.onkeySubmitElems.forEach(Romo.proxy(function(onkeySubmitElem) {
    Romo.on(onkeySubmitElem, 'romoOnkey:trigger', Romo.proxy(function(e, triggerEvent, romoOnkey) {
      // TODO: move this delay logic into onkey component
      clearTimeout(this.onkeySubmitTimeout);
      this.onkeySubmitTimeout = setTimeout(
        Romo.proxy(function() {
          Romo.trigger(this.elem, 'romoForm:triggerSubmit');
        }, this),
        Romo.data(romoOnkey.elem, 'romo-form-onkey-submit-delay') || this.onkeyDefaultSubmitDelay
      );
    }, this));
  }, this));

  Romo.on(this.elem, 'romoForm:triggerSubmit', Romo.proxy(this._onTriggerSubmit, this));
  Romo.on(this.elem, 'keypress',               Romo.proxy(this._onFormKeyPress,  this));

  if (Romo.data(this.elem, 'romo-form-reload-page') === true) {
    Romo.on(this.elem, 'romoForm:submitSuccess', function(e, data, romoForm) {
      Romo.reloadPage();
    });
  }
}

RomoForm.prototype._onSubmitClick = function(e) {
  e.preventDefault();

  var submitElem = e.target;
  if (!Romo.hasClass(submitElem, 'disabled')) {
    if (Romo.data(submitElem, 'romo-form-submit') === 'confirm') {
      Romo.trigger(this.elem, 'romoForm:confirmSubmit', [this]);
    } else
      this.doSubmit();
    }
  }
}

RomoForm.prototype._onTriggerSubmit = function() {
  var disabled = this.submitElems.reduce(function(disabled, submitElem) {
    return disabled || Romo.hasClass(submitElem, 'disabled');
  }, false);
  if (!disabled) {
    var confirm = this.submitElems.reduce(function(confirm, submitElem) {
      return confirm || Romo.data(submitElem, 'romo-form-submit') === 'confirm';
    }, false);
    if (confirm) {
      Romo.trigger(this.elem, 'romoForm:confirmSubmit', [this]);
    } else {
      this.doSubmit();
    }
  }
}

RomoForm.prototype._onFormKeyPress = function(e) {
  if (Romo.data(this.elem, 'romo-form-disable-keypress') !== true) {
    var targetElem = e.target;
    if (targetElem.nodeName.toLowerCase() !== 'textarea' && e.keyCode === 13 /* Enter */) {
      e.preventDefault();
      if (Romo.data(this.elem,  'romo-form-disable-enter-submit') !== true &&
          Romo.data(targetElem, 'romo-form-disable-enter-submit') !== true) {
        this._onTriggerSubmit();
      }
    }
  }
}

RomoForm.prototype._doSubmit = function() {
  this.submitQueued  = false;
  this.submitRunning = true;

  this.spinnerElems.forEach(function(spinnerElem) {
    Romo.trigger(spinnerElem, 'indicator:triggerStart');
  });
  Romo.trigger(this.elem, 'romoForm:beforeSubmit', [this]);

  if(Romo.data(this.elem, 'romo-form-browser-submit') === true) {
    this._doBrowserSubmit();
  } else if (Romo.attr(this.elem, 'method').toUpperCase() === 'GET') {
    this._doNonBrowserGetSubmit();
  } else {
    this._doNonBrowserNonGetSubmit();
  }
}

RomoForm.prototype._doBrowserSubmit = function() {
  this.elem.submit();
  Romo.trigger(this.elem, 'romoForm:browserSubmit', [this]);
}

RomoForm.prototype._doNonBrowserGetSubmit = function() {
  var formData = this._getFormData(this._getFormValues({ includeFiles: false }));

  if (Romo.data(this.elem, 'romo-form-redirect-page') === true) {
    var paramString = Romo.param(formData, {
      removeEmpty:  this.removeEmptyGetParams,
      decodeValues: this.decodeParams
    });
    if (paramString !== '') {
      Romo.redirectPage(Romo.attr(this.elem, 'action')+'?'+paramString);
    } else {
      Romo.redirectPage(Romo.attr(this.elem, 'action'));
    }
  } else {
    this._doAjaxSubmit(formData);
  }
}

RomoForm.prototype._doNonBrowserNonGetSubmit = function() {
  var formData = this._getFormData(this._getFormValues({ includeFiles: true }));

  this._doAjaxSubmit(formData);
}

RomoForm.prototype._doAjaxSubmit = function(formData) {
  Romo.ajax({
    url:     Romo.attr(this.elem, 'action'),
    type:    Romo.attr(this.elem, 'method'),
    data:    formData,
    success: Romo.proxy(this._onSubmitSuccess, this),
    error:   Romo.proxy(this._onSubmitError,   this)
  });
}


RomoForm.prototype._onSubmitSuccess = function(response, status, xhr) {
  Romo.trigger(this.elem, 'romoForm:clearMsgs');

  var dataType = this._getXhrDataType(),
  Romo.trigger(
    this.elem,
    'romoForm:submitSuccess',
    [(dataType === 'json' ? JSON.parse(response) : response), this]
  );

  this._completeSubmit();
}

RomoForm.prototype._onSubmitError = function(statusText, status, xhr) {
  Romo.trigger(this.elem, 'romoForm:clearMsgs');

  if(status === 422) {
    var dataType = this._getXhrDataType(),
    Romo.trigger(
      this.elem,
      'romoForm:submitInvalidMsgs',
      [(dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText), xhr, this]
    );
  } else {
    Romo.trigger(this.elem, 'romoForm:submitXhrError', [xhr, this]);
  }
  Romo.trigger(this.elem, 'romoForm:submitError', [xhr, this]);
  this.spinnerElems.forEach(function(spinnerElem) {
    Romo.trigger(spinnerElem, 'indicator:triggerStop');
  });

  this._completeSubmit();
}

RomoForm.prototype._completeSubmit = function() {
  Romo.trigger(this.elem, 'romoForm:submitComplete', [this]);
  if (this.submitQueued === true) {
    this._doSubmit();
  } else {
    this.submitRunning = false;
  }
}

RomoForm.prototype._getFormData = function(formValues) {
  var formData = new FormData;
  for (var name in formValues) {
    formValues[name].forEach(function(value){ formData.append(name, value) });
  }

  return formData;
}

RomoForm.prototype._getFormValues = function(opts) {
  if (opts === undefined) {
    opts = { includeFiles: false };
  }
  var formValues = {};

  // build formValues from the form elements
  // { "inputName1": ["inputValue1"],
  //   "inputName2": ["inputValue1", "inputValue2"],
  //   ...
  // }
  Romo.array(this.elem.elements).forEach(function(inputElem) {
    if ( inputElem.nodeName.toLowerCase() !== 'fieldset' &&
         inputElem.name              &&
         !inputElem.disabled         &&
         inputElem.type !== 'submit' &&
         inputElem.type !== 'reset'  &&
         inputElem.type !== 'button' &&
         (opts.includeFiles || inputElem.type  !== 'file') &&
         (inputElem.checked || (inputElem.type !== 'radio' && inputElem.type !== 'checkbox'))
       ) {
      if (formValues[inputElem.name] === undefined) {
        formValues[inputElem.name] = [];
      }
      if (inputElem.nodeName.toLowerCase() === 'select') {
        Romo.find(inputElem, 'option').filter(function(optElem){
          return optElem.selected;
        }).forEach(function(selectedOptElem) {
          formValues[inputElem.name].push(selectedOptElem.value);
        });
      } else if (inputElem.type === 'file') {
        Array.prototype.forEach.call(inputElem.files, function(file) {
          formValues[inputElem.name].push(file);
        });
      } else {
        formValues[inputElem.name].push(inputElem.value);
      }
    }
  });

  // process any list value inputs (if any)
  // { inputName1: ["inputValue1"],
  //   inputName2: ["inputValue1,inputValue2"],
  //   ...
  // }
  var listDelims = Romo.find(this.elem, '[data-romo-form-list-values="true"]').reduce(
    function(delims, inputElem) {
      delims[Romo.attr(inputElem, 'name')] = (
        Romo.data(currElem, 'romo-form-list-values-delim') ||
        this.defaultListValuesDelim
      );
      return delims;
    },
    {}
  );
  for (var name in listDelims) {
    if (formValues[name]) {
      formValues[name] = [formValues[name].join(listDelims[name])];
    }
  }

  return formValues;
}

RomoForm.prototype._getXhrDataType = function() {
  var dataType = Romo.data(this.elem, 'romo-form-xhr-data-type');
  return ((dataType === undefined) ? 'json' : dataType);
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-form-auto="true"]').forEach(function(elem) { new RomoForm(elem); });
});

