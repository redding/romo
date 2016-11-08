$.fn.romoSortable = function() {
  return $.map(this, function(element) {
    return new RomoSortable(element);
  });
}

var RomoSortable = function(element) {
  this.elem = $(element);

  this.draggableSelector = '[data-romo-sortable-item="true"]';
  this.handleSelector = '[data-romo-sortable-handle="true"]';

  this.draggedElem = this.draggedIndex = this.draggableSelected = null;
  this.draggedOverElem = this.dragDirection = this.lastY = null;

  this.doInit();
  this.doBindDraggables();
  this.doInitPlaceholder();
  this._resetGrabClasses();

  this.elem.trigger('sortable:ready', [this]);
}

RomoSortable.prototype.doInit = function() {
  // override as needed
}

RomoSortable.prototype.doBindDraggables = function() {
  this.draggingClass    = this.elem.data('romo-sortable-dragging-class') || '';
  this.dragOverClass    = this.elem.data('romo-sortable-dragover-class') || '';
  this.placeholderClass = this.elem.data('romo-sortable-placeholder-class') || '';

  this.draggableElems = this.elem.find(this.draggableSelector);
  this.draggableElems.prop('draggable', 'true');

  this.elem.on('dragenter', $.proxy(this.onDragEnter, this));
  this.elem.on('dragover',  $.proxy(this.onDragOver,  this));
  this.elem.on('dragend',   $.proxy(this.onDragEnd,   this));
  this.elem.on('drop',      $.proxy(this.onDragDrop,  this));

  this.draggableElems.on('dragstart',  $.proxy(this.onDragStart,          this));
  this.draggableElems.on('dragenter',  $.proxy(this.onDragEnter,          this));
  this.draggableElems.on('dragover',   $.proxy(this.onDragOver,           this));
  this.draggableElems.on('dragend',    $.proxy(this.onDragEnd,            this));
  this.draggableElems.on('drop',       $.proxy(this.onDragDrop,           this));
  this.draggableElems.on('mousedown',  $.proxy(this.onDraggableMouseDown, this));

  var handleElems = this.draggableElems.find(this.handleSelector);
  handleElems.on('mousedown', $.proxy(this.onHandleMouseDown, this));

  $('body').on('mouseup', $.proxy(this.onWindowBodyMouseUp, this));
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
  this._resetGrabClasses();
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
