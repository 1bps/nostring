import { getPublicKey } from "nostr-tools";
import { get, readable, writable, type Readable } from "svelte/store";
import type { ProfileModel } from "./model/profile";

export interface Identity {
    pubkey?: string;
    seckey?: string;
}

const holder = writable({
    identites: [] as Identity[],
    currentIdentityIndex: -1,
});

if (process.client) {
    let settings = localStorage.getItem("nostring");
    if (settings) {
        holder.set({ ...JSON.parse(settings) });
    }
}

export function login(identity: Identity, fireNew = false) {
    if (!identity.pubkey && !identity.seckey) {
        return;
    }
    if (!identity.pubkey && identity.seckey) {
        identity.pubkey = getPublicKey(identity.seckey);
    }
    let auth = get(holder);
    auth.identites.push(identity);
    if (auth.currentIdentityIndex < 0 && auth.identites.length > 0) {
        auth.currentIdentityIndex = auth.identites.length - 1;
    }

    if (fireNew) {
        //
        if (identity.pubkey) {
            // follow self to init contacts
            // datasource.addContact(identity.pubkey, identity, () => { });
        }
    }

    save();
}

function save() {
    if (process.client) {
        localStorage.setItem("nostring", JSON.stringify(get(holder)));
    }
}

export function logout(pubkey: string) {
    let auth = get(holder);
    let index = auth.identites.findIndex(identity => identity.pubkey === pubkey);

    if (index) {
        auth.identites.slice(index, 1);
    }

    if (auth.identites.length <= auth.currentIdentityIndex) {
        auth.currentIdentityIndex = auth.identites.length - 1;
    }

    save();
}

let currentIdentity = readable<Identity | undefined>(undefined, (set) => {
    let auth = get(holder);
    let identity = auth.currentIdentityIndex >= 0 && auth.currentIdentityIndex < auth.identites.length ? auth.identites[auth.currentIdentityIndex] : undefined;
    set(identity);
});

let currentProfile = readable<ProfileModel | undefined>(undefined, (set) => {
    let identity = get(currentIdentity);
    let profile =
        identity?.pubkey
            ? datasource.getProfile(identity?.pubkey).data.value
            : undefined;

    set(identity);
});

// let currentContacts = computed(() => currentIdentity.value?.pubkey
//     ? datasource.getContacts(currentIdentity.value?.pubkey).data.value
//     : undefined);

const auth = readable({
    login,
    currentIdentity,
    currentProfile,
    // currentContacts,
    // showProfileFormModal: ref(false)
});

export const useAuth = () => auth;