import * as _nostrTools from "nostr-tools";

import profile, { ProfileModel } from "@/composables/model/profile";
import note, { NoteModel } from "@/composables/model/note";
import { Event } from 'nostr-tools';
import { EventModel } from "./model/event";
import { Ref } from "nuxt/dist/app/compat/capi";
import contacts, { ContactsModel } from "./model/contacts";
import { EventTagEvent } from "./model/event/tag/event";

const {
    SimplePool,
    Kind,
    nip05,
    nip19,
} = _nostrTools;

const pool = new SimplePool();

const DEFAULT_RELAYS = ["wss://relay.damus.io", "wss://relay.1bps.io"];

const profileCache: any = {};
const contactsCache: any = {};
const noteOfProfileCache: any = {};
const notesCache: any = {};
const noteCache: any = {};
const repliesCache: any = {};
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

let getContactsCached = (pubkey: string,
    update?: CacheUpdate<ContactsModel>): Cached<ContactsModel> => {
    return getCacheData(contactsCache, pubkey, {
        create: () => ({}),
        update
    });
}

let getNoteCached = (id: string,
    update?: CacheUpdate<NoteModel>): Cached<NoteModel> => {
    return getCacheData(noteCache, id, {
        create: () => ({
            id: id,
            nip19: nip19.npubEncode(id)
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
            // global
            let cachedGlobal = getCacheArray(notesCache, '');

            // author
            let cachedOfPubkey = getCacheArray(noteOfProfileCache, event.pubkey);

            // note
            let noteModel = note.fromEvent(event);
            if (event.id) {
                let cached = getNoteCached(event.id);
                cached.data.value = noteModel;
            }

            if (event.tags) {
                let eventTags = event.tags
                    .filter(tag => tag && tag.length >= 2 && tag[0] === 'e')
                    .map(tag => new EventTagEvent(tag));
                if (eventTags.length == 1) {
                    // only one e tag as a reply for older version
                    if (noteModel.content) {
                        // add
                        let repliesCached = getCacheArray(repliesCache, eventTags[0].id);
                        repliesCached.data.value.push(noteModel);
                    }
                } else {
                    eventTags
                    .filter(et => 
                        et.marker === 'root' 
                        || et.marker === 'reply')
                    .forEach(et=>{
                        // add
                        let repliesCached = getCacheArray(repliesCache, et.id);
                        repliesCached.data.value.push(noteModel);
                    })
                }
            }

            // anti spam
            if (!isFlood(noteModel)) {
                cachedGlobal.data.value.push(noteModel);
            }
            cachedOfPubkey.data.value.push(noteModel);
        } else if (event.kind === Kind.Contacts) {
            let cached = getContactsCached(event.pubkey);
            let contactsModel = contacts.fromEvent(event);
            cached.data.value = contactsModel;
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
                sub.unsub();
            });
        }
    });
}

const getNotes = (): Cached<NoteModel[]> => {
    return getCacheArray(notesCache, '', (key, cached) => {
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

const getNote = (id: string): Cached<NoteModel> => {
    return getNoteCached(id, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool.sub(relays, [{
            kinds: [Kind.Text],
            ids: [id]
        }]);

        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            sub.unsub();
        });
    });
}

const getContacts = (pubkey: string): Cached<ContactsModel> => {
    return getContactsCached(pubkey, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool.sub(relays, [{
            kinds: [Kind.Contacts],
            authors: [pubkey]
        }]);

        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            sub.unsub();
        });
    });
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

const getReplies = (hex: string): Cached<NoteModel[]> => {
    return getCacheArray(repliesCache, hex, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool.sub(relays, [{
            kinds: [Kind.Text],
            '#e': [hex],
        }]);
        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            // sub.unsub();
        });
    });
}

const datasource = {
    checkNip05,
    getProfile,
    getNotes,
    getNotesOfPubkey,
    isFlood,
    getNote,
    getContacts,
    getReplies,
}

export default datasource;
