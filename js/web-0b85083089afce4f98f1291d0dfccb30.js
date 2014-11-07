/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):[]},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function T(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?T(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n);var s=n.dataType,a=/\?.+=\?/.test(n.url);if(a&&(s="jsonp"),n.cache!==!1&&(e&&e.cache===!0||"script"!=s&&"jsonp"!=s)||(n.url=w(n.url,"_="+Date.now())),"jsonp"==s)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var S="async"in n?n.async:!0;d.open(n.type,n.url,S,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(S(t)+"="+S(e))},T(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);

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

  Romo.prototype.initHtml = function(elem, data) {
    var htmlElems = $(data)
    elem.html(htmlElems);
    this.triggerInitUI(htmlElems);
    return htmlElems;
  }

  Romo.prototype.initReplace = function(elem, data) {
    var replacementElem = $(data);
    elem.replaceWith(replacementElem);
    this.triggerInitUI(replacementElem);
    return replacementElem;
  }

  Romo.prototype.initPrepend = function(elem, data) {
    var prependedElem = $(data);
    elem.prepend(prependedElem);
    this.triggerInitUI(prependedElem);
    return prependedElem;
  }

  Romo.prototype.initAppend = function(elem, data) {
    var appendedElem = $(data);
    elem.append(appendedElem);
    this.triggerInitUI(appendedElem);
    return appendedElem;
  }

  Romo.prototype.initBefore = function(elem, data) {
    var insertedElem = $(data);
    elem.before(insertedElem);
    this.triggerInitUI(insertedElem);
    return insertedElem;
  }

  Romo.prototype.initAfter = function(elem, data) {
    var insertedElem = $(data);
    elem.after(insertedElem);
    this.triggerInitUI(insertedElem);
    return insertedElem;
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
  this.invokeAttr = this.elem.data('romo-invoke-attr') || 'href';
  this.loadOnlyOnce = this.elem.data('romo-invoke-load-once') === true;

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
  var loadHref = this.elem.attr(this.invokeAttr);
  if (this.loadOnlyOnce === true) {
    this.elem.removeAttr(this.invokeAttr);
  }
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
  Romo.initUIElems(e, '[data-romo-invoke-auto="true"]').romoInvoke();
});

$.fn.romoForm = function(givenSubmitElement, givenIndicatorElements) {
  return $.map(this, function(element) {
    return new RomoForm(element, givenSubmitElement, givenIndicatorElements);
  });
}

var RomoForm = function(element, givenSubmitElement, givenIndicatorElements) {
  this.elem = $(element);
  this.defaultSubmitElem = this.elem.find('button[type="submit"], input[type="submit"], [data-romo-form-submit="true"]');
  this.submitElem = $(givenSubmitElement || this.defaultSubmitElem);
  this.defaultIndicatorElems = this.elem.find('[data-romo-indicator-auto="true"]');
  this.indicatorElems = $(givenIndicatorElements || this.defaultIndicatorElems);
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

  if (this.submitElem.hasClass('disabled') === false) {
    this.doSubmit();
  }
}

RomoForm.prototype.doSubmit = function() {
  this.elem.trigger('form:beforeSubmit', [this]);
  this.indicatorElems.trigger('indicator:triggerStart');

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
  this.indicatorElems.trigger('indicator:triggerStop');
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
    this._doAjaxSubmit(data, true);
  }
}

