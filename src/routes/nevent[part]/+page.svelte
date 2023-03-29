<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/ui/Button.svelte";
    import { IconHome } from "@tabler/icons-svelte";
    import { nip19 } from "nostr-tools";

    let npub = `nevent${$page.params.part}`;
    let hex = "";

    let result = nip19.decode(npub);
    if (result.type === "nevent") {
        hex = result.data as string;
    }
</script>

<h1>Hello</h1>
<Button round>
    <IconHome slot="icon" />
    World, {hex}
</Button>
