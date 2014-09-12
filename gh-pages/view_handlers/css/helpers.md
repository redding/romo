## Borders

Use style classes to add borders.

<div style="padding: 10px">
  <div class="romo-border">.romo-border</div>
</div>

```html
<div style="padding: 10px">
  <div class="romo-border">.romo-border</div>
</div>
```

Use numbered classes, 0 through 2, to set specific pixel width.

<div style="padding: 10px">
  <div class="romo-border0">.romo-border0</div>
  <div>&nbsp;</div>
  <div class="romo-border1">.romo-border1</div>
  <div>&nbsp;</div>
  <div class="romo-border">.romo-border (alias of .romo-border1)</div>
  <div>&nbsp;</div>
  <div class="romo-border2">.romo-border2</div>
</div>

```html
<div style="padding: 10px">
  <div class="romo-border0">.romo-border0</div>
  <div class="romo-border1">.romo-border1</div>
  <div class="romo-border">.romo-border (alias of .romo-border1)</div>
  <div class="romo-border2">.romo-border2</div>
</div>
```

Or, add borders to specific sides.

<div style="padding: 10px">
  <div class="romo-border-top">.romo-border-top</div>
  <div>&nbsp;</div>
  <div class="romo-border-bottom">.romo-border-bottom</div>
  <div>&nbsp;</div>
  <div class="romo-border-left romo-border-right">.romo-border-left.romo-border-right</div>
</div>

```html
<div style="padding: 10px">
  <div class="romo-border-top">.romo-border-top</div>
  <div>&nbsp;</div>
  <div class="romo-border-bottom">.romo-border-bottom</div>
  <div>&nbsp;</div>
  <div class="romo-border-left romo-border-right">.romo-border-left.romo-border-right</div>
</div>
```

Remove from just specific sides.

<div style="padding: 10px">
  <div class="romo-border romo-rm-border-top">.romo-rm-border-top</div>
  <div class="romo-border romo-rm-border-right">.romo-rm-border-right</div>
  <div class="romo-border romo-rm-border-left">.romo-rm-border-left</div>
  <div class="romo-border romo-rm-border-bottom">.romo-rm-border-bottom</div>
</div>

```html
<div style="padding: 10px">
  <div class="romo-border romo-rm-border-top">.romo-rm-border-top</div>
  <div class="romo-border romo-rm-border-right">.romo-rm-border-right</div>
  <div class="romo-border romo-rm-border-left">.romo-rm-border-left</div>
  <div class="romo-border romo-rm-border-bottom">.romo-rm-border-bottom</div>
</div>
```

Change style on any border configuration

<div style="padding: 10px">
  <div class="romo-border-solid romo-border2">.romo-border-solid</div>
  <div>&nbsp;</div>
  <div class="romo-border-dashed romo-border2">.romo-border-dashed</div>
  <div>&nbsp;</div>
  <div class="romo-border-dotted romo-border2">.romo-border-dotted</div>
  <div>&nbsp;</div>
  <div class="romo-border-double romo-border2">.romo-border-double</div>
  <div>&nbsp;</div>
  <div class="romo-border-groove romo-border2">.romo-border-groove</div>
  <div>&nbsp;</div>
  <div class="romo-border-inset romo-border2">.romo-border-inset</div>
  <div>&nbsp;</div>
  <div class="romo-border-hidden romo-border2">.romo-border-hidden</div>
  <div>&nbsp;</div>
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

<div style="padding: 10px">
  <div class="romo-border-muted romo-border2">.romo-border-muted</div>
  <div>&nbsp;</div>
  <div class="romo-border-warning romo-border2">.romo-border-warning</div>
  <div>&nbsp;</div>
  <div class="romo-border-error romo-border2">.romo-border-error</div>
  <div>&nbsp;</div>
  <div class="romo-border-info romo-border2">.romo-border-info</div>
  <div>&nbsp;</div>
  <div class="romo-border-success romo-border2">.romo-border-success</div>
  <div>&nbsp;</div>
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

