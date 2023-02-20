import { getPublicKey } from "nostr-tools";

export interface Identity {
    pubkey?: string;
    seckey?: string;
}

const holder = reactive({
    identites: [] as Identity[],
    currentIdentityIndex: -1,
});

if (!process || !process.server) {
    const settings = localStorage.getItem("nostring");
}

export function login(identity: Identity) {
    if (!identity.pubkey && !identity.seckey) {
        return;
    }
    if (!identity.pubkey && identity.seckey) {
        identity.pubkey = getPublicKey(identity.seckey);
    }
    holder.identites.push(identity);
    if (holder.currentIdentityIndex < 0 && holder.identites.length > 0) {
        holder.currentIdentityIndex = 0;
    }

    save();
}

function save() {
    if (!process || !process.server) {
        localStorage.setItem("nostring", JSON.stringify(holder));
    }
}

export function logout(pubkey: string) {
    let index = holder.identites.findIndex(identity => identity.pubkey === pubkey);

    if (index) {
        holder.identites.slice(index, 1);
    }

    if (holder.identites.length <= holder.currentIdentityIndex) {
        holder.currentIdentityIndex = holder.identites.length - 1;
    }

    save();
}

const auth = reactive({
    login,
    currentIdentity: computed(() => holder.currentIdentityIndex > 0 && holder.currentIdentityIndex < holder.identites.length ? holder.identites[holder.currentIdentityIndex] : undefined)
});

export const useAuth = () => auth;