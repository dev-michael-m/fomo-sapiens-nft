import React from 'react'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import '../stylesheet/Modal.css';

const CustomModal = ({id = "",width = '90%',background = 'rgb(255,255,255)',children,visible = false,onClose}) => {
    return (
        <Modal id={id} open={visible} onClose={onClose}>
            <Fade in={visible} timeout={500}>
                <div style={{backgroundColor: background, width: width}} className='modal-body'>
                    <div className='modal-inner'>
                        {children}
                    </div>
                </div>
            </Fade>            
        </Modal>
    )
}

export default CustomModal
