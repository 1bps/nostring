import { readable } from "svelte/store";

const now = readable(Date.now(), set => {
    const refresh = () => set(Date.now());
    refresh();

    const interval = setInterval(() =>
        refresh()
        , 500);

    return () => clearInterval(interval);
});

// in miliseconds
var units: any = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

let rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const relativeTimeFormat = (d1: Date, d2 = new Date()) => {
    var elapsed = d1.getTime() - d2.getTime();

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units) {
        if (Math.abs(elapsed) > units[u] || u == 'second') {
            return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit);
        }
    }
}

export { now, relativeTimeFormat };