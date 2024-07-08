import { useState } from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, TextField } from "@mui/material";
import { Product } from '../../../models/Product';
import * as productService from "../../../util/product-service";
import "./Modal.css";

type PaymentModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setShowRestockSuccess: (show: boolean) => void;
    product: Product;
};

export default function PaymentModal({ showModal, setShowModal, setShowRestockSuccess, product }: PaymentModalProps){
    const [newStockQuantity, setNewStockQuantity] = useState<number>(0);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    const checkQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Error checking here
        const newQuantity = parseInt(event.target.value);
        setNewStockQuantity(newQuantity);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updateStock = async () => {
            setShowLoading(true);
            const response = await productService.updateProductStock(product.product_id, newStockQuantity);
            if (response){
                setShowRestockSuccess(true);
                product.stock_quantity = newStockQuantity;
            }
        }
        await updateStock();
        setShowLoading(false);
        setShowModal(false);
    };

    return (
        <>
            <Dialog
                open={showModal}
                onClose={() => {setShowModal(false)}}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit
                }}>
                <DialogTitle>{`Updating Stock for ${product.name}`}</DialogTitle>
                <DialogContent>
                    <div className='flexContainer'>
                        <TextField label="Current Quantity" name="current" variant="outlined" type="number" value={product.stock_quantity} disabled/>
                        <TextField label="New Quantity" name="new" variant="outlined" type="number" value={newStockQuantity} onChange={checkQuantityInput} required/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setShowModal(false)}}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </DialogActions>
                <Box sx={{ width: '100%', display: showLoading ? "" : "none"}}>
                    <LinearProgress/>
                </Box>
            </Dialog>
        </>
    );
}