$.fn.romoDatepicker = function() {
  return $.map(this, function(element) {
    return new RomoDatepicker(element);
  });
}

var RomoDatepicker = function(element) {
  this.elem = $(element);

  this.defaultFormat    = 'yyyy-mm-dd'
  this.defaultPrevClass = undefined;
  this.defaultNextClass = undefined;
  this.itemSelector     = 'TD.romo-datepicker-day:not(.disabled)';
  this.calTable         = $();
  this.date             = undefined;
  this.today            = RomoDate.today();
  this.prevValue        = undefined;

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
  this.elem.attr('autocomplete', 'off');

  if (this.elem.data('romo-datepicker-indicator') !== undefined) {
    this.elem.attr('data-romo-indicator-text-input-indicator', this.elem.data('romo-datepicker-indicator'));
  }
  if (this.elem.data('romo-datepicker-indicator-width-px') !== undefined) {
    this.elem.attr('data-romo-indicator-text-input-indicator-width-px', this.elem.data('romo-datepicker-indicator-width-px'));
  }
  if (this.elem.data('romo-datepicker-btn-group') === true) {
    this.elem.attr('data-romo-indicator-text-input-btn-group', this.elem.data('romo-datepicker-btn-group'));
  }
  if (this.elem.data('romo-datepicker-elem-display') !== undefined) {
    this.elem.attr('data-romo-indicator-text-input-elem-display', this.elem.data('romo-datepicker-elem-display'));
  }

  this.elem.romoIndicatorTextInput();

  this.prevValue = this.elem.val();
  this.elem.on('change', $.proxy(function(e) {
    var newValue = this.elem.val();
    this.elem.trigger('datepicker:change', [newValue, this.prevValue, this]);
    this.prevValue = newValue;
  }, this));

  this.elem.on('indicatorTextInput:indicatorClick', $.proxy(function(e) {
    this._clearBlurTimeout();
    this.elem.trigger('datepicker:triggerPopupOpen');
  }, this));

  this.elem.on('datepicker:triggerEnable', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerEnable', []);
  }, this));
  this.elem.on('datepicker:triggerDisable', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerDisable', []);
  }, this));
  this.elem.on('datepicker:triggerShow', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerShow', []);
  }, this));
  this.elem.on('datepicker:triggerHide', $.proxy(function(e) {
    this.elem.trigger('indicatorTextInput:triggerHide', []);
  }, this));

  this.elem.on('datepicker:triggerSetFormat', $.proxy(function(e) {
    this.doSetFormat();
  }, this));
  this.elem.on('datepicker:triggerSetDate', $.proxy(this.onTriggerSetDate, this));
}

RomoDatepicker.prototype.doSetFormat = function() {
  this.formatString = this.elem.data('romo-datepicker-format') || this.defaultFormat;
}

RomoDatepicker.prototype.doSetDate = function(value) {
  this.date = RomoDate.parse(value);
  if (this.date !== undefined) {
    this.elem.val(RomoDate.format(this.date, this.formatString));
  } else {
    this.elem.val(value);
  }
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
  var rDate = date || this.date || this.today;
  this._refreshCalendar(rDate);
  this.elem.trigger('datepicker:refresh', [rDate, this]);

  this.calTable.find(this.itemSelector).on('mouseenter', $.proxy(this.onItemEnter, this));
  this.calTable.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.popupElem.on('mousedown', $.proxy(this.onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this.onPopupMouseUp, this));
}

RomoDatepicker.prototype.doRefreshToPrevMonth = function() {
  var date  = this.refreshDate || this.date || (new Date);
  var pDate = RomoDate.lastDateOfPrevMonth(date);
  this.doRefreshUI(pDate);
  this.elem.trigger('datepicker:prevRefresh', [pDate, this]);
}

RomoDatepicker.prototype.doRefreshToNextMonth = function() {
  var date  = this.refreshDate || this.date || (new Date);
  var nDate = RomoDate.firstDateOfNextMonth(date);
  this.doRefreshUI(nDate);
  this.elem.trigger('datepicker:nextRefresh', [nDate, this]);
}

