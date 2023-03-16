<script lang="ts">
    import { now, relativeTimeFormat } from "$lib/time";

    export let time: string | number | Date;
    export let from: string | number | Date;
    export let relative: boolean;

    $: label = (() => {
        let dateValue: Date = ((
            t: string | number | Date | undefined
        ): Date => {
            if (typeof t === "string" || typeof t === "number") {
                return new Date(t);
            } else {
                return t || new Date();
            }
        })(time);

        if (relative) {
            let fromDate: Date = ((
                t: string | number | Date | undefined
            ): Date => {
                if (typeof t === "string" || typeof t === "number") {
                    return new Date(t);
                } else {
                    return t || new Date($now);
                }
            })(from);
            return relativeTimeFormat(dateValue, fromDate);
        } else {
            return dateValue.toLocaleDateString();
        }
    })();
</script>

<time>
    {label}
</time>

<style lang="scss">
</style>
