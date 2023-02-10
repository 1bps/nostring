<template>
  <time>
    {{ label }}
  </time>
</template>

<script setup lang="ts">
interface Props {
  time?: string | number | Date;
  from?: string | number | Date;
  relative?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  time: Date.now(),
  relative: false,
});

const label = computed(() => {
  let dateValue: Date = ((t: string | number | Date | undefined): Date => {
    if (typeof t === "string" || typeof t === "number") {
      return new Date(t);
    } else {
      return t || new Date();
    }
  })(props.time);

  if (props.relative) {
    let from: Date = ((t: string | number | Date | undefined): Date => {
      if (typeof t === "string" || typeof t === "number") {
        return new Date(t);
      } else {
        return t || new Date(now.value);
      }
    })(props.from);
    return relativeTimeFormat(dateValue, from);
  } else {
    return dateValue.toLocaleDateString();
  }
});
</script>
