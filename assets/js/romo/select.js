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
  this.romoDropdown.popupElem.html('');
}

RomoSelect.prototype.onSelect = function(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if (this.elem.hasClass('disabled') === false) {
    this.doSelect();
  }
}

RomoSelect.prototype.doSelect = function() {
}

RomoSelect.prototype._buildDropdownElem = function() {
  var romoDropdownElem = $('<div class="romo-select"><span>Something long that will overflow</span><i class=""></i></div>');

  romoDropdownElem.attr('data-romo-dropdown-position', this.elem.data('romo-select-dropdown-position'));
  romoDropdownElem.attr('data-romo-dropdown-style-class', this.elem.data('romo-select-dropdown-style-class'));
  romoDropdownElem.attr('data-romo-dropdown-min-height', this.elem.data('romo-select-dropdown-min-height'));
  romoDropdownElem.attr('data-romo-dropdown-max-height', this.elem.data('romo-select-dropdown-max-height'));
  romoDropdownElem.attr('data-romo-dropdown-height', this.elem.data('romo-select-dropdown-height'));
  // ignore any dropdown width settings - will match width of select elem

  var classList = this.elem.attr('class') !== undefined ? this.elem.attr('class').split(/\s+/) : [];
  $.each(classList, function(idx, classItem) {
    if (classItem !== 'selectpicker') { // temporary
      romoDropdownElem.addClass(classItem);
    }
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

  if (this.elem.attr('disabled') !== undefined) {
    romoDropdownElem.attr('disabled', this.elem.attr('disabled'));
  }

  return romoDropdownElem;
}

Romo.onInitUI(function(e) {
  $(e.target).find('[data-romo-select-auto="true"]').romoSelect();
});
