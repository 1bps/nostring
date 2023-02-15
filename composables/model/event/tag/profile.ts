import { EventTag } from "../tag";

export class EventTagProfile implements EventTag {
    type = 'p';
    id: string;

    constructor(tag: string[]) {
        this.id = tag && tag.length >= 2 ? tag[1] : '';
    }

}