<script setup lang="ts">
    import Card from "$lib/ui/Card.svelte";

    export let invoice: string;
</script>

<Card>
    <a
        href={`lightning:${invoice}`}
        style="display: inline-flex; align-items: center">{invoice}</a
    >
</Card>
