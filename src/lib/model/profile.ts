import { nip19, type Event } from "nostr-tools";
import { createEventModel, type EventModel } from "./event";
// import { ContactsModel } from "./contacts";
import { get, readable, type Readable } from "svelte/store";

export interface ProfileModel extends EventModel {
    metadata?: any;
    nip19?: string;
    // contacts?: ContactsModel;
    nip05?: {
        identity?: string;
        status?: string;
        alias?: string[];
    }
}

export function createProfileModel(e: Event): Readable<ProfileModel> {
    let { id, event, pubkey, createdAt } = get(createEventModel(e));
    let metadata = readable({}, (set) => {
        if (e.content) {
            set(JSON.parse(e.content));
        }
        return () => { };
    });
    return readable({
        id,
        event,
        pubkey,
        createdAt,
        metadata,
        nip19: nip19.npubEncode(e.pubkey),
        // contacts: readable(() => datasource.getContacts(e.pubkey).data.value),
        // nip05: readable(() => {
        //     if (metadata.value.nip05) {
        //         return {
        //             identity: metadata.value.nip05,
        //             status: datasource.checkNip05(e.pubkey, metadata.value.nip05).data.value
        //         }
        //     }
        //     return {};
        // }),
    });
}