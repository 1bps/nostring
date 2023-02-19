import { createEventModel, EventModel } from "./event";
import { Event } from 'nostr-tools';
import { EventTagProfile } from "./event/tag";
import { Ref } from "vue";

export interface ContactsModel extends EventModel {
    list?: EventTagProfile[];
    content?: any;
}

export function createContactsModel(e: Event): Ref<ContactsModel> {
    let { id, event, createdAt } = createEventModel(e).value;
    return ref({
        id,
        event,
        createdAt,
        content: computed(() => e.content ? JSON.parse(e.content) : {}),
        list: computed(() => e.tags
            .filter(tag => tag && tag.length >= 2 && tag[0] === 'p')
            .map(tag => new EventTagProfile(tag)))
    });
}