<script lang="ts">
    import type { ProfileModel } from "$lib/model/profile";
    import Text from "$lib/ui/Text.svelte";
    export let profile: ProfileModel;
</script>

<Text type="tertiary">
    <span class="profile-name">
        {profile.metadata?.name || profile.pubkey?.substring(0, 12)}
    </span>
</Text>

<style lang="scss">
    .profile-name {
        &::before {
            content: "@";
        }
    }
</style>
