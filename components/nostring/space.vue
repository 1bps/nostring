<template>
  <div
    class="space"
    :class="{
      vertical,
    }"
  >
    <slot>{{ content }} </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content?: string;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  vertial: false,
  content: "",
});
</script>

<style lang="scss" scope>
.space {
  display: flex;
}
.vertical {
  flex-direction: column;
}
</style>
