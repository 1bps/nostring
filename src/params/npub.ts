export function match(param: string) {
    return /^npub\w+$/.test(param);
}