<template>
  <div class="profile">
    <header :class="{
      'with-banner': !!profile.banner,
    }">
      <div v-if="profile.banner" class="banner" :style="{
        background: profile.banner
          ? `url(${profile.banner}) no-repeat center center`
          : `#667`,
        backgroundSize: profile.banner ? 'cover' : undefined,
      }" />
      <div class="content">
        <NostringSpace>
          <div class="avatar-wrapper">
            <Avatar :image-url="profile.avatar" />
          </div>
          <div class="actions">
            <NostringButton round>Chat</NostringButton>
            <NostringButton round primary type="primary">Follow</NostringButton>
          </div>
        </NostringSpace>
        <NameDisplay header>{{
          profile.displayName || profile.username || profile.pubkey.substr(0, 12)
        }}</NameDisplay>
        <Name :value="profile.username || profile.pubkey.substr(0, 12)" />
      </div>
    </header>
    <div>{{ profile.bio }}</div>
    <div>0 Following 0 Follower</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  mini?: boolean;
  profile: Object;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  gap: 5px;

  header {
    padding-top: 78px;
    /* 128/2+10 */

    .banner {
      height: 196px;
    }

    .content {
      padding: 10px;
      display: flex;
      flex-direction: column;

      .avatar-wrapper {
        position: relative;
        width: 21.33%;
        max-width: 138px;
        /* 128+5x2 */
        max-height: 138px;
        padding-bottom: 21.33%;

        .avatar {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        margin-top: -10.665%;
        /* 21.33/2 */
      }

      .actions {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-end;
        gap: 10px;
      }
    }

    &.with-banner {
      padding: 0;
    }
  }
}
</style>
