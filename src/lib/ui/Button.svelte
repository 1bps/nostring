<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let label = "";
    export let round = false;
    export let block = false;
    export let text = false;
    export let type = "";
    export let size = "m";
    export let justify = "";
    export let tag = "";

    const dispath = createEventDispatcher();

    function onClick(event: any) {
        dispath("click", event);
    }
</script>

<button
    type="button"
    class={["ns-button", `ns-button-${size}`].join(" ")}
    on:click={onclick}
>
    <slot name="icon" />
    <span class="ns-button-content">
        <slot>{label}</slot>
    </span>
</button>

<style lang="scss">
    .ns-button {
        --button-text-color: var(--text-color);
        --button-bg-color: transparent;
        --button-height: 32px;

        margin: 0;
        height: var(--button-height);
        padding: 0 14px;
        border-radius: 3px;
        border: none;
        white-space: nowrap;
        position: relative;
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        outline: none;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        user-select: none;
        gap: calc(var(--button-height) / 6);

        color: var(--button-text-color);
        background-color: var(--button-bg-color);

        &.ns-button-size-xl {
            --button-height: 48px;
            font-size: 100%;
        }

        &.ns-button-size-l {
            --button-height: 40px;
            font-size: 100%;
        }

        &.ns-button-round {
            border-radius: calc(var(--button-height) / 2);
            padding: 0 20px;
        }

        &.ns-button-type-default {
            border: 1px solid var(--text-color-tertiary);
        }

        &.ns-button-type-tertiary {
            --button-text-color: var(--text-color-tertiary);
            border: 1px solid var(--text-color-tertiary);
        }

        &.ns-button-type-primary {
            --button-text-color: var(--text-color-primary);
            --button-bg-color: #105795;
        }

        &.ns-button-text {
            --button-bg-color: tranparent;
            border: none;
            padding: 0 7px;
            gap: 0;

            .ns-button-content {
                &:not(:empty) {
                    padding-left: 3px;
                }
            }
        }

        &.ns-button-type-warning {
        }

        &.ns-button-type-error {
        }

        .ns-button-content {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
        }
    }
</style>
