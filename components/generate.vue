<template>
    <NostringSpace vertical gap="15">
        <NostringText>This is your private key. Please click to copy and save it secretly. DON NOT share this with anyone!
            Once others know this, they will own your account.</NostringText>
        <Key :nip19="nsec" />
        <NostringText>This is your public key for others to identity you.</NostringText>
        <Key :nip19="npub" />

        <NostringSpace justify="flex-end">
            <NostringButton round @click="generate">Generate New One</NostringButton>
            <NostringButton type="primary" round @click="handleStart">Start Nostring</NostringButton>
        </NostringSpace>
</NostringSpace>
</template>

<script setup lang="ts">

import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools'

const auth = useAuth();

const privateKey = ref('');
const publicKey = computed(() => privateKey.value && getPublicKey(privateKey.value));
const nsec = computed(() => privateKey.value && nip19.nsecEncode(privateKey.value));
const npub = computed(() => publicKey.value && nip19.npubEncode(publicKey.value));

const generate = () => {
    privateKey.value = generatePrivateKey();
}

generate();

const handleStart = () => {
    auth.login({ pubkey: publicKey.value, seckey: privateKey.value }, true);
}
</script>