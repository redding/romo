(function() {
  var Romo = function() {
    this._eventCallbacks = [];
  }

  Romo.prototype.doInit = function() {
    $.each(this._eventCallbacks, function(idx, eventCallback) {
      $('body').on(eventCallback.eventName, eventCallback.callback);
    });

    this.triggerInitUI($('body'));
  }

  // init UI

  Romo.prototype.onInitUI = function(callback) {
    this._addEventCallback('romo:initUI', callback);
  }

  Romo.prototype.triggerInitUI = function(elem) {
    elem.trigger('romo:initUI');
  }

  Romo.prototype.initHtml = function(elem, data) {
    elem.html(data);
    this.triggerInitUI(elem);
  }

  // page handling

  Romo.prototype.reloadPage = function() {
    window.location = window.location;
  }

  Romo.prototype.redirectPage = function(redirectUrl) {
    window.location = redirectUrl;
  }

  // param serialization

  Romo.prototype.param = function(data, opts) {
    var paramData = $.extend({}, data);

    if (opts && opts.removeEmpty) {
      $.each(paramData, function(key, value) {
        if (value === '') {
          delete paramData[key];
        }
      })
    }

    var paramString = $.param(paramData);

    if (opts && opts.decodeValues) {
      paramString = this.decodeParam(paramString);
    }

    return paramString;
  }

  Romo.prototype.decodeParam = function(string) {
    return this.decodeParamMap.reduce(function(prev, curr) {
      return prev.replace(curr[0], curr[1]);
    }, string);
  }

  Romo.prototype.decodeParamMap = [
    [/%20/g, '+'],
    [/%21/g, '!'],
    [/%24/g, '$'],
    [/%28/g, '('],
    [/%29/g, ')'],
    [/%2A/g, '*'],
    [/%2B/g, '+'],
    [/%2C/g, ','],
    [/%2D/g, '-'],
    [/%2E/g, '.'],
    [/%2F/g, '/'],
    [/%5B/g, '['],
    [/%5C/g, '\\'],
    [/%5D/g, ']'],
    [/%3A/g, ':'],
    [/%3C/g, '<'],
    [/%3E/g, '>'],
    [/%3F/g, '?'],
    [/%40/g, '@'],
    [/%5E/g, '^'],
    [/%5F/g, '_'],
    [/%60/g, '`'],
    [/%7B/g, '{'],
    [/%7C/g, '|'],
    [/%7D/g, '}'],
    [/%7E/g, '~']
  ];

  // style handling

  Romo.prototype.parseZIndex = function(elem) {
    // for the case where the browser doesn't suck and can read inherited z-index
    var val = parseInt(elem.css('z-index'));
    if (!isNaN(val)) {
      return val;
    }

    // for the case where the browser sucks and can't read inherited z-index - we'll do it for you!
    var parentIndexes = $.map(elem.parents(), function(item) {
      return item; // converts the collection to an array
    }).reduce($.proxy(function(prev, curr) {
      var pval = parseInt($(curr).css('z-index'));
      if (!isNaN(pval)) {
        prev.push(pval);
      }
      return prev;
    }, this), []);
    parentIndexes.push(0); // in case z-index is 'auto' all the way up
    return parentIndexes[0];
  }

  // private

  Romo.prototype._addEventCallback = function(name, callback) {
    this._eventCallbacks.push({ eventName: name, callback:  callback });
  }

  window.Romo = new Romo();
})();

$(function() {

  Romo.doInit();

})

$.fn.romoInvoke = function() {
  return $.map(this, function(element) {
    return new RomoInvoke(element);
  });
}

var RomoInvoke = function(element) {
  this.elem = $(element);
  this.targetElem = $(this.elem.data('romo-invoke-target'));
  this.invokeOn = this.elem.data('romo-invoke-on') || 'click';

  this.elem.unbind(this.invokeOn);

  this.doInit();
  this.doBindInvoke();
  this._trigger('invoke:ready', [this]);
}

RomoInvoke.prototype.doInit = function() {
  // override as needed
}

RomoInvoke.prototype.doBindInvoke = function() {
  this.doUnBindInvoke();
  this.elem.on(this.invokeOn, $.proxy(this.onInvoke, this));
  this.elem.on('invoke:triggerInvoke', $.proxy(this.onInvoke, this));
}

RomoInvoke.prototype.doUnBindInvoke = function() {
  this.elem.off(this.invokeOn, $.proxy(this.onInvoke, this));
  this.elem.off('invoke:triggerInvoke', $.proxy(this.onInvoke, this));
}

RomoInvoke.prototype.onInvoke = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doInvoke();
  }
}

RomoInvoke.prototype.doInvoke = function() {
  var loadHref = this.elem.attr('href');
  if (loadHref !== undefined) {
    this.doLoad(loadHref);
  } else {
    this._trigger('invoke:invoke', [this]);
  }
}

RomoInvoke.prototype.doLoad = function(href) {
  this._trigger('invoke:loadStart', [this]);

  $.ajax({
    url:     href,
    success: $.proxy(this.onLoadAjaxSuccess, this),
    error:   $.proxy(this.onLoadAjaxError,   this)
  });
}

RomoInvoke.prototype.onLoadAjaxSuccess = function(data, status, xhr) {
  this._trigger('invoke:invoke', [this]);
  this._trigger('invoke:loadSuccess', [data, this]);
}

RomoInvoke.prototype.onLoadAjaxError = function(xhr, errorType, error) {
  this._trigger('invoke:invoke', [this]);
  this._trigger('invoke:loadError', [xhr, this]);
}

RomoInvoke.prototype._trigger = function(event_name, event_data) {
  this.elem.trigger(event_name, event_data);
  if (this.targetElem !== undefined) {
    this.targetElem.trigger(event_name, event_data);
  }
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-invoke-auto="true"]').romoInvoke();
});

$.fn.romoForm = function(givenSubmitElement) {
  return $.map(this, function(element) {
    return new RomoForm(element, givenSubmitElement);
  });
}

var RomoForm = function(element, givenSubmitElement) {
  this.elem = $(element);
  this.defaultSubmitElem = this.elem.find('button[type="submit"], input[type="submit"], [data-romo-form-submit="true"]');
  this.submitElem = $(givenSubmitElement || this.defaultSubmitElem);
  this.changeSubmitElems = this.elem.find('[data-romo-form-change-submit="true"]');

  this.elem.on('keypress', $.proxy(this.onFormKeyPress, this));
  this.defaultSubmitElem.unbind('click');
  this.submitElem.unbind('click');
  this.submitElem.on('click', $.proxy(this.onSubmitClick, this));
  this.changeSubmitElems.on('change', $.proxy(function(e) {
    this.elem.trigger('form:triggerSubmit');
  }, this));
  this.elem.on('form:triggerSubmit', $.proxy(this.onSubmitClick, this));

  if (this.elem.data('romo-form-reload-page') === true) {
    this.elem.on('form:submitSuccess', function(e, data, form) {
      Romo.reloadPage();
    })
  }

  this.defaultListValuesDelim = ',';

  this.removeEmptyGetParams = this.elem.data('romo-form-remove-empty-get-params')
  if (this.removeEmptyGetParams === undefined) {
    this.removeEmptyGetParams = true;
  }

  this.decodeParams = this.elem.data('romo-form-decode-params')
  if (this.decodeParams === undefined) {
    this.decodeParams = true;
  }

  this.doInit();
  this.elem.trigger('form:clearMsgs', [this]);
  this.elem.trigger('form:ready', [this]);
}

