<template>
  <div class="ns-space" :class="{
    'ns-vertical': vertical
  }" :style="{
  gap: gap ? `${gap}px` : undefined,
  justifyContent: justify
}">
    <slot>{{ content }} </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content?: string;
  vertical?: boolean;
  gap?: number;
  justify: string
}

const props = withDefaults(defineProps<Props>(), {
  vertial: false,
  content: "",
  justify: "initial",
});
</script>

<style lang="scss" scope>
.ns-space {
  display: flex;
  gap: 5px;
}

.ns-vertical {
  flex-direction: column;
}
</style>
