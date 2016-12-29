## Body Copy

Bootstrap's global default `font-size` is **14px**, with a `line-height` of **20px**. This is applied to the `<body>` and all paragraphs. In addition, `<p>` (paragraphs) receive a bottom margin of half their line-height (**10px** by default).

```html
<p>...</p>
```

## Emphasis

Use HTML's default emphasis tags with lightweight styles.

### Small

For de-emphasizing inline or blocks of text, <small>use the small tag</small>.

```html
<small>rendered as fine print</small>
```

### Bold

For emphasizing a snippet of text with a <strong>heavier font-weight</strong>.

```html
<strong>rendered as bold</strong>
```

### Italics

For emphasizing a snippet of text <em>with italics</em>.

```html
<em>rendered as italicized</em>
```

## Headings

All HTML headings, `<h1>` through `<h3>` are available.

<div>
  <h1>h1. Heading 1</h1>
  <h2>h2. Heading 2</h2>
  <h3>h3. Heading 3</h3>
</div>

```html
<h1>...</h1>
<h2>...</h2>
<h3>...</h3>
```

## Size classes

Use style classes to size up/down text corresponding with heading sizes.

<div class="romo-text0">.romo-text0</div>
<div class="romo-text1">.romo-text1</div>
<div class="romo-text2">.romo-text2</div>
<div class="romo-text3">.romo-text3</div>

```html
<div class="romo-text0">...</div>
<div class="romo-text1">...</div>
<div class="romo-text2">...</div>
<div class="romo-text3">...</div>
```

Or, use these natural-size style classes for the more common sizing needs.

<div class="romo-text-small">.romo-text-small Size (alias for .romo-text0)</div>
<div>normal text Size</div>
<div class="romo-text-large">.romo-text-large Size (alias for .romo-text2)</div>

```html
<div class="romo-text-small">...</div>
<div>...</div>
<div class="romo-text-large">...</div>
```

Or only set a specific size on hover.

<div class="romo-text0 romo-text1-hover">.romo-text0.romo-text1-hover</div>
<div class="romo-text1 romo-text2-hover">.romo-text1.romo-text2-hover</div>
<div class="romo-text2 romo-text3-hover">.romo-text2.romo-text3-hover</div>
<div class="romo-text3 romo-text1-hover">.romo-text3.romo-text1-hover</div>
<div class="romo-text-small romo-text-large-hover">.romo-text-small.romo-text-large-hover</div>
<div class="romo-text-large romo-text-small-hover">.romo-text-large.romo-text-small-hover</div>

```html
<div class="romo-text0 romo-text1-hover">...</div>
<div class="romo-text1 romo-text2-hover">...</div>
<div class="romo-text2 romo-text3-hover">...</div>
<div class="romo-text3 romo-text1-hover">...</div>
<div class="romo-text-small romo-text-large-hover">...</div>
<div class="romo-text-large romo-text-small-hover">...</div>
```

## Text decoration classes

Use style classes to set text decoration.

<p class="romo-text-underline">.romo-text-underline</p>
<p class="romo-text-overline">.romo-text-overline</p>
<p class="romo-text-line-through">.romo-text-line-through</p>
<p class="romo-text-strikethrough">.romo-text-strikethrough</p>
<p class="romo-text-no-line">.romo-text-no-line</p>

```html
<p class="romo-text-underline">...</p>
<p class="romo-text-overline">...</p>
<p class="romo-text-line-through">...</p>
<p class="romo-text-strikethrough">...</p>
<p class="romo-text-no-line">...</p>
```

Or only set text decoration on hover.

<p class="romo-text-underline-hover">.romo-text-underline-hover</p>
<p class="romo-text-overline-hover">.romo-text-overline-hover</p>
<p class="romo-text-line-through-hover">.romo-text-line-through-hover</p>
<p class="romo-text-strikethrough-hover">.romo-text-strikethrough-hover</p>
<p class="romo-text-no-line-hover">.romo-text-no-line-hover</p>

```html
<p class="romo-text-underline-hover">...</p>
<p class="romo-text-overline-hover">...</p>
<p class="romo-text-line-through-hover">...</p>
<p class="romo-text-strikethrough-hover">...</p>
<p class="romo-text-no-line-hover">...</p>
```