RomoForm.prototype.doInit = function() {
  // override as needed
}

RomoForm.prototype.onFormKeyPress = function(e) {
  var target = $(e.target);

  if(target.is(':not(TEXTAREA)') && e.which === 13 /* Enter */) {
    e.preventDefault();
    this.onSubmitClick();
  }
}

RomoForm.prototype.onSubmitClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doSubmit();
  }
}

RomoForm.prototype.doSubmit = function() {
  this.elem.trigger('form:beforeSubmit', [this]);
  this.submitElem.trigger('indicator:triggerStart');

  if (this.elem.attr('method').toUpperCase() === 'GET') {
    this._doGetSubmit();
  } else {
    this._doNonGetSubmit();
  }
}

RomoForm.prototype.onSubmitSuccess = function(data, status, xhr) {
  this.elem.trigger('form:clearMsgs');
  this.elem.trigger('form:submitSuccess', [data, this]);
}

RomoForm.prototype.onSubmitError = function(xhr, errorType, error) {
  this.elem.trigger('form:clearMsgs');

  if(xhr.status === 422) {
    this.elem.trigger('form:submitInvalidMsgs', [$.parseJSON(xhr.responseText), xhr, this]);
  } else {
    this.elem.trigger('form:submitXhrError', [xhr, this]);
  }
  this.elem.trigger('form:submitError', [xhr, this]);
  this.submitElem.trigger('indicator:triggerStop');
}

RomoForm.prototype._doGetSubmit = function() {
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
    this._doAjaxSubmit(data);
  }
}

RomoForm.prototype._doNonGetSubmit = function() {
  this._doAjaxSubmit(this._getFormData());
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
    } else if ($.isArray(prev[curr.name]) === true) {
      prev[curr.name].push(curr.value);
    } else if (prev[curr.name] !== undefined) {
      prev[curr.name] = [ prev[curr.name], curr.value ];
    } else {
      prev[curr.name] = curr.value;
    }

    return prev;
  }, {});
}

RomoForm.prototype._getListValueInputNamesDelims = function() {
  return $.map(this.elem.find('[data-romo-form-list-values="true"]'), function(item){
    return item; // converts the collection to an array
  }).reduce($.proxy(function(prev, curr) {
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

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-form-auto="true"]').romoForm();
});


$.fn.romoDropdown = function() {
  return $.map(this, function(element) {
    return new RomoDropdown(element);
  });
}

var RomoDropdown = function(element) {
  this.elem = $(element);
  this.popupElem = $('<div class="romo-dropdown-popup"><div class="romo-dropdown-body"></div></div>');
  this.popupElem.appendTo('body');
  this.doSetPopupZIndex(this.elem);
  this.bodyElem = this.popupElem.find('> .romo-dropdown-body');
  this.contentElem = $();
  this.romoInvoke = this.elem.romoInvoke()[0];

  var positionData = this._parsePositionData(this.elem.data('romo-dropdown-position'));
  this.popupPosition  = positionData.position  || 'bottom';
  this.popupAlignment = positionData.alignment || 'left';
  this.popupElem.attr('data-romo-dropdown-position',  this.popupPosition);
  this.popupElem.attr('data-romo-dropdown-alignment', this.popupAlignment);
  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })

  if (this.elem.data('romo-dropdown-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-dropdown-style-class'));
  }

  this.elem.unbind('click');
  this.elem.on('click', $.proxy(this.onToggleClick, this));
  this.elem.on('dropdown:triggerToggle', $.proxy(this.onToggleClick, this));
  this.elem.on('dropdown:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('dropdown:triggerPopupClose', $.proxy(this.onPopupClose, this));
  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadBodyStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadBodySuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadBodyError(xhr);
  }, this));
  this.elem.on('keyup', $.proxy(this.onElemKeyUp, this));
  this.popupElem.on('keyup', $.proxy(this.onElemKeyUp, this));

  this.doInit();
  this.doInitBody();

  this.elem.trigger('dropdown:ready', [this]);
}

RomoDropdown.prototype.doInit = function() {
  // override as needed
}

RomoDropdown.prototype.doInitBody = function() {
  this.doResetBody();

  this.contentElem = this.bodyElem.find('.romo-dropdown-content');
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }

  this.contentElem.css({
    'min-height': this.elem.data('romo-dropdown-min-height'),
    'max-height': this.elem.data('romo-dropdown-max-height'),
    'height':     this.elem.data('romo-dropdown-height'),
    'overflow-x': this.elem.data('romo-dropdown-overflow-x') || 'auto',
    'overflow-y': this.elem.data('romo-dropdown-overflow-y') || 'auto'
  });

  if (this.elem.data('romo-dropdown-width') === 'elem') {
    this.popupElem.css({
      'width': this.elem.css('width')
    });
  } else {
    this.contentElem.css({
      'min-width':  this.elem.data('romo-dropdown-min-width'),
      'max-width':  this.elem.data('romo-dropdown-max-width'),
      'width':      this.elem.data('romo-dropdown-width')
    });
  }
}

RomoDropdown.prototype.doResetBody = function() {
  this.contentElem.css({
    'min-width':  '',
    'max-width':  '',
    'width':      '',
    'min-height': '',
    'max-height': '',
    'height':     '',
    'overflow-x': '',
    'overflow-y': ''
  });
}

RomoDropdown.prototype.doLoadBodyStart = function() {
  this.bodyElem.html('');
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('dropdown:loadBodyStart', [this]);
}

RomoDropdown.prototype.doLoadBodySuccess = function(data) {
  Romo.initHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('dropdown:loadBodySuccess', [data, this]);
}

RomoDropdown.prototype.doLoadBodyError = function(xhr) {
  this.elem.trigger('dropdown:loadBodyError', [xhr, this]);
}

RomoDropdown.prototype.onToggleClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    if (!this.popupElem.hasClass('romo-dropdown-open') ||
         this.elem.data('romo-dropdown-disable-toggle') !== true) {
      this.doToggle();
      return true;
    }
  }
  return false;
}

RomoDropdown.prototype.doToggle = function() {
  if (this.popupElem.hasClass('romo-dropdown-open')) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  } else {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
  this.elem.trigger('dropdown:toggle', [this]);
}

RomoDropdown.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if ((this.elem.hasClass('disabled') === false) &&
      (this.popupElem.hasClass('romo-dropdown-open') === false)) {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
}

RomoDropdown.prototype.doPopupOpen = function() {
  this.romoInvoke.doInvoke();
  this.popupElem.addClass('romo-dropdown-open');
  this.doPlacePopupElem();

  // bind an event to close the popup when clicking away from the
  // popup.  Bind on a timeout to allow time for any toggle
  // click event to propagate.  If no timeout, we'll bind this
  // event, then the toggle click will propagate which will call
  // this event and immediately close the popup.
  setTimeout($.proxy(function() {
    $('body').on('click', $.proxy(this.onWindowBodyClick, this));
    $('body').on('modal:mousedown', $.proxy(this.onWindowBodyClick, this));
  }, this), 100);
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('dropdown:popupOpen', [this]);
}

