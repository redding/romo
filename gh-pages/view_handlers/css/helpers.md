## Borders

Use style classes to add borders.

<div class="romo-border">.romo-border</div>

```html
<div class="romo-border">...</div>
```

Use numbered classes, 0 through 2, to set specific pixel width.

<div>
  <div class="romo-border0 romo-push0-bottom">.romo-border0</div>
  <div class="romo-border1 romo-push0-bottom">.romo-border1</div>
  <div class="romo-border romo-push0-bottom">.romo-border (alias of .romo-border1)</div>
  <div class="romo-border2">.romo-border2</div>
</div>

```html
<div class="romo-border0">...</div>
<div class="romo-border1">...</div>
<div class="romo-border" >...</div>
<div class="romo-border2">...</div>
```

Or, add borders to specific sides.

<div>
  <div class="romo-border-top romo-push0-bottom">.romo-border-top</div>
  <div class="romo-border-bottom romo-push0-bottom">.romo-border-bottom</div>
  <div class="romo-border-left romo-border-right">.romo-border-left.romo-border-right</div>
</div>

```html
<div class="romo-border-top">...</div>
<div class="romo-border-bottom">...</div>
<div class="romo-border-left romo-border-right">...</div>
```

Remove from just specific sides.

<div>
  <div class="romo-border romo-rm-border-top romo-push0-bottom">.romo-rm-border-top</div>
  <div class="romo-border romo-rm-border-right romo-push0-bottom">.romo-rm-border-right</div>
  <div class="romo-border romo-rm-border-left romo-push0-bottom">.romo-rm-border-left</div>
  <div class="romo-border romo-rm-border-bottom">.romo-rm-border-bottom</div>
</div>

```html
<div class="romo-border romo-rm-border-top">...</div>
<div class="romo-border romo-rm-border-right">...</div>
<div class="romo-border romo-rm-border-left">...</div>
<div class="romo-border romo-rm-border-bottom">...</div>
```

Change style on any border configuration

<div>
  <div class="romo-border-solid romo-border2 romo-push0-bottom">.romo-border-solid</div>
  <div class="romo-border-dashed romo-border2 romo-push0-bottom">.romo-border-dashed</div>
  <div class="romo-border-dotted romo-border2 romo-push0-bottom">.romo-border-dotted</div>
  <div class="romo-border-double romo-border2 romo-push0-bottom">.romo-border-double</div>
  <div class="romo-border-groove romo-border2 romo-push0-bottom">.romo-border-groove</div>
  <div class="romo-border-inset romo-border2 romo-push0-bottom">.romo-border-inset</div>
  <div class="romo-border-hidden romo-border2 romo-push0-bottom">.romo-border-hidden</div>
  <div class="romo-border-none romo-border2">.romo-border-none</div>
</div>

```html
<div class="romo-border-solid">...</div>
<div class="romo-border-dashed">...</div>
<div class="romo-border-dotted">...</div>
<div class="romo-border-double">...</div>
<div class="romo-border-groove">...</div>
<div class="romo-border-inset">...</div>
<div class="romo-border-hidden">...</div>
<div class="romo-border-none">...</div>
```

Add color emphasis to any border configuration

<div>
  <div class="romo-border-muted romo-border2 romo-push0-bottom">.romo-border-muted</div>
  <div class="romo-border-warning romo-border2 romo-push0-bottom">.romo-border-warning</div>
  <div class="romo-border-error romo-border2 romo-push0-bottom">.romo-border-error</div>
  <div class="romo-border-info romo-border2 romo-push0-bottom">.romo-border-info</div>
  <div class="romo-border-success romo-border2 romo-push0-bottom">.romo-border-success</div>
  <div class="romo-border-inverse romo-border2">.romo-border-inverse</div>
</div>

```html
<div class="romo-border-muted">...</div>
<div class="romo-border-warning">...</div>
<div class="romo-border-error">...</div>
<div class="romo-border-info">...</div>
<div class="romo-border-success">...</div>
<div class="romo-border-inverse">...</div>
```

Add border radius.

<div>
  <div class="romo-border0 romo-border0-radius romo-push0-bottom">.romo-border0-radius</div>
  <div class="romo-border1 romo-border1-radius romo-push0-bottom">.romo-border1-radius</div>
  <div class="romo-border romo-border-radius romo-push0-bottom">.romo-border-radius (alias of .romo-border1-radius)</div>
  <div class="romo-border2 romo-border2-radius romo-push0-bottom">.romo-border2-radius</div>
  <div class="romo-border2 romo-border2-top-left-radius romo-push0-bottom">.romo-border2-top-left-radius</div>
  <div class="romo-border2 romo-border2-top-right-radius romo-push0-bottom">.romo-border2-top-right-radius</div>
  <div class="romo-border2 romo-border2-bottom-left-radius romo-push0-bottom">.romo-border2-bottom-left-radius</div>
  <div class="romo-border2 romo-border2-bottom-right-radius">.romo-border2-bottom-right-radius</div>
</div>

```html
<div class="romo-border3 romo-border0-radius">...</div>
<div class="romo-border1 romo-border1-radius">...</div>
<div class="romo-border romo-border-radius">...</div>
<div class="romo-border2 romo-border2-radius">...</div>
<div class="romo-border2 romo-border2-top-left-radius">...</div>
<div class="romo-border2 romo-border2-top-right-radius">...</div>
<div class="romo-border2 romo-border2-bottom-left-radius">...</div>
<div class="romo-border2 romo-border2-bottom-right-radius">...</div>
```

