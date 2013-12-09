Responsive-Indicator
====================

A drop-in heads up display of pertinent responsive web design and progressive enhancement information.

The Responsive Indicator can be installed easily through [Bower](http://bower.io/). Simply run the following to install the Responsive Indicator as a development dependency:

```
bower install responsive-indicator --save-dev
```

Using it is simple too. Drop the Responsive Indicator into your website and you'll be given two indicators: a Viewport indicator and an HTML Class indicator ([Modernizr](http://modernizr.com/) style progressive enhancement class injection).

The Viewport Indicator will tell you the current `innerWidth` of your window and will update as that changes. You can toggle the display to be in `px` or `em` by tapping/clicking on it.

The HTML Class Indicator will tell you the current classes on the `<html>` element. Adding classes to the `<html>` element is a common approach to providing progressive enhancement anchors, especially for CSS. This is how [Modernizr](http://modernizr.com/) provides styling anchors for CSS.

On devices that are capable triggering keyboard shortcuts, `alt + v` will toggle the Viewport Indicator on or off, and `alt + m` will do the same for the HTML Class Indicator.