## Default buttons

Button styles can be applied to anything with the `.romo-btn` class. However, typically you'll want to apply these to only `<a>` and `<button>` elements for the best rendering.

<div>
  <button class="romo-btn romo-push0-bottom">Button</button>
  <a href="#" class="romo-btn romo-push0-bottom">Anchor</a>
  <input type="button" class="romo-btn romo-push0-bottom" value="Input-button" />
  <input type="submit" class="romo-btn romo-push0-bottom" value="Input-submit" />
  <input type="reset"  class="romo-btn romo-push0-bottom" value="Input-reset" />
  <button class="romo-btn romo-push0-bottom" disabled>Disabled by prop button</button>
  <button class="romo-btn disabled romo-push0-bottom">Disabled by class button</button>
  <button class="romo-btn active romo-push0-bottom">Active button</button>
</div>

```html
<button class="romo-btn">Button</button>
<a class="romo-btn">Anchor</a>
<input type="button" class="romo-btn" value="Input-button" />
<input type="submit" class="romo-btn" value="Input-submit" />
<input type="reset"  class="romo-btn" value="Input-reset" />
<button class="romo-btn" disabled>Disabled by prop button</button>
<button class="romo-btn disabled">Disabled by class button</button>
<button class="romo-btn active">Active button</button>
```

## Active state

Add `.active` to make any button appear pressed.

<div>
  <button class="romo-btn">Default</button>
  <button class="romo-btn active">Active</button>
</div>

```html
<button class="romo-btn">Default</button>
<button class="romo-btn active">Active</button>
```

## Button sizes

Use numbered style classes to size up/down buttons.

<div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn0">.romo-btn0</button>
    <button class="romo-btn romo-btn-small">.romo-btn-small</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn1">.romo-btn1</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn2">.romo-btn2</button>
    <button class="romo-btn romo-btn-large">.romo-btn-large</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn3">.romo-btn3</button>
  </div>
</div>

```html
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn0">.romo-btn0</button>
  <button class="romo-btn romo-btn-small">.romo-btn-small</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn1">.romo-btn1</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn2">.romo-btn2</button>
  <button class="romo-btn romo-btn-large">.romo-btn-large</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn3">.romo-btn3</button>
</div>
```

Use to align with inline text.

<div>
  <div class="romo-push0-bottom">
    <span class="romo-text0 romo-align-middle">.romo-text0</span>
    <button class="romo-btn romo-btn0">.romo-btn0</button>
    <span class="romo-text-small romo-align-middle">.romo-text-small</span>
    <button class="romo-btn romo-btn-small">.romo-btn-small</button>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-text1 romo-align-middle">.romo-text1</span>
    <button class="romo-btn romo-btn1">.romo-btn1</button>
    <span class="romo-align-middle">.romo-text</span>
    <button class="romo-btn">.romo-btn</button>
  </div>
  <div class="romo-push0-bottom romo-text2">
    <span class="romo-text2 romo-align-middle">.romo-text2</span>
    <button class="romo-btn romo-btn2">.romo-btn2</button>
    <span class="romo-text-large romo-align-middle">.romo-text-large</span>
    <button class="romo-btn romo-btn-large">.romo-btn-large</button>
  </div>
  <div class="romo-push0-bottom romo-text3">
    <span class="romo-text3 romo-align-middle">.romo-text3</span>
    <button class="romo-btn romo-btn3">.romo-btn3</button>
  </div>
</div>

```html
<div class="romo-push0-bottom">
  <span class="romo-text0 romo-align-middle">.romo-text0</span>
  <button class="romo-btn romo-btn0">.romo-btn0</button>
  <span class="romo-text-small romo-align-middle">.romo-text-small</span>
  <button class="romo-btn romo-btn-small">.romo-btn-small</button>
</div>
<div class="romo-push0-bottom">
  <span class="romo-text1 romo-align-middle">.romo-text1</span>
  <button class="romo-btn romo-btn1">.romo-btn1</button>
  <span class="romo-align-middle">.romo-text</span>
  <button class="romo-btn">.romo-btn</button>
</div>
<div class="romo-push0-bottom romo-text2">
  <span class="romo-text2 romo-align-middle">.romo-text2</span>
  <button class="romo-btn romo-btn2">.romo-btn2</button>
  <span class="romo-text-large romo-align-middle">.romo-text-large</span>
  <button class="romo-btn romo-btn-large">.romo-btn-large</button>
</div>
<div class="romo-push0-bottom romo-text3">
  <span class="romo-text3 romo-align-middle">.romo-text3</span>
  <button class="romo-btn romo-btn3">.romo-btn3</button>
</div>
```

