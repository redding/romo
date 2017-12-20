var RomoDate = {

  date: function(date) {
    if (date === undefined || date === null) {
      return undefined;
    } else {
      var d = new Date(date);
      d.setHours(0,0,0,0); // RomoDate Dates are always local with zero time
      return d;
    }
  },

  for: function(yearNum, zeroBasedMonthNum, dayNum) {
    return RomoDate.date(new Date(yearNum, zeroBasedMonthNum, dayNum));
  },

  parse: function(dateString) {
    return (new RomoDate.Parser(String(dateString).trim())).date();
  },

  format: function(date, formatString) {
    return (new RomoDate.Formatter(String(formatString).trim())).dateString(date);
  },

  today: function() {
    return RomoDate.date(new Date());
  },

  currentYear: function() {
    return RomoDate.today().getFullYear();
  },

  vector: function(date, numDays) {
    var d = RomoDate.date(date)
    return RomoDate.for(d.getFullYear(), d.getMonth(), d.getDate()+(numDays || 0));
  },

  next: function(date, numDays) {
    return RomoDate.vector(date, numDays || 1);
  },

  prev: function(date, numDays) {
    return RomoDate.vector(date, -(numDays || 1));
  },

  firstDateOfMonth: function(monthDate, vectorNumMonths) {
    var d = RomoDate.date(monthDate)
    return RomoDate.for(d.getFullYear(), d.getMonth()+(vectorNumMonths || 0), 1);
  },

  lastDateOfMonth: function(monthDate, vectorNumMonths) {
    var d = RomoDate.date(monthDate)
    return RomoDate.for(d.getFullYear(), d.getMonth()+(vectorNumMonths || 0)+1, 0);
  },

  firstDateOfNextMonth: function(monthDate, numMonths) {
    return RomoDate.firstDateOfMonth(monthDate, numMonths || 1);
  },

  firstDateOfPrevMonth: function(monthDate, numMonths) {
    return RomoDate.firstDateOfMonth(monthDate, -(numMonths || 1));
  },

  lastDateOfNextMonth: function(monthDate, numMonths) {
    return RomoDate.lastDateOfMonth(monthDate, numMonths || 1);
  },

  lastDateOfPrevMonth: function(monthDate, numMonths) {
    return RomoDate.lastDateOfMonth(monthDate, -(numMonths || 1));
  },

  daysInMonth: function(monthDate, vectorNumMonths) {
    return RomoDate.lastDateOfMonth(monthDate, vectorNumMonths).getDate();
  },

  daysRemainingInMonth: function(monthDate) {
    var d = RomoDate.date(monthDate)
    return RomoDate.daysInMonth(d) - d.getDate() + 1;
  },

  daysDiff: function(firstDate, secondDate) {
    var fd = RomoDate.date(firstDate);
    var sd = RomoDate.date(secondDate);
    return Math.round((fd.getTime() - sd.getTime()) / 864e5); // 1000 * 60 * 60 * 24
  },

  isoWeekNum: function(weekDate) {
    var d = RomoDate.date(weekDate)

    // calc full weeks to nearest Thursday (basis for ISO week numbers)
    // set to nearest Thursday: current date + 4 - current day number
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    var yearStartDate           = RomoDate.for(d.getFullYear(), 0, 1);
    var milliSecsSinceYearStart = d - yearStartDate;
    var milliSecsInADay         = 24*60*60*1000;
    var daysSinceYearStart      = milliSecsSinceYearStart / milliSecsInADay;
    var weekNumber              = Math.ceil((daysSinceYearStart + 1) / 7);

    return weekNumber;
  },

  isEqual: function(date1, date2, formatString) {
    var d1 = RomoDate.date(date1);
    var d2 = RomoDate.date(date2);
    var  f = formatString || 'yyyy-mm-dd'

    if (d1 === undefined || d2 === undefined) {
      return d1 === d2;
    } else {
      return RomoDate.format(d1, f) === RomoDate.format(d2, f)
    }
  },

  isSameDate: function(date1, date2) {
    return RomoDate.isEqual(date1, date2);
  },

  isSameMonth: function(date1, date2) {
    return RomoDate.isEqual(date1, date2, 'yyyy-mm')
  },

  isSameYear: function(date1, date2) {
    return RomoDate.isEqual(date1, date2, 'yyyy')
  },

  isDay: function(date, day) {
    if (date === undefined || date === null) {
      return false;
    }
    var d_day = RomoDate.date(date).getDay();
    return (day === d_day ||
            day === RomoDate.Utils.dayNames[d_day] ||
            day === RomoDate.Utils.dayAbbrevs[d_day]);
  },

  isWeekend: function(date) {
    if (date === undefined || date === null) {
      return false;
    }
    var dow = RomoDate.date(date).getDay();
    return (dow === 0 || dow === 6);
  },

  // child classes

  Parser: function(trimmedDateString) {
    this.dateString = trimmedDateString;
  },

  Formatter: function(trimmedFormatString) {
    this.formatString = trimmedFormatString;
  },

  Utils: undefined,

}

