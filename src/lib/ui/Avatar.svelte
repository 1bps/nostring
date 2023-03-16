<script lang="ts">
    export let image = "assets/images/undraw_cat_px71.svg";
    export let alt = "";
</script>

<div class="ns-avatar">
    {#if image}
        <img src={image} {alt} />
    {:else}
        <img src="/assets/images/undraw_cat_px71.svg" {alt} />
    {/if}
</div>

<style lang="scss">
    .ns-avatar {
        background-color: rgba(16, 95, 10, 0.2);
        border-radius: 16.7%;
        min-width: 10px;
        min-height: 10px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
