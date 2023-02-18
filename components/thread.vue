<template>
    <div>
        <Note :note="note" />
    </div>
</template>
  
<script setup lang="ts">
interface Props {
  note: NoteModel;
}

const props = withDefaults(defineProps<Props>(), {
});
</script>
  
<script lang="ts"></script>
  
<style lang="scss">
.timeline {
    display: flex;
    flex-direction: column;

    .item {
        border-top: 1px solid #123;
        padding: 10px;

        &:last-child {
            border-bottom: 1px solid #123;
        }

        .note {}
    }
}
</style>
  