export class Product{
    product_id: string = "";
    product_type: string = "";
    name: string = "";
    image: string = "";
    stock_quantity: number = 0;
    unit_price: number = 0;

    constructor(product_id?: string, product_type?: string, name?: string, image?: string, stock_quantity?: number, unit_price?: number){
        if (product_id){
            this.product_id = product_id;
        }
        if (product_type){
            this.product_type = product_type;
        }
        if (name){
            this.name = name;
        }
        if (image){
            this.image = image;
        }
        if (stock_quantity){
            this.stock_quantity = stock_quantity;
        }
        if (unit_price){
            this.unit_price = unit_price;
        }
    }
}