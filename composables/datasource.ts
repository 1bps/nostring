import {
    SimplePool,
    Kind,
    nip05,
    nip19,
    UnsignedEvent,
    finishEvent
} from "nostr-tools";

import { createProfileModel, ProfileModel } from "@/composables/model/profile";
import { NoteModel, createNoteModel } from "@/composables/model/note";
import { Event } from 'nostr-tools';
import { EventModel } from "./model/event";
import { Ref } from "nuxt/dist/app/compat/capi";
import { ContactsModel, createContactsModel } from "./model/contacts";
import { EventTagEvent } from "./model/event/tag";
import { Identity } from "./user-config";

const pool = new SimplePool();

const pool2 = new SimplePool();

const DEFAULT_RELAYS = [
    "wss://relay.1bps.io",
    "wss://relay.damus.io",
    // "wss://relay.snort.social",
    "wss://relay.nostr.info"
];

const profileCache: any = {};
const contactsCache: any = {};
const noteOfProfileCache: any = {};
const noteOfFollowingsCache: any = {};
const notesCache: any = {};
const noteCache: any = {};
const repliesCache: any = {};
const reactionsOfNoteCache: any = {};
const eventCache: any = {};
const nip05Cache: any = {};
const floodContentMap: any = {};

interface Cached<T> {
    data: Ref<T>;
    expiredAt?: number;
    loading?: boolean;
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
        cached = { data: ref<T>(handler.create()), expiredAt: Date.now() - 1e3};
        cache[key] = cached;
    }
    
    if (cached.expiredAt < 0 || cached.expiredAt <= Date.now()) {
        if (process.client && !cached.loading) {
            if(handler.update){
                cached.loading = true;
                handler.update(key,cached);
            }
        }
    }
    return cached;
}

let getProfileCached = (pubkey: string,
    update?: CacheUpdate<ProfileModel>): Cached<ProfileModel> => {
    return getCacheData(profileCache, pubkey, {
        create: () => ({
            pubkey,
            nip19: nip19.npubEncode(pubkey)
        }),
        update
    });
}

let getContactsCached = (pubkey: string,
    update?: CacheUpdate<ContactsModel>): Cached<ContactsModel> => {
    return getCacheData(contactsCache, pubkey, {
        create: () => ({
            pubkey
        }),
        update
    });
}

let getNoteCached = (id: string,
    update?: CacheUpdate<NoteModel>): Cached<NoteModel> => {
    return getCacheData(noteCache, id, {
        create: () => ({
            id
        }),
        update
    });
}

let subEventHandler = (event: Event) => {
    try {
        if (event.kind === Kind.Metadata) {
            let cached = getProfileCached(event.pubkey);
            cached.data.value = createProfileModel(event).value;
            cached.expiredAt = Date.now() + 60 * 1000 * 5;
        } else if (event.kind === Kind.Text) {
            if (!event.id) {
                return;
            }
            let cached = getNoteCached(event.id);
            let noteModel = createNoteModel(event).value;
            cached.data.value = noteModel;
            cached.expiredAt = Date.now() + 60 * 1000 * 5;
            // global
            let cachedGlobal = getCacheArray(notesCache, '');

            let cachedOfProfile = getCacheArray(noteOfProfileCache, event.pubkey);

            if (event.tags) {
                let eventTags = event.tags
                    .filter(tag => tag && tag.length >= 2 && tag[0] === 'e')
                    .map(tag => new EventTagEvent(tag));
                if (eventTags.length == 1) {
                    // only one e tag as a reply for older version
                    if (noteModel.content) {
                        // add
                        let repliesCached = getCacheArray(repliesCache, eventTags[0].id);
                        if (!repliesCached.data.value.some((n: any) => n.id === event.id)) {
                            repliesCached.data.value.push(noteModel);
                        }
                    } else {
                        // TODO repost
                    }
                } else {
                    eventTags
                        .filter(et =>
                            et.marker === 'root'
                            || et.marker === 'reply')
                        .forEach(et => {
                            // add
                            let repliesCached = getCacheArray(repliesCache, et.id);
                            if (!repliesCached.data.value.some((n: any) => n.id === event.id)) {
                                repliesCached.data.value.push(noteModel);
                            }

                        })
                }
            }

            // anti spam
            if (!isFlood(noteModel)) {
                if (cachedGlobal.data.value.indexOf(noteModel) == -1) {
                    cachedGlobal.data.value.push(noteModel);
                }
            }

            if (cachedOfProfile.data.value.indexOf(noteModel) == -1) {
                cachedOfProfile.data.value.push(noteModel);
            }
        } else if (event.kind === Kind.Contacts) {
            let cached = getContactsCached(event.pubkey);
            let contactsModel = createContactsModel(event).value;
            cached.data.value = contactsModel;
            cached.expiredAt = Date.now() + 60 * 1000 * 5;
        }else if (event.kind === Kind.Reaction) {
            event.tags
                .filter(t=>t && t.length >= 2 && t[0] == 'e')
                .forEach(t=>{
                    let cachedOfNote = getCacheArray(reactionsOfNoteCache, event.pubkey);
                    // TODO
                })
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
            }).finally(() => {
                cached.expiredAt = Date.now() + 1000 * 60 * 5;
                cached.loading = false;
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
                cached.loading = false;
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
            limit: 10,
        }]);
        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            // sub.unsub();
        });
    });
}

