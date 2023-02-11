<template>
    <div class="ns-card" :class="[`ns-card-${type}`]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
interface Props {
    type?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: "default",
});
</script>

<style lang="scss" scope>
.ns-card {
    padding: 10px;
    border-radius: 10px;
    border: 1px #333 solid;
}
</style>
