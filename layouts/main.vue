<template>
  <div class="app">
    <header role="banner">
      <nav>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <HomeOutline />
            </NostringIcon>
          </template>
          Home
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <SearchOutline />
            </NostringIcon>
          </template>
          Discovery
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <MailOutline />
            </NostringIcon>
          </template>
          Messages
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <NotificationsOutline />
            </NostringIcon>
          </template>
          Notifications
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <PeopleOutline />
            </NostringIcon>
          </template>
          Channels
        </NostringButton>
      </nav>
    </header>
    <main role="main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  HomeOutline,
  SearchOutline,
  MailOutline,
  NotificationsOutline,
  PeopleOutline,
} from "@vicons/ionicons5";
</script>

<style lang="scss">
.app {
  height: 100%;
  display: flex;
  min-height: 512px;

  >header {
    flex-grow: 1;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    user-select: none;

    >nav {
      width: 275px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  >main {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;

    display: flex;
  }
}
</style>
