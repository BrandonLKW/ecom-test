import { useState } from "react";
import * as productService from "../../../util/product-service";
import { Alert, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, TextField } from "@mui/material";
import { Product } from "../../../models/Product";

type AddProductModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

export default function AddProductModal({ showModal, setShowModal }: AddProductModalProps){
    const [showError, setShowError] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [unitPrice, setUnitPrice] = useState<number>(0); //https://stackoverflow.com/questions/66763023/react-material-ui-textfield-decimal-step-of-1-00-on-1-00-as-a-default-number

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const addProductAction = async () => {
            setShowLoading(true);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            let product = new Product();
            product.product_type = formJson.product_type.toUpperCase();
            product.name = formJson.name.toUpperCase();
            product.image = formJson.image;
            product.stock_quantity = formJson.stock_quantity;
            product.unit_price = formJson.unit_price;
            const response = await productService.addProduct(product);
            if (response){
                handleClose();
            } else {
                throw new Error("DB ERROR");
            }
        }
        try {
            await addProductAction();
        } catch (error) {
            setShowError(true);
        }
        setShowLoading(false);
    };

    return (
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit}}>
                <DialogTitle>Add a new Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="product_type"
                        label="Product Type"
                        type="text"
                        fullWidth
                        variant="standard"/>
                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"/>
                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="image"
                        label="Image"
                        type="text"
                        fullWidth
                        variant="standard"/>
                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="stock_quantity"
                        label="Stock Quantity"
                        type="number"
                        fullWidth
                        variant="standard"/>
                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="unit_price"
                        label="Unit Price"
                        type="number" 
                        value={unitPrice} 
                        onChange={(event) => {setUnitPrice(parseFloat(event.target.value))}} //assume correct inputs for now
                        fullWidth
                        variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: showError ? "" : "none"}}>
                    Error during Add, please check details and try again.
                </Alert>
                <Box sx={{ width: '100%', display: showLoading ? "" : "none"}}>
                    <LinearProgress/>
                </Box>
            </Dialog>
        </>
    );
}