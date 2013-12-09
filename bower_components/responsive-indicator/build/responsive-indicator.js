/**
 * Responsive Indicator
 * Provides a heads-up display of available classes on the HTML element as well as the width of the viewport
 *
 * Toggle the Viewport Indicator:
 *  - On/Off with alt + v
 *  - px/em units with click/tap
 *
 * Toggle HTML Class Indicator:
 *  - On/Off with alt + m
 *  - Open/Close with click/tap
 *
 */
(function () {
  //////////////////////////////
  // Utilities
  //////////////////////////////

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for N
  // milliseconds. If `immediate` is passed, trigger the function on the leading
  // edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  // From http://www.avoid.org/?p=78
  function hasClass(el, name) {
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
  }

  // From http://stackoverflow.com/questions/2155737/remove-css-class-from-element-with-javascript-no-jquery
  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }

  // From http://www.avoid.org/?p=78
  function addClass(el, name) {
    if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') + name; }
  }

  ///////////////////////////////
  // Indicator HTML and CSS
  /////////////////////////////
  // Indicator Wrapper
  var indicatorWrapper = document.createElement('div');
  indicatorWrapper.id = 'responsive-indicator-wrapper';

  // Indicator Styling
  var indicatorStyling = document.createElement('style');
  indicatorStyling.type = 'text/css';
  indicatorStyling.innerHTML = '#responsive-indicator-wrapper:after,#responsive-viewport-indicator:after,#responsive-modernizr-debug:after{content:"";display:table;clear:both}#responsive-indicator-wrapper,#responsive-viewport-indicator,#responsive-modernizr-debug{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}#responsive-indicator-wrapper{font-family:"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;font-weight:300;font-size:16px;line-height:1em;color:#ccc;position:fixed;bottom:.5em;left:.5em;right:.5em;z-index:999999}#responsive-indicator-wrapper div:first-child[id="responsive-viewport-indicator"]{border-radius:.5em .5em 0 0;border-bottom:1px solid #4f4f4f;margin-top:-1.5em}#responsive-indicator-wrapper div:last-child[id="responsive-viewport-indicator"]{border-radius:.5em}#responsive-indicator-wrapper div:last-child[id="responsive-modernizr-debug"]{border-radius:.5em 0 .5em .5em}#responsive-indicator-wrapper div:first-child[id="responsive-modernizr-debug"]{border-radius:.5em}#responsive-viewport-indicator,#responsive-modernizr-debug{background:rgba(51,51,51,0.9);padding:.25em .5em;height:1.5em;float:right;text-align:right;overflow:hidden}#responsive-viewport-indicator:hover,#responsive-modernizr-debug:hover{cursor:pointer}#responsive-modernizr-debug.open{height:auto}#responsive-modernizr-debug.closed{height:1.5em;width:8em}';

  // Viewport Indicator
  var viewportIndicator = document.createElement('div');
  viewportIndicator.id = 'responsive-viewport-indicator';

  // Modernizr Indicator
  var modernizrIndicator = document.createElement('div');
  modernizrIndicator.id = 'responsive-modernizr-debug';

  // Toggle Indicators
  function indicatorToggle(e) {
    var keycode;
    if (window.event) {
      keycode = window.event.keyCode;
    } else if (e) {
      keycode = e.which;
    }

    // Viewport Indicator Show/Hide
    if (keycode === 86 && e.altKey) {
      if (!document.getElementById(viewportIndicator.id)) {
        if (document.getElementById(modernizrIndicator.id)) {
          indicatorWrapper.insertBefore(viewportIndicator, modernizrIndicator);
        } else {
          indicatorWrapper.appendChild(viewportIndicator);
          localStorage.setItem('ResponsiveViewportVisible', true);
        }
      } else {
        indicatorWrapper.removeChild(viewportIndicator);
        localStorage.setItem('ResponsiveViewportVisible', false);
      }
    }

    // Modernizr Indicator Show/Hide
    if (keycode === 77 && e.altKey) {
      if (!document.getElementById(modernizrIndicator.id)) {
        indicatorWrapper.appendChild(modernizrIndicator);
        localStorage.setItem('ResponsiveModernizrVisible', true);
      } else {
        indicatorWrapper.removeChild(modernizrIndicator);
        localStorage.setItem('ResponsiveModernizrVisible', false);
      }
    }
  }

  //////////////////////////////
  // Indicator Rewrite Functions
  //////////////////////////////

  // Viewport Width Display
  function viewport_width() {
    var widthPX = window.innerWidth;
    var widthEM = widthPX / 16;

    var viewportStatus = localStorage.getItem('ResponsiveViewportStorage');

    if (viewportStatus === 'px') {
      viewportIndicator.innerHTML = widthPX + 'px';
    }
    else if (viewportStatus === 'em') {
      viewportIndicator.innerHTML = widthEM + 'em';
    }
    else {
      viewportIndicator.innerHtml = widthEM + 'em';
      localStorage.setItem('ResponsiveViewportStorage', 'em');
    }
  }

  function modernizr_debug() {
    var modernizrStatus = localStorage.getItem('ResponsiveModernizrStorage');

    if (modernizrStatus === 'open') {
      removeClass(modernizrIndicator, 'closed');
      addClass(modernizrIndicator, 'open');
    }
    else if (modernizrStatus === 'closed') {
      removeClass(modernizrIndicator, 'open');
      addClass(modernizrIndicator, 'closed');
    }
  }

  //////////////////////////////
  // Document Binding
  //////////////////////////////
  document.onkeydown = indicatorToggle;

  window.onload = function () {
    viewportIndicator.innerHtml = window.innerWidth;

    var viewportVisible = localStorage.getItem('ResponsiveViewportVisible');
    var modernizrVisible = localStorage.getItem('ResponsiveModernizrVisible');

    if (viewportVisible === null) {
      viewportVisible = true;
    }
    if (modernizrVisible === null) {
      modernizrVisible = true;
    }

    if (viewportVisible !== 'false') {
      indicatorWrapper.appendChild(viewportIndicator);
    }
    if (modernizrVisible !== 'false') {
      indicatorWrapper.appendChild(modernizrIndicator);
    }

    document.body.appendChild(indicatorWrapper);
    document.body.appendChild(indicatorStyling);

    viewport_width();

    // Viewport Event Listener
    viewportIndicator.addEventListener('click', function () {
      var viewportStatus = localStorage.getItem('ResponsiveViewportStorage');

      if (viewportStatus === 'px') {
        localStorage.setItem('ResponsiveViewportStorage', 'em');
      }
      else if (viewportStatus === 'em') {
        localStorage.setItem('ResponsiveViewportStorage', 'px');
      }
      viewport_width();
    });

    // Modernizr Event Listener
    modernizrIndicator.innerHTML = document.getElementsByTagName('html')[0].classList;

    var modernizrStatus = localStorage.getItem('ResponsiveModernizrStorage');

    if (modernizrStatus === 'closed') {
      removeClass(modernizrIndicator, 'open');
      addClass(modernizrIndicator, 'closed');
    }

    modernizrIndicator.addEventListener('click', function () {
      var modernizrStatus = localStorage.getItem('ResponsiveModernizrStorage');

      if (modernizrStatus === 'closed') {
        localStorage.setItem('ResponsiveModernizrStorage', 'open');
      }
      else {
        localStorage.setItem('ResponsiveModernizrStorage', 'closed');
      }

      modernizr_debug();
    });
  };

  window.onresize = debounce(function () {
    viewport_width();
  }, 20);

})();