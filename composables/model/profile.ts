import * as nip19 from "nostr-tools/nip19";

const fromEvent = (e: any): Object => {
    let content = JSON.parse(e.content);
    let cachedNip05Check = datasource.checkNip05(content.nip05);
    return reactive({
        id: e.id,
        event: e,
        pubkey: e.pubkey,
        name: content.name,
        displayName: content.display_name,
        nip05: content.nip05,
        nip05Check: cachedNip05Check.data,
        bio: content.about,
        avatar: content.picture,
        banner: content.banner,
        website: content.website,
        lud16: content.lud16,
        nip19: nip19.npubEncode(e.pubkey),
        createdAt: new Date(e.created_at * 1000),
    });
}

const profile = {
    fromEvent,
}

export default profile;
