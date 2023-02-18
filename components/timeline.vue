<template>
    <div class="timeline">
        <div v-for="(note, noteIndex) in notes" :key="noteIndex" class="item">
            <Note :note="note" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { NoteModel } from "~~/composables/model/note";

interface Props {
  notes: NoteModel[];
}

const props = withDefaults(defineProps<Props>(), {
});
</script>

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