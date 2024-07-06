import { Button, Stack, TextField, Typography } from "@mui/material";
import { Product } from "../../../models/Product"
import { useEffect, useState } from "react";

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
        <Stack spacing={1}>
            <img height="250" width="250" src={product.image}/>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="h6">Unit Price: {product.unit_price}</Typography>
            <Typography variant="h6">Available Quantity {product.stock_quantity}</Typography>
            <TextField label="Added" name="cart" variant="outlined" value={inputQuantity} onChange={checkQuantityInput}/>
            <Button onClick={() => {handleUpdateButton()}}>Update Cart</Button>
            <Button>Restock</Button>
        </Stack>
    );
}