Or use `.romo-btn-inline` to manually vertically align text that isn't inline with an image.

<div class="romo-row romo-push0-bottom">
  <div class="romo-span romo-1-6 romo-align-right romo-pad0-right">
    <button class="romo-btn romo-btn-large">.romo-btn-large</button>
  </div>
  <div class="romo-span romo-1-6 romo-text-small">
    <span class="romo-btn-inline-large">.romo-text-small</span>
  </div>
  <div class="romo-span romo-offset-4-6"></div>
</div>

```html
<div class="romo-row romo-push0-bottom">
  <div class="romo-span romo-1-6 romo-align-right romo-pad0-right">
    <button class="romo-btn romo-btn-large">.romo-btn-large</button>
  </div>
  <div class="romo-span romo-1-6 romo-text-small">
    <span class="romo-btn-inline-large">.romo-text-small</span>
  </div>
  <div class="romo-span romo-offset-4-6"></div>
</div>
```

Use `.romo-btn-block` to add blocking full-width buttons.

<div>
  <button class="romo-btn romo-btn-block">Blocking full-width button</button>
</div>

```html
<button class="romo-btn romo-btn-block">Blocking full-width button</button>
```

## Button groups

Group buttons together by wrapping them in `.romo-btn-group`.

<div>
  <div class="romo-btn-group">
    <button class="romo-btn">Left</button>
    <button class="romo-btn">Middle</button>
    <button class="romo-btn">Right</button>
  </div>
</div>

```html
<div class="romo-btn-group">
  <button class="romo-btn">Left</button>
  <button class="romo-btn">Middle</button>
  <button class="romo-btn">Right</button>
</div>
```

Optionally with border radius.

<div>
  <div class="romo-pad0-bottom">
    <div class="romo-btn-group romo-btn-group-border0-radius">
      <button class="romo-btn">...</button>
      <button class="romo-btn">border0-radius</button>
      <button class="romo-btn">...</button>
    </div>
  </div>
  <div class="romo-pad0-bottom">
    <div class="romo-btn-group romo-btn-group-border-radius">
      <button class="romo-btn">...</button>
      <button class="romo-btn">border-radius</button>
      <button class="romo-btn">...</button>
    </div>
  </div>
  <div class="romo-pad0-bottom">
    <div class="romo-btn-group romo-btn-group-border1-radius">
      <button class="romo-btn">...</button>
      <button class="romo-btn">border1-radius</button>
      <button class="romo-btn">...</button>
    </div>
  </div>
  <div class="romo-pad0-bottom">
    <div class="romo-btn-group romo-btn-group-border2-radius">
      <button class="romo-btn">...</button>
      <button class="romo-btn">border2-radius</button>
      <button class="romo-btn">...</button>
    </div>
  </div>
</div>

```html
<div class="romo-btn-group romo-btn-group-border0-radius">
  ...
</div>
<div class="romo-btn-group romo-btn-group-border-radius">
  ...
</div>
<div class="romo-btn-group romo-btn-group-border1-radius">
  ...
</div>
<div class="romo-btn-group romo-btn-group-border2-radius">
  ...
</div>
```

With alternate buttons.

<div>
  <div class="romo-btn-group romo-btn-group-border-radius">
    <a href="#" class="romo-btn romo-btn-link disabled"><< Prev</a>
    <strong class="romo-btn romo-btn-link romo-text-bold">Page 1</strong>
    <a href="#" class="romo-btn romo-btn-link">Next >></a>
  </div>
</div>

```html
<div class="romo-btn-group romo-btn-group-border-radius">
  <a href="#" class="romo-btn romo-btn-link disabled"><< Prev</a>
  <strong class="romo-btn romo-btn-link romo-text-bold">Page 1</strong>
  <a href="#" class="romo-btn romo-btn-link">Next >></a>
</div>
```

### Multiple button groups

Combine sets of button groups for more complex components.

<div>
  <div class="romo-btn-group">
    <button class="romo-btn">0</button>
    <button class="romo-btn">1</button>
    <button class="romo-btn">2</button>
    <button class="romo-btn">3</button>
  </div>
  <div class="romo-btn-group">
    <button class="romo-btn">4</button>
    <button class="romo-btn">5</button>
    <button class="romo-btn">6</button>
    <button class="romo-btn">7</button>
    <button class="romo-btn">8</button>
  </div>
  <div class="romo-btn-group">
    <button class="romo-btn">9</button>
  </div>
