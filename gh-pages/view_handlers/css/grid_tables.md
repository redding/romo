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
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

## Optional classes

`.romo-grid-table-header` assumes the first row is a header row and styles it.

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

`.romo-grid-table-striped{.romo-grid-table-striped-alt}` adds zebra-striping to grid table rows via the `:nth-child` CSS selector.

<div class="romo-push-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-striped">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-striped romo-grid-table-striped-alt">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

`.romo-grid-table-alt` uses the alternate bg color for the table background.

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-alt">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

`.romo-grid-table-hover` add hover state to rows.

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

`.romo-grid-table-border{0-2}` adds sized borders to the grid table.

**Note**: This makes all cells hide any overflow.  Since grid tables don't keep all cell heights the same (like normal tables do), uneven grid heights break the borders.  If you need cells to overflow with borders, use a standard romo table.

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-border0">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-border1">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-border2">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

`.romo-grid-table-border-none` remove all borders from the grid table.

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border-none">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">overflow: 1234567890</span>
    </li>
  </ul>
</div>

`.romo-grid-table-padN{-top|-right|-bottom|-left|}` add cell padding to every cell in the grid table.

**Note**: Use large padding sizes with caution as they can cause the grid table rows to "break" if there is not enough width for the padding.

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-border romo-grid-table-pad0">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Name</span>
      <span class="romo-span romo-5-12">Slug</span>
      <span class="romo-span romo-1-12">Count</span>
    </li>
    <li class="romo-row">
      <span class="romo-span romo-6-12">Joe Test</span>
      <span class="romo-span romo-5-12">joe-test</span>
      <span class="romo-span romo-1-12">10</span>
    </li>
  </ul>
</div>

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-border romo-grid-table-pad">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
  </ul>
</div>

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-border romo-grid-table-pad1">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Jane Doe</span>
      <span class="romo-span romo-5-12">jane-doe</span>
      <span class="romo-span romo-1-12">18</span>
    </li>
  </ul>
</div>

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-border romo-grid-table-pad2">
    <li class="romo-row">
      <span class="romo-span romo-6-12">Good Corp.</span>
      <span class="romo-span romo-5-12">good-corp</span>
      <span class="romo-span romo-1-12">5</span>
    </li>
  </ul>
</div>

## Colored Rows

`.romo-row.romo-{...}` add grid table row style classes to color row backgrounds based on an implicit emphasis OR an explicit name.

### Basic

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-pad0 romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-1-2">Name</span>
      <span class="romo-span romo-1-2">class=""</span>
    </li>
    <li class="romo-row romo-base">
      <span class="romo-span romo-1-2">Base</span>
      <span class="romo-span romo-1-2"><code>.romo-base</code></span>
    </li>
    <li class="romo-row romo-alt">
      <span class="romo-span romo-1-2">Alt</span>
      <span class="romo-span romo-1-2"><code>.romo-alt</code></span>
    </li>
    <li class="romo-row romo-muted romo-text-muted">
      <span class="romo-span romo-1-2">Muted</span>
      <span class="romo-span romo-1-2"><code>.romo-muted.romo-text-muted</code></span>
    </li>
  </ul>
</div>

