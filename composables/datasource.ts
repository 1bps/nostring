import * as _relay from "nostr-tools/relay";
import * as nip19 from "nostr-tools/nip19";

const {
    relayInit
} = _relay;

const profileCache: any = {};
const noteCache: any = {};
const eventCache: any = {};

const profile = (pubkey: string): Object => {
    let cached = profileCache[pubkey];
    if (!cached) {
        cached = reactive({ pubkey: pubkey });
        profileCache[pubkey] = cached;

        if (process.client) {
            const relay = relayInit("wss://relay.damus.io");
            relay.connect().then(() => {
                relay.on("connect", () => {
                    console.log(`connected to ${relay.url}`);
                });
                relay.on("error", () => {
                    console.log(`failed to connect to ${relay.url}`);
                });

                let sub = relay.sub([
                    {
                        kinds: [0],
                        authors: [pubkey],
                    },
                ]);
                sub.on("event", (event: any) => {
                    console.log("we got the event we wanted:", event);
                    if (event.kind == 0) {
                        let content = JSON.parse(event.content);
                        let cachedProfile = datasource.profile(event.pubkey);
                        Object.assign(cachedProfile, {
                            id: event.id,
                            event: event,
                            pubkey: event.pubkey,
                            username: content.name,
                            displayName: content.display_name,
                            nip05: content.nip05,
                            bio: content.about,
                            avatar: content.picture,
                            banner: content.banner,
                            website: content.website,
                            lud16: content.lud16,
                            nip19: nip19.npubEncode(event.pubkey)
                        });
                    }
                });
                sub.on("eose", () => {
                    sub.unsub();
                });
            });
        }
    }
    return cached;
}

const datasource = {
    profile: profile,
}

export default datasource;
