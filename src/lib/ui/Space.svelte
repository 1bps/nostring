<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let content: string = "";
    export let vertical: boolean = false;
    export let inline: boolean = false;
    export let gap: number = 5;
    export let justify: string = "start";
    export let align: string = "center";

    let classNames = "";
    export let style: string = "";
    export { classNames as class };

    const dispath = createEventDispatcher();

    function onClick(event: any) {
        dispath("click", event);
    }
</script>

<div
    class={["ns-space", classNames].join(" ")}
    class:ns-vertical={vertical}
    class:ns-inline={inline}
    style:gap={`${gap}px`}
    style:justify-content={justify}
    style:align-items={align}
    {style}
    on:click={onClick}
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
