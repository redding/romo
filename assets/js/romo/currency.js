var RomoCurrency = {

  format: function(numberString, opts) {
    var unFormattedString = RomoCurrency.unFormat(numberString);
    if (unFormattedString === '') {
      return '';
    }

    opts = opts || {};
    var symbol           = opts.symbol           || '';
    var thousandsDelim   = opts.thousandsDelm    || ',';
    var decimalDelim     = opts.decimalDelim     || '.';
    var numDecimalPlaces = opts.numDecimalPlaces || 2;

    var number   = Number(unFormattedString);
    var negative = number < 0 ? '-' : '';
    var u_d      = Math.abs(number).toFixed(numDecimalPlaces).split('.');
    var units    = (u_d[0] || '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1"+thousandsDelim);
    var decimals = u_d[1] || '';

    return symbol+negative+units+decimalDelim+decimals;
  },

  unFormat: function(currencyString, opts) {
    if (currencyString === undefined || currencyString === '') {
      return '';
    }

    var numString = currencyString.replace(/[^0-9\.\-]+/g,"");
    if (numString === '') {
      return '';
    }

    var num = Number(numString);
    if (isNaN(num)) {
      return '';
    } else {
      opts = opts || {};
      var numDecimalPlaces = opts.numDecimalPlaces || 2;

      return num.toFixed(numDecimalPlaces);
    }
  }

}
