<template>
  <div class="note" :class="{
    'note-layout-detail': detailMode
  }">
    <header>
      <NuxtLink :to="`/p/${note.author?.nip19}`" class="note-avatar">
        <Avatar :image-url="note.author?.metadata?.picture" />
      </NuxtLink>
      <NostringSpace class="header-content">
        <NuxtLink :to="`/p/${note.author?.nip19}`">
          <NostringSpace class="id" gap="1" :vertical="detailMode">
            <NameDisplay>{{
              note.author?.metadata?.display_name ||
              note.author?.metadata?.name ||
              note.author?.pubkey?.substring(0, 12)
            }}</NameDisplay>
            <NostringSpace gap="1" style="align-items: center">
              <Name>{{
                note.author?.metadata?.name ||
                `${note.author?.nip19?.substr(4, 8)}:${note.author?.nip19?.substr(
                  note.author?.nip19?.length - 8
                )}`
              }}</Name>
              <Nip05 v-if="note.author?.metadata?.nip05" :profile="note.author" :status="'loading'"
                :show-detail="detailMode" />
            </NostringSpace>
          </NostringSpace>
        </NuxtLink>
        <NuxtLink v-if="!detailMode" :to="`/e/${note.nip19}`">
          <NostringText>
            <NostringTime :time="note.createdAt" relative />
          </NostringText>
        </NuxtLink>
      </NostringSpace>
    </header>
    <div class="content">
      <article>
        <Replying v-if="showReplyings" style="margin-bottom: 5px" />
        <Text />
        <div class="embeded"></div>
        <div class="meta"></div>
      </article>
      <aside>
        <NostringText v-if="detailMode" type="tertiary">
          <NostringTime :time="note.createdAt" />
        </NostringText>
        <div class="action">
          <NostringButton text round type="tertiary">
            <template #icon>
              <NostringIcon>
                <ChatboxOutline />
              </NostringIcon>
            </template>
            {{ note.replies?.length || '' }}
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
import { nip19 } from "nostr-tools";
import {
  ChatboxOutline,
  RepeatOutline,
  ThumbsUpOutline,
  FlashOutline,
  EllipsisHorizontalOutline,
} from "@vicons/ionicons5";

import Mention from "@/components/mention.vue";
import NostringText from "@/components/nostring/text.vue";
import NostringSpace from "@/components/nostring/space.vue";
import { NoteModel } from "~~/composables/model/note";
import LightningInvoice from "@/components/lightning/invoice.vue";
import { EventTagEvent, EventTagProfile } from "~~/composables/model/event/tag";

interface Props {
  mini?: boolean;
  note: NoteModel;
  showReplyings?: boolean;
  detailMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
  showReplyings: false,
  datailMode: false,
});

const Replying = {
  render: () => {
    if (props.note.event?.tags.some(tag => {
      if (tag && tag.length >= 1 && tag[0] == 'e') {
        let ete = new EventTagEvent(tag);
        return ete.marker == 'root' || ete.marker == 'reply';
      }
    })) {
      let eventTagProfiles: any[] = props.note.event?.tags
        .filter(tag => tag && tag.length >= 2 && tag[0] == 'p')
        .map(tag => new EventTagProfile(tag));

      if (eventTagProfiles.length) {
        return h(NostringSpace, {}, {
          default: () => {
            let children: any[] = [h(NostringText, { type: 'tertiary' }, { default: () => 'replying to' })];
            let foo = (tagProfile: EventTagProfile) => h(Mention, { profile: datasource.getProfile(tagProfile.id).data.value }, {})
            children.push(foo(eventTagProfiles[0]));
            if (eventTagProfiles.length == 2) {
              children.push(h(NostringText, { type: 'tertiary' }, { default: () => '&' }))
              children.push(foo(eventTagProfiles[1]));
            } else if (eventTagProfiles.length > 2) {
              children.push(h(NostringText, { type: 'tertiary' }, { default: () => ',' }));
              children.push(foo(eventTagProfiles[1]));
              children.push(h(NostringText, { type: 'tertiary' }, { default: () => `& ${eventTagProfiles.length - 2} others` }));
            }
            return children;
          }
        });
      }
    }
  }
}
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
            return p.split(/(lnbc[a-z0-9]+)/i).map((e) => {
              let match = e.match(/lnbc[a-z0-9]+/i);
              if (match) {
                return h(LightningInvoice, { invoice: e }, {});
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
  flex-flow: column;
  gap: 8px;

  header {

    .note-avatar {
      position: absolute;

      .avatar {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
      }
    }

    .header-content {
      margin-left: 56px;
    }

  }

  .content {
    padding-left: 56px;
    display: flex;
    flex-direction: column;

    gap: 5px;

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

  &.note-layout-detail {
    header {

      .note-avatar {}
    }

    .content {
      padding-left: 0;

      aside {
        .action {
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
