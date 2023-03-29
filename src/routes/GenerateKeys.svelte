<script lang="ts">
    import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";
    import Text from "$lib/ui/Text.svelte";
    import Space from "$lib/ui/Space.svelte";
    import Button from "$lib/ui/Button.svelte";
    import { useAuth } from "$lib/user-config";
    import { createEventDispatcher } from "svelte";
    import NIP19 from "./NIP19.svelte";

    const dispath = createEventDispatcher();

    const auth = useAuth();

    let  privateKey: string;
    $: publicKey = privateKey && getPublicKey(privateKey);
    $: nsec = privateKey && nip19.nsecEncode(privateKey);
    $: npub = publicKey && nip19.npubEncode(publicKey);

    const generate = () => {
        privateKey = generatePrivateKey();
    };

    generate();

    const handleStart = () => {
        $auth.login({ pubkey: publicKey, seckey: privateKey }, true);
        dispath("close");
    };
</script>

<Space vertical gap={15}>
    <Text
        >This is your private key. Please click to copy and save it secretly.
        DON NOT share this with anyone! Once others know this, they will own
        your account.</Text
    >
    <NIP19 nip19={nsec} />
    <Text>This is your public key for others to identity you.</Text>
    <NIP19 nip19={npub} />

    <Space justify="flex-end" align="end">
        <Button round on:click={generate}>Generate New One</Button>
        <Button type="primary" round on:click={handleStart}
            >Start Nostring</Button
        >
    </Space>
</Space>
