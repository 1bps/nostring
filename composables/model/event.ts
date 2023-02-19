import { Ref } from 'vue';
import { Event } from 'nostr-tools';
import { EventTag } from './event/tag';

export interface EventModel {
    id?: string;
    event?: Event;
    pubkey?: string;
    createdAt?: Date;
    tags?: EventTag[];
}

export function createEventModel(e: Event): Ref<EventModel> {
    return ref({
        id: e.id,
        event: e,
        pubkey: computed(() => e.pubkey),
        createdAt: computed(() => e.created_at ? new Date(e.created_at * 1000) : undefined),
        tags: computed(() => e.tags
            .filter(tag => tag && tag.length >= 2)
            .map(tag => new EventTag(tag)))
    });
}