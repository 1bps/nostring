<template><NuxtPage /></template>

<style lang="scss">
:root {
  --bg-color: #000;
  --text-color: rgba(255, 255, 255, .667);
  --text-color-primary: rgba(255, 255, 255, .833);
  --text-color-tertiary: rgba(255, 255, 255, .333);
  --text-color-success: #109510;
}

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0px;
  background-color: var(--bg-color);
  scrollbar-color: #666 #333;
  color: var(--text-color);
}

a {
  text-decoration: none;
  color: #2a99ee;
}

div#__nuxt {
  height: 100%;
}
</style>
