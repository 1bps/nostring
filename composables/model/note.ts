const fromEvent = (e: any): Object => {
    return reactive({
        content: e.content,
        profile: datasource.profile(e.pubkey),
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
