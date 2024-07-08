import { useContext } from "react";
import { UserContext } from "../../App";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { Product } from "../../../models/Product"
import { useEffect, useState } from "react";
import RestockModal from "../Modal/RestockModal";
import "./ProductItem.css";

type ProductItemProps = {
    product: Product;
    addProductToCart: (product: Product, quantity: number) => void;
    selectedQuantity: number;
};

export default function ProductItem({ product, addProductToCart, selectedQuantity } : ProductItemProps){
    const user = useContext(UserContext);
    const [inputQuantity, setInputQuantity] = useState<number>(0);
    const [showRestockModal, setShowRestockModal] = useState<boolean>(false);
    const [showRestockSuccess, setShowRestockSuccess] = useState<boolean>(false);

    useEffect(() => {
        setInputQuantity(selectedQuantity);
        setShowRestockSuccess(false)
    }, [selectedQuantity]);

    const checkQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        setInputQuantity(newQuantity);
    };

    const handleUpdateButton = () => {
        setInputQuantity(selectedQuantity);
        addProductToCart(product, inputQuantity);
    };

    return (
        <Stack className="productitem" spacing={1}>
            <img height="200" width="200" src={product.image}/>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="h6">{`Unit Price: $${product.unit_price}`}</Typography>
            <Typography variant="h6">{`Available Quantity: ${product.stock_quantity}`}</Typography>
            <TextField label="In Cart" name="cart" variant="outlined" type="number" value={inputQuantity} onChange={checkQuantityInput}/>
            <Button style={{display: user.account_type === "RESTRICTED" ? "none" : "" }} variant="contained" onClick={() => {handleUpdateButton()}}>Update Cart</Button>
            <Button style={{display: user.account_type === "RESTRICTED" ? "" : "none" }} variant="contained" onClick={() => {setShowRestockModal(true)}}>Restock</Button>
            <RestockModal showModal={showRestockModal} setShowModal={setShowRestockModal} setShowRestockSuccess={setShowRestockSuccess} product={product}/>
            <Alert variant="outlined" severity="success" sx={{display: showRestockSuccess ? "" : "none"}} onClose={() => {setShowRestockSuccess(false)}}>
                Stock updated successfully!
            </Alert>
        </Stack>
    );
}