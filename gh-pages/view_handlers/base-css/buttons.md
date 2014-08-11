## Default buttons

Button styles can be applied to anything with the `.romo-btn` class. However, typically you'll want to apply these to only `<a>` and `<button>` elements for the best rendering.

<div class="romo-pad">
  <button class="romo-btn romo-push0-bottom">Button</button>
  <a class="romo-btn romo-push0-bottom">Anchor</a>
  <input type="button" class="romo-btn romo-push0-bottom" value="Input-button" />
  <input type="submit" class="romo-btn romo-push0-bottom" value="Input-submit" />
  <input type="reset"  class="romo-btn romo-push0-bottom" value="Input-reset" />
  <button class="romo-btn romo-push0-bottom" disabled>Disabled by prop button</button>
  <button class="romo-btn disabled romo-push0-bottom">Disabled by class button</button>
</div>

```html
<button class="romo-btn">Button</button>
<a class="romo-btn">Anchor</a>
<input type="button" class="romo-btn" value="Input-button" />
<input type="submit" class="romo-btn" value="Input-submit" />
<input type="reset"  class="romo-btn" value="Input-reset" />
<button class="romo-btn" disabled>Disabled by prop button</button>
<button class="romo-btn disabled">Disabled by class button</button>
```

## Button sizes

Use numbered style classes to size up/down buttons.

<div class="romo-pad">
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn1">.romo-btn1</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn2">.romo-btn2</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn3">.romo-btn3</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn4">.romo-btn4</button>
    <button class="romo-btn romo-btn-large">.romo-btn-large</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn5">.romo-btn5</button>
  </div>
  <div class="romo-push0-bottom">
    <button class="romo-btn">.romo-btn</button>
    <button class="romo-btn romo-btn6">.romo-btn6</button>
    <button class="romo-btn romo-btn-small">.romo-btn-small</button>
  </div>
</div>

```html
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn1">.romo-btn1</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn2">.romo-btn2</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn3">.romo-btn3</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn4">.romo-btn4</button>
  <button class="romo-btn romo-btn-large">.romo-btn-large</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn5">.romo-btn5</button>
</div>
<div class="romo-push0-bottom">
  <button class="romo-btn">.romo-btn</button>
  <button class="romo-btn romo-btn6">.romo-btn6</button>
  <button class="romo-btn romo-btn-small">.romo-btn-small</button>
</div>
```

Use `.romo-btn-block` to add blocking full-width buttons.

<div class="romo-pad">
  <button class="romo-btn romo-btn-block">Blocking full-width button</button>
</div>

```html
<button class="romo-btn romo-btn-block">Blocking full-width button</button>
```

## Alternate buttons

Use these as an alternative to the default styles and to add color emphasis to buttons.

<div class="romo-push">
  <table class="romo-table romo-table-border romo-table-striped romo-table-pad1">
    <thead>
      <tr>
        <th class="romo-span-2-12">Disabled state</th>
        <th class="romo-span-2-12">Large size</th>
        <th class="romo-span-2-12">Default size</th>
        <th class="romo-span-2-12">Small size</th>
        <th>class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-large disabled">Default</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-large">Default</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn"               >Default</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-small">Default</button>
        </td>
        <td><code>romo-btn</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-alt romo-btn-large disabled">Alt</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-alt romo-btn-large">Alt</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-alt"               >Alt</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-alt romo-btn-small">Alt</button>
        </td>
        <td><code>romo-btn romo-btn-alt</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-primary romo-btn-large disabled">Primary</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-primary romo-btn-large">Primary</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-primary"               >Primary</button>
        </td>
        <td class="romo-span--12">
          <button class="romo-btn romo-btn-primary romo-btn-small">Primary</button>
        </td>
        <td><code>romo-btn romo-btn-primary</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-warning romo-btn-large disabled">Warning</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-warning romo-btn-large">Warning</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-warning"               >Warning</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-warning romo-btn-small">Warning</button>
        </td>
        <td><code>romo-btn romo-btn-warning</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-danger romo-btn-large disabled">Danger</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-danger romo-btn-large">Danger</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-error"                >Danger</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-error romo-btn-small" >Danger</button>
        </td>
        <td>
          <code>romo-btn romo-btn-danger</code><br/>
          Or, <code>romo-btn romo-btn-error</code>
        </td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-info romo-btn-large disabled">Info</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-info romo-btn-large">Info</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-info"               >Info</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-info romo-btn-small">Info</button>
        </td>
        <td><code>romo-btn romo-btn-info</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-success romo-btn-large disabled">Success</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-success romo-btn-large">Success</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-success"               >Success</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-success romo-btn-small">Success</button>
        </td>
        <td><code>romo-btn romo-btn-success</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-inverse romo-btn-large disabled">Inverse</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-inverse romo-btn-large">Inverse</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-inverse"               >Inverse</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-inverse romo-btn-small">Inverse</button>
        </td>
        <td><code>romo-btn romo-btn-inverse</code></td>
      </tr>
      <tr>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-link romo-btn-large disabled">Link</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-link romo-btn-large">Link</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-link"               >Link</button>
        </td>
        <td class="romo-span-2-12">
          <button class="romo-btn romo-btn-link romo-btn-small">Link</button>
        </td>
        <td><code>romo-btn romo-btn-link</code></td>
      </tr>
    </tbody>
  </table>
</div>
