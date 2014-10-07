## Default Styles

All images have some basic styling that removes any border and auto scales down to fit their containers.


<div class="romo-row">
  <div class="romo-span romo-4-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
  <div class="romo-span romo-4-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
  <div class="romo-span romo-4-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
</div>
<div class="romo-row">
  <div class="romo-span romo-3-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
  <div class="romo-span romo-3-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
  <div class="romo-span romo-3-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
  <div class="romo-span romo-3-12 romo-border">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg" alt="F16A FAP linksup KC-10.jpg">
  </div>
</div>

<div>
  <p>"<a href="http://commons.wikimedia.org/wiki/File:F16A_FAP_linksup_KC-10.jpg#mediaviewer/File:F16A_FAP_linksup_KC-10.jpg">F16A FAP linksup KC-10</a>". Licensed under Public domain via <a href="//commons.wikimedia.org/wiki/">Wikimedia Commons</a>.</p>
</div>

## Optional classes

### `.romo-img-{rounded|circle|card}`

Add these classes to an `<img>` element to add optional styling.

<div class="romo-push0-bottom">
  <img data-src="holder.js/24x24" class="romo-img-rounded">
  <img data-src="holder.js/24x24" class="romo-img-circle">
  <img data-src="holder.js/24x24" class="romo-img-card">
</div>
<div>
  <img data-src="holder.js/120x120" class="romo-img-rounded">
  <img data-src="holder.js/120x120" class="romo-img-circle">
  <img data-src="holder.js/120x120" class="romo-img-card">
</div>

```html
<img src="..." class="romo-img-rounded">
<img src="..." class="romo-img-circle">
<img src="..." class="romo-img-card">
```

### `.romo-img{0-3}`

Add these classes to adjust height.

<div>
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img0">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img1">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img2">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img3">
</div>

```html
<img src="..." class="romo-img0">
<img src="..." class="romo-img1">
<img src="..." class="romo-img2">
<img src="..." class="romo-img3">
```

Use to align with inline text.

<div class="romo-push0-bottom">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img0 romo-align-middle">
  <span class="romo-text0 romo-align-middle">Img0, text0, middle</span>
</div>
<div class="romo-push0-bottom">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img1 romo-align-middle">
  <span class="romo-text1 romo-align-middle">Img1, text1, middle</span>
</div>
<div class="romo-push0-bottom">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img2 romo-align-middle">
  <span class="romo-text2 romo-align-middle">Img2, text2, middle</span>
</div>
<div class="romo-push0-bottom">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img3 romo-align-middle">
  <span class="romo-text3 romo-align-middle">Img3, text3, middle</span>
</div>
<div class="romo-push0-bottom">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img0 romo-align-middle">
  <span class="romo-text3 romo-align-middle">Img0, text3, middle</span>
</div>
<div class="romo-push0-bottom">
  <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
       class="romo-img3 romo-align-middle">
  <span class="romo-text0 romo-align-middle">Img3, text0, middle</span>
</div>

<div>
  <p>"<a href="http://commons.wikimedia.org/wiki/File:F16A_FAP_linksup_KC-10.jpg#mediaviewer/File:F16A_FAP_linksup_KC-10.jpg">F16A FAP linksup KC-10</a>". Licensed under Public domain via <a href="//commons.wikimedia.org/wiki/">Wikimedia Commons</a>.</p>
</div>

```html
<div>
  <img class="romo-img0 romo-align-middle" src="...">
  <span class="romo-text0 romo-align-middle">Img0, text0, middle</span>
</div>
<div>
  <img class="romo-img1 romo-align-middle" src="...">
  <span class="romo-text1 romo-align-middle">Img1, text1, middle</span>
</div>
<div>
  <img class="romo-img2 romo-align-middle" src="...">
  <span class="romo-text2 romo-align-middle">Img2, text2, middle</span>
</div>
<div>
  <img class="romo-img3 romo-align-middle" src="...">
  <span class="romo-text3 romo-align-middle">Img3, text3, middle</span>
</div>
<div>
  <img class="romo-img0 romo-align-middle" src="...">
  <span class="romo-text3 romo-align-middle">Img0, text3, middle</span>
</div>
<div>
  <img class="romo-img3 romo-align-middle" src="...">
  <span class="romo-text0 romo-align-middle">Img3, text0, middle</span>
</div>
```

Or use `.romo-img-inline` to manually vertically align text that isn't inline with an image.

<div class="romo-row romo-push0-bottom">
  <div class="romo-span romo-2-24 romo-align-right romo-pad0-right">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
         class="romo-img3">
  </div>
  <div class="romo-span romo-3-24 romo-text1">
    <span class="romo-img-inline3">Img3, text1</span>
  </div>
  <div class="romo-span romo-offset-19-24"></div>
</div>

```html
<div class="romo-row romo-push0-bottom">
  <div class="romo-span romo-2-24 romo-align-right romo-pad0-right">
    <img src="http://upload.wikimedia.org/wikipedia/commons/1/15/F16A_FAP_linksup_KC-10.jpg"
         class="romo-img3">
  </div>
  <div class="romo-span romo-3-24 romo-text1">
    <span class="romo-img-inline3">Img3, text1</span>
  </div>
  <div class="romo-span romo-offset-19-24"></div>
</div>
```
