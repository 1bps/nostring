import * as nip19 from "nostr-tools/nip19";
import { EventModel } from "./event";
import { Event } from 'nostr-tools';
import { Ref } from "nuxt/dist/app/compat/capi";

export interface ProfileModel extends EventModel {
    pubkey: string;
    nip19?: string;
    name?: string;
    displayName?: string;
    nip05?: string;
    nip05Status?: Ref<string>;
    bio?: string;
    avatar?: string;
    banner?: string;
    website?: string;
    lud16?: string;
    relays?: string[];
}

const fromEvent = (e: Event): ProfileModel => {
    let content = JSON.parse(e.content);
    return {
        pubkey: e.pubkey,
        nip19: nip19.npubEncode(e.pubkey),
        event: e,
        createdAt: new Date(e.created_at * 1000),
        name: content.name,
        displayName: content.display_name,
        nip05: content.nip05,
        nip05Status: datasource.checkNip05(e.pubkey, content.nip05).data,
        bio: content.about,
        avatar: content.picture,
        banner: content.banner,
        website: content.website,
        lud16: content.lud16,
        // TODO relays 
    };
}

export default {
    fromEvent,
};
