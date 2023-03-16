<script lang="ts">
    export let content: string = "";
    export let vertical: boolean;
    export let inline: boolean;
    export let gap: number;
    export let justify: string;
    export let align: string;
</script>

<div
    class="ns-space"
    class:ns-vertical={vertical}
    class:ns-inline={inline}
    style:gap={gap ? `${gap}px` : undefined}
    style:justify-content={justify}
    style:align-items={align}
>
    <slot>{content}</slot>
</div>

<style lang="scss">
    .ns-space {
        display: flex;
        gap: 5px;
    }

    .ns-vertical {
        flex-direction: column;
    }

    .ns-inline {
        display: inline-flex;
    }
</style>
