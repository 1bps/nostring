<template>
  <NuxtPage />
</template>

<style lang="scss">
:root {
  --text-color: rgba(255, 255, 255, .667);
  --text-color-primary: rgba(255, 255, 255, .833);
  --text-color-tertiary: rgba(255, 255, 255, .333);
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
  background-color: #000;
  scrollbar-color: #666 #333;
  color: var(--text-color);
}

div#__nuxt {
  height: 100%;
}
</style>
