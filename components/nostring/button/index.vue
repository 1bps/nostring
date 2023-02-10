<template>
  <button>
    <slot>{{ label }} </slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
});
</script>