## Alignment classes

Use style classes to align text.

<p class="romo-align-left">.romo-align-left</p>
<p class="romo-align-center">.romo-align-center</p>
<p class="romo-align-right">.romo-align-right</p>

```html
<p class="romo-align-left">...</p>
<p class="romo-align-center">...</p>
<p class="romo-align-right">...</p>
```

Or vertical align text.

<div>
  <span class="romo-align-top romo-text-large">Aligned:</span>
  <span class="romo-align-top romo-text-small">.romo-align-top</span>
</div>
<div>
  <span class="romo-align-middle romo-text-large">Aligned:</span>
  <span class="romo-align-middle romo-text-small">.romo-align-middle</span>
</div>
<div>
  <span class="romo-align-bottom romo-text-large">Aligned:</span>
  <span class="romo-align-bottom romo-text-small">.romo-align-bottom</span>
</div>

```html
<div>
  <span class="romo-align-top romo-text-large">...</span>
  <span class="romo-align-top romo-text-small">...</span>
</div>
<div>
  <span class="romo-align-middle romo-text-large">...</span>
  <span class="romo-align-middle romo-text-small">...</span>
</div>
<div>
  <span class="romo-align-bottom romo-text-large">...</span>
  <span class="romo-align-bottom romo-text-small">...</span>
</div>
```

## Weight classes

Use style classes to set font weight.

<div class="romo-text-normal">.romo-text-normal</div>
<div class="romo-text-lighter">.romo-text-lighter</div>
<div class="romo-text-bold">.romo-text-bold</div>
<div class="romo-text-bolder">.romo-text-bolder</div>
<div class="romo-text-100">.romo-text-100</div>
<div class="romo-text-200">.romo-text-200</div>
<div class="romo-text-300">.romo-text-300</div>
<div class="romo-text-400">.romo-text-400</div>
<div class="romo-text-500">.romo-text-500</div>
<div class="romo-text-600">.romo-text-600</div>
<div class="romo-text-700">.romo-text-700</div>
<div class="romo-text-800">.romo-text-800</div>
<div class="romo-text-900">.romo-text-900</div>

```html
<div class="romo-text-normal">...</div>
<div class="romo-text-lighter">...</div>
<div class="romo-text-bold">...</div>
<div class="romo-text-bolder">...</div>
<div class="romo-text-100">...</div>
<div class="romo-text-200">...</div>
<div class="romo-text-300">...</div>
<div class="romo-text-400">...</div>
<div class="romo-text-500">...</div>
<div class="romo-text-600">...</div>
<div class="romo-text-700">...</div>
<div class="romo-text-800">...</div>
<div class="romo-text-900">...</div>
```

Or only set a font weight on hover.

<div class="romo-text-normal-hover">.romo-text-normal-hover</div>
<div class="romo-text-lighter-hover">.romo-text-lighter-hover</div>
<div class="romo-text-bold-hover">.romo-text-bold-hover</div>
<div class="romo-text-bolder-hover">.romo-text-bolder-hover</div>
<div class="romo-text-100-hover">.romo-text-100-hover</div>
<div class="romo-text-200-hover">.romo-text-200-hover</div>
<div class="romo-text-300-hover">.romo-text-300-hover</div>
<div class="romo-text-400-hover">.romo-text-400-hover</div>
<div class="romo-text-500-hover">.romo-text-500-hover</div>
<div class="romo-text-600-hover">.romo-text-600-hover</div>
<div class="romo-text-700-hover">.romo-text-700-hover</div>
<div class="romo-text-800-hover">.romo-text-800-hover</div>
<div class="romo-text-900-hover">.romo-text-900-hover</div>

```html
<div class="romo-text-normal-hover">...</div>
<div class="romo-text-lighter-hover">...</div>
<div class="romo-text-bold-hover">...</div>
<div class="romo-text-bolder-hover">...</div>
<div class="romo-text-100-hover">...</div>
<div class="romo-text-200-hover">...</div>
<div class="romo-text-300-hover">...</div>
<div class="romo-text-400-hover">...</div>
<div class="romo-text-500-hover">...</div>
<div class="romo-text-600-hover">...</div>
<div class="romo-text-700-hover">...</div>
<div class="romo-text-800-hover">...</div>
<div class="romo-text-900-hover">...</div>
```

