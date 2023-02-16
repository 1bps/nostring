<template>
    <NostringSpace gap="0" style="padding: 5px 10px; background: #111; border-radius: 5px; margin-top: 10px">
        <NostringText type="tertiary" style="margin-right: 3px">
            <NostringIcon>
                <KeyOutline />
            </NostringIcon>
        </NostringText>
        <NostringText type="tertiary">{{ nip19?.substr(0, 4) }} </NostringText>
        <NostringText type="tertiary" ellipsis style="flex-shrink: 1">
            {{ nip19?.substr(4, nip19?.length - 32) }}
        </NostringText>
        <NostringText type="tertiary">{{ nip19?.substring(nip19?.length - 16) }}
        </NostringText>
        <NostringText style="margin-left: 3px; flex-grow:1;justify-content: end;
    display: inline-flex;">
            <NostringIcon>
                <CopyOutline />
            </NostringIcon>
        </NostringText>
</NostringSpace>
</template>

<script setup lang="ts">


import { KeyOutline, CopyOutline } from "@vicons/ionicons5";

interface Props {
    nip19: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
