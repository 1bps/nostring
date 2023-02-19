<template>
  <NuxtLayout name="primary">
    <ClientOnly>
      <Timeline :note="notes" :show-replyings="true" />
    </ClientOnly>
</NuxtLayout>
</template>

<script setup lang="ts">
import { NoteModel } from "~~/composables/model/note";

const { data: notesData } = datasource.getNotes();
const notes = computed(() =>
  notesData.value
    .sort((a, b) => (b.event?.created_at || 0) - (a.event?.created_at || 0))
    .filter((n: any) => n.profile?.metadata?.nip05)
    .filter((n: any) => n.profile?.nip05?.status == "verified")
);
</script>
