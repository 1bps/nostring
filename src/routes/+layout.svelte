<script>
    import Button from "$lib/ui/Button.svelte";
    import Text from "$lib/ui/Text.svelte";
    import Space from "$lib/ui/Space.svelte";
    import "./styles.css";
    import {
        IconBell,
        IconBrandGithub,
        IconHome,
        IconMail,
        IconSearch,
        IconUser,
        IconUsers,
    } from "@tabler/icons-svelte";
    import { useAuth } from "$lib/user-config";
    import Avatar from "$lib/ui/Avatar.svelte";
    import { get } from "svelte/store";
    import GenerateKeys from "./GenerateKeys.svelte";
    import Card from "$lib/ui/Card.svelte";
    import Modal from "$lib/ui/Modal.svelte";
    import Icon from "$lib/ui/Icon.svelte";
    import Login from "./Login.svelte";

    const auth = useAuth();

    let showComposeModal = false;

    let showLoginModal = false;
    let showGenModal = false;
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
            {#if $auth.currentIdentity}
                <Button size="xl" justify="flex-start" text>
                    <IconMail slot="icon" size={18} />
                    <Text class="nav-item-label">Messages</Text>
                </Button>
            {/if}
            <Button size="xl" justify="flex-start" text>
                <IconUsers slot="icon" size={18} />
                <Text class="nav-item-label">Channels</Text>
            </Button>
            {#if $auth.currentIdentity}
                <Button size="xl" justify="flex-start" text>
                    <IconBell slot="icon" size={18} />
                    <Text class="nav-item-label">Notifications</Text>
                </Button>

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
    <slot name="main">
        <div class="primary">
            <slot />
        </div>
        <aside class="sidebar">
            <nav>
                <Card>
                    <Space vertical gap={10}>
                        <Text type="primary">Start Nostring</Text>
                        <Button
                            round
                            size="l"
                            on:click={() => (showLoginModal = true)}
                            >Login with npub/nsec</Button
                        >
                        <Button round size="l">Login with Nostx/Alby</Button>
                        <Button
                            type="primary"
                            round
                            size="l"
                            on:click={() => (showGenModal = true)}
                            >Generate Identity</Button
                        >
                    </Space>
                </Card>
            </nav>

            <footer>
                <Space justify="center">
                    <Text type="tertiary" size="s">Nostring</Text>
                    <a href="https://github.com/1bps/nostring">
                        <Text type="tertiary" size="s">
                            <Icon>
                                <IconBrandGithub />
                            </Icon>
                        </Text>
                    </a>
                </Space>
            </footer>
        </aside>
        <Modal show={showGenModal}>
            <Card size="l">
                <GenerateKeys on:close={() => (showGenModal = false)} />
            </Card>
        </Modal>
        <Modal show={showLoginModal}>
            <Card size="l">
                <Login on:close={() => (showLoginModal = false)} />
            </Card>
        </Modal>
    </slot>
</div>

<style lang="scss">
    .app {
        height: 100%;
        display: flex;
        min-height: 512px;

        > header {
            flex-grow: 1;
            flex-shrink: 0;

            display: flex;
            flex-direction: column;
            align-items: flex-end;
            user-select: none;
            max-width: 33.33%;

            > nav {
                width: 275px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }

        > main {
            flex-basis: auto;
            flex-grow: 1;
            flex-shrink: 1;
            max-width: 100%;

            display: flex;
        }
    }

    @media screen and (max-width: 1280px) {
        .app {
            > header {
                > nav {
                    width: auto;

                    .nav-item-label {
                        display: none;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 500px) {
        .app {
            > header {
                > nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    flex-direction: row;
                    background: var(--bg-color);
                    border-top: 1px solid #123;
                    z-index: 1;
                    padding: 0 12px;
                    justify-content: space-between;
                }
            }
        }
    }

    .primary {
        max-width: 600px;
        width: 100%;
        border-left: 1px solid #123;
        border-right: 1px solid #123;
        flex-grow: 1;
        flex-shrink: 1;
    }

    .sidebar {
        width: 350px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;

        nav {
            display: flex;
            flex-direction: column;
        }

        footer {
            padding: 12px;
        }
    }

    @media screen and (max-width: 1004px) {
        .sidebar {
            display: none;
        }
    }

    @media screen and (max-width: 500px) {
        .primary {
            border: none;
        }
    }
</style>
