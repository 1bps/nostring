import datasource from "../datasource";
import { ProfileModel } from "./profile";
import { EventModel } from "./event";
import { Event } from 'nostr-tools';
import { Ref } from "nuxt/dist/app/compat/capi";

export interface ContactsModel extends EventModel {
    id?: string;
    list?: any[];
}

const fromEvent = (e: Event): ContactsModel => {
    return {
        id: e.id,
        event: e,
        createdAt: new Date(e.created_at * 1000),
        list: e.tags
            .filter(tag => tag && tag.length >= 2 && tag[0] === 'p')
            // .map(tag => computed(() => datasource.getProfile(tag[1]).data.value))
    };
}

const contacts = {
    fromEvent,
}

export default contacts;
