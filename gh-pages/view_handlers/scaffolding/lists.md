## Unordered

A list of items in which the order *does not* explicitly matter.  Default styling positions `outside` with left padding proportional to `$baseFontSize`.

<ul>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit</li>
  <li>Phasellus iaculis neque</li>
  <li>Purus sodales ultricies</li>
  <li>Vestibulum laoreet porttitor sem</li>
  <li>Ac tristique libero volutpat at</li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>

```html
<ul>
  <li>...</li>
</ul>
```

## Ordered

A list of items in which the order *does* explicitly matter.  As with unordered lists, default styling positions `outside` with left padding proportional to `$baseFontSize`.

<ol>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit</li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ol>

```html
<ol>
  <li>...</li>
</ol>
```

## Unstyled

Remove the default list-style and left padding on list items (immediate children only).

<ul class="romo-list-unstyled">
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit</li>
  <ul>
    <li>Phasellus iaculis neque</li>
    <li>Purus sodales ultricies</li>
    <li>Vestibulum laoreet porttitor sem</li>
  </ul>
  <li>Ac tristique libero volutpat at</li>
  <ol>
    <li>Faucibus porta lacus fringilla vel</li>
    <li>Aenean sit amet erat nunc</li>
  </ol>
  <li>Eget porttitor lorem</li>
</ul>

```html
<ul class="romo-list-unstyled">
  <li>...</li>
</ul>
```

## Inline

Place all list items on a single line with inline-block.

<ul class="romo-list-inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>

```html
<ul class="romo-list-inline">
  <li>...</li>
</ul>
```

### Optional classes

#### `.romo-list-pad{N}`

Add padding separating each item.

<div>
<ul class="romo-list-inline romo-list-pad0">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad1">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad2">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad3">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad4">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad5">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-pad6">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>

```html
<ul class="romo-list-inline romo-list-pad0">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad1">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad2">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad3">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad4">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad5">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-pad6">
  <li>...</li>
</ul>
```

#### `.romo-list-push{N}`

Add margin separating each item.

<div>
<ul class="romo-list-inline romo-list-push0">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push1">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push2">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push3">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push4">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push5">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>
<div>
<ul class="romo-list-inline romo-list-push6">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
</div>

```html
<ul class="romo-list-inline romo-list-push0">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push1">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push2">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push3">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push4">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push5">
  <li>...</li>
</ul>

<ul class="romo-list-inline romo-list-push6">
  <li>...</li>
</ul>
```
