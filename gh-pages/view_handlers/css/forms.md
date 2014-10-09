## Default Styles

Individual form controls receive styling that results in stacked, left-aligned labels on top of form controls.

<div>
  <form>
    <fieldset>
      <legend>Legend</legend>
      <label for="text1">Input name</label>
      <input id="text1" type="text" placeholder="Type something…" />
      <label for="select1">Select name</label>
      <select id="select1">
        <option>Opt 1</option>
        <option>Opt 2</option>
        <option>Opt 3</option>
        <option>Opt 4</option>
      </select>
      <label for="multiSelect1">Multi Select name</label>
      <select id="multiSelect1" multiple>
        <option>Opt 1</option>
        <option>Opt 2</option>
        <option>Opt 3</option>
        <option>Opt 4</option>
      </select>
      <label for="multiGroupedSelect1">Grouped Multi Select name</label>
      <select id="multiGroupedSelect1" multiple>
        <optgroup label="Grp 1">
          <option>Opt 1</option>
          <option>Opt 2</option>
        </optgroup>
        <optgroup label="Grp 2">
          <option>Opt 3</option>
          <option>Opt 4</option>
        </optgroup>
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
      <option>Opt 3</option>
      <option>Opt 4</option>
    </select>
    <label for="multiSelect1">Multi Select name</label>
    <select id="multiSelect1" multiple>
      <option>Opt 1</option>
      <option>Opt 2</option>
      <option>Opt 3</option>
      <option>Opt 4</option>
    </select>
    <label for="multiGroupedSelect1">Grouped Multi Select name</label>
    <select id="multiGroupedSelect1" multiple>
      <optgroup label="Grp 1">
        <option>Opt 1</option>
        <option>Opt 2</option>
      </optgroup>
      <optgroup label="Grp 2">
        <option>Opt 3</option>
        <option>Opt 4</option>
      </optgroup>
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

<div>
  <form class="romo-form">
    <fieldset>
      <legend>Legend</legend>
      <label for="text2">Input name</label>
      <input id="text2" type="text" placeholder="Type something…" />
      <label for="select1">Select name</label>
      <select id="select1">
        <option>Opt 1</option>
        <option>Opt 2</option>
        <option>Opt 3</option>
        <option>Opt 4</option>
      </select>
      <label for="multiSelect1">Multi Select name</label>
      <select id="multiSelect1" multiple>
        <option>Opt 1</option>
        <option>Opt 2</option>
        <option>Opt 3</option>
        <option>Opt 4</option>
      </select>
      <label for="multiGroupedSelect1">Grouped Multi Select name</label>
      <select id="multiGroupedSelect1" multiple>
        <optgroup label="Grp 1">
          <option>Opt 1</option>
          <option>Opt 2</option>
        </optgroup>
        <optgroup label="Grp 2">
          <option>Opt 3</option>
          <option>Opt 4</option>
        </optgroup>
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
      <button type="submit" class="romo-btn">Submit</button>
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

## `.romo-input{0-2}`

Use numbered style classes to adjust input width.

<div>
  <form class="romo-form">
    <label>.romo-input</label>
    <input class="romo-input" type="text" placeholder=".romo-input" />
    <label>.romo-input1</label>
    <input class="romo-input1" type="text" placeholder=".romo-input1" />
    <label>.romo-input-small</label>
    <select class="romo-input-small">
      <option>.romo-input-small</option>
    </select>
    <label>.romo-input0</label>
    <select class="romo-input0">
      <option>.romo-input0</option>
    </select>
    <label>.romo-input-large</label>
    <textarea class="romo-input-large" rows="2" placeholder=".romo-input-large"></textarea>
    <label>.romo-input2</label>
    <textarea class="romo-input2" rows="2" placeholder=".romo-input2"></textarea>
  </form>
</div>

```html
<form class="romo-form">
  ...
  <input class="romo-input" type="text" placeholder=".romo-input" />
  ...
  <input class="romo-input1" type="text" placeholder=".romo-input1" />
  ...
  <select class="romo-input-small">...</select>
  ...
  <select class="romo-input0">...</select>
  ...
  <textarea class="romo-input-large" rows="2" placeholder=".romo-input-large"></textarea>
  ...
  <textarea class="romo-input2" rows="2" placeholder=".romo-input-large"></textarea>
</form>
```

Or use `.romo-input-block` to add blocking full width inputs.

<div>
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

<div>
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
