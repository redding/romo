## Introduction

Grids create page layouts through a series of rows and columns:

* Use rows (`.romo-row`) to create horizontal groups of cells (`.romo-span*`).
* Content should be placed within cells, and only cells may be immediate children of rows.
* Columns are created by specifying the number of 12 or 24 available columns you wish to span.
* By default cells are vertically aligned in their row
* By default cells are centered if less that the full 12 or 24 columns are spanned

**Note**: the default grid uses [Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) for its layout.  This layout is not supported by all browsers.  If you need to support browsers that don't support Flexbox, use the `.romo-row-float` to switch to a float-based layout.

## Examples

The Romo grid system can utilize either **12 or 24 columns**.  Grids always fill up 100% of their available widths and use percents for their column widths.

### 12 column grid

<div class="romo-row">
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-8-12 romo-bg-alt romo-border romo-align-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-12-12 romo-bg-alt romo-border romo-align-center">12</div>
</div>

```html
<div class="romo-row">
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-8-12 romo-bg-alt romo-border romo-align-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-12-12 romo-bg-alt romo-border romo-align-center">12</div>
</div>
```

### 24 column grid

<div class="romo-row">
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
  <div class="romo-span romo-16-24 romo-bg-alt romo-border romo-align-center">16</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-12-24 romo-bg-alt romo-border romo-align-center">12</div>
  <div class="romo-span romo-12-24 romo-bg-alt romo-border romo-align-center">12</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-24-24 romo-bg-alt romo-border romo-align-center">24</div>
</div>

```html
<div class="romo-row">
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-24 romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-24 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-24 romo-bg-alt romo-border romo-align-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-24 romo-bg-alt romo-border romo-align-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-8-24 romo-bg-alt romo-border romo-align-center">8</div>
  <div class="romo-span romo-16-24 romo-bg-alt romo-border romo-align-center">16</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-12-24 romo-bg-alt romo-border romo-align-center">12</div>
  <div class="romo-span romo-12-24 romo-bg-alt romo-border romo-align-center">12</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-24-24 romo-bg-alt romo-border romo-align-center">24</div>
</div>
```

### {1-12} column grid

<div class="romo-row">
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-3 romo-bg-alt romo-border romo-align-center">1-3</div>
  <div class="romo-span romo-1-3 romo-bg-alt romo-border romo-align-center">1-3</div>
  <div class="romo-span romo-1-3 romo-bg-alt romo-border romo-align-center">1-3</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-2 romo-bg-alt romo-border romo-align-center">1-2</div>
  <div class="romo-span romo-1-2 romo-bg-alt romo-border romo-align-center">1-2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-1 romo-bg-alt romo-border romo-align-center">1-1</div>
</div>

```html
<div class="romo-row">
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
  <div class="romo-span romo-1-7 romo-bg-alt romo-border romo-align-center">1-7</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
  <div class="romo-span romo-1-6 romo-bg-alt romo-border romo-align-center">1-6</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
  <div class="romo-span romo-1-4 romo-bg-alt romo-border romo-align-center">1-4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-3 romo-bg-alt romo-border romo-align-center">1-3</div>
  <div class="romo-span romo-1-3 romo-bg-alt romo-border romo-align-center">1-3</div>
  <div class="romo-span romo-1-3 romo-bg-alt romo-border romo-align-center">1-3</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-2 romo-bg-alt romo-border romo-align-center">1-2</div>
  <div class="romo-span romo-1-2 romo-bg-alt romo-border romo-align-center">1-2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-1-1 romo-bg-alt romo-border romo-align-center">1-1</div>
</div>
```

## Offsetting columns

Move columns to the right using `.romo-offset-*` classes. Each class increases the left margin of a column by its number of columns. For example, `.romo-offset-4-12` moves its column over by 4 columns (in a 12 column grid).

<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-offset-4-12 romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">
    <span>4 offset 4</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-3-12 romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">
    <span>3 offset 3</span>
  </div>
  <div class="romo-offset-3-12 romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">
    <span>3 offset 3</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-6-12 romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">
    <span>6 offset 6</span>
  </div>
</div>

```html
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-offset-4-12 romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">
    <span>4 offset 4</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-3-12 romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">
    <span>3 offset 3</span>
  </div>
  <div class="romo-offset-3-12 romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">
    <span>3 offset 3</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-6-12 romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">
    <span>6 offset 6</span>
  </div>
</div>
```

## Nesting columns

Grids can be nested in columns of other grids.

<div class="romo-row romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>

```html
<div class="romo-row romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>
```

Mix 12 and 24 column grids when nesting

<div class="romo-row romo-bg-alt">
  <div class="romo-span romo-2-12  romo-border romo-align-center">2</div>
  <div class="romo-span romo-10-12 romo-border romo-align-center">
    <div>10</div>
    <div class="romo-row romo-bg-alt">
      <div class="romo-span romo-5-24  romo-border romo-align-center">5</div>
      <div class="romo-span romo-19-24 romo-border romo-align-center">19</div>
    </div>
  </div>
</div>

```html
<div class="romo-row romo-bg-alt">
  <div class="romo-span romo-2-12  romo-border romo-align-center">2</div>
  <div class="romo-span romo-10-12 romo-border romo-align-center">
    <div>10</div>
    <div class="romo-row romo-bg-alt">
      <div class="romo-span romo-5-24  romo-border romo-align-center">5</div>
      <div class="romo-span romo-19-24 romo-border romo-align-center">19</div>
    </div>
  </div>
</div>
```