RomoDropdown.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  }
}

RomoDropdown.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-dropdown-open');

  $('body').off('click', $.proxy(this.onWindowBodyClick, this));
  $('body').off('modal:mousedown', $.proxy(this.onWindowBodyClick, this));
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('dropdown:popupClose', [this]);
}

RomoDropdown.prototype.onElemKeyUp = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.popupElem.hasClass('romo-dropdown-open')) {
      if(e.keyCode === 27 /* Esc */ ) {
        this.doPopupClose();
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  return true;
}

RomoDropdown.prototype.onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && $(e.target).parents('.romo-dropdown-popup').size() === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoDropdown.prototype.onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
  }
  return true;
}

RomoDropdown.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoDropdown.prototype.doPlacePopupElem = function() {
  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    this.popupElem.css({'position': 'fixed'});
  }

  var pos = $.extend({}, this.elem[0].getBoundingClientRect(), this.elem.offset());
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var pad = 2;
  var offset = {};

  switch (this.popupPosition) {
    case 'top':
      $.extend(offset, { top: pos.top - h - pad });
      break;
    case 'bottom':
      $.extend(offset, { top: pos.top + pos.height + pad });
      break;
  }
  switch (this.popupAlignment) {
    case 'left':
      $.extend(offset, { left: pos.left });
      break;
    case 'right':
      $.extend(offset, { left: pos.right - w });
      break;
  }

  this.popupElem.offset(offset);

  if (this.elem.data('romo-dropdown-max-height') === 'detect') {
    var pad = 10;
    var contentTop = this.contentElem[0].getBoundingClientRect().top;
    var maxHeight = $(window).height() - contentTop - pad;
    this.contentElem.css({'max-height': maxHeight.toString() + 'px'});
  }
}

RomoDropdown.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  this.popupElem.css({'z-index': relativeZIndex + 1200}); // see z-index.css
}

RomoDropdown.prototype._parsePositionData = function(posString) {
  var posData = (posString || '').split(',');
  return { position: posData[0], alignment: posData[1] };
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-dropdown-auto="true"]').romoDropdown();
});

$.fn.romoSelect = function() {
  return $.map(this, function(element) {
    return new RomoSelect(element);
  });
}

var RomoSelect = function(element) {
  this.elem = $(element);
  this.defaultCaretClass = '';
  this.itemSelector = 'LI[data-romo-select-item="opt"]:not(.disabled)';

  this.doInit();
  this.doBindDropdown();
  this.doRefreshUI();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoDropdown.elem.focus();
    }, this));
  }

  $(window).on("pageshow", $.proxy(function(e) {
    var selectedVal = this.elem.find('option[selected]').attr('value');
    if (selectedVal === undefined) {
      selectedVal = '';
    }

    if (selectedVal !== this.elem[0].value) {
      this.elem[0].value = selectedVal;
      this.doRefreshUI();
    }
  }, this));

  this.elem.trigger('select:ready', [this]);
}

RomoSelect.prototype.doInit = function() {
  // override as needed
}

RomoSelect.prototype.doBindDropdown = function() {
  this.romoDropdown = this._buildDropdownElem().romoDropdown()[0];
  this.romoDropdown.doSetPopupZIndex(this.elem);
  this.romoDropdown.bodyElem.addClass('romo-select-option-list');
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));
  this.romoDropdown.elem.on('keydown', $.proxy(this.onElemKeyDown, this));
  this.romoDropdown.popupElem.on('keydown', $.proxy(this.onElemKeyDown, this));

  this.romoDropdown.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('select:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('select:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('select:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.elem.on('select:triggerToggle', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('select:triggerPopupOpen', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('select:triggerPopupClose', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));
}

RomoSelect.prototype.doRefreshUI = function() {
  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this._buildOptionList(this.elem.children()));

  this.romoDropdown.bodyElem.find(this.itemSelector).on('hover', $.proxy(this.onItemHover, this));
  this.romoDropdown.bodyElem.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.elem.find('.romo-select-text').text(this.romoDropdown.bodyElem.find('LI.selected').text());
  this.elemWrapper.find('.romo-select-caret').css({'line-height': this.elemWrapper.css('height')});
  if (this.elem.attr('disabled') !== undefined) {
    this.romoDropdown.elem.attr('disabled', this.elem.attr('disabled'));
  }
}

RomoSelect.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.elem[0].value;
  var newValue = this.romoDropdown.bodyElem.find('LI.romo-select-highlight').data('romo-select-option-value');

  this.romoDropdown.doPopupClose();
  this.elem.trigger('select:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this.elem[0].value = newValue;
    this.doRefreshUI();

    this.elem.trigger('change');
    this.elem.trigger('select:change', [newValue, prevValue, this]);
  }
}

RomoSelect.prototype.onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this._highlightItem(this.romoDropdown.bodyElem.find('LI.selected'));
    this._scrollTopToItem(this.romoDropdown.bodyElem.find('LI.selected'));
  }
  $('body').on('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelect.prototype.onPopupClose = function(e) {
  this._highlightItem($());
  $('body').off('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelect.prototype.onItemHover = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this._highlightItem($(e.target));
}

RomoSelect.prototype.onItemClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doSelectHighlightedItem();
}

RomoSelect.prototype.onPopupOpenBodyKeyDown = function(e) {
  if (e !== undefined) {
    e.stopPropagation();
  }

  var scroll = this.romoDropdown.bodyElem;

  if (e.keyCode === 38 /* Up */) {
    var prev = this._prevListItem();

    this._highlightItem(prev);
    if (scroll.offset().top > prev.offset().top) {
      this._scrollTopToItem(prev);
    } else if ((scroll.offset().top + scroll.height()) < prev.offset().top) {
      this._scrollTopToItem(prev);
    }

    return false;
  } else if(e.keyCode === 40 /* Down */) {
    var next = this._nextListItem();

    this._highlightItem(next);
    if ((scroll.offset().top + scroll.height()) < next.offset().top + next.height()) {
      this._scrollBottomToItem(next);
    } else if (scroll.offset().top > next.offset().top) {
      this._scrollTopToItem(next);
    }

    return false;
  } else {
    return true;
  }
}

RomoSelect.prototype.onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open')) {
      if(e.keyCode === 13 /* Enter */ ) {
        this.doSelectHighlightedItem();
        return false;
      } else {
        return true;
      }
    } else {
      if(e.keyCode === 40 /* Down */ ) {
        this.romoDropdown.doPopupOpen();
        this.romoDropdown.popupElem.focus();
        return false;
      } else {
        return true;
      }
    }
  }
  return true;
}

