import { get, writable } from "svelte/store";

export const address = writable({ street: "123 Main St", city: "Anytown", state: "CA", zip: "12345" });

export const user = writable({ name: "John Doe", age: 42, address });

setTimeout(() => {
    let u = get(user);
    u.name = "Jim";
    user.set(u);
}, 5000);

setTimeout(()=>{
    let a = get(address);
    a.city = "Santa Rosa";
    address.set(a);
}, 7000);