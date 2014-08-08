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

### `{th|td}.romo-span-N-N`

Add grid column style classes to set table cell widths.

<div class="romo-pad">
  <table class="romo-table">
    <thead>
      <tr>
        <th class="romo-span-1-12">#</th>
        <th class="romo-span-7-12">Name</th>
        <th class="romo-span-2-12">Slug</th>
        <th class="romo-span-2-12">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-span-1-12">1</td>
        <td class="romo-span-7-12">Joe Test</td>
        <td class="romo-span-2-12">joe-test</td>
        <td class="romo-span-2-12">10</td>
      </tr>
      <tr>
        <td class="romo-span-1-12">2</td>
        <td class="romo-span-7-12">Jane Doe</td>
        <td class="romo-span-2-12">jane-doe</td>
        <td class="romo-span-2-12">18</td>
      </tr>
      <tr>
        <td class="romo-span-1-12">3</td>
        <td class="romo-span-7-12">Good Corp.</td>
        <td class="romo-span-2-12">good-corp</td>
        <td class="romo-span-2-12">5</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table">
    <thead>
      <tr>
        <th class="romo-span-1-12">#</th>
        <th class="romo-span-7-12">Name</th>
        <th class="romo-span-2-12">Slug</th>
        <th class="romo-span-2-12">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-span-1-12">1</td>
        <td class="romo-span-7-12">Joe Test</td>
        <td class="romo-span-2-12">joe-test</td>
        <td class="romo-span-2-12">10</td>
      </tr>
      <tr>
        <td class="romo-span-1-12">2</td>
        <td class="romo-span-7-12">Jane Doe</td>
        <td class="romo-span-2-12">jane-doe</td>
        <td class="romo-span-2-12">18</td>
      </tr>
      <tr>
        <td class="romo-span-1-12">3</td>
        <td class="romo-span-7-12">Good Corp.</td>
        <td class="romo-span-2-12">good-corp</td>
        <td class="romo-span-2-12">5</td>
      </tr>
    </tbody>
  </table>
</div>
```

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
  <table class="romo-table romo-table-alt">
    ...
  </table>
</div>
```

### `tr.romo-{muted|warning|error|info|success|inverse}`

Add color emphasis to rows.

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
      <tr class="romo-muted romo-text-muted">
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr class="romo-warning">
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr class="romo-error">
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
      <tr class="romo-info">
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr class="romo-success">
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr class="romo-inverse romo-text-inverse">
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
  <table class="romo-table romo-table-hover">
    ...
    <tr class="romo-muted romo-text-muted">...</tr>
    <tr class="romo-warning">...</tr>
    <tr class="romo-error">...</tr>
    <tr class="romo-info">...</tr>
    <tr class="romo-success">...</tr>
    <tr class="romo-inverse romo-text-inverse">...</tr>
  </table>
</div>
```

### `.romo-table-hover`

Add hover state to rows within a `<tbody>`.

<div class="romo-pad">
  <table class="romo-table romo-table-hover">
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
  <table class="romo-table romo-table-hover">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-hover romo-table-striped">
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
  <table class="romo-table romo-table-hover romo-table-striped">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-hover romo-table-alt">
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

<div class="romo-pad">
  <table class="romo-table romo-table-hover romo-table-alt romo-table-striped">
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
  <table class="romo-table romo-table-hover romo-table-alt">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr class="romo-muted romo-text-muted">
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr class="romo-warning">
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr class="romo-error">
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
      <tr class="romo-info">
        <td>1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr class="romo-success">
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr class="romo-inverse romo-text-inverse">
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
  <table class="romo-table romo-table-hover">
    ...
    <tr class="romo-muted romo-text-muted">...</tr>
    <tr class="romo-warning">...</tr>
    <tr class="romo-error">...</tr>
    <tr class="romo-info">...</tr>
    <tr class="romo-success">...</tr>
    <tr class="romo-inverse romo-text-inverse">...</tr>
  </table>
</div>
```

### `.romo-table-border{1-6}`

Adds sized borders to the table.

<div class="romo-pad">
  <table class="romo-table romo-table-border">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-pad">
  <table class="romo-table romo-table-border1">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-pad">
  <table class="romo-table romo-table-border2">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-pad">
  <table class="romo-table romo-table-border3">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-pad">
  <table class="romo-table romo-table-border4">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-pad">
  <table class="romo-table romo-table-border5">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-pad">
  <table class="romo-table romo-table-border6">
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
        <td rowspan="2">1</td>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td>3</td>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table romo-table-border{1-6}">
    ...
  </table>
