var Romo = function() {
  this._initUICallbacks = [];
}

Romo.prototype.doInit = function() {
  this.parentChildElems = new RomoParentChildElems();

  this.triggerInitUI(Romo.f('body')[0]);
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
    while (fromElem) {
      if (Romo.is(fromElem, selector)) {
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

Romo.prototype.prev = function(fromElem, selector) {
  var elem = fromElem.previousElementSibling;
  if (elem === null) {
    elem = undefined;
  }

  while(elem) {
    if (!selector || Romo.is(elem, selector)) {
      return elem;
    }
    elem = elem.previousElementSibling;
    if (elem === null) {
      elem = undefined;
    }
  }
  return elem;
}

Romo.prototype.next = function(fromElem, selector) {
  var elem = fromElem.nextElementSibling;
  if (elem === null) {
    elem = undefined;
  }

  while(elem) {
    if (!selector || Romo.is(elem, selector)) {
      return elem;
    }
    elem = elem.nextElementSibling;
    if (elem === null) {
      elem = undefined;
    }
  }
  return elem;
}

// attributes, styles, classes

Romo.prototype.attr = function(elem, attrName) {
  var a = elem.getAttribute(attrName);
  if (a === null) {
    return undefined;
  } else {
    return a;
  }
}

Romo.prototype.setAttr = function(elem, attrName, attrValue) {
  var v = String(attrValue);
  elem.setAttribute(attrName, v);
  return v;
}

Romo.prototype.rmAttr = function(elem, attrName) {
  elem.removeAttribute(attrName);
}

Romo.prototype.data = function(elem, dataName) {
  return this._deserializeValue(this.attr(elem, "data-"+dataName));
}

Romo.prototype.setData = function(elem, dataName, dataValue) {
  return this.setAttr(elem, "data-"+dataName, dataValue);
}

Romo.prototype.rmData = function(elem, dataName) {
  this.rmAttr(elem, "data-"+dataName);
}

Romo.prototype.style = function(elem, styleName) {
  return elem.style[styleName];
}

Romo.prototype.setStyle = function(elem, styleName, styleValue) {
  elem.style[styleName] = styleValue;
  return styleValue;
}

Romo.prototype.rmStyle = function(elem, styleName) {
  elem.style[styleName] = '';
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

Romo.prototype.getComputedStyle = function(elem, styleName) {
  return window.getComputedStyle(elem, null).getPropertyValue(styleName);
}

Romo.prototype.parseZIndex = function(elem) {
  // for the case where z-index is set directly on the elem
  var val = this.parseElemZIndex(elem);
  if (val !== 0) {
    return val;
  }

  // for the case where z-index is inherited from a parent elem
  var parentIndexes = Romo.parents(elem).forEach(Romo.proxy(function(parentElem) {
    var pval = this.parseElemZIndex(currElem);
    if (pval !== 0) {
      return pval;
    }
  }, this));

  // z-index is 'auto' all the way up
  return 0;
}

Romo.prototype.parseElemZIndex = function(elem) {
  var val = parseInt(this.getComputedStyle(elem, "z-index"));
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

Romo.prototype.initReplace = function(elem, replacementElem) {
  return this.triggerInitUI(this.replace(elem, replacementElem));
}

Romo.prototype.initReplaceHtml = function(elem, htmlString) {
  return this.triggerInitUI(this.replaceHtml(elem, htmlString));
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

Romo.prototype.initUpdate = function(elem, childElems) {
  return this.triggerInitUI(this.update(elem, childElems));
}

Romo.prototype.initUpdateHtml = function(elem, htmlString) {
  return this.triggerInitUI(this.updateHtml(elem, htmlString));
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

Romo.prototype.initPrepend = function(elem, childElems) {
  return this.triggerInitUI(this.prepend(elem, childElems));
}

Romo.prototype.initPrependHtml = function(elem, htmlString) {
  return this.triggerInitUI(this.prependHtml(elem, htmlString));
}

Romo.prototype.append = function(elem, childElems) {
  return childElems.map(function(childElem) {
    return elem.appendChild(childElem);
  });
}

Romo.prototype.appendHtml = function(elem, htmlString) {
  return this.append(elem, this.elems(htmlString));
}

Romo.prototype.initAppend = function(elem, childElems) {
  return this.triggerInitUI(this.append(elem, childElems));
}

Romo.prototype.initAppendHtml = function(elem, htmlString) {
  return this.triggerInitUI(this.appendHtml(elem, htmlString));
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

Romo.prototype.initBefore = function(elem, siblingElems) {
  return this.triggerInitUI(this.before(elem, siblingElems));
}

Romo.prototype.initBeforeHtml = function(elem, htmlString) {
  return this.triggerInitUI(this.beforeHtml(elem, htmlString));
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

Romo.prototype.initAfter = function(elem, siblingElems) {
  return this.triggerInitUI(this.after(elem, siblingElems));
}

Romo.prototype.initAfterHtml = function(elem, htmlString) {
  return this.triggerInitUI(this.afterHtml(elem, htmlString));
}

// init UI

Romo.prototype.onInitUI = function(fn) {
  this._initUICallbacks.push(fn);
}

Romo.prototype.triggerInitUI = function(onElems) {
  var elems = undefined;
  if (Array.isArray(onElems)) {
    elems = onElems;
  } else {
    elems = [onElems];
  }
  elems.forEach(Romo.proxy(function(elem) {
    this._initUICallbacks.forEach(function(fn) {
      setTimeout(function() {
        fn(elem);
      }, 1);
    });
  }, this));

  return onElems;
}

Romo.prototype.initUIElems = function(elem, selector) {
  var elems = Romo.find(elem, selector);
  if (Romo.is(elem, selector)) {
    elems.unshift(elem);
  }
  return elems;
}

// page handling

Romo.prototype.reloadPage = function() {
  window.location = window.location;
}

Romo.prototype.redirectPage = function(redirectUrl) {
  window.location = redirectUrl;
}

// param serialization

// Romo.param({ a: 2, b: 'three', c: 4 });                         #=> "a=2&b=three&c=4"
// Romo.param({ a: [ 2, 3, 4 ] });                                 #=> "a[]=2&a[]=3&a[]=4"
// Romo.param({ a: 2, b: '', c: 4 });                              #=> "a=2&b=&c=4"
// Romo.param({ a: 2, b: '', c: 4 }, { removeEmpty: true });       #=> "a=2&c=4"
// Romo.param({ a: [ 2, 3, 4 ], b: [''] });                        #=> "a[]=2&a[]=3&a[]=4&b[]="
// Romo.param({ a: [ 2, 3, 4 ], b: [''] }, { removeEmpty: true }); #=> "a[]=2&a[]=3&a[]=4"
// Romo.param({ a: '123-ABC' });                                   #=> "a=123%2DABC"
// Romo.param({ a: '123-ABC' }, { decodeValues: true });           #=> "a=123-ABC"

Romo.prototype.param = function(data, opts) {
  var keyValues = [];

  var processKeyValue = function(keyValues, key, value, opts) {
    var v = String(value);
    if (!opts || !opts.removeEmpty || v !== '') {
      keyValues.push([key, v]);
    }
  }

  for (var key in data) {
    var value = data[key];
    if (Array.isArray(value)) {
      if (!opts || !opts.removeEmpty || value.length !== 0) {
        value.forEach(function(listValue) {
          processKeyValue(keyValues, key+'[]', listValue, opts);
        })
      }
    } else {
      processKeyValue(keyValues, key, value, opts);
    }
  }

  var paramString = keyValues.map(function(keyValue){
    return keyValue.join('=');
  }).join('&');

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
  var proxyFn = function(e) {
    var result = fn.apply(elem, e.detail === undefined ? [e] : [e].concat(e.detail));
    if (result === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    return result;
  }
  proxyFn._romofid = this._fn(fn)._romofid;

  var key = this._handlerKey(elem, eventName, proxyFn);
  if (!this._handlers[key]) {
    elem.addEventListener(eventName, proxyFn);
    this._handlers[key] = proxyFn;
  }
}

Romo.prototype.off = function(elem, eventName, fn) {
  var key     = this._handlerKey(elem, eventName, fn);
  var proxyFn = this._handlers[key];
  if (proxyFn) {
    elem.removeEventListener(eventName, proxyFn);
    this._handlers[key] = undefined;
  }
}

Romo.prototype.trigger = function(elem, customEventName, args) {
  var event = undefined;
  if (typeof window.CustomEvent === "function") {
    event = new CustomEvent(customEventName, { detail: args });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(customEventName, false, false, args);
  }
  elem.dispatchEvent(event);
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

Romo.prototype.assign = function(target) {
  if(Object.assign) {
    return Object.assign.apply(Object, arguments);
  } else {
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  }
}

Romo.prototype.proxy = function(fn, context) {
  var proxyFn    = fn.bind(context);
  proxyFn._romofid = this._fn(fn)._romofid;

  return proxyFn;
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
  if (!elem._romoeid) {
    if (elem !== window && elem !== document) {
      elem._romoeid = (this.attr(elem, 'data-romo-eid') || this.setAttr(elem, 'data-romo-eid', this._eid++));
    } else {
      elem._romoeid = elem === window ? 'window' : 'document';
    }
  }
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
    if (value === null)        { return undefined;  } // null         => undefined
    if (+value+"" === value)   { return +value;     } // "42.5"       => 42.5
    if (/^[\[\{]/.test(value)) { JSON.parse(value); } // JSON         => parse if valid
    return value;                                     // String       => self
  } catch(e) {
    return value
  }
}

Romo.prototype._addEventCallback = function(name, callback) {
  this._eventCallbacks.push({ eventName: name, callback:  callback });
}

// RomoParentChildElems

var RomoParentChildElems = function() {
  this.attrName = 'romo-parent-elem-id';
  this.elemId   = 0;
  this.elems    = {};

  var parentRemovedObserver = new MutationObserver(Romo.proxy(function(mutationRecords) {
    mutationRecords.forEach(Romo.proxy(function(mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.removedNodes.length > 0) {
        mutationRecord.removedNodes.forEach(Romo.proxy(function(removedNodeElem) {
          this.remove(removedNodeElem);
        }, this));
      }
    }, this));
  }, this));

  parentRemovedObserver.observe(Romo.f('body')[0], {
    childList: true,
    subtree:   true
  });
}

RomoParentChildElems.prototype.add = function(parentElem, childElems) {
  Romo.setData(parentElem, this.attrName, this._push(childElems, Romo.data(parentElem, this.attrName)));
}

RomoParentChildElems.prototype.remove = function(nodeElem) {
  if (Romo.data(nodeElem, 'romo-parent-removed-observer-disabled') !== true) {
    if (Romo.data(nodeElem, this.attrName) !== undefined) {
      // node is a parent elem itself
      this._removeChildElems(nodeElem);
    }
    Romo.find(nodeElem, '[data-'+this.attrName+']').forEach(Romo.proxy(function(childParentElem) {
      this._removeChildElems(childParentElem);
    }, this));
  }
}

// private

RomoParentChildElems.prototype._removeChildElems = function(parentElem) {
  this._pop(Romo.data(parentElem, this.attrName)).forEach(function(childElem) {
    Romo.remove(childElem);
  });
};

RomoParentChildElems.prototype._push = function(items, id) {
  if (id === undefined) {
    id = String(this.elemId++);
  }
  if (this.elems[id] === undefined) {
    this.elems[id] = []
  }
  this.elems[id] = this.elems[id].concat(items);

  return id;
};

RomoParentChildElems.prototype._pop = function(id) {
  var items = this.elems[id];
  delete this.elems[id];
  return items || [];
}

// Init

window.Romo = new Romo();

Romo.ready(function() {
  Romo.doInit();
});
