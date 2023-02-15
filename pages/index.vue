<template>
  <NuxtLayout name="primary">
    <ClientOnly>
      <div class="timeline">
        <div v-for="(note, noteIndex) in notes" :key="noteIndex" class="item">
          <Note :note="note" />
        </div>
      </div>
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { NoteModel } from "~~/composables/model/note";

const { data: notesData } = datasource.getNotes();
const notes = computed(() =>
  notesData.value
    .sort((a, b) => (b.event?.created_at || 0) - (a.event?.created_at || 0))
    .filter((n: any) => n.profile?.nip05)
    .filter((n: any) => n.profile?.nip05Status == "verified")
);
</script>

<style lang="scss">
.timeline {
  display: flex;
  flex-direction: column;

  .item {
    border-top: 1px solid #123;
    padding: 10px;

    &:last-child {
      border-bottom: 1px solid #123;
    }

    .note {
    }
  }
}
</style>
