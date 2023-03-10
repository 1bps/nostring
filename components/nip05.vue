<template>
  <NostringText type="tertiary" :class="[
    `nip05-${status}`,
    {
      'name-verified': verifiedWithName,
    },
  ]" style="display: inline-flex; align-items: center;">
    <NostringIcon style="overflow:hidden">
      <IconDiscountCheckFilled v-if="status === 'verified' && !verifiedWithName" :size="18" />
      <IconDiscountCheckFilled v-if="status === 'verified' && verifiedWithName" :size="18" />
      <IconQuestionCircle v-if="status === 'loading'" :size="18" />
      <IconAlertCircleFilled v-if="status === 'fail'" :size="18" />
      <IconCircleXFilled v-if="status === 'fake'" :size="18" />
      <span v-if="verifiedWithName && showDetail">@</span>
    </NostringIcon>
    <template v-if="verifiedWithName && showDetail">
      {{ profile?.metadata?.nip05.replace(new RegExp(`${profile?.metadata?.name}@`, 'ig'), "").replace(`_@`, "") }}
    </template>
    <template v-if="!verifiedWithName && showDetail">
      {{ profile?.metadata?.nip05?.replace('_@', "") }}
    </template>
  </NostringText>
</template>

<script setup lang="ts">
import {
  IconDiscountCheck,
  IconDiscountCheckFilled,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconAlertCircle,
  IconAlertCircleFilled,
  IconCircleX,
  IconCircleXFilled,
  IconQuestionCircle
} from '@tabler/icons-vue';
import { ProfileModel } from "~~/composables/model/profile";

interface Props {
  profile: ProfileModel;
  showDetail?: boolean;
  defaultStatus?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showDetail: false,
});

const status = computed(() => props.profile?.nip05?.status || props.defaultStatus);

const verifiedWithName = computed(
  () =>
    status.value == "verified" &&
    ((props.profile?.metadata?.name
      && props.profile?.metadata?.nip05?.toLowerCase().startsWith(props.profile?.metadata?.name.toLowerCase())) || props.profile?.metadata?.nip05?.startsWith("_@"))
);
</script>

<style lang="scss">
.nip05-verified {
  --text-color: #105795 !important;

  &.name-verified {
    color: var(--bg-color);
    background-color: transparent;
    background-image: repeating-linear-gradient(15deg,
        #179510,
        #107993 5px,
        #93108c 25px,
        #937410 40px,
        #179510 55px);
    position: relative;

    &::before {
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: inherit;
      mix-blend-mode: difference;
      pointer-events: none;
    }
  }
}

.nip05-fake {
  --text-color: #952810 !important;
  text-decoration-line: line-through;
}

.nip05-fail {
  --text-color: #956410 !important;
}
</style>
