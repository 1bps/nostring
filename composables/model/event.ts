import { Event } from 'nostr-tools';

export class EventModel {
    protected _e: Event;

    constructor(e: Event) {
        this._e = e;
    }

    get e(): Event {
        return this._e;
    }

    get createdAt(): Date | undefined {
        return this.e?.created_at ? new Date(this.e?.created_at / 1000) : undefined;
    }
}