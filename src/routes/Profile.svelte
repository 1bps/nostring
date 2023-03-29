<script lang="ts">
    import Space from "$lib/ui/Space.svelte";
    import NIP05 from "./NIP05.svelte";
    import NIP19 from "./NIP19.svelte";

    import ProfileName from "./ProfileName.svelte";

    export let profile: any;
    export let mini: boolean = false;
</script>

<div class="profile">
    <header>
        <div class="banner" />
        <div class="content">
            <Space>
                <div class="avatar-wrapper" />
                <div class="actions" />
            </Space>
            <Space>
                <ProfileName {profile} />
                <NIP05 {profile} />
            </Space>
            <div class="nip19-wrapper">
                <NIP19 nip19={profile.nip19} />
            </div>
        </div>
    </header>
    <div class="bio">blabla</div>
    <div class="meta">blabla</div>
    <div class="stat">blabla</div>
</div>

<style lang="scss">
    .profile {
        display: flex;
        flex-direction: column;
        gap: 5px;

        header {
            padding-top: 88px;

            &.with-banner {
                padding: 0;
            }

            .banner {
                height: 196px;
            }

            .content {
                padding: 10px;
                display: flex;
                flex-direction: column;

                .avatar-wrapper {
                    --width: calc(min(max(21.33%, 74px), 138px));
                    position: relative;
                    width: var(--width);
                    padding-bottom: var(--width);
                    margin-top: calc(37px - var(--width));
                    flex-shrink: 0;

                    .avatar {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }
                }

                .actions {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-end;
                    gap: 10px;
                }
            }
        }

        .bio {
            padding-left: 10px;
            padding-right: 10px;
        }

        .meta {
            padding-left: 3px;
            padding-right: 3px;
        }

        .stat {
            padding: 5px 10px;
        }
    }
</style>
