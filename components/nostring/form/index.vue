<template>
    <form class="ns-form">
        <slot />
    </form>
</template>

<style lang="scss">
.ns-form {
    display: flex;
    flex-flow: column;
    gap: 10px;
}
</style>