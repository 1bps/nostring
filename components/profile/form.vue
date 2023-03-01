<template>
    <NostringForm>
        <NostringFormItem>
            <template #label>Name</template>

            <input v-model.trim="model.name" placeholder="nostring" required />

            <template #description>The name when people mention you.</template>
            <template #message>Name</template>
        </NostringFormItem>
        <NostringFormItem>
            <template #label>Display Name</template>

            <input v-model.trim="model.display_name" placeholder="Nostring.io" required />

            <template #description>The name displayed as your nickname.</template>
            <template #message>Name</template>
        </NostringFormItem>
        <NostringFormItem>
            <template #label>Avatar Picture URL</template>
            
            <input v-model.trim="model.picture" placeholder="" />

            <template #description>The best picture is a square.</template>
        </NostringFormItem>
        <NostringFormItem>
            <template #label>Banner Picture URL</template>

            <input v-model.trim="model.banner" placeholder="" />
        </NostringFormItem>
        <NostringFormItem>
            <template #label>Bio</template>

            <textarea v-model.trim="model.about" placeholder="" />
        </NostringFormItem>
        <NostringFormItem>
            <template #label>NIP-05</template>

            <input v-model.trim="model.nip05" placeholder="" />

            <template #description>
                <template v-if="model.nip05?.match(/(?:[A-Za-z0-9-_]+@)?(\w+\.)+[A-Z-a-z]{2,}/)">
                    Using {{ model.nip05 }} as NIP-05 Identity.
                </template>
                <template v-else>
                    NIP-05 Identity should be like a email address.
                </template>
            </template>
        </NostringFormItem>
        <NostringFormItem>
            <template #label>LUD-16</template>

            <input v-model.trim="model.lud16" placeholder="someone@getalby.com" />

            <template #description>
                <template v-if="model.lud16?.match(/(?:[A-Za-z0-9-_]+@)?(\w+\.)+[A-Z-a-z]{2,}/) || model.lud16?.match(/I\w+/i)">
                    Looks well.
                </template>
                <template v-else>
                    LUD-16 Identity should be like a email address.
                </template>
            </template>
        </NostringFormItem>
        <NostringSpace justify="end">
            <NostringButton type="primary" round @click="handleSave">Save Profile</NostringButton>
        </NostringSpace>
</NostringForm>
</template>

<script setup lang="ts">
import {nip05} from 'nostr-tools';

const auth = useAuth();

const model = ref<any>({});

watch(()=>auth.currentProfile, ()=>{
    if(auth.currentProfile){
        Object.assign(model.value, auth.currentProfile.metadata);
    }
})


const handleSave = () => {
    if (auth.currentIdentity) {
        datasource.updateProfile(JSON.stringify(model.value), auth.currentIdentity, () => {
        });
    }
}
</script>

<style lang="scss"></style>