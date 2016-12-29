## Default labels

Label styles can be applied to anything with the `.romo-label` class.

<div>
  <span class="romo-label romo-push0-bottom">Label</span>
</div>

```html
<span class="romo-label">...</span>
```

## Label sizes

Use numbered style classes to size up/down labels.

<div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label0">.romo-label0</span>
    <span class="romo-label romo-label-small">.romo-label-small</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label1">.romo-label1</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label2">.romo-label2</span>
    <span class="romo-label romo-label-large">.romo-label-large</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label3">.romo-label3</span>
  </div>
</div>

```html
<div class="romo-push0-bottom">
  <span class="romo-label">...</span>
  <span class="romo-label romo-label0">...</span>
  <span class="romo-label romo-label-small">...</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">...</span>
  <span class="romo-label romo-label1">...</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">...</span>
  <span class="romo-label romo-label2">...</span>
  <span class="romo-label romo-label-large">...</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">...</span>
  <span class="romo-label romo-label3">...</span>
</div>
```

Use to align with inline text.

<div>
  <div class="romo-push0-bottom">
    <span class="romo-text0 romo-align-middle">.romo-text0</span>
    <span class="romo-label romo-label0">.romo-label0</span>
    <span class="romo-text-small romo-align-middle">.romo-text-small</span>
    <span class="romo-label romo-label-small">.romo-label-small</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-text1 romo-align-middle">.romo-text1</span>
    <span class="romo-label romo-label1">.romo-label1</span>
    <span class="romo-text romo-align-middle">.romo-text</span>
    <span class="romo-label">.romo-label</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-text2 romo-align-middle">.romo-text2</span>
    <span class="romo-label romo-label2">.romo-label2</span>
    <span class="romo-text-large romo-align-middle">.romo-text-large</span>
    <span class="romo-label romo-label-large">.romo-label-large</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-text3 romo-align-middle">.romo-text3</span>
    <span class="romo-label romo-label3">.romo-label3</span>
  </div>
</div>

```html
<div class="romo-push0-bottom">
  <span class="romo-text0 romo-align-middle">.romo-text0</span>
  <span class="romo-label romo-label0">.romo-label0</span>
  <span class="romo-text-small romo-align-middle">.romo-text-small</span>
  <span class="romo-label romo-label-small">.romo-label-small</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-text1 romo-align-middle">.romo-text1</span>
  <span class="romo-label romo-label1">.romo-label1</span>
  <span class="romo-text romo-align-middle">.romo-text</span>
  <span class="romo-label">.romo-label</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-text2 romo-align-middle">.romo-text2</span>
  <span class="romo-label romo-label2">.romo-label2</span>
  <span class="romo-text-large romo-align-middle">.romo-text-large</span>
  <span class="romo-label romo-label-large">.romo-label-large</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-text3 romo-align-middle">.romo-text3</span>
  <span class="romo-label romo-label3">.romo-label3</span>
</div>
```

Or use `.romo-label-inline` to manually vertically align text that isn't inline with an image.

<div class="romo-row romo-push0-bottom">
  <div class="romo-span romo-3-12 romo-align-right romo-pad0-right">
    <span class="romo-label romo-label-large">.romo-label-large</span>
  </div>
  <div class="romo-span romo-2-12 romo-text-small">
    <span class="romo-label-inline-large">.romo-text-small</span>
  </div>
  <div class="romo-span romo-offset-7-12"></div>
</div>

```html
<div class="romo-row romo-push0-bottom">
  <div class="romo-span romo-3-12 romo-align-right romo-pad0-right">
    <span class="romo-label romo-label-large">.romo-label-large</span>
  </div>
  <div class="romo-span romo-2-12 romo-text-small">
    <span class="romo-label-inline-large">.romo-text-small</span>
  </div>
  <div class="romo-span romo-offset-7-12"></div>
</div>
```

Use `.romo-label-block` to add blocking full-width labels.

<div>
  <span class="romo-label romo-label-block">Blocking full-width label</span>
</div>

```html
<span class="romo-label romo-label-block">...</span>
```

## Colored labels

Use style classes to add color buttons based on an implicit emphasis OR an explicit name.

