import { Event } from 'nostr-tools';

export interface EventModel {
    event?: Event;
    createdAt?: Date;
}