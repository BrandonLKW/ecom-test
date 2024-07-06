import { useState } from "react";
import { Alert, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, Typography } from "@mui/material";
import { Cart } from "../../../models/Cart";
import CartItem from "../CartItem/CartItem";

type CartModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    cartItemList: Cart[];
};

export default function CartModal({ showModal, setShowModal, cartItemList}: CartModalProps){
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowWarning(true);
    }

    const handleCheckout = async () => {
    }

    const calculateTotalCartCost = () => {
        let sum = 0;
        cartItemList.forEach((cartItem) => {
            sum += cartItem.calculateSum();
        });
        return sum;
    };

    return (
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit
                }}>
                <DialogTitle>Cart Items</DialogTitle>
                <DialogContent>
                    <div>
                        {cartItemList.map((cartItem) => (<CartItem cartItem={cartItem}/>))}
                    </div>
                    <Typography variant="h5">{calculateTotalCartCost()}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Continue Shopping</Button>
                    <Button type="submit">Checkout</Button>
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: showWarning ? "" : "none"}}
                    action={<Button onClick={() => {handleCheckout()}} color="inherit" size="small">Yes, Checkout!</Button>}>
                    Confirm to Checkout?
                </Alert>
                <Box sx={{ width: '100%', display: showLoading ? "" : "none"}}>
                    <LinearProgress/>
                </Box>
            </Dialog>
        </>
        );
}