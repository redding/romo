var RomoDatepicker = function(elem) {
  this.elem = elem;

  this.defaultFormat    = 'yyyy-mm-dd'
  this.defaultPrevClass = undefined;
  this.defaultNextClass = undefined;
  this.itemSelector     = 'TD.romo-datepicker-day:not(.disabled)';
  this.calTable         = undefined;
  this.date             = undefined;
  this.today            = RomoDate.today();
  this.prevValue        = undefined;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoDatepicker:ready', [this]);
}

RomoDatepicker.prototype.formatString = function() {
  Romo.data(this.elem, 'romo-datepicker-format') || this.defaultFormat;
}

RomoDatepicker.prototype.doInit = function() {
  // override as needed
}

RomoDatepicker.prototype.doSetDate = function(value) {
  this.date = RomoDate.parse(value);
  if (this.date !== undefined) {
    this.elem.value = RomoDate.format(this.date, this.formatString());
  } else {
    this.elem.value = value;
  }
}

RomoDatepicker.prototype.doRefreshUI = function(date) {
  var rDate = date || this.date || this.today;
  this._refreshCalendar(rDate);
  Romo.trigger(this.elem, 'romoDatepicker:refresh', [rDate, this]);

  var itemElems = Romo.find(this.calTable, this.itemSelector);
  itemElems.forEach(Romo.proxy(function(itemElem) {
    Romo.on(itemElem, 'mouseenter', Romo.proxy(this.onItemEnter, this));
    Romo.on(itemElem, 'click',      Romo.proxy(this.onItemClick, this));
  }, this));

  Romo.on(this.romoDropdown.popupElem, 'mousedown', Romo.proxy(this.onPopupMouseDown, this));
  Romo.on(this.romoDropdown.popupElem, 'mouseup',   Romo.proxy(this.onPopupMouseUp, this));
}

// private

RomoDatepicker.prototype._bindElem = function() {
  Romo.setAttr(this.elem, 'autocomplete', 'off');
  Romo.setData(this.elem, 'romo-indicator-text-input-indicator-position', "right");

  if (Romo.data(this.elem, 'romo-datepicker-indicator') !== undefined) {
    Romo.setData(this.elem, 'romo-indicator-text-input-indicator', Romo.data(this.elem, 'romo-datepicker-indicator'));
  }
  if (Romo.data(this.elem, 'romo-datepicker-indicator-width-px') !== undefined) {
    Romo.setData(this.elem, 'romo-indicator-text-input-indicator-width-px', Romo.data(this.elem, 'romo-datepicker-indicator-width-px'));
  }
  if (Romo.data(this.elem, 'romo-datepicker-btn-group') === true) {
    Romo.setData(this.elem, 'data-romo-indicator-text-input-btn-group', Romo.data(this.elem, 'romo-datepicker-btn-group'));
  }
  if (Romo.data(this.elem, 'romo-datepicker-elem-display') !== undefined) {
    Romo.setData(this.elem, 'data-romo-indicator-text-input-elem-display', Romo.data(this.elem, 'romo-datepicker-elem-display'));
  }

  new RomoIndicatorTextInput(this.elem);

  this.prevValue = this.elem.value;
  Romo.on(this.elem, 'change', Romo.proxy(function(e) {
    var newValue = this.elem.value;
    Romo.trigger(this.elem, 'romoDatepicker:change', [newValue, this.prevValue, this]);
    this.prevValue = newValue;
  }, this));

  Romo.on(this.elem, 'romoIndicatorTextInput:indicatorClick', Romo.proxy(function(e) {
    this._clearBlurTimeout();
    Romo.trigger(this.elem, 'romoDatepicker:triggerPopupOpen');
  }, this));

  Romo.on(this.elem, 'datepicker:triggerEnable', $.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerEnable', []);
  }, this));
  Romo.on(this.elem, 'datepicker:triggerDisable', $.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerDisable', []);
  }, this));
  Romo.on(this.elem, 'datepicker:triggerShow', $.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerShow', []);
  }, this));
  Romo.on(this.elem, 'datepicker:triggerHide', $.proxy(function(e) {
    Romo.trigger(this.elem, 'romoIndicatorTextInput:triggerHide', []);
  }, this));

  Romo.on(this.elem, 'romoDatepicker:triggerSetDate', Romo.proxy(this.onTriggerSetDate, this));

  this._bindDropdown();
  this.doSetDate(this.elem.value);
  this._buildUI();
}