</div>
```

### `.romo-table-border-{muted|warning|error|info|success|inverse}`

Adds border color empasis to the entire table.

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-border-muted">
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

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-border-warning">
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

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-border-error">
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

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-border-info">
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

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-border-success">
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

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-border-inverse">
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
  <table class="romo-table romo-table-border6 romo-table-border-{muted|warning|error|info|success|inverse}">
    ...
  </table>
</div>
```

### `.romo-table-border-alt`

Uses the alternate border color for the table borders.

<div class="romo-pad">
  <table class="romo-table romo-table-border6 romo-table-alt romo-table-border-alt">
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
  <table class="romo-table romo-table-border6 romo-table-alt romo-table-border-alt">
    ...
  </table>
</div>
```

### `.romo-table-padN{-top|-right|-bottom|-left|}`

Adds cell padding to every cell in the table

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad0">
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
  <table class="romo-table romo-table-pad0">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad">
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
  <table class="romo-table romo-table-pad">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad1">
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
  <table class="romo-table romo-table-pad1">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad2">
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
  <table class="romo-table romo-table-pad2">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad3">
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
  <table class="romo-table romo-table-pad3">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad4">
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
  <table class="romo-table romo-table-pad4">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad5">
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
  <table class="romo-table romo-table-pad5">
    ...
  </table>
</div>
```

<div class="romo-pad">
  <table class="romo-table romo-table-border romo-table-pad6">
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
  <table class="romo-table romo-table-pad6">
    ...
  </table>
</div>
```

## Custom Styles

Use any helper style classes in any combination on rows/cells.

<div class="romo-pad">
  <table class="romo-table romo-table-pad2">
    <thead>
      <tr>
        <th class="romo-pad2">#</th>
        <th>Name</th>
        <th class="romo-text2 romo-pad2-left">Slug</th>
        <th class="romo-span-1-12 romo-text-center romo-text-top">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td class="romo-bg-info">Joe Test</td>
        <td>joe-test</td>
        <td class="romo-span-1-12 romo-text2 romo-border-error romo-border4">10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td class="romo-pad3">jane-doe</td>
        <td class="romo-span-1-12 romo-text-center romo-text-success">18</td>
      </tr>
      <tr class="romo-bg-success">
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td class="romo-span-1-12">5</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<div class="romo-pad">
  <table class="romo-table romo-table-pad2">
    <thead>
      <tr>
        <th class="romo-pad2">#</th>
        <th>Name</th>
        <th class="romo-text2 romo-pad2-left">Slug</th>
        <th class="romo-span-1-12 romo-text-center romo-text-top">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td class="romo-bg-info">Joe Test</td>
        <td>joe-test</td>
        <td class="romo-span-1-12 romo-text2 romo-border-error romo-border4">10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
        <td class="romo-pad3">jane-doe</td>
        <td class="romo-span-1-12 romo-text-center romo-text-success">18</td>
      </tr>
      <tr class="romo-bg-success">
        <td>3</td>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td class="romo-span-1-12">5</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Supported table markup

List of supported table HTML elements and how they should be used.

<div>
<table class="romo-table romo-table-striped romo-table-pad romo-table-border">
  <thead>
    <tr>
      <th>Tag</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;table&gt;</code></td>
      <td>Wrapping element for displaying data in a tabular format</td>
    </tr>
    <tr>
      <td><code>&lt;thead&gt;</code></td>
      <td>(optional) Container element for table header rows to label table columns</td>
    </tr>
    <tr>
      <td><code>&lt;tfoot&gt;</code></td>
      <td>(optional) Container element for table footer rows</td>
    </tr>
    <tr>
      <td><code>&lt;tbody&gt;</code></td>
      <td>Container element for table rows in the body of the table</td>
    </tr>
    <tr>
      <td><code>&lt;tr&gt;</code></td>
      <td>Container element for a set of table cells that appears on a single row</td>
    </tr>
    <tr>
      <td><code>&lt;td&gt;</code></td>
      <td>Default table cell</td>
    </tr>
    <tr>
      <td><code>&lt;th&gt;</code></td>
      <td>Special table cell for column (or row, depending on scope and placement) labels</td>
    </tr>
  </tbody>
</table>
</div>

```html
<table>
  <thead>
    <tr>
      <th>...</th>
      <th>...</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>...</td>
      <td>...</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>...</td>
      <td>...</td>
    </tr>
  </tbody>
</table>
```