</div>

```html
<div class="romo-btn-group">
  <button class="romo-btn">0</button>
  <button class="romo-btn">1</button>
  <button class="romo-btn">2</button>
  <button class="romo-btn">3</button>
</div>
<div class="romo-btn-group">
  <button class="romo-btn">4</button>
  <button class="romo-btn">5</button>
  <button class="romo-btn">6</button>
  <button class="romo-btn">7</button>
  <button class="romo-btn">8</button>
</div>
<div class="romo-btn-group">
  <button class="romo-btn">9</button>
</div>
```

### Vertical button groups

Make a group of buttons appear vertically stacked rather than horizontally by using `.romo-btn-group-vertical`.

**Note**: you should set a static width on vertical button group buttons so they always line up as expected regardless of their content.

<div>
  <div class="romo-btn-group-vertical romo-align-top">
    <button class="romo-btn" style="width: 40px">1</button>
    <button class="romo-btn" style="width: 40px">2</button>
    <button class="romo-btn" style="width: 40px">3</button>
    <button class="romo-btn" style="width: 40px">4</button>
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    <button class="romo-btn" style="width: 80px">First</button>
    <button class="romo-btn" style="width: 80px">Second</button>
    <button class="romo-btn" style="width: 80px">Third</button>
  </div>
</div>

```html
<div class="romo-btn-group-vertical romo-align-top">
  <button class="romo-btn" style="width: 40px">1</button>
  <button class="romo-btn" style="width: 40px">2</button>
  <button class="romo-btn" style="width: 40px">3</button>
  <button class="romo-btn" style="width: 40px">4</button>
</div>
<div class="romo-btn-group-vertical romo-align-top">
  <button class="romo-btn" style="width: 80px">First</button>
  <button class="romo-btn" style="width: 80px">Second</button>
  <button class="romo-btn" style="width: 80px">Third</button>
</div>
```

Optionally with border radius.

<div class="romo-pad0-bottom">
  <div class="romo-btn-group-vertical romo-btn-group-border0-radius">
    <button class="romo-btn" style="width: 120px">...</button>
    <button class="romo-btn" style="width: 120px">border0-radius</button>
    <button class="romo-btn" style="width: 120px">...</button>
  </div>
  <div class="romo-btn-group-vertical romo-btn-group-border-radius">
    <button class="romo-btn" style="width: 120px">...</button>
    <button class="romo-btn" style="width: 120px">border-radius</button>
    <button class="romo-btn" style="width: 120px">...</button>
  </div>
  <div class="romo-btn-group-vertical romo-btn-group-border1-radius">
    <button class="romo-btn" style="width: 120px">...</button>
    <button class="romo-btn" style="width: 120px">border1-radius</button>
    <button class="romo-btn" style="width: 120px">...</button>
  </div>
  <div class="romo-btn-group-vertical romo-btn-group-border2-radius">
    <button class="romo-btn" style="width: 120px">...</button>
    <button class="romo-btn" style="width: 120px">border2-radius</button>
    <button class="romo-btn" style="width: 120px">...</button>
  </div>
</div>

```html
<div class="romo-btn-group-vertical romo-btn-group-border0-radius">
  ...
</div>
<div class="romo-btn-group-vertical romo-btn-group-border-radius">
  ...
</div>
<div class="romo-btn-group-vertical romo-btn-group-border1-radius">
  ...
</div>
<div class="romo-btn-group-vertical romo-btn-group-border2-radius">
  ...
</div>
```

## Combined button groups

Combine horizontal and vertical button groups to create grids of buttons.

<div>
  <div class="romo-btn-group">
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">7</button>
      <button class="romo-btn" style="width: 40px">4</button>
      <button class="romo-btn" style="width: 40px">1</button>
      <button class="romo-btn" style="width: 40px">.</button>
    </div>
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">8</button>
      <button class="romo-btn" style="width: 40px">5</button>
      <button class="romo-btn" style="width: 40px">3</button>
      <button class="romo-btn" style="width: 40px">0</button>
    </div>
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">9</button>
      <button class="romo-btn" style="width: 40px">6</button>
      <button class="romo-btn" style="width: 40px">3</button>
      <button class="romo-btn" style="width: 40px">=</button>
    </div>
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">/</button>
      <button class="romo-btn" style="width: 40px">*</button>
      <button class="romo-btn" style="width: 40px">-</button>
      <button class="romo-btn" style="width: 40px">+</button>
    </div>
  </div>
