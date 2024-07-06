export class OrderItem{
    order_item_id: string = "";
    order_id: string = "";
    unit_price: number = 0;
    quantity: number = 0;
    product_id: string = "";

    constructor(order_item_id?: string, order_id?: string, unit_price?: number, quantity?: number, product_id?: string){
        if (order_item_id){
            this.order_item_id = order_item_id;
        }
        if (order_id){
            this.order_id = order_id;
        }
        if (unit_price){
            this.unit_price = unit_price;
        }
        if (quantity){
            this.quantity = quantity;
        }
        if (product_id){
            this.product_id = product_id;
        }
    }
}