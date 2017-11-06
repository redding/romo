var Romo = function() {
  this.popupStack       = new RomoPopupStack();
  this.parentChildElems = new RomoParentChildElems();
}

Romo.prototype.doInit = function() {
  this.popupStack.doInit();
  this.parentChildElems.doInit();
  this.initElems(Romo.f('body'));
}

// element finders

Romo.prototype.f = function(selector) {
  return this.array(document.querySelectorAll(selector));
}

Romo.prototype.find = function(parentElems, selector) {
  return this.array(parentElems).reduce(
    Romo.proxy(function(foundElems, parentElem) {
      return foundElems.concat(this.array(parentElem.querySelectorAll(selector)));
    }, this),
    []
  );
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

Romo.prototype.children = function(parentElem, selector) {
  var childElems = this.array(parentElem.children);
  if (selector) {
    return childElems.filter(function(childElem) {
      return Romo.is(childElem, selector);
    });
  } else {
    return childElems;
  }
}

Romo.prototype.parent = function(childElem) {
  return childElem.parentNode;
}

Romo.prototype.parents = function(childElem, selector) {
  var parentElem = this.parent(childElem);
  if (parentElem && parentElem !== document) {
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

Romo.prototype.scrollableParents = function(childElem, selector) {
  return Romo.parents(childElem, selector).filter(function(parentElem) {
    return (
      Romo._overflowScrollableRegex.test(Romo.css(parentElem, 'overflow'))   ||
      Romo._overflowScrollableRegex.test(Romo.css(parentElem, 'overflow-y')) ||
      Romo._overflowScrollableRegex.test(Romo.css(parentElem, 'overflow-x'))
    );
  });
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

Romo.prototype.siblings = function(elem, selector) {
  return Romo.children(Romo.parent(elem), selector).filter(function(childElem) {
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

Romo.prototype.setAttr = function(elems, attrName, attrValue) {
  var v = String(attrValue);
  Romo.array(elems).forEach(function(elem) {
    elem.setAttribute(attrName, v);
  });
  return v;
}

Romo.prototype.rmAttr = function(elems, attrName) {
  Romo.array(elems).forEach(function(elem) {
    elem.removeAttribute(attrName);
  });
}

Romo.prototype.data = function(elem, dataName) {
  return this._deserializeValue(this.attr(elem, "data-"+dataName));
}

Romo.prototype.setData = function(elems, dataName, dataValue) {
  return this.setAttr(elems, "data-"+dataName, dataValue);
}

Romo.prototype.rmData = function(elems, dataName) {
  this.rmAttr(elems, "data-"+dataName);
}

Romo.prototype.style = function(elem, styleName) {
  return elem.style[styleName];
}

Romo.prototype.setStyle = function(elems, styleName, styleValue) {
  Romo.array(elems).forEach(function(elem) {
    elem.style[styleName] = styleValue;
  });
  return styleValue;
}

Romo.prototype.rmStyle = function(elems, styleName) {
  Romo.array(elems).forEach(function(elem) {
    elem.style[styleName] = '';
  });
}

Romo.prototype.css = function(elem, styleName) {
  return window.getComputedStyle(elem, null).getPropertyValue(styleName);
}

Romo.prototype.addClass = function(elems, className) {
  var classNames = className.split(' ').filter(function(n){ return n; });
  Romo.array(elems).forEach(function(elem) {
    classNames.forEach(function(name) {
      elem.classList.add(name);
    });
  });
  return className;
}

Romo.prototype.removeClass = function(elems, className) {
  var classNames = className.split(' ').filter(function(n){ return n; });
  Romo.array(elems).forEach(function(elem) {
    classNames.forEach(function(name) {
      elem.classList.remove(name);
    });
  });
  return className;
}

Romo.prototype.toggleClass = function(elems, className) {
  var classNames = className.split(' ').filter(function(n){ return n; });
  Romo.array(elems).forEach(function(elem) {
    classNames.forEach(function(name) {
      elem.classList.toggle(name);
    });
  });
  return className;
}

Romo.prototype.hasClass = function(elem, className) {
  return elem.classList.contains(className);
}

Romo.prototype.show = function(elems) {
  Romo.array(elems).forEach(function(elem) {
    elem.style.display = '';
  });
}

Romo.prototype.hide = function(elems) {
  Romo.array(elems).forEach(function(elem) {
    elem.style.display = 'none';
  });
}

Romo.prototype.offset = function(elem) {
  var elemRect = elem.getBoundingClientRect();
  var bodyRect = document.body.getBoundingClientRect();
  return {
    top:  elemRect.top  - bodyRect.top,
    left: elemRect.left - bodyRect.left
  };
}

Romo.prototype.scrollTop = function(elem) {
  return ('scrollTop' in elem) ? elem.scrollTop : elem.pageYOffset;
}

Romo.prototype.scrollLeft = function(elem) {
  return ('scrollLeft' in elem) ? elem.scrollLeft : elem.pageXOffset;
}

Romo.prototype.setScrollTop = function(elems, value) {
  Romo.array(elems).forEach(function(elem) {
    if ('scrollTop' in elem) {
      elem.scrollTop = value;
    } else {
      elem.scrollTo(elem.scrollX, value);
    }
  });
}

Romo.prototype.setScrollLeft = function(elems, value) {
  Romo.array(elems).forEach(function(elem) {
    if ('scrollLeft' in elem) {
      elem.scrollLeft = value;
    } else {
      elem.scrollTo(value, elem.scrollY);
    }
  });
}

Romo.prototype.parseZIndex = function(elem) {
  // for the case where z-index is set directly on the elem
  var val = this.parseElemZIndex(elem);
  if (val !== 0) {
    return val;
  }

  // for the case where z-index is inherited from a parent elem
  var pval = 0;
  var parentIndexes = Romo.parents(elem).forEach(Romo.proxy(function(parentElem) {
    if (pval === 0) {
      pval = this.parseElemZIndex(parentElem);
    }
  }, this));

  // z-index is 'auto' all the way up
  return pval;
}

Romo.prototype.parseElemZIndex = function(elem) {
  var val = parseInt(this.css(elem, "z-index"), 10);
  if (!isNaN(val)) {
    return val;
  }
  return 0;
}

// elems init

Romo.prototype.elems = function(htmlString) {
  var context = document.implementation.createHTMLDocument();

  // Set the base href for the created document so any parsed
  // elements with URLs are based on the document's URL
  var base = context.createElement('base');
  base.href = document.location.href;
  context.head.appendChild(base);

  var results = Romo._elemsTagNameRegEx.exec(htmlString);
  if (!results){ return []; }

  var tagName = results[1].toLowerCase();
  var wrap    = Romo._elemsWrapMap[tagName];
  if (!wrap) {
    context.body.innerHTML = htmlString;
    return this.array(context.body.children);
  } else {
    context.body.innerHTML = wrap[1] + htmlString + wrap[2];
    var parentElem = context.body;
    var i = wrap[0];
    while(i-- !== 0) {
      parentElem = parentElem.lastChild;
    }
    return this.array(parentElem.children)
  }
}

Romo.prototype.addElemsInitSelector = function(selector, componentClass) {
  this._elemsInitComponents[selector] = componentClass;
}

Romo.prototype.initElems = function(elems) {
  return this._elemsInitTrigger(Romo.array(elems));
}

Romo.prototype.initElemsHtml = function(htmlString) {
  return this.initElems(this.elems(htmlString));
}

// DOM manipulation

Romo.prototype.remove = function(elems) {
  return Romo.array(elems).map(function(elem) {
    return elem.parentNode.removeChild(elem);
  });
}

Romo.prototype.replace = function(elem, replacementElem) {
  elem.parentNode.replaceChild(replacementElem, elem);
  return replacementElem;
}

Romo.prototype.replaceHtml = function(elem, htmlString) {
  var replacementElem = Romo.elems(htmlString)[0];
  if (replacementElem === undefined && (typeof(htmlString) !== 'string' || htmlString.trim() !== '')) {
    throw new Error("Invalid HTML string, doesn't contain an HTML element.");
  }
  return this.replace(elem, replacementElem);
}

Romo.prototype.initReplace = function(elem, replacementElem) {
  return this.initElems(this.replace(elem, replacementElem))[0];
}

Romo.prototype.initReplaceHtml = function(elem, htmlString) {
  return this.initElems(this.replaceHtml(elem, htmlString))[0];
}

Romo.prototype.update = function(elem, childElems) {
  elem.innerHTML = '';
  return Romo.array(childElems).map(function(childElem) {
    return elem.appendChild(childElem);
  });
}

Romo.prototype.updateHtml = function(elem, htmlString) {
  var childElems = Romo.elems(htmlString);
  if (childElems.length === 0 && (typeof(htmlString) !== 'string' || htmlString.trim() !== '')) {
    throw new Error("Invalid HTML string, doesn't contain any HTML elements.");
  }
  return this.update(elem, childElems);
}

Romo.prototype.updateText = function(elem, textString) {
  elem.innerText = textString;
}

Romo.prototype.initUpdate = function(elem, childElems) {
  return this.initElems(this.update(elem, childElems));
}

Romo.prototype.initUpdateHtml = function(elem, htmlString) {
  return this.initElems(this.updateHtml(elem, htmlString));
}

Romo.prototype.prepend = function(elem, childElems) {
  var refElem = elem.firstChild;
  return Romo.array(childElems).reverse().map(function(childElem) {
    refElem = elem.insertBefore(childElem, refElem);
    return refElem;
  }).reverse();
}

Romo.prototype.prependHtml = function(elem, htmlString) {
  var childElems = Romo.elems(htmlString);
  if (childElems.length === 0 && (typeof(htmlString) !== 'string' || htmlString.trim() !== '')) {
    throw new Error("Invalid HTML string, doesn't contain any HTML elements.");
  }
  return this.prepend(elem, childElems);
}

Romo.prototype.initPrepend = function(elem, childElems) {
  return this.initElems(this.prepend(elem, childElems));
}

Romo.prototype.initPrependHtml = function(elem, htmlString) {
  return this.initElems(this.prependHtml(elem, htmlString));
}

Romo.prototype.append = function(elem, childElems) {
  return Romo.array(childElems).map(function(childElem) {
    return elem.appendChild(childElem);
  });
}

Romo.prototype.appendHtml = function(elem, htmlString) {
  var childElems = Romo.elems(htmlString);
  if (childElems.length === 0 && (typeof(htmlString) !== 'string' || htmlString.trim() !== '')) {
    throw new Error("Invalid HTML string, doesn't contain any HTML elements.");
  }
  return this.append(elem, childElems);
}

Romo.prototype.initAppend = function(elem, childElems) {
  return this.initElems(this.append(elem, childElems));
}

Romo.prototype.initAppendHtml = function(elem, htmlString) {
  return this.initElems(this.appendHtml(elem, htmlString));
}

Romo.prototype.before = function(elem, siblingElems) {
  var refElem    = elem;
  var parentElem = elem.parentNode;
  return Romo.array(siblingElems).reverse().map(function(siblingElem) {
    refElem = parentElem.insertBefore(siblingElem, refElem);
    return refElem;
  }).reverse();
}

Romo.prototype.beforeHtml = function(elem, htmlString) {
  var siblingElems = Romo.elems(htmlString);
  if (siblingElems.length === 0 && (typeof(htmlString) !== 'string' || htmlString.trim() !== '')) {
    throw new Error("Invalid HTML string, doesn't contain any HTML elements.");
  }
  return this.before(elem, siblingElems);
}

Romo.prototype.initBefore = function(elem, siblingElems) {
  return this.initElems(this.before(elem, siblingElems));
}

Romo.prototype.initBeforeHtml = function(elem, htmlString) {
  return this.initElems(this.beforeHtml(elem, htmlString));
}

Romo.prototype.after = function(elem, siblingElems) {
  var refElem    = this.next(elem);
  var parentElem = elem.parentNode;
  return Romo.array(siblingElems).map(function(siblingElem) {
    return parentElem.insertBefore(siblingElem, refElem);
  });
}

Romo.prototype.afterHtml = function(elem, htmlString) {
  var siblingElems = Romo.elems(htmlString);
  if (siblingElems.length === 0 && (typeof(htmlString) !== 'string' || htmlString.trim() !== '')) {
    throw new Error("Invalid HTML string, doesn't contain any HTML elements.");
  }
  return this.after(elem, siblingElems);
}

Romo.prototype.initAfter = function(elem, siblingElems) {
  return this.initElems(this.after(elem, siblingElems));
}

Romo.prototype.initAfterHtml = function(elem, htmlString) {
  return this.initElems(this.afterHtml(elem, htmlString));
}

// events

Romo.prototype.on = function(elems, eventName, fn) {
  var proxyFn = function(e) {
    var result = fn.apply(e.target, e.detail === undefined ? [e] : [e].concat(e.detail));
    if (result === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    return result;
  }
  proxyFn._romofid = this._fn(fn)._romofid;

  Romo.array(elems).forEach(Romo.proxy(function(elem) {
    elem.addEventListener(eventName, proxyFn);
    var key = this._handlerKey(elem, eventName, proxyFn);
    if (this._handlers[key] === undefined) {
      this._handlers[key] = [];
    }
    this._handlers[key].push(proxyFn);
  }, this));
}

Romo.prototype.off = function(elems, eventName, fn) {
  Romo.array(elems).forEach(Romo.proxy(function(elem) {
    var key = this._handlerKey(elem, eventName, fn);
    (this._handlers[key] || []).forEach(function(proxyFn) {
      elem.removeEventListener(eventName, proxyFn);
    });
    this._handlers[key] = [];
  }, this));
}

Romo.prototype.trigger = function(elems, customEventName, args) {
  var event = undefined;
  if (typeof window.CustomEvent === "function") {
    event = new CustomEvent(customEventName, { detail: args });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(customEventName, false, false, args);
  }
  Romo.array(elems).forEach(function(elem) {
    elem.dispatchEvent(event);
  });
}

Romo.prototype.ready = function(eventHandlerFn) {
  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    eventHandlerFn();
  } else {
    this.on(document, 'DOMContentLoaded', eventHandlerFn);
  }
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
  var xhrData    = settings.data ? settings.data : undefined
  if (xhrData) {
    if (httpMethod === 'GET') {
      var xhrQuery = Romo.param(xhrData);
      if (xhrQuery !== '') {
        xhrUrl = (xhrUrl + '&' + xhrQuery).replace(/[&?]{1,2}/, '?');
      }
      xhrData = undefined;
    } else {
      var formData = new FormData;
      for (var name in xhrData) {
        Romo.array(xhrData[name]).forEach(function(value){
          formData.append(name, value)
        });
      }
      xhrData = formData;
    }
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
      if (settings.success !== undefined && ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)) {
        if (xhr.responseType === 'arraybuffer' || xhr.responseType === 'blob') {
          settings.success.call(window, xhr.response, xhr.status, xhr, settings);
        } else {
          settings.success.call(window, xhr.responseText, xhr.status, xhr, settings);
        }
      } else if(settings.error !== undefined) {
        settings.error.call(window, xhr.statusText || null, xhr.status, xhr, settings);
      }
    }
  };
  xhr.send(xhrData);
},

// utils

Romo.prototype.array = function(value) {
  // short circuit `Romo.f`, `Romo.find`, and `Romo.elems` calls (and others
  // that return NodeList or HTMLCollection objects), this ensures these calls
  // remain fast and don't run through all of the logic to detect if an object
  // is like an array
  var valString = Object.prototype.toString.call(value);
  if (
    valString === '[object NodeList]'       ||
    valString === '[object HTMLCollection]' ||
    Array.isArray(value)
  ) {
    return Array.prototype.slice.call(value)
  }

  // short circuit for passing individual elems and "not truthy" values, this
  // ensures these remain fast (the individual elems) and avoids running into
  // the is like an array logic; this fixes issues with select and form elems
  // being like an array and returning unexpected results.  This also fixes
  // passing in null/undefined values.
  if (!value || typeof(value.nodeType) === 'number') {
    return [value];
  }

  var object = Object(value)
  var length = undefined;
  if (!!object && 'length' in object) {
    length = object.length;
  }

  // some browsers return 'function' for HTML elements
  var isFunction = (
    typeof(object)          === 'function' &&
    typeof(object.nodeType) !== 'number'
  );
  var likeArray = (
    typeof(value) !== 'string' &&
    !isFunction                &&
    object !== window          &&
    ( Array.isArray(object) ||
      length === 0          ||
      ( typeof(length) === 'number' &&
        length > 0                  &&
        (length - 1) in object
      )
    )
  );
  if(likeArray) {
    return Array.prototype.slice.call(value);
  } else {
    return [value];
  }
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
      elem._romoeid = (this.data(elem, 'romo-eid') || this.setData(elem, 'romo-eid', this._eid++));
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
    if (value === "true")      { return true;              } // "true"       => true
    if (value === "false")     { return false;             } // "false"      => false
    if (value === "undefined") { return undefined;         } // "undefined"  => undefined
    if (value === "null")      { return null;              } // "null"       => null
    if (value === null)        { return undefined;         } // null         => undefined
    if (+value+"" === value)   { return +value;            } // "42.5"       => 42.5
    if (/^[\[\{]/.test(value)) { return JSON.parse(value); } // JSON         => parse if valid
    return value;                                            // String       => self
  } catch(e) {
    return value
  }
}

Romo.prototype._overflowScrollableRegex = /(auto|scroll)/;
Romo.prototype._elemsTagNameRegEx       = /<([a-z-]+)[\s\/>]+/i;

Romo.prototype._elemsWrapMap = {
  'caption':  [1, "<table>",            "</table>"],
  'colgroup': [1, "<table>",            "</table>"],
  'col':      [2, "<table><colgroup>",  "</colgroup></table>"],
  'thead':    [1, "<table>",            "</table>"],
  'tbody':    [1, "<table>",            "</table>"],
  'tfoot':    [1, "<table>",            "</table>"],
  'tr':       [2, "<table><tbody>",     "</tbody></table>"],
  'th':       [3, "<table><tbody><tr>", "</tr></tbody></table>"],
  'td':       [3, "<table><tbody><tr>", "</tr></tbody></table>"]
};

Romo.prototype._elemsInitComponents = {};

Romo.prototype._elemsInitTrigger = function(onElems) {
  for (var selector in this._elemsInitComponents) {
    var componentClass = this._elemsInitComponents[selector];
    this._elemsInitFind(onElems, selector).forEach(function(initElem){ new componentClass(initElem); });
  }
  return onElems;
}

Romo.prototype._elemsInitFind = function(onElems, selector) {
  var elems = onElems.filter(function(onElem){ return Romo.is(onElem, selector); });
  return elems.concat(Romo.find(onElems, selector));;
}

// RomoComponent

var RomoComponent = function(constructorFn) {
  var component = function() {
    RomoComponent.addEventFunctions(this);
    constructorFn.apply(this, arguments);
  }
  component.prototype.romoEvFn = {};
  component.prototype.doInit = function() {} // override as needed
  return component;
}

RomoComponent.addEventFunctions = function(klassInstance) {
  for(var name in klassInstance.romoEvFn) {
    klassInstance[name] = RomoComponent.eventProxyFn(klassInstance.romoEvFn[name]);
  }
}

RomoComponent.eventProxyFn = function(fn) {
  return function(){ return fn.apply(this, arguments); };
}

// RomoPopupStack

var RomoPopupStack = function() {
  this.popupSelector = undefined;
  this.styleClasses  = [];
  this.items         = [];

  this._buildItemClass();
}

RomoPopupStack.prototype.doInit = function(styleClass) {
  this.bodyElem = Romo.f('body')[0];
  Romo.on(this.bodyElem, 'click',  Romo.proxy(this._onBodyClick,    this));
  Romo.on(this.bodyElem, 'keyup',  Romo.proxy(this._onBodyKeyUp,    this));
  Romo.on(window,        'resize', Romo.proxy(this._onWindowResize, this));
  Romo.on(window,        'scroll', Romo.proxy(this._onWindowScroll, this));
}

RomoPopupStack.prototype.addStyleClass = function(styleClass) {
  this.styleClasses.push(styleClass);
  this.popupSelector = this.styleClasses.map(function(s){ return '.'+s; }).join(', ');
}

RomoPopupStack.prototype.addElem = function(popupElem, boundOpenFn, boundCloseFn, boundPlaceFn) {
  this.items.push(new this.itemClass(popupElem, boundCloseFn, boundPlaceFn));

  // run the open function in a timeout to allow any body click events
  // to propagate and run.  This ensures any existing stack is in the
  // appropriate state before opening a new popup.
  setTimeout(boundOpenFn, 1);
}

RomoPopupStack.prototype.closeThru = function(popupElem) {
  // run the closures in a timeout to allow any body click events to
  // propagate and run.  This ensures any existing is in the appropriate
  // state post-click before processing this closure.
  setTimeout(Romo.proxy(function() {
    if (this._includes(popupElem)) {
      this.closeTo(popupElem);
      this._closeTop();
    }
  }, this), 1);
}

RomoPopupStack.prototype.closeTo = function(popupElem) {
  if (this._includes(popupElem)) {
    while (this.items.length > 0 && !this.items[this.items.length-1].isFor(popupElem)) {
      this._closeTop();
    }
  }
}

RomoPopupStack.prototype.placeAllPopups = function(includingFixed) {
  this.items.filter(function(item) {
    return includingFixed || Romo.css(item.popupElem, 'position') !== 'fixed';
  }).forEach(function(item){
    item.placeFn();
  });
}

// private

RomoPopupStack.prototype._buildItemClass = function() {
  this.itemClass = function(popupElem, closeFn, placeFn) {
    this.popupElem = popupElem;
    this.closeFn   = closeFn;
    this.placeFn   = placeFn;
  }
  this.itemClass.prototype.isFor = function(popupElem) {
    return this.popupElem === popupElem;
  }
}

RomoPopupStack.prototype._closeTop = function() {
  if (this.items.length > 0) {
    this.items.pop().closeFn();
    Romo.trigger(this.bodyElem, 'romoPopupStack:popupClose');
  }
}

RomoPopupStack.prototype._closeAll = function() {
  while (this.items.length > 0) {
    this._closeTop();
  }
}

RomoPopupStack.prototype._includes = function(popupElem) {
  return this.items.reduce(function(included, item) {
    return included || item.isFor(popupElem);
  }, false);
}

RomoPopupStack.prototype._onBodyClick = function(e) {
  var popupElem = undefined;
  if (Romo.is(e.target, this.popupSelector)) {
    popupElem = e.target;
  } else {
    popupElem = Romo.parents(e.target, this.popupSelector)[0];
  }

  if (popupElem === undefined || !this._includes(popupElem)) {
    this._closeAll();
  } else {
    this.closeTo(popupElem);
  }
}

RomoPopupStack.prototype._onBodyKeyUp = function(e) {
  if (e.keyCode === 27 /* Esc */) {
    this._closeTop();
  }
}

RomoPopupStack.prototype._onWindowResize = function(e) {
  this.placeAllPopups(true);
}

RomoPopupStack.prototype._onWindowScroll = function(e) {
  this.placeAllPopups();
}

// RomoParentChildElems

var RomoParentChildElems = function() {
  this.attrName = 'romo-parent-elem-id';
  this.elemId   = 0;
  this.elems    = {};
}

RomoParentChildElems.prototype.doInit = function(parentElem, childElems) {
  var parentRemovedObserver = new MutationObserver(Romo.proxy(function(mutationRecords) {
    mutationRecords.forEach(Romo.proxy(function(mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.removedNodes.length > 0) {
        mutationRecord.removedNodes.forEach(Romo.proxy(function(removedNode) {
          this.remove(removedNode);
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

RomoParentChildElems.prototype.remove = function(elemNode) {
  if (elemNode.nodeType !== Node.ELEMENT_NODE){ return false; }

  if (Romo.data(elemNode, 'romo-parent-removed-observer-disabled') !== true) {
    if (Romo.data(elemNode, this.attrName) !== undefined) {
      // node is a parent elem itself
      this._removeChildElems(elemNode);
    }
    Romo.find(elemNode, '[data-'+this.attrName+']').forEach(Romo.proxy(function(childParentElem) {
      this._removeChildElems(childParentElem);
    }, this));
  }
}

// private

RomoParentChildElems.prototype._removeChildElems = function(parentElem) {
  this._pop(Romo.data(parentElem, this.attrName)).forEach(function(childElem) {
    Romo.remove(childElem);
    Romo.trigger(childElem, 'romoParentChildElems:childRemoved', [childElem]);
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

var Romo = new Romo();
Romo.ready(function() {
  Romo.doInit();
});
