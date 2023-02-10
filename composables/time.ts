import { ref } from "vue";

const now = ref(Date.now());
setInterval(() => {
    now.value = Date.now();
}, 500);

// in miliseconds
var units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

let rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const relativeTimeFormat = (d1: Date, d2 = new Date()) => {
    var elapsed = d1 - d2;

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units) {
        if (Math.abs(elapsed) > units[u] || u == 'second') {
            return rtf.format(Math.round(elapsed / units[u]), u);
        }
    }
}

export { now, relativeTimeFormat };