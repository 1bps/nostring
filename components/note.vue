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
        </div>
        <NostringTime :time="note.createdAt" relative />
      </header>
      <article>
        <div class="text">{{ note.content }}</div>
        <div class="embeded"></div>
        <div class="meta"></div>
      </article>
      <aside>
        <div class="action">
          <NostringButton>Comment</NostringButton>
          <NostringButton>Repost</NostringButton>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
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
        justify-content: space-around;
      }
    }
  }
}
</style>
