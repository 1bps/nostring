<template>
  <div class="ns-space" :class="{
    'ns-vertical': vertical
  }">
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
.ns-space {
  display: flex;
}

.ns-vertical {
  flex-direction: column;
}
</style>
