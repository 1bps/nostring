import { nip19, Event } from "nostr-tools";
import { createEventModel, EventModel } from "./event";
import { Ref } from "nuxt/dist/app/compat/capi";
import { ContactsModel } from "./contacts";

export interface ProfileModel extends EventModel {
    metadata?: any;
    nip19?: string;
    contacts?: ContactsModel;
    nip05?: {
        identity?: string;
        status?: string;
        alias?: string[];
    }
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
        contacts: computed(() => datasource.getContacts(e.pubkey).data.value),
        nip05: computed(() => {
            if (metadata.value.nip05) {
                return {
                    identity: metadata.value.nip05,
                    status: datasource.checkNip05(e.pubkey, metadata.value.nip05).data.value
                }
            }
            return {};
        }),
    });
}