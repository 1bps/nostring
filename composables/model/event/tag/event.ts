import { EventTag } from "../tag";

export class EventTagEvent implements EventTag {
    type = 'e';
    id: string;
    relay: string;
    marker: string;

    constructor(tag: string[]) {
        this.id = tag && tag.length >= 2 ? tag[1] : '';
        this.relay = tag && tag.length >= 3 ? tag[2] : '';
        this.marker = tag && tag.length >= 4 ? tag[3] : '';
    }

}