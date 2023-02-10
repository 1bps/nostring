<template>
  <div class="app">
    <header role="banner">
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/">Discovery</NuxtLink>
        <NuxtLink to="/">Settings</NuxtLink>
      </nav>
    </header>
    <main role="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.app {
  height: 100%;
  display: flex;
  min-height: 512px;
  > header {
    flex-grow: 1;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    user-select: none;

    > nav {
      width: 275px;
      display: flex;
      flex-direction: column;
    }
  }
  > main {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;

    display: flex;
  }
}
</style>
