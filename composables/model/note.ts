import datasource from "../datasource";
import { ProfileModel } from "./profile";
import { EventModel } from "./event";
import { Event } from 'nostr-tools';
import { Ref } from "nuxt/dist/app/compat/capi";

export interface NoteModel extends EventModel {
    id?: string;
    content: string;
    profile: Ref<ProfileModel>;
}

const fromEvent = (e: Event): NoteModel => {
    return {
        id: e.id,
        event: e,
        createdAt: new Date(e.created_at * 1000),
        content: e.content,
        profile: datasource.getProfile(e.pubkey).data,
    };
}

const note = {
    fromEvent,
}

export default note;
