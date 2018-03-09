var RomoDropdown = RomoComponent(function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoDropdown:ready', [this]);
});

RomoDropdown.prototype.popupOpen = function() {
  return Romo.hasClass(this.popupElem, 'romo-dropdown-open') === true;
}

RomoDropdown.prototype.popupClosed = function() {
  return Romo.hasClass(this.popupElem, 'romo-dropdown-open') === false;
}

RomoDropdown.prototype.doToggle = function() {
  if (this.popupOpen()) {
    Romo.pushFn(Romo.proxy(this.doPopupClose, this));
  } else {
    Romo.pushFn(Romo.proxy(this.doPopupOpen, this));
  }
  Romo.trigger(this.elem, 'romoDropdown:toggle', [this]);
}

RomoDropdown.prototype.doPopupOpen = function() {
  Romo.popupStack.addElem(
    this.popupElem,
    Romo.proxy(this._openPopup,       this),
    Romo.proxy(this._closePopup,      this),
    Romo.proxy(this.doPlacePopupElem, this)
  );
}

RomoDropdown.prototype.doPopupClose = function() {
  Romo.popupStack.closeThru(this.popupElem);
}

RomoDropdown.prototype.doPlacePopupElem = function() {
  var configHeight = Romo.data(this.elem, 'romo-dropdown-height') ||
                     Romo.data(this.elem, 'romo-dropdown-max-height');
  var configPosition = this.popupPosition;

  if (configHeight === 'detect') {
    var popupHeight       = this.popupElem.offsetHeight;
    var topAvailHeight    = this._getPopupMaxAvailableHeight('top');
    var bottomAvailHeight = this._getPopupMaxAvailableHeight('bottom');

    if (popupHeight < topAvailHeight && popupHeight < bottomAvailHeight) {
      // if it fits both ways, use the config position way
      configHeight = this._getPopupMaxAvailableHeight(configPosition);
    } else if (topAvailHeight > bottomAvailHeight) {
      configPosition = 'top';
      configHeight   = topAvailHeight;
    } else {
      configPosition = 'bottom';
      configHeight   = bottomAvailHeight;
    }

    // remove any height difference between the popup and content elems
    // assumes popup height always greater than or equal to content height
    var contentMaxHeight = configHeight - (popupHeight - this.contentElem.offsetHeight);
    Romo.setStyle(this.contentElem, 'max-height', contentMaxHeight.toString() + 'px');
  }

  var elemOffset = Romo.offset(this.elem);

  var elemHeight = Romo.height(this.elem);
  var elemWidth  = Romo.width(this.elem);
  var elemTop    = elemOffset.top;
  var elemLeft   = elemOffset.left

  var popupOffsetHeight = this.popupElem.offsetHeight;
  var popupOffsetWidth  = this.popupElem.offsetWidth;

  var posTop = undefined;
  switch (configPosition) {
    case 'top':
      var pad = 2;
      posTop = elemTop - popupOffsetHeight - pad;
      break;
    case 'bottom':
      var pad = 2;
      posTop = elemTop + elemHeight + pad;
      break;
  }

  var posLeft = undefined;
  switch (this.popupAlignment) {
    case 'left':
      posLeft = elemLeft;
      break;
    case 'right':
      posLeft = elemLeft + elemWidth - popupOffsetWidth;
      break;
  }

  Romo.setStyle(this.popupElem, 'top',  this._roundPosOffsetVal(posTop)+'px');
  Romo.setStyle(this.popupElem, 'left', this._roundPosOffsetVal(posLeft)+'px');
}

RomoDropdown.prototype.doSetPopupZIndex = function(relativeElem) {
  var relativeZIndex = Romo.parseZIndex(relativeElem);
  Romo.setStyle(this.popupElem, 'z-index', relativeZIndex + 1200); // see z-index.css
}

// private

RomoDropdown.prototype._openPopup = function() {
  Romo.on(Romo.scrollableParents(this.elem), 'scroll', this._onScrollableParentsScroll);

  if (Romo.data(this.elem, 'romo-dropdown-content-elem') !== undefined) {
    var contentElem = Romo.f(Romo.data(this.elem, 'romo-dropdown-content-elem'))[0];
    this._loadBodySuccess(contentElem.innerHTML);
  } else {
    this.romoAjax.doInvoke();
  }

  Romo.addClass(this.popupElem, 'romo-dropdown-open');
  this.doPlacePopupElem();

  Romo.trigger(this.elem, 'romoDropdown:popupOpen', [this]);
}

