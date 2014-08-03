## HTML5 doctype

Romo requires the use of the HTML5 doctype. Include it at the beginning of all your projects:

```html
<!DOCTYPE html>
<html lang="en">
  ...
</html>
```

## Reset with Normalize

Romo uses <a href="http://necolas.github.io/normalize.css/" target="_blank">Normalize.css</a> to reset the CSS.  From their website:

> Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.

## * { Box-sizing: Border-box } FTW

Romo uses <a href="http://www.paulirish.com/2012/box-sizing-border-box-ftw/" target="_blank">border-box</a> on all elements:

```css
/* apply a natural box layout model to all elements */
*, *:before, *:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
 }
```

## Other Settings

* Remove `margin` on the body
* Set `background-color: white;` on the body
