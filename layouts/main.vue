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
          <NostringText class="nav-item-label">Home</NostringText>
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <SearchOutline />
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Discovery</NostringText>
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <MailOutline />
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Messages</NostringText>
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <NotificationsOutline />
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Notifications</NostringText>
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <PeopleOutline />
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Channels</NostringText>
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
    max-width: 100%;

    display: flex;

  }
}

@media screen and (max-width: 1280px) {
  .app {
    >header {
      >nav {
        width: auto;

        .nav-item-label {
          display: none
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .app {
    >header {
      >nav {
        display: none;
      }
    }
  }
}
</style>
