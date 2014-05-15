$.fn.romoDropdown = function() {
  return $.map(this, function(elem) {
    return new RomoDropdown($(elem));
  })
}

// Dropdown

window.RomoDropdown = function(element) {
  this.elem = $(element);
  this.toggleElem = this.elem.find('> .romo-dropdown-toggle');
  this.popupElem  = this.elem.find('> .romo-dropdown-popup');
  this.bodyElem   = this.popupElem.find('> .romo-dropdown-body');

  this.toggleElem.unbind('click');
  this.toggleElem.on('click', $.proxy(this.onToggleClick, this));
  this.toggleElem.on('dropdown:onPopupOpen', $.proxy(this.doLoadBody, this));

  // don't propagate click events on the popup elem.  this prevents the popup
  // from closing when clicked (see body click event bind on popup open)
  this.popupElem.on('click', function(e) {
    if (e != undefined) {
      e.stopPropagation();
    }
  })

  if (this.bodyElem.data('min-width') != undefined) {
    this.bodyElem.css('min-width', this.bodyElem.data('min-width'))
  }
  if (this.bodyElem.data('max-width') != undefined) {
    this.bodyElem.css('max-width', this.bodyElem.data('max-width'))
  }
  if (this.bodyElem.data('width') != undefined) {
    this.bodyElem.css('width', this.bodyElem.data('width'))
  }
  if (this.bodyElem.data('min-height') != undefined) {
    this.bodyElem.css('min-height', this.bodyElem.data('min-height'))
  }
  if (this.bodyElem.data('max-height') != undefined) {
    this.bodyElem.css('max-height', this.bodyElem.data('max-height'))
  }
  if (this.bodyElem.data('height') != undefined) {
    this.bodyElem.css('height', this.bodyElem.data('height'))
  }

  this.doInit();
  this.elem.trigger('dropdown:onReady', [this]);
}

RomoDropdown.prototype.doInit = function() {
  // override as needed
}

RomoDropdown.prototype.doLoadBodyStart = function() {
  // override as needed
  this.bodyElem.html('');
}

RomoDropdown.prototype.doLoadBodySuccess = function(data) {
  // override as needed
  this.bodyElem.html(data);
}

RomoDropdown.prototype.doLoadBodyError = function(xhr) {
  // override as needed
}

RomoDropdown.prototype.onToggleClick = function(e) {
  if (e != undefined) {
    e.preventDefault();
  }

  if (this.toggleElem.hasClass('disabled') == false) {
    this.doToggle();
  }
}

RomoDropdown.prototype.doToggle = function() {
  if (this.popupElem.hasClass('romo-dropdown-open')) {
    this.doPopupClose();
  } else {
    this.doPopupOpen();
  }
  this.elem.trigger('dropdown:onToggle', [this]);
}

RomoDropdown.prototype.doPopupOpen = function() {
  var loadHref = this.toggleElem.attr('href');
  if (loadHref != undefined) {
    this.doLoadBody(loadHref);
  }

  this.popupElem.addClass('romo-dropdown-open');

  // bind an event to close the popup when clicking away from the
  // popup.  Bind on a timeout to allow time for the any toggle
  // click event to propagate.  If no timeout, we'll bind this
  // event, then the toggle click will propagate which will call
  // this event and immediately close the popup.
  setTimeout($.proxy(function() {
    $('body').on('click', $.proxy(this.onWindowBodyClick, this));
  }, this), 100);

  // bind "esc" keystroke to toggle close
  $('body').on('keyup', $.proxy(this.onWindowBodyKeyUp, this));

  this.elem.trigger('dropdown:onPopupOpen', [this]);
}

RomoDropdown.prototype.doPopupClose = function() {
  this.popupElem.removeClass('romo-dropdown-open');

  // unbind any event to close the popup when clicking away from it
  $('body').off('click', $.proxy(this.onWindowBodyClick, this));

  // unbind "esc" keystroke to toggle close
  $('body').off('keyup', $.proxy(this.onWindowBodyKeyUp, this));

  this.elem.trigger('dropdown:onPopupClose', [this]);
}

RomoDropdown.prototype.onWindowBodyClick = function(e) {
  this.doPopupClose();
}

RomoDropdown.prototype.onWindowBodyKeyUp = function(e) {
  if (e.keyCode == 27) { // esc
    this.doPopupClose();
  }
}

RomoDropdown.prototype.doLoadBody = function(href) {
  this.doLoadBodyStart();
  this.elem.trigger('dropdown:onLoadBodyStart', [this]);

  $.ajax({
    url: href,
    success: $.proxy(this.onLoadBodyAjaxSuccess, this),
    error: $.proxy(this.onLoadBodyAjaxError, this)
  });
}

RomoDropdown.prototype.onLoadBodyAjaxSuccess = function(data, status, xhr) {
  this.doLoadBodySuccess(data);
  this.elem.trigger('dropdown:onLoadBodySuccess', [data, this]);
}

RomoDropdown.prototype.onLoadBodyAjaxError = function(xhr, errorType, error) {
  this.doLoadBodyError(xhr);
  this.elem.trigger('dropdown:onLoadBodyError', [xhr, this]);
}

Romo.onInitUI(function(e) {
  $(e.target).find('.romo-dropdown[data-romo-auto="true"]').romoDropdown();
});
