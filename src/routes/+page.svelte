<script lang="ts">
    import Button from "$lib/ui/Button.svelte";
    import { IconHome } from "@tabler/icons-svelte";
</script>

<h1>Hello</h1>
<Button round>
    <IconHome slot="icon" />
    World
</Button>
