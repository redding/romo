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

All HTML headings, `<h1>` through `<h6>` are available.

<h1>h1. Heading 1</h1>
<h2>h2. Heading 2</h2>
<h3>h3. Heading 3</h3>
<h4>h4. Heading 4</h4>
<h5>h5. Heading 5</h5>
<h6>h6. Heading 6</h6>

```html
<h1>h1. Heading 1</h1>
<h2>h2. Heading 2</h2>
<h3>h3. Heading 3</h3>
<h4>h4. Heading 4</h4>
<h5>h5. Heading 5</h5>
<h6>h6. Heading 6</h6>
```

## Size classes

Use style classes to size up/down text corresponding with heading sizes.

<div class="romo-text1">.romo-text1</div>
<div class="romo-text2">.romo-text2</div>
<div class="romo-text3">.romo-text3</div>
<div class="romo-text4">.romo-text4</div>
<div class="romo-text5">.romo-text5</div>
<div class="romo-text6">.romo-text6</div>

```html
<div class="romo-text1">.romo-text1</div>
<div class="romo-text2">.romo-text2</div>
<div class="romo-text3">.romo-text3</div>
<div class="romo-text4">.romo-text4</div>
<div class="romo-text5">.romo-text5</div>
<div class="romo-text6">.romo-text6</div>
```

Or, use these natural-size style classes for the more common sizing needs.

<div class="romo-text-large">.romo-text-large Size (alias for .romo-text4)</div>
<div>normal text Size</div>
<div class="romo-text-small">.romo-text-small Size (alias for .romo-text6)</div>

```html
<div class="romo-text-large">.romo-text-large Size (alias for .romo-text4)</div>
<div>normal text Size</div>
<div class="romo-text-small">.romo-text-small Size (alias for .romo-text6)</div>
```

## Alignment classes

Use style classes to align text.

<p class="romo-text-left">.romo-text-left</p>
<p class="romo-text-center">.romo-text-center</p>
<p class="romo-text-right">.romo-text-right</p>

```html
<p class="romo-text-left">.romo-text-left</p>
<p class="romo-text-center">.romo-text-center</p>
<p class="romo-text-right">.romo-text-right</p>
```

Or vertical align text.

<div>
  <span class="romo-text-top romo-text-large">Aligned:</span>
  <span class="romo-text-top romo-text-small">.romo-text-top</span>
</div>
<div>
  <span class="romo-text-middle romo-text-large">Aligned:</span>
  <span class="romo-text-middle romo-text-small">.romo-text-middle</span>
</div>
<div>
  <span class="romo-text-bottom romo-text-large">Aligned:</span>
  <span class="romo-text-bottom romo-text-small">.romo-text-bottom</span>
</div>

```html
<div>
  <span class="romo-text-top romo-text-large">Aligned:</span>
  <span class="romo-text-top romo-text-small">.romo-text-top</span>
</div>
<div>
  <span class="romo-text-middle romo-text-large">Aligned:</span>
  <span class="romo-text-middle romo-text-small">.romo-text-middle</span>
</div>
<div>
  <span class="romo-text-bottom romo-text-large">Aligned:</span>
  <span class="romo-text-bottom romo-text-small">.romo-text-bottom</span>
</div>
```

## Weight classes

Use style classes to set font weight.

<div class="romo-text3 romo-text-normal">.romo-text-normal</div>
<div class="romo-text3 romo-text-lighter">.romo-text-lighter</div>
<div class="romo-text3 romo-text-bold">.romo-text-bold</div>
<div class="romo-text3 romo-text-bolder">.romo-text-bolder</div>
<div class="romo-text3 romo-text-100">.romo-text-100</div>
<div class="romo-text3 romo-text-200">.romo-text-200</div>
<div class="romo-text3 romo-text-300">.romo-text-300</div>
<div class="romo-text3 romo-text-400">.romo-text-400</div>
<div class="romo-text3 romo-text-500">.romo-text-500</div>
<div class="romo-text3 romo-text-600">.romo-text-600</div>
<div class="romo-text3 romo-text-700">.romo-text-700</div>
<div class="romo-text3 romo-text-800">.romo-text-800</div>
<div class="romo-text3 romo-text-900">.romo-text-900</div>

```html
<div class="romo-text3 romo-text-normal">.romo-text-normal</div>
<div class="romo-text3 romo-text-lighter">.romo-text-lighter</div>
<div class="romo-text3 romo-text-bold">.romo-text-bold</div>
<div class="romo-text3 romo-text-bolder">.romo-text-bolder</div>
<div class="romo-text3 romo-text-100">.romo-text-100</div>
<div class="romo-text3 romo-text-200">.romo-text-200</div>
<div class="romo-text3 romo-text-300">.romo-text-300</div>
<div class="romo-text3 romo-text-400">.romo-text-400</div>
<div class="romo-text3 romo-text-500">.romo-text-500</div>
<div class="romo-text3 romo-text-600">.romo-text-600</div>
<div class="romo-text3 romo-text-700">.romo-text-700</div>
<div class="romo-text3 romo-text-800">.romo-text-800</div>
<div class="romo-text3 romo-text-900">.romo-text-900</div>
```

## Color emphasis classes

Use style classes to add color to text.

<span class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-text-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />

```html
<span class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-text-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
```

Or, to links.

<a href="#" class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</a><br />
<a href="#" class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</a><br />
<a href="#" class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</a><br />
<a href="#" class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</a><br />
<a href="#" class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
<a href="#" class="romo-text-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />

```html
<a href="#" class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</a><br />
<a href="#" class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</a><br />
<a href="#" class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</a><br />
<a href="#" class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</a><br />
<a href="#" class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
<a href="#" class="romo-text-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
```

Or, on hover only (non-links).

<span class="romo-text-muted-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-text-warning-hover">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-text-error-hover">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-text-info-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-text-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-text-inverse-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />

```html
<span class="romo-text-muted-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-text-warning-hover">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-text-error-hover">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-text-info-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-text-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-text-inverse-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
```

Or, to the background instead of the text.

<span class="romo-bg-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-bg-warning">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-bg-error">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-bg-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />

```html
<span class="romo-bg-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-bg-warning">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-bg-error">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-bg-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
```

Or, to the background instead of the text on hover only.

<span class="romo-bg-muted-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-bg-warning-hover">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-bg-error-hover">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-bg-info-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-bg-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-bg-inverse-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />

```html
<span class="romo-bg-muted-hover">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</span><br />
<span class="romo-bg-warning-hover">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-bg-error-hover">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-bg-info-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-bg-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-bg-inverse-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
```

Or, combine in any number of ways.

<span class="romo-text-inverse romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-text-success romo-bg-info">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-text-error romo-bg-warning">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-text-info romo-bg-inverse-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-text-error-hover romo-bg-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<a href="#" class="romo-text-inverse romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />

```html
<span class="romo-text-inverse romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<span class="romo-text-success romo-bg-info">Etiam porta sem malesuada magna mollis euismod.</span><br />
<span class="romo-text-error romo-bg-warning">Donec ullamcorper nulla non metus auctor fringilla.</span><br />
<span class="romo-text-info romo-bg-inverse-hover">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</span><br />
<span class="romo-text-error-hover romo-bg-success-hover">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</span><br />
<a href="#" class="romo-text-inverse romo-bg-inverse">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</a><br />
```
