<template>
  <NuxtLayout name="primary">
    <ClientOnly>
      <Note :note="note" />
      <Timeline :notes="replies" />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as nip19 from "nostr-tools/nip19";

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
const { data: replies } = datasource.getReplies(hex);
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

    .note {
    }
  }
}
</style>
