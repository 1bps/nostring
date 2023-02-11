<template>
  <NostringText type="tertiary">
    <slot name="mention">@</slot>
    <slot>{{ value }}</slot>
  </NostringText>
</template>

<script setup lang="ts">
interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
});
</script>
