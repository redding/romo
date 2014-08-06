## Introduction

Grid systems create page layouts through a series of rows and columns:

* Use rows (`.romo-row`) to create horizontal groups of columns (`.romo-col-*`).
* Content should be placed within columns, and only columns may be immediate children of rows.
* Columns are created by specifying the number of 12 or 24 available columns you wish to span.

## Examples

The Romo grid system can utilize either **12 or 24 columns**.  Grids always fill up 100% of their available widths and use percents for their column widths.

### 12 column grid

<div class="romo-row">
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
</div>
<div class="romo-row">
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-8-12 romo-bg-alt romo-border romo-text-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-col-6-12 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-12 romo-bg-alt romo-border romo-text-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-col-12-12 romo-bg-alt romo-border romo-text-center">12</div>
</div>

```html
<div class="romo-row">
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-12 romo-bg-alt romo-border romo-text-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-12 romo-bg-alt romo-border romo-text-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
  <div class="romo-col-3-12 romo-bg-alt romo-border romo-text-center">3</div>
</div>
<div class="romo-row">
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-8-12 romo-bg-alt romo-border romo-text-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-col-6-12 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-12 romo-bg-alt romo-border romo-text-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-col-12-12 romo-bg-alt romo-border romo-text-center">12</div>
</div>
```

### 24 column grid

<div class="romo-row">
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
  <div class="romo-col-16-24 romo-bg-alt romo-border romo-text-center">16</div>
</div>
<div class="romo-row">
  <div class="romo-col-12-24 romo-bg-alt romo-border romo-text-center">12</div>
  <div class="romo-col-12-24 romo-bg-alt romo-border romo-text-center">12</div>
</div>
<div class="romo-row">
  <div class="romo-col-24-24 romo-bg-alt romo-border romo-text-center">24</div>
</div>

```html
<div class="romo-row">
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
  <div class="romo-col-1-24 romo-bg-alt romo-border romo-text-center">1</div>
</div>
<div class="romo-row">
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
  <div class="romo-col-2-24 romo-bg-alt romo-border romo-text-center">2</div>
</div>
<div class="romo-row">
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-col-4-24 romo-bg-alt romo-border romo-text-center">4</div>
</div>
<div class="romo-row">
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
  <div class="romo-col-6-24 romo-bg-alt romo-border romo-text-center">6</div>
</div>
<div class="romo-row">
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
</div>
<div class="romo-row">
  <div class="romo-col-8-24 romo-bg-alt romo-border romo-text-center">8</div>
  <div class="romo-col-16-24 romo-bg-alt romo-border romo-text-center">16</div>
</div>
<div class="romo-row">
  <div class="romo-col-12-24 romo-bg-alt romo-border romo-text-center">12</div>
  <div class="romo-col-12-24 romo-bg-alt romo-border romo-text-center">12</div>
</div>
<div class="romo-row">
  <div class="romo-col-24-24 romo-bg-alt romo-border romo-text-center">24</div>
</div>
```

## Offsetting columns

Move columns to the right using `.romo-offset-*` classes. Each class increases the left margin of a column by its number of columns. For example, `.romo-offset-4-12` moves its column over by 4 columns (in a 12 column grid).

<div class="romo-row">
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-offset-4-12 romo-col-4-12 romo-bg-alt romo-border romo-text-center">
    <span>4 offset 4</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-3-12 romo-col-3-12 romo-bg-alt romo-border romo-text-center">
    <span>3 offset 3</span>
  </div>
  <div class="romo-offset-3-12 romo-col-3-12 romo-bg-alt romo-border romo-text-center">
    <span>3 offset 3</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-6-12 romo-col-6-12 romo-bg-alt romo-border romo-text-center">
    <span>6 offset 6</span>
  </div>
</div>

```html
<div class="romo-row">
  <div class="romo-col-4-12 romo-bg-alt romo-border romo-text-center">4</div>
  <div class="romo-offset-4-12 romo-col-4-12 romo-bg-alt romo-border romo-text-center">
    <span>4 offset 4</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-3-12 romo-col-3-12 romo-bg-alt romo-border romo-text-center">
    <span>3 offset 3</span>
  </div>
  <div class="romo-offset-3-12 romo-col-3-12 romo-bg-alt romo-border romo-text-center">
    <span>3 offset 3</span>
  </div>
</div>
<div class="romo-row">
  <div class="romo-offset-6-12 romo-col-6-12 romo-bg-alt romo-border romo-text-center">
    <span>6 offset 6</span>
  </div>
</div>
```

## Nesting columns

Grids can be nested in columns of other grids.

<div class="romo-row romo-bg-alt">
  <div class="romo-col-6-12 romo-border romo-text-center">6</div>
  <div class="romo-col-6-12 romo-border romo-text-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-col-6-12 romo-border romo-text-center">6</div>
      <div class="romo-col-6-12 romo-border romo-text-center">6</div>
    </div>
  </div>
</div>

```html
<div class="romo-row romo-bg-alt">
  <div class="romo-col-6-12 romo-border romo-text-center">6</div>
  <div class="romo-col-6-12 romo-border romo-text-center">
    <div>6</div>
    <div class="romo-row">
      <div class="romo-col-6-12 romo-border romo-text-center">6</div>
      <div class="romo-col-6-12 romo-border romo-text-center">6</div>
    </div>
  </div>
</div>
```

Mix 12 and 24 column grids when nesting

<div class="romo-row romo-bg-alt">
  <div class="romo-col-2-12  romo-border romo-text-center">2</div>
  <div class="romo-col-10-12 romo-border romo-text-center">
    <div>10</div>
    <div class="romo-row romo-bg-alt">
      <div class="romo-col-5-24  romo-border romo-text-center">5</div>
      <div class="romo-col-19-24 romo-border romo-text-center">19</div>
    </div>
  </div>
</div>

```html
<div class="romo-row romo-bg-alt">
  <div class="romo-col-2-12  romo-border romo-text-center">2</div>
  <div class="romo-col-10-12 romo-border romo-text-center">
    <div>10</div>
    <div class="romo-row romo-bg-alt">
      <div class="romo-col-5-24  romo-border romo-text-center">5</div>
      <div class="romo-col-19-24 romo-border romo-text-center">19</div>
    </div>
  </div>
</div>
```
