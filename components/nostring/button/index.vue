<template>
  <button class="ns-button" :class="[{
    'ns-button-round': round,
    'ns-primary': primary,
  }, `ns-button-${type}`]">
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
  primary?: boolean;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  round: false,
  primary: false,
  type: "default"
});
</script>

<style lang="scss">
.ns-button {
  --text-color: rgba(255, 255, 255, .85);
  --bg-color: transparent;

  margin: 0;
  height: 32px;
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

  color: var(--text-color);
  background-color: var(--bg-color);

  &.ns-button-round {
    border-radius: 16px;
  }

  &.ns-button-default {}

  &.ns-button-tertiary {
    --text-color: rgba(255, 255, 255, .33)
  }

  &.ns-button-primary {
    --text-color: rgba(255, 255, 255, .85);
    --bg-color: #105795;
  }

  &.ns-button-warning {}

  &.ns-button-error {}

  .ns-button-content {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
}
</style>
