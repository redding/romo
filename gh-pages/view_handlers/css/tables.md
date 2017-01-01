## Notes

*   Romo tables aren't designed to be nested in one another.  Doing so causes the styles of the parent table to be forced on the child table.

## Default styles

`.romo-table` For basic styling with horizontal dividers.

<div class="romo-push2-bottom">
  <table class="romo-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

## Optional classes

`.romo-table-fixed` use the "fixed" table layout algorithm.

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Good Corp. with really really long content that would normally cause the layout to adjust to fit it.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

`{th|td}.romo-N-N` add grid column size classes to set table cell widths.

<div class="romo-push2-bottom">
  <table class="romo-table">
    <thead>
      <tr>
        <th class="romo-8-12">Name</th>
        <th class="romo-2-12">Slug</th>
        <th class="romo-2-12">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-8-12">Joe Test</td>
        <td class="romo-2-12">joe-test</td>
        <td class="romo-2-12">10</td>
      </tr>
      <tr>
        <td class="romo-8-12">Jane Doe</td>
        <td class="romo-2-12">jane-doe</td>
        <td class="romo-2-12">18</td>
      </tr>
      <tr>
        <td class="romo-8-12">Good Corp.</td>
        <td class="romo-2-12">good-corp</td>
        <td class="romo-2-12">5</td>
      </tr>
    </tbody>
  </table>
</div>

`.romo-table-striped{.romo-table-striped-alt}` adds zebra-striping to any table row within the `<tbody>` via the `:nth-child` CSS selector.

<div class="romo-push-bottom">
  <table class="romo-table romo-table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-striped romo-table-striped-alt">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

`.romo-table-alt` uses the alternate bg color for the table background.

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-alt">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

`.romo-table-hover` add hover state to rows within a `<tbody>`.

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

`.romo-table-border{0-2}` adds sized borders to the table.

<div class="romo-push-bottom">
  <table class="romo-table romo-table-fixed romo-table-border">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2">Joe Test</td>
        <td rowspan="2">joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>0</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push-bottom">
  <table class="romo-table romo-table-fixed romo-table-border0">
    <tbody>
      <tr>
        <td rowspan="2">Joe Test</td>
        <td rowspan="2">joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>0</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push-bottom">
  <table class="romo-table romo-table-fixed romo-table-border1">
    <tbody>
      <tr>
        <td rowspan="2">Joe Test</td>
        <td rowspan="2">joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>0</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-border2">
    <tbody>
      <tr>
        <td rowspan="2">Joe Test</td>
        <td rowspan="2">joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>0</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

`.romo-table-border-none` remove all borders from the table.

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-border-none">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2">Joe Test</td>
        <td rowspan="2">joe-test</td>
        <td>10</td>
      </tr>
      <tr>
        <td>0</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td rowspan="2">18</td>
      </tr>
      <tr>
        <td colspan="2">Good Corp.</td>
      </tr>
    </tbody>
  </table>
</div>

`.romo-table-padN{-top|-right|-bottom|-left|}` adds cell padding to every cell in the table

<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-border romo-table-pad0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joe Test</td>
        <td>joe-test</td>
        <td>10</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-border romo-table-pad">
    <tbody>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-border romo-table-pad1">
    <tbody>
      <tr>
        <td>Jane Doe</td>
        <td>jane-doe</td>
        <td>18</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-border romo-table-pad2">
    <tbody>
      <tr>
        <td>Good Corp.</td>
        <td>good-corp</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

## Colored Rows

`tr.romo-{...}` add table row style classes to color row backgrounds based on an implicit emphasis OR an explicit name.