RomoSelect.prototype._scrollTopToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = item.height() / 2;

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelect.prototype._scrollBottomToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = scroll[0].offsetHeight - item.height();

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelect.prototype._buildDropdownElem = function() {
  var romoDropdownElem = $('<div class="romo-select" tabindex="0"><span class="romo-select-text"></span></div>');

  romoDropdownElem.attr('data-romo-dropdown-position', this.elem.data('romo-select-dropdown-position'));
  romoDropdownElem.attr('data-romo-dropdown-style-class', this.elem.data('romo-select-dropdown-style-class'));
  romoDropdownElem.attr('data-romo-dropdown-min-height', this.elem.data('romo-select-dropdown-min-height'));
  romoDropdownElem.attr('data-romo-dropdown-max-height', this.elem.data('romo-select-dropdown-max-height'));
  romoDropdownElem.attr('data-romo-dropdown-height', this.elem.data('romo-select-dropdown-height'));
  romoDropdownElem.attr('data-romo-dropdown-overflow-x', 'hidden');
  romoDropdownElem.attr('data-romo-dropdown-width', 'elem');
  if (romoDropdownElem.data('romo-dropdown-max-height') === undefined) {
    romoDropdownElem.attr('data-romo-dropdown-max-height', 'detect');
  }

  var classList = this.elem.attr('class') !== undefined ? this.elem.attr('class').split(/\s+/) : [];
  $.each(classList, function(idx, classItem) {
    romoDropdownElem.addClass(classItem);
  });
  if (this.elem.attr('style') !== undefined) {
    romoDropdownElem.attr('style', this.elem.attr('style'));
  }
  romoDropdownElem.css({'width': this.elem.css('width')});

  this.elem.after(romoDropdownElem);
  this.elem.hide();

  this.elemWrapper = $('<div class="romo-select-wrapper"></div>');
  this.elemWrapper.css({'display': romoDropdownElem.css('display')});
  romoDropdownElem.before(this.elemWrapper);
  this.elemWrapper.append(romoDropdownElem);

  var caretClass = this.elem.data('romo-select-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    var caret = $('<i class="romo-select-caret '+caretClass+'"></i>');
    caret.css({'line-height': this.elemWrapper.css('height')});
    romoDropdownElem.css({'padding-right': '22px'});
    romoDropdownElem.after(caret);
  }

  return romoDropdownElem;
}

RomoSelect.prototype._buildOptionList = function(optionElems, listClass) {
  var list = $('<ul></ul>');
  list.addClass(listClass);
  $.each(optionElems, $.proxy(function(idx, elem) {
    if (elem.tagName === "OPTION") {
      list.append(this._buildOptionListItem(elem));
    } else if (elem.tagName === "OPTGROUP") {
      list.append(this._buildOptGroupListItem(elem));
      list.append(this._buildOptionList($(elem).children(), 'romo-select-optgroup'));
    }
  }, this));
  return list;
}

RomoSelect.prototype._buildOptionListItem = function(optionElem) {
  var opt = $(optionElem);
  var item = $('<li data-romo-select-item="opt"></li>');

  item.attr('data-romo-select-option-value', opt.attr('value'));
  item.text(opt.text().trim());
  if (opt.prop('selected')) {
    item.addClass('selected');
  }
  if (opt.attr('disabled') !== undefined) {
    item.addClass('disabled');
  }

  return item;
}

RomoSelect.prototype._buildOptGroupListItem = function(optGroupElem) {
  var optgroup = $(optGroupElem);
  var item = $('<li data-romo-select-item="optgroup"></li>');

  item.text(optgroup.attr('label'));

  return item;
}

RomoSelect.prototype._nextListItem = function() {
  var listOrItemSelector = 'UL, '+this.itemSelector;
  var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
  var next = this._nextAll(curr, listOrItemSelector).first();

  if (next.size() === 0) {
    next = this._nextAll(curr.closest('UL'), listOrItemSelector).first();
  }
  if (next.size() !== 0 && next[0].tagName === 'UL') {
    next = next.find(this.itemSelector).first()
  }
  if (next.size() === 0) {
    next = this.romoDropdown.bodyElem.find(this.itemSelector).first();
  }
  return next;
}

RomoSelect.prototype._prevListItem = function() {
  var listOrItemSelector = 'UL, '+this.itemSelector;
  var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
  var prev = this._prevAll(curr, listOrItemSelector).last();

  if (prev.size() === 0) {
    prev = this._prevAll(curr.closest('UL'), listOrItemSelector).last();
  }
  if (prev.size() !== 0 && prev[0].tagName === 'UL') {
    prev = prev.find(this.itemSelector).last()
  }
  if (prev.size() === 0) {
    prev = this.romoDropdown.bodyElem.find(this.itemSelector).last();
  }
  return prev;
}

RomoSelect.prototype._nextAll = function(elem, selector) {
  var els = $();
  var el = elem.next();
  while( el.length ) {
    if (selector === undefined || el.is(selector)) {
      els = els.add(el);
    }
    el = el.next();
  }
  return els;
}

RomoSelect.prototype._prevAll = function(elem, selector) {
  var els = $();
  var el = elem.prev();
  while( el.length ) {
    if (selector === undefined || el.is(selector)) {
      els = els.add(el);
    }
    el = el.prev();
  }
  return els;
}

RomoSelect.prototype._highlightItem = function(item) {
  this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
  item.addClass('romo-select-highlight');
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-select-auto="true"]').romoSelect();
});

$.fn.romoDatepicker = function() {
  return $.map(this, function(element) {
    return new RomoDatepicker(element);
  });
}

var RomoDatepicker = function(element) {
  this.elem = $(element);
  this.defaultFormat = 'yyyy-mm-dd'
  this.monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  this.defaultPrevClass = undefined;
  this.defaultNextClass = undefined;
  this.defaultIndicatorClass  = undefined;
  this.itemSelector = 'TD.romo-datepicker-day:not(.disabled)';
  this.calTable = $();
  this.date = undefined;
  this.today = new Date;

  this.doInit();
  this.doBindElem();
  this.doSetFormat();
  this.doSetDate(this.elem.val());
  this.doBindDropdown();
  this.doBuildUI();

  this.elem.trigger('datepicker:ready', [this]);
}

RomoDatepicker.prototype.doInit = function() {
  // override as needed
}

RomoDatepicker.prototype.doBindElem = function() {
  var elemWrapper = $('<div class="romo-datepicker-wrapper"></div>');
  elemWrapper.css({'display': this.elem.css('display')});

  this.elem.before(elemWrapper);
  elemWrapper.append(this.elem);

  // Removing this for now.  There are problems with clicking to cycle
  // calendar months causing a blur and closing the popup on you
  // Don't really want the focus handling without the blur to go with
  // it.  Just removing both for now.  :(
  // this.elem.on('focus', $.proxy(function(e) {
  //   if (this.elem.val() === '') {
  //     this.elem.trigger('datepicker:triggerPopupOpen', []);
  //   }
  // }, this));
  // this.elem.on('blur', $.proxy(function(e) {
  //   this.elem.trigger('datepicker:triggerPopupClose', []);
  // }, this));

  var indicatorClass = this.elem.data('romo-datepicker-indicator') || this.defaultIndicatorClass;
  if (indicatorClass !== undefined && indicatorClass !== 'none') {
    var indicator = $('<i class="romo-datepicker-indicator '+indicatorClass+'"></i>');
    indicator.css({'line-height': this.elem.css('height')});
    if (this.elem.prop('disabled') === true) {
      indicator.addClass('disabled');
    }
    indicator.on('click', $.proxy(this.onIndicatorClick, this));
    this.elem.css({'padding-right': '22px'});
    this.elem.after(indicator);
  }
}