// Parser - child utility class to encapsulate parsing a Date obj from a trimmed
//          date String ('12/25', '12/25/16', '12/25/2016', '2016/12/25')

RomoDate.Parser.prototype.date = function() {
  if (this.dateString === undefined || this.dateString === '') {
    return undefined;
  }

  var dateValues = this._parseValues(this.dateString);
  if (dateValues.length === 0) {
    return undefined;
  }
  var year = parseInt(dateValues[0], 10);
  if (year < 0) {
    return undefined;
  }
  if (dateValues[0].length > 2 && year < 100) {
    return undefined;
  }
  if (dateValues[0].length === 2 && year < 100) {
    var cy = RomoDate.currentYear();
    year = cy - (cy % 100) + year; // 2-digit years are subjective. prefer assuming
    if ((year - cy) > 10) {        // they are past years except assuming all years
      year = year - 100;           // in the next decade are future years.
    }
  }

  var month = parseInt(dateValues[1], 10) - 1;
  if (month < 0 || month > 11) {
    return undefined;
  }

  var day = parseInt(dateValues[2], 10);
  var date = RomoDate.for(year, month, day);
  if (date.getMonth() !== month) {
    return undefined;
  }

  return date;
}

RomoDate.Parser.prototype._parseValues = function(dateString) {
  var regex, matches;

  regex = /^([0-9]{1,2})[^0-9]+([0-9]{1,2})[^0-9]+([0-9]{2,4})$/; // "mm dd yyyy" or "mm dd yy"
  matches = RomoDate.Utils.regexMatches(dateString, regex);
  if (matches.length === 3) {
    return [matches[2], matches[0], matches[1]];
  }

  regex = /^([0-9]{3,4})[^0-9]+([0-9]{1,2})[^0-9]+([0-9]{1,2})$/; // "yyyy mm dd"
  matches = RomoDate.Utils.regexMatches(dateString, regex);
  if (matches.length === 3) {
    return matches;
  }

  regex = /^([0-9]{1,2})[^0-9]+([0-9]{1,2})$/; // "mm dd"
  matches = RomoDate.Utils.regexMatches(dateString, regex);
  if (matches.length === 2) {
    return [RomoDate.currentYear(), matches[0], matches[1]];
  }

  return [];
}

// Parser

// Formatter - child utility class to encapsulate formatting a Date obj into a
//             date String ('12/25', '12/25/16', '12/25/2016', '2016/12/25')

RomoDate.Formatter.prototype.dateString = function(forDate) {
  var d     = RomoDate.date(forDate)
  var year  = d.getFullYear();
  var month = d.getMonth() + 1; // months are zero-based
  var day   = d.getDate();

  var formatter = this;

  return this.formatString.replace(/([ymMdD]+)/g, function(match) {
    switch (match) {
      case "yyyy":
      case  "yyy":
        return year.toString();
      case   "yy":
      case    "y":
        return year.toString().slice(-2);
      case   "mm":
        return ("00"+ month.toString()).slice(-2); // pad 2 with "0"s
      case    "m":
        return month.toString();
      case   "MM":
        return RomoDate.Utils.monthNames[d.getMonth()]
      case    "M":
        return RomoDate.Utils.monthAbbrevs[d.getMonth()]
      case  "ddd":
        var ds = day.toString();
        switch (ds.slice(-1)) {
          case '1':
            ds += 'st';
            break;
          case '2':
            ds += 'nd'
            break;
          case '3':
            ds += 'rd';
            break;
          default:
            ds += 'th';
            break;
        }
        return ds;
      case   "dd":
        return ("00"+ day.toString()).slice(-2); // pad 2 with "0"s
      case    "d":
        return day.toString();
      case   "DD":
        return RomoDate.Utils.dayNames[d.getDay()]
      case    "D":
        return RomoDate.Utils.dayAbbrevs[d.getDay()]
      default:
        return match; // delimeter, pass-thru
    }
  });
}

// Formatter

// Utils - sub utility functions shared by the utility classes

RomoDate.Utils = {

  regexMatches: function(value, regex) {
    if (regex.test(value) === true) {
      return regex.exec(value).slice(1);
    }
    return [];
  },

  monthNames: [
    "January", "Febuary", "March",     "April",    "May",      "June",
    "July",    "August",  "September", "October", "November", "December"
  ],

  monthAbbrevs: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],

  dayNames: [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],

  dayAbbrevs: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ],

}

// Utils