### Basic

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-hover romo-table-pad0">
    <thead>
      <tr>
        <th>Name</th>
        <th>class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr class="romo-base">
        <td>Base</td>
        <td><code>.romo-base</code></td>
      </tr>
      <tr class="romo-alt">
        <td>Alt</td>
        <td><code>.romo-alt</code></td>
      </tr>
      <tr class="romo-muted romo-text-muted">
        <td>Muted</td>
        <td><code>.romo-muted.romo-text-muted</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Explicit

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-hover romo-table-pad0">
    <thead>
      <tr>
        <th>Name</th>
        <th>class=""</th>
        <th>Color</th>
      </tr>
    </thead>
    <tbody>
      <tr class="romo-dark-red romo-text-inverse">
        <td>Dark Red</td>
        <td><code>.romo-dark-red</code></td>
        <td><code>$darkRed</code></td>
      </tr>
      <tr class="romo-red romo-text-inverse">
        <td>Red</td>
        <td><code>.romo-red</code></td>
        <td><code>$red</code></td>
      </tr>
      <tr class="romo-light-red romo-text-inverse">
        <td>Light Red</td>
        <td><code>.romo-light-red</code></td>
        <td><code>$lightRed</code></td>
      </tr>
      <tr class="romo-pastel-red romo-text-base">
        <td>Pastel Red</td>
        <td><code>.romo-pastel-red</code></td>
        <td><code>$pastelRed</code></td>
      </tr>
      <tr class="romo-dark-orange romo-text-inverse">
        <td>Dark Orange</td>
        <td><code>.romo-dark-orange</code></td>
        <td><code>$darkOrange</code></td>
      </tr>
      <tr class="romo-orange romo-text-inverse">
        <td>Orange</td>
        <td><code>.romo-orange</code></td>
        <td><code>$orange</code></td>
      </tr>
      <tr class="romo-yellow romo-text-base">
        <td>Yellow</td>
        <td><code>.romo-yellow</code></td>
        <td><code>$yellow</code></td>
      </tr>
      <tr class="romo-pastel-yellow romo-text-base">
        <td>Pastel Yellow</td>
        <td><code>.romo-pastel-yellow</code></td>
        <td><code>$pastelYellow</code></td>
      </tr>
      <tr class="romo-purple romo-text-inverse">
        <td>Purple</td>
        <td><code>.romo-purple</code></td>
        <td><code>$purple</code></td>
      </tr>
      <tr class="romo-light-purple romo-text-inverse">
        <td>Light Purple</td>
        <td><code>.romo-light-purple</code></td>
        <td><code>$lightPurple</code></td>
      </tr>
      <tr class="romo-dark-pink romo-text-inverse">
        <td>Dark Pink</td>
        <td><code>.romo-dark-pink</code></td>
        <td><code>$darkPink</code></td>
      </tr>
      <tr class="romo-hot-pink romo-text-inverse">
        <td>Hot Pink</td>
        <td><code>.romo-hot-pink</code></td>
        <td><code>$hotPink</code></td>
      </tr>
      <tr class="romo-pink romo-text-inverse">
        <td>Pink</td>
        <td><code>.romo-pink</code></td>
        <td><code>$pink</code></td>
      </tr>
      <tr class="romo-dark-green romo-text-inverse">
        <td>Dark Green</td>
        <td><code>.romo-dark-green</code></td>
        <td><code>$darkGreen</code></td>
      </tr>
      <tr class="romo-green romo-text-inverse">
        <td>Green</td>
        <td><code>.romo-green</code></td>
        <td><code>$green</code></td>
      </tr>
      <tr class="romo-light-green romo-text-base">
        <td>Light Green</td>
        <td><code>.romo-light-green</code></td>
        <td><code>$lightGreen</code></td>
      </tr>
      <tr class="romo-pastel-green romo-text-base">
        <td>Pastel Green</td>
        <td><code>.romo-pastel-green</code></td>
        <td><code>$pastelGreen</code></td>
      </tr>
      <tr class="romo-navy romo-text-inverse">
        <td>Navy</td>
        <td><code>.romo-navy</code></td>
        <td><code>$navy</code></td>
      </tr>
      <tr class="romo-dark-blue romo-text-inverse">
        <td>Dark Blue</td>
        <td><code>.romo-dark-blue</code></td>
        <td><code>$darkBlue</code></td>
      </tr>
      <tr class="romo-blue romo-text-inverse">
        <td>Blue</td>
        <td><code>.romo-blue</code></td>
        <td><code>$blue</code></td>
      </tr>
      <tr class="romo-light-blue romo-text-inverse">
        <td>Light Blue</td>
        <td><code>.romo-light-blue</code></td>
        <td><code>$lightBlue</code></td>
      </tr>
      <tr class="romo-pastel-blue romo-text-base">
        <td>Pastel Blue</td>
        <td><code>.romo-pastel-blue</code></td>
        <td><code>$pastelBlue</code></td>
      </tr>
    </tbody>
  </table>
</div>

### Emphasis

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-hover romo-table-pad0">
    <thead>
      <tr>
        <th>Name</th>
        <th>class=""</th>
        <th>Basis Color</th>
      </tr>
    </thead>
    <tbody>
      <tr class="romo-warning">
        <td>Warning</td>
        <td><code>.romo-warning</code></td>
        <td><code>$pastelYellow</code></td>
      </tr>
      <tr class="romo-danger">
        <td>Danger</td>
        <td><code>.romo-danger</code></td>
        <td><code>$pastelRed</code></td>
      </tr>
      <tr class="romo-info">
        <td>Info</td>
        <td><code>.romo-info</code></td>
        <td><code>$pastelBlue</code></td>
      </tr>
      <tr class="romo-success">
        <td>Success</td>
        <td><code>.romo-success</code></td>
        <td><code>$pastelGreen</code></td>
      </tr>
      <tr class="romo-inverse romo-text-inverse">
        <td>Inverse</td>
        <td><code>.romo-inverse.romo-text-inverse</code></td>
        <td><code>$inverseColor</code></td>
      </tr>
    </tbody>
  </table>
</div>

## Colored Borders

`.romo-table-border-{...}` add table style classes to color all table borders based on an implicit emphasis OR an explicit name.

### Basic