RomoDatepicker.prototype.doSetFormat = function() {
  var format = this.elem.data('romo-datepicker-format') || this.defaultFormat;
  this.formatValues = this._parseFormatValues(format);
}

RomoDatepicker.prototype.doSetDate = function(value) {
  this.date = this._parseDate(value);
  if (this.date !== undefined) {
    this.elem.val(this._formatDate(this.date));
  } else {
    this.elem.val(value);
  }
}

RomoDatepicker.prototype.doBindDropdown = function() {
  this.elem.addClass('romo');
  this.elem.attr('data-romo-dropdown-disable-toggle', 'true');
  if (this.elem.data('romo-dropdown-width') === undefined) {
    this.elem.attr('data-romo-dropdown-width', 'elem');
  }
  if (this.elem.width() < 175) {
    this.elem.attr('data-romo-dropdown-width', '175px');
  }
  this.romoDropdown = this.elem.romoDropdown()[0];

  this.romoDropdown.doSetPopupZIndex(this.elem);
  this.romoDropdown.bodyElem.addClass('romo-datepicker-calendar');
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));

  this.romoDropdown.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('datepicker:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('datepicker:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('datepicker:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.elem.on('datepicker:triggerToggle', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('datepicker:triggerPopupOpen', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('datepicker:triggerPopupClose', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));
}

RomoDatepicker.prototype.doBuildUI = function() {
  this.calTable = this._buildCalendar();
  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this.calTable);

  this.calTable.find('.romo-datepicker-prev').on('click', $.proxy(this.onPrevClick, this));
  this.calTable.find('.romo-datepicker-next').on('click', $.proxy(this.onNextClick, this));
}

RomoDatepicker.prototype.doRefreshUI = function(date) {
  var rDate = date || this.date || (new Date);
  this._refreshCalendar(rDate);
  this.elem.trigger('datepicker:refresh', [rDate, this]);

  this.calTable.find(this.itemSelector).on('hover', $.proxy(this.onItemHover, this));
  this.calTable.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));
}

RomoDatepicker.prototype.doRefreshToPrevMonth = function() {
  var date = this.refreshDate || this.date || (new Date);
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() - 1;
  if (month < 0) {
    year -= 1;
    month = 11;
  }

  var pDate = this._UTCDate(year, month, 1);
  this.doRefreshUI(pDate);
  this.elem.trigger('datepicker:prevRefresh', [pDate, this]);
}

RomoDatepicker.prototype.doRefreshToNextMonth = function() {
  var date = this.refreshDate || this.date || (new Date);
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  if (month > 11) {
    year += 1;
    month = 0;
  }

  var nDate = this._UTCDate(year, month, 1);
  this.doRefreshUI(nDate);
  this.elem.trigger('datepicker:nextRefresh', [nDate, this]);
}

RomoDatepicker.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.elem.val();
  var newValue = this.calTable.find('TD.romo-datepicker-highlight').data('romo-datepicker-value');

  this.romoDropdown.doPopupClose();
  this.doSetDate(newValue);
  this.elem.focus();
  this.elem.trigger('datepicker:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this.elem.trigger('change');
    this.elem.trigger('datepicker:change', [newValue, prevValue, this]);
  }
}

RomoDatepicker.prototype.onIndicatorClick = function(e) {
  if (this.elem.prop('disabled') === false) {
    this.elem.focus();
    this.elem.trigger('datepicker:triggerPopupOpen');
  }
}

RomoDatepicker.prototype.onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this.doSetDate(this.elem.val());
    this.doRefreshUI();
  }
}

RomoDatepicker.prototype.onPopupClose = function(e) {
  this._highlightItem($());
}

RomoDatepicker.prototype.onItemHover = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this._highlightItem($(e.target));
}

RomoDatepicker.prototype.onItemClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doSelectHighlightedItem();
}

RomoDatepicker.prototype.onPrevClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doRefreshToPrevMonth();
}

RomoDatepicker.prototype.onNextClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doRefreshToNextMonth();
}

RomoDatepicker.prototype._refreshCalendar = function(date) {
  this.calTable.find('.romo-datepicker-title').html(this._buildCalendarTitle(date));
  this.calTable.find('tbody').empty().append(this._buildCalendarBody(date));
  this.refreshDate = date;
}

RomoDatepicker.prototype._buildCalendar = function() {
  var table = $('<table></table>');
  table.append(this._buildCalendarHeader());
  table.append($('<tbody></tbody>'));
  return table;
}

RomoDatepicker.prototype._buildCalendarHeader = function() {
  var prevClass = this.elem.data('romo-datepicker-prev') || this.defaultPrevClass;
  var nextClass = this.elem.data('romo-datepicker-next') || this.defaultNextClass;
  var header = $('<thead></thead');

  var row = $('<tr></tr>');
  var th = $('<th class="romo-datepicker-prev" title="Previous Month"></th>');
  if (prevClass) {
    th.append('<i class="'+prevClass+'"></i>');
  } else {
    th.text('<<');
  }
  row.append(th);
  row.append($('<th class="romo-datepicker-title" colspan="5"></th>'));
  var th = $('<th class="romo-datepicker-next" title="Next Month"></th>');
  if (nextClass) {
    th.append('<i class="'+nextClass+'"></i>');
  } else {
    th.text('>>');
  }
  row.append(th);
  header.append(row);

  row = $('<tr></tr>');
  row.append($('<th class="romo-datepicker-day">Su</th>'));
  row.append($('<th class="romo-datepicker-day">M</th>'));
  row.append($('<th class="romo-datepicker-day">T</th>'));
  row.append($('<th class="romo-datepicker-day">W</th>'));
  row.append($('<th class="romo-datepicker-day">Th</th>'));
  row.append($('<th class="romo-datepicker-day">F</th>'));
  row.append($('<th class="romo-datepicker-day">S</th>'));
  header.append(row);

  return header;
}

RomoDatepicker.prototype._buildCalendarTitle = function(date) {
  return this.monthNames[date.getUTCMonth()] + ' ' + date.getUTCFullYear().toString();
}

RomoDatepicker.prototype._buildCalendarBody = function(date) {
  var ty = this.today.getUTCFullYear();
  var tm = this.today.getUTCMonth();
  var td = this.today.getUTCDate();
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth();
  var day = date.getUTCDate();
  var fomdow = this._UTCDate(year, month, 1).getUTCDay(); // first-of-the-month day-of-the-week
  if (fomdow == 0) {
    fomdow = 7;  // don't start calendar on the first-of-the-month, show last week of prev month
  }
  var iDate = this._UTCDate(year, month, 1 - fomdow);
  var iWeek = 0;
  var html = [];

  while (iWeek < 6) { // render 6 weeks in the calendar
    var y = iDate.getUTCFullYear();
    var m = iDate.getUTCMonth();
    var d = iDate.getUTCDate();
    var dow = iDate.getUTCDay();
    var cls = [];

    if (dow === 0) {
      html.push('<tr>');
    }

    cls.push('romo-datepicker-day');
    if (dow === 0 || dow === 6) {
      cls.push('romo-datepicker-day-weekend');
    }
    if (y !== year || m !== month) {
      cls.push('romo-datepicker-day-other');
    }
    if (y === ty && m === tm && d === td) {
      cls.push('romo-datepicker-day-today');
    }
    if (this.date &&
        y === this.date.getUTCFullYear() &&
        m === this.date.getUTCMonth() &&
        d === this.date.getUTCDate()) {
      cls.push('selected');
    }

    html.push('<td');
    html.push(' class="'+cls.join(' ')+'"');
    var dt = this._formatDate(iDate);
    html.push(' title="'+dt+'"');
    html.push(' data-romo-datepicker-value="'+dt+'"');
    html.push('>');
    html.push(d.toString());
    html.push('</td>');

    if (dow === 6) {
      html.push('</tr>');
      iWeek += 1;
    }
    iDate.setUTCDate(iDate.getUTCDate()+1);
  }

  return $(html.join(''));
}

