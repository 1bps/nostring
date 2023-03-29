<script lang="ts">
    import { page } from "$app/stores";
    import { nip05, nip19 } from "nostr-tools";

    let hex = "";

    {
        let id = $page.params.id;

        if (/^n[A-Za-z0-9]+$/.test(id)) {
            let result = nip19.decode(id);
            if (result.type === "npub") {
                hex = result.data as string;
            }
        } else if (/^([A-Za-z0-9-_]+@)?\w+(\.\w+)+$/.test(id)) {
            // let nip05Profile = await nip05.queryProfile(id);
            // hex = nip05Profile?.pubkey || "";
        } else if (/^[A-Fa-f0-9]{64}/.test(id)) {
            hex = id;
        } else {
            console.error("unknown id:", id);
        }
    }
</script>

<h1>Hello, {hex}</h1>