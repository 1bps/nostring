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
        <NameDisplay header>{{
          profile.displayName || profile.username || profile.pubkey.substr(0, 12)
        }}</NameDisplay>
        <NostringSpace gap="0">
          <Name :value="profile.username || profile.pubkey.substr(0, 12)" />
          <Nip05 v-if="profile.nip05" :profile="profile" :status="'verified'" />
        </NostringSpace>
        <NostringSpace gap="0" style="padding: 5px 10px; background: #222; border-radius: 5px;margin-top: 10px">
          <NostringText type="tertiary" style="margin-right: 3px">
            <NostringIcon>
              <KeyOutline />
            </NostringIcon>
          </NostringText>
          <NostringText type="tertiary">{{ profile.nip19.substr(0, 4) }}
          </NostringText>
          <NostringText type="tertiary" ellipsis style="flex-shrink: 1;">
            {{
              profile.nip19.substr(4,
                profile.nip19.length - 32)
            }}
          </NostringText>
          <NostringText type="tertiary">{{ profile.nip19.substring(profile.nip19.length - 16) }}
          </NostringText>
          <NostringText type="" style="margin-left: 3px">
            <NostringIcon>
              <CopyOutline />
            </NostringIcon>
          </NostringText>
        </NostringSpace>

      </div>
    </header>
    <div class="bio">{{ profile.bio }}</div>
    <div class="meta">
      <NostringSpace>
        <NostringButton text v-if="profile.website">
          <template #icon>
            <NostringIcon>
              <LinkOutline />
            </NostringIcon>
          </template>
          {{ profile.website }}
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
    <div class="stat">0 <NostringText type="tertiary">Following</NostringText> 0 <NostringText type="tertiary">Follower
      </NostringText>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FlashOutline,
  MailOutline,
  EllipsisHorizontalOutline,
  LinkOutline,
  KeyOutline,
  CopyOutline
} from "@vicons/ionicons5";

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
        position: relative;
        width: 21.33%;
        max-width: 138px;
        /* 128+5x2 */
        max-height: 138px;
        padding-bottom: 21.33%;
        flex-shrink: 0;

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
  }

  .bio {
    padding-left: 10px;
    padding-right: 10px;
  }

  .meta {
    padding: 5px 10px;
  }

  .stat {
    padding: 5px 10px;
  }
}
</style>
