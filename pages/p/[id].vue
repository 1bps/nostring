<template>
  <NuxtLayout name="primary">
    <ClientOnly>
      <Profile :profile="profile" />
      <div class="timeline">
        <div v-for="(note, noteIndex) in notes.sort((a, b) => b.createdAt - a.createdAt)" :key="noteIndex" class="item">
          <Note :note="note" />
        </div>
      </div>
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as nip05 from "nostr-tools/nip05";
import * as nip19 from "nostr-tools/nip19";

const route = useRoute();

let hex = "";

{
  let id = route.params.id as string;

  if (/^n[A-Za-z0-9]+$/.test(id)) {
    let result = nip19.decode(id);
    if (result.type === "npub") {
      hex = result.data as string;
    }
  } else if (/^([A-Za-z0-9-_]+@)?\w+(\.\w+)+$/.test(id)) {
    let profile = await nip05.queryProfile(id);
    hex = profile?.pubkey || "";
  } else if (/^[A-Fa-f0-9]{64}/.test(id)) {
    hex = id;
  } else {
    console.error("unknown id:", id);
  }

  if (hex) {
    console.info("hex", hex);
  }
}

const { data: profile } = datasource.getProfile(hex);
const { data: notes } = datasource.getNotesOfPubkey(hex);
</script>

<script lang="ts"></script>

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

    .note {}
  }
}
</style>
