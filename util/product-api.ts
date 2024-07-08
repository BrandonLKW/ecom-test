import { Product } from "../models/Product";

const BASE_URL = "/api/product/";

export async function getAllProductTypes(){
    const res = await fetch(BASE_URL + "type", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getAllProductByType(type: string){
    const res = await fetch(BASE_URL + "type/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"product_type": type}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getProductStock(productId: string){
    const res = await fetch(BASE_URL + "stockquantity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"product_id": productId}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function updateProductStock(productId: string, newQuantity: number){
    const res = await fetch(BASE_URL + "update/quantity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"product_id": productId, "new_quantity": newQuantity}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function addProduct(product: Product){
    const res = await fetch(BASE_URL + "add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}