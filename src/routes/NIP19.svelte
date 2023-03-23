<script setup lang="ts">
    import Icon from "$lib/ui/Icon.svelte";
    import Text from "$lib/ui/Text.svelte";
    import Space from "$lib/ui/Space.svelte";
    import { IconKey, IconCopy, IconCheck } from "@tabler/icons-svelte";

    export let nip19: string;

    let timeout: any;

    $: copied = false;

    const clickHandler = () => {
        navigator.clipboard.writeText(nip19);
        copied = true;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => (copied = false), 5000);
    };
</script>

<Space
    gap={0}
    style="padding: 5px 10px; background: #111; border-radius: 5px; margin-top: 10px; cursor: pointer"
    @click="clickHandler"
>
    <Text type="tertiary" style="margin-right: 3px">
        <Icon>
            <IconKey />
        </Icon>
    </Text>
    <Text type="tertiary">{nip19?.substr(0, 4)}</Text>
    <Text type="tertiary" ellipsis style="flex-shrink: 1">
        {nip19?.substr(4, nip19?.length - 32)}
    </Text>
    <Text type="tertiary">{nip19?.substring(nip19?.length - 16)}</Text>
    <Text
        style="margin-left: 3px; flex-grow:1;justify-content: end;
                                        display: inline-flex;"
        type={copied ? "success" : "default"}
    >
        <Icon>
            {#if copied}
                <IconCheck />
            {:else}
                <IconCopy />
            {/if}
        </Icon>
        {#if copied}
            Copied
        {/if}
    </Text>
</Space>
