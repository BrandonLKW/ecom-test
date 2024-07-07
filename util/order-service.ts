import { Order } from "../models/Order";
import * as orderAPI from "./order-api";

export async function addOrder(order: Order){
    const res = await orderAPI.addOrder(order);
    return res;
}

export async function getOrdersByUserId(userId: string){
    const res = await orderAPI.getOrdersByUserId(userId);
    return res;
}

export async function getOrderItemsByOrderId(orderId: string){
    const res = await orderAPI.getOrderItemsByOrderId(orderId);
    return res;
}