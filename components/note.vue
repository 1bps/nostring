<template>
  <div class="note">
    <Avatar :image-url="note.profile.avatar" />
    <div class="content">
      <header>
        <div class="id">
          <NameDisplay>{{
            note.profile.displayName || note.profile.username || note.profile.pubkey.substr(0, 12)
          }}</NameDisplay>
          <Name>{{ note.profile.username || note.profile.pubkey.substr(0, 12) }}</Name>
          <Nip05 :profile="note.profile" :status="'verified'" />
        </div>
        <NostringText>
          <NostringTime :time="note.createdAt" relative />
        </NostringText>
      </header>
      <article>
        <div class="text">{{ note.content }}</div>
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
          <NostringButton text round type="tertiary">
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
  EllipsisHorizontalOutline
} from "@vicons/ionicons5";
interface Props {
  mini?: boolean;
  note: Object;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});
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

    article {}

    aside {
      .action {
        display: flex;
        gap: 3px;
        justify-content: space-between;
        margin-left: -15px;
        /* 15px of button padding - 3px of gap */
      }
    }
  }
}
</style>
