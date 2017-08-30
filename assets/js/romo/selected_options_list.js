var RomoSelectedOptionsList = function(focusElem) {
  this.elem      = undefined;
  this.focusElem = focusElem; // picker/select dropdown elem

  this.items                  = [];
  this.defaultRmIconClass     = undefined;
  this.defaultRmIconPaddingPx = 5;
  this.defaultRmIconPosition  = 'right'

  this.doInit();
  this._bindElem();
}

RomoSelectedOptionsList.prototype.doInit = function() {
  // override as needed
}

/*
Options are specified as a list of items.  Each 'option' item object
has display text and a value. They are compatible with the option list
dropdown option items.

Example:
[ { 'type': 'option', 'value': 'a', 'displayText': 'A' },
  { 'type': 'option', 'value': 'b', 'displayText': 'B' },
  { 'type': 'option', 'value': 'c', 'displayText': 'C' }
]
*/

RomoSelectedOptionsList.prototype.doSetItems = function(itemsList) {
  this.items = itemsList;
  this.doRefreshUI();
}

RomoSelectedOptionsList.prototype.doClearItems = function() {
  this.items = [];
  this.doRefreshUI();
}

RomoSelectedOptionsList.prototype.doAddItem = function(item) {
  if (!this._getItemValues().includes(item.value)) {
    this.items.push(item);
    this.doRefreshUI();
  }
}

RomoSelectedOptionsList.prototype.doRemoveItem = function(itemValue) {
  var index = this._getItemValues().indexOf(itemValue);
  if (index > -1) {
    this.items.splice(index, 1);
    this.doRefreshUI();
  }
}

RomoSelectedOptionsList.prototype.doRefreshUI = function() {
  var itemValues  = this._getItemValues();
  var uiListElem  = this.elem.find('.romo-selected-options-list-items');
  var uiItemElems = uiListElem.find('.romo-selected-options-list-item');
  var uiValues    = uiItemElems.get().map(function(uiItemNode) {
    return $(uiItemNode).data('romo-selected-options-list-value');
  });
  var rmNodes = uiItemElems.get().filter(function(uiItemNode) {
     return itemValues.indexOf($(uiItemNode).data('romo-selected-options-list-value')) === -1;
   });
  var addItems = this.items.filter(function(item) {
    return uiValues.indexOf(item.value) === -1;
  });
  rmNodes.forEach(function(rmNode) {
    $(rmNode).remove();
  });
  addItems.forEach(function(addItem) {
    uiListElem.append(this._buildItemElem(addItem));
  });

  var focusElemWidth = parseInt(Romo.getComputedStyle(this.focusElem[0], "width"), 10);
  this.elem.css('width', String(focusElemWidth)+'px');

  var maxRows          = undefined;
  var uiListElemHeight = uiListElem.height();
  var firstItemNode    = uiListElem.find('.romo-selected-options-list-item')[0];
  if (firstItemNode !== undefined) {
    var itemHeight = parseInt(Romo.getComputedStyle(firstItemNode, "height"), 10);
    var maxRows    = this.elem.data('romo-selected-options-list-max-rows');
    var maxHeight  = itemHeight * (maxRows || 0);
  }
  if (maxRows !== undefined && (uiListElemHeight > maxHeight)) {
    this.elem.css({
      'height':     String(maxHeight)+'px',
      'overflow-y': 'auto'
    });
  } else {
    this.elem.css({
      'height':     String(uiListElemHeight)+'px',
      'overflow-y': undefined
    });
  }
}

/* private */

RomoSelectedOptionsList.prototype._bindElem = function() {
  this.elem = $('<div class="romo-selected-options-list"><div class="romo-selected-options-list-items"></div></div>');

  this.elem.on('click', $.proxy(function(e) {
    if (e !== undefined) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.focusElem.focus();
  }, this));

  this.doSetItems([]);
}

RomoSelectedOptionsList.prototype._buildItemElem = function(item) {
  var itemClass = this.data('romo-selected-options-list-item-class');
  var itemElem  = $('<div class="romo-selected-options-list-item romo-nowrap '+itemClass+'"></div>');
  itemElem.append($('<div class="romo-crop-ellipsis romo-inline-block">'+(item.displayText || '')+'</div>'));

  var rmIconClass = this.elem.data('romo-picker-rm-icon') || this.defaultRmIconClass;
  if (rmIconClass !== undefined && rmIconClass !== 'none') {
    var rmIconElem = $('<div class="romo-inline-block romo-pointer"><i class="romo-picker-rm-icon '+rmIconClass+'"></i></div>');

    var rmIconPaddingPx = this._getRmIconPaddingPx();
    var rmIconPosition  = this._getRmIconPosition();
    this.caretElem.css({
      'padding-left':  rmIconPaddingPx,
      'padding-right': rmIconPaddingPx,
    });
    if (rmIconPosition === 'left') {
      itemElem.prepend(rmIconElem);
    } else {
      itemElem.append(rmIconElem);
    }

    rmIconElem.on('click', $.proxy(this._onRmIconClick, this));
  }

  itemElem.attr('data-romo-selected-options-list-value', (item.value || ''));
  itemElem.css('max-width', parseInt(Romo.getComputedStyle(this.elem[0], "width"), 10)+'px');

  return itemElem;
}

RomoSelectedOptionsList.prototype._getItemValues = function() {
  return this.items.map(function(item) { return item.value; });
}

RomoSelectedOptionsList.prototype._onRmIconClick = function(e) {
  var itemElem = $(e.target).closest('.romo-selected-options-list-item');
  if (itemElem[0] !== undefined) {
    var value = itemElem.data('romo-selected-options-list-value');
    this.elem.trigger('romoSelectedOptionsList:rmIconClick', [value, this]);
  }
}

RomoSelectedOptionsList.prototype._getRmIconPaddingPx = function() {
  return (
    this.elem.data('romo-picker-rm-icon-padding-px') ||
    this.defaultRmIconPaddingPx
  );
}

RomoSelectedOptionsList.prototype._getRmIconPosition = function() {
  return (
    this.elem.data('romo-picker-rm-icon-position') ||
    this.defaultRmIconPosition
  );
}