RomoDatepicker.prototype.doSelectHighlightedItem = function() {
  var newValue  = this.calTable.find('TD.romo-datepicker-highlight').data('romo-datepicker-value');

  this.romoDropdown.doPopupClose();
  this.doSetDate(newValue);
  this.elem.focus();
  this.elem.trigger('datepicker:itemSelected', [newValue, this.prevValue, this]);
  this._triggerSetDateChangeEvent();
}

RomoDatepicker.prototype.onTriggerSetDate = function(e, value) {
  this.doSetDate(value);
  this._triggerSetDateChangeEvent();
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

RomoDatepicker.prototype.onItemEnter = function(e) {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  this._highlightItem($(e.target));
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

// private

RomoDatepicker.prototype._show = function(elem) {
  elem.css('display', '');
}

RomoDatepicker.prototype._hide = function(elem) {
  elem.css('display', 'none');
}

RomoDatepicker.prototype._triggerSetDateChangeEvent = function() {
  if (this.elem.val() !== this.prevValue) {
    this.elem.trigger('change');
  }
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
  row.append($('<th class="romo-datepicker-day">S</th>'));
  row.append($('<th class="romo-datepicker-day">M</th>'));
  row.append($('<th class="romo-datepicker-day">T</th>'));
  row.append($('<th class="romo-datepicker-day">W</th>'));
  row.append($('<th class="romo-datepicker-day">T</th>'));
  row.append($('<th class="romo-datepicker-day">F</th>'));
  row.append($('<th class="romo-datepicker-day">S</th>'));
  header.append(row);

  return header;
}

RomoDatepicker.prototype._buildCalendarTitle = function(date) {
  return RomoDate.format(date, 'MM yyyy');
}

RomoDatepicker.prototype._buildCalendarBody = function(date) {
  var html = [];

  // prefer showing as many past dates in each month as possible
  // calc the most post days we can show and still fit the date's
  // month in 6 weeks of displayed days:
  // 7 days * 6 weeks = 42 displayed days
  // 42 displayed days - {days in month} = {max past days}
  var fom  = RomoDate.firstDateOfMonth(date); // first-of-month
  var dim  = RomoDate.daysInMonth(date);      // days-in-month
  var past = fom.getDay();                    // start on this week's Sunday
  if ((past+7) <= (42-dim)) {                 // if there is enough room,
    past = past+7;                            // start on prev week's Sunday
  }
  var iDate = RomoDate.vector(fom, -past);

  var iWeek = 0;
  while (iWeek < 6) { // render 6 weeks in the calendar
    var cls = [];

    if (RomoDate.isDay(iDate, 'Sunday')) {
      html.push('<tr>');
    }

    cls.push('romo-datepicker-day');
    if (RomoDate.isWeekend(iDate)) {
      cls.push('romo-datepicker-day-weekend');
    }
    if (!RomoDate.isSameMonth(iDate, date)) {
      cls.push('romo-datepicker-day-other');
    }
    if (RomoDate.isEqual(iDate, this.today)) {
      cls.push('romo-datepicker-day-today');
    }
    if (RomoDate.isEqual(iDate, this.date)) {
      cls.push('selected');
    }

    html.push('<td');
    html.push(' class="'+cls.join(' ')+'"');
    var dt = RomoDate.format(iDate, this.formatString);
    html.push(' title="'+dt+'"');
    html.push(' data-romo-datepicker-value="'+dt+'"');
    html.push('>');
    html.push(RomoDate.format(iDate, 'd'));
    html.push('</td>');

    if (RomoDate.isDay(iDate, 'Saturday')) {
      html.push('</tr>');
      iWeek += 1;
    }
    iDate = RomoDate.next(iDate);
  }

  return $(html.join(''));
}

RomoDatepicker.prototype._highlightItem = function(item) {
  this.calTable.find('TD.romo-datepicker-highlight').removeClass('romo-datepicker-highlight');
  item.addClass('romo-datepicker-highlight');
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-datepicker-auto="true"]').romoDatepicker();
});
