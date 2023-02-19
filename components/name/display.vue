<template>
  <NostringText class="name-display" :class="{ header }" type="primary">
    <slot>{{ display }}</slot>
</NostringText>
</template>

<script setup lang="ts">
import { ProfileModel } from "~~/composables/model/profile";

interface Props {
  value?: string;
  header?: boolean;
  profile?: ProfileModel;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  header: false,
});

const display = computed(() => {
  let v = props.value || props.profile?.metadata?.display_name || props.profile?.metadata?.name;
  if (!v && props.profile?.nip05Status?.value === 'verified') {
    let nip05Id = props.profile?.metadata?.nip05;
    if (nip05Id?.startsWith('_@')) {
      v = nip05Id?.replace('_@', '');
    } else {
      v = nip05Id;
    }
  }
  if (v) {
    return v;
  }
  return props.profile?.pubkey?.substring(0, 12);
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
