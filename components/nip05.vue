<template>
  <NostringText
    type="tertiary"
    :class="[
      `nip05-${status}`,
      {
        'name-verified': verifiedWithName,
      },
    ]"
  >
    <NostringSpace gap="0" inline style="align-items: center">
      <NostringIcon>
        <CheckmarkCircle v-if="status === 'verified'" />
        <HelpCircle v-if="status === 'loading'" />
        <Warning v-if="status === 'fail'" />
        <CloseCircle v-if="status === 'fake'" />
      </NostringIcon>
      <template v-if="verifiedWithName && showDetail">
        {{ profile?.nip05.replace(`${profile?.name}@`, "").replace(`_@`, "") }}
      </template>
      <template v-if="!verifiedWithName && showDetail">
        {{ profile?.nip05 }}
      </template>
    </NostringSpace>
  </NostringText>
</template>

<script setup lang="ts">
import {
  Warning,
  ShieldCheckmark,
  CheckmarkCircle,
  CheckmarkDoneCircle,
  CloseCircle,
  HelpCircle,
} from "@vicons/ionicons5";

interface Props {
  profile: any;
  showDetail?: boolean;
  defaultStatus?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showDetail: false,
});

const result = datasource.checkNip05(props.profile.pubkey, props.profile.nip05);

const status = computed(() => result.data?.status || props.defaultStatus);

const verifiedWithName = computed(
  () =>
    props.profile?.nip05.startsWith(props.profile?.name) ||
    props.profile?.nip05.startsWith("_@")
);
</script>

<style lang="scss">
.nip05-verified {
  --text-color: #105795 !important;

  &.name-verified {
    color: var(--bg-color);
    background-color: transparent;
    background-image: repeating-linear-gradient(
      15deg,
      #179510,
      #107993 5px,
      #93108c 25px,
      #937410 40px,
      #179510 55px
    );
    mix-blend-mode: difference;
    position: relative;

    &::before {
      content: " ";
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
