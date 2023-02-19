<template>
  <NuxtLayout name="primary">
    <ClientOnly>
      <Profile :profile="profile" />
      <Timeline :notes="notes.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))" />
    </ClientOnly>
</NuxtLayout>
</template>

<script setup lang="ts">
import { nip05, nip19 } from "nostr-tools";

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
    let nip05Profile = await nip05.queryProfile(id);
    hex = nip05Profile?.pubkey || "";
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
