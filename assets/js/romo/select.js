$.fn.romoSelect = function() {
  return $.map(this, function(element) {
    return new RomoSelect(element);
  });
}

var RomoSelect = function(element) {
  this.elem = $(element);
  this.defaultCaretClass = '';
  this.itemSelector = 'LI[data-romo-select-item="opt"]:not(.disabled)';

  this.doInit();
  this.doBindDropdown();
  if (this.elem.attr('id') !== undefined) {
    $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
      this.romoDropdown.elem.focus();
    }, this));
  }
  this.elem.hide();

  this.elem.trigger('select:ready', [this]);
}

RomoSelect.prototype.doInit = function() {
  // override as needed
}

RomoSelect.prototype.doBindDropdown = function() {
  this.romoDropdown = this._buildDropdownElem().romoDropdown()[0];
  this.romoDropdown.doSetPopupZIndex(parseInt(this.elem.css('z-index')));
  this.romoDropdown.bodyElem.addClass('romo-select-option-list');
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));
  this.romoDropdown.elem.on('keydown', $.proxy(this.onElemKeyDown, this));
  this.romoDropdown.popupElem.on('keydown', $.proxy(this.onElemKeyDown, this));

  this.romoDropdown.elem.on('dropdown:toggle', $.proxy(function(e, dropdown) {
    this.elem.trigger('select:dropdown:toggle', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(function(e, dropdown) {
    this.elem.trigger('select:dropdown:popupOpen', [dropdown, this]);
  }, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(function(e, dropdown) {
    this.elem.trigger('select:dropdown:popupClose', [dropdown, this]);
  }, this));

  this.elem.on('select:triggerToggle', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerToggle', []);
  }, this));
  this.elem.on('select:triggerPopupOpen', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupOpen', []);
  }, this));
  this.elem.on('select:triggerPopupClose', $.proxy(function(e) {
    this.romoDropdown.elem.trigger('dropdown:triggerPopupClose', []);
  }, this));

  $(window).on("pageshow", $.proxy(function(e) {
    var selectedVal = this.elem.find('option[selected]').attr('value');
    if (selectedVal === undefined) {
      selectedVal = '';
    }

    if (selectedVal !== this.elem[0].value) {
      this.elem[0].value = selectedVal;
      this.doRefreshUI();
    }
  }, this));

  this.doRefreshUI();
  this.elem.after(this.romoDropdown.elem);
}

RomoSelect.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.elem[0].value;
  var newValue = this.romoDropdown.bodyElem.find('LI.romo-select-highlight').data('romo-select-option-value');

  this.romoDropdown.doPopupClose();
  this.elem.trigger('select:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this.elem[0].value = newValue;
    this.doRefreshUI();

    this.elem.trigger('change');
    this.elem.trigger('select:change', [newValue, prevValue, this]);
  }
}

RomoSelect.prototype.doRefreshUI = function() {
  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this._buildOptionList(this.elem.children()));

  this.romoDropdown.bodyElem.find(this.itemSelector).on('hover', $.proxy(this.onItemHover, this));
  this.romoDropdown.bodyElem.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.elem.find('span').text(this.romoDropdown.bodyElem.find('LI.selected').text());
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
  this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
  $('body').off('keydown', $.proxy(this.onPopupOpenBodyKeyDown, this));
}

RomoSelect.prototype.onItemHover = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
  $(e.target).addClass('romo-select-highlight');
}

RomoSelect.prototype.onItemClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  this.doSelectHighlightedItem();
}

RomoSelect.prototype.onPopupOpenBodyKeyDown = function(e) {
  if (e !== undefined) {
    e.stopPropagation();
  }

  var scroll = this.romoDropdown.bodyElem;

  if (e.keyCode === 38 /* Up */) {
    var curr = this.romoDropdown.bodyElem.find('LI.romo-select-highlight');
    var prev = this._prevAll(curr, this.itemSelector).last();
    if (prev.size() === 0) {
      prev = this.romoDropdown.bodyElem.find(this.itemSelector).last();
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
    var next = this._nextAll(curr, this.itemSelector).first();
    if (next.size() === 0) {
      next = this.romoDropdown.bodyElem.find(this.itemSelector).first();
    }

    this.romoDropdown.bodyElem.find('LI.romo-select-highlight').removeClass('romo-select-highlight');
    next.addClass('romo-select-highlight');
    if ((scroll.offset().top + scroll.height()) < next.offset().top + next.height()) {
      this._scrollBottomToItem(next);
    } else if (scroll.offset().top > next.offset().top) {
      this._scrollTopToItem(next);
    }

    return false;
  } else {
    return true;
  }
}

RomoSelect.prototype.onElemKeyDown = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    if (this.romoDropdown.popupElem.hasClass('romo-dropdown-open')) {
      if(e.keyCode === 13 /* Enter */ ) {
        this.doSelectHighlightedItem();
        return false;
      } else {
        return true;
      }
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
  var romoDropdownElem = $('<div class="romo-select" tabindex="0"><span></span><i class=""></i></div>');

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
  var item = $('<li data-romo-select-item="opt"></li>');

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
  var item = $('<li data-romo-select-item="optgroup"></li>');

  // TODO:
  // item.append(); // add divider and dt? for optgroup
  // item.append(this._buildOptGroupListItem($(elem).children(), 'romo-select-optgroup'));

  return item;
}

RomoSelect.prototype._nextAll = function(elem, selector) {
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

RomoSelect.prototype._prevAll = function(elem, selector) {
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

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-select-auto="true"]').romoSelect();
});
