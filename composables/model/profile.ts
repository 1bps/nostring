import { nip19, Event } from "nostr-tools";
import { EventModel } from "./event";
import { Ref } from "nuxt/dist/app/compat/capi";
import { ContactsModel } from "./contacts";

export class ProfileModel extends EventModel{

    private _content: any;

    constructor(e: Event) {
        super(e);
        try {
            this._content = JSON.parse(e.content);
        } catch (e) { }
    }

    get pubkey(): string {
        return this.e.pubkey;
    }

    get nip19(): string {
        return nip19.npubEncode(this.e?.pubkey);
    }

    get name(): string {
        return this._content?.name;
    }

    get displayName(): string {
        return this._content?.display_name;
    }

    get nip05(): string {
        return this._content?.nip05;
    }

    get nip05Status(): Ref<string> {
        return computed(() => this.nip05 ? datasource.checkNip05(this.pubkey, this.nip05).data.value : '');
    }

    get bio(): string {
        return this._content?.about;
    }

    get avatar(): string {
        return this._content?.picture;
    }

    get banner(): string {
        return this._content?.banner;
    }

    get website(): string {
        return this._content?.website;
    }

    get lud16(): string {
        return this._content?.lud16;
    }

    get contacts(): Ref<ContactsModel> {
        return computed(() => datasource.getContacts(this.e.pubkey).data.value)
    }
    relays?: string[];
}