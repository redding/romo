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

Size up/down text with numbered style classes that correspond with heading sizes.

<div class="romo-text1">.romo-text1 Size</div>
<div class="romo-text2">.romo-text2 Size</div>
<div class="romo-text3">.romo-text3 Size</div>
<div class="romo-text4">.romo-text4 Size</div>
<div class="romo-text5">.romo-text5 Size</div>
<div class="romo-text6">.romo-text6 Size</div>

```html
<div class="romo-text1">.romo-text1 Size</div>
<div class="romo-text2">.romo-text2 Size</div>
<div class="romo-text3">.romo-text3 Size</div>
<div class="romo-text4">.romo-text4 Size</div>
<div class="romo-text5">.romo-text5 Size</div>
<div class="romo-text6">.romo-text6 Size</div>
```

Or, use these nature-size style classes for the more common sizing needs.

<div class="romo-text-large">.romo-text-large Size (alias for .romo-text4)</div>
<div>normal text Size</div>
<div class="romo-text-small">.romo-text6 Size (alias for .romo-text6)</div>

```html
<div class="romo-text-large">.romo-text-large Size (alias for .romo-text4)</div>
<div>normal text Size</div>
<div class="romo-text-small">.romo-text6 Size (alias for .romo-text6)</div>
```

## Alignment classes

Realign text with style classes.

<p class="romo-text-left">Left aligned text.</p>
<p class="romo-text-center">Center aligned text.</p>
<p class="romo-text-right">Right aligned text.</p>

```html
<p class="romo-text-left">Left aligned text.</p>
<p class="romo-text-center">Center aligned text.</p>
<p class="romo-text-right">Right aligned text.</p>
```

## Color emphasis classes

Add color to text with style classes.

<p class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
<p class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
<p class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</p>
<p class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</p>
<p class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

```html
<p class="romo-text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
<p class="romo-text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
<p class="romo-text-error">Donec ullamcorper nulla non metus auctor fringilla.</p>
<p class="romo-text-info">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.</p>
<p class="romo-text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
```
