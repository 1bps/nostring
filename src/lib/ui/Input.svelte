<script setup lang="ts">
    import { createEventDispatcher } from "svelte";

    export let value: string;
    export let tag: "input" | "textarea" = "input";

    const dispath = createEventDispatcher();

    function onClick(event: any) {
        dispath("click", event);
    }

    const handleChange = (v: string) => {
        dispath("update:value", v);
    };
</script>

<template />

<svelte:element this={tag} bind:value on:change={handleChange} />
