import * as _nostrTools from "nostr-tools";

import profile from "@/composables/model/profile";
import note from "@/composables/model/note";
import { processExpression } from "@vue/compiler-core";

const {
    SimplePool,
    Kind,
    nip05,
    nip19,
} = _nostrTools;

const pool = new SimplePool();

const DEFAULT_RELAYS = ["wss://relay.damus.io"];

const profileCache: any = {};
const noteOfProfileCache: any = {};
const noteCache: any = {};
const eventCache: any = {};
const nip05Cache: any = {};

let subEventHandler = (event: any) => {
    if (event.kind === Kind.Metadata) {
        let cached = profileCache[event.pubkey];
        Object.assign(cached.data, profile.fromEvent(event));
    } else if (event.kind === Kind.Text) {
        let cachedGlobal = noteOfProfileCache[''];
        let cached = noteOfProfileCache[event.pubkey];
        let data = note.fromEvent(event);
        cachedGlobal.data.push(data);
        cached.data.push(data);
    }
}

const checkNip05 = (pubkey: string, identity: string): Object => {
    let cached = nip05Cache[identity];
    if (!cached) {
        cached = reactive({ data: { identity: identity, status: 'loading' } });
        nip05Cache[nip05] = cached;

        if (process.client) {
            cached.data.status = 'loading';
            nip05.queryProfile(identity).then((nip05Result: any) => {
                if (pubkey === nip05Result.pubkey) {
                    cached.data.status = 'verified';
                } else {
                    cached.data.status = 'fake';
                }
            }).catch(() => {
                cached.data.status = 'fail';
            });
        }
    }
    return cached;
}

const getProfile = (pubkey: string): Object => {
    let cached = profileCache[pubkey];
    if (!cached) {
        cached = reactive({ data: { pubkey: pubkey, nip19: nip19.npubEncode(pubkey) } });
        profileCache[pubkey] = cached;

        if (process.client) {
            let relays = [...DEFAULT_RELAYS];
            let sub = pool.sub(relays, [{
                kinds: [Kind.Metadata],
                authors: [pubkey],
            }]);
            sub.on("event", subEventHandler);
            sub.on("eose", () => {
                // sub.unsub(); 
            });
        }
    }
    return cached;
}

const getNotes = (): Object => {
    let cached = noteOfProfileCache[''];
    if (!cached) {
        cached = reactive({ data: [] });
        noteOfProfileCache[''] = cached;

        if (process.client) {
            let relays = [...DEFAULT_RELAYS];
            let sub = pool.sub(relays, [{
                kinds: [Kind.Text],
            }]);
            sub.on("event", subEventHandler);
            sub.on("eose", () => {
                // sub.unsub();
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

            sub.on("event", subEventHandler);
            sub.on("eose", () => {
                // sub.unsub();
            });

        }
    }
    return cached;
}

const datasource = {
    checkNip05, getProfile, getNotes, getNotesOfPubkey
}

export default datasource;
