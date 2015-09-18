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

## Color emphasis classes

Use style classes to add color to text.

<div>
  <span class="romo-text-base">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-text-alt">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</span><br />
  <span class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
  <span class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
  <span class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <span class="romo-text-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
</div>

```html
<span class="romo-text-base">...</span><br />
<span class="romo-text-alt">...</span><br />
<span class="romo-text-muted">...</span><br />
<span class="romo-text-warning">...</span><br />
<span class="romo-text-error">...</span><br />
<span class="romo-text-info">...</span><br />
<span class="romo-text-success">...</span><br />
<span class="romo-text-inverse">...</span><br />
```

Or, to links.

<div>
  <a href="#" class="romo-text-base">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</a><br />
  <a href="#" class="romo-text-alt">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</a><br />
  <a href="#" class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</a><br />
  <a href="#" class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</a><br />
  <a href="#" class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</a><br />
  <a href="#" class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</a><br />
  <a href="#" class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
  <a href="#" class="romo-text-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
</div>

```html
<a href="#" class="romo-text-base">...</a><br />
<a href="#" class="romo-text-alt">...</a><br />
<a href="#" class="romo-text-muted">...</a><br />
<a href="#" class="romo-text-warning">...</a><br />
<a href="#" class="romo-text-error">...</a><br />
<a href="#" class="romo-text-info">...</a><br />
<a href="#" class="romo-text-success">...</a><br />
<a href="#" class="romo-text-inverse">...</a><br />
```

Or, on hover only (non-links).

<div>
  <span class="romo-text-base-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-text-alt-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-text-muted-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-text-warning-hover">Etiam porta sem malesuada magna mollis euismod.</span><br />
  <span class="romo-text-error-hover">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
  <span class="romo-text-info-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
  <span class="romo-text-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <span class="romo-text-inverse-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
</div>

```html
<span class="romo-text-base-hover">...</span><br />
<span class="romo-text-alt-hover">...</span><br />
<span class="romo-text-muted-hover">...</span><br />
<span class="romo-text-warning-hover">...</span><br />
<span class="romo-text-error-hover">...</span><br />
<span class="romo-text-info-hover">...</span><br />
<span class="romo-text-success-hover">...</span><br />
<span class="romo-text-inverse-hover">...</span><br />
```

Or, to the background instead of the text.

<div>
  <span class="romo-bg-base">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-bg-alt">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-bg-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-bg-warning">Etiam porta sem malesuada magna mollis euismod.</span><br />
  <span class="romo-bg-error">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
  <span class="romo-bg-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
  <span class="romo-bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <span class="romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
</div>

```html
<span class="romo-bg-base">...</span><br />
<span class="romo-bg-alt">...</span><br />
<span class="romo-bg-muted">...</span><br />
<span class="romo-bg-warning">...</span><br />
<span class="romo-bg-error">...</span><br />
<span class="romo-bg-info">...</span><br />
<span class="romo-bg-success">...</span><br />
<span class="romo-bg-inverse">...</span><br />
```

Or, to the background instead of the text on hover only.

<div>
  <span class="romo-bg-base-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-bg-alt-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-bg-muted-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
  <span class="romo-bg-warning-hover">Etiam porta sem malesuada magna mollis euismod.</span><br />
  <span class="romo-bg-error-hover">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
  <span class="romo-bg-info-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
  <span class="romo-bg-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <span class="romo-bg-inverse-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
</div>

```html
<span class="romo-bg-base-hover">...</span><br />
<span class="romo-bg-alt-hover">...</span><br />
<span class="romo-bg-muted-hover">...</span><br />
<span class="romo-bg-warning-hover">...</span><br />
<span class="romo-bg-error-hover">...</span><br />
<span class="romo-bg-info-hover">...</span><br />
<span class="romo-bg-success-hover">...</span><br />
<span class="romo-bg-inverse-hover">...</span><br />
```

Or, combine in any number of ways.

<div>
  <span class="romo-text-inverse romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <span class="romo-text-success romo-bg-info">Etiam porta sem malesuada magna mollis euismod.</span><br />
  <span class="romo-text-error romo-bg-warning">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
  <span class="romo-text-info romo-bg-inverse-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
  <span class="romo-text-error-hover romo-bg-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <span class="romo-text-warning-hover romo-bg-base-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
  <a href="#" class="romo-text-inverse romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
</div>

```html
<span class="romo-text-inverse romo-bg-inverse">...</span><br />
<span class="romo-text-success romo-bg-info">...</span><br />
<span class="romo-text-error romo-bg-warning">...</span><br />
<span class="romo-text-info romo-bg-inverse-hover">...</span><br />
<span class="romo-text-error-hover romo-bg-success-hover">...</span><br />
<span class="romo-text-warning-hover romo-bg-base-hover">...</span><br />
<a href="#" class="romo-text-inverse romo-bg-inverse">...</a><br />
```
