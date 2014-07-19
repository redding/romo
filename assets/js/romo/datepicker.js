$.fn.romoDatepicker = function() {
  return $.map(this, function(element) {
    return new RomoDatepicker(element);
  });
}

var RomoDatepicker = function(element) {
  this.elem = $(element);
  this.defaultLeftArrowClass  = '';
  this.defaultRightArrowClass = '';
  this.defaultIndicatorClass  = '';
  this.itemSelector = 'TD.romo-datepicker-item:not(.disabled)';
  this.calendarElem = $();

  this.doInit();
  this.doBindDropdown();
  this.doBuildUI();

  // if (this.elem.attr('id') !== undefined) {
  //   $('label[for="'+this.elem.attr('id')+'"]').on('click', $.proxy(function(e) {
  //     this.romoDropdown.elem.focus();
  //   }, this));
  // }

  this.elem.trigger('datepicker:ready', [this]);
}

RomoDatepicker.prototype.doInit = function() {
  // override as needed
}

RomoDatepicker.prototype.doBindDropdown = function() {
  this.elem.addClass('romo');
  if (this.elem.data('romo-dropdown-width') === undefined) {
    this.elem.attr('data-romo-dropdown-width', 'elem');
  }
  this.romoDropdown = this.elem.romoDropdown()[0];

  this.romoDropdown.doSetPopupZIndex(parseInt(this.elem.css('z-index')));
  this.romoDropdown.bodyElem.addClass('romo-datepicker-calendar');
  this.romoDropdown.elem.on('dropdown:popupOpen', $.proxy(this.onPopupOpen, this));
  this.romoDropdown.elem.on('dropdown:popupClose', $.proxy(this.onPopupClose, this));

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
  this.calendarElem = this._buildCalendar();
  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this.calendarElem);
  this.doRefreshUI();
}

RomoDatepicker.prototype.doRefreshUI = function() {
  // remove item rows from calendar
  // build item rows and add after calendar headers

  this.calendarElem.find(this.itemSelector).on('hover', $.proxy(this.onItemHover, this));
  this.calendarElem.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));
}

RomoDatepicker.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.elem[0].value;
  var newValue = this.calendarElem.find('TD.romo-datepicker-highlight').data('romo-datepicker-item-value');

  this.romoDropdown.doPopupClose();
  this.elem.trigger('datepicker:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this._setElemValue = newValue;
    this.doRefreshUI();

    this.elem.trigger('change');
    this.elem.trigger('datepicker:change', [newValue, prevValue, this]);
  }
}

RomoDatepicker.prototype.onPopupOpen = function(e) {
  if (this.elem.hasClass('disabled') === false) {
    this._highlightItem(this.calendarElem.find('TD.selected'));
  }
}

RomoDatepicker.prototype.onPopupClose = function(e) {
  this._highlightItem($());
}

RomoDatepicker.prototype.onItemHover = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this._highlightItem($(e.target));
}

RomoDatepicker.prototype.onItemClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doSelectHighlightedItem();
}

RomoDatepicker.prototype._buildCalendar = function() {
  // TODO
  return $('<p>Calendar Goes Here</p>');
}

RomoDatepicker.prototype._refreshCalendar = function(elemValue) {
  // TODO
}

RomoDatepicker.prototype._addIndicatorToElem = function() {
  // TODO, if opt and indicator icon class
  // create icon
  // append to elem
}

RomoDatepicker.prototype._highlightItem = function(item) {
  this.calendarElem.find('TD.romo-datepicker-highlight').removeClass('romo-datepicker-highlight');
  item.addClass('romo-datepicker-highlight');
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-datepicker-auto="true"]').romoDatepicker();
});
