<template>
  <button class="ns-button" :class="[{
    'ns-button-round': round,
    'ns-button-block': block,
    'ns-button-text': text,
  }, `ns-button-type-${type}`, `ns-button-size-${size}`]" :style="{
  justifyContent: justify
}">
    <slot name="icon"></slot>
    <span class="ns-button-content">
      <slot>{{ label }} </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  round?: boolean;
  block?: boolean;
  text?: boolean;
  type?: string;
  size?: string;
  justify?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  round: false,
  primary: false,
  block: false,
  text: false,
  type: "default",
  size: 'm'
});
</script>

<style lang="scss">
.ns-button {
  --button-text-color: var(--text-color);
  --button-bg-color: transparent;
  --button-height: 32px;

  margin: 0;
  height: var(--button-height);
  padding: 0 14px;
  border-radius: 3px;
  border: none;
  white-space: nowrap;
  position: relative;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  outline: none;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  gap: calc(var(--button-height)/6);

  color: var(--button-text-color);
  background-color: var(--button-bg-color);

  &.ns-button-size-xl {
    --button-height: 48px;
    font-size: 100%;
  }

  &.ns-button-size-l {
    --button-height: 40px;
    font-size: 100%;
  }

  &.ns-button-round {
    border-radius: calc(var(--button-height)/2);
    padding: 0 20px;
  }

  &.ns-button-type-default {
    border: 1px solid var(--text-color-tertiary);
  }

  &.ns-button-type-tertiary {
    --button-text-color: var(--text-color-tertiary);
    border: 1px solid var(--text-color-tertiary);
  }

  &.ns-button-type-primary {
    --button-text-color: var(--text-color-primary);
    --button-bg-color: #105795;
  }

  &.ns-button-text {
    --button-bg-color: tranparent;
    border: none;
  }

  &.ns-button-type-warning {}

  &.ns-button-type-error {}

  .ns-button-content {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
}

.ns-block {
  display: block;
}
</style>
