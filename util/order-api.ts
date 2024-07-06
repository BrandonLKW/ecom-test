import { Order } from "../models/Order";

const BASE_URL = "/api/order/";

export async function addOrder(order: Order){
    const res = await fetch(BASE_URL + "add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}