RomoDatepicker.prototype._highlightItem = function(item) {
  this.calTable.find('TD.romo-datepicker-highlight').removeClass('romo-datepicker-highlight');
  item.addClass('romo-datepicker-highlight');
}

RomoDatepicker.prototype._formatDate = function(date) {
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();

  return this.formatValues.reduce(function(prev, curr) {
    switch (curr) {
      case "yyyy":
      case "yyy":
        prev += year.toString();
        break;
      case "yy":
      case "y":
        prev += year.toString().slice(-2);
        break;
      case "mm":
        prev += ("00"+ month.toString()).slice(-2); // pad 2 with "0"s
        break;
      case "m":
        prev += month.toString();
        break;
      case "dd":
        prev += ("00"+ day.toString()).slice(-2); // pad 2 with "0"s
        break;
      case "d":
        prev += day.toString();
        break;
      default:
        prev += curr; // delimeter, pass-thru
    }
    return prev;
  }, '');
}

RomoDatepicker.prototype._parseFormatValues = function(value) {
  var regex, matches;

  regex = /^([m]{1,2})([^md]+)([d]{1,2})([^dy]+)([y]{2,4})$/; // mm dd yyyy or mm dd yy
  matches = this._regexMatches(value, regex);
  if (matches.length === 5) {
    return matches;
  }

  regex = /^([y]{3,4})([^ym]+)([m]{1,2})([^md]+)([d]{1,2})$/; // yyyy mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 5) {
    return matches;
  }

  return ['yyyy', '-', 'mm', '-', 'dd'];
}

RomoDatepicker.prototype._parseDate = function(value) {
  if (value.trim() === '') {
    return undefined;
  }

  var dateValues = this._parseDateValues(value.trim());
  if (dateValues.length === 0) {
    return undefined;
  }

  var year = parseInt(dateValues[0]);
  if (year < 0) {
    return undefined;
  }
  if (dateValues[0].length > 2 && year < 100) {
    return undefined;
  }
  if (dateValues[0].length === 2 && year < 100) {
    year = this._currentYear() - (this._currentYear() % 1000) + year;
  }

  var month = parseInt(dateValues[1]) - 1;
  if (month < 0 || month > 11) {
    return undefined;
  }

  var day = parseInt(dateValues[2]);
  var date = this._UTCDate(year, month, day);
  if (date.getUTCMonth() !== month) {
    return undefined;
  }

  return date;
}

RomoDatepicker.prototype._parseDateValues = function(value) {
  var regex, matches;

  regex = /^([0-9]{1,2})[^0-9]+([0-9]{1,2})[^0-9]+([0-9]{2,4})$/; // mm dd yyyy or mm dd yy
  matches = this._regexMatches(value, regex);
  if (matches.length === 3) {
    return [matches[2], matches[0], matches[1]];
  }

  regex = /^([0-9]{3,4})[^0-9]+([0-9]{1,2})[^0-9]+([0-9]{1,2})$/; // yyyy mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 3) {
    return matches;
  }

  regex = /^([0-9]{1,2})[^0-9]+([0-9]{1,2})$/; // mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 2) {
    return [this._currentYear(), matches[0], matches[1]];
  }

  return [];
}

RomoDatepicker.prototype._regexMatches = function(value, regex) {
  if (regex.test(value) === true) {
    return regex.exec(value).slice(1);
  }
  return [];
}

RomoDatepicker.prototype._currentYear = function() {
  return (new Date).getUTCFullYear();
}

RomoDatepicker.prototype._UTCDate = function(year, month, day) {
  return new Date(Date.UTC.apply(Date, [year, month, day]));
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-datepicker-auto="true"]').romoDatepicker();
});

$.fn.romoInline = function() {
  return $.map(this, function(element) {
    return new RomoInline(element);
  });
}

var RomoInline = function(element) {
  this.elem = $(element);
  this.toggleElem = $(this.elem.data('romo-inline-toggle'));

  this.elem.on('invoke:invoke', $.proxy(function(e, invoke) {
    this.doInvoke();
  }, this));
  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadSuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadError(xhr);
  }, this));

  this.doBindDismiss();
  this.doInit();
  this.elem.trigger('inline:ready', [this]);
}

RomoInline.prototype.doInit = function() {
  // override as needed
}

RomoInline.prototype.doInvoke = function() {
  this.elem.show();
  this.toggleElem.hide();
  this.elem.trigger('inline:invoke', [this]);
}

RomoInline.prototype.doLoadStart = function() {
  this.elem.html('');
  this.elem.trigger('inline:loadStart', [this]);
}

RomoInline.prototype.doLoadSuccess = function(data) {
  Romo.initHtml(this.elem, data);
  this.doBindDismiss();
  this.elem.trigger('inline:loadSuccess', [data, this]);
}

RomoInline.prototype.doLoadError = function(xhr) {
  this.elem.trigger('inline:loadError', [xhr, this]);
}

RomoInline.prototype.doBindDismiss = function() {
  var dismissElem = this.elem.find('[data-romo-inline-dismiss="true"]');
  dismissElem.unbind('click');
  dismissElem.on('click', $.proxy(this.onDismissClick, this));
}

RomoInline.prototype.onDismissClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.doDismiss();
}

RomoInline.prototype.doDismiss = function() {
  this.toggleElem.show();
  this.elem.hide();
  this.elem.trigger('inline:dismiss', [this]);
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-inline-auto="true"]').romoInline();
});


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

  var submitElement = this.elem.find('[data-romo-form-submit="true"]')[0];
  this.form = formElem.romoForm(submitElement)[0];
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-inlineForm-auto="true"]').romoInlineForm();
});


$.fn.romoModal = function() {
  return $.map(this, function(element) {
    return new RomoModal(element);
  });
}

var RomoModal = function(element) {
  this.elem = $(element);
  this.popupElem = $('<div class="romo-modal-popup"><div class="romo-modal-body"></div></div>');
  this.popupElem.appendTo('body');
  this.bodyElem = this.popupElem.find('> .romo-modal-body');
  this.contentElem = $();
  this.closeElem = $();
  this.dragElem = $();
  this.romoInvoke = this.elem.romoInvoke()[0];

  if (this.elem.data('romo-modal-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-modal-style-class'));
  }

  this.elem.unbind('click');
  this.elem.on('click', $.proxy(this.onToggleClick, this));
  this.elem.on('modal:triggerToggle', $.proxy(this.onToggleClick, this));
  this.elem.on('modal:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('modal:triggerPopupClose', $.proxy(this.onPopupClose, this));
  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadBodyStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadBodySuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadBodyError(xhr);
  }, this));

  this.doInit();
  this.doInitBody();

  this.elem.trigger('modal:ready', [this]);
}

