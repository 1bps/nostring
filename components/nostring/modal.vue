<template>
    <div class="ns-modal-mask" :class="{ 'ns-modal-show': show }" @click="handleModalClick">
        <div class="ns-modal-main" @click.stop="() => { }">
            <slot></slot>
        </div>
</div>
</template>

<script setup lang="ts">
interface Props {
    show: boolean;
    maskClosable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    maskClosable: true
});

const emit = defineEmits(['update:show']);

const handleModalClick = () => {
    if (props.maskClosable) {
        emit("update:show", false);
    }
}
</script>

<script lang="ts"></script>

<style lang="scss">
.ns-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .667);
    display: none;

    &.ns-modal-show {
        display: block;
    }

    .ns-modal-main {
        position: fixed;
        width: 80%;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-color);
    }
}
</style>