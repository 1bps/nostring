<template>
    <span class="ns-text" :class="[`ns-text-${type}`]">
        <slot>{{ content }} </slot>
    </span>
</template>

<script setup lang="ts">
interface Props {
    content?: string;
    type?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: "default",
    content: "",
});
</script>

<style lang="scss" scope>
.ns-text {
    color: var(--text-color);

    &.ns-text-primary {
        color: var(--text-color-primary);
    }

    &.ns-text-tertiary {
        color: var(--text-color-tertiary);
    }
}
</style>
