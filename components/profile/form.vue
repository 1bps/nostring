<template>
    <div class="form">
        <div class="form-item">
            <label>
                <input v-model.trim="model.name" placeholder="nostring" required />
                <span class="label">Name</span>
                <span class="description">The name when people mention you.</span>
                <span class="message">Name</span>
            </label>
        </div>
        <div>
            <label>
                <input v-model.trim="model.display_name" placeholder="Nostring.io" required />
                <span class="label">Display Name</span>
                <span class="description">The name displayed as your nickname.</span>
                <span class="message">Name</span>
            </label>
        </div>
        <div>
            <label>
                <input v-model.trim="model.picture" placeholder="" />
                <span class="label">Avatar Picture URL</span>
            </label>
        </div>

        <div>
            <label>
                <input v-model.trim="model.banner" placeholder="" />
                <span class="label">Banner Picture URL</span>
            </label>
        </div>

        <div>
            <label>
                <input v-model.trim="model.about" placeholder="" />
                <span class="label">Bio</span>
            </label>
        </div>

        <div>
            <label>
                <input v-model.trim="model.nip05" placeholder="" />
                <span class="label">NIP-05</span>
            </label>
        </div>

        <div>
            <label>
                <input v-model.trim="model.lud16" placeholder="someone@getalby.com" />
                <span class="label">LUD-16</span>
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
button {}

.form {
    display: flex;
    flex-flow: column;
    gap: 10px;
}

label {
    position: relative;
    display: block;
    width: 100%;

    span.label {
        position: absolute;
        top: 10px;
        padding: 0 18px;
        pointer-events: none;
        display: block;
        transition: 0.2s ease all;
        color: rgba(255, 255, 255, .5);
    }

    span.description{
        color: rgba(255, 255, 255, .5);
    }

    span.message{
        display: none;
    }

    input {
        padding: 15px 18px 5px;
        border-radius: 5px;
        border: 1px solid transparent;
        background: rgba(255, 255, 255, .0677);
        color: rgba(255, 255, 255, .667);
        display: block;
        width: 100%;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

        &::placeholder {
            color: transparent;
        }

        &:focus~span.label,
        &:not([placeholder])[required]:valid~span.label,
        &[placeholder]:not(:placeholder-shown)~span.label {
            top: 3px;
            font-size: 66.67%;
            color: rgba(255, 255, 255, .333);
        }

        &:focus {
            outline: none;
            border-color: rgba(16, 87, 149,1);
            box-shadow: 0 0 0 .25rem rgba(16, 87, 149,.667);
        }
    }
}

@keyframes label {}
</style>