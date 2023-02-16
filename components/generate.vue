<template>
    <NostringSpace vertical>
        <Key :nip19="nsec" />
        <Key :nip19="npub" />
    </NostringSpace>
</template>

<script setup lang="ts">
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools'

let privateKey = generatePrivateKey();
let publicKey = getPublicKey(privateKey);

const nsec = nip19.nsecEncode(privateKey);
const npub = nip19.npubEncode(publicKey);
</script>