## Colors

Use style classes to add color (with optional hover color) to text and backgrounds based on an implicit emphasis OR an explicit name.  These also work for links and hover-only use cases.

### Basic

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th class="romo-align-center">Bg</th>
        <th class="romo-align-center">Text</th>
        <th class="romo-align-center">Anchor</th>
        <th class="romo-align-center">class=""</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-base romo-bg-base-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-base romo-text-base-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-base">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-base.romo-bg-base-hover</code></div>
          <div><code> .romo-text-base.romo-text-base-hover</code></div>
          <div><code>a.romo-text-base</code></div>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-alt romo-bg-alt-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-alt romo-text-alt-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-alt">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-alt.romo-bg-alt-hover</code></div>
          <div><code> .romo-text-alt.romo-text-alt-hover</code></div>
          <div><code>a.romo-text-alt</code></div>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-muted romo-bg-muted-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-muted romo-text-muted-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-muted">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-muted.romo-bg-muted-hover</code></div>
          <div><code> .romo-text-muted.romo-text-muted-hover</code></div>
          <div><code>a.romo-text-muted</code></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### Explicit

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th class="romo-align-center" style="width: 100px">Bg</th>
        <th class="romo-align-center">Text</th>
        <th class="romo-align-center">Anchor</th>
        <th class="romo-align-center">class=""</th>
        <th class="romo-align-center">Value - Var Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-dark-red romo-bg-dark-red-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-dark-red romo-text-dark-red-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-dark-red">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-dark-red.romo-bg-dark-red-hover</code></div>
          <div><code> .romo-text-dark-red.romo-text-dark-red-hover</code></div>
          <div><code>a.romo-text-dark-red</code></div>
        </td>
        <td class="romo-text-small">
          <code>#e7040f - $darkRed</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-red romo-bg-red-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-red romo-text-red-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-red">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-red.romo-bg-red-hover</code></div>
          <div><code> .romo-text-red.romo-text-red-hover</code></div>
          <div><code>a.romo-text-red</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ee4136 - $red</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-light-red romo-bg-light-red-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-light-red romo-text-light-red-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-light-red">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-light-red.romo-bg-light-red-hover</code></div>
          <div><code> .romo-text-light-red.romo-text-light-red-hover</code></div>
          <div><code>a.romo-text-light-red</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ff725c - $lightRed</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-pastel-red romo-bg-pastel-red-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-pastel-red romo-text-pastel-red-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-pastel-red">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-pastel-red.romo-bg-pastel-red-hover</code></div>
          <div><code> .romo-text-pastel-red.romo-text-pastel-red-hover</code></div>
          <div><code>a.romo-text-pastel-red</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ffdfdf - $pastelRed</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-dark-orange romo-bg-dark-orange-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-dark-orange romo-text-dark-orange-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-dark-orange">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-dark-orange.romo-bg-dark-orange-hover</code></div>
          <div><code> .romo-text-dark-orange.romo-text-dark-orange-hover</code></div>
          <div><code>a.romo-text-dark-orange</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ff6300 - $darkOrange</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-orange romo-bg-orange-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-orange romo-text-orange-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-orange">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-orange.romo-bg-orange-hover</code></div>
          <div><code> .romo-text-orange.romo-text-orange-hover</code></div>
          <div><code>a.romo-text-orange</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ffa700 - $orange</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-yellow romo-bg-yellow-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-yellow romo-text-yellow-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-yellow">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-yellow.romo-bg-yellow-hover</code></div>
          <div><code> .romo-text-yellow.romo-text-yellow-hover</code></div>
          <div><code>a.romo-text-yellow</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ffde37 - $yellow</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-pastel-yellow romo-bg-pastel-yellow-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-pastel-yellow romo-text-pastel-yellow-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-pastel-yellow">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-pastel-yellow.romo-bg-pastel-yellow-hover</code></div>
          <div><code> .romo-text-pastel-yellow.romo-text-pastel-yellow-hover</code></div>
          <div><code>a.romo-text-pastel-yellow</code></div>
        </td>
        <td class="romo-text-small">
          <code>#fcf8e3 - $pastelYellow</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-purple romo-bg-purple-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-purple romo-text-purple-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-purple">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-purple.romo-bg-purple-hover</code></div>
          <div><code> .romo-text-purple.romo-text-purple-hover</code></div>
          <div><code>a.romo-text-purple</code></div>
        </td>
        <td class="romo-text-small">
          <code>#5e2ca5 - $purple</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-light-purple romo-bg-light-purple-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-light-purple romo-text-light-purple-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-light-purple">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-light-purple.romo-bg-light-purple-hover</code></div>
          <div><code> .romo-text-light-purple.romo-text-light-purple-hover</code></div>
          <div><code>a.romo-text-light-purple</code></div>
        </td>
        <td class="romo-text-small">
          <code>#a463f2 - $lightPurple</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-dark-pink romo-bg-dark-pink-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-dark-pink romo-text-dark-pink-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-dark-pink">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-dark-pink.romo-bg-dark-pink-hover</code></div>
          <div><code> .romo-text-dark-pink.romo-text-dark-pink-hover</code></div>
          <div><code>a.romo-text-dark-pink</code></div>
        </td>
        <td class="romo-text-small">
          <code>#d5008f - $darkPink</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-hot-pink romo-bg-hot-pink-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-hot-pink romo-text-hot-pink-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-hot-pink">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-hot-pink.romo-bg-hot-pink-hover</code></div>
          <div><code> .romo-text-hot-pink.romo-text-hot-pink-hover</code></div>
          <div><code>a.romo-text-hot-pink</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ff41b4 - $hotPink</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-pink romo-bg-pink-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-pink romo-text-pink-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-pink">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-pink.romo-bg-pink-hover</code></div>
          <div><code> .romo-text-pink.romo-text-pink-hover</code></div>
          <div><code>a.romo-text-pink</code></div>
        </td>
        <td class="romo-text-small">
          <code>#ff8fd2 - $pink</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-dark-green romo-bg-dark-green-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-dark-green romo-text-dark-green-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-dark-green">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-dark-green.romo-bg-dark-green-hover</code></div>
          <div><code> .romo-text-dark-green.romo-text-dark-green-hover</code></div>
          <div><code>a.romo-text-dark-green</code></div>
        </td>
        <td class="romo-text-small">
          <code>#137752 - $darkGreen</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-green romo-bg-green-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-green romo-text-green-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-green">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-green.romo-bg-green-hover</code></div>
          <div><code> .romo-text-green.romo-text-green-hover</code></div>
          <div><code>a.romo-text-green</code></div>
        </td>
        <td class="romo-text-small">
          <code>#51a351 - $green</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-light-green romo-bg-light-green-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-light-green romo-text-light-green-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-light-green">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-light-green.romo-bg-light-green-hover</code></div>
          <div><code> .romo-text-light-green.romo-text-light-green-hover</code></div>
          <div><code>a.romo-text-light-green</code></div>
        </td>
        <td class="romo-text-small">
          <code>#9eebcf - $lightGreen</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-pastel-green romo-bg-pastel-green-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-pastel-green romo-text-pastel-green-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-pastel-green">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-pastel-green.romo-bg-pastel-green-hover</code></div>
          <div><code> .romo-text-pastel-green.romo-text-pastel-green-hover</code></div>
          <div><code>a.romo-text-pastel-green</code></div>
        </td>
        <td class="romo-text-small">
          <code>#dff0d8 - $pastelGreen</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-navy romo-bg-navy-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-navy romo-text-navy-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-navy">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-navy.romo-bg-navy-hover</code></div>
          <div><code> .romo-text-navy.romo-text-navy-hover</code></div>
          <div><code>a.romo-text-navy</code></div>
        </td>
        <td class="romo-text-small">
          <code>#001b44 - $navy</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-dark-blue romo-bg-dark-blue-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-dark-blue romo-text-dark-blue-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-dark-blue">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-dark-blue.romo-bg-dark-blue-hover</code></div>
          <div><code> .romo-text-dark-blue.romo-text-dark-blue-hover</code></div>
          <div><code>a.romo-text-dark-blue</code></div>
        </td>
        <td class="romo-text-small">
          <code>#00449e - $darkBlue</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-blue romo-bg-blue-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-blue romo-text-blue-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-blue">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-blue.romo-bg-blue-hover</code></div>
          <div><code> .romo-text-blue.romo-text-blue-hover</code></div>
          <div><code>a.romo-text-blue</code></div>
        </td>
        <td class="romo-text-small">
          <code>#357edd - $blue</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-light-blue romo-bg-light-blue-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-light-blue romo-text-light-blue-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-light-blue">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-light-blue.romo-bg-light-blue-hover</code></div>
          <div><code> .romo-text-light-blue.romo-text-light-blue-hover</code></div>
          <div><code>a.romo-text-light-blue</code></div>
        </td>
        <td class="romo-text-small">
          <code>#96ccff - $lightBlue</code>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-pastel-blue romo-bg-pastel-blue-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-pastel-blue romo-text-pastel-blue-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-pastel-blue">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-pastel-blue.romo-bg-pastel-blue-hover</code></div>
          <div><code> .romo-text-pastel-blue.romo-text-pastel-blue-hover</code></div>
          <div><code>a.romo-text-pastel-blue</code></div>
        </td>
        <td class="romo-text-small">
          <code>#d9edf7 - $pastelBlue</code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### Emphasis