RomoModal.prototype.doInit = function() {
  // override as needed
}

RomoModal.prototype.doInitBody = function() {
  this.doResetBody();

  this.contentElem = this.bodyElem.find('.romo-modal-content');
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }
  this.closeElem = this.popupElem.find('[data-romo-modal-close="true"]');
  this.dragElem = this.popupElem.find('[data-romo-modal-drag="true"]');

  var css = {
    'min-width':  this.elem.data('romo-modal-min-width'),
    'max-width':  this.elem.data('romo-modal-max-width'),
    'width':      this.elem.data('romo-modal-width'),
    'min-height': this.elem.data('romo-modal-min-height'),
    'max-height': this.elem.data('romo-modal-max-height'),
    'height':     this.elem.data('romo-modal-height')
  }
  if (css.width || css['max-width']) {
    css['overflow-x'] = 'auto'
  }
  if (css.height || css['max-height']) {
    css['overflow-y'] = 'auto'
  }
  this.contentElem.css(css);

  this.closeElem.unbind('click');
  this.closeElem.on('click', $.proxy(this.onPopupClose, this));

  this.dragElem.addClass('romo-modal-grab');
  this.dragElem.on('mousedown', $.proxy(this.onMouseDown, this));
}

RomoModal.prototype.doResetBody = function() {
  this.contentElem.css({
    'min-width':  '',
    'max-width':  '',
    'width':      '',
    'min-height': '',
    'max-height': '',
    'height':     '',
    'overflow':   ''
  });

  this.closeElem.off('click', $.proxy(this.onPopupClose, this));
}

RomoModal.prototype.doLoadBodyStart = function() {
  this.bodyElem.html('');
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('modal:loadBodyStart', [this]);
}

RomoModal.prototype.doLoadBodySuccess = function(data) {
  Romo.initHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('modal:loadBodySuccess', [data, this]);
}

RomoModal.prototype.doLoadBodyError = function(xhr) {
  this.elem.trigger('modal:loadBodyError', [xhr, this]);
}

RomoModal.prototype.onToggleClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doToggle();
  }
}

RomoModal.prototype.doToggle = function() {
  if (this.popupElem.hasClass('romo-modal-open')) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  } else {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
  this.elem.trigger('modal:toggle', [this]);
}

RomoModal.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if ((this.elem.hasClass('disabled') === false) &&
      (this.popupElem.hasClass('romo-modal-open') === false)) {
    setTimeout($.proxy(function() {
      this.doPopupOpen();
    }, this), 100);
  }
}

RomoModal.prototype.doPopupOpen = function() {
  this.romoInvoke.doInvoke();
  this.popupElem.addClass('romo-modal-open');
  this.doPlacePopupElem();

  // bind an event to close the popup when clicking away from the
  // popup.  Bind on a timeout to allow time for any toggle
  // click event to propagate.  If no timeout, we'll bind this
  // event, then the toggle click will propagate which will call
  // this event and immediately close the popup.
  setTimeout($.proxy(function() {
    $('body').on('click', $.proxy(this.onWindowBodyClick, this));
  }, this), 100);

  // bind "esc" keystroke to toggle close
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));

  // bind window resizes reposition modal
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('modal:popupOpen', [this]);
}

RomoModal.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    setTimeout($.proxy(function() {
      this.doPopupClose();
    }, this), 100);
  }
}

RomoModal.prototype.doPopupClose = function() {
  $('body').trigger('modal:popupclose');
  this.popupElem.removeClass('romo-modal-open');

  // unbind any event to close the popup when clicking away from it
  $('body').off('click', $.proxy(this.onWindowBodyClick, this));

  // unbind "esc" keystroke to toggle close
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));

  // unbind window resizes reposition modal
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('modal:popupClose', [this]);
}

RomoModal.prototype.onMouseDown = function(e) {
  $('body').trigger('modal:mousedown');
  e.preventDefault();
  e.stopPropagation();
  this.doDragStart(e);
  return false;
}

RomoModal.prototype.doDragStart = function(e) {
  this.dragElem.addClass('romo-modal-grabbing');
  this.dragElem.removeClass('romo-modal-grab');

  this.popupElem.css('width', this.popupElem.width()+'px');
  this.popupElem.css('height', this.popupElem.height()+'px');

  this._dragDiffX = e.clientX - this.popupElem[0].offsetLeft;
  this._dragDiffY = e.clientY - this.popupElem[0].offsetTop;
  $(window).on('mousemove', $.proxy(this.onMouseMove, this));
  $(window).on('mouseup',   $.proxy(this.onMouseUp, this));

  this.elem.trigger("modal:dragStart", [this]);
}

RomoModal.prototype.onMouseMove = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.doDragMove(e.clientX, e.clientY);
  return false;
}

RomoModal.prototype.doDragMove = function(clientX, clientY) {
  var placeX = clientX - this._dragDiffX;
  var placeY = clientY - this._dragDiffY;
  this.popupElem.css({ left: placeX+'px' , top: placeY+'px' });

  this.elem.trigger("modal:dragMove", [placeX, placeY, this]);
}

RomoModal.prototype.onMouseUp = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.doDragStop(e);
  return false;
}

RomoModal.prototype.doDragStop = function(e) {
  this.dragElem.addClass('romo-modal-grab');
  this.dragElem.removeClass('romo-modal-grabbing');
  this.popupElem.css('width', '');
  this.popupElem.css('height', '');

  $(window).off('mousemove', $.proxy(this.onMouseMove, this));
  $(window).off('mouseup',   $.proxy(this.onMouseUp, this));
  delete this._dragDiffX;
  delete this._dragDiffY;

  this.elem.trigger("modal:dragStop", [this]);
}

RomoModal.prototype.onWindowBodyClick = function(e) {
  // if not clicked on the popup elem
  if (e !== undefined && $(e.target).parents('.romo-modal-popup').size() === 0) {
    this.doPopupClose();
  }
  return true;
}

RomoModal.prototype.onWindowBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this.doPopupClose();
  }
  return true;
}

RomoModal.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoModal.prototype.doPlacePopupElem = function() {
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var min = 75;
  var centerTop  = $(window).height() / 2 - h / 2;
  var centerLeft = $(window).width()  / 2 - w / 2;
  var css = {};

  css.top = $(window).height() * 0.15;
  if (centerTop < css.top) { css.top = centerTop; }
  if (css.top < min) { css.top = min; }

  css.left = centerLeft;
  if (css.left < min) { css.left = min; }

  this.popupElem.css(css);
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-modal-auto="true"]').romoModal();
});

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

  var submitElement = this.modal.popupElem.find('[data-romo-form-submit="true"]')[0];
  this.form = formElem.romoForm(submitElement)[0];
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-modalForm-auto="true"]').romoModalForm();
});


$.fn.romoTooltip = function() {
  return $.map(this, function(element) {
    return new RomoTooltip(element);
  });
}

