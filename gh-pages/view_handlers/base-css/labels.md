## Default labels

Label styles can be applied to anything with the `.romo-label` class.

<div class="romo-pad">
  <span class="romo-label romo-push0-bottom">Label</span>
</div>

```html
<span class="romo-label">Label</span>
```

## Label sizes

Use numbered style classes to size up/down labels.

<div class="romo-pad">
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label1">.romo-label1</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label2">.romo-label2</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label3">.romo-label3</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label4">.romo-label4</span>
    <span class="romo-label romo-label-large">.romo-label-large</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label5">.romo-label5</span>
  </div>
  <div class="romo-push0-bottom">
    <span class="romo-label">.romo-label</span>
    <span class="romo-label romo-label6">.romo-label6</span>
    <span class="romo-label romo-label-small">.romo-label-small</span>
  </div>
</div>

```html
<div class="romo-push0-bottom">
  <span class="romo-label">.romo-label</span>
  <span class="romo-label romo-label1">.romo-label1</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">.romo-label</span>
  <span class="romo-label romo-label2">.romo-label2</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">.romo-label</span>
  <span class="romo-label romo-label3">.romo-label3</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">.romo-label</span>
  <span class="romo-label romo-label4">.romo-label4</span>
  <span class="romo-label romo-label-large">.romo-label-large</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">.romo-label</span>
  <span class="romo-label romo-label5">.romo-label5</span>
</div>
<div class="romo-push0-bottom">
  <span class="romo-label">.romo-label</span>
  <span class="romo-label romo-label6">.romo-label6</span>
  <span class="romo-label romo-label-small">.romo-label-small</span>
</div>
```

## Alternate labels

Use these as an alternative to the default styles and to add color emphasis to labels.

<div class="romo-push">
  <table class="romo-table romo-table-border romo-table-striped romo-table-pad1">
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
        <td class="romo-bg-alt"><span class="romo-label romo-label-alt romo-label-large">Alt</span></td>
        <td class="romo-bg-alt"><span class="romo-label romo-label-alt">Alt</span></td>
        <td class="romo-bg-alt"><span class="romo-label romo-label-alt romo-label-small">Alt</span></td>
        <td><code>romo-label romo-label-alt</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-primary romo-label-large">Primary</span></td>
        <td><span class="romo-label romo-label-primary ">Primary</span></td>
        <td><span class="romo-label romo-label-primary romo-label-small">Primary</span></td>
        <td><code>romo-label romo-label-primary</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-warning romo-label-large">Warning</span></td>
        <td><span class="romo-label romo-label-warning ">Warning</span></td>
        <td><span class="romo-label romo-label-warning romo-label-small">Warning</span></td>
        <td><code>romo-label romo-label-warning</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-danger romo-label-large">Danger</span></td>
        <td><span class="romo-label romo-label-danger ">Danger</span></td>
        <td><span class="romo-label romo-label-error romo-label-small">Danger</span></td>
        <td><code>romo-label romo-label-danger</code><br/>Or, <code>romo-label romo-label-error</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-info romo-label-large">Info</span></td>
        <td><span class="romo-label romo-label-info ">Info</span></td>
        <td><span class="romo-label romo-label-info romo-label-small">Info</span></td>
        <td><code>romo-label romo-label-info</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-success romo-label-large">Success</span></td>
        <td><span class="romo-label romo-label-success ">Success</span></td>
        <td><span class="romo-label romo-label-success romo-label-small">Success</span></td>
        <td><code>romo-label romo-label-success</code></td>
      </tr>
      <tr>
        <td><span class="romo-label romo-label-inverse romo-label-large">Inverse</span></td>
        <td><span class="romo-label romo-label-inverse ">Inverse</span></td>
        <td><span class="romo-label romo-label-inverse romo-label-small">Inverse</span></td>
        <td><code>romo-label romo-label-inverse</code></td>
      </tr>
    </tbody>
  </table>
</div>
