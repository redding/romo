var RomoSortable = function(elem) {
  this.elem = elem;

  this.draggableSelector = '[data-romo-sortable-item="true"]';
  this.handleSelector    = '[data-romo-sortable-handle="true"]';

  this.draggedElem       = undefined;
  this.draggedIndex      = undefined;
  this.draggableSelected = undefined;
  this.draggedOverElem   = undefined;
  this.dragDirection     = undefined;
  this.lastY             = undefined;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoSortable:ready', [this]);
}

RomoSortable.prototype.doInit = function() {
  // override as needed
}

RomoSortable.prototype.draggingClass = function() {
  return Romo.data(this.elem, 'romo-sortable-dragging-class');
}

RomoSortable.prototype.dragOverClass = function() {
  return Romo.data(this.elem, 'romo-sortable-dragover-class');
}

RomoSortable.prototype.placeholderClass = function() {
  return Romo.data(this.elem, 'romo-sortable-placeholder-class');
}

// private

RomoSortable.prototype._bindElem = function() {
  this.draggableElems = [];
  this._bindDraggableElems(Romo.find(this.elem, this.draggableSelector));

  Romo.on(this.elem, 'romoSortable:bindDraggableElems', Romo.proxy(this._onBindDraggableElems, this));

  Romo.on(this.elem, 'dragenter', Romo.proxy(this._onDragEnter, this));
  Romo.on(this.elem, 'dragover',  Romo.proxy(this._onDragOver,  this));
  Romo.on(this.elem, 'dragend',   Romo.proxy(this._onDragEnd,   this));
  Romo.on(this.elem, 'drop',      Romo.proxy(this._onDragDrop,  this));

  Romo.on(Romo.f('body')[0], 'mouseup', Romo.proxy(this._onWindowBodyMouseUp, this));

  this._bindPlaceholder();
  this._resetGrabClasses();
}

RomoSortable.prototype._bindPlaceholder = function() {
  var tag = undefined;
  try {
    tag = this.draggableElems[0].tagName;
  } catch(e) {
    tag = /^ul|ol$/i.test(this.elem.tagName) ? 'li' : 'div';
  }
  this.placeholderElem = Romo.elems('<' + tag + '/>')[0];
  if (this.placeholderClass() !== undefined) {
    Romo.addClass(this.placeholderElem, this.placeholderClass());
  }

  Romo.on(this.placeholderElem, 'dragover', Romo.proxy(this._onDragOver, this));
  Romo.on(this.placeholderElem, 'drop',     Romo.proxy(this._onDragDrop, this));
}

RomoSortable.prototype._bindDraggableElems = function(draggableElems) {
  draggableElems.forEach(Romo.proxy(function(draggableElem) {
    draggableElem.draggable = true;

    Romo.on(draggableElem, 'dragstart',  Romo.proxy(this._onDragStart,          this));
    Romo.on(draggableElem, 'dragenter',  Romo.proxy(this._onDragEnter,          this));
    Romo.on(draggableElem, 'dragover',   Romo.proxy(this._onDragOver,           this));
    Romo.on(draggableElem, 'dragend',    Romo.proxy(this._onDragEnd,            this));
    Romo.on(draggableElem, 'drop',       Romo.proxy(this._onDragDrop,           this));
    Romo.on(draggableElem, 'mousedown',  Romo.proxy(this._onDraggableMouseDown, this));

    var handleElem = Romo.find(draggableElem, this.handleSelector)[0];
    Romo.on(handleElem, 'mousedown', Romo.proxy(this._onHandleMouseDown, this));
  }, this));

  this.draggableElems = this.draggableElems.concat(draggableElems);
  this._resetGrabClasses();
}

RomoSortable.prototype._onBindDraggableElems = function(e, draggableElems) {
  this._bindDraggableElems(draggableElems);
}

RomoSortable.prototype._onDragStart = function(e) {
  if(!this.draggableSelected){ return false; }

  e.stopPropagation();
  e.dataTransfer.effectAllowed = 'move';

  // IE fix
  try {
    // FF fix, it won't drag without some data being set
    e.dataTransfer.setData('text/plain', null);
  } catch(e) {}

  this.draggedElem = e.target;
  if (this.draggingClass() !== undefined) {
    Romo.addClass(this.draggedElem, this.draggingClass());
  }

  // we need to disable Romo's parentRemovedObserver mutation
  // observer which would remove any child elems (ie modal,
  // dropdown, tooltip popups).
  // we don't want any child elems of the draggedElem removed
  // just b/c it is temporarily removed from the DOM due to
  // it being dragged.  It will be returned to the DOM once
  // the drag is finished.
  // we manually enable the mutation observer for the dragged
  // elem below after we do the `insertBefore` call.
  Romo.setData(this.draggedElem, 'romo-parent-removed-observer-disabled', true);

  var elems = Romo.children(Romo.parent(this.draggedElem));
  this.draggedIndex = elems.indexOf(this.draggedElem);

  Romo.setStyle(this.placeholderElem, 'height', Romo.css(this.draggedElem, 'height'));

  Romo.trigger(this.elem, 'romoSortable:dragStart', [this.draggedElem, this]);
}