var RomoTooltip = function(element) {
  this.elem = $(element);
  this.popupElem = $('<div class="romo-tooltip-popup"><div class="romo-tooltip-arrow"></div><div class="romo-tooltip-body"></div></div>');
  this.popupElem.appendTo('body');
  this.doSetPopupZIndex(this.elem);
  this.arrowElem = this.popupElem.find('> .romo-tooltip-arrow');
  this.bodyElem  = this.popupElem.find('> .romo-tooltip-body');

  this.hoverState = 'out';
  this.delayEnter = 0;
  this.delayLeave = 0;
  if (this.elem.data('romo-tooltip-delay') !== undefined && this.elem.data('romo-tooltip-delay') !== '') {
    this.delayEnter = this.elem.data('romo-tooltip-delay');
    this.delayLeave = this.elem.data('romo-tooltip-delay');
  }
  if (this.elem.data('romo-tooltip-delay-enter') !== undefined && this.elem.data('romo-tooltip-delay-enter') !== '') {
    this.delayEnter = this.elem.data('romo-tooltip-delay-enter');
  }
  if (this.elem.data('romo-tooltip-delay-leave') !== undefined && this.elem.data('romo-tooltip-delay-leave') !== '') {
    this.delayLeave = this.elem.data('romo-tooltip-delay-leave');
  }

  this.popupPosition = this.elem.data('romo-tooltip-position') || 'top';
  this.popupElem.attr('data-romo-tooltip-position', this.popupPosition);
  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })
  this.bodyElem.addClass(this.elem.data('romo-tooltip-style-class'));
  this.bodyElem.css({
    'min-width':  this.elem.data('romo-tooltip-min-width'),
    'max-width':  this.elem.data('romo-tooltip-max-width'),
    'width':      this.elem.data('romo-tooltip-width'),
    'min-height': this.elem.data('romo-tooltip-min-height'),
    'max-height': this.elem.data('romo-tooltip-max-height'),
    'height':     this.elem.data('romo-tooltip-height')
  });
  this.bodyElem.html(this.elem.data('romo-tooltip-content') || '');

  // TODO: tooltip-href handling
  this.elem.on('mouseenter', $.proxy(this.onToggleEnter, this));
  this.elem.on('mouseleave', $.proxy(this.onToggleLeave, this));
  this.elem.on('tooltip:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('tooltip:triggerPopupClose', $.proxy(this.onPopupClose, this));
  $(window).on('resize', $.proxy(this.onResizeWindow, this))

  this.doInit();
  this.elem.trigger('tooltip:ready', [this]);
}

RomoTooltip.prototype.doInit = function() {
  // override as needed
}

RomoTooltip.prototype.onToggleEnter = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.hoverState = 'in';
  if (this.elem.hasClass('disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState ==='in') {
        this.doPopupOpen();
      }
    }, this), this.delayEnter);
  }
}

RomoTooltip.prototype.onToggleLeave = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.hoverState = 'out';
  if (this.elem.hasClass('disabled') === false) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(function() {
      if (this.hoverState === 'out') {
        this.doPopupClose();
      }
    }, this), this.delayLeave);
  }
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  if (this.elem.hasClass('disabled') === false && this.hoverState === 'in') {
    this.doPlacePopupElem();
  }
}

RomoTooltip.prototype.onPopupOpen = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doPopupOpen();
  }
}

RomoTooltip.prototype.doPopupOpen = function() {
  this.popupElem.addClass('romo-tooltip-open');
  this.doPlacePopupElem();

  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    $('body').on('modal:mousedown',  $.proxy(this.onModalPopupChange, this));
    $('body').on('modal:popupclose', $.proxy(this.onModalPopupChange, this));
  }
  $(window).on('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('tooltip:popupOpen', [this]);
}

RomoTooltip.prototype.onPopupClose = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doPopupClose();
  }
}

RomoTooltip.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-tooltip-open');

  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    $('body').off('modal:mousedown',  $.proxy(this.onModalPopupChange, this));
    $('body').off('modal:popupclose', $.proxy(this.onModalPopupChange, this));
  }
  $(window).off('resize', $.proxy(this.onResizeWindow, this));

  this.elem.trigger('tooltip:popupClose', [this]);
}

RomoTooltip.prototype.onModalPopupChange = function(e) {
  if (e !== undefined) {
    this.doPopupClose();
  }
  return true;
}

RomoTooltip.prototype.onResizeWindow = function(e) {
  this.doPlacePopupElem();
  return true;
}

RomoTooltip.prototype.doPlacePopupElem = function() {
  if (this.elem.parents('.romo-modal-popup').size() !== 0) {
    this.popupElem.css({'position': 'fixed'});
  }

  var pos = $.extend({}, this.elem[0].getBoundingClientRect(), this.elem.offset());
  var w = this.popupElem[0].offsetWidth;
  var h = this.popupElem[0].offsetHeight;
  var pad = 6 + 1; // arrow size + spacing
  var offset = {};

  switch (this.popupPosition) {
    case 'top':
      $.extend(offset, { top: pos.top - h - pad, left: pos.left + pos.width / 2 - w / 2 });
      break;
    case 'bottom':
      $.extend(offset, { top: pos.top + pos.height + pad, left: pos.left + pos.width / 2 - w / 2 });
      break;
    case 'left':
      $.extend(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left - w - pad });
      break;
    case 'right':
      $.extend(offset, { top: pos.top + pos.height / 2 - h / 2, left: pos.left + pos.width + pad });
      break;
  }

  this.popupElem.offset(offset);
}

RomoTooltip.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  this.popupElem.css({'z-index': relativeZIndex + 1100}); // see z-index.css
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-tooltip-auto="true"]').romoTooltip();
});

//fgnass.github.com/spin.js#v2.0.1
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});

$.fn.romoIndicator = function() {
  return $.map(this, function(element) {
    return new RomoIndicator(element);
  });
}

var RomoIndicator = function(element) {
  this.elem = $(element);
  this.spinnerOpts = {
    lines: 11, // The number of lines to draw
    width: 2, // The line thickness
    length: parseInt(this.elem.css('font-size')) / 2, // The length of each line
    radius: parseInt(this.elem.css('font-size')) / 3, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: this.elem.css('color'), // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 1000, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%'// Left position relative to parent
  };

  this.doInit();
  this.spinner = new Spinner(this.spinnerOpts);

  this.elemHtml = this.elem.html();
  this.elem.css({
    'position': 'relative',
    'width':    this.elem.width(),
    'height':   this.elem.height(),
  });
  this.elem.on('indicator:triggerStart', $.proxy(this.onStart, this));
  this.elem.on('indicator:triggerStop', $.proxy(this.onStop, this));

  this.elem.trigger('indicator:ready', [this]);
}

RomoIndicator.prototype.doInit = function() {
  // override as needed
}

RomoIndicator.prototype.onStart = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doStart();
  }
}

RomoIndicator.prototype.onStop = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doStop();
  }
}

RomoIndicator.prototype.doStart = function() {
  this.elem.html('');
  this.spinner.spin(this.elem[0]);
  this.elem.trigger('indicator:start', [this]);
}

RomoIndicator.prototype.doStop = function() {
  this.spinner.stop();
  this.elem.html(this.elemHtml);
  this.elem.trigger('indicator:stop', [this]);
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-indicator-auto="true"]').romoIndicator();
});
