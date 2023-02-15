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
        <Text />
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

import Mention from "@/components/mention.vue";
import NostringText from "@/components/nostring/text.vue";
import { NoteModel } from "~~/composables/model/note";
import LightningInvoice from "@/components/lightning/invoice.vue";

interface Props {
  mini?: boolean;
  note: NoteModel;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const Text = {
  render: () => {
    let parts: any[] = [props.note.content];

    try {
      parts = parts
        .map((p) => {
          if (typeof p === "string") {
            return p.split(/(#\[\d+\])/).map((e) => {
              let match = e.match(/#\[(\d+)\]/);
              if (match) {
                let tagIndex = parseInt(match[1]);
                let tag = props.note.event?.tags[tagIndex];
                if (tag) {
                  switch (tag[0]) {
                    case "p": {
                      return h(
                        Mention,
                        { profile: datasource.getProfile(tag[1]).data.value },
                        { defaul: () => "" }
                      );
                    }
                    case "e": {
                      return nip19.noteEncode(tag[1]);
                    }

                    case "t": {
                      return e;
                    }
                  }
                }
                return h(NostringText, { type: "error" }, { default: () => e });
              }
              return e;
            });
          }
          return p;
        })
        .flat()
        .map((p) => {
          if (typeof p === "string") {
            return p.split(/(lnbc[a-z0-9]+)/i).map((e)=>{
              let match = e.match(/lnbc[a-z0-9]+/i);
              if(match){
                return h(LightningInvoice, {invoice: e}, {});
              }
              return e;
            });
          }
          return p;
        })
        .flat()
        .map((p) => {
          if (typeof p === "string") {
            return h(NostringText, {}, { default: () => p });
          }
          return p;
        });
    } catch (e) {
      console.error(e);
    }
    return h("div", { class: "text" }, { default: () => parts });
  },
};

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