</div>

```html
<div class="romo-btn-group">
  <div class="romo-btn-group-vertical romo-align-top">
    <button class="romo-btn" style="width: 40px">7</button>
    <button class="romo-btn" style="width: 40px">4</button>
    <button class="romo-btn" style="width: 40px">1</button>
    <button class="romo-btn" style="width: 40px">.</button>
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    <button class="romo-btn" style="width: 40px">8</button>
    <button class="romo-btn" style="width: 40px">5</button>
    <button class="romo-btn" style="width: 40px">3</button>
    <button class="romo-btn" style="width: 40px">0</button>
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    <button class="romo-btn" style="width: 40px">9</button>
    <button class="romo-btn" style="width: 40px">6</button>
    <button class="romo-btn" style="width: 40px">3</button>
    <button class="romo-btn" style="width: 40px">=</button>
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    <button class="romo-btn" style="width: 40px">/</button>
    <button class="romo-btn" style="width: 40px">*</button>
    <button class="romo-btn" style="width: 40px">-</button>
    <button class="romo-btn" style="width: 40px">+</button>
  </div>
</div>
```

Optionally with border radius.

<div>
  <div class="romo-btn-group romo-btn-group-border2-radius">
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">7</button>
      <button class="romo-btn" style="width: 40px">4</button>
      <button class="romo-btn" style="width: 40px">1</button>
      <button class="romo-btn" style="width: 40px">.</button>
    </div>
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">8</button>
      <button class="romo-btn" style="width: 40px">5</button>
      <button class="romo-btn" style="width: 40px">3</button>
      <button class="romo-btn" style="width: 40px">0</button>
    </div>
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">9</button>
      <button class="romo-btn" style="width: 40px">6</button>
      <button class="romo-btn" style="width: 40px">3</button>
      <button class="romo-btn" style="width: 40px">=</button>
    </div>
    <div class="romo-btn-group-vertical romo-align-top">
      <button class="romo-btn" style="width: 40px">/</button>
      <button class="romo-btn" style="width: 40px">*</button>
      <button class="romo-btn" style="width: 40px">-</button>
      <button class="romo-btn" style="width: 40px">+</button>
    </div>
  </div>
</div>

```html
<div class="romo-btn-group romo-btn-group-border2-radius">
  <div class="romo-btn-group-vertical romo-align-top">
    ...
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    ...
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    ...
  </div>
  <div class="romo-btn-group-vertical romo-align-top">
    ...
  </div>
</div>
```

## Colored buttons

Use style classes to add color buttons based on an implicit emphasis OR an explicit name.

