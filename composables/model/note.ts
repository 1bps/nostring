import datasource from "../datasource";
import { createEventModel, EventModel } from "./event";
import { Event, nip19 } from 'nostr-tools';
import { Ref } from "vue";
import { ProfileModel } from "./profile";

export interface NoteModel extends EventModel {
    nip19?: string;
    content?: string;
    author?: ProfileModel;
    replies?: NoteModel[];
}

export function createNoteModel(e: Event): Ref<NoteModel> {
    let { id, event, pubkey, createdAt } = createEventModel(e).value;
    return ref({
        id,
        event,
        pubkey,
        createdAt,
        nip19: computed(() => e.id ? nip19.noteEncode(e.id) : ''),
        content: computed(() => e.content),
        author: computed(() => datasource.getProfile(e.pubkey).data.value),
        replies: computed(() => e.id ? datasource.getReplies(e.id).data.value : []),
        reactions: computed(()=> e.id ? datasource.getReactionsOfNote(e.id).data.value : [])
    });
}