<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/ui/Button.svelte";
    import { IconHome } from "@tabler/icons-svelte";
    import { nip19 } from "nostr-tools";
    import Profile from "../Profile.svelte";

    let npub = `npub${$page.params.part}`;
    let hex = "";

    let result = nip19.decode(npub);
    if (result.type === "npub") {
        hex = result.data as string;
    }
</script>

<Profile
    profile={{
        nip19: npub,
        metadata: {
            name: "name",
            display_name: "Display Name",
            nip05: "name@domain.tld"
        },
    }}
/>