<template>
  <NuxtLayout name="primary">
    <ClientOnly>
      <Profile :profile="profile" />
      <div class="timeline">
        <div
          v-for="(note, noteIndex) in notes.sort((a, b) => b.createdAt - a.createdAt)"
          :key="noteIndex"
          class="item"
        >
          <Note :note="note" />
        </div>
      </div>
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import note from "@/composables/model/note";
import * as _nostrTools from "nostr-tools";
import * as nip05 from "nostr-tools/nip05";
import * as nip19 from "nostr-tools/nip19";

const {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
} = _nostrTools;

const route = useRoute();

const hex = ref<string>("");

{
  let id = route.params.id as string;

  if (/^n[A-Za-z0-9]+$/.test(id)) {
    let result = nip19.decode(id);
    if (result.type === "npub") {
      hex.value = result.data as string;
    }
  } else if (/^([A-Za-z0-9-_]+@)?\w+(\.\w+)+$/.test(id)) {
    let profile = await nip05.queryProfile(id);
    hex.value = profile?.pubkey || "";
  } else if (/^[A-Fa-f0-9]{64}/.test(id)) {
    hex.value = id;
  } else {
    console.error("unknown id:", id);
  }

  if (hex.value) {
    console.info("hex", hex.value);
  }
}

const profile: any = datasource.profile(hex.value);
const notes = ref<any[]>([]);

if (process.client) {
  const relay = relayInit("wss://relay.damus.io");
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
      authors: [hex.value],
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
