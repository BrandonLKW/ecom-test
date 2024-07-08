import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { Cart } from "../../../models/Cart";
import CartItem from "../CartItem/CartItem";
import "./Modal.css";

type CartModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setShowPaymentModal: (show: boolean) => void;
    cartItemList: Cart[];
};

export default function CartModal({ showModal, setShowModal, setShowPaymentModal, cartItemList}: CartModalProps){
    const user = useContext(UserContext);
    const [showWarning, setShowWarning] = useState<boolean>(false);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowWarning(true);
    }

    const handleCheckout = async () => {
        setShowWarning(false);
        setShowPaymentModal(true);
    }

    const displayCheckoutButton = () => {
        if (user.user_id === "0"
            || cartItemList.length === 0){
            return false;
        }
        return true;
    }

    const calculateTotalCartCost = () => {
        let sum = 0;
        console.log(cartItemList);
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
                }} 
                fullWidth 
                maxWidth="md">
                <DialogTitle><Typography variant="h4">Cart Items</Typography></DialogTitle>
                <DialogContent>
                    <div className="cartModal">
                        <div>
                            {cartItemList.map((cartItem) => (<CartItem cartItem={cartItem}/>))}
                        </div>
                        <Typography variant="h5">{`Total sum: $${calculateTotalCartCost()}`}</Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Continue Shopping</Button>
                    {displayCheckoutButton() ? <Button type="submit">Checkout</Button> : <></>}
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: showWarning ? "" : "none"}}
                    action={<Button onClick={() => {handleCheckout()}} color="inherit" size="small">Yes, Checkout!</Button>}>
                    Confirm to Checkout?
                </Alert>
            </Dialog>
        </>
    );

    //https://stackoverflow.com/questions/47181399/dialog-width-material-ui (change dialog size)
}