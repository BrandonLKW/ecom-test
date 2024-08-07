import dayjs, { Dayjs } from "dayjs";
import { OrderItem } from "./OrderItem";

export class Order{
    order_id: string = "0";
    user_id: string = "";
    transaction_date: Dayjs = dayjs(new Date());
    total_cost: number = 0;
    status: string = "";
    orderItemList: OrderItem[] = [];

    constructor(order_id?: string, user_id?: string, transaction_date?: Dayjs, total_cost?: number, status?: string){
        if (order_id){
            this.order_id = order_id;
        }
        if (user_id){
            this.user_id = user_id;
        }
        if (transaction_date){
            this.transaction_date = transaction_date;
        }
        if (total_cost){
            this.total_cost = total_cost;
        }
        if (status){
            this.status = status;
        }
    }
}