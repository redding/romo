var Romo = function() {
  this._eventCallbacks = [];
}

// TODO: rework w/o jQuery
Romo.prototype.doInit = function() {
  this.parentChildElems = new RomoParentChildElems();

  $.each(this._eventCallbacks, function(idx, eventCallback) {
    $('body').on(eventCallback.eventName, eventCallback.callback);
  });

  this.triggerInitUI($('body'));
}

// element finders

Romo.prototype.f = function(selector) {
  return this.array(document.querySelectorAll(selector));
}

Romo.prototype.find = function(parentElem, selector) {
  return this.array(parentElem.querySelectorAll(selector));
}

Romo.prototype.is = function(elem, selector) {
  return (
    elem.matches               ||
    elem.matchesSelector       ||
    elem.msMatchesSelector     ||
    elem.mozMatchesSelector    ||
    elem.webkitMatchesSelector ||
    elem.oMatchesSelector
  ).call(elem, selector);
};

Romo.prototype.children = function(parentElem) {
  return this.array(parentElem.children);
}

Romo.prototype.parent = function(childElem) {
  return childElem.parentNode;
}

Romo.prototype.parents = function(childElem, selector) {
  var parentElem = this.parent(childElem);
  if (parentElem) {
    if (!selector || Romo.is(parentElem, selector)) {
      if (Romo.is(parentElem, 'body')) {
        return [parentElem];
      } else {
        return [parentElem].concat(this.parents(parentElem, selector));
      }
    } else {
      if (Romo.is(parentElem, 'body')) {
        return [];
      } else {
        return this.parents(parentElem, selector);
      }
    }
  } else {
    return [];
  }
}

Romo.prototype.closest = function(fromElem, selector) {
  if (fromElem.closest) {
    return fromElem.closest(selector);
  } else {
    var matchesSelector = fromElem.matches ||
                          fromElem.webkitMatchesSelector ||
                          fromElem.mozMatchesSelector ||
                          fromElem.msMatchesSelector;
    while (fromElem) {
      if (matchesSelector.call(fromElem, selector)) {
        return fromElem;
      } else {
        fromElem = fromElem.parentElement;
      }
    }
    return undefined;
  }
}

Romo.prototype.siblings = function(elem) {
  return Array.prototype.filter.call(elem.parentNode.children, function(childElem) {
    return childElem !== elem;
  });
}

Romo.prototype.prev = function(fromElem) {
  return fromElem.previousElementSibling;
}

Romo.prototype.next = function(fromElem) {
  return fromElem.nextElementSibling;
}

// TODO: rework w/o jQuery
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

// TODO: rework w/o jQuery
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

// attributes, styles, classes

Romo.prototype.attr = function(elem, attrName) {
  return elem.getAttribute ? elem.getAttribute(attrName) : undefined;
}

Romo.prototype.setAttr = function(elem, attrName, attrValue) {
  if (elem.setAttribute) {
    elem.setAttribute(attrName, attrValue);
  }
  return attrValue;
}

Romo.prototype.data = function(elem, dataName) {
  return this._deserializeValue(this.attr(elem, "data-"+dataName));
}

Romo.prototype.setData = function(elem, dataName, dataValue) {
  return this.setAttr(elem, "data-"+dataName, String(dataValue));
}

Romo.prototype.style = function(elem, styleName) {
  return elem.style[styleName];
}

Romo.prototype.setStyle = function(elem, styleName, styleValue) {
  elem.style[styleName] = styleValue;
  return styleValue;
}

Romo.prototype.css = function(elem, styleName) {
  return window.getComputedStyle(elem, null).getPropertyValue(styleName);
}

Romo.prototype.addClass = function(elem, className) {
  elem.classList.add(className);
  return className;
}

Romo.prototype.removeClass = function(elem, className) {
  elem.classList.remove(className);
  return className;
}

Romo.prototype.toggleClass = function(elem, className) {
  elem.classList.toggle(className);
  return className;
}

Romo.prototype.hasClass = function(elem, className) {
  return elem.classList.contains(className);
}

Romo.prototype.show = function(elem) {
  elem.style.display = '';
}

Romo.prototype.hide = function(elem) {
  elem.style.display = 'none';
}

