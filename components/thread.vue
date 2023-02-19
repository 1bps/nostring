<template>
    <div>
        <div class="thread-current">
            <Note :note="note" :show-replyings="false" :detail-mode="true" />
        </div>
        <Timeline v-if="note.replies?.length" :notes="note.replies" :show-replyings="false" />
</div>
</template>
  
<script setup lang="ts">
import { NoteModel } from '~~/composables/model/note';

interface Props {
    note: NoteModel;
}

const props = withDefaults(defineProps<Props>(), {
});
</script>
  
<script lang="ts"></script>
  
<style lang="scss">
.thread-current {
    border-top: 1px solid #123;
    padding: 10px;
}
</style>
  