## Justifying cells

If a rows cells do not span the full number of columns, you can control how the cells are justified.  By default, cells are centered.

<div class="romo-row">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row romo-row-center">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
</div>

```html
<div class="romo-row">...</div>
<div class="romo-row romo-row-center">...</div>
<div class="romo-row">...</div>
```

You can justify cells to the left or right.

<div class="romo-row romo-row-align-left">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row romo-row-pull-left">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row romo-row-align-right">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row romo-row-pull-right">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
</div>

```html
<div class="romo-row romo-row-align-left">...</div>
<div class="romo-row romo-row-pull-left">...</div>
<div class="romo-row romo-row-align-right">...</div>
<div class="romo-row romo-row-pull-right">...</div>
<div class="romo-row">...</div>
```

You can also justify with space between or around the cells.

<div class="romo-row romo-row-push-between">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row romo-row-push-around">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row romo-row-push-around">
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
  <div class="romo-span romo-3-12 romo-bg-alt romo-border romo-align-center">3</div>
</div>
<div class="romo-row romo-row-push-around">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
  <div class="romo-span romo-4-12 romo-bg-alt romo-border romo-align-center">4</div>
</div>

```html
<div class="romo-row romo-row-push-between">...</div>
<div class="romo-row romo-row-push-around">...</div>
<div class="romo-row romo-row-push-around">...</div>
<div class="romo-row romo-row-push-around">...</div>
<div class="romo-row">...</div>
```

You can also choose not to justify and just have some cells fill the remaining width.

<div class="romo-row">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-1-12 romo-span-fill romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-1-12 romo-span-fill romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-span-fill romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-bg-alt romo-border romo-align-center">Fixed content</div>
  <div class="romo-span romo-span-fill romo-bg-alt romo-border romo-align-center">Fill content</div>
</div>

```html
<div class="romo-row">
  <div class="romo-span romo-2-12">2</div>
  <div class="romo-span romo-1-12 romo-span-fill">1</div>
</div>
<div class="romo-row">
  <div class="romo-span romo-2-12">2</div>
  <div class="romo-span romo-2-12">2</div>
  <div class="romo-span romo-1-12 romo-span-fill">1</div>
  <div class="romo-span romo-1-12 romo-span-fill">1</div>
</div>
<div class="romo-row">
  <div class="romo-span">Fixed content</div>
  <div class="romo-span romo-span-fill">Fill content</div>
</div>
```

## Aligning cells

By default cells with different heights vertically align top.

<div class="romo-row romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>
<div class="romo-row romo-row-align-top romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>

```html
<div class="romo-row">...</div>
<div class="romo-row romo-row-align-top">...</div>
```

You can align cells middle or bottom.

<div class="romo-row romo-row-align-middle romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>
<div class="romo-row romo-row-align-bottom romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>

```html
<div class="romo-row romo-row-align-middle">...</div>
<div class="romo-row romo-row-align-bottom">...</div>
```

You can also have cells stretch to the full height of the row.

<div class="romo-row romo-row-align-stretch romo-bg-alt">
  <div class="romo-span romo-6-12 romo-border romo-align-center"><div>6</div></div>
  <div class="romo-span romo-6-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>

```html
<div class="romo-row romo-row-align-stretch">...</div>
```

And these alignments can be specified on the individual cells rather than the row in general.

<div class="romo-row romo-bg-alt">
  <div class="romo-span romo-2-12 romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-span-align-top romo-border romo-align-center">3</div>
  <div class="romo-span romo-2-12 romo-span-align-middle romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-span-align-bottom romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-span-align-stretch romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-border romo-align-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
      <div class="romo-span romo-6-12 romo-border romo-align-center">6</div>
    </div>
  </div>
</div>

```html
<div class="romo-row">
  <div class="romo-span">...</div>
  <div class="romo-span romo-span-align-top">...</div>
  <div class="romo-span romo-span-align-middle">...</div>
  <div class="romo-span romo-span-align-bottom">...</div>
  <div class="romo-span romo-span-align-stretch">...</div>
  <div class="romo-span">...</div>
</div>
```

## Float-based layout

As mentioned in the introduction, not all browsers support Flexbox layouts.  In this case, use `.romo-row-float` on grid rows.  **Note**: you won't be able justify, align, or fill cells like you can with the default grid, but you get the same cell width behavior.

<div class="romo-row-float">
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row-float">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row-float">
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
</div>
<div class="romo-row-float">
  <div class="romo-span romo-12-12 romo-bg-alt romo-border romo-align-center">12</div>
</div>

```html
<div class="romo-row-float">
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
  <div class="romo-span romo-1-12 romo-bg-alt romo-border romo-align-center">1</div>
</div>
<div class="romo-row-float">
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
  <div class="romo-span romo-2-12 romo-bg-alt romo-border romo-align-center">2</div>
</div>
<div class="romo-row-float">
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
  <div class="romo-span romo-6-12 romo-bg-alt romo-border romo-align-center">6</div>
</div>
<div class="romo-row-float">
  <div class="romo-span romo-12-12 romo-bg-alt romo-border romo-align-center">12</div>
</div>
```
