<template>
  <NuxtLayout name="main">
    <ClientOnly>
      <div class="primary">
        <slot />
      </div>
      <aside class="sidebar">
        <nav>
          <span>Login</span>
          <span>Register</span>
        </nav>
      </aside>
    </ClientOnly>
  </NuxtLayout>
</template>

<style lang="scss">
.primary {
  max-width: 600px;
  width: 100%;
  border-left: 1px solid #123;
  border-right: 1px solid #123;
}
.sidebar {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  nav {
    display: flex;
    flex-direction: column;
  }
}
</style>