## Spacing

Use style classes to control how elements are spaced (margin/padding).

<div class="romo-border">
  <div class="romo-border romo-push">.romo-push</div>
  <div class="romo-border romo-pad">.romo-pad</div>
  <div class="romo-border romo-push romo-pad">.romo-push.romo-pad</div>
</div>

```html
<div class="romo-border">
  <div class="romo-border romo-push">...</div>
  <div class="romo-border romo-pad">...</div>
  <div class="romo-border romo-push romo-pad">...</div>
</div>
```

Use numbered classes, 0 through 2, to set specific spacing size.

<div class="romo-border">
  <div class="romo-border romo-push0 romo-pad0">.romo-push0.romo-pad0</div>
  <div class="romo-border romo-push1 romo-pad1">.romo-push1.romo-pad1</div>
  <div class="romo-border romo-push  romo-pad ">.romo-push.romo-pad (alias of 1)</div>
  <div class="romo-border romo-push2 romo-pad2">.romo-push2.romo-pad2</div>
</div>

```html
<div class="romo-border">
  <div class="romo-border romo-push0 romo-pad0">...</div>
  <div class="romo-border romo-push1 romo-pad1">...</div>
  <div class="romo-border romo-push  romo-pad ">...</div>
  <div class="romo-border romo-push2 romo-pad2">...</div>
</div>
```

Add to just specific sides.

<div class="romo-border">
  <div class="romo-border romo-push-top romo-pad-top">.romo-push-top.romo-pad-top</div>
  <div class="romo-border romo-push-right romo-pad-right">.romo-push-right.romo-pad-right</div>
  <div class="romo-border romo-push-left romo-pad-left">.romo-push-left.romo-pad-left</div>
  <div class="romo-border romo-push-bottom romo-pad-bottom">.romo-push-bottom.romo-pad-bottom</div>
</div>

```html
<div class="romo-border">
  <div class="romo-border romo-push-top romo-pad-top">...</div>
  <div class="romo-border romo-push-right romo-pad-right">...</div>
  <div class="romo-border romo-push-left romo-pad-left">...</div>
  <div class="romo-border romo-push-bottom romo-pad-bottom">...</div>
</div>
```

Remove from just specific sides.

<div class="romo-border">
  <div class="romo-border romo-push romo-pad romo-rm-push-top romo-rm-pad-top">.romo-rm-push-top.romo-rm-pad-top</div>
  <div class="romo-border romo-push romo-pad romo-push-none-right romo-rm-pad-right">.romo-push-none-right.romo-rm-pad-right</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-left romo-rm-pad-left">.romo-rm-push-left.romo-rm-pad-left</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-bottom romo-pad-none-bottom">.romo-rm-push-bottom.romo-pad-none-bottom</div>
</div>

```html
<div class="romo-border">
  <div class="romo-border romo-push romo-pad romo-rm-push-top romo-rm-pad-top">...</div>
  <div class="romo-border romo-push romo-pad romo-push-none-right romo-rm-pad-right">...</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-left romo-rm-pad-left">...</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-bottom romo-pad-none-bottom">...</div>
</div>
```

## Display

Use style classes to set specific display values.

<div class="romo-inline">-.romo-inline-</div>
<div class="romo-inline-block">-.romo-inline-block-</div>
<div class="romo-block">-.romo-block-</div>
<div class="romo-display-none">-.romo-display-none-</div>

```html
<div class="romo-inline">...</div>
<div class="romo-inline-block">...</div>
<div class="romo-block">...</div>
<div class="romo-display-none">...</div>
```

## Position

Use style classes to set specific position values.

<div class="romo-relative romo-border">
  <div>-.romo-relative-</div>
  <div>-.romo-relative-</div>
  <div class="romo-absolute" style="top: 0; right: 0">-.romo-absolute-</div>
</div>

```html
<div class="romo-relative romo-border">
  <div>...</div>
  <div>...</div>
  <div class="romo-absolute" style="top: 0; right: 0">...</div>
</div>
```

Or, use `romo-fixed` to position as fixed.

## Floating

Use style classes to float elements.

<div class="romo-border romo-clearfix">
  <div class="romo-float-left">-.romo-float-left-</div>
  <div class="romo-float-right">-.romo-float-right-</div>
  <div class="romo-pull-left">-.romo-pull-left-</div>
  <div class="romo-pull-right">-.romo-pull-right-</div>
</div>

```html
<div class="romo-border romo-clearfix">
  <div class="romo-float-left">...</div>
  <div class="romo-float-right">...</div>
  <div class="romo-pull-left">...</div>
  <div class="romo-pull-right">...</div>
</div>
```

## Overflow

Use style classes to handle common overflow cases.

<div style="width: 150px" class="romo-border romo-inline-block romo-nowrap">.romo-nowrap: content that will overflow</div>
<div></div>
<div style="width: 150px" class="romo-border romo-inline-block romo-crop">.romo-crop: content that will overflow</div>
<div></div>
<div style="width: 150px" class="romo-border romo-inline-block romo-crop-ellipsis">.romo-crop-ellipsis: content that will overflow</div>

```html
<div style="width: 150px" class="romo-border romo-inline-block romo-nowrap">...</div>
<div></div>
<div style="width: 150px" class="romo-border romo-inline-block romo-crop">...</div>
<div></div>
<div style="width: 150px" class="romo-border romo-inline-block romo-crop-ellipsis">...</div>
```
