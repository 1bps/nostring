<template>
    <div>
        <div>
            <label>
                <span>Name</span>
                <input v-model.trim="model.name" placeholder="nostring" />
            </label>
        </div>
        <div>
            <label>
                <span>Display Name</span>
                <input v-model.trim="model.display_name" placeholder="Nostring.io" />
            </label>
        </div>
        <div>
            <label>
                <span>Avatar Picture URL</span>
                <input v-model.trim="model.picture" />
            </label>
        </div>

        <div>
            <label>
                <span>Banner Picture URL</span>
                <input v-model.trim="model.banner"/>
            </label>
        </div>

        <div>
            <label>
                <span>Bio</span>
                <input v-model.trim="model.about"/>
            </label>
        </div>

        <div>
            <label>
                <span>NIP-05</span>
                <input v-model.trim="model.nip05"/>
            </label>
        </div>

        <div>
            <label>
                <span>LUD-16</span>
                <input v-model.trim="model.lud16"/>
            </label>
        </div>
</div>
</template>

<script setup lang="ts">
const model = ref({});
</script>