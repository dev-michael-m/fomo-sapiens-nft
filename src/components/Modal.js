import React from 'react'
import Modal from '@mui/material/Modal';

const CustomModal = ({id = "",children,visible = false,onClose}) => {
    return (
        <Modal id={id} open={visible} onClose={onClose}>
            {children}
        </Modal>
    )
}

export default CustomModal
