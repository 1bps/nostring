<template>
  <div class="note">
    <NuxtLink :to="`/p/${note.profile.nip19}`">
      <Avatar :image-url="note.profile.avatar" />
    </NuxtLink>
    <div class="content">
      <header>
        <NostringSpace class="id" gap="1" style="align-items: center">
          <NameDisplay>{{
            note.profile.displayName ||
              note.profile.name ||
              note.profile.pubkey.substr(0, 12)
          }}</NameDisplay>
          <Name>{{
            note.profile.name ||
              `${note.profile.nip19.substr(4, 8)}:${note.profile.nip19.substr(
                note.profile.nip19.length - 8
              )}`
          }}</Name>
          <Nip05 v-if="note.profile?.nip05" :profile="note.profile" :status="'loading'" />
        </NostringSpace>
        <NostringText>
          <NostringTime :time="note.createdAt" relative />
        </NostringText>
      </header>
      <article>
        <div class="text">
          <template v-for="(part, partIndex) in contentParts" :key="partIndex">
            <template v-if="
              /#\[\d+]/.test(part) &&
              note.tags.length > +part.substring(2, part.length - 1)
            ">
              {{ void(tag = note.tags[+part.substring(2, part.length - 1)]) }}
              <template v-if="tag[0] === 'p'">
                {{ void(tagProfile = datasource.getProfile(tag[1]).data) }}
                <NuxtLink :to="`/p/${tagProfile.nip19}`" style="display: inline-flex; align-items: center;">
                  @{{
                    tagProfile.name ||
                      `${tagProfile.nip19.substr(4, 8)}:${tagProfile.nip19.substr(
                        tagProfile.nip19.length - 8
                      )}`
                  }}
                  <Nip05 v-if="tagProfile?.nip05" :profile="tagProfile" :status="'loading'" />
                </NuxtLink>
              </template>
              <span v-if="tag[0] === 'e'">[note]{{ tag[1] }}</span>
            </template>
            <template v-else>{{ part }}</template>
          </template>
        </div>
        <div class="embeded"></div>
        <div class="meta"></div>
      </article>
      <aside>
        <div class="action">
          <NostringButton text round type="tertiary">
            <template #icon>
              <NostringIcon>
                <ChatboxOutline />
              </NostringIcon>
            </template>
          </NostringButton>
          <NostringButton text round type="tertiary">
            <template #icon>
              <NostringIcon>
                <RepeatOutline />
              </NostringIcon>
            </template>
          </NostringButton>
          <NostringButton text round type="tertiary">
            <template #icon>
              <NostringIcon>
                <ThumbsUpOutline />
              </NostringIcon>
            </template>
          </NostringButton>
          <NostringButton text round type="tertiary">
            <template #icon>
              <NostringIcon>
                <FlashOutline />
              </NostringIcon>
            </template>
          </NostringButton>
          <NostringButton text round type="tertiary" @click="handleClick">
            <template #icon>
              <NostringIcon>
                <EllipsisHorizontalOutline />
              </NostringIcon>
            </template>
          </NostringButton>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChatboxOutline,
  RepeatOutline,
  ThumbsUpOutline,
  FlashOutline,
  EllipsisHorizontalOutline,
} from "@vicons/ionicons5";
import * as nip19 from "nostr-tools/nip19";

interface Props {
  mini?: boolean;
  note: Object;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const contentParts = computed(() => {
  return props.note.content.split(/(?=#\[\d+\])|(?<=#\[\d+\])/);
});

const handleClick = () => {
  console.info("note event", props.note.event);
};
</script>

<style lang="scss">
.note {
  display: flex;
  flex-flow: row;
  gap: 8px;

  .avatar {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    gap: 5px;

    header {
      display: flex;
      gap: 4px;
    }

    article {
      .text {
        word-break: break-word;
      }
    }

    aside {
      .action {
        display: flex;
        gap: 3px;
        justify-content: space-between;
        margin-left: -8px;
      }
    }
  }
}
</style>
