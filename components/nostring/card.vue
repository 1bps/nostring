<template>
    <div class="ns-card" :class="[`ns-card-${type}`,`ns-card-size-${size}`]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
interface Props {
    type?: string;
    size?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: "default",
    size: "m",
});
</script>

<style lang="scss">
.ns-card {
    padding: 15px;
    border-radius: 10px;
    border: 1px #333 solid;

    &.ns-card-size-l{
        padding: 25px;
        border-radius: 15px;
    }
}
</style>