## Basic

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th>Large size</th>
        <th>Default size</th>
        <th>Small size</th>
        <th>class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="romo-label romo-label-large">Default</span></td>
        <td><span class="romo-label">Default</span></td>
        <td><span class="romo-label romo-label-small">Default</span></td>
        <td><code>romo-label</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-alt romo-label-large">Alt</span></td>
        <td><span class="romo-label romo-label-alt">Alt</span></td>
        <td><span class="romo-label romo-label-alt romo-label-small">Alt</span></td>
        <td><code>romo-label romo-label-alt</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Explicit

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th>Large size</th>
        <th>Default size</th>
        <th>Small size</th>
        <th>class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="romo-label romo-label-dark-red romo-label-large">Dark Red</span></td>
        <td><span class="romo-label romo-label-dark-red">Dark Red</span></td>
        <td><span class="romo-label romo-label-dark-red romo-label-small">Dark Red</span></td>
        <td><code>romo-label romo-label-dark-red</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-red romo-label-large">Red</span></td>
        <td><span class="romo-label romo-label-red">Red</span></td>
        <td><span class="romo-label romo-label-red romo-label-small">Red</span></td>
        <td><code>romo-label romo-label-red</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-light-red romo-label-large">Light Red</span></td>
        <td><span class="romo-label romo-label-light-red">Light Red</span></td>
        <td><span class="romo-label romo-label-light-red romo-label-small">Light Red</span></td>
        <td><code>romo-label romo-label-light-red</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-pastel-red romo-label-large">Pastel Red</span></td>
        <td><span class="romo-label romo-label-pastel-red">Pastel Red</span></td>
        <td><span class="romo-label romo-label-pastel-red romo-label-small">Pastel Red</span></td>
        <td><code>romo-label romo-label-pastel-red</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-dark-orange romo-label-large">Dark Orange</span></td>
        <td><span class="romo-label romo-label-dark-orange">Dark Orange</span></td>
        <td><span class="romo-label romo-label-dark-orange romo-label-small">Dark Orange</span></td>
        <td><code>romo-label romo-label-dark-orange</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-orange romo-label-large">Orange</span></td>
        <td><span class="romo-label romo-label-orange">Orange</span></td>
        <td><span class="romo-label romo-label-orange romo-label-small">Orange</span></td>
        <td><code>romo-label romo-label-orange</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-yellow romo-label-large">Yellow</span></td>
        <td><span class="romo-label romo-label-yellow">Yellow</span></td>
        <td><span class="romo-label romo-label-yellow romo-label-small">Yellow</span></td>
        <td><code>romo-label romo-label-yellow</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-pastel-yellow romo-label-large">Pastel Yellow</span></td>
        <td><span class="romo-label romo-label-pastel-yellow">Pastel Yellow</span></td>
        <td><span class="romo-label romo-label-pastel-yellow romo-label-small">Pastel Yellow</span></td>
        <td><code>romo-label romo-label-pastel-yellow</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-purple romo-label-large">Purple</span></td>
        <td><span class="romo-label romo-label-purple">Purple</span></td>
        <td><span class="romo-label romo-label-purple romo-label-small">Purple</span></td>
        <td><code>romo-label romo-label-purple</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-light-purple romo-label-large">Light Purple</span></td>
        <td><span class="romo-label romo-label-light-purple">Light Purple</span></td>
        <td><span class="romo-label romo-label-light-purple romo-label-small">Light Purple</span></td>
        <td><code>romo-label romo-label-light-purple</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-dark-pink romo-label-large">Dark Pink</span></td>
        <td><span class="romo-label romo-label-dark-pink">Dark Pink</span></td>
        <td><span class="romo-label romo-label-dark-pink romo-label-small">Dark Pink</span></td>
        <td><code>romo-label romo-label-dark-pink</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-hot-pink romo-label-large">Hot Pink</span></td>
        <td><span class="romo-label romo-label-hot-pink">Hot Pink</span></td>
        <td><span class="romo-label romo-label-hot-pink romo-label-small">Hot Pink</span></td>
        <td><code>romo-label romo-label-hot-pink</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-pink romo-label-large">Pink</span></td>
        <td><span class="romo-label romo-label-pink">Pink</span></td>
        <td><span class="romo-label romo-label-pink romo-label-small">Pink</span></td>
        <td><code>romo-label romo-label-pink</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-dark-green romo-label-large">Dark Green</span></td>
        <td><span class="romo-label romo-label-dark-green">Dark Green</span></td>
        <td><span class="romo-label romo-label-dark-green romo-label-small">Dark Green</span></td>
        <td><code>romo-label romo-label-dark-green</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-green romo-label-large">Green</span></td>
        <td><span class="romo-label romo-label-green">Green</span></td>
        <td><span class="romo-label romo-label-green romo-label-small">Green</span></td>
        <td><code>romo-label romo-label-green</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-light-green romo-label-large">Light Green</span></td>
        <td><span class="romo-label romo-label-light-green">Light Green</span></td>
        <td><span class="romo-label romo-label-light-green romo-label-small">Light Green</span></td>
        <td><code>romo-label romo-label-light-green</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-pastel-green romo-label-large">Pastel Green</span></td>
        <td><span class="romo-label romo-label-pastel-green">Pastel Green</span></td>
        <td><span class="romo-label romo-label-pastel-green romo-label-small">Pastel Green</span></td>
        <td><code>romo-label romo-label-pastel-green</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-navy romo-label-large">Navy</span></td>
        <td><span class="romo-label romo-label-navy">Navy</span></td>
        <td><span class="romo-label romo-label-navy romo-label-small">Navy</span></td>
        <td><code>romo-label romo-label-navy</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-dark-blue romo-label-large">Dark Blue</span></td>
        <td><span class="romo-label romo-label-dark-blue">Dark Blue</span></td>
        <td><span class="romo-label romo-label-dark-blue romo-label-small">Dark Blue</span></td>
        <td><code>romo-label romo-label-dark-blue</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-blue romo-label-large">Blue</span></td>
        <td><span class="romo-label romo-label-blue">Blue</span></td>
        <td><span class="romo-label romo-label-blue romo-label-small">Blue</span></td>
        <td><code>romo-label romo-label-blue</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-light-blue romo-label-large">Light Blue</span></td>
        <td><span class="romo-label romo-label-light-blue">Light Blue</span></td>
        <td><span class="romo-label romo-label-light-blue romo-label-small">Light Blue</span></td>
        <td><code>romo-label romo-label-light-blue</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-pastel-blue romo-label-large">Pastel Blue</span></td>
        <td><span class="romo-label romo-label-pastel-blue">Pastel Blue</span></td>
        <td><span class="romo-label romo-label-pastel-blue romo-label-small">Pastel Blue</span></td>
        <td><code>romo-label romo-label-pastel-blue</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Emphasis

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th>Large size</th>
        <th>Default size</th>
        <th>Small size</th>
        <th>class="" - Basis Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="romo-label romo-label-warning romo-label-large">Warning</span></td>
        <td><span class="romo-label romo-label-warning">Warning</span></td>
        <td><span class="romo-label romo-label-warning romo-label-small">Warning</span></td>
        <td><code>romo-label romo-label-warning</code> - <code>$orange</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-danger romo-label-large">Danger</span></td>
        <td><span class="romo-label romo-label-danger">Danger</span></td>
        <td><span class="romo-label romo-label-danger romo-label-small" >Danger</span></td>
        <td><code>romo-label romo-label-danger - <code>$red</code></code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-info romo-label-large">Info</span></td>
        <td><span class="romo-label romo-label-info">Info</span></td>
        <td><span class="romo-label romo-label-info romo-label-small">Info</span></td>
        <td><code>romo-label romo-label-info</code> - <code>$blue</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-success romo-label-large">Success</span></td>
        <td><span class="romo-label romo-label-success">Success</span></td>
        <td><span class="romo-label romo-label-success romo-label-small">Success</span></td>
        <td><code>romo-label romo-label-success</code> - <code>$green</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-inverse romo-label-large">Inverse</span></td>
        <td><span class="romo-label romo-label-inverse">Inverse</span></td>
        <td><span class="romo-label romo-label-inverse romo-label-small">Inverse</span></td>
        <td><code>romo-label romo-label-inverse</code> - <code>$inverseColor</code></td>
      </tr>
    </tbody>
  </table>
</div>
