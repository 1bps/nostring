<template>
  <NuxtLayout name="primary">
    <Thread :note="note" />
</NuxtLayout>
</template>

<script setup lang="ts">
import { nip19 } from "nostr-tools";

const route = useRoute();

let hex = "";

{
  let id = route.params.id as string;

  if (/^n[A-Za-z0-9]+$/.test(id)) {
    let result = nip19.decode(id);

    if (result.type === "note") {
      hex = result.data as string;
    }
  } else if (/^[A-Fa-f0-9]{64}/.test(id)) {
    hex = id;
  } else {
    console.error("unknown id:", id);
  }

  if (hex) {
    console.info("hex", hex);
  }
}

const { data: note } = datasource.getNote(hex);
</script>

<script lang="ts"></script>
