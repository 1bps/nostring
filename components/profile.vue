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
            <NostringButton text round>
              <template #icon>
                <NostringIcon>
                  <EllipsisHorizontalOutline />
                </NostringIcon>
              </template>
            </NostringButton>
            <NostringButton text round>
              <template #icon>
                <NostringIcon>
                  <FlashOutline />
                </NostringIcon>
              </template>
            </NostringButton>
            <NostringButton text round>
              <template #icon>
                <NostringIcon>
                  <MailOutline />
                </NostringIcon>
              </template>
            </NostringButton>
            <NostringButton round primary type="primary">Follow</NostringButton>
          </div>
        </NostringSpace>
        <NameDisplay header :profile="profile" />
        <NostringSpace gap="0" style="align-items: center">
          <Name :value="profile.name || profile.pubkey.substr(0, 12)" />
          <Nip05 v-if="profile.nip05" :profile="profile" :status="'loading'" :show-detail="true" />
        </NostringSpace>
        <div>
          <Key :nip19="profile.nip19" />
        </div>
      </div>
    </header>
    <div class="bio">{{ profile.bio }}</div>
    <div class="meta">
      <NostringSpace gap="0">
        <NostringButton v-if="profile.website" tag="span" text>
          <template #icon>
            <NostringIcon>
              <LinkOutline />
            </NostringIcon>
          </template>
          <NuxtLink :to="profile.website">
            {{ profile.website.replace(/https?:\/\//, "") }}
          </NuxtLink>
        </NostringButton>
        <NostringButton text v-if="profile.lud16">
          <template #icon>
            <NostringIcon>
              <FlashOutline />
            </NostringIcon>
          </template>
          {{ profile.lud16 }}
        </NostringButton>
      </NostringSpace>
    </div>
    <div class="stat">
      {{ followingNumber || 0 }} <NostringText type="tertiary">Following</NostringText> 0
      <NostringText type="tertiary">Follower </NostringText>
    </div>
</div>
</template>

<script setup lang="ts">
import {
  FlashOutline,
  MailOutline,
  EllipsisHorizontalOutline,
  LinkOutline,
} from "@vicons/ionicons5";
import { ProfileModel } from "~~/composables/model/profile";

interface Props {
  mini?: boolean;
  profile: ProfileModel;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const followingNumber = computed(() =>
  props.profile.contacts?.value?.list?.length
);
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  gap: 5px;

  header {
    padding-top: 88px;

    &.with-banner {
      padding: 0;
    }

    .banner {
      height: 196px;
    }

    .content {
      padding: 10px;
      display: flex;
      flex-direction: column;

      .avatar-wrapper {
        --width: calc(min(max(21.33%, 74px), 138px));
        position: relative;
        width: var(--width);
        padding-bottom: var(--width);
        margin-top: calc(37px - var(--width));
        flex-shrink: 0;

        .avatar {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
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
  }

  .bio {
    padding-left: 10px;
    padding-right: 10px;
  }

  .meta {
    padding-left: 3px;
    padding-right: 3px;
  }

  .stat {
    padding: 5px 10px;
  }
}
</style>
