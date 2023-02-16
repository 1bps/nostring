<template>
  <NostringText type="tertiary">
    <span class="profile-name"><slot>{{ value }}</slot></span>
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

<style lang="scss">
.profile-name{
  &::before{
    content: '@'
  }
}
</style>
