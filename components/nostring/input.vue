<template>
    <component :is="tag" v-model:value="props.value" @change="handleChange" />
</template>

<script setup lang="ts">
interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits(['upadte:value']);
const tag = ref('input');

const handleChange = (v:string)=>{
    emit('update:value', v);
}
</script>