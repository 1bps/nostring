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
import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
} from "nostr-tools";
import note from "@/composables/model/note";

const notes = ref<any[]>([]);

const relay = relayInit("wss://relay.damus.io");
if (process.client) {
  await relay.connect();

  relay.on("connect", () => {
    console.log(`connected to ${relay.url}`);
  });
  relay.on("error", () => {
    console.log(`failed to connect to ${relay.url}`);
  });

  // let's query for an event that exists
  let sub = relay.sub([
    {
      kinds: [1],
    },
  ]);
  sub.on("event", (event: any) => {
    console.log("we got the event we wanted:", event);
    if (event.kind == 1) {
      notes.value.push(note.fromEvent(event));
    }
  });
  sub.on("eose", () => {
    sub.unsub();
  });
}
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
