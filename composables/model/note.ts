import datasource from "../datasource";
import { ProfileModel } from "./profile";
import { EventModel } from "./event";
import { nip19 } from 'nostr-tools';
import { Ref } from "nuxt/dist/app/compat/capi";

export class NoteModel extends EventModel {

    get id(): string | undefined { return this.e.id }
    get nip19(): string | undefined {
        return this.e?.id ? nip19.noteEncode(this.e.id) : undefined
    }
    get content(): string {
        return this.e.content;
    }
    get author(): Ref<ProfileModel> {
        return computed(() => datasource.getProfile(this.e.pubkey).data.value);
    }
    get replies(): Ref<NoteModel[]> {
        return computed(() => this.e.id ? datasource.getReplies(this.e.id).data.value : <NoteModel[]>[])
    }
}
