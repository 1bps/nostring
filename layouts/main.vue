<template>
  <div class="app">
    <header role="banner">
      <nav>
        <NuxtLink to="/">
          <NostringButton size="xl" justify="flex-start" text>
            <template #icon>
              <NostringIcon>
                <IconHome :size="18" />
              </NostringIcon>
            </template>
            <NostringText class="nav-item-label">Home</NostringText>
          </NostringButton>
        </NuxtLink>
        <NuxtLink to="/global">
          <NostringButton size="xl" justify="flex-start" text>
            <template #icon>
              <NostringIcon>
                <IconSearch :size="18" />
              </NostringIcon>
            </template>
            <NostringText class="nav-item-label">Discovery</NostringText>
          </NostringButton>
        </NuxtLink>
        <NostringButton v-if="auth.currentIdentity" size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <IconMail :size="18" />
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Messages</NostringText>
        </NostringButton>
        <NostringButton size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <IconUsers />
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Channels</NostringText>
        </NostringButton>
        <NostringButton v-if="auth.currentIdentity" size="xl" justify="flex-start" text>
          <template #icon>
            <NostringIcon>
              <IconBell :size="18"/>
            </NostringIcon>
          </template>
          <NostringText class="nav-item-label">Notifications</NostringText>
        </NostringButton>
        <NuxtLink v-if="auth.currentIdentity" :to="`/p/${auth.currentProfile?.nip19}`">
          <NostringButton size="xl" justify="flex-start" text>
            <template #icon>
              <NostringIcon>
                <IconUser :size="18" />
              </NostringIcon>
            </template>
            <NostringText class="nav-item-label">Profile</NostringText>
          </NostringButton>
        </NuxtLink>
      </nav>

      <nav v-if="auth.currentIdentity" style="position:absolute; bottom: 10px">
        <div>
          <div style="position: absolute">
            <Avatar :image-url="auth.currentProfile?.metadata?.picture" style="width: 48px;
                    height: 48px;" />
          </div>
          <NostringSpace class="id" gap="1" vertical style="padding-left: 56px">
            <NameDisplay>{{
              auth.currentProfile?.metadata?.display_name ||
              auth.currentProfile?.metadata?.name ||
              auth.currentProfile?.pubkey?.substring(0, 12)
            }}</NameDisplay>
            <NostringSpace gap="1" style="align-items: center">
              <Name>{{
                auth.currentProfile?.metadata?.name ||
                `${auth.currentProfile?.nip19?.substr(4, 8)}:${auth.currentProfile?.nip19?.substr(
                  auth.currentProfile?.nip19?.length - 8
                )}`
              }}</Name>
              <Nip05 v-if="auth.currentProfile?.metadata?.nip05" :profile="auth.currentProfile" :status="'loading'"
                :show-detail="false" />
            </NostringSpace>
          </NostringSpace>
        </div>
      </nav>
    </header>
    <main role="main">
      <slot />
    </main>

    <NostringModal v-model:show="auth.showProfileFormModal">
      <NostringCard size="l">
        <ProfileForm @close="auth.showProfileFormModal = false" />
      </NostringCard>
    </NostringModal>
  </div>
</template>

<script setup lang="ts">
import {
  IconHome,
  IconSearch,
  IconMail,
  IconBell,
  IconUser,
  IconUsers
} from '@tabler/icons-vue';

const auth = useAuth();
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
    max-width: 33.33%;

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
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        flex-direction: row;
        background: var(--bg-color);
        border-top: 1px solid #123;
        z-index: 1;
        padding: 0 12px;
        justify-content: space-between;
      }
    }
  }
}
</style>
