import * as _nostrTools from "nostr-tools";

import profile from "@/composables/model/profile";
import note from "@/composables/model/note";

const {
    SimplePool,
    Kind,
    nip19
} = _nostrTools;

const pool = new SimplePool();

const DEFAULT_RELAYS = ["wss://relay.damus.io"];

const profileCache: any = {};
const noteOfProfileCache: any = {};
const noteCache: any = {};
const eventCache: any = {};

const getProfile = (pubkey: string): Object => {
    let cached = profileCache[pubkey];
    if (!cached) {
        cached = reactive({ data: reactive({ pubkey: pubkey, nip19: nip19.npubEncode(pubkey) }) });
        profileCache[pubkey] = cached;
        if (process.client) {
            let relays = [...DEFAULT_RELAYS];
            let sub = pool.sub(relays, [{
                kinds: [Kind.Metadata],
                authors: [pubkey],
            }]);
            sub.on("event", (event: any) => {
                if (event.kind == Kind.Metadata) {
                    Object.assign(cached.data, profile.fromEvent(event));
                }
            });
            sub.on("eose", () => {
                sub.unsub();
            });
        }
    }
    return cached;
}

const getNotes = (): Object => {
    let cached = noteOfProfileCache[''];
    if (!cached) {
        cached = reactive({ data: [] });
        if (process.client) {
            let relays = [...DEFAULT_RELAYS];
            let sub = pool.sub(relays, [{
                kinds: [Kind.Text],
            }]);
            sub.on("event", (event: any) => {
                if (event.kind == Kind.Text) {
                    cached.data.push(note.fromEvent(event));
                }
            });
            sub.on("eose", () => {
                sub.unsub();
            });
        }
    }
    return cached;
}

const getNotesOfPubkey = (pubkey: string): Object => {
    let cached = noteOfProfileCache[pubkey];
    if (!cached) {
        cached = reactive({ data: [] });
        noteOfProfileCache[pubkey] = cached;

        if (process.client) {
            let relays = [...DEFAULT_RELAYS];
            let sub = pool.sub(relays, [{
                kinds: [Kind.Text],
                authors: [pubkey],
            }]);

            sub.on("event", (event: any) => {
                if (event.kind == Kind.Text) {
                    cached.data.push(note.fromEvent(event));
                }
            });
            sub.on("eose", () => {
                sub.unsub();
            });

        }
    }
    return cached;
}

const datasource = {
    getProfile, getNotes, getNotesOfPubkey
}

export default datasource;
