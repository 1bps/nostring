<script lang="ts">
    import Button from "$lib/ui/Button.svelte";
    import { IconHome } from "@tabler/icons-svelte";

    import { user } from "$lib/reactive-test";
    import { get } from "svelte/store";

    let address = $user.address;
</script>

<h1>Hello</h1>
<Button round>
    <IconHome slot="icon" />
    World, {$address.city} {$user.name}
</Button>
