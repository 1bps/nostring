const fromEvent = (e: any): Object => {
    return reactive({
        content: e.content,
        profile: datasource.getProfile(e.pubkey).data,
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
