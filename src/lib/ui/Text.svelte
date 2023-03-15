<script lang="ts">
    export let content: string = "";
    export let type: string = "default";
    export let size: string = "m";
    export let ellipsis: boolean = false;
</script>

<span
    class:ns-text-ellipsis={ellipsis}
    class={["ns-text", `ns-text-${type}`, `ns-text-${size}`].join(" ")}
>
    <slot>{{ content }}</slot>
</span>

<style lang="scss">
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
        &.ns-text-success {
            --text-color: var(--text-color-success);
        }

        &.ns-text-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