RomoDatepicker.prototype._bindDropdown = function() {
  Romo.setData(this.elem, 'romo-dropdown-disable-toggle', 'true');
  if (Romo.data(this.elem, 'romo-dropdown-width') === undefined) {
    Romo.setData(this.elem, 'romo-dropdown-width', 'elem');
  }
  if (parseInt(Romo.css(this.elem, 'width')) < 175) {
    Romo.setData(this.elem, 'romo-dropdown-width', '175px');
  }
  this.romoDropdown = new RomoDropdown(this.elem);

  this.romoDropdown.doSetPopupZIndex(this.elem);
  Romo.addClass(this.romoDropdown.bodyElem, 'romo-datepicker-calendar');
  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupOpen', Romo.proxy(this.onPopupOpen, this));
  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupClose', Romo.proxy(this.onPopupClose, this));
  Romo.on(this.romoDropdown.elem, 'blur', Romo.proxy(function(e) {
    this.blurTimeoutId = setTimeout(Romo.proxy(function() {
      if (this.popupMouseDown !== true) {
        Romo.trigger(this.romoDropdown.elem, 'romoDropdown:triggerPopupClose', []);
      }
    }, this), 10);
  }, this));
  Romo.on(this.romoDropdown.elem, 'keydown', Romo.proxy(this.onElemKeyDown, this));

  Romo.on(this.romoDropdown.elem, 'romoDropdown:toggle', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDatepicker:romoDropdown:toggle', [romoDropdown, this]);
  }, this));
  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupOpen', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDatepicker:romoDropdown:popupOpen', [romoDropdown, this]);
  }, this));
  Romo.on(this.romoDropdown.elem, 'romoDropdown:popupClose', Romo.proxy(function(e, romoDropdown) {
    Romo.trigger(this.elem, 'romoDatepicker:romoDropdown:popupClose', [romoDropdown, this]);
  }, this));

  Romo.on(this.elem, 'romoDatepicker:triggerToggle', Romo.proxy(function(e) {
    Romo.trigger(this.romoDropdown.elem, 'romoDropdown:triggerToggle', []);
  }, this));
  Romo.on(this.elem, 'romoDatepicker:triggerPopupOpen', Romo.proxy(function(e) {
    Romo.trigger(this.romoDropdown.elem, 'romoDropdown:triggerPopupOpen', []);
  }, this));
  Romo.on(this.elem, 'romoDatepicker:triggerPopupClose', Romo.proxy(function(e) {
    Romo.trigger(this.romoDropdown.elem, 'romoDropdown:triggerPopupClose', []);
  }, this));
}

RomoDatepicker.prototype._buildUI = function() {
  this.calTable = this._buildCalendar();
  Romo.updateHtml(this.romoDropdown.bodyElem, '');
  Romo.append(this.romoDropdown.bodyElem, this.calTable);

  var prevElem = Romo.find(this.calTable, '.romo-datepicker-prev')[0];
  Romo.on(prevElem, 'click', Romo.proxy(this.onPrevClick, this));
  var nextElem = Romo.find(this.calTable, '.romo-datepicker-next')[0];
  Romo.on(nextElem, 'click', Romo.proxy(this.onNextClick, this));
}

RomoDatepicker.prototype._refreshToPrevMonth = function() {
  var date  = this.refreshDate || this.date || (new Date);
  var pDate = RomoDate.lastDateOfPrevMonth(date);
  this.doRefreshUI(pDate);
  Romo.trigger(this.elem, 'romoDatepicker:prevRefresh', [pDate, this]);
}

RomoDatepicker.prototype._refreshToNextMonth = function() {
  var date  = this.refreshDate || this.date || (new Date);
  var nDate = RomoDate.firstDateOfNextMonth(date);
  this.doRefreshUI(nDate);
  Romo.trigger(this.elem, 'romoDatepicker:nextRefresh', [nDate, this]);
}

RomoDatepicker.prototype._selectHighlightedItem = function() {
  var highlightElem = Romo.find(this.calTable, 'TD.romo-datepicker-highlight')[0];
  var newValue      = Romo.data(highlightElem, 'romo-datepicker-value');

  this.romoDropdown.doPopupClose();
  this.doSetDate(newValue);
  this.elem.focus();
  Romo.trigger(this.elem, 'romoDatepicker:itemSelected', [newValue, this]);
  if (newValue !== this.prevValue) {
    Romo.trigger(this.elem, 'romoDatepicker:newItemSelected', [newValue, this]);
  }
  // always publish the item selected events before publishing any change events
  this._triggerSetDateChangeEvent();
}

RomoDatepicker.prototype._onTriggerSetDate = function(e, value) {
  this.doSetDate(value);
  this._triggerSetDateChangeEvent();
}

