import * as _nostrTools from "nostr-tools";

import profile, { ProfileModel } from "@/composables/model/profile";
import note, { NoteModel } from "@/composables/model/note";
import { Event } from 'nostr-tools';
import { EventModel } from "./model/event";
import { Ref } from "nuxt/dist/app/compat/capi";

const {
    SimplePool,
    Kind,
    nip05,
    nip19,
} = _nostrTools;

const pool = new SimplePool();

const DEFAULT_RELAYS = ["wss://relay.damus.io", "wss://relay.1bps.io"];

const profileCache: any = {};
const noteOfProfileCache: any = {};
const noteCache: any = {};
const eventCache: any = {};
const nip05Cache: any = {};
const floodContentMap: any = {};

interface Cached<T> {
    data: Ref<T>;
    lastUpdate?: Date;
}
type CacheUpdate<T> = {
    (key: string,
        cached: Cached<T>): void;
}
interface CacheHandler<T> {
    create: () => T;
    update?: CacheUpdate<T>;
}

let getCacheArray = <T>(cache: any, key: string,
    update?: CacheUpdate<T[]>): Cached<T[]> => {
    return getCacheData(cache, key, {
        create: () => ([]),
        update
    });
}

let getCacheData = <T>(cache: any, key: string,
    handler: CacheHandler<T>): Cached<T> => {
    let cached = cache[key];
    if (!cached) {
        cached = { data: ref<T>(handler.create()) };
        cache[key] = cached;
        if (process.client) {
            handler.update && handler.update(key, cached);
        }
    }
    return cached;
}

let getProfileCached = (pubkey: string,
    update?: CacheUpdate<ProfileModel>): Cached<ProfileModel> => {
    return getCacheData(profileCache, pubkey, {
        create: () => ({
            pubkey: pubkey,
            nip19: nip19.npubEncode(pubkey)
        }),
        update
    });
}

let subEventHandler = (event: Event) => {
    try {
        if (event.kind === Kind.Metadata) {
            let cached = getProfileCached(event.pubkey);
            let profileModel = profile.fromEvent(event);
            cached.data.value = profileModel;
        } else if (event.kind === Kind.Text) {
            let cachedGlobal = getCacheArray(noteCache, '');
            let cached = getCacheArray(noteOfProfileCache, event.pubkey);
            let data = note.fromEvent(event);
            if (!isFlood(data)) {
                cachedGlobal.data.value.push(data);
            }
            cached.data.value.push(data);
        }
    } catch (e) {
        console.log('error when handle event', e);
    }
}

const checkNip05 = (pubkey: string, identity: string): Cached<string> => {
    return getCacheData(nip05Cache, identity, {
        create: () => 'loading',
        update: (key, cached) => {
            cached.data.value = 'loading';
            nip05.queryProfile(identity).then((nip05Result: any) => {
                if (pubkey === nip05Result.pubkey) {
                    cached.data.value = 'verified';
                } else {
                    cached.data.value = 'fake';
                }
            }).catch(() => {
                cached.data.value = 'fail';
            });
        }
    });
}

const getProfile = (pubkey: string): Cached<ProfileModel> => {
    return getProfileCached(pubkey, (key, cached) => {
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
    });
}

const getNotes = (): Cached<NoteModel[]> => {
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

const getNotesOfPubkey = (pubkey: string): Cached<NoteModel[]> => {
    return getCacheArray(noteOfProfileCache, pubkey, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool.sub(relays, [{
            kinds: [Kind.Text],
            authors: [pubkey],
        }]);

        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            // sub.unsub();
        });
    })
}

const isEventFlood = (event: any): boolean => {
    let cached = getCacheData(floodContentMap, event.pubkey, {
        create: (): {
            latest: any[]
        } => ({ latest: [] })
    });
    let lastest = cached.data.value.latest;
    if (lastest.some((e: any) =>
        e.content == event.content && event.id != e.id)
        || (lastest.length > 0
            && Date.now() - lastest[lastest.length - 1].create_at < 60 * 1000)) {
        // TODO fix check prev
        return true;
    } else {
        if (lastest.length > 10) {
            lastest.shift();
        }
        lastest.push(event);
        return false;
    }
}

const isFlood = (em: EventModel): boolean => {
    return isEventFlood(em.event);
}

const datasource = {
    checkNip05, getProfile, getNotes, getNotesOfPubkey, isFlood
}

export default datasource;
