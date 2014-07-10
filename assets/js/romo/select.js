$.fn.romoSelect = function() {
  return $.map(this, function(element) {
    return new RomoSelect(element);
  });
}

var RomoSelect = function(element) {
  this.elem = $(element);
  this.defaultCaretClass = '';

  this.doInit();
  this.romoDropdown = this._buildDropdownElem().romoDropdown()[0];
  this.romoDropdown.bodyElem.addClass('romo-select-option-list');
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));
  this.doRefreshUI();
  this.elem.after(this.romoDropdown.elem);

  this.elem.on('select:triggerToggle', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('select:triggerPopupOpen', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('select:triggerPopupClose', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));

  this.elem.trigger('select:ready', [this]);
}

RomoSelect.prototype.doInit = function() {
  // override as needed
}

RomoSelect.prototype.doRefreshUI = function() {
  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this._buildOptionList(this.elem.children()));

  this.romoDropdown.bodyElem.find('LI').on('hover', $.proxy(this.onItemHover, this));
  // TODO: set selected option in UI
  if (this.elem.attr('disabled') !== undefined) {
    this.romoDropdown.elem.attr('disabled', this.elem.attr('disabled'));
  }
}

RomoSelect.prototype.onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
    this.romoDropdown.bodyElem.find('LI.selected').addClass('romo-select-highlight');
    this._scrollTopToItem(this.romoDropdown.bodyElem.find('LI.selected'));
  }

  $('body').on('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelect.prototype.onPopupClose = function(e) {
  $('body').off('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelect.prototype.onItemHover = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
    $(e.target).addClass('romo-select-highlight');
  }
}

RomoSelect.prototype.onPopupOpenBodyKeyDown = function(e) {
  if (e !== undefined) {
    e.stopPropagation();
  }

  var scroll = this.romoDropdown.bodyElem;

  if (e.keyCode === 38 /* Up */) {
    var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
    var prev = curr.prev(':not(.disabled)');
    if (prev.size() === 0) {
      prev = this.romoDropdown.bodyElem.find('LI').last();
    }

    this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
    prev.addClass('romo-select-highlight');
    if (scroll.offset().top > prev.offset().top) {
      this._scrollTopToItem(prev);
    } else if ((scroll.offset().top + scroll.height()) < prev.offset().top) {
      this._scrollTopToItem(prev);
    }

    return false;
  } else if(e.keyCode === 40 /* Down */) {
    var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
    var next = curr.next(':not(.disabled)');
    if (next.size() === 0) {
      next = this.romoDropdown.bodyElem.find('LI').first();
    }

    this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
    next.addClass('romo-select-highlight');
    if ((scroll.offset().top + scroll.height()) < next.offset().top) {
      this._scrollBottomToItem(next);
    } else if (scroll.offset().top > next.offset().top) {
      this._scrollTopToItem(next);
    }

    return false;
  } else {
    return true;
  }
}

RomoSelect.prototype._scrollTopToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = item.height() / 2;

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelect.prototype._scrollBottomToItem = function(item) {
  if (item.size() > 0) {
    var scroll = this.romoDropdown.bodyElem;
    scroll.scrollTop(0);

    var scrollOffsetTop = scroll.offset().top;
    var selOffsetTop = item.offset().top;
    var selOffset = scroll[0].offsetHeight - item.height();

    scroll.scrollTop(selOffsetTop - scrollOffsetTop - selOffset);
  }
}

RomoSelect.prototype._buildDropdownElem = function() {
  var romoDropdownElem = $('<div class="romo-select"><span>Value</span><i class=""></i></div>');

  romoDropdownElem.attr('data-romo-dropdown-position', this.elem.data('romo-select-dropdown-position'));
  romoDropdownElem.attr('data-romo-dropdown-style-class', this.elem.data('romo-select-dropdown-style-class'));
  romoDropdownElem.attr('data-romo-dropdown-min-height', this.elem.data('romo-select-dropdown-min-height'));
  romoDropdownElem.attr('data-romo-dropdown-max-height', this.elem.data('romo-select-dropdown-max-height'));
  romoDropdownElem.attr('data-romo-dropdown-height', this.elem.data('romo-select-dropdown-height'));
  romoDropdownElem.attr('data-romo-dropdown-overflow-x', 'hidden');
  romoDropdownElem.attr('data-romo-dropdown-width', 'elem');

  var classList = this.elem.attr('class') !== undefined ? this.elem.attr('class').split(/\s+/) : [];
  $.each(classList, function(idx, classItem) {
    romoDropdownElem.addClass(classItem);
  });

  if (this.elem.attr('style') !== undefined) {
    romoDropdownElem.attr('style', this.elem.attr('style'));
  }

  romoDropdownElem.css({'width': this.elem.css('width')});
  var span = romoDropdownElem.find('> span');
  var icon = romoDropdownElem.find('> i');
  var width = parseInt(romoDropdownElem.css('width'));
  if (width < 100) {
    span.css({'width': '70%', 'padding-left': '10%'});
    icon.css({'width': '30%', 'padding-right': '10%'});
  } else if (width < 200) {
    span.css({'width': '80%', 'padding-left': '5%'});
    icon.css({'width': '20%', 'padding-right': '5%'});
  } else {
    span.css({'width': '90%', 'padding-left': '5%'});
    icon.css({'width': '10%', 'padding-right': '5%'});
  }
  icon.addClass(this.elem.data('romo-select-caret-class') || this.defaultCaretClass);

  return romoDropdownElem;
}

RomoSelect.prototype._buildOptionList = function(optionElems, listClass) {
  var list = $('<ul></ul>');
  list.addClass(listClass);
  $.each(optionElems, $.proxy(function(idx, elem) {
    if (elem.tagName === "OPTION") {
      list.append(this._buildOptionListItem(elem));
    } else if (elem.tagName === "OPTGROUP") {
      list.append(this._buildOptionListItem(elem));
    }
  }, this));
  return list;
}

RomoSelect.prototype._buildOptionListItem = function(optionElem) {
  var opt = $(optionElem);
  var item = $('<li></li>');

  item.attr('data-romo-select-option-value', opt.attr('value'));
  item.text(opt.text().trim());
  if (opt.prop('selected')) {
    item.addClass('selected');
  }
  if (opt.attr('disabled') !== undefined) {
    item.addClass('disabled');
  }

  return item;
}

RomoSelect.prototype._buildOptGroupListItem = function(optGroupElem) {
  var item = $('<li></li>');

  // TODO:
  // item.append(); // add divider and dt? for optgroup
  // item.append(this._buildOptGroupListItem($(elem).children(), 'romo-select-optgroup'));

  return item;
}


Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-select-auto="true"]').romoSelect();
});
