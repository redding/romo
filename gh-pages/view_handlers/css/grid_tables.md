## Introduction

Grid tables are grids styled to look like `.romo-table` tables.  They support the some optional classes, styling and behavior.

Grid tables are built by wrapping grid markup in a `.romo-grid-table` element.  Grid tables should be used when you want your markup to look like a table but not have all the special behavior that comes with a table.

You **won't** get:

* semantic header, body, footer, etc.
* auto sizing columns based on their content
* consistent cell heights across rows.

You **will** get:

* raw markup that can be more easily manipulated (ie drag n drop, etc).
* more flexible styling control

**Also note**: Romo grid tables aren't designed to be nested in one another.  Doing so causes the styles of the parent grid table to be forced on the child grid table.

### Default styles

For basic styling, wrap the grid markup and add the base classes `.romo-list-table`.  Lists are used in these examples, but any grid elements can also be used.

<div>
  <ul class="romo-grid-table">
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table">
  <li class="romo-row">
    ...
  </li>
  <li class="romo-row">
    ...
  </li>
</ul>
```

## Optional classes

### `.romo-grid-table-header`

Assumes the first row is a header row and styles it.

<div>
  <ul class="romo-grid-table romo-grid-table-header">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-header">
  ...
</ul>
```

### `.romo-grid-table-striped`

Adds zebra-striping to grid table rows via the `:nth-child` CSS selector.

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-striped romo-grid-table-striped-alt">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-striped">
  ...
</ul>
<ul class="romo-grid-table romo-grid-table-header romo-grid-table-striped">
  ...
</ul>
<ul class="romo-grid-table romo-grid-table-striped romo-grid-table-striped-alt">
  ...
</ul>
```

### `.romo-grid-table-alt`

Uses the alternate bg color for the table background.

<div>
  <ul class="romo-grid-table romo-grid-table-alt romo-grid-table-header">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-alt">
  ...
</ul>
```

### `.romo-row.romo-{muted|warning|error|info|success|inverse}`

Add color emphasis to grid table rows.

<div>
  <ul class="romo-grid-table romo-grid-table-header">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row romo-muted">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row romo-warning">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row romo-error">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
    <li class="romo-row romo-info">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row romo-success">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row romo-inverse romo-text-inverse">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-header">
  <li class="romo-row">...</li>
  <li class="romo-row romo-muted">...</li>
  <li class="romo-row romo-warning">...</li>
  <li class="romo-row romo-error">...</li>
  <li class="romo-row romo-info">...</li>
  <li class="romo-row romo-success">...</li>
  <li class="romo-row romo-inverse romo-text-inverse">...</li>
</ul>
```

### `.romo-grid-table-hover`

Add hover state to rows

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-hover">
  ...
</ul>
<ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover">
  ...
</ul>
```

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-hover romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-hover romo-grid-table-striped">
  ...
</ul>
<ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover romo-grid-table-striped">
  ...
</ul>
```

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-hover romo-grid-table-alt">
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-hover romo-grid-table-alt romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover romo-grid-table-alt romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-hover romo-grid-table-alt">
  ...
</ul>
<ul class="romo-grid-table romo-grid-table-hover romo-grid-table-alt romo-grid-table-striped">
  ...
</ul>
<ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover romo-grid-table-alt romo-grid-table-striped">
  ...
</ul>
```

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-hover">
    <li class="romo-row romo-muted">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row romo-warning">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row romo-error">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
    <li class="romo-row romo-info">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row romo-success">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row romo-inverse romo-text-inverse">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row romo-muted">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row romo-warning">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row romo-error">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
    <li class="romo-row romo-info">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row romo-success">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row romo-inverse romo-text-inverse">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover">
  <li class="romo-row">...</li>
  <li class="romo-row romo-muted">...</li>
  <li class="romo-row romo-warning">...</li>
  <li class="romo-row romo-error">...</li>
  <li class="romo-row romo-info">...</li>
  <li class="romo-row romo-success">...</li>
  <li class="romo-row romo-inverse romo-text-inverse">...</li>
</ul>
```

### `.romo-grid-table-border{0-2}`

Adds sized borders to the grid table.

**Note**: This makes all cells hide any overflow.  Since grid tables don't keep all cell heights the same (like normal tables do), uneven grid heights break the borders.  If you need cells to overflow with borders, use a standard romo table.

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border0">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border1">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-border{0-2}">
  ...
</ul>
```

