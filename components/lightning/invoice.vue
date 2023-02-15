<template>
  <NostringCard>
    <NuxtLink :to="invoice" style="display: inline-flex; align-items: center">
        {{ invoice }}
    </NuxtLink>
  </NostringCard>
</template>

<script setup lang="ts">
interface Props {
  invoice: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<script lang="ts">
export default class LightningInvoice {}
</script>