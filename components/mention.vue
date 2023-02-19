<template>
  <NuxtLink :to="`/p/${profile.nip19}`" style="display: inline-flex; align-items: center">
    @{{
      profile.metadata?.name ||
      `${profile.nip19?.substr(4, 8)}:${profile.nip19?.substr(profile.nip19?.length - 8)}`
    }}
    <Nip05 v-if="profile.metadata?.nip05" :profile="profile" :status="'loading'" />
</NuxtLink>
</template>

<script setup lang="ts">
import { ProfileModel } from "~~/composables/model/profile";

interface Props {
  profile: ProfileModel;
}

const props = withDefaults(defineProps<Props>(), {});
</script>