Romo.prototype.offset = function(elem) {
  var rect = elem.getBoundingClientRect();
  return {
    top:  rect.top  + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

Romo.prototype.scrollTop = function(elem) {
  return ('scrollTop' in elem) ? elem.scrollTop : elem.pageYOffset;
}

Romo.prototype.scrollLeft = function(elem) {
  return ('scrollLeft' in elem) ? elem.scrollLeft : elem.pageXOffset;
}

Romo.prototype.setScrollTop = function(elem, value) {
  if ('scrollTop' in elem) {
    elem.scrollTop = value;
  } else {
    elem.scrollTo(elem.scrollX, value);
  }
}

Romo.prototype.setScrollLeft = function(elem, value) {
  if ('scrollLeft' in elem) {
    elem.scrollLeft = value;
  } else {
    elem.scrollTo(value, elem.scrollY);
  }
}

// TODO: rework w/o jQuery
Romo.prototype.getComputedStyle = function(node, styleName) {
  return window.getComputedStyle(node, null).getPropertyValue(styleName);
}

// TODO: rework w/o jQuery
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

// TODO: rework w/o jQuery
Romo.prototype.parseElemZIndex = function(elem) {
  var val = parseInt(this.getComputedStyle(elem[0], "z-index"));
  if (!isNaN(val)) {
    return val;
  }
  return 0;
}

// DOM manipulation

Romo.prototype.elems = function(htmlString) {
  var context = document.implementation.createHTMLDocument();

  // Set the base href for the created document so any parsed
  // elements with URLs are based on the document's URL
  var base = context.createElement('base');
  base.href = document.location.href;
  context.head.appendChild(base);

  context.body.innerHTML = htmlString;
  return this.array(context.body.children);
}

Romo.prototype.remove = function(elem) {
  return elem.parentNode.removeChild(elem);
}

Romo.prototype.replace = function(elem, replacementElem) {
  elem.parentNode.replaceChild(replacementElem, elem);
  return replacementElem;
}

Romo.prototype.replaceHtml = function(elem, htmlString) {
  return this.replace(elem, this.elems(htmlString)[0]);
}

Romo.prototype.update = function(elem, childElems) {
  elem.innerHTML = '';
  return childElems.map(function(childElem) {
    return elem.appendChild(childElem);
  });
}

Romo.prototype.updateHtml = function(elem, htmlString) {
  return this.update(elem, this.elems(htmlString));
}

Romo.prototype.prepend = function(elem, childElems) {
  var refElem = elem.firstChild;
  return childElems.reverse().map(function(childElem) {
    refElem = elem.insertBefore(childElem, refElem);
    return refElem;
  }).reverse();
}

Romo.prototype.prependHtml = function(elem, htmlString) {
  return this.prepend(elem, this.elems(htmlString));
}

Romo.prototype.append = function(elem, childElems) {
  return childElems.map(function(childElem) {
    return elem.appendChild(childElem);
  });
}

Romo.prototype.appendHtml = function(elem, htmlString) {
  return this.append(elem, this.elems(htmlString));
}

Romo.prototype.before = function(elem, siblingElems) {
  var refElem    = elem;
  var parentElem = elem.parentNode;
  return siblingElems.reverse().map(function(siblingElem) {
    refElem = parentElem.insertBefore(siblingElem, refElem);
    return refElem;
  }).reverse();
}

Romo.prototype.beforeHtml = function(elem, htmlString) {
  return this.before(elem, this.elems(htmlString));
}

Romo.prototype.after = function(elem, siblingElems) {
  var refElem    = this.next(elem);
  var parentElem = elem.parentNode;
  return siblingElems.map(function(siblingElem) {
    return parentElem.insertBefore(siblingElem, refElem);
  });
}

Romo.prototype.afterHtml = function(elem, htmlString) {
  return this.after(elem, this.elems(htmlString));
}

// init UI (TODO: rework w/o jQuery)

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

// param serialization (TODO: rework w/o jQuery)

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

// AJAX

Romo.prototype.ajax = function(settings) {
  var httpMethod = (settings.type || 'GET').toUpperCase();
  var xhrUrl     = settings.url || window.location.toString();
  var xhrData    = settings.data ? settings.data : null
  if (xhrData && httpMethod === 'GET') {
    var xhrQuery = Romo.param(xhrData);
    if (xhrQuery !== '') {
      xhrUrl = (xhrUrl + '&' + xhrQuery).replace(/[&?]{1,2}/, '?');
    }
    xhrData = null;
  }

  var xhr = new XMLHttpRequest();
  xhr.open(httpMethod, xhrUrl, true, settings.username, settings.password);
  if (settings.responseType === 'arraybuffer' || settings.responseType === 'blob') {
    xhr.responseType = settings.responseType;
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  for (name in settings.headers) {
    xhr.setRequestHeader(name, settings.headers[name]);
  }
  if (settings.contentType) {
    xhr.setRequestHeader('Content-Type', settings.contentType);
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        if (xhr.responseType === 'arraybuffer' || xhr.responseType === 'blob') {
          settings.success.call(window, xhr.response, xhr.status, xhr, settings);
        } else {
          settings.success.call(window, xhr.responseText, xhr.status, xhr, settings);
        }
      } else {
        settings.error.call(window, xhr.statusText || null, xhr.status, xhr, settings);
      }
    }
  };
  xhr.send(xhrData);
},

// events

Romo.prototype.on = function(elem, eventName, fn) {
  // var proxyFn = function(e) {
  //   var result = fn.apply(elem, e.detail === undefined ? [e] : [e].concat(e.detail));
  //   if (result === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   return result;
  // }
  // proxyFn._romofid = this._fn(fn)._romofid;

  // var key = this._handlerKey(elem, eventName, proxyFn);
  // if (!this._handlers[key]) {
  //   elem.addEventListener(eventName, proxyFn);
  //   this._handlers[key] = proxyFn;
  // }

  // Giant Hack to temporarily support jQuery and non-jQuery triggers
  // see: https://bugs.jquery.com/ticket/11047
  $(elem).on(eventName, fn);
}

Romo.prototype.off = function(elem, eventName, fn) {
  // var key     = this._handlerKey(elem, eventName, fn);
  // var proxyFn = this._handlers[key];
  // if (proxyFn) {
  //   elem.removeEventListener(eventName, proxyFn);
  //   this._handlers[key] = undefined;
  // }

  // Giant Hack to temporarily support jQuery and non-jQuery triggers
  // see: https://bugs.jquery.com/ticket/11047
  $(elem).off(eventName, fn);
}

Romo.prototype.trigger = function(elem, customEventName, args) {
  // var event = undefined;
  // if (typeof window.CustomEvent === "function") {
  //   event = new CustomEvent(customEventName, { detail: args });
  // } else {
  //   event = document.createEvent('CustomEvent');
  //   event.initCustomEvent(customEventName, false, false, args);
  // }
  // elem.dispatchEvent(event);
  $(elem).trigger(customEventName, args);
}

Romo.prototype.ready = function(eventHandlerFn) {
  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    eventHandlerFn();
  } else {
    this.on(document, 'DOMContentLoaded', eventHandlerFn);
  }
}

