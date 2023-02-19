import { nip19, Event } from "nostr-tools";
import { createEventModel, EventModel } from "./event";
import { Ref } from "nuxt/dist/app/compat/capi";
import { ContactsModel } from "./contacts";

export interface ProfileModel extends EventModel {
    metadata?: any;
    nip19?: string;
    contacts?: ContactsModel;
}

export function createProfileModel(e: Event): Ref<ProfileModel> {
    let { id, event, pubkey, createdAt } = createEventModel(e).value;
    let metadata = computed(() => e.content ? JSON.parse(e.content) : {});
    return ref({
        id,
        event,
        pubkey,
        createdAt,
        metadata,
        nip19: computed(() => nip19.npubEncode(e.pubkey)),
        contacts: computed(() => datasource.getContacts(e.pubkey).data.value)
    });
}