RomoDropdown.prototype._closePopup = function() {
  Romo.removeClass(this.popupElem, 'romo-dropdown-open');
  Romo.off(Romo.scrollableParents(this.elem), 'scroll', this._onScrollableParentsScroll);

  if (Romo.data(this.elem, 'romo-dropdown-clear-content') === true) {
    Romo.updateHtml(this.contentElem, '');
  }

  Romo.trigger(this.elem, 'romoDropdown:popupClose', [this]);
}

RomoDropdown.prototype._bindElem = function() {
  this._bindPopup();
  this._bindAjax();
  this._bindBody();

  if (Romo.data(this.elem, 'romo-dropdown-disable-click-invoke') !== true) {
    Romo.on(this.elem, 'click', Romo.proxy(this._onToggle, this));
  }
  Romo.on(this.elem, 'romoDropdown:triggerToggle',     Romo.proxy(this._onToggle,     this));
  Romo.on(this.elem, 'romoDropdown:triggerPopupOpen',  Romo.proxy(this._onPopupOpen,  this));
  Romo.on(this.elem, 'romoDropdown:triggerPopupClose', Romo.proxy(this._onPopupClose, this));
}

RomoDropdown.prototype._bindPopup = function() {
  this.popupElem = Romo.elems(
    '<div class="romo-dropdown-popup">' +
      '<div class="romo-dropdown-body"></div>' +
    '</div>'
  )[0];

  var popupParentElem;
  var appendToClosestSel = Romo.data(this.elem, 'romo-dropdown-append-to-closest');
  if (appendToClosestSel !== undefined) {
    popupParentElem = Romo.closest(this.elem, appendToClosestSel);
  } else {
    popupParentElem = Romo.f(
      Romo.data(this.elem, 'romo-dropdown-append-to') || 'BODY'
    )[0];
  }
  Romo.append(popupParentElem, this.popupElem);

  this.bodyElem = Romo.children(this.popupElem, '.romo-dropdown-body')[0];
  if (Romo.data(this.elem, 'romo-dropdown-style-class') !== undefined) {
    Romo.addClass(this.bodyElem, Romo.data(this.elem, 'romo-dropdown-style-class'));
  }

  this.contentElem = undefined;

  var positionData = this._parsePositionData(Romo.data(this.elem, 'romo-dropdown-position'));
  this.popupPosition  = positionData.position  || 'bottom';
  this.popupAlignment = positionData.alignment || 'left';
  Romo.setData(this.popupElem, 'romo-dropdown-position',  this.popupPosition);
  Romo.setData(this.popupElem, 'romo-dropdown-alignment', this.popupAlignment);

  this.doSetPopupZIndex(this.elem);

  Romo.parentChildElems.add(this.elem, [this.popupElem]);
  Romo.on(this.popupElem, 'romoParentChildElems:childRemoved', Romo.proxy(function(e, childElem) {
    Romo.popupStack.closeThru(this.popupElem);
  }, this));
  Romo.on(this.popupElem, 'romoPopupStack:popupClosedByEsc', Romo.proxy(function(e, romoPopupStack) {
    Romo.trigger(this.elem, 'romoDropdown:popupClosedByEsc', [this]);
  }, this));
}

RomoDropdown.prototype._bindAjax = function() {
  this.romoAjax = new RomoAjax(this.elem);
  this.romoAjax.doUnbindElem(); // disable auto invoke on click

  Romo.on(this.elem, 'romoAjax:callStart', Romo.proxy(function(e, romoAjax) {
    this._loadBodyStart();
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callSuccess', Romo.proxy(function(e, data, romoAjax) {
    this._loadBodySuccess(data);
    return false;
  }, this));
  Romo.on(this.elem, 'romoAjax:callError', Romo.proxy(function(e, xhr, romoAjax) {
    this._loadBodyError(xhr);
    return false;
  }, this));
}

