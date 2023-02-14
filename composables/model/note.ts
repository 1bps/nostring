import datasource from "../datasource";

const fromEvent = (e: any): Object => {
    let profileCached = datasource.getProfile(e.pubkey);
    return reactive({
        content: e.content,
        profile: profileCached.data,
        id: e.id,
        event: e,
        createdAt: new Date(e.created_at * 1000),
        tags: e.tags,
    });
}

const note = {
    fromEvent,
}

export default note;
