import React from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogContent>
            <Box sx={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </Box>
        </DialogContent>
    </Dialog>
);

export default Modal;