RomoSortable.prototype._onDragEnter = function(e) {
  e.preventDefault();
  e.stopPropagation();

  // return if event is fired on the placeholder
  if(this.placeholderElem === e.currentTarget){ return; }

  Romo.show(this.placeholderElem);
  Romo.hide(this.draggedElem);

  // if event is not fired on the sortable
  var overSortableElem = this.elem === e.currentTarget;
  var clientX          = e.clientX;
  var clientY          = e.clientY;
  if (!overSortableElem) {
    // if we are in the same elem and moving the same direction, exit out
    var overSameElem  = this.draggedOverElem !== undefined &&
                        this.draggedOverElem === e.currentTarget;
    var sameDirection = (this.dragDirection === 'down' && clientY > this.lastY) ||
                        (this.dragDirection === 'up'   && clientY < this.lastY);
    if(overSameElem && sameDirection){ return; }

    // remove dragged over classes from previous elem
    if(this.draggedOverElem !== undefined && this.dragOverClass() !== undefined) {
      Romo.removeClass(this.draggedOverElem, this.dragOverClass());
    }
    this.draggedOverElem = e.currentTarget;
    this.lastY           = clientY;
    if (this.dragOverClass() !== undefined) {
      Romo.addClass(this.draggedOverElem, this.dragOverClass());
    }

    // insert the placeholder according to the dragging direction
    var elems = Romo.children(Romo.parent(this.placeholderElem));
    var placeholderIndex = elems.indexOf(this.placeholderElem);

    elems = Romo.children(Romo.parent(this.draggedOverElem));
    var draggedOverIndex = elems.indexOf(this.draggedOverElem);

    if (placeholderIndex < draggedOverIndex) {
      this.dragDirection = 'down';
    } else {
      this.dragDirection = 'up';
    }

    var insertMethod = this.dragDirection === 'down' ? 'after' : 'before';
    Romo[insertMethod](this.draggedOverElem, this.placeholderElem);
  }

  Romo.trigger(this.elem, 'romoSortable:dragMove', [clientX, clientY, this.draggedElem, this]);
}

RomoSortable.prototype._onDragOver = function(e) {
  // This is how you allow an element to receive a drop event.
  e.preventDefault();
  e.stopPropagation();
}

RomoSortable.prototype._onDragEnd = function(e) {
  e.stopPropagation();
  e.preventDefault();

  if(this.draggedElem === undefined){ return; }

  if (this.dragOverClass() !== undefined) {
    this.draggableElems.forEach(Romo.proxy(function(draggableElem) {
      Romo.removeClass(draggableElem, this.dragOverClass());
    }, this));
  }
  if (this.draggingClass() !== undefined) {
    Romo.removeClass(this.draggedElem, this.draggingClass());
  }
  Romo.show(this.draggedElem);
  Romo.hide(this.placeholderElem);
  this._resetGrabClasses();

  Romo.trigger(this.elem, 'romoSortable:dragStop', [this.draggedElem, this]);

  this.draggedElem       = undefined;
  this.draggedIndex      = undefined;
  this.draggableSelected = undefined;
  this.draggedOverElem   = undefined;
  this.dragDirection     = undefined;
  this.lastY             = undefined;
}

RomoSortable.prototype._onDragDrop = function(e) {
  e.stopPropagation();
  e.preventDefault();

  if(this.draggedElem === undefined){ return; }

  Romo.before(this.placeholderElem, this.draggedElem);
  Romo.show(this.draggedElem);

  // manually enable Romo's parentRemovedObserver mutation
  // observer which resumes removing any child elems (ie modal,
  // dropdown, tooltip popups) like normal.
  // we have to put this in a timeout so the reactor loop has a
  // chance to run the mutation observer before we re-enable
  setTimeout(Romo.proxy(function() {
    Romo.setData(this.draggedElem, 'romo-parent-removed-observer-disabled', false);
  }, this), 1);

  var elems    = Romo.children(Romo.parent(this.draggedElem));
  var newIndex = elems.indexOf(this.draggedElem);
  if (newIndex !== this.draggedIndex) {
    Romo.trigger(this.elem, 'romoSortable:change', [this.draggedElem, this]);
  }
  Romo.trigger(this.elem, 'romoSortable:dragDrop', [this.draggedElem, this]);
}

RomoSortable.prototype._onDraggableMouseDown = function(e) {
  // if our draggable elem doesn't have a handle then it's draggable
  var draggableElem = e.currentTarget;
  if(Romo.find(draggableElem, this.handleSelector).length === 0) {
    Romo.removeClass(draggableElem, 'romo-sortable-grab');
    Romo.addClass(draggableElem, 'romo-sortable-grabbing');
    this.draggableSelected = true;
  }
}

RomoSortable.prototype._onHandleMouseDown = function(e) {
  this.draggableSelected = true;
  var handleElem = e.currentTarget;
  Romo.removeClass(handleElem, 'romo-sortable-grab');
  Romo.addClass(handleElem, 'romo-sortable-grabbing');
}

RomoSortable.prototype._onWindowBodyMouseUp = function(e) {
  this.draggableSelected = false;
  this._resetGrabClasses();
}

RomoSortable.prototype._resetGrabClasses = function() {
  this.draggableElems.forEach(Romo.proxy(function(draggableElem) {
    handleElem = Romo.find(draggableElem, this.handleSelector)[0];
    if(handleElem === undefined){ handleElem = draggableElem; }

    Romo.addClass(handleElem, 'romo-sortable-grab');
    Romo.removeClass(handleElem, 'romo-sortable-grabbing');
  }, this));
}

Romo.addElemsInitSelector('[data-romo-sortable-auto="true"]', RomoSortable);
