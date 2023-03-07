import datasource from "../datasource";
import { createEventModel, EventModel } from "./event";
import { Event, nip19 } from 'nostr-tools';
import { Ref } from "vue";
import { ProfileModel } from "./profile";

export interface NoteModel extends EventModel {
    content?: string;
    author?: ProfileModel;
    node?:NoteModel;
}

export function createReactionModel(e: Event): Ref<NoteModel> {
    let { id, event, pubkey, createdAt } = createEventModel(e).value;
    return ref({
        id,
        event,
        pubkey,
        createdAt,
        content: computed(() => e.content),
        author: computed(() => datasource.getProfile(e.pubkey).data.value),
        note: computed(()=>{

        }),
    });
}