<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-base">
    <tbody><tr>
      <td>Base</td>
      <td><code>.romo-table-border-base</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-alt romo-table-border-alt">
    <tbody><tr>
      <td>Alt</td>
      <td><code>.romo-table-alt.romo-table-border-alt</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-muted">
    <tbody><tr>
      <td>Muted</td>
      <td><code>.romo-table-border-muted</code></td>
    </tr></tbody>
  </table>
</div>

### Explicit

<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-dark-red">
    <tbody><tr>
      <td>Dark Red</td>
      <td><code>.romo-table-border-dark-red</code></td>
      <td><code>$darkRed</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-red">
    <tbody><tr>
      <td>Red</td>
      <td><code>.romo-table-border-red</code></td>
      <td><code>$red</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-light-red">
    <tbody><tr>
      <td>Light Red</td>
      <td><code>.romo-table-border-light-red</code></td>
      <td><code>$lightRed</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-pastel-red">
    <tbody><tr>
      <td>Pastel Red</td>
      <td><code>.romo-table-border-pastel-red</code></td>
      <td><code>$pastelRed</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-dark-orange">
    <tbody><tr>
      <td>Dark Orange</td>
      <td><code>.romo-table-border-dark-orange</code></td>
      <td><code>$darkOrange</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-orange">
    <tbody><tr>
      <td>Orange</td>
      <td><code>.romo-table-border-orange</code></td>
      <td><code>$orange</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-yellow">
    <tbody><tr>
      <td>Yellow</td>
      <td><code>.romo-table-border-yellow</code></td>
      <td><code>$yellow</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-pastel-yellow">
    <tbody><tr>
      <td>Pastel Yellow</td>
      <td><code>.romo-table-border-pastel-yellow</code></td>
      <td><code>$pastelYellow</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-purple">
    <tbody><tr>
      <td>Purple</td>
      <td><code>.romo-table-border-purple</code></td>
      <td><code>$purple</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-light-purple">
    <tbody><tr>
      <td>Light Purple</td>
      <td><code>.romo-table-border-light-purple</code></td>
      <td><code>$lightPurple</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-dark-pink">
    <tbody><tr>
      <td>Dark Pink</td>
      <td><code>.romo-table-border-dark-pink</code></td>
      <td><code>$darkPink</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-hot-pink">
    <tbody><tr>
      <td>Hot Pink</td>
      <td><code>.romo-table-border-hot-pink</code></td>
      <td><code>$hotPink</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-pink">
    <tbody><tr>
      <td>Pink</td>
      <td><code>.romo-table-border-pink</code></td>
      <td><code>$pink</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-dark-green">
    <tbody><tr>
      <td>Dark Green</td>
      <td><code>.romo-table-border-dark-green</code></td>
      <td><code>$darkGreen</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-green">
    <tbody><tr>
      <td>Green</td>
      <td><code>.romo-table-border-green</code></td>
      <td><code>$green</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-light-green">
    <tbody><tr>
      <td>Light Green</td>
      <td><code>.romo-table-border-light-green</code></td>
      <td><code>$lightGreen</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-pastel-green">
    <tbody><tr>
      <td>Pastel Green</td>
      <td><code>.romo-table-border-pastel-green</code></td>
      <td><code>$pastelGreen</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-navy">
    <tbody><tr>
      <td>Navy</td>
      <td><code>.romo-table-border-navy</code></td>
      <td><code>$navy</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-dark-blue">
    <tbody><tr>
      <td>Dark Blue</td>
      <td><code>.romo-table-border-dark-blue</code></td>
      <td><code>$darkBlue</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-blue">
    <tbody><tr>
      <td>Blue</td>
      <td><code>.romo-table-border-blue</code></td>
      <td><code>$blue</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-light-blue">
    <tbody><tr>
      <td>Light Blue</td>
      <td><code>.romo-table-border-light-blue</code></td>
      <td><code>$lightBlue</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-pastel-blue">
    <tbody><tr>
      <td>Pastel Blue</td>
      <td><code>.romo-table-border-pastel-blue</code></td>
      <td><code>$pastelBlue</code></td>
    </tr></tbody>
  </table>
</div>

### Emphasis

<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-warning">
    <tbody><tr>
      <td>Warning</td>
      <td><code>.romo-table-border-warning</code></td>
      <td><code>$pastelYellow</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-danger">
    <tbody><tr>
      <td>Danger</td>
      <td><code>.romo-table-border-danger</code></td>
      <td><code>$pastelRed</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-info">
    <tbody><tr>
      <td>Info</td>
      <td><code>.romo-table-border-info</code></td>
      <td><code>$pastelBlue</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push0-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-success">
    <tbody><tr>
      <td>Success</td>
      <td><code>.romo-table-border-success</code></td>
      <td><code>$pastelGreen</code></td>
    </tr></tbody>
  </table>
</div>
<div class="romo-push2-bottom">
  <table class="romo-table romo-table-fixed romo-table-pad0 romo-table-border2 romo-table-border-inverse">
    <tbody><tr>
      <td>Inverse</td>
      <td><code>.romo-table-border-inverse</code></td>
      <td><code>$inverseColor</code></td>
    </tr></tbody>
  </table>
</div>

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
