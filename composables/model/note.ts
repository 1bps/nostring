import datasource from "../datasource";
import { ProfileModel } from "./profile";
import { EventModel } from "./event";
import { Event, nip19 } from 'nostr-tools';
import { Ref } from "nuxt/dist/app/compat/capi";

export interface NoteModel extends EventModel {
    id?: string;
    nip19?: string;
    content?: string;
    profile?: Ref<ProfileModel>;
    replies?: Ref<NoteModel[]>;
}

const fromEvent = (e: Event): NoteModel => {
    return {
        id: e.id,
        nip19: e.id ? nip19.noteEncode(e.id) : e.id,
        event: e,
        createdAt: new Date(e.created_at * 1000),
        content: e.content,
        profile: computed(() => datasource.getProfile(e.pubkey).data.value),
        replies: computed(() => e.id ? datasource.getReplies(e.id).data.value : <NoteModel[]>[])
    };
}

const note = {
    fromEvent,
}

export default note;
