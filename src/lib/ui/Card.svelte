<script lang="ts">
    export let type = "default";
    export let size = "m";
</script>

<div class={["ns-card", `ns-card-${size}`, `ns-card-${type}`].join(" ")}>
    <slot />
</div>

<style lang="scss">
    .ns-card {
        padding: 15px;
        border-radius: 10px;
        border: 1px #333 solid;

        &.ns-card-l {
            padding: 25px;
            border-radius: 15px;
        }
    }
</style>