const getNotesOfFollowings = (pubkey: string, followings: string[]): Cached<NoteModel[]> => {
    return getCacheArray(noteOfFollowingsCache, pubkey, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool2.sub(relays, [{
            kinds: [Kind.Text],
            authors: followings,
        }]);
        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            // sub.unsub();
        });
    })
}

const getNotesOfPubkey = (pubkey: string): Cached<NoteModel[]> => {
    return getCacheArray(noteOfProfileCache, pubkey, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool2.sub(relays, [{
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
            cached.loading = false;
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
            cached.loading = false;
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
            sub.unsub();
        });
    });
}

const getReactionsOfNote = (hex: string): Cached<NoteModel[]> => {
    return getCacheArray(reactionsOfNoteCache, hex, (key, cached) => {
        let relays = [...DEFAULT_RELAYS];
        let sub = pool.sub(relays, [{
            kinds: [Kind.Reaction],
            '#e': [hex],
        }]);
        sub.on("event", subEventHandler);
        sub.on("eose", () => {
            sub.unsub();
        });
    });
}

const updateProfile = (content: string, identity: Identity, cb: any): boolean => {
    let pubkey = identity?.pubkey as string;
    let unsigned: UnsignedEvent = {
        kind: Kind.Metadata,
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content
    }

    console.log('prepare event:', unsigned);

    let event = finishEvent(unsigned, identity?.seckey as string);

    let pub = pool.publish([...DEFAULT_RELAYS], event);
    pub.on('ok', () => {
        console.log('profile updated.')
        subEventHandler(event);
    });

    return true;
}

const addContact = (profilePubkey: string, identity: Identity, cb: any): boolean => {
    let pubkey = identity?.pubkey as string;
    let contacts = getContacts(pubkey);

    let existList = contacts?.data?.value?.list || [];

    if(existList.some(e=>e.id == profilePubkey)){
        // following
        return true;
    }

    let unsigned: UnsignedEvent = {
        kind: Kind.Contacts,
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [['p', profilePubkey], ...contacts?.data?.value?.event?.tags|| []],
        content:""
    }

    let event = finishEvent(unsigned, identity?.seckey as string);

    let pub = pool.publish([...DEFAULT_RELAYS], event);
    pub.on('ok', () => {
        console.log('contacts updated.')
        subEventHandler(event);
    });
    return true;
}

const publishEvent = (event:Event)=>{

}

const publishContent = (content: string, identity: Identity, cb: any): boolean => {
    let pubkey = identity?.pubkey as string;
    let unsigned: UnsignedEvent = {
        kind: Kind.Text,
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content
    }

    console.log('prepare event:', unsigned);

    let event = finishEvent(unsigned, identity?.seckey as string);

    let pub = pool.publish([...DEFAULT_RELAYS], event);
    pub.on('ok', () => {
        console.log('published')
        subEventHandler(event);
    });

    return true;
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
    updateProfile,
    addContact,
    getNotesOfFollowings,
    getReactionsOfNote,
    publishContent
    
}

export default datasource;
