import { Product } from "./Product";

export class Cart{
    user_id: string = "0";
    quantity: number = 0;
    product: Product = new Product();

    constructor(user_id?: string, quantity?: number, product?: Product){
        if (user_id){
            this.user_id = user_id;
        }
        if (quantity){
            this.quantity = quantity;
        }
        if (product){
            this.product = product;
        }
    }

    calculateSum = () => {
        return this.quantity * this.product.unit_price;
    };
}