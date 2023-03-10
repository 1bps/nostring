<template>
  <div
    class="ns-space"
    :class="{
      'ns-vertical': vertical,
      'ns-inline': inline,
    }"
    :style="{
      gap: gap ? `${gap}px` : undefined,
      justifyContent: justify,
      alignItems: align
    }"
  >
    <slot>{{ content }} </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content?: string;
  vertical?: boolean;
  gap?: string;
  justify?: string;
  inline?: boolean;
  align?:string;
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  content: "",
  inline: false,
});
</script>

<style lang="scss">
.ns-space {
  display: flex;
  gap: 5px;
}

.ns-vertical {
  flex-direction: column;
}

.ns-inline {
  display: inline-flex;
}
</style>
