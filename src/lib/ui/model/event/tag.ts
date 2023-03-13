export class EventTag {
    protected _tag: string[];

    constructor(tag: string[]) {
        this._tag = tag;
    }

    get type(): string {
        return this._tag[0];
    }

    get id(): string {
        return this._tag[1];
    }
}

export class EventTagProfile extends EventTag {

}

export class EventTagEvent extends EventTag {

    get relay(): string {
        return this._tag[2];
    }

    get marker(): string {
        return this._tag[3];
    }

}