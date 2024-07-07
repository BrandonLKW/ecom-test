import { Button, Stack, TextField, Typography } from "@mui/material";
import { Product } from "../../../models/Product"
import { useEffect, useState } from "react";
import "./ProductItem.css";

type ProductItemProps = {
    product: Product;
    addProductToCart: (product: Product, quantity: number) => void;
    selectedQuantity: number;
};

export default function ProductItem({ product, addProductToCart, selectedQuantity } : ProductItemProps){
    const [inputQuantity, setInputQuantity] = useState<number>(0);

    useEffect(() => {
        setInputQuantity(selectedQuantity);
    }, [selectedQuantity]);

    const checkQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Error checking here
        const newQuantity = parseInt(event.target.value);
        setInputQuantity(newQuantity);
    };

    const handleUpdateButton = () => {
        addProductToCart(product, inputQuantity);
    };

    return (
        <Stack className="productitem" spacing={1}>
            <img height="200" width="200" src={product.image}/>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="h6">{`Unit Price: $${product.unit_price}`}</Typography>
            <Typography variant="h6">{`Available Quantity: ${product.stock_quantity}`}</Typography>
            <TextField label="In Cart" name="cart" variant="outlined" type="number" value={inputQuantity} onChange={checkQuantityInput}/>
            <Button variant="contained" onClick={() => {handleUpdateButton()}}>Update Cart</Button>
            <Button variant="contained">Restock</Button>
        </Stack>
    );
}