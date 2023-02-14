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

let getCacheArray = (cache: any, key: string, update = () => { }) => {
    return getCacheData(cache, key, () => [], update);
}

let getCacheData = (cache: any, key: string, create: Function, update = () => { }) => {
    let cached = cache[key];
    if (!cached) {
        cached = reactive({ data: create() });
        cache[key] = cached;
        if (process.client) {
            update && update(key, cached);
        }
    }
    return cached;
}

let getProfileCached = (pubkey: string, update = () => { }) => {
    return getCacheData(profileCache, pubkey, () => (
        {
            pubkey: pubkey, nip19: nip19.npubEncode(pubkey)
        }), update);
}

let subEventHandler = (event: any) => {
    try {
        if (event.kind === Kind.Metadata) {
            let cached = profileCache[event.pubkey];
            Object.assign(cached.data, profile.fromEvent(event));
        } else if (event.kind === Kind.Text) {
            let cachedGlobal = getCacheArray(noteCache, '');
            let cached = getCacheArray(noteOfProfileCache, event.pubkey);
            let data = note.fromEvent(event);
            cachedGlobal.data.push(data);
            cached.data.push(data);
        }
    } catch (e) {
        console.log('error when handle event', e);
    }
}

const checkNip05 = (pubkey: string, identity: string): Object => {
    return getCacheData(nip05Cache, identity, () => ({ identity: identity, status: 'loading' }), (key, cached) => {
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
    });
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
    return getCacheArray(noteCache, '', (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool.sub(relays, [{
            kinds: [Kind.Text],
        }]);
        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            // sub.unsub();
        });
    });
}

const getNotesOfPubkey = (pubkey: string): Object => {
    let cached = noteOfProfileCache[pubkey];
    if (!cached) {
        cached = reactive({ data: ref([]) });
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
