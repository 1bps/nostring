<template>
    <NostringForm>
        <NostringFormItem>
            <template #label>npub or nsec</template>

            <input v-model.trim="key" placeholder="npub... or nsec" required />

            <template #description>The name when people mention you.</template>
            <template #message>Name</template>
        </NostringFormItem>

        <NostringSpace justify="flex-end">
            <NostringButton type="primary" round @click="handleStart">Start Nostring</NostringButton>
        </NostringSpace>
</NostringForm>
</template>

<script setup lang="ts">
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools'

const auth = useAuth();

const key = ref('');

const emit = defineEmits(['close']);

const handleStart = () => {
    let k = nip19.decode(key.value);
    if (k.type == 'npub') {
        auth.login({ pubkey: k.data as string }, false);
        emit('close');
    }else if (k.type == 'nsec') {
        let seckey = k.data as string;
        let pubkey = getPublicKey(seckey);
        auth.login({ pubkey, seckey  }, false);
        emit('close');
    } else {

    }
}
</script>