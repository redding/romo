$.fn.romoDatepicker = function() {
  return $.map(this, function(element) {
    return new RomoDatepicker(element);
  });
}

var RomoDatepicker = function(element) {
  this.elem = $(element);
  this.defaultFormat = 'yyyy-mm-dd'
  this.monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  this.defaultPrevClass      = undefined;
  this.defaultNextClass      = undefined;
  this.defaultIndicatorClass = undefined;
  this.itemSelector          = 'TD.romo-datepicker-day:not(.disabled)';
  this.calTable              = $();
  this.date                  = undefined;
  this.today                 = new Date;
  this.prevValue             = undefined;

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
  var elemWrapper = $('<div class="romo-datepicker-wrapper"></div>');
  elemWrapper.css({'display': (this.elem.data('romo-datepicker-elem-display') || 'inline-block')});
  if (this.elem.data('romo-datepicker-btn-group') === true) {
    elemWrapper.addClass('romo-btn-group');
  }

  this.elem.before(elemWrapper);
  elemWrapper.append(this.elem);

  // the elem wrapper should be treated like a child elem.  add it to Romo's
  // parent-child elems so it will be removed when the elem (input) is removed.
  // delay adding it b/c the `append` statement above is not a "move", it is
  // a "remove" and "add" so if added immediately the "remove" part will
  // incorrectly remove the wrapper.  Any value will do - I chose 100 arbitrarily.
  setTimeout($.proxy(function() {
    Romo.parentChildElems.add(this.elem, [elemWrapper]);
  }, this), 1);

  this.elem.attr('autocomplete', 'off');

  this.indicatorElem = $();
  var indicatorClass = this.elem.data('romo-datepicker-indicator') || this.defaultIndicatorClass;
  if (indicatorClass !== undefined && indicatorClass !== 'none') {
    this.indicatorElem = $('<i class="romo-datepicker-indicator '+indicatorClass+'"></i>');
    this.indicatorElem.css({'line-height': this.elem.css('height')});
    if (this.elem.prop('disabled') === true) {
      this.indicatorElem.addClass('disabled');
    }
    if (this.elem.css('display') === 'none') {
      this._hide(this.indicatorElem);
    }
    this.indicatorElem.on('click', $.proxy(this.onIndicatorClick, this));
    this.elem.css({'padding-right': '22px'});
    this.elem.after(this.indicatorElem);
  }

  this.prevValue = this.elem.val();
  this.elem.on('change', $.proxy(function(e) {
    var newValue = this.elem.val();
    this.elem.trigger('datepicker:change', [newValue, this.prevValue, this]);
    this.prevValue = newValue;
  }, this));

  this.elem.on('datepicker:triggerEnable', $.proxy(function(e) {
    this.doEnable();
  }, this));
  this.elem.on('datepicker:triggerDisable', $.proxy(function(e) {
    this.doDisable();
  }, this));
  this.elem.on('datepicker:triggerShow', $.proxy(function(e) {
    this.doShow();
  }, this));
  this.elem.on('datepicker:triggerHide', $.proxy(function(e) {
    this.doHide();
  }, this));
  this.elem.on('datepicker:triggerSetFormat', $.proxy(function(e) {
    this.doSetFormat();
  }, this));
  this.elem.on('datepicker:triggerSetDate', $.proxy(this.onTriggerSetDate, this));
}

RomoDatepicker.prototype.doSetFormat = function() {
  var format = this.elem.data('romo-datepicker-format') || this.defaultFormat;
  this.formatValues = this._parseFormatValues(format);
}

RomoDatepicker.prototype.doSetDate = function(value) {
  this.date = this._parseDate(value);
  if (this.date !== undefined) {
    this.elem.val(this._formatDate(this.date));
  } else {
    this.elem.val(value);
  }
}

RomoDatepicker.prototype.doEnable = function() {
  this.elem.prop('disabled', false);
  this.elem.removeClass('disabled');
  this.indicatorElem.removeClass('disabled');
}

RomoDatepicker.prototype.doDisable = function() {
  this.elem.prop('disabled', true);
  this.elem.addClass('disabled');
  this.indicatorElem.addClass('disabled');
}

