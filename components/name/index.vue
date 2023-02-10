<template>
  <span>
    <slot name="mention">@</slot>
    <slot>{{ value }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
});
</script>
