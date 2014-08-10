## Default Styles

Individual form controls receive styling that results in stacked, left-aligned labels on top of form controls.

<div class="romo-pad">
  <form>
    <fieldset>
      <legend>Legend</legend>
      <label for="text1">Input name</label>
      <input id="text1" type="text" placeholder="Type something…" />
      <label for="select1">Select name</label>
      <select id="select1">
        <option>Opt 1</option>
        <option>Opt 2</option>
      </select>
      <label for="multiSelect1">Multi Select name</label>
      <select id="multiSelect1" multiple>
        <option>Opt 1</option>
        <option>Opt 2</option>
      </select>
      <label for="textarea1">Textarea name</label>
      <textarea id="textarea1" rows="2" placeholder="Type something..."></textarea>
      <label>
        <input type="radio">
        <span>Radio 1</span>
      </label>
      <label>
        <input type="radio">
        <span>Radio 2</span>
      </label>
      <label>
        <input type="checkbox">
        <span>Checkbox 1</span>
      </label>
      <button type="submit">Submit</button>
    </fieldset>
  </form>
</div>

```html
<form>
  <fieldset>
    <legend>Legend</legend>
    <label for="text1">Input name</label>
    <input id="text1" type="text" placeholder="Type something…" />
    <label for="select1">Select name</label>
    <select id="select1">
      <option>Opt 1</option>
      <option>Opt 2</option>
    </select>
    <label for="multiSelect1">Multi Select name</label>
    <select id="multiSelect1" multiple>
      <option>Opt 1</option>
      <option>Opt 2</option>
    </select>
    <label for="textarea1">Textarea name</label>
    <textarea id="textarea1" rows="2" placeholder="Type something..."></textarea>
    <label>
      <input type="radio">
      <span>Radio 1</span>
    </label>
    <label>
      <input type="radio">
      <span>Radio 2</span>
    </label>
    <label>
      <input type="checkbox">
      <span>Checkbox 1</span>
    </label>
    <button type="submit">Submit</button>
  </fieldset>
</form>
```

## Optional Styles

### `.romo-form` `.romo-{radio|checkbox}`

Add the `.romo-form` class to receive additional styling on the controls.  Add `.romo-{radio|checkbox}` to vertically align radio and checkbox labeled inputs.

<div class="romo-pad">
  <form class="romo-form">
    <fieldset>
      <legend>Legend</legend>
      <label for="text2">Input name</label>
      <input id="text2" type="text" placeholder="Type something…" />
      <label for="select2">Select name</label>
      <select id="select2">
        <option>Opt 1</option>
        <option>Opt 2</option>
      </select>
      <label for="multiSelect2">Multi Select name</label>
      <select id="multiSelect2" multiple>
        <option>Opt 1</option>
        <option>Opt 2</option>
      </select>
      <label for="textarea2">Textarea name</label>
      <textarea id="textarea2" rows="2" placeholder="Type something..."></textarea>
      <label class="romo-radio">
        <input type="radio">
        <span>Radio 1</span>
      </label>
      <label class="romo-radio">
        <input type="radio">
        <span>Radio 2</span>
      </label>
      <label class="romo-checkbox">
        <input type="checkbox">
        <span>Checkbox 1</span>
      </label>
      <button type="submit">Submit</button>
    </fieldset>
  </form>
</div>

```html
<form class="romo-form">
 ...
 <label class="romo-radio">
   ...
 </label>
 <label class="romo-radio">
   ...
 </label>
 <label class="romo-checkbox">
   ...
 </label>
</form>
```

## `.romo-input{1-6}`

Use numbered style classes to adjust input width.

<div class="romo-pad">
  <form class="romo-form">
    <label>.romo-input1</label>
    <input class="romo-input1" type="text" placeholder=".romo-input1" />
    <label>.romo-input2</label>
    <select class="romo-input2">
      <option>.romo-input2</option>
    </select>
    <label>.romo-input3</label>
    <select class="romo-input3" multiple>
      <option>.romo-input3</option>
    </select>
    <label>.romo-input</label>
    <textarea class="romo-input" rows="2" placeholder=".romo-input"></textarea>
    <label>.romo-input4</label>
    <input class="romo-input4" type="text" placeholder=".romo-input4" />
    <label>.romo-input5</label>
    <input class="romo-input5" type="text" placeholder=".romo-input5" />
    <label>.romo-input6</label>
    <input class="romo-input6" type="text" placeholder=".romo-input6" />
  </form>
</div>

```html
<form class="romo-form">
  ...
  <input class="romo-input1" type="text" placeholder=".romo-input1" />
  ...
  <select class="romo-input2">...</select>
  ...
  <select class="romo-input3" multiple>...</select>
  ...
  <textarea class="romo-input" rows="2" placeholder=".romo-input"></textarea>
  ...
  <input class="romo-input4" type="text" placeholder=".romo-input4" />
  ...
  <input class="romo-input5" type="text" placeholder=".romo-input5" />
  ...
  <input class="romo-input6" type="text" placeholder=".romo-input6" />
</form>
```

Or use `.romo-input-block` to add blocking full width inputs.

<div class="romo-pad">
  <form class="romo-form">
    <input class="romo-input-block romo-push-bottom" type="text" placeholder="Subject..." />
    <textarea class="romo-input-block" rows="5" placeholder="Body..."></textarea>
  </form>
</div>

```html
<form class="romo-form">
  <input class="romo-input-block romo-push-bottom" type="text" placeholder="Subject..." />
  <textarea class="romo-input-block" rows="5" placeholder="Body..."></textarea>
</form>
```

### `.romo-input-help`

Use `.romo-input-help` spans with color emphasis to show help text

<div class="romo-pad">
  <form class="romo-form">
    <label for="text3">Input name</label>
    <input id="text3" type="text" placeholder="Type something…" />
    <span class="romo-input-help romo-text-error">Example error message</span>
  </form>
</div>

```html
<form class="romo-form">
  <label>Input name</label>
  <input type="text" placeholder="Type something…" />
  <span class="romo-input-help romo-text-error">Example error message</span>
</form>
```

## Custom components

### Buttons

TODO: Show example and link to buttons css page.

### Selects

TODO: Show example and link to the romo select js component page

## Layouts

TODO: Show example and link to form layouts examples page.
