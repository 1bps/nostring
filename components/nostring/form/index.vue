<template>
    <form class="ns-form" @submit="handleSubmit">
        <slot />
    </form>
</template>

<script setup lang="ts">
const handleSubmit = (e:any)=>{
    e.preventDefault();
    return false;
}
</script>

<style lang="scss">
.ns-form {
    display: flex;
    flex-flow: column;
    gap: 10px;
}
</style>