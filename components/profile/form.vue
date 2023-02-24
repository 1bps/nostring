<template>
    <div class="form">
        <div class="form-item">
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
                <input v-model.trim="model.banner" />
            </label>
        </div>

        <div>
            <label>
                <span>Bio</span>
                <input v-model.trim="model.about" />
            </label>
        </div>

        <div>
            <label>
                <span>NIP-05</span>
                <input v-model.trim="model.nip05" />
            </label>
        </div>

        <div>
            <label>
                <span>LUD-16</span>
                <input v-model.trim="model.lud16" />
            </label>
        </div>
        <NostringSpace justify="end">
            <NostringButton type="primary" round @click="handleSave">Save Profile</NostringButton>
        </NostringSpace>
</div>
</template>

<script setup lang="ts">


const model = ref({});

const handleSave = () => {
    console.log(model.value);
}
</script>

<style lang="scss">
input,
textarea,
select,
radio,
checkbox,
button {

}

.form{
    display:flex;
    flex-flow: column;
    gap: 10px;
}

label {
    span {
        position: absolute;
        padding: 10px 18px;
        pointer-events: none;
    }

    input {
        padding: 15px 18px 5px;
        border-radius: 5px;
        border: none;
        background: rgba(255, 255, 255, .0677);

        display: block;
    }
}</style>