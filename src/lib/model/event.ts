import type { Event } from 'nostr-tools';
import { readable, type Readable } from 'svelte/store';
import type { EventTag } from './event/tag';

export interface EventModel {
    id?: string;
    event?: Event;
    pubkey?: string;
    createdAt?: Date;
    tags?: EventTag[];
}

export function createEventModel(e: Event): Readable<EventModel> {
    return readable({
        id: e.id,
        event: e,
        pubkey: e.pubkey,
        // createdAt: computed(() => e.created_at ? new Date(e.created_at * 1000) : undefined),
        // tags: computed(() => e.tags
        //     .filter(tag => tag && tag.length >= 2)
        //     .map(tag => new EventTag(tag)))
    });
}