<template>
  <a class="gh-ribbon red right" href="https://github.com/driggl/linklog" target="_blank">Fork me on GitHub!</a>
</template>

<style lang="scss">
// Demo only:
body {
  background-color: #fff;
}

body.dark {
  background-color: #0a0a0a;
}

// Actual CSS:

$color-red: #aa0000;
$color-red-text: #ffffff;
$color-green: #007200;
$color-green-text: #ffffff;
$color-darkblue: #121621;
$color-darkblue-text: #ffffff;
$color-gray: #6d6d6d;
$color-gray-text: #ffffff;
$color-white: #ffffff;
$color-white-text: #000000;

// Base
.gh-ribbon {
  font-family: Helvetica, Arial, sans-serif;
  width: 600px;
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
  padding: 10px;
  text-decoration: none;
  position: fixed;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1000;
}

// Borders
.gh-ribbon:after {
  content: '';
  position: relative;
  display: block;
  top: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(255, 255, 255, 0.4);
}

.gh-ribbon:before {
  content: '';
  position: relative;
  display: block;
  bottom: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(255, 255, 255, 0.4);
}

.gh-ribbon.white:after {
  content: '';
  position: relative;
  display: block;
  top: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(0, 0, 0, 0.4);
}

.gh-ribbon.white:before {
  content: '';
  position: relative;
  display: block;
  bottom: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(0, 0, 0, 0.4);
}

// Place
.gh-ribbon.right {
  top: 15px;
  right: -285px; /* top - right = width / 2 */
  transform: rotate(45deg) translateY(100%);
}

.gh-ribbon.left {
  top: 15px;
  left: -285px; /* top - left = width / 2 */
  transform: rotate(-45deg) translateY(100%);
}

// Colors
.gh-ribbon.red {
  background-color: $color-red;
  color: $color-red-text;
}

.gh-ribbon.green {
  background-color: $color-green;
  color: $color-green-text;
}

.gh-ribbon.darkblue {
  background-color: $color-darkblue;
  color: $color-darkblue-text;
}

.gh-ribbon.gray {
  background-color: $color-gray;
  color: $color-gray-text;
}

.gh-ribbon.white {
  background-color: $color-white;
  color: $color-white-text;
}

@media screen and (max-width: 1263px) {
  // this css will only be used when the screen size is min 800px
  .gh-ribbon {
    display: none;
  }
}
</style>