RomoForm.prototype._doNonGetSubmit = function() {
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
  Romo.initUIElems(e, '[data-romo-form-auto="true"]').romoForm();
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
  this.popupElem.attr('data-romo-dropdown-fixed', this.elem.data('romo-dropdown-fixed'));
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

  this.contentElem = this.bodyElem.find('.romo-dropdown-content').last();
  if (this.contentElem.size() === 0) {
    this.contentElem = this.bodyElem;
  }
  this.closeElem = this.popupElem.find('[data-romo-dropdown-close="true"]');

  this.contentElem.css({
    'min-height': this.elem.data('romo-dropdown-min-height'),
    'height':     this.elem.data('romo-dropdown-height'),
    'overflow-x': this.elem.data('romo-dropdown-overflow-x') || 'auto',
    'overflow-y': this.elem.data('romo-dropdown-overflow-y') || 'auto'
  });

  if (this.elem.data('romo-dropdown-max-height') === undefined) {
    this.elem.attr('data-romo-dropdown-max-height', 'detect');
  }
  if (this.elem.data('romo-dropdown-max-height') !== 'detect') {
    this.contentElem.css({
      'max-height': this.elem.data('romo-dropdown-max-height')
    });
  }

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

  this.closeElem.unbind('click');
  this.closeElem.on('click', $.proxy(this.onPopupClose, this));
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

  if (this.elem.hasClass('disabled') === false &&
      this.elem.data('romo-dropdown-disable-toggle') !== true) {
    this.doToggle();
    return true;
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

  if (this.elem.hasClass('disabled') === false &&
      this.popupElem.hasClass('romo-dropdown-open') === false) {
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

  if (this.elem.hasClass('disabled') === false &&
      this.popupElem.hasClass('romo-dropdown-open') === true) {
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
  // if not clicked on the popup elem or the elem
  var target = $(e.target);
  if (e !== undefined &&
      target.parents('.romo-dropdown-popup').size() === 0 &&
      target.closest(this.elem).size() === 0) {
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
    var pad = this.elem.data('romo-dropdown-max-height-detect-pad') || 10;
    var contentTop = this.contentElem[0].getBoundingClientRect().top;
    var contentBottom = this.contentElem[0].getBoundingClientRect().bottom;
    var bodyBottom = this.bodyElem[0].getBoundingClientRect().bottom;
    var padBottom = bodyBottom - contentBottom;

    var maxHeight = $(window).height() - contentTop - padBottom - pad;
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
  Romo.initUIElems(e, '[data-romo-dropdown-auto="true"]').romoDropdown();
});

$.fn.romoDropdownForm = function() {
  return $.map(this, function(element) {
    return new RomoDropdownForm(element);
  });
}

var RomoDropdownForm = function(element) {
  this.elem = $(element);

  this.dropdown = this.elem.romoDropdown()[0];
  this.doBindDropdown();

  this.form = undefined;
  this.elem.on('dropdownForm:form:triggerSubmit', $.proxy(function(e) {
    if (this.form != undefined) {
      this.form.elem.trigger('form:triggerSubmit', []);
    }
  }, this));
  this.doBindForm();
  this.elem.on('dropdown:loadBodySuccess', $.proxy(function(e, data, dropdown) {
    this.doBindForm();
  }, this));

  this.doInit();
  this.elem.trigger('dropdownForm:ready', [this]);
}

RomoDropdownForm.prototype.doInit = function() {
  // override as needed
}

RomoDropdownForm.prototype.doBindDropdown = function() {
  this.elem.on('dropdown:ready', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:ready', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:toggle', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:popupClose', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:loadBodyStart', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:loadBodyStart', [dropdown, this]);
  }, this));
  this.elem.on('dropdown:loadBodySuccess', $.proxy(function(e, data, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:loadBodySuccess', [data, dropdown, this]);
  }, this));
  this.elem.on('dropdown:loadBodyError', $.proxy(function(e, xhr, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:loadBodyError', [xhr, dropdown, this]);
  }, this));
  this.elem.on('dropdown:dismiss', $.proxy(function(e, dropdown) {
    this.elem.trigger('dropdownForm:dropdown:dismiss', [dropdown, this]);
  }, this));
}

RomoDropdownForm.prototype.doBindForm = function() {
  var formElem = this.dropdown.popupElem.find('[data-romo-form-auto="dropdownForm"]');

  formElem.on('form:clearMsgs', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:clearMsgs', [form, this]);
  }, this));
  formElem.on('form:ready', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:ready', [form, this]);
  }, this));
  formElem.on('form:beforeSubmit', $.proxy(function(e, form) {
    this.elem.trigger('dropdownForm:form:beforeSubmit', [form, this]);
  }, this));
  formElem.on('form:submitSuccess', $.proxy(function(e, data, form) {
    this.elem.trigger('dropdownForm:form:submitSuccess', [data, form, this]);
  }, this));
  formElem.on('form:submitInvalidMsgs', $.proxy(function(e, msgs, xhr, form) {
    this.elem.trigger('dropdownForm:form:submitInvalidMsgs', [msgs, xhr, form, this]);
  }, this));
  formElem.on('form:submitXhrError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('dropdownForm:form:submitXhrError', [xhr, form, this]);
  }, this));
  formElem.on('form:submitError', $.proxy(function(e, xhr, form) {
    this.elem.trigger('dropdownForm:form:submitError', [xhr, form, this]);
  }, this));

  var submitElement = this.dropdown.popupElem.find('[data-romo-form-submit="true"]')[0];
  var indicatorElements = this.dropdown.popupElem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-dropdownForm-auto="true"]').romoDropdownForm();
});


$.fn.romoSelectDropdown = function(optionElemsParent) {
  return $.map(this, function(element) {
    return new RomoSelectDropdown(element, optionElemsParent);
  });
}