<div style="padding: 10px">
  <div class="romo-border0 romo-border0-radius">.romo-border0-radius</div>
  <div>&nbsp;</div>
  <div class="romo-border1 romo-border1-radius">.romo-border1-radius</div>
  <div>&nbsp;</div>
  <div class="romo-border romo-border-radius">.romo-border-radius (alias of .romo-border1-radius)</div>
  <div>&nbsp;</div>
  <div class="romo-border2 romo-border2-radius">.romo-border2-radius</div>
  <div>&nbsp;</div>
  <div class="romo-border2 romo-border2-top-left-radius">.romo-border2-top-left-radius</div>
  <div>&nbsp;</div>
  <div class="romo-border2 romo-border2-top-right-radius">.romo-border2-top-right-radius</div>
  <div>&nbsp;</div>
  <div class="romo-border2 romo-border2-bottom-left-radius">.romo-border2-bottom-left-radius</div>
  <div>&nbsp;</div>
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
  <div class="romo-border romo-push">.romo-push</div>
  <div class="romo-border romo-pad">.romo-pad</div>
  <div class="romo-border romo-push romo-pad">.romo-push.romo-pad</div>
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
  <div class="romo-border romo-push0 romo-pad0">.romo-push0.romo-pad0</div>
  <div class="romo-border romo-push1 romo-pad1">.romo-push1.romo-pad1</div>
  <div class="romo-border romo-push  romo-pad ">.romo-push.romo-pad (alias of 1)</div>
  <div class="romo-border romo-push2 romo-pad2">.romo-push2.romo-pad2</div>
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
  <div class="romo-border romo-push-top romo-pad-top">.romo-push-top.romo-pad-top</div>
  <div class="romo-border romo-push-right romo-pad-right">.romo-push-right.romo-pad-right</div>
  <div class="romo-border romo-push-left romo-pad-left">.romo-push-left.romo-pad-left</div>
  <div class="romo-border romo-push-bottom romo-pad-bottom">.romo-push-bottom.romo-pad-bottom</div>
</div>
```

Remove from just specific sides.

<div class="romo-border">
  <div class="romo-border romo-push romo-pad romo-rm-push-top romo-rm-pad-top">.romo-rm-push-top.romo-rm-pad-top</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-right romo-rm-pad-right">.romo-rm-push-right.romo-rm-pad-right</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-left romo-rm-pad-left">.romo-rm-push-left.romo-rm-pad-left</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-bottom romo-rm-pad-bottom">.romo-rm-push-bottom.romo-rm-pad-bottom</div>
</div>

```html
<div class="romo-border">
  <div class="romo-border romo-push romo-pad romo-rm-push-top romo-rm-pad-top">.romo-rm-push-top.romo-rm-pad-top</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-right romo-rm-pad-right">.romo-rm-push-right.romo-rm-pad-right</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-left romo-rm-pad-left">.romo-rm-push-left.romo-rm-pad-left</div>
  <div class="romo-border romo-push romo-pad romo-rm-push-bottom romo-rm-pad-bottom">.romo-rm-push-bottom.romo-rm-pad-bottom</div>
</div>
```

## Display

Use style classes to set specific display values.

<div class="romo-inline">-.romo-inline-</div>
<div class="romo-inline-block">-.romo-inline-block-</div>
<div class="romo-block">-.romo-block-</div>

```html
<div class="romo-inline">-.romo-inline-</div>
<div class="romo-inline-block">-.romo-inline-block-</div>
<div class="romo-block">-.romo-block-</div>
```

## Position

Use style classes to set specific position values.

<div class="romo-relative romo-border">
  <div>-.romo-relative-</div>
  <div>&nbsp;</div>
  <div class="romo-absolute" style="top: 0; right: 0">-.romo-absolute-</div>
</div>

```html
<div class="romo-relative romo-border">
  <div>-.romo-relative-</div>
  <div>&nbsp;</div>
  <div class="romo-absolute" style="top: 0; right: 0">-.romo-absolute-</div>
</div>
```

Or, use `romo-fixed` to position as fixed.

## Floating

Use style classes to float elements.

<div class="romo-border">
  <div class="romo-float-left">-.romo-float-left-</div>
  <div class="romo-float-right">-.romo-float-right-</div>
  <div class="romo-pull-left">-.romo-pull-left-</div>
  <div class="romo-pull-right">-.romo-pull-right-</div>
  <div style="clear: both"></div>
</div>

```html
<div class="romo-border">
  <div class="romo-float-left">-.romo-float-left-</div>
  <div class="romo-float-right">-.romo-float-right-</div>
  <div class="romo-pull-left">-.romo-pull-left-</div>
  <div class="romo-pull-right">-.romo-pull-right-</div>
  <div style="clear: both"></div>
</div>
```

## Overflow

Use style classes to handle common overflow cases.

<div style="width: 150px" class="romo-border romo-inline-block romo-crop">.romo-crop: content that will overflow</div>
<div></div>
<div style="width: 150px" class="romo-border romo-inline-block romo-nowrap">.romo-nowrap: content that will overflow</div>

```html
<div style="width: 150px" class="romo-border romo-inline-block romo-crop">.romo-crop: content that will overflow</div>
<div></div>
<div style="width: 150px" class="romo-border romo-inline-block romo-nowrap">.romo-nowrap: content that will overflow</div>
```
