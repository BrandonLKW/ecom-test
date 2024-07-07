import { useState } from "react";
import * as userService from "../../../util/user-service";
import { Alert, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, TextField } from "@mui/material";
import { User } from "../../../models/User";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type SignUpFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setShowSecModal: (show: boolean) => void;
    setUser: (user: User) => void;
};

export default function SignUpFormModal({ showModal, setShowModal, setShowSecModal, setUser } : SignUpFormModalProps){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("Error during Sign Up, please check your details and try again.");
    
    const handlePassTypeClick = () => {
        setShowPassword(!showPassword);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowError(false);
        const checkSignup = async () => {
            setShowLoading(true);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            //Do basic input checks
            if (formJson.password !== formJson.confirm_password){
                setShowError(true);
                setErrorMsg("Password and Confirm Password do not match. Please check and try again.")
                return;
            }
            //Send post request
            let user = new User();
            user.name = formJson.name;
            user.email = formJson.email;
            user.password = formJson.password;
            user.address = formJson.address;
            user.account_type = "PUBLIC";
            
            const response = await userService.signup(user);
            if (response?.user_id){
                user = new User(response.user_id, response.name, response.email, response.password, response.address, response.account_type);
                setUser(user);
                handleClose();
            } else {
                throw response.message;
            }
        }
        try {
            await checkSignup();
        } catch (error) {
            setShowError(true);
        }
        setShowLoading(false);
    }

    const swapToSignup = () =>{
        setShowModal(false);
        setShowSecModal(true);
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
                <DialogTitle>New User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your credentials
                    </DialogContentText>
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
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="standard" 
                        InputProps={showPassword ? {endAdornment: <VisibilityOffIcon onClick={handlePassTypeClick}/>} : {endAdornment: <VisibilityIcon onClick={handlePassTypeClick}/>}}/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="confirm_password"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="standard" 
                        InputProps={showPassword ? {endAdornment: <VisibilityOffIcon onClick={handlePassTypeClick}/>} : {endAdornment: <VisibilityIcon onClick={handlePassTypeClick}/>}}/>
                    <Button onClick={swapToSignup}>Already have an existing account? Login here!</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Sign Up</Button>
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: showError ? "" : "none"}}>
                    {errorMsg}
                </Alert>
                <Box sx={{ width: '100%', display: showLoading ? "" : "none"}}>
                    <LinearProgress/>
                </Box>
            </Dialog>
        </>
    );
}