import { EventModel } from "./event";
import { Event } from 'nostr-tools';
import { EventTagProfile } from "./event/tag";

export class ContactsModel extends EventModel {

    private _list: EventTagProfile[];

    constructor(e: Event) {
        super(e);
        this._list = e.tags
            .filter(tag => tag && tag.length >= 2 && tag[0] === 'p')
            .map(tag => new EventTagProfile(tag));
    }

    get list(): EventTagProfile[] {
        return this._list;
    }
}