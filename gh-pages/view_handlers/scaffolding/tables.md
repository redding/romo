## Default styles

For basic styling with horizontal dividers, add the base class `.romo-table`.

<div class="romo-pad">
  <table class="romo-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table">
  ...
  </table>
</div>
```

## Optional classes

Add any of the following classes to the `.romo-table` base class.

### `.romo-table-striped`

Adds zebra-striping to any table row within the `<tbody>` via the `:nth-child` CSS selector.

<div class="romo-pad">
  <table class="romo-table romo-table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table romo-table-striped">
    ...
  </table>
</div>
```

### `.romo-table-alt`

Uses the alternate bg color for the table background.

<div class="romo-pad">
  <table class="romo-table romo-table-alt">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table romo-table-alt">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-alt romo-table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table romo-table-alt romo-table-striped">
    ...
  </table>
</div>
```

