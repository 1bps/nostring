<template>
  <div class="note">
    <Avatar :image-url="note.profile.avatar" />
    <div class="content">
      <header>
        <div class="id">
          <NameDisplay>{{
            note.profile.displayName ||
            note.profile.name ||
            note.profile.pubkey.substr(0, 12)
          }}</NameDisplay>
          <Name>{{ note.profile.name || note.profile.pubkey.substr(0, 12) }}</Name>
          <Nip05
            v-if="note.profile?.nip05"
            :profile="note.profile"
            :status="'verified'"
          />
        </div>
        <NostringText>
          <NostringTime :time="note.createdAt" relative />
        </NostringText>
      </header>
      <article>
        <div class="text">
          <template v-for="(part, partIndex) in contentParts" :key="partIndex">
            <template
              v-if="
                /#\[\d+]/.test(part) &&
                note.tags.length > +part.substring(2, part.length - 1)
              "
            >
              {{ void (tag = note.tags[+part.substring(2, part.length - 1)]) }}
              <span v-if="tag[0] === 'p'"
                >@{{ nip19.npubEncode(tag[1]).substr(4, 8) }}:{{
                  nip19.npubEncode(tag[1]).substr(nip19.npubEncode(tag[1]).length - 8)
                }}</span
              >
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

      .id {
        display: flex;
        gap: 3px;
      }
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
