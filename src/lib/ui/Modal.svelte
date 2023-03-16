<script setup lang="ts">
    import { createEventDispatcher } from "svelte";

    export let size = "m";
    export let maskClosable = true;
    export let show: boolean;
    export let type: string = "default";

    const dispath = createEventDispatcher();

    const handleModalClick = (event: any) => {
        if (maskClosable) {
            show = false;
            dispath("update:show", false);
        }
    };
</script>

<template />

<div
    class:ns-modal-show={show}
    class={["ns-modal", `ns-modal-${size}`, `ns-modal-${type}`].join(" ")}
>
    <div class="ns-modal-mask" on:click={handleModalClick} />
    <div class="ns-modal-main">
        <slot />
    </div>
</div>

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
            background: rgba(0, 0, 0, 0.667);
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

        &.ns-modal-l {
            .ns-modal-main {
                width: 800px;
            }
        }
    }
</style>
