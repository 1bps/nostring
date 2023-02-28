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
        </NostringFormItem>
        <NostringFormItem>
            <template #label>Banner Picture URL</template>
            
            <input v-model.trim="model.banner" placeholder="" />
        </NostringFormItem>
        <NostringFormItem>
            <template #label>Bio</template>
            
            <input v-model.trim="model.about" placeholder="" />
        </NostringFormItem>
        <NostringFormItem>
            <template #label>NIP-05</template>
            
            <input v-model.trim="model.nip05" placeholder="" />
        </NostringFormItem>
        <NostringFormItem>
            <template #label>LUD-16</template>
            
            <input v-model.trim="model.lud16" placeholder="someone@getalby.com" />
        </NostringFormItem>
        <NostringSpace justify="end">
            <NostringButton type="primary" round @click="handleSave">Save Profile</NostringButton>
        </NostringSpace>
</NostringForm>
</template>

<script setup lang="ts">


const model = ref<any>({});

const handleSave = () => {
    console.log(model.value);
}
</script>

<style lang="scss"></style>