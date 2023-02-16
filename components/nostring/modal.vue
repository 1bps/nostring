<template>
    <div class="ns-modal" :class="[{ 'ns-modal-show': show }, `ns-modal-size-${size}`]">
        <div class="ns-modal-mask" @click="handleModalClick" />
        <div class="ns-modal-main">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    show: boolean;
    maskClosable?: boolean;
    size?: string;
}

const props = withDefaults(defineProps<Props>(), {
    maskClosable: true,
    size: 'm'
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
.ns-modal {
    display: none;

    &.ns-modal-show {
        display: block;
    }

    .ns-modal-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .667);
    }

    .ns-modal-main {
        position: fixed;
        width: 600px;
        max-width: 100%;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-color);
    }

    &.ns-modal-size-l{
        .ns-modal-main{
            width: 800px;
        }
    }
}
</style>