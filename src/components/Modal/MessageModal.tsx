import { useEffect, useState } from "react";
import { Alert, Dialog } from "@mui/material"

type MessageModalProps = {
    message: string;
    messageType: string;
    setMessageType: (messageType: string) => void;
};

export default function MessageModal({ message, messageType, setMessageType }: MessageModalProps){
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [successMsg, setSuccessMsg] = useState<string>("");
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [warningMsg, setWarningMsg] = useState<string>("");

    useEffect(() => {
        resetWarnings();
        setShowModal(true);
        switch (messageType){
            case "SUCCESS":
                setShowSuccess(true);
                setSuccessMsg(message);
                break;
            case "WARNING":
                setShowWarning(true);
                setWarningMsg(message);
                break;
            case "ERROR":
                setShowError(true);
                setErrorMsg(message);
                break;
            default:
                setShowModal(false); //no display for unknown scenarios
                break;
        }
    }, [messageType]);

    const resetWarnings = () => {
        setTimeout(() => {
            setShowError(false);
            setErrorMsg("");
            setShowSuccess(false);
            setSuccessMsg("");
            setShowWarning(false);
            setWarningMsg("");
            setShowModal(false);
            setMessageType(""); //this resets the dialog
        }, 3000);
    }

    return (
        <Dialog open={showModal}
                onClose={() => {resetWarnings()}} >
            <Alert severity="success" sx={{display: showSuccess ? "" : "none"}}>{successMsg}</Alert>
            <Alert severity="warning" sx={{display: showWarning ? "" : "none"}}>{warningMsg}</Alert>
            <Alert severity="error" sx={{display: showError ? "" : "none"}}>{errorMsg}</Alert>
        </Dialog>
    );
    }