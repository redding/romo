var RomoSelectedOptionsList = function(focusElem) {
  this.elem      = undefined;
  this.focusElem = focusElem; // picker/select dropdown elem

  this.items = [];

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
}

RomoSelectedOptionsList.prototype.doClearItems = function() {
  this.items = [];
}

RomoSelectedOptionsList.prototype.doAddItem = function(item) {
  if (!this._getItemValues().includes(item.value)) {
    this.items.push(item);
  }
}

RomoSelectedOptionsList.prototype.doRemoveItem = function(itemValue) {
  var index = this._getItemValues().indexOf(itemValue);
  if (index > -1) {
    this.items.splice(index, 1);
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
  rmNodes.forEach($.proxy(function(rmNode) {
    $(rmNode).remove();
  }, this));
  addItems.forEach($.proxy(function(addItem) {
    var addElem = this._buildItemElem(addItem);
    uiListElem.append(addElem);

    var listWidth       = parseInt(Romo.getComputedStyle(uiListElem[0], "width"), 10);
    var listLeftPad     = parseInt(Romo.getComputedStyle(uiListElem[0], "padding-left"), 10);
    var listRightPad    = parseInt(Romo.getComputedStyle(uiListElem[0], "padding-right"), 10);
    var itemBorderWidth = 1;
    var itemLeftPad     = parseInt(Romo.getComputedStyle(addElem[0], "padding-left"), 10);
    var itemRightPad    = parseInt(Romo.getComputedStyle(addElem[0], "padding-right"), 10);
    addElem.find('DIV').css('max-width', String(listWidth-listLeftPad-listRightPad-(2*itemBorderWidth)-itemLeftPad-itemRightPad)+'px');
  }, this));

  var focusElemWidth = parseInt(Romo.getComputedStyle(this.focusElem[0], "width"), 10);
  this.elem.css('width', String(focusElemWidth)+'px');

  var maxRows          = undefined;
  var uiListElemHeight = parseInt(Romo.getComputedStyle(uiListElem[0], "height"), 10);
  var firstItemNode    = uiListElem.find('.romo-selected-options-list-item')[0];
  if (firstItemNode !== undefined) {
    var itemHeight       = parseInt(Romo.getComputedStyle(firstItemNode, "height"), 10);
    var itemMarginBottom = parseInt(Romo.getComputedStyle(firstItemNode, "margin-bottom"), 10);
    var itemBorderWidth  = 1;
    var listTopPad       = parseInt(Romo.getComputedStyle(uiListElem[0], "padding-top"), 10);
    var listBottomPad    = parseInt(Romo.getComputedStyle(uiListElem[0], "padding-bottom"), 10);

    var maxRows   = this.focusElem.data('romo-selected-options-list-max-rows') || 0;
    var maxHeight = listTopPad+(itemHeight*maxRows)+(itemMarginBottom*(maxRows-1))+(2*itemBorderWidth*maxRows)+listBottomPad+(itemHeight/2);
  }
  if (maxRows !== 0 && (uiListElemHeight > maxHeight)) {
    this.elem.css({
      'height':     String(maxHeight)+'px',
      'overflow-y': 'auto'
    });
    var itemElems    = uiListElem.find('.romo-selected-options-list-item');
    var lastItemNode = itemElems[itemElems.length-1];
    this._scrollListTopToItem($(lastItemNode));
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
    this.elem.trigger('romoSelectedOptionsList:listClick', [this]);
  }, this));

  this.doSetItems([]);
}

RomoSelectedOptionsList.prototype._buildItemElem = function(item) {
  var itemClass = this.focusElem.data('romo-selected-options-list-item-class') || '';
  var itemElem  = $('<div class="romo-selected-options-list-item romo-pointer romo-pad0-left romo-pad0-right romo-push0-right romo-push0-bottom '+itemClass+'"></div>');
  itemElem.append($('<div class="romo-crop-ellipsis romo-text-strikethrough-hover">'+(item.displayText || '')+'</div>'));
  itemElem.attr('data-romo-selected-options-list-value', (item.value || ''));
  itemElem.on('click', $.proxy(this._onItemClick, this));

  return itemElem;
}

RomoSelectedOptionsList.prototype._getItemValues = function() {
  return this.items.map(function(item) { return item.value; });
}

RomoSelectedOptionsList.prototype._onItemClick = function(e) {
  var itemElem = $(e.target);
  if (!itemElem.hasClass('romo-selected-options-list-item')) {
    var itemElem = itemElem.closest('.romo-selected-options-list-item');
  }
  if (itemElem[0] !== undefined) {
    var value = itemElem.data('romo-selected-options-list-value');
    this.elem.trigger('romoSelectedOptionsList:itemClick', [value, this]);
  }
}

RomoSelectedOptionsList.prototype._scrollListTopToItem = function(itemElem) {
  if (itemElem[0] !== undefined) {
    var scroll = this.elem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop    = itemElem.offset().top;
    var selOffset       = itemElem.height() / 2;

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}
