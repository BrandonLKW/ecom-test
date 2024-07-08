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

export async function getOrdersByUserId(userId: string){
    const res = await fetch(BASE_URL + "find/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id: userId}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getOrderItemsByOrderId(orderId: string){
    const res = await fetch(BASE_URL + "find/orderitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({order_id: orderId}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getActiveOrders(){
    const res = await fetch(BASE_URL + "find/active", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function updateOrderStatus(status: string, orderId: string){
    const res = await fetch(BASE_URL + "update/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status: status, order_id: orderId}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}