// utils

Romo.prototype.array = function(collection) {
  return Array.prototype.slice.call(collection);
}

Romo.prototype.proxy = function(fn, context) {
  var proxyFn    = fn.bind(context);
  proxyFn._romofid = this._fn(fn)._romofid;

  return proxyFn;
}

// TODO: rework w/o jQuery
Romo.prototype.toArray = function(elems) {
  // converts a collection of elements `$()` to an array of nodes
  return $.map(elems, function(node){ return node; })
}

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

// private helpers

Romo.prototype._eid = 1;
Romo.prototype._fid = 1;

Romo.prototype._el = function(elem) {
  elem._romoeid || (
    elem._romoeid = (this.attr(elem, 'data-romo-eid') || this.setAttr(elem, 'data-romo-eid', this._eid++))
  );
  return elem;
}

Romo.prototype._fn = function(fn) {
  fn._romofid || (fn._romofid = this._fid++);
  return fn;
}

Romo.prototype._handlers = {};

Romo.prototype._handlerKey = function(elem, eventName, fn) {
  return 'eid--'+this._el(elem)._romoeid+'--'+eventName+'--fid--'+this._fn(fn)._romofid;
}

Romo.prototype._deserializeValue = function(value) {
  try {
    if (value === "true")      { return true;       } // "true"       => true
    if (value === "false")     { return false;      } // "false"      => false
    if (value === "undefined") { return undefined;  } // "undefined"  => undefined
    if (value === "null")      { return null;       } // "null"       => null
    if (+value+"" === value)   { return +value;     } // "42.5"       => 42.5
    if (/^[\[\{]/.test(value)) { JSON.parse(value); } // JSON         => parse if valid
    return value;                                     // String       => self
  } catch(e) {
    return value
  }
}

// TODO: rework w/o jQuery
Romo.prototype._addEventCallback = function(name, callback) {
  this._eventCallbacks.push({ eventName: name, callback:  callback });
}

// RomoParentChildElems (TODO: rework w/o jQuery)

var RomoParentChildElems = function() {
  this.attrName = 'romo-parent-elem-id';
  this.elemId   = 0;
  this.elems    = {};

  var parentRemovedObserver = new MutationObserver($.proxy(function(mutationRecords) {
    mutationRecords.forEach($.proxy(function(mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.removedNodes.length > 0) {
        $.each($(mutationRecord.removedNodes), $.proxy(function(idx, node) {
          this.remove($(node));
        }, this));
      }
    }, this));
  }, this));

  parentRemovedObserver.observe($('body')[0], {
    childList: true,
    subtree:   true
  });
}

RomoParentChildElems.prototype.add = function(parentElem, childElems) {
  parentElem.attr('data-'+this.attrName, this._push(childElems, parentElem.data(this.attrName)));
}

RomoParentChildElems.prototype.remove = function(nodeElem) {
  if (nodeElem.data('romo-parent-removed-observer-disabled') !== true) {
    if (nodeElem.data(this.attrName) !== undefined) {
      this._removeChildElems(nodeElem);  // node is a parent elem itself
    }
    $.each(nodeElem.find('[data-'+this.attrName+']'), $.proxy(function(idx, parent) {
      this._removeChildElems($(parent));
    }, this));
  }
}

// private RomoParentChildElems

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

// Init

window.Romo = new Romo();

// TODO: rework w/o jQuery
$(function() {
  Romo.doInit();
})
