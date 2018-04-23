var RomoSelectedOptionsList = RomoComponent(function(focusElem) {
  this.elem      = undefined;
  this.focusElem = focusElem; // picker/select dropdown elem

  this.items = [];

  this.doInit();
  this._bindElem();
});

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
  var uiListElem  = Romo.find(this.elem, '.romo-selected-options-list-items')[0];
  var uiItemElems = Romo.find(uiListElem, '.romo-selected-options-list-item');
  var uiValues    = uiItemElems.map(Romo.proxy(function(uiItemElem) {
    return Romo.data(uiItemElem, 'romo-selected-options-list-value');
  }, this), []);
  var rmElems = uiItemElems.filter(function(uiItemElem) {
     return itemValues.indexOf(Romo.data(uiItemElem, 'romo-selected-options-list-value')) === -1;
   });
  var addItems = this.items.filter(function(item) {
    return uiValues.indexOf(item.value) === -1;
  });
  Romo.remove(rmElems);
  addItems.forEach(Romo.proxy(function(addItem) {
    var addElem = this._buildItemElem(addItem);
    Romo.append(uiListElem, addElem);

    var listWidth       = Romo.width(uiListElem);
    var listLeftPad     = parseInt(Romo.css(uiListElem, "padding-left"), 10);
    var listRightPad    = parseInt(Romo.css(uiListElem, "padding-right"), 10);
    var itemBorderWidth = 1;
    var itemLeftPad     = parseInt(Romo.css(addElem, "padding-left"), 10);
    var itemRightPad    = parseInt(Romo.css(addElem, "padding-right"), 10);
    Romo.setStyle(
      Romo.find(addElem, 'DIV')[0],
      'max-width',
      String(listWidth-listLeftPad-listRightPad-(2*itemBorderWidth)-itemLeftPad-itemRightPad)+'px'
    );
  }, this));

  var focusElemWidth = Romo.width(this.focusElem);
  Romo.setStyle(this.elem, 'width', String(focusElemWidth)+'px');

  var maxRows           = undefined;
  var uiListElemHeight  = Romo.height(uiListElem);
  var firstItemElem = Romo.find(uiListElem, '.romo-selected-options-list-item')[0];
  if (firstItemElem !== undefined) {
    var itemHeight       = Romo.height(firstItemElem);
    var itemMarginBottom = parseInt(Romo.css(firstItemElem, "margin-bottom"), 10);
    var itemBorderWidth  = 1;
    var listTopPad       = parseInt(Romo.css(uiListElem, "padding-top"), 10);
    var listBottomPad    = parseInt(Romo.css(uiListElem, "padding-bottom"), 10);

    var maxRows   = Romo.data(this.focusElem, 'romo-selected-options-list-max-rows') || 0;
    var maxHeight = (
      listTopPad+
      (itemHeight*maxRows)+
      (itemMarginBottom*(maxRows-1))+
      (2*itemBorderWidth*maxRows)+
      listBottomPad+
      (itemHeight/2)
    );
  }
  if (maxRows !== 0 && (uiListElemHeight > maxHeight)) {
    Romo.setStyle(this.elem, 'height',     String(maxHeight)+'px');
    Romo.setStyle(this.elem, 'overflow-y', 'auto');

    var itemElems    = Romo.find(uiListElem, '.romo-selected-options-list-item');
    var lastItemElem = itemElems[itemElems.length-1];
    this._scrollListTopToItem(lastItemElem);
  } else {
    Romo.setStyle(this.elem, 'height', String(uiListElemHeight)+'px');
    Romo.rmStyle(this.elem, 'overflow-y');
  }
}

// private

RomoSelectedOptionsList.prototype._bindElem = function() {
  this.elem = Romo.elems(
    '<div class="romo-selected-options-list">'+
      '<div class="romo-selected-options-list-items"></div>'+
    '</div>'
  )[0];

  Romo.on(this.elem, 'click', Romo.proxy(function(e) {
    Romo.trigger(this.elem, 'romoSelectedOptionsList:listClick', [this]);
    return false;
  }, this));

  this.doSetItems([]);
}

RomoSelectedOptionsList.prototype._buildItemElem = function(item) {
  var itemClass = Romo.data(this.focusElem, 'romo-selected-options-list-item-class') || '';
  var itemElem  = Romo.elems(
    '<div class="romo-selected-options-list-item romo-pointer '+
                'romo-pad0-left romo-pad0-right romo-push0-right romo-push0-bottom '+
                itemClass+'">'+
    '</div>'
  )[0];
  Romo.append(
    itemElem,
    Romo.elems(
      '<div class="romo-crop-ellipsis romo-text-strikethrough-hover">'+
        (item.displayText || '')+
      '</div>'
    )[0]
  );
  Romo.setData(itemElem, 'romo-selected-options-list-value', (item.value || ''));
  Romo.on(itemElem, 'click', Romo.proxy(this._onItemClick, this));

  return itemElem;
}

RomoSelectedOptionsList.prototype._getItemValues = function() {
  return this.items.map(function(item) { return item.value; });
}

RomoSelectedOptionsList.prototype._scrollListTopToItem = function(itemElem) {
  if (itemElem !== undefined) {
    var scrollElem = this.elem;
    scrollElem.scrollTop = 0;

    var scrollOffsetTop = Romo.offset(scrollElem).top;
    var selOffsetTop    = Romo.offset(itemElem).top;
    var selOffset       = Romo.height(itemElem) / 2;

    scrollElem.scrollTop = selOffsetTop - scrollOffsetTop - selOffset;
  }
}

// event functions

RomoSelectedOptionsList.prototype.romoEvFn._onItemClick = function(e) {
  var itemElem = e.target;
  if (!Romo.hasClass(itemElem, 'romo-selected-options-list-item')) {
    var itemElem = Romo.closest(itemElem, '.romo-selected-options-list-item');
  }
  if (itemElem !== undefined) {
    var value = Romo.data(itemElem, 'romo-selected-options-list-value').toString();
    Romo.trigger(this.elem, 'romoSelectedOptionsList:itemClick', [value, this]);
  }
}
