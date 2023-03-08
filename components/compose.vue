<template>
    <NostringForm>
        <NostringFormItem>
            <template #label></template>
            <textarea v-model.trim="content" placeholder="" />
        </NostringFormItem>
        <NostringSpace justify="end">
            <NostringButton type="primary" round @click="handlePublish">Publish</NostringButton>
        </NostringSpace>
    </NostringForm>
</template>

<script setup lang="ts">
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools'

const auth = useAuth();

const emit = defineEmits(['update', 'close']);

const content = ref<string>('');

const handlePublish = () => {
    if (auth.currentIdentity) {
        datasource.publishContent(content.value, auth.currentIdentity, () => {
        });
    }
    content.value = '';
    emit('close');
}
</script>