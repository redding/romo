(function() {
  var Romo = function() {
    this._eventCallbacks = [];
  }

  Romo.prototype.doInit = function() {
    this.parentChildElems = new RomoParentChildElems();

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

  Romo.prototype.getComputedStyle = function(node, styleName) {
    return window.getComputedStyle(node, null).getPropertyValue(styleName);
  }

  Romo.prototype.parseZIndex = function(elem) {
    // for the case where z-index is set directly on the elem
    var val = this.parseElemZIndex(elem);
    if (val !== 0) {
      return val;
    }

    // for the case where z-index is inherited from a parent elem
    var parentIndexes = this.toArray(elem.parents()).reduce($.proxy(function(prev, curr) {
      var pval = this.parseElemZIndex($(curr));
      if (pval !== 0) {
        prev.push(pval);
      }
      return prev;
    }, this), []);
    parentIndexes.push(0); // in case z-index is 'auto' all the way up
    return parentIndexes[0];
  }

  Romo.prototype.parseElemZIndex = function(elem) {
    var val = parseInt(this.getComputedStyle(elem[0], "z-index"));
    if (!isNaN(val)) {
      return val;
    }
    return 0;
  }

  // elem handling

  Romo.prototype.toArray = function(elems) {
    // converts a collection of elements `$()` to an array of nodes
    return $.map(elems, function(node){ return node; })
  }

  Romo.prototype.selectNext = function(elem, selector) {
    // like `$().next()`, but takes a selector; returns first next elem that
    // matches the given selector or an empty collection if non matches
    var el = elem.next();
    while(el.length) {
      if (selector === undefined || el.is(selector)) {
        return el;
      }
      el = el.next();
    }
    return el;
  }

  Romo.prototype.selectPrev = function(elem, selector) {
    // like `$().prev()`, but takes a selector; returns first prev elem that
    // matches the given selector or an empty collection if non matches
    var el = elem.prev();
    while(el.length) {
      if (selector === undefined || el.is(selector)) {
        return el;
      }
      el = el.prev();
    }
    return el;
  }

  // input handling

  Romo.prototype.nonInputTextKeyCodes = function() {
    // https://css-tricks.com/snippets/javascript/javascript-keycodes/
    return [
      9,   /* tab */
      13,  /* enter */
      16,  /* shift */
      17,  /* ctrl */
      18,  /* alt */
      19,  /* pausebreak */
      20,  /* capslock */
      27,  /* escape */
      33,  /* pageup */
      34,  /* pagedown */
      35,  /* end */
      36,  /* home */
      37,  /* leftarrow */
      38,  /* uparrow */
      39,  /* rightarrow */
      40,  /* downarrow */
      45,  /* insert */
      46,  /* delete */
      91,  /* leftwindowkey */
      92,  /* rightwindowkey */
      93,  /* selectkey */
      112, /* f1 */
      113, /* f2 */
      114, /* f3 */
      115, /* f4 */
      116, /* f5 */
      117, /* f6 */
      118, /* f7 */
      119, /* f8 */
      120, /* f9 */
      121, /* f10 */
      122, /* f11 */
      123, /* f12 */
      144, /* numlock */
      145, /* scrolllock */
    ];
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

var RomoParentChildElems = function() {
  this.attrName = 'romo-parent-elem-id';
  this.elemId   = 0;
  this.elems    = {};

  var childRemovedObserver = new MutationObserver($.proxy(function(mutationRecords) {
    mutationRecords.forEach($.proxy(function(mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.removedNodes.length > 0) {
        $.each($(mutationRecord.removedNodes), $.proxy(function(idx, node) {
          this.remove($(node));
        }, this));
      }
    }, this));
  }, this));

  childRemovedObserver.observe($('body')[0], {
    childList: true,
    subtree:   true
  });
}

RomoParentChildElems.prototype.add = function(parentElem, childElems) {
  parentElem.attr('data-'+this.attrName, this._push(childElems, parentElem.data(this.attrName)));
}

RomoParentChildElems.prototype.remove = function(nodeElem) {
  if(nodeElem.data(this.attrName) !== undefined) {
    this._removeChildElems(nodeElem);  // node is a parent elem itself
  }
  $.each(nodeElem.find('[data-'+this.attrName+']'), $.proxy(function(idx, parent) {
    this._removeChildElems($(parent));
  }, this));
}

// private

RomoParentChildElems.prototype._removeChildElems = function(parentElem) {
  $.each(this._pop(parentElem.data(this.attrName)), function(idx, elem) {
    $(elem).remove();
  });
};

RomoParentChildElems.prototype._push = function(items, id) {
  if (id === undefined) {
    id = String(this.elemId++);
  }
  if (this.elems[id] === undefined) {
    this.elems[id] = []
  }
  items.forEach($.proxy(function(item){ this.elems[id].push(item) }, this));
  return id;
};

RomoParentChildElems.prototype._pop = function(id) {
  var items = this.elems[id];
  delete this.elems[id];
  return items || [];
}
