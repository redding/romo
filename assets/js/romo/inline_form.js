var RomoInlineForm = RomoComponent(function(elem) {
  this.elem = elem;

  this.doInit();
  this._bindElem();

  Romo.trigger(this.elem, 'romoInlineForm:ready', [this]);
});

// private

RomoInlineForm.prototype._bindElem = function() {
  Romo.on(this.elem, 'romoInlineForm:romoForm:triggerSubmit', Romo.proxy(function(e) {
    if (this.romoForm !== undefined) {
      Romo.trigger(this.romoForm.elem, 'romoForm:triggerSubmit', []);
    }
  }, this));
  Romo.on(this.elem, 'romoInlineForm:romoInline:triggerInvoke', Romo.proxy(function(e) {
    Romo.trigger(this.romoInline.elem, 'romoInline:triggerInvoke', []);
  }, this));
  Romo.on(this.elem, 'romoInlineForm:romoInline:triggerDismiss', Romo.proxy(function(e) {
    Romo.trigger(this.romoInline.elem, 'romoInline:triggerDismiss', []);
  }, this));
  Romo.on(this.elem, 'romoInline:loadSuccess', Romo.proxy(function(e, data, romoInline) {
    this._bindForm();
    Romo.trigger(this.elem, 'romoInlineForm:formReady', [this.romoForm, this]);
  }, this));

  this._bindInline();
  this._bindForm();
}

RomoInlineForm.prototype._bindInline = function() {
  this.romoInline = new RomoInline(this.elem);

  Romo.on(this.elem, 'romoInline:ready', Romo.proxy(function(e, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:ready', [romoInline, this]);
  }, this));
  Romo.on(this.elem, 'romoInline:loadStart', Romo.proxy(function(e, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:loadStart', [romoInline, this]);
  }, this));
  Romo.on(this.elem, 'romoInline:loadSuccess', Romo.proxy(function(e, data, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:loadSuccess', [data, romoInline, this]);
  }, this));
  Romo.on(this.elem, 'romoInline:loadError', Romo.proxy(function(e, xhr, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:loadError', [xhr, romoInline, this]);
  }, this));
  Romo.on(this.elem, 'romoInline:show', Romo.proxy(function(e, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:show', [romoInline, this]);
  }, this));
  Romo.on(this.elem, 'romoInline:dismiss', Romo.proxy(function(e, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:dismiss', [romoInline, this]);
  }, this));
  Romo.on(this.elem, 'romoInline:confirmDismiss', Romo.proxy(function(e, romoInline) {
    Romo.trigger(this.elem, 'romoInlineForm:romoInline:confirmDismiss', [romoInline, this]);
  }, this));
}

RomoInlineForm.prototype._bindForm = function() {
  this.romoForm = undefined;
  var formElem = Romo.find(this.elem, '[data-romo-form-auto="inlineForm"]')[0];

  if (formElem !== undefined) {
    Romo.on(formElem, 'romoForm:clearMsgs', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:clearMsgs', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:ready', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:ready', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:confirmSubmit', Romo.proxy(function(e, form) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:confirmSubmit', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:beforeSubmit', Romo.proxy(function(e, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:beforeSubmit', [romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitSuccess', Romo.proxy(function(e, data, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:submitSuccess', [data, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitInvalidMsgs', Romo.proxy(function(e, msgs, xhr, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:submitInvalidMsgs', [msgs, xhr, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitXhrError', Romo.proxy(function(e, xhr, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:submitXhrError', [xhr, romoForm, this]);
    }, this));
    Romo.on(formElem, 'romoForm:submitError', Romo.proxy(function(e, xhr, romoForm) {
      Romo.trigger(this.elem, 'romoInlineForm:romoForm:submitError', [xhr, romoForm, this]);
    }, this));

    var submitElems  = Romo.find(this.elem, '[data-romo-form-submit]');
    var spinnerElems = Romo.find(this.elem, '[data-romo-spinner-auto="true"]');

    this.romoForm = new RomoForm(formElem, submitElems, spinnerElems);
  }
}

// event functions

// init

Romo.addElemsInitSelector('[data-romo-inlineForm-auto="true"]', RomoInlineForm);
