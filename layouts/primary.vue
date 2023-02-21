<template>
  <NuxtLayout name="main">
    <ClientOnly>
      <div class="primary">
        <slot />
      </div>
      <aside class="sidebar">
        <nav>
          <NostringCard v-if="!auth.currentIdentity">
            <NostringSpace vertical gap="10">
              <NostringText type="primary">Start Nostring</NostringText>
              <NostringButton round size="l">Login with npub/nsec</NostringButton>
              <NostringButton round size="l">Login with Nostx/Alby</NostringButton>
              <NostringButton type="primary" round size="l" @click="handleGenerate">Generate Identity</NostringButton>
            </NostringSpace>
          </NostringCard>
        </nav>

        <footer>
          <NostringSpace justify="center">
            <NostringText type="tertiary" size="s">
              Nostring
            </NostringText>
            <NuxtLink href="https://github.com/1bps/nostring">
              <NostringText type="tertiary" size="s">
                <NostringIcon>
                  <LogoGithub />
                </NostringIcon>
              </NostringText>
            </NuxtLink>
          </NostringSpace>
        </footer>
      </aside>
      <NostringModal v-model:show="showGenModal">
        <NostringCard size="l">
          <Generate />
        </NostringCard>
      </NostringModal>
    </ClientOnly>
</NuxtLayout>
</template>

<script setup lang="ts">
import {
  LogoGithub
} from "@vicons/ionicons5";

const auth = useAuth();

const showGenModal = ref(false);

const handleGenerate = () => {
  showGenModal.value = true;
}

</script>

<style lang="scss">
.primary {
  max-width: 600px;
  width: 100%;
  border-left: 1px solid #123;
  border-right: 1px solid #123;
  flex-grow: 1;
  flex-shrink: 1;
}

.sidebar {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;

  nav {
    display: flex;
    flex-direction: column;
  }

  footer {
    padding: 12px;
  }
}

@media screen and (max-width: 1004px) {
  .sidebar {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  .primary {
    border: none;
  }
}
</style>
