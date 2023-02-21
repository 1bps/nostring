import { getPublicKey } from "nostr-tools";

export interface Identity {
    pubkey?: string;
    seckey?: string;
}

const holder = ref({
    identites: [] as Identity[],
    currentIdentityIndex: -1,
});

if (!process || !process.server) {
    let settings = localStorage.getItem("nostring");
    if (settings) {
        holder.value = { ...JSON.parse(settings) };
    }
}

export function login(identity: Identity) {
    if (!identity.pubkey && !identity.seckey) {
        return;
    }
    if (!identity.pubkey && identity.seckey) {
        identity.pubkey = getPublicKey(identity.seckey);
    }
    holder.value.identites.push(identity);
    if (holder.value.currentIdentityIndex < 0 && holder.value.identites.length > 0) {
        holder.value.currentIdentityIndex = 0;
    }

    save();
}

function save() {
    if (!process || !process.server) {
        localStorage.setItem("nostring", JSON.stringify(holder));
    }
}

export function logout(pubkey: string) {
    let index = holder.value.identites.findIndex(identity => identity.pubkey === pubkey);

    if (index) {
        holder.value.identites.slice(index, 1);
    }

    if (holder.value.identites.length <= holder.value.currentIdentityIndex) {
        holder.value.currentIdentityIndex = holder.value.identites.length - 1;
    }

    save();
}

const auth = reactive({
    login,
    currentIdentity: computed(() => holder.value.currentIdentityIndex >= 0 && holder.value.currentIdentityIndex < holder.value.identites.length ? holder.value.identites[holder.value.currentIdentityIndex] : undefined)
});

export const useAuth = () => auth;