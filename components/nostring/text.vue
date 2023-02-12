<template>
    <span class="ns-text" :class="[{
        'ns-ellipsis': ellipsis,
    }, `ns-text-${type}`, `ns-text-size-${size}`]">
        <slot>{{ content }} </slot>
    </span>
</template>

<script setup lang="ts">
interface Props {
    content?: string;
    type?: string;
    size?: string;
    ellipsis?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: "default",
    content: "",
    size: 'm'
});
</script>

<style lang="scss" scope>
.ns-text {
    color: var(--text-color);

    &.ns-text-size-xl {
        font-size: 133.3%;
    }

    &.ns-text-size-l {
        font-size: 116.7%;
    }

    &.ns-text-size-s {
        font-size: 83.3%;
    }

    &.ns-text-size-xs {
        font-size: 66.7%;
    }

    &.ns-text-primary {
        --text-color: var(--text-color-primary);
    }

    &.ns-text-tertiary {
        --text-color: var(--text-color-tertiary);
    }
}

.ns-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
