<template>
  <div class="avatar">
    <img v-if="imageUrl" :src="imageUrl" />
    <img v-if="!imageUrl" src="@/assets/images/undraw_cat_px71.svg" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss">
.avatar {
  background-color: rgba(16, 95, 10, 0.2);
  border-radius: 16.7%;
  min-width: 10px;
  min-height: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
