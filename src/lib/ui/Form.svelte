<script lang="ts">
    const handleSubmit = (e: any) => {
        e.preventDefault();
        return false;
    };
</script>

<form class="ns-form" on:submit={handleSubmit}>
    <slot />
</form>

<style lang="scss">
    .ns-form {
        display: flex;
        flex-flow: column;
        gap: 10px;
    }
</style>
