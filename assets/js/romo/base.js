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

  Romo.prototype.triggerInitUI = function(elems) {
    elems.trigger('romo:initUI');
  }

  Romo.prototype.initUIElems = function(e, selector) {
    var elems = $(e.target).find(selector).get();
    if ($(e.target).is(selector)) {
      elems.push(e.target)
    }
    return $(elems);
  }

  Romo.prototype.initHtml = function(elems, data) {
    elems.each($.proxy(function(index, elem) {
      var htmlElems = $(data)
      $(elem).html(htmlElems);
      this.triggerInitUI(htmlElems);
    }, this));
  }

  Romo.prototype.initReplace = function(elems, data) {
    elems.each($.proxy(function(index, elem) {
      var replacementElem = $(data);
      $(elem).replaceWith(replacementElem);
      this.triggerInitUI(replacementElem);
    }, this));
  }

  Romo.prototype.initPrepend = function(elems, data) {
    elems.each($.proxy(function(index, elem) {
      var prependedElem = $(data);
      $(elem).prepend(prependedElem);
      this.triggerInitUI(prependedElem);
    }, this));
  }

  Romo.prototype.initAppend = function(elems, data) {
    elems.each($.proxy(function(index, elem) {
      var appendedElem = $(data);
      $(elem).append(appendedElem);
      this.triggerInitUI(appendedElem);
    }, this));
  }

  Romo.prototype.initBefore = function(elems, data) {
    elems.each($.proxy(function(index, elem) {
      var insertedElem = $(data);
      $(elem).before(insertedElem);
      this.triggerInitUI(insertedElem);
    }, this));
  }

  Romo.prototype.initAfter = function(elems, data) {
    elems.each($.proxy(function(index, elem) {
      var insertedElem = $(data);
      $(elem).after(insertedElem);
      this.triggerInitUI(insertedElem);
    }, this));
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