var RomoSelectDropdown = function(element, optionElemsParent) {
  this.elem = $(element);
  this.defaultCaretClass = '';
  this.itemSelector = 'LI[data-romo-select-item="opt"]:not(.disabled)';
  this.prevValue = undefined;

  var optsParent = (optionElemsParent || this.elem.find('.romo-select-dropdown-options-parent'));
  this.optionElems = optsParent.children();
  this.optionList = this._buildOptionList(this.optionElems);

  this.doInit();
  this.doBindDropdown();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.elem.focus();
    }, this));
  }

  this.elem.trigger('selectDropdown:ready', [this]);
}

RomoSelectDropdown.prototype.selectedListing = function() {
  return this.romoDropdown.bodyElem.find('LI.selected');
}

RomoSelectDropdown.prototype.doInit = function() {
  // override as needed
}

RomoSelectDropdown.prototype.doSetNewValue = function(newValue) {
  this.selectedListing().removeClass('selected');
  this.romoDropdown.bodyElem.find('LI[data-romo-select-option-value="'+newValue+'"]').addClass('selected');

  this.prevValue = newValue;
}

RomoSelectDropdown.prototype.doBindDropdown = function() {
  this.romoDropdown = this.elem.romoDropdown()[0];
  this.romoDropdown.doSetPopupZIndex(this.elem);
  this.romoDropdown.bodyElem.addClass('romo-select-option-list');
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));
  this.romoDropdown.elem.on('blur', $.proxy(function(e) {
    this.blurTimeoutId = setTimeout($.proxy(function() {
      if (this.popupMouseDown !== true) {
        this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
  this.romoDropdown.elem.on('keydown', $.proxy(this.onElemKeyDown, this));
  this.romoDropdown.popupElem.on('keydown', $.proxy(this.onElemKeyDown, this));

  this.romoDropdown.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('selectDropdown:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.elem.on('selectDropdown:triggerToggle', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('selectDropdown:triggerPopupOpen', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('selectDropdown:triggerPopupClose', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));

  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this.optionList);

  this.romoDropdown.bodyElem.find(this.itemSelector).on('hover', $.proxy(this.onItemHover, this));
  this.romoDropdown.bodyElem.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.popupElem.on('mousedown', $.proxy(this.onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this.onPopupMouseUp, this));
}

RomoSelectDropdown.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.prevValue;
  var newValue = this.romoDropdown.bodyElem.find('LI.romo-select-highlight').data('romo-select-option-value');

  this.romoDropdown.doPopupClose();
  this.elem.trigger('selectDropdown:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this.doSetNewValue(newValue);
    this.elem.trigger('selectDropdown:change', [newValue, prevValue, this]);
  }
}

RomoSelectDropdown.prototype.onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this._highlightItem(this.selectedListing());
    this._scrollTopToItem(this.selectedListing());
  }
  $('body').on('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelectDropdown.prototype.onPopupClose = function(e) {
  this._highlightItem($());
  $('body').off('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelectDropdown.prototype.onItemHover = function(e) {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this._highlightItem($(e.target));
}

RomoSelectDropdown.prototype.onItemClick = function(e) {
  if (this.blurTimeoutId !== undefined) {
    clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = undefined;
  }
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this.doSelectHighlightedItem();
}

RomoSelectDropdown.prototype.onPopupMouseDown = function(e) {
  this.popupMouseDown = true;
}

RomoSelectDropdown.prototype.onPopupMouseUp = function(e) {
  this.popupMouseDown = false;
}

RomoSelectDropdown.prototype.onPopupOpenBodyKeyDown = function(e) {
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
  } else if (e.keyCode === 13 /* Enter */ ) {
    this.doSelectHighlightedItem();
    return false;
  } else {
    return true;
  }
}

RomoSelectDropdown.prototype.onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open') === false) {
      if(e.keyCode === 40 /* Down */ ) {
        this.romoDropdown.doPopupOpen();
        return false;
      } else {
        return true;
      }
    }
  }
  return true;
}

RomoSelectDropdown.prototype._scrollTopToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = item.height() / 2;

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelectDropdown.prototype._scrollBottomToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = scroll[0].offsetHeight - item.height();

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelectDropdown.prototype._buildOptionList = function(optionElems, listClass) {
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

RomoSelectDropdown.prototype._buildOptionListItem = function(optionElem) {
  var opt = $(optionElem);
  var item = $('<li data-romo-select-item="opt"></li>');

  item.attr('data-romo-select-option-value', opt.attr('value'));
  item.html(opt.text().trim() || '&nbsp;');
  if (opt.prop('selected')) {
    item.addClass('selected');
  }
  if (opt.attr('disabled') !== undefined) {
    item.addClass('disabled');
  }

  return item;
}

RomoSelectDropdown.prototype._buildOptGroupListItem = function(optGroupElem) {
  var optgroup = $(optGroupElem);
  var item = $('<li data-romo-select-item="optgroup"></li>');

  item.text(optgroup.attr('label'));

  return item;
}

RomoSelectDropdown.prototype._nextListItem = function() {
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

RomoSelectDropdown.prototype._prevListItem = function() {
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

RomoSelectDropdown.prototype._nextAll = function(elem, selector) {
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

RomoSelectDropdown.prototype._prevAll = function(elem, selector) {
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

RomoSelectDropdown.prototype._highlightItem = function(item) {
  this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
  item.addClass('romo-select-highlight');
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-dropdown-auto="true"]').romoSelectDropdown();
});

$.fn.romoSelect = function() {
  return $.map(this, function(element) {
    return new RomoSelect(element);
  });
}

var RomoSelect = function(element) {
  this.elem = $(element);

  this.doInit();
  this.doBindSelectDropdown();
  this.doRefreshUI();

  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoSelectDropdown.elem.focus();
    }, this));
  }

  $(window).on("pageshow", $.proxy(function(e) {
    var selectedVal = this.elem.find('option[selected]').attr('value');
    if (selectedVal === undefined) {
      selectedVal = '';
    }
    if (selectedVal !== this.elem[0].value) {
      this.romoSelectDropdown.doSetNewValue(selectedVal);
      this._setNewValue(selectedVal);
    }
  }, this));

  this.elem.trigger('select:ready', [this]);
}

