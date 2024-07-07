import { useState } from 'react' 
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, TextField } from "@mui/material";
import "./Modal.css";

type PaymentModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    submitOrder: () => void;
};

export default function PaymentModal({ showModal, setShowModal, submitOrder}: PaymentModalProps){
    const [showOption1, setShowOption1] = useState<boolean>(true);
    const [showOption2, setShowOption2] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    const displayOption1 = () => {
        setShowOption1(true);
        setShowOption2(false);
    };

    const displayOption2 = () => {
        setShowOption2(true);
        setShowOption1(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const processPayment = async () => {
            setShowLoading(true);
            submitOrder();
        };
        await processPayment();
        setShowLoading(false);
    }

    return (
        <>
            <Dialog
                open={showModal}
                onClose={() => {setShowModal(false)}}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit
                }}>
                <DialogTitle>Payment Confirmation</DialogTitle>
                <DialogContent>
                    <div className='flexContainer'>
                        <div>
                            <Button onClick={() => {displayOption1()}}>Option #1</Button>
                            <Button onClick={() => {displayOption2()}}>Option #2</Button>
                        </div>
                        {showOption1 ? 
                        <div className='flexContainer'>
                            <TextField label="Card Number" variant="outlined"/>
                            <TextField label="CVV" variant="outlined"/>
                            <TextField label="Name" variant="outlined"/>
                        </div> : <></>}
                        {showOption2 ? 
                        <div className='flexContainer'>
                            <img src="../images/qr.png"/>
                        </div> : <></>}
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