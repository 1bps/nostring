<script lang="ts">
    import Button from "$lib/ui/Button.svelte";
    import Form from "$lib/ui/Form.svelte";
    import FormItem from "$lib/ui/form/FormItem.svelte";
    import Space from "$lib/ui/Space.svelte";
    import { useAuth } from "$lib/user-config";
    import { getPublicKey, nip19 } from "nostr-tools";
    import { createEventDispatcher } from "svelte";

    const auth = useAuth();

    let key: string;

    const dispath = createEventDispatcher();

    const handleStart = () => {
        let k = nip19.decode(key);
        if (k.type == "npub") {
            $auth.login({ pubkey: k.data as string }, false);
            dispath("close");
        } else if (k.type == "nsec") {
            let seckey = k.data as string;
            let pubkey = getPublicKey(seckey);
            $auth.login({ pubkey, seckey }, false);
            dispath("close");
        } else {
        }
    };
</script>

<template>
    <Form>
        <FormItem>
            <svelte:fragment slot="label">npub or nsec</svelte:fragment>

            <input value={key} placeholder="npub... or nsec" required />

            <svelte:fragment slot="description" />
            <svelte:fragment slot="message">Name</svelte:fragment>
        </FormItem>

        <Space justify="flex-end">
            <Button type="primary" round on:click={handleStart}
                >Start Nostring</Button
            >
        </Space>
    </Form>
</template>
