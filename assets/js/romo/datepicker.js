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
  this.defaultLeftArrowClass  = '';
  this.defaultRightArrowClass = '';
  this.defaultIndicatorClass  = '';
  this.itemSelector = 'TD.romo-datepicker-day:not(.disabled)';
  this.calTable = $();
  this.date = undefined;
  this.today = new Date;

  this.doInit();
  this.doSetFormat();
  this.doSetDate(this.elem.val());
  this.doBindDropdown();
  this.doBuildUI();

  this.elem.trigger('datepicker:ready', [this]);
}

RomoDatepicker.prototype.doInit = function() {
  // override as needed
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

RomoDatepicker.prototype.doBindDropdown = function() {
  this.elem.addClass('romo');
  this.elem.attr('data-romo-dropdown-disable-toggle', 'true');
  if (this.elem.data('romo-dropdown-width') === undefined) {
    this.elem.attr('data-romo-dropdown-width', 'elem');
  }
  this.romoDropdown = this.elem.romoDropdown()[0];

  this.romoDropdown.doSetPopupZIndex(this.elem);
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
  this.calTable = this._buildCalendar();
  this.romoDropdown.bodyElem.html('');
  this.romoDropdown.bodyElem.append(this.calTable);

  this.calTable.find('.romo-datepicker-prev').on('click', $.proxy(this.onPrevClick, this));
  this.calTable.find('.romo-datepicker-next').on('click', $.proxy(this.onNextClick, this));
}

RomoDatepicker.prototype.doRefreshUI = function(date) {
  this._refreshCalendar(date || this.date || (new Date));
  this.calTable.find(this.itemSelector).on('hover', $.proxy(this.onItemHover, this));
  this.calTable.find(this.itemSelector).on('click', $.proxy(this.onItemClick, this));
}

RomoDatepicker.prototype.doRefreshToPrevMonth = function() {
  var date = this.refreshDate || this.date || (new Date);
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() - 1;
  if (month < 0) {
    year -= 1;
    month = 11;
  }

  this.doRefreshUI(this._UTCDate(year, month, 1));
}

RomoDatepicker.prototype.doRefreshToNextMonth = function() {
  var date = this.refreshDate || this.date || (new Date);
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  if (month > 11) {
    year += 1;
    month = 0;
  }

  this.doRefreshUI(this._UTCDate(year, month, 1));
}

RomoDatepicker.prototype.doSelectHighlightedItem = function() {
  var prevValue = this.elem.val();
  var newValue = this.calTable.find('TD.romo-datepicker-highlight').data('romo-datepicker-value');

  this.romoDropdown.doPopupClose();
  this.elem.trigger('datepicker:itemSelected', [newValue, prevValue, this]);

  if (newValue !== prevValue) {
    this.doSetDate(newValue);

    this.elem.trigger('change');
    this.elem.trigger('datepicker:change', [newValue, prevValue, this]);
  }
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

RomoDatepicker.prototype.onPrevClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doRefreshToPrevMonth();
}

RomoDatepicker.prototype.onNextClick = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  this.doRefreshToNextMonth();
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
  var header = $('<thead></thead');

  var row = $('<tr></tr>');
  row.append($('<th class="romo-datepicker-prev"><i class="'+this.defaultLeftArrowClass+'"></i>'));
  row.append($('<th class="romo-datepicker-title" colspan="5"></th>'));
  row.append($('<th class="romo-datepicker-next"><i class="'+this.defaultRightArrowClass+'"></i>'));
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

RomoDatepicker.prototype._addIndicatorToElem = function() {
  // TODO, if opt and indicator icon class
  // create icon
  // append to elem
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

  regex = /^([0-9]{1,2})[\/\-\.]+([0-9]{1,2})[\/\-\.]+([0-9]{2,4})$/; // mm dd yyyy or mm dd yy
  matches = this._regexMatches(value, regex);
  if (matches.length === 3) {
    return [matches[2], matches[0], matches[1]];
  }

  regex = /^([0-9]{3,4})[\/\-\.]+([0-9]{1,2})[\/\-\.]+([0-9]{1,2})$/; // yyyy mm dd
  matches = this._regexMatches(value, regex);
  if (matches.length === 3) {
    return matches;
  }

  regex = /^([0-9]{1,2})[\/\-\.]+([0-9]{1,2})$/; // mm dd
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
  $(e.target).find('[data-romo-datepicker-auto="true"]').romoDatepicker();
});
