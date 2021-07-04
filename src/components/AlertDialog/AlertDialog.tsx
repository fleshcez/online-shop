import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface AltertDialogProps {
    onPrimary: () => void;
    primaryLabel: string;
    onSecondary: () => void;
    secondaryLabel: string;
    title: string;
    text: string;
    open: boolean;

}

export default function AlertDialog(props: AltertDialogProps ) {
    const {onPrimary, onSecondary, title, text, open, primaryLabel, secondaryLabel} = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={onSecondary}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onPrimary} color="primary" autoFocus>
                        {primaryLabel}
                    </Button>
                    <Button onClick={onSecondary} color="secondary">
                        {secondaryLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