### `.romo-grid-table-border-none`

Remove all borders from the grid table.

**Note**: This makes all cells hide any overflow.  Since grid tables don't keep all cell heights the same (like normal tables do), uneven grid heights break the borders.  If you need cells to overflow with borders, use a standard romo table.

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border-none">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-border-none">
  ...
</ul>
```

### `.romo-grid-table-border-{muted|warning|error|info|success|inverse}`

Adds border color emphasis to the entire grid table.

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-border-muted">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-border-warning">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-border-error">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-border-info">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-pad2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-border-success">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-border-inverse">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-border-{muted|warning|error|info|success|inverse}">
  ...
</ul>
```

### `.romo-grid-table-border-alt`

Uses the alternate border color for the grid table borders.

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border2 romo-grid-table-alt romo-grid-table-border-alt">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-alt romo-grid-table-border-alt">
  ...
</ul>
```

### `.romo-grid-table-padN{-top|-right|-bottom|-left|}`

Adds cell padding to every cell in the table.  Use large padding sizes with caution as they can cause the grid table rows to "break" if there is not enough width for the padding.

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border romo-grid-table-pad0">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-pad0">
  ...
</ul>
```

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border romo-grid-table-pad">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-pad">
  ...
</ul>
```

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border romo-grid-table-pad1">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-pad1">
  ...
</ul>
```

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border romo-grid-table-pad2">
    <li class="romo-row">
      <span class="romo-span romo-1-12">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-pad2">
  ...
</ul>
```

## Custom Styles

Use any helper style classes in any combination on rows/cells.

<div>
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-pad">
    <tr>
      <th class="romo-pad2">#</th>
      <th>Name</th>
      <th class="romo-text2 romo-pad2-left">Slug</th>
      <th class="romo-span romo-1-12 romo-align-center romo-align-top">Count</th>
    </tr>
    <li class="romo-row">
      <span class="romo-span romo-1-12 romo-pad2">#</span>
      <span class="romo-span romo-5-12">Name</span>
      <span class="romo-span romo-5-12 romo-text2 romo-pad2-left">Slug</span>
      <span class="romo-span romo-1-12 romo-align-center romo-align-top">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">1</span>
      <span class="romo-span romo-5-12 romo-bg-info">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12 romo-span romo-1-12 romo-text2 romo-border-error romo-border4">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-1-12">2</span>
      <span class="romo-span romo-5-12">Jane Doe</span>
      <span class="romo-span romo-5-12 romo-pad0">jane-doe</span>
      <span class="romo-span romo-1-12 romo-align-center romo-text-success">18</span>
    </li>
    <li class="romo-row romo-bg-success">
      <span class="romo-span romo-1-12">3</span>
      <span class="romo-span romo-5-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

```html
<ul class="romo-grid-table romo-grid-table-header romo-grid-table-pad">
  <tr>
    <th class="romo-pad2">#</th>
    <th>Name</th>
    <th class="romo-text2 romo-pad2-left">Slug</th>
    <th class="romo-span romo-1-12 romo-align-center romo-align-top">Count</th>
  </tr>
  <li class="romo-row">
    <span class="romo-span romo-1-12 romo-pad2">#</span>
    <span class="romo-span romo-5-12">Name</span>
    <span class="romo-span romo-5-12 romo-text2 romo-pad2-left">Slug</span>
    <span class="romo-span romo-1-12 romo-align-center romo-align-top">Count</span>
  </li>
  <li class="romo-row">
    <span class="romo-span romo-1-12">1</span>
    <span class="romo-span romo-5-12 romo-bg-info">Joe Test</span>
    <span class="romo-span romo-5-12">joe-test</span>
    <span class="romo-span romo-1-12 romo-span romo-1-12 romo-text2 romo-border-error romo-border4">10</span>
  </li>
  <li class="romo-row">
    <span class="romo-span romo-1-12">2</span>
    <span class="romo-span romo-5-12">Jane Doe</span>
    <span class="romo-span romo-5-12 romo-pad0">jane-doe</span>
    <span class="romo-span romo-1-12 romo-align-center romo-text-success">18</span>
  </li>
  <li class="romo-row romo-bg-success">
    <span class="romo-span romo-1-12">3</span>
    <span class="romo-span romo-5-12">Good Corp.</span>
    <span class="romo-span romo-5-12">good-corp</span>
    <span class="romo-span romo-1-12">5</span>
  </li>
</ul>
```
