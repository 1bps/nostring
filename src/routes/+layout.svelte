<script>
    import Button from "$lib/ui/Button.svelte";
    import Text from "$lib/ui/Text.svelte";
    import Space from "$lib/ui/Space.svelte";
    import "./styles.css";
    import {
        IconBell,
        IconHome,
        IconMail,
        IconSearch,
        IconUser,
        IconUsers,
    } from "@tabler/icons-svelte";
    import { useAuth } from "$lib/user-config";
    import Avatar from "$lib/ui/Avatar.svelte";
    import { get } from "svelte/store";

    const auth = useAuth();

    let showComposeModal = false;
</script>

<div class="app">
    <header>
        <nav>
            <a href="/">
                <Button size="xl" justify="flex-start" text>
                    <IconHome size={18} slot="icon" />
                    <Text class="nav-item-label">Home</Text>
                </Button>
            </a>
            <a href="/global">
                <Button size="xl" justify="flex-start" text>
                    <IconSearch slot="icon" size={18} />
                    <Text class="nav-item-label">Discovery</Text>
                </Button>
            </a>
            <Button
                v-if="auth.currentIdentity"
                size="xl"
                justify="flex-start"
                text
            >
                <IconMail slot="icon" size={18} />
                <Text class="nav-item-label">Messages</Text>
            </Button>
            <Button size="xl" justify="flex-start" text>
                <IconUsers slot="icon" size={18} />
                <Text class="nav-item-label">Channels</Text>
            </Button>
            <Button
                v-if="auth.currentIdentity"
                size="xl"
                justify="flex-start"
                text
            >
                <IconBell slot="icon" size={18} />
                <Text class="nav-item-label">Notifications</Text>
            </Button>
            {#if $auth.currentIdentity}
                <a href={`/p/${get($auth.currentProfile)?.nip19}`}>
                    <Button size="xl" justify="flex-start" text>
                        <IconUser slot="icon" size={18} />
                        <Text class="nav-item-label">Profile</Text>
                    </Button>
                </a>

                <Button
                    type="primary"
                    round
                    size="l"
                    on:click={() => (showComposeModal = true)}>Compose</Button
                >
            {/if}
        </nav>

        {#if $auth.currentIdentity}
            <nav style="position:absolute; bottom: 10px">
                <div>
                    <div style="position: absolute">
                        <Avatar
                            image={get($auth.currentProfile)?.metadata?.picture}
                            style="width: 48px; height: 48px;"
                        />
                    </div>
                    <Space
                        class="id"
                        gap={1}
                        vertical
                        style="padding-left: 56px"
                    >
                        <!-- <NameDisplay
                            >{auth.currentProfile?.metadata?.display_name ||
                                auth.currentProfile?.metadata?.name ||
                                auth.currentProfile?.pubkey?.substring(
                                    0,
                                    12
                                )}</NameDisplay
                        >
                        <Space gap={1} style="align-items: center">
                            <Name
                                >{auth.currentProfile?.metadata?.name ||
                                    `${auth.currentProfile?.nip19?.substr(
                                        4,
                                        8
                                    )}:${auth.currentProfile?.nip19?.substr(
                                        auth.currentProfile?.nip19?.length - 8
                                    )}`}</Name
                            >
                            <Nip05
                                v-if="auth.currentProfile?.metadata?.nip05"
                                :profile="auth.currentProfile"
                                :status="'loading'"
                                :show-detail="false"
                            />
                        </Space> -->
                    </Space>
                </div>
            </nav>
        {/if}
    </header>
    <slot />
</div>

<style></style>