RomoDatepicker.prototype._onElemKeyDown = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    if (this.romoDropdown.popupOpen()) {
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

RomoDatepicker.prototype._onPopupOpen = function(e) {
  if (Romo.hasClass(this.elem, 'disabled') === false) {
    this.doSetDate(this.elem.value);
    this.doRefreshUI();
  }
}

RomoDatepicker.prototype._onPopupClose = function(e) {
  this._highlightItem($());
}

RomoDatepicker.prototype._onItemEnter = function(e) {
  this._highlightItem(e.target);
  return false
}

RomoDatepicker.prototype._onItemClick = function(e) {
  this._clearBlurTimeout();
  this._selectHighlightedItem();
  return false;
}

RomoDatepicker.prototype._onPrevClick = function(e) {
  this._clearBlurTimeout();
  this._refreshToPrevMonth();
  return false;
}

RomoDatepicker.prototype._onNextClick = function(e) {
  this._clearBlurTimeout();
  this._refreshToNextMonth();
  return false;
}

RomoDatepicker.prototype._onPopupMouseDown = function(e) {
  this.popupMouseDown = true;
}

RomoDatepicker.prototype._onPopupMouseUp = function(e) {
  this.popupMouseDown = false;
}

// private

RomoDatepicker.prototype._show = function(elem) {
  Romo.show(elem);
}

RomoDatepicker.prototype._hide = function(elem) {
  Romo.hide(elem);
}

RomoDatepicker.prototype._triggerSetDateChangeEvent = function() {
  if (this.elem.value !== this.prevValue) {
    Romo.trigger(this.elem, 'change');
  }
}

RomoDatepicker.prototype._clearBlurTimeout = function() {
  if (this.blurTimeoutId !== undefined) {
    clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = undefined;
  }
}

RomoDatepicker.prototype._refreshCalendar = function(date) {
  var titleElem = Romo.find(this.calTable, '.romo-datepicker-title')[0];
  titleElem.innerText = this._buildCalendarTitle(date);

  var tableBodyElem = Romo.find(this.calTable, 'tbody')[0];
  Romo.updateHtml(tableBodyElem, '');
  var rowElems = this._buildCalendarBodyRows(date);
  rowElems.forEach(Romo.proxy(function(rowElem) {
    Romo.append(tableBodyElem, rowElem);
  }, this));

  this.refreshDate = date;
}

RomoDatepicker.prototype._buildCalendar = function() {
  var tableElem = Romo.elems('<table></table>')[0];
  Romo.append(tableElem, this._buildCalendarHeader());
  Romo.appendHtml(tableElem, '<tbody></tbody>');
  return tableElem;
}

RomoDatepicker.prototype._buildCalendarHeader = function() {
  var prevClass    = Romo.data(this.elem, 'romo-datepicker-prev') || this.defaultPrevClass;
  var nextClass    = Romo.data(this.elem, 'romo-datepicker-next') || this.defaultNextClass;
  var headerElem   = Romo.elems('<thead></thead')[0];
  var titleRowElem = Romo.elems('<tr></tr>')[0];
  var thPrevElem   = Romo.elems('<th class="romo-datepicker-prev" title="Previous Month"></th>')[0];
  if (prevClass) {
    Romo.appendHtml(thPrevElem, '<i class="'+prevClass+'"></i>');
  } else {
    thPrevElem.innerText = '<<';
  }
  Romo.append(titleRowElem, thPrevElem);

  Romo.appendHtml(titleRowElem, '<th class="romo-datepicker-title" colspan="5"></th>');

  var thNextElem = Romo.elems('<th class="romo-datepicker-next" title="Next Month"></th>')[0];
  if (nextClass) {
    Romo.appendHtml(thNextElem, '<i class="'+nextClass+'"></i>');
  } else {
    thNextElem.innerText = '>>';
  }
  Romo.append(titleRowElem, thNextElem);
  Romo.append(headerElem, titleRowElem);

  var daysRowElem = Romo.elems('<tr></tr>')[0];
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">S</th>');
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">M</th>');
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">T</th>');
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">W</th>');
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">T</th>');
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">F</th>');
  Romo.appendHtml(daysRowElem, '<th class="romo-datepicker-day">S</th>');
  Romo.append(headerElem, daysRowElem);

  return headerElem;
}

RomoDatepicker.prototype._buildCalendarTitle = function(date) {
  return RomoDate.format(date, 'MM yyyy');
}

RomoDatepicker.prototype._buildCalendarBodyRows = function(date) {
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
    var dt = RomoDate.format(iDate, this.formatString());
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

  return Romo.elems(html.join(''));
}

RomoDatepicker.prototype._highlightItem = function(itemElem) {
  var highlightElem = Romo.find(this.calTable, 'TD.romo-datepicker-highlight')[0]
  if(highlightElem) {
    highlightElem.removeClass('romo-datepicker-highlight');
  }
  Romo.addClass(itemElem, 'romo-datepicker-highlight');
}

Romo.onInitUI(function(elem) {
  Romo.initUIElems(elem, '[data-romo-datepicker-auto="true"]').forEach(function(elem) { new RomoDatepicker(elem); });
});
