import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export default function SimpleDialog({open, handleClose, handleAction}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Поздравляем
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Сдача говна осуществлена успешно
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleAction}>Начать заново</Button>

                <Button onClick={handleClose} autoFocus>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}