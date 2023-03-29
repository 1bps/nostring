<script lang="ts">
    import {
        IconDiscountCheck,
        IconDiscountCheckFilled,
        IconCircleCheck,
        IconCircleCheckFilled,
        IconAlertCircle,
        IconAlertCircleFilled,
        IconCircleX,
        IconCircleXFilled,
        IconQuestionMark,
    } from "@tabler/icons-svelte";
    import type { ProfileModel } from "$lib/model/profile";
    import Text from "$lib/ui/Text.svelte";
    import Icon from "$lib/ui/Icon.svelte";

    export let profile: ProfileModel;
    export let showDetail: boolean = true;
    export let defaultStatus: string = "loading";

    $: status = profile?.nip05?.status || defaultStatus;

    $: verifiedWithName =
        status == "verified" &&
        ((profile?.metadata?.name &&
            profile.metadata.nip05
                ?.toLowerCase()
                .startsWith(profile.metadata?.name.toLowerCase())) || // @abc `Abc@domain.tld`
            profile.metadata.nip05.startsWith("_@") || // `_@domain.tld`
            profile.metadata.nip05.indexOf("@") == -1); // `domain.tld`
</script>

<Text
    type="tertiary"
    class={[
        "nip05",
        `nip05-${status}`,
        verifiedWithName ? "name-verified" : "",
    ].join(" ")}
>
    <Icon style="overflow:hidden">
        {#if status === "verified"}
            {#if verifiedWithName}
                <IconDiscountCheckFilled size={18} />
            {:else}
                <IconDiscountCheckFilled size={18} />
            {/if}
        {:else if status === "loading"}
            <IconQuestionMark size={18} />
        {:else if status === "fail"}
            <IconAlertCircleFilled size={18} />
        {:else if status === "fake"}
            <IconCircleXFilled size={18} />
        {/if}

        {#if verifiedWithName}
            <span>@</span>
        {/if}
    </Icon>
    {#if showDetail}
        {#if verifiedWithName}
            {profile?.metadata?.nip05
                .replace(new RegExp(`${profile?.metadata?.name}@`, "ig"), "")
                .replace(`_@`, "")}
        {:else}
            {profile?.metadata?.nip05?.replace("_@", "")}
        {/if}
    {/if}
</Text>

<style lang="scss">
    .nip05 {
        display: inline-flex;
        align-items: center;
    }
    .nip05-verified {
        --text-color: #105795 !important;

        &.name-verified {
            color: var(--bg-color);
            background-color: transparent;
            background-image: repeating-linear-gradient(
                15deg,
                #179510,
                #107993 5px,
                #93108c 25px,
                #937410 40px,
                #179510 55px
            );
            position: relative;

            &::before {
                content: " ";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: inherit;
                mix-blend-mode: difference;
                pointer-events: none;
            }
        }
    }

    .nip05-fake {
        --text-color: #952810 !important;
        text-decoration-line: line-through;
    }

    .nip05-fail {
        --text-color: #956410 !important;
    }
</style>
