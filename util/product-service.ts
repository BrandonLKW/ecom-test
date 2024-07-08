import * as productAPI from "./product-api";
import { Product } from "../models/Product";

export async function getAllProductTypes(){
    const res = await productAPI.getAllProductTypes();
    return res;
}

export async function getAllProductByType(type: string){
    const res = await productAPI.getAllProductByType(type);
    return res;
}

export async function getProductStock(productId: string){
    const res = await productAPI.getProductStock(productId);
    return res;
}

export async function updateProductStock(productId: string, newQuantity: number){
    const res = await productAPI.updateProductStock(productId, newQuantity);
    return res;
}

export async function addProduct(product: Product){
    const res = await productAPI.addProduct(product);
    return res;
}