### Explicit

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-pad0 romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Name</span>
      <span class="romo-span romo-1-3">class=""</span>
      <span class="romo-span romo-1-3">Basis Color</span>
    </li>
    <li class="romo-row romo-dark-red romo-text-inverse">
      <span class="romo-span romo-1-3">Dark Red</span>
      <span class="romo-span romo-1-3"><code>.romo-dark-red</code></span>
      <span class="romo-span romo-1-3"><code>$darkRed</code></span>
    </li>
    <li class="romo-row romo-red romo-text-inverse">
      <span class="romo-span romo-1-3">Red</span>
      <span class="romo-span romo-1-3"><code>.romo-red</code></span>
      <span class="romo-span romo-1-3"><code>$red</code></span>
    </li>
    <li class="romo-row romo-light-red romo-text-inverse">
      <span class="romo-span romo-1-3">Light Red</span>
      <span class="romo-span romo-1-3"><code>.romo-light-red</code></span>
      <span class="romo-span romo-1-3"><code>$lightRed</code></span>
    </li>
    <li class="romo-row romo-pastel-red romo-text-base">
      <span class="romo-span romo-1-3">Pastel Red</span>
      <span class="romo-span romo-1-3"><code>.romo-pastel-red</code></span>
      <span class="romo-span romo-1-3"><code>$pastelRed</code></span>
    </li>
    <li class="romo-row romo-dark-orange romo-text-inverse">
      <span class="romo-span romo-1-3">Dark Orange</span>
      <span class="romo-span romo-1-3"><code>.romo-dark-orange</code></span>
      <span class="romo-span romo-1-3"><code>$darkOrange</code></span>
    </li>
    <li class="romo-row romo-orange romo-text-inverse">
      <span class="romo-span romo-1-3">Orange</span>
      <span class="romo-span romo-1-3"><code>.romo-orange</code></span>
      <span class="romo-span romo-1-3"><code>$orange</code></span>
    </li>
    <li class="romo-row romo-yellow romo-text-base">
      <span class="romo-span romo-1-3">Yellow</span>
      <span class="romo-span romo-1-3"><code>.romo-yellow</code></span>
      <span class="romo-span romo-1-3"><code>$yellow</code></span>
    </li>
    <li class="romo-row romo-pastel-yellow romo-text-base">
      <span class="romo-span romo-1-3">Pastel Yellow</span>
      <span class="romo-span romo-1-3"><code>.romo-pastel-yellow</code></span>
      <span class="romo-span romo-1-3"><code>$pastelYellow</code></span>
    </li>
    <li class="romo-row romo-purple romo-text-inverse">
      <span class="romo-span romo-1-3">Purple</span>
      <span class="romo-span romo-1-3"><code>.romo-purple</code></span>
      <span class="romo-span romo-1-3"><code>$purple</code></span>
    </li>
    <li class="romo-row romo-light-purple romo-text-inverse">
      <span class="romo-span romo-1-3">Light Purple</span>
      <span class="romo-span romo-1-3"><code>.romo-light-purple</code></span>
      <span class="romo-span romo-1-3"><code>$lightPurple</code></span>
    </li>
    <li class="romo-row romo-dark-pink romo-text-inverse">
      <span class="romo-span romo-1-3">Dark Pink</span>
      <span class="romo-span romo-1-3"><code>.romo-dark-pink</code></span>
      <span class="romo-span romo-1-3"><code>$darkPink</code></span>
    </li>
    <li class="romo-row romo-hot-pink romo-text-inverse">
      <span class="romo-span romo-1-3">Hot Pink</span>
      <span class="romo-span romo-1-3"><code>.romo-hot-blue</code></span>
      <span class="romo-span romo-1-3"><code>$hotPink</code></span>
    </li>
    <li class="romo-row romo-pink romo-text-inverse">
      <span class="romo-span romo-1-3">Pink</span>
      <span class="romo-span romo-1-3"><code>.romo-pink</code></span>
      <span class="romo-span romo-1-3"><code>$pink</code></span>
    </li>
    <li class="romo-row romo-dark-green romo-text-inverse">
      <span class="romo-span romo-1-3">Dark Green</span>
      <span class="romo-span romo-1-3"><code>.romo-dark-green</code></span>
      <span class="romo-span romo-1-3"><code>$darkGreen</code></span>
    </li>
    <li class="romo-row romo-green romo-text-inverse">
      <span class="romo-span romo-1-3">Green</span>
      <span class="romo-span romo-1-3"><code>.romo-green</code></span>
      <span class="romo-span romo-1-3"><code>$green</code></span>
    </li>
    <li class="romo-row romo-light-green romo-text-base">
      <span class="romo-span romo-1-3">Light Green</span>
      <span class="romo-span romo-1-3"><code>.romo-light-green</code></span>
      <span class="romo-span romo-1-3"><code>$lightGreen</code></span>
    </li>
    <li class="romo-row romo-pastel-green romo-text-base">
      <span class="romo-span romo-1-3">Pastel Green</span>
      <span class="romo-span romo-1-3"><code>.romo-pastel-green</code></span>
      <span class="romo-span romo-1-3"><code>$pastelGreen</code></span>
    </li>
    <li class="romo-row romo-navy romo-text-inverse">
      <span class="romo-span romo-1-3">Navy</span>
      <span class="romo-span romo-1-3"><code>.romo-navy</code></span>
      <span class="romo-span romo-1-3"><code>$navy</code></span>
    </li>
    <li class="romo-row romo-dark-blue romo-text-inverse">
      <span class="romo-span romo-1-3">Dark Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-dark-blue</code></span>
      <span class="romo-span romo-1-3"><code>$darkBlue</code></span>
    </li>
    <li class="romo-row romo-blue romo-text-inverse">
      <span class="romo-span romo-1-3">Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-blue</code></span>
      <span class="romo-span romo-1-3"><code>$blue</code></span>
    </li>
    <li class="romo-row romo-light-blue romo-text-inverse">
      <span class="romo-span romo-1-3">Light Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-light-blue</code></span>
      <span class="romo-span romo-1-3"><code>$lightBlue</code></span>
    </li>
    <li class="romo-row romo-pastel-blue romo-text-base">
      <span class="romo-span romo-1-3">Pastel Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-pastel-blue</code></span>
      <span class="romo-span romo-1-3"><code>$pastelBlue</code></span>
    </li>
  </ul>
</div>

### Emphasis

<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-header romo-grid-table-pad0 romo-grid-table-hover">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Name</span>
      <span class="romo-span romo-1-3">class=""</span>
      <span class="romo-span romo-1-3">Basis Color</span>
    </li>
    <li class="romo-row romo-warning">
      <span class="romo-span romo-1-3">Warning</span>
      <span class="romo-span romo-1-3"><code>.romo-warning</code></span>
      <span class="romo-span romo-1-3"><code>$pastelYellow</code></span>
    </li>
    <li class="romo-row romo-danger">
      <span class="romo-span romo-1-3">Danger</span>
      <span class="romo-span romo-1-3"><code>.romo-danger</code></span>
      <span class="romo-span romo-1-3"><code>$pastelRed</code></span>
    </li>
    <li class="romo-row romo-info">
      <span class="romo-span romo-1-3">Info</span>
      <span class="romo-span romo-1-3"><code>.romo-info</code></span>
      <span class="romo-span romo-1-3"><code>$pastelBlue</code></span>
    </li>
    <li class="romo-row romo-success">
      <span class="romo-span romo-1-3">Success</span>
      <span class="romo-span romo-1-3"><code>.romo-success</code></span>
      <span class="romo-span romo-1-3"><code>$pastelGreen</code></span>
    </li>
    <li class="romo-row romo-inverse romo-text-inverse">
      <span class="romo-span romo-1-3">Inverse</span>
      <span class="romo-span romo-1-3"><code>.romo-inverse.romo-text-inverse</code></span>
      <span class="romo-span romo-1-3"><code>$inverseColor</code></span>
    </li>
  </ul>
</div>

## Colored Borders

`.romo-grid-table-border-{...}` add grid table style classes to color all table borders based on an implicit emphasis OR an explicit name.

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-base">
    <li class="romo-row">
      <span class="romo-span romo-1-2">Base</span>
      <span class="romo-span romo-1-2"><code>.romo-grid-table-border-base</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-alt romo-grid-table-border-alt">
    <li class="romo-row">
      <span class="romo-span romo-1-2">Alt</span>
      <span class="romo-span romo-1-2"><code>.romo-grid-table-alt.romo-grid-table-border-alt</code></span>
    </li>
  </ul>
</div>
<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-muted">
    <li class="romo-row">
      <span class="romo-span romo-1-2">Muted</span>
      <span class="romo-span romo-1-2"><code>.romo-grid-table-border-muted</code></span>
    </li>
  </ul>
</div>

### Explicit

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-dark-red">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Dark Red</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-dark-red</code></span>
      <span class="romo-span romo-1-3"><code>$darkRed</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-red">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Red</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-red</code></span>
      <span class="romo-span romo-1-3"><code>$red</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-light-red">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Light Red</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-light-red</code></span>
      <span class="romo-span romo-1-3"><code>$lightRed</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-pastel-red">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Pastel Red</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-pastel-red</code></span>
      <span class="romo-span romo-1-3"><code>$pastelRed</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-dark-orange">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Dark Orange</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-dark-orange</code></span>
      <span class="romo-span romo-1-3"><code>$darkOrange</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-orange">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Orange</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-orange</code></span>
      <span class="romo-span romo-1-3"><code>$orange</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-yellow">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Yellow</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-yellow</code></span>
      <span class="romo-span romo-1-3"><code>$yellow</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-pastel-yellow">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Pastel Yellow</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-pastel-yellow</code></span>
      <span class="romo-span romo-1-3"><code>$pastelYellow</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-purple">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Purple</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-purple</code></span>
      <span class="romo-span romo-1-3"><code>$purple</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-light-purple">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Light Purple</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-light-purple</code></span>
      <span class="romo-span romo-1-3"><code>$lightPurple</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-dark-pink">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Dark Pink</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-dark-pink</code></span>
      <span class="romo-span romo-1-3"><code>$darkPink</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-hot-pink">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Hot Pink</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-hot-pink</code></span>
      <span class="romo-span romo-1-3"><code>$hotPink</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-pink">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Pink</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-pink</code></span>
      <span class="romo-span romo-1-3"><code>$pink</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-dark-green">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Dark Green</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-dark-green</code></span>
      <span class="romo-span romo-1-3"><code>$darkGreen</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-green">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Green</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-green</code></span>
      <span class="romo-span romo-1-3"><code>$green</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-light-green">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Light Green</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-light-green</code></span>
      <span class="romo-span romo-1-3"><code>$lightGreen</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-pastel-green">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Pastel Green</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-pastel-green</code></span>
      <span class="romo-span romo-1-3"><code>$pastelGreen</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-navy">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Navy</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-navy</code></span>
      <span class="romo-span romo-1-3"><code>$navy</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-dark-blue">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Dark Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-dark-blue</code></span>
      <span class="romo-span romo-1-3"><code>$darkBlue</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-blue">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-blue</code></span>
      <span class="romo-span romo-1-3"><code>$blue</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-light-blue">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Light Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-light-blue</code></span>
      <span class="romo-span romo-1-3"><code>$lightBlue</code></span>
    </li>
  </ul>
</div>
<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-pastel-blue">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Pastel Blue</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-pastel-blue</code></span>
      <span class="romo-span romo-1-3"><code>$pastelBlue</code></span>
    </li>
  </ul>
</div>

### Emphasis

<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-warning">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Warning</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-warning</code></span>
      <span class="romo-span romo-1-3"><code>$pastelYellow</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-danger">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Danger</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-danger</code></span>
      <span class="romo-span romo-1-3"><code>$pastelRed</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-info">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Info</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-info</code></span>
      <span class="romo-span romo-1-3"><code>$pastelBlue</code></span>
    </li>
  </ul>
</div>
<div class="romo-push0-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-success">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Success</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-success</code></span>
      <span class="romo-span romo-1-3"><code>$pastelGreen</code></span>
    </li>
  </ul>
</div>
<div class="romo-push2-bottom">
  <ul class="romo-grid-table romo-grid-table-pad0 romo-grid-table-border2 romo-grid-table-border-inverse">
    <li class="romo-row">
      <span class="romo-span romo-1-3">Inverse</span>
      <span class="romo-span romo-1-3"><code>.romo-grid-table-border-inverse</code></span>
      <span class="romo-span romo-1-3"><code>$inverseColor</code></span>
    </li>
  </ul>
</div>