RomoSelect.prototype.doInit = function() {
  // override as needed
}

RomoSelect.prototype.doBindSelectDropdown = function() {
  this.romoSelectDropdown = this._buildSelectDropdownElem().romoSelectDropdown(this.elem)[0];

  this.romoSelectDropdown.elem.on('selectDropdown:dropdown:toggle', $.proxy(function(e, dropdown, selectDropdown) {
    this.elem.trigger('select:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:dropdown:popupOpen', $.proxy(function(e, dropdown, selectDropdown) {
    this.elem.trigger('select:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:dropdown:popupClose', $.proxy(function(e, dropdown, selectDropdown) {
    this.elem.trigger('select:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.romoSelectDropdown.elem.on('selectDropdown:itemSelected', $.proxy(function(e, newValue, prevValue, selectDropdown) {
    this.romoSelectDropdown.elem.focus();
    this.elem.trigger('select:itemSelected', [newValue, prevValue, this]);
  }, this));
  this.romoSelectDropdown.elem.on('selectDropdown:change', $.proxy(function(e, newValue, prevValue, selectDropdown) {
    this._setNewValue(newValue);
    this.elem.trigger('change');
    this.elem.trigger('select:change', [newValue, prevValue, this]);
  }, this));

  this.elem.on('select:triggerToggle', $.proxy(function(e) {
    this.romoSelectDropdown.elem.trigger('selectDropdown:triggerToggle', []);
  }, this));
  this.elem.on('select:triggerPopupOpen', $.proxy(function(e) {
    this.romoSelectDropdown.elem.trigger('selectDropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('select:triggerPopupClose', $.proxy(function(e) {
    this.romoSelectDropdown.elem.trigger('selectDropdown:triggerPopupClose', []);
  }, this));
}

RomoSelect.prototype.doRefreshUI = function() {
  var text = this.romoSelectDropdown.selectedListing().text() || '&nbsp;';
  this.romoSelectDropdown.elem.find('.romo-select-text').html(text);
}

RomoSelect.prototype.onCaretClick = function(e) {
  if (this.elem.prop('disabled') === false) {
    this.romoSelectDropdown.elem.focus();
    this.elem.trigger('select:triggerPopupOpen');
  }
}

RomoSelect.prototype._setNewValue = function(newValue) {
  this.elem[0].value = newValue;
  this.doRefreshUI();
}

RomoSelect.prototype._buildSelectDropdownElem = function() {
  var romoSelectDropdownElem = $('<div class="romo-select romo-btn" tabindex="0"><span class="romo-select-text"></span></div>');

  romoSelectDropdownElem.attr('data-romo-dropdown-position', this.elem.data('romo-select-dropdown-position'));
  romoSelectDropdownElem.attr('data-romo-dropdown-style-class', this.elem.data('romo-select-dropdown-style-class'));
  romoSelectDropdownElem.attr('data-romo-dropdown-min-height', this.elem.data('romo-select-dropdown-min-height'));
  romoSelectDropdownElem.attr('data-romo-dropdown-max-height', this.elem.data('romo-select-dropdown-max-height'));
  romoSelectDropdownElem.attr('data-romo-dropdown-height', this.elem.data('romo-select-dropdown-height'));
  romoSelectDropdownElem.attr('data-romo-dropdown-overflow-x', 'hidden');
  romoSelectDropdownElem.attr('data-romo-dropdown-width', 'elem');
  if (romoSelectDropdownElem.data('romo-dropdown-max-height') === undefined) {
    romoSelectDropdownElem.attr('data-romo-dropdown-max-height', 'detect');
  }

  var classList = this.elem.attr('class') !== undefined ? this.elem.attr('class').split(/\s+/) : [];
  $.each(classList, function(idx, classItem) {
    romoSelectDropdownElem.addClass(classItem);
  });
  if (this.elem.attr('style') !== undefined) {
    romoSelectDropdownElem.attr('style', this.elem.attr('style'));
  }
  romoSelectDropdownElem.css({'width': this.elem.css('width')});
  if (this.elem.attr('disabled') !== undefined) {
    this.romoSelectDropdown.elem.attr('disabled', this.elem.attr('disabled'));
  }

  this.elem.after(romoSelectDropdownElem);
  this.elem.hide();

  this.elemWrapper = $('<div class="romo-select-wrapper"></div>');
  if (this.elem.data('romo-select-btn-group') === true) {
    this.elemWrapper.addClass('romo-btn-group');
  }
  romoSelectDropdownElem.before(this.elemWrapper);
  this.elemWrapper.append(romoSelectDropdownElem);

  var caretClass = this.elem.data('romo-select-caret') || this.defaultCaretClass;
  if (caretClass !== undefined && caretClass !== 'none') {
    var caret = $('<i class="romo-select-caret '+caretClass+'"></i>');
    caret.css({'line-height': romoSelectDropdownElem.css('line-height')});
    caret.on('click', $.proxy(this.onCaretClick, this));
    romoSelectDropdownElem.css({'padding-right': '22px'});
    romoSelectDropdownElem.append(caret);
  }

  return romoSelectDropdownElem;
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-select-auto="true"]').romoSelect();
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
  elemWrapper.css({'display': (this.elem.data('romo-datepicker-elem-display') || 'inline-block')});
  if (this.elem.data('romo-datepicker-btn-group') === true) {
    elemWrapper.addClass('romo-btn-group');
  }

  this.elem.before(elemWrapper);
  elemWrapper.append(this.elem);

  this.elem.attr('autocomplete', 'off');

  this.indicatorElem = $();
  var indicatorClass = this.elem.data('romo-datepicker-indicator') || this.defaultIndicatorClass;
  if (indicatorClass !== undefined && indicatorClass !== 'none') {
    this.indicatorElem = $('<i class="romo-datepicker-indicator '+indicatorClass+'"></i>');
    this.indicatorElem.css({'line-height': this.elem.css('height')});
    if (this.elem.prop('disabled') === true) {
      this.indicatorElem.addClass('disabled');
    }
    this.indicatorElem.on('click', $.proxy(this.onIndicatorClick, this));
    this.elem.css({'padding-right': '22px'});
    this.elem.after(this.indicatorElem);
  }

  this.elem.on('datepicker:triggerEnable', $.proxy(function(e) {
    this.doEnable();
  }, this));
  this.elem.on('datepicker:triggerDisable', $.proxy(function(e) {
    this.doDisable();
  }, this));
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

RomoDatepicker.prototype.doEnable = function() {
  this.elem.prop('disabled', false);
  this.elem.removeClass('disabled');
  this.indicatorElem.removeClass('disabled');
}

RomoDatepicker.prototype.doDisable = function() {
  this.elem.prop('disabled', true);
  this.elem.addClass('disabled');
  this.indicatorElem.addClass('disabled');
}

RomoDatepicker.prototype.doBindDropdown = function() {
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
  this.romoDropdown.elem.on('blur', $.proxy(function(e) {
    this.blurTimeoutId = setTimeout($.proxy(function() {
      if (this.popupMouseDown !== true) {
        this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
  this.romoDropdown.elem.on('keydown', $.proxy(this.onElemKeyDown, this));

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

  this.romoDropdown.popupElem.on('mousedown', $.proxy(this.onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this.onPopupMouseUp, this));
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

RomoDatepicker.prototype.onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open')) {
      return true;
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
    e.stopPropagation();
  }
  this._highlightItem($(e.target));
}

RomoDatepicker.prototype.onIndicatorClick = function(e) {
  this._clearBlurTimeout();
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (this.elem.prop('disabled') === false) {
    this.elem.focus();
    this.elem.trigger('datepicker:triggerPopupOpen');
  }
}

RomoDatepicker.prototype.onItemClick = function(e) {
  this._clearBlurTimeout();
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this.doSelectHighlightedItem();
}

RomoDatepicker.prototype.onPrevClick = function(e) {
  this._clearBlurTimeout();
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this.doRefreshToPrevMonth();
}

RomoDatepicker.prototype.onNextClick = function(e) {
  this._clearBlurTimeout();
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this.doRefreshToNextMonth();
}

RomoDatepicker.prototype.onPopupMouseDown = function(e) {
  this.popupMouseDown = true;
}

RomoDatepicker.prototype.onPopupMouseUp = function(e) {
  this.popupMouseDown = false;
}

RomoDatepicker.prototype._clearBlurTimeout = function() {
  if (this.blurTimeoutId !== undefined) {
    clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = undefined;
  }
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
  Romo.initUIElems(e, '[data-romo-datepicker-auto="true"]').romoDatepicker();
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
  Romo.initUIElems(e, '[data-romo-inline-auto="true"]').romoInline();
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
  var indicatorElements = this.elem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-inlineForm-auto="true"]').romoInlineForm();
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

  this.contentElem = this.bodyElem.find('.romo-modal-content').last();
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
    'height':     this.elem.data('romo-modal-height'),
    'overflow-x': 'auto',
    'overflow-y': 'auto'
  }

  if (this.elem.data('romo-modal-max-height') === undefined) {
    this.elem.attr('data-romo-modal-max-height', 'detect');
  }
  if (this.elem.data('romo-modal-max-height') !== 'detect') {
    css['max-height'] = this.elem.data('romo-modal-max-height');
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

  if (this.elem.data('romo-modal-max-height') === 'detect') {
    var pad = this.elem.data('romo-modal-max-height-detect-pad') || 10;
    var contentTop = this.contentElem[0].getBoundingClientRect().top;
    var contentBottom = this.contentElem[0].getBoundingClientRect().bottom;
    var bodyBottom = this.bodyElem[0].getBoundingClientRect().bottom;
    var padBottom = bodyBottom - contentBottom;

    var maxHeight = $(window).height() - contentTop - padBottom - pad;
    this.contentElem.css({'max-height': maxHeight.toString() + 'px'});
  }
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-modal-auto="true"]').romoModal();
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
  var indicatorElements = this.modal.popupElem.find('[data-romo-indicator-auto="true"]');
  this.form = formElem.romoForm(submitElement, indicatorElements)[0];
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-modalForm-auto="true"]').romoModalForm();
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
  this.bodyElem = this.popupElem.find('> .romo-tooltip-body');

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
  this.popupAlignment = this.elem.data('romo-tooltip-alignment') || 'center';
  this.popupElem.attr('data-romo-tooltip-alignment', this.popupAlignment);

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e !== undefined) {
      e.stopPropagation();
    }
  })

  if (this.elem.data('romo-tooltip-style-class') !== undefined) {
    this.bodyElem.addClass(this.elem.data('romo-tooltip-style-class'));
  }
  this.contentData = this.elem.data('romo-tooltip-content');
  this.bodyElem.html(this.contentData || '');

  this.elem.on('mouseenter', $.proxy(this.onToggleEnter, this));
  this.elem.on('mouseleave', $.proxy(this.onToggleLeave, this));
  this.elem.on('tooltip:triggerPopupOpen', $.proxy(this.onPopupOpen, this));
  this.elem.on('tooltip:triggerPopupClose', $.proxy(this.onPopupClose, this));
  $(window).on('resize', $.proxy(this.onResizeWindow, this))

  this.doInit();
  this.doInitBody();
  if (this.contentData === undefined) {
    this.doBindInvoke();
  }

  this.elem.trigger('tooltip:ready', [this]);
}

RomoTooltip.prototype.doInit = function() {
  // override as needed
}

RomoTooltip.prototype.doInitBody = function() {
  this.doResetBody();

  this.bodyElem.css({
    'min-width':  this.elem.data('romo-tooltip-min-width'),
    'max-width':  this.elem.data('romo-tooltip-max-width'),
    'width':      this.elem.data('romo-tooltip-width'),
    'min-height': this.elem.data('romo-tooltip-min-height'),
    'max-height': this.elem.data('romo-tooltip-max-height'),
    'height':     this.elem.data('romo-tooltip-height')
  });
}

RomoTooltip.prototype.doResetBody = function() {
  this.bodyElem.css({
    'min-width':  '',
    'max-width':  '',
    'width':      '',
    'min-height': '',
    'max-height': '',
    'height':     '',
  });
}

RomoTooltip.prototype.doBindInvoke = function() {
  this.romoInvoke = this.elem.romoInvoke()[0];
  this.romoInvoke.doUnBindInvoke(); // disable auto invoke on click

  this.elem.on('invoke:loadStart', $.proxy(function(e, invoke) {
    this.doLoadBodyStart();
  }, this));
  this.elem.on('invoke:loadSuccess', $.proxy(function(e, data, invoke) {
    this.doLoadBodySuccess(data);
  }, this));
  this.elem.on('invoke:loadError', $.proxy(function(e, xhr, invoke) {
    this.doLoadBodyError(xhr);
  }, this));
}

RomoTooltip.prototype.doLoadBodyStart = function() {
  this.bodyElem.html('');
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('tooltip:loadBodyStart', [this]);
}

RomoTooltip.prototype.doLoadBodySuccess = function(data) {
  Romo.initHtml(this.bodyElem, data);
  this.doInitBody();
  this.doPlacePopupElem();
  this.elem.trigger('tooltip:loadBodySuccess', [data, this]);
}

RomoTooltip.prototype.doLoadBodyError = function(xhr) {
  this.elem.trigger('tooltip:loadBodyError', [xhr, this]);
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
  if (this.romoInvoke !== undefined) {
    this.romoInvoke.doInvoke();
  }
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
  Romo.initUIElems(e, '[data-romo-tooltip-auto="true"]').romoTooltip();
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
    'width':    this.elem.css('width'),
    'height':   this.elem.css('height'),
  });
  this.elem.on('indicator:triggerStart', $.proxy(this.onStart, this));
  this.elem.on('indicator:triggerStop', $.proxy(this.onStop, this));

  $(window).on("pageshow", $.proxy(function(e) {
    this.elem.trigger('indicator:triggerStop');
  }, this));

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
  Romo.initUIElems(e, '[data-romo-indicator-auto="true"]').romoIndicator();
});

$.fn.romoSortable = function() {
  return $.map(this, function(element) {
    return new RomoSortable(element);
  });
}

var RomoSortable = function(element) {
  this.elem = $(element);

  this.draggableSelector = '[data-romo-sortable-item="true"]';
  this.handleSelector = '[data-romo-sortable-handle="true"]';

  this.draggableElems = this.elem.find(this.draggableSelector);
  this.draggableElems.prop('draggable', 'true');

  this.draggingClass = this.elem.data('romo-sortable-dragging-class') || '';
  this.dragOverClass = this.elem.data('romo-sortable-dragover-class') || '';
  this.placeholderClass = this.elem.data('romo-sortable-placeholder-class') || '';

  this.draggedElem = this.draggedIndex = this.draggableSelected = null;
  this.draggedOverElem = this.dragDirection = this.lastY = null;

  this.elem.on('dragenter', $.proxy(this.onDragEnter, this));
  this.elem.on('dragover',  $.proxy(this.onDragOver,  this));
  this.elem.on('dragend',   $.proxy(this.onDragEnd,   this));
  this.elem.on('drop',      $.proxy(this.onDragDrop,  this));

  this.draggableElems.on('dragstart',  $.proxy(this.onDragStart, this));
  this.draggableElems.on('dragenter',  $.proxy(this.onDragEnter, this));
  this.draggableElems.on('dragover',   $.proxy(this.onDragOver,  this));
  this.draggableElems.on('dragend',    $.proxy(this.onDragEnd,   this));
  this.draggableElems.on('drop',       $.proxy(this.onDragDrop,  this));

  this.draggableElems.on('mousedown', $.proxy(this.onDraggableMouseDown, this));
  var handleElems = this.draggableElems.find(this.handleSelector)
  handleElems.on('mousedown', $.proxy(this.onHandleMouseDown, this));
  $('body').on('mouseup', $.proxy(this.onWindowBodyMouseUp, this));

  this._resetGrabClasses();
  this.doInit();
  this.doInitPlaceholder();

  this.elem.trigger('sortable:ready', [this]);
}

RomoSortable.prototype.doInit = function() {
  // override as needed
}

RomoSortable.prototype.doInitPlaceholder = function() {
  var tag;
  try {
    tag = this.draggableElems.get(0).tagName;
  } catch(e) {
    tag = /^ul|ol$/i.test(this.elem.tagName) ? 'li' : 'div';
  }
  this.placeholderElem = $('<' + tag + '/>');
  this.placeholderElem.addClass(this.placeholderClass);

  this.placeholderElem.on('dragover', $.proxy(this.onDragOver, this));
  this.placeholderElem.on('drop',     $.proxy(this.onDragDrop, this));
}

RomoSortable.prototype.onDragStart = function(e) {
  if(!this.draggableSelected){ return false; }

  e.stopPropagation();
  e.originalEvent.dataTransfer.effectAllowed = 'move';

  // IE fix
  try {
    // FF fix, it won't drag without some data being set
    e.originalEvent.dataTransfer.setData('text/plain', null);
  } catch(e) {}

  this.draggedElem = $(e.target);
  this.draggedElem.addClass(this.draggingClass);
  this.draggedIndex = this.draggedElem.index();

  this.placeholderElem.css({ 'height': this.draggedElem.height() });

  this.elem.trigger('sortable:dragStart', [this.draggedElem, this]);
}

RomoSortable.prototype.onDragEnter = function(e) {
  e.preventDefault();
  e.stopPropagation();

  // return if event is fired on the placeholder
  if(this.placeholderElem.get(0) === e.currentTarget){ return; }

  this.placeholderElem.show();
  this.draggedElem.hide();

  // if event is not fired on the sortable
  var overSortableElem = this.elem.get(0) === e.currentTarget;
  var clientX = e.originalEvent.clientX;
  var clientY = e.originalEvent.clientY;
  if (!overSortableElem) {
    // if we are in the same elem and moving the same direction, exit out
    var overSameElem = this.draggedOverElem &&
                       this.draggedOverElem.get(0) === e.currentTarget;
    var sameDirection = (this.dragDirection === 'down' && clientY > this.lastY) ||
                        (this.dragDirection === 'up'   && clientY < this.lastY);
    if(overSameElem && sameDirection){ return; }

    // remove dragged over classes from previous elem
    if(this.draggedOverElem){ this.draggedOverElem.removeClass(this.dragOverClass); }
    this.draggedOverElem = $(e.currentTarget);
    this.lastY = clientY;
    this.draggedOverElem.addClass(this.dragOverClass);

    // insert the placeholder according to the dragging direction
    if (this.placeholderElem.index() < this.draggedOverElem.index()) {
      this.dragDirection = 'down';
    } else {
      this.dragDirection = 'up';
    }
    var insertMethod = this.dragDirection === 'down' ? 'after' : 'before';
    this.draggedOverElem[insertMethod](this.placeholderElem);
  }

  this.elem.trigger('sortable:dragMove', [clientX, clientY, this.draggedElem, this]);
}

RomoSortable.prototype.onDragOver = function(e) {
  // This is how you allow an element to receive a drop event.
  e.preventDefault();
  e.stopPropagation();
}

RomoSortable.prototype.onDragEnd = function(e) {
  e.stopPropagation();
  e.preventDefault();

  if(!this.draggedElem){ return; }

  this.draggableElems.removeClass(this.dragOverClass);
  this.draggedElem.removeClass(this.draggingClass);
  this.draggedElem.show();
  this.placeholderElem.hide();
  this._resetGrabClasses();

  this.elem.trigger('sortable:dragStop', [this.draggedElem, this]);

  this.draggedElem = this.draggedIndex = this.draggableSelected = null;
  this.draggedOverElem = this.dragDirection = this.lastY = null;
}

RomoSortable.prototype.onDragDrop = function(e) {
  e.stopPropagation();
  e.preventDefault();

  if(!this.draggedElem){ return; }

  this.draggedElem.insertBefore(this.placeholderElem);
  this.draggedElem.show();

  var newIndex = this.draggedElem.index();
  if (newIndex !== this.draggedIndex) {
    this.elem.trigger('sortable:change', [this.draggedElem, this]);
  }
  this.elem.trigger('sortable:dragDrop', [this.draggedElem, this]);
}

RomoSortable.prototype.onDraggableMouseDown = function(e) {
  // if our draggable elem doesn't have a handle then it's draggable
  var draggableElem = $(e.currentTarget);
  if(draggableElem.find(this.handleSelector).size() === 0) {
    draggableElem.removeClass('romo-sortable-grab');
    draggableElem.addClass('romo-sortable-grabbing');
    this.draggableSelected = true;
  }
}

RomoSortable.prototype.onHandleMouseDown = function(e) {
  this.draggableSelected = true;
  var handleElem = $(e.currentTarget);
  handleElem.removeClass('romo-sortable-grab');
  handleElem.addClass('romo-sortable-grabbing');
}

RomoSortable.prototype.onWindowBodyMouseUp = function(e) {
  this.draggableSelected = false;
}

RomoSortable.prototype._resetGrabClasses = function() {
  this.draggableElems.each($.proxy(function(index, item) {

    draggableElem = $(item);
    handleElem = draggableElem.find(this.handleSelector);
    if(handleElem.size() === 0){ handleElem = draggableElem; }
    handleElem.addClass('romo-sortable-grab');
    handleElem.removeClass('romo-sortable-grabbing');

  }, this));
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-sortable-auto="true"]').romoSortable();
});

$(function() {

  $('#docsLinks').css({
    'width': $('#docsLinks').css('width'),
    'position': 'fixed'
  });

});