<div class="romo-push2-bottom">
  <table class="romo-table romo-table-border romo-table-pad1">
    <thead>
      <tr>
        <th class="romo-align-center" style="width: 100px">Bg</th>
        <th class="romo-align-center">Text</th>
        <th class="romo-align-center">Anchor</th>
        <th class="romo-align-center">class=""</th>
        <th class="romo-align-center">Basis Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-warning romo-bg-warning-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-warning romo-text-warning-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-warning">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-warning.romo-bg-warning-hover</code></div>
          <div><code> .romo-text-warning.romo-text-warning-hover</code></div>
          <div><code>a.romo-text-warning</code></div>
        </td>
        <td class="romo-text-small">
          <div><code>$pastelYellow</code> (bg)</div>
          <div><code>$orange</code> (text)</div>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-danger romo-bg-danger-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-danger romo-text-danger-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-danger">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-danger.romo-bg-danger-hover</code></div>
          <div><code> .romo-text-danger.romo-text-danger-hover</code></div>
          <div><code>a.romo-text-danger</code></div>
        </td>
        <td class="romo-text-small">
          <div><code>$pastelRed</code> (bg)</div>
          <div><code>$red</code> (text)</div>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-info romo-bg-info-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-info romo-text-info-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-info">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-info.romo-bg-info-hover</code></div>
          <div><code> .romo-text-info.romo-text-info-hover</code></div>
          <div><code>a.romo-text-info</code></div>
        </td>
        <td class="romo-text-small">
          <div><code>$pastelBlue</code> (bg)</div>
          <div><code>$blue</code> (text)</div>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-success romo-bg-success-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-success romo-text-success-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-success">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-success.romo-bg-success-hover</code></div>
          <div><code> .romo-text-success.romo-text-success-hover</code></div>
          <div><code>a.romo-text-success</code></div>
        </td>
        <td class="romo-text-small">
          <div><code>$pastelGreen</code> (bg)</div>
          <div><code>$green</code> (text)</div>
        </td>
      </tr>
      <tr>
        <td class="romo-text-large romo-align-center romo-bg-inverse romo-bg-inverse-hover">&nbsp;</td>
        <td class="romo-text-large romo-align-center romo-text-bold romo-text-inverse romo-text-inverse-hover">AaBbCc</td>
        <td class="romo-text-large romo-align-center">
          <a class="romo-text-inverse">example.com</a>
        </td>
        <td class="romo-text-small">
          <div><code> .romo-bg-inverse.romo-bg-inverse-hover</code></div>
          <div><code> .romo-text-inverse.romo-text-inverse-hover</code></div>
          <div><code>a.romo-text-inverse</code></div>
        </td>
        <td class="romo-text-small">
          <div><code>$inverseBgColor</code> (bg)</div>
          <div><code>$inverseColor</code> (text)</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