## Basic

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th>Disabled state</th>
        <th>Active state</th>
        <th>Large size</th>
        <th>Default size</th>
        <th>Small size</th>
        <th>class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-large disabled">Default</button></td>
        <td><button href="#" class="romo-btn romo-btn-large active">Default</button></td>
        <td><button href="#" class="romo-btn romo-btn-large">Default</button></td>
        <td><button href="#" class="romo-btn">Default</button></td>
        <td><button href="#" class="romo-btn romo-btn-small">Default</button></td>
        <td><code>romo-btn</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-alt romo-btn-large disabled">Alt</button></td>
        <td><button href="#" class="romo-btn romo-btn-alt romo-btn-large active">Alt</button></td>
        <td><button href="#" class="romo-btn romo-btn-alt romo-btn-large">Alt</button></td>
        <td><button href="#" class="romo-btn romo-btn-alt">Alt</button></td>
        <td><button href="#" class="romo-btn romo-btn-alt romo-btn-small">Alt</button></td>
        <td><code>romo-btn romo-btn-alt</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-link romo-btn-large disabled">Link</button></td>
        <td><button href="#" class="romo-btn romo-btn-link romo-btn-large active">Link</button></td>
        <td><button href="#" class="romo-btn romo-btn-link romo-btn-large">Link</button></td>
        <td><button href="#" class="romo-btn romo-btn-link">Link</button></td>
        <td><button href="#" class="romo-btn romo-btn-link romo-btn-small">Link</button></td>
        <td><code>romo-btn romo-btn-link</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Explicit

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th>Disabled state</th>
        <th>Active state</th>
        <th>Large size</th>
        <th>Default size</th>
        <th>Small size</th>
        <th>class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-dark-red romo-btn-large disabled">Dark Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-red romo-btn-large active">Dark Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-red romo-btn-large">Dark Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-red">Dark Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-red romo-btn-small">Dark Red</button></td>
        <td><code>romo-btn romo-btn-dark-red</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-red romo-btn-large disabled">Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-red romo-btn-large active">Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-red romo-btn-large">Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-red">Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-red romo-btn-small">Red</button></td>
        <td><code>romo-btn romo-btn-red</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-light-red romo-btn-large disabled">Light Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-red romo-btn-large active">Light Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-red romo-btn-large">Light Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-red">Light Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-red romo-btn-small">Light Red</button></td>
        <td><code>romo-btn romo-btn-light-red</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-pastel-red romo-btn-large disabled">Pastel Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-red romo-btn-large active">Pastel Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-red romo-btn-large">Pastel Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-red">Pastel Red</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-red romo-btn-small">Pastel Red</button></td>
        <td><code>romo-btn romo-btn-pastel-red</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-dark-orange romo-btn-large disabled">Dark Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-orange romo-btn-large active">Dark Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-orange romo-btn-large">Dark Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-orange">Dark Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-orange romo-btn-small">Dark Orange</button></td>
        <td><code>romo-btn romo-btn-dark-orange</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-orange romo-btn-large disabled">Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-orange romo-btn-large active">Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-orange romo-btn-large">Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-orange">Orange</button></td>
        <td><button href="#" class="romo-btn romo-btn-orange romo-btn-small">Orange</button></td>
        <td><code>romo-btn romo-btn-orange</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-yellow romo-btn-large disabled">Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-yellow romo-btn-large active">Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-yellow romo-btn-large">Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-yellow">Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-yellow romo-btn-small">Yellow</button></td>
        <td><code>romo-btn romo-btn-yellow</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-pastel-yellow romo-btn-large disabled">Pastel Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-yellow romo-btn-large active">Pastel Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-yellow romo-btn-large">Pastel Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-yellow">Pastel Yellow</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-yellow romo-btn-small">Pastel Yellow</button></td>
        <td><code>romo-btn romo-btn-pastel-yellow</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-purple romo-btn-large disabled">Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-purple romo-btn-large active">Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-purple romo-btn-large">Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-purple">Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-purple romo-btn-small">Purple</button></td>
        <td><code>romo-btn romo-btn-purple</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-light-purple romo-btn-large disabled">Light Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-purple romo-btn-large active">Light Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-purple romo-btn-large">Light Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-purple">Light Purple</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-purple romo-btn-small">Light Purple</button></td>
        <td><code>romo-btn romo-btn-light-purple</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-dark-pink romo-btn-large disabled">Dark Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-pink romo-btn-large active">Dark Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-pink romo-btn-large">Dark Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-pink">Dark Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-pink romo-btn-small">Dark Pink</button></td>
        <td><code>romo-btn romo-btn-dark-pink</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-hot-pink romo-btn-large disabled">Hot Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-hot-pink romo-btn-large active">Hot Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-hot-pink romo-btn-large">Hot Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-hot-pink">Hot Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-hot-pink romo-btn-small">Hot Pink</button></td>
        <td><code>romo-btn romo-btn-hot-pink</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-pink romo-btn-large disabled">Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-pink romo-btn-large active">Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-pink romo-btn-large">Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-pink">Pink</button></td>
        <td><button href="#" class="romo-btn romo-btn-pink romo-btn-small">Pink</button></td>
        <td><code>romo-btn romo-btn-pink</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-dark-green romo-btn-large disabled">Dark Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-green romo-btn-large active">Dark Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-green romo-btn-large">Dark Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-green">Dark Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-green romo-btn-small">Dark Green</button></td>
        <td><code>romo-btn romo-btn-dark-green</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-green romo-btn-large disabled">Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-green romo-btn-large active">Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-green romo-btn-large">Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-green">Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-green romo-btn-small">Green</button></td>
        <td><code>romo-btn romo-btn-green</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-light-green romo-btn-large disabled">Light Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-green romo-btn-large active">Light Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-green romo-btn-large">Light Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-green">Light Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-green romo-btn-small">Light Green</button></td>
        <td><code>romo-btn romo-btn-light-green</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-pastel-green romo-btn-large disabled">Pastel Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-green romo-btn-large active">Pastel Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-green romo-btn-large">Pastel Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-green">Pastel Green</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-green romo-btn-small">Pastel Green</button></td>
        <td><code>romo-btn romo-btn-pastel-green</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-navy romo-btn-large disabled">Navy</button></td>
        <td><button href="#" class="romo-btn romo-btn-navy romo-btn-large active">Navy</button></td>
        <td><button href="#" class="romo-btn romo-btn-navy romo-btn-large">Navy</button></td>
        <td><button href="#" class="romo-btn romo-btn-navy">Navy</button></td>
        <td><button href="#" class="romo-btn romo-btn-navy romo-btn-small">Navy</button></td>
        <td><code>romo-btn romo-btn-navy</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-dark-blue romo-btn-large disabled">Dark Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-blue romo-btn-large active">Dark Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-blue romo-btn-large">Dark Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-blue">Dark Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-dark-blue romo-btn-small">Dark Blue</button></td>
        <td><code>romo-btn romo-btn-dark-blue</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-blue romo-btn-large disabled">Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-blue romo-btn-large active">Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-blue romo-btn-large">Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-blue">Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-blue romo-btn-small">Blue</button></td>
        <td><code>romo-btn romo-btn-blue</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-light-blue romo-btn-large disabled">Light Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-blue romo-btn-large active">Light Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-blue romo-btn-large">Light Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-blue">Light Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-light-blue romo-btn-small">Light Blue</button></td>
        <td><code>romo-btn romo-btn-light-blue</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-pastel-blue romo-btn-large disabled">Pastel Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-blue romo-btn-large active">Pastel Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-blue romo-btn-large">Pastel Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-blue">Pastel Blue</button></td>
        <td><button href="#" class="romo-btn romo-btn-pastel-blue romo-btn-small">Pastel Blue</button></td>
        <td><code>romo-btn romo-btn-pastel-blue</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Emphasis

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th>Disabled state</th>
        <th>Active state</th>
        <th>Large size</th>
        <th>Default size</th>
        <th>Small size</th>
        <th>class="" - Basis Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-warning romo-btn-large disabled">Warning</button></td>
        <td><button href="#" class="romo-btn romo-btn-warning romo-btn-large active">Warning</button></td>
        <td><button href="#" class="romo-btn romo-btn-warning romo-btn-large">Warning</button></td>
        <td><button href="#" class="romo-btn romo-btn-warning">Warning</button></td>
        <td><button href="#" class="romo-btn romo-btn-warning romo-btn-small">Warning</button></td>
        <td><code>romo-btn romo-btn-warning</code> - <code>$orange</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-danger romo-btn-large disabled">Danger</button></td>
        <td><button href="#" class="romo-btn romo-btn-danger romo-btn-large active">Danger</button></td>
        <td><button href="#" class="romo-btn romo-btn-danger romo-btn-large">Danger</button></td>
        <td><button href="#" class="romo-btn romo-btn-danger">Danger</button></td>
        <td><button href="#" class="romo-btn romo-btn-danger romo-btn-small" >Danger</button></td>
        <td><code>romo-btn romo-btn-danger - <code>$red</code></code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-info romo-btn-large disabled">Info</button></td>
        <td><button href="#" class="romo-btn romo-btn-info romo-btn-large active">Info</button></td>
        <td><button href="#" class="romo-btn romo-btn-info romo-btn-large">Info</button></td>
        <td><button href="#" class="romo-btn romo-btn-info">Info</button></td>
        <td><button href="#" class="romo-btn romo-btn-info romo-btn-small">Info</button></td>
        <td><code>romo-btn romo-btn-info</code> - <code>$blue</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-success romo-btn-large disabled">Success</button></td>
        <td><button href="#" class="romo-btn romo-btn-success romo-btn-large active">Success</button></td>
        <td><button href="#" class="romo-btn romo-btn-success romo-btn-large">Success</button></td>
        <td><button href="#" class="romo-btn romo-btn-success">Success</button></td>
        <td><button href="#" class="romo-btn romo-btn-success romo-btn-small">Success</button></td>
        <td><code>romo-btn romo-btn-success</code> - <code>$green</code></td>
      </tr>
      <tr>
        <td><button href="#" class="romo-btn romo-btn-inverse romo-btn-large disabled">Inverse</button></td>
        <td><button href="#" class="romo-btn romo-btn-inverse romo-btn-large active">Inverse</button></td>
        <td><button href="#" class="romo-btn romo-btn-inverse romo-btn-large">Inverse</button></td>
        <td><button href="#" class="romo-btn romo-btn-inverse">Inverse</button></td>
        <td><button href="#" class="romo-btn romo-btn-inverse romo-btn-small">Inverse</button></td>
        <td><code>romo-btn romo-btn-inverse</code> - <code>$inverseColor</code></td>
      </tr>
    </tbody>
  </table>
</div>
