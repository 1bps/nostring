<template>
  <span class="name-display" :class="{ header }">
    <slot>{{ value }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  value?: string;
  header?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  header: false,
});
</script>

<style lang="scss">
.name-display {
  font-weight: bold;
  &.header {
    font-size: 1.667rem;
  }
}
</style>