RomoDatepicker.prototype.doShow = function() {
  this._show(this.elem);
  this._show(this.indicatorElem);
}

RomoDatepicker.prototype.doHide = function() {
  this._hide(this.elem);
  this._hide(this.indicatorElem);
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
  var rDate = date || this.date || (new Date);
  this._refreshCalendar(rDate);
  this.elem.trigger('datepicker:refresh', [rDate, this]);

  this.calTable.find(this.itemSelector).on('mouseenter', $.proxy(this.onItemEnter, this));
  this.calTable.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));

  this.romoDropdown.popupElem.on('mousedown', $.proxy(this.onPopupMouseDown, this));
  this.romoDropdown.popupElem.on('mouseup',   $.proxy(this.onPopupMouseUp, this));
}

RomoDatepicker.prototype.doRefreshToPrevMonth = function() {
  var date = this.refreshDate || this.date || (new Date);
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() - 1;
  if (month < 0) {
    year -= 1;
    month = 11;
  }

  var pDate = this._UTCDate(year, month, 1);
  this.doRefreshUI(pDate);
  this.elem.trigger('datepicker:prevRefresh', [pDate, this]);
}

RomoDatepicker.prototype.doRefreshToNextMonth = function() {
  var date = this.refreshDate || this.date || (new Date);
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  if (month > 11) {
    year += 1;
    month = 0;
  }

  var nDate = this._UTCDate(year, month, 1);
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

RomoDatepicker.prototype.onIndicatorClick = function(e) {
  this._clearBlurTimeout();
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (this.elem.prop('disabled') === false) {
    this.elem.focus();
    this.elem.trigger('datepicker:triggerPopupOpen');
  }
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
  row.append($('<th class="romo-datepicker-day">Su</th>'));
  row.append($('<th class="romo-datepicker-day">M</th>'));
  row.append($('<th class="romo-datepicker-day">T</th>'));
  row.append($('<th class="romo-datepicker-day">W</th>'));
  row.append($('<th class="romo-datepicker-day">Th</th>'));
  row.append($('<th class="romo-datepicker-day">F</th>'));
  row.append($('<th class="romo-datepicker-day">S</th>'));
  header.append(row);

  return header;
}

RomoDatepicker.prototype._buildCalendarTitle = function(date) {
  return this.monthNames[date.getUTCMonth()] + ' ' + date.getUTCFullYear().toString();
}

RomoDatepicker.prototype._buildCalendarBody = function(date) {
  var ty = this.today.getUTCFullYear();
  var tm = this.today.getUTCMonth();
  var td = this.today.getUTCDate();
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth();
  var day = date.getUTCDate();
  var fomdow = this._UTCDate(year, month, 1).getUTCDay(); // first-of-the-month day-of-the-week
  if (fomdow == 0) {
    fomdow = 7;  // don't start calendar on the first-of-the-month, show last week of prev month
  }
  var iDate = this._UTCDate(year, month, 1 - fomdow);
  var iWeek = 0;
  var html = [];

  while (iWeek < 6) { // render 6 weeks in the calendar
    var y = iDate.getUTCFullYear();
    var m = iDate.getUTCMonth();
    var d = iDate.getUTCDate();
    var dow = iDate.getUTCDay();
    var cls = [];

    if (dow === 0) {
      html.push('<tr>');
    }

    cls.push('romo-datepicker-day');
    if (dow === 0 || dow === 6) {
      cls.push('romo-datepicker-day-weekend');
    }
    if (y !== year || m !== month) {
      cls.push('romo-datepicker-day-other');
    }
    if (y === ty && m === tm && d === td) {
      cls.push('romo-datepicker-day-today');
    }
    if (this.date &&
        y === this.date.getUTCFullYear() &&
        m === this.date.getUTCMonth() &&
        d === this.date.getUTCDate()) {
      cls.push('selected');
    }

    html.push('<td');
    html.push(' class="'+cls.join(' ')+'"');
    var dt = this._formatDate(iDate);
    html.push(' title="'+dt+'"');
    html.push(' data-romo-datepicker-value="'+dt+'"');
    html.push('>');
    html.push(d.toString());
    html.push('</td>');

    if (dow === 6) {
      html.push('</tr>');
      iWeek += 1;
    }
    iDate.setUTCDate(iDate.getUTCDate()+1);
  }

  return $(html.join(''));
}

RomoDatepicker.prototype._highlightItem = function(item) {
  this.calTable.find('TD.romo-datepicker-highlight').removeClass('romo-datepicker-highlight');
  item.addClass('romo-datepicker-highlight');
}

RomoDatepicker.prototype._formatDate = function(date) {
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();

  return this.formatValues.reduce(function(prev, curr) {
    switch (curr) {
      case "yyyy":
      case "yyy":
        prev += year.toString();
        break;
      case "yy":
      case "y":
        prev += year.toString().slice(-2);
        break;
      case "mm":
        prev += ("00"+ month.toString()).slice(-2); // pad 2 with "0"s
        break;
      case "m":
        prev += month.toString();
        break;
      case "dd":
        prev += ("00"+ day.toString()).slice(-2); // pad 2 with "0"s
        break;
      case "d":
        prev += day.toString();
        break;
      default:
        prev += curr; // delimeter, pass-thru
    }
    return prev;
  }, '');
}

RomoDatepicker.prototype._parseFormatValues = function(value) {
  var regex, matches;

  regex = /^([m]{1,2})([^md]+)([d]{1,2})([^dy]+)([y]{2,4})$/; // mm dd yyyy or mm dd yy
  matches = this._regexMatches(value, regex);
  if (matches.length === 5) {
    return matches;
  }

  regex = /^([y]{3,4})([^ym]+)([m]{1,2})([^md]+)([d]{1,2})$/; // yyyy mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 5) {
    return matches;
  }

  return ['yyyy', '-', 'mm', '-', 'dd'];
}

RomoDatepicker.prototype._parseDate = function(value) {
  if (value.trim() === '') {
    return undefined;
  }

  var dateValues = this._parseDateValues(value.trim());
  if (dateValues.length === 0) {
    return undefined;
  }

  var year = parseInt(dateValues[0]);
  if (year < 0) {
    return undefined;
  }
  if (dateValues[0].length > 2 && year < 100) {
    return undefined;
  }
  if (dateValues[0].length === 2 && year < 100) {
    year = this._currentYear() - (this._currentYear() % 1000) + year;
  }

  var month = parseInt(dateValues[1]) - 1;
  if (month < 0 || month > 11) {
    return undefined;
  }

  var day = parseInt(dateValues[2]);
  var date = this._UTCDate(year, month, day);
  if (date.getUTCMonth() !== month) {
    return undefined;
  }

  return date;
}

RomoDatepicker.prototype._parseDateValues = function(value) {
  var regex, matches;

  regex = /^([0-9]{1,2})[^0-9]+([0-9]{1,2})[^0-9]+([0-9]{2,4})$/; // mm dd yyyy or mm dd yy
  matches = this._regexMatches(value, regex);
  if (matches.length === 3) {
    return [matches[2], matches[0], matches[1]];
  }

  regex = /^([0-9]{3,4})[^0-9]+([0-9]{1,2})[^0-9]+([0-9]{1,2})$/; // yyyy mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 3) {
    return matches;
  }

  regex = /^([0-9]{1,2})[^0-9]+([0-9]{1,2})$/; // mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 2) {
    return [this._currentYear(), matches[0], matches[1]];
  }

  return [];
}

RomoDatepicker.prototype._regexMatches = function(value, regex) {
  if (regex.test(value) === true) {
    return regex.exec(value).slice(1);
  }
  return [];
}

RomoDatepicker.prototype._currentYear = function() {
  return (new Date).getUTCFullYear();
}

RomoDatepicker.prototype._UTCDate = function(year, month, day) {
  return new Date(Date.UTC.apply(Date, [year, month, day]));
}

Romo.onInitUI(function(e) {
  Romo.initUIElems(e, '[data-romo-datepicker-auto="true"]').romoDatepicker();
});