RomoDropdown.prototype._bindBody = function() {
  this._resetBody();

  var contentElems = Romo.find(this.bodyElem, '.romo-dropdown-content');
  this.contentElem = contentElems[contentElems.length - 1];
  if (this.contentElem === undefined) {
    this.contentElem = this.bodyElem;
  }

  this.closeElems = Romo.find(this.popupElem, '[data-romo-dropdown-close="true"]');
  Romo.on(this.closeElems, 'click', Romo.proxy(this._onPopupClose, this));

  Romo.setStyle(this.contentElem, 'min-height', Romo.data(this.elem, 'romo-dropdown-min-height'));
  Romo.setStyle(this.contentElem, 'height',     Romo.data(this.elem, 'romo-dropdown-height'));
  Romo.setStyle(this.contentElem, 'overflow-x', Romo.data(this.elem, 'romo-dropdown-overflow-x') || 'auto');
  Romo.setStyle(this.contentElem, 'overflow-y', Romo.data(this.elem, 'romo-dropdown-overflow-y') || 'auto');

  if (Romo.data(this.elem, 'romo-dropdown-max-height') === undefined) {
    Romo.setData(this.elem, 'romo-dropdown-max-height', 'detect');
  }
  if (Romo.data(this.elem, 'romo-dropdown-max-height') !== 'detect') {
    Romo.setStyle(this.contentElem, 'max-height', Romo.data(this.elem, 'romo-dropdown-max-height'));
  }

  if (Romo.data(this.elem, 'romo-dropdown-width') === 'elem') {
    Romo.setStyle(this.popupElem, 'width', Romo.width(this.elem)+'px');
  } else {
    Romo.setStyle(this.contentElem, 'min-width', Romo.data(this.elem, 'romo-dropdown-min-width'));
    Romo.setStyle(this.contentElem, 'max-width', Romo.data(this.elem, 'romo-dropdown-max-width'));
    Romo.setStyle(this.contentElem, 'width',     Romo.data(this.elem, 'romo-dropdown-width'));
  }
}

RomoDropdown.prototype._resetBody = function() {
  if (this.contentElem !== undefined) {
    Romo.rmStyle(this.contentElem, 'min-width');
    Romo.rmStyle(this.contentElem, 'max-width');
    Romo.rmStyle(this.contentElem, 'width');
    Romo.rmStyle(this.contentElem, 'min-height');
    Romo.rmStyle(this.contentElem, 'max-height');
    Romo.rmStyle(this.contentElem, 'height');
    Romo.rmStyle(this.contentElem, 'overflow-x');
    Romo.rmStyle(this.contentElem, 'overflow-y');
  }
}

RomoDropdown.prototype._loadBodyStart = function() {
  Romo.updateHtml(this.bodyElem, '');
  this._bindBody();
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
  Romo.trigger(this.elem, 'romoDropdown:loadBodyStart', [this]);
}

RomoDropdown.prototype._loadBodySuccess = function(data) {
  Romo.initUpdateHtml(this.bodyElem, data);
  this._bindBody();
  this.doPlacePopupElem();
  Romo.pushFn(Romo.proxy(this.doPlacePopupElem, this));
  Romo.trigger(this.elem, 'romoDropdown:loadBodySuccess', [data, this]);
}

RomoDropdown.prototype._loadBodyError = function(xhr) {
  Romo.trigger(this.elem, 'romoDropdown:loadBodyError', [xhr, this]);
}

RomoDropdown.prototype._parsePositionData = function(posString) {
  var posData = (posString || '').split(',');
  return { position: posData[0], alignment: posData[1] };
}

RomoDropdown.prototype._getPopupMaxAvailableHeight = function(position) {
  var maxHeight = undefined;

  switch (position) {
    case 'top':
      var elemTop = this.elem.getBoundingClientRect().top;
      maxHeight = elemTop - this._getPopupMaxHeightDetectPad(position);
      break;
    case 'bottom':
      var viewportHeight = document.documentElement.clientHeight;
      var elemBottom     = this.elem.getBoundingClientRect().bottom;
      maxHeight = viewportHeight - elemBottom - this._getPopupMaxHeightDetectPad(position);
      break;
  }

  return maxHeight;
}

RomoDropdown.prototype._getPopupMaxHeightDetectPad = function(position) {
  return Romo.data(this.elem, 'romo-dropdown-max-height-detect-pad-'+position) || Romo.data(this.elem, 'romo-dropdown-max-height-detect-pad') || 10;
}

RomoDropdown.prototype._roundPosOffsetVal = function(value) {
  return Math.round(value*100) / 100;
}

// event functions

RomoDropdown.prototype.romoEvFn._onToggle = function(e) {
  e.preventDefault();

  if (
    Romo.hasClass(this.elem, 'disabled') === false &&
    Romo.data(this.elem, 'romo-dropdown-disable-toggle') !== true
  ) {
    this.doToggle();
  }
}

RomoDropdown.prototype.romoEvFn._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupClosed()) {
    Romo.pushFn(Romo.proxy(this.doPopupOpen, this));
  }
}

RomoDropdown.prototype.romoEvFn._onPopupClose = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false && this.popupOpen()) {
    Romo.pushFn(Romo.proxy(this.doPopupClose, this));
  }
}

RomoDropdown.prototype.romoEvFn._onScrollableParentsScroll = function(e) {
  Romo.popupStack.placeAllPopups();
}

// init

Romo.popupStack.addStyleClass('romo-dropdown-popup');
Romo.addElemsInitSelector('[data-romo-dropdown-auto="true"]', RomoDropdown);
