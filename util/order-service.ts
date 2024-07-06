import { Order } from "../models/Order";
import * as orderAPI from "./order-api";

export async function addOrder(order: Order){
    const res = await orderAPI.addOrder(order);
    return res
}