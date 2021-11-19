import React, {useState,useEffect} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../stylesheet/Snackbar.css';

const AlertBar = ({severity = "success", msg = "", visible = false, onClose}) => {
    const [open,setOpen] = useState(visible);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            onClose();
          return;
        }
    
        setOpen(false);
        onClose();
      }

    return (
      <Snackbar style={severity === 'error' ? {background: 'red !important'} : severity === 'success' ? {background: 'green !important'} : {background: 'orange !important'}} anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={severity !== 'error' ? 3000 : null} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {`${severity === 'success' ? 'Success!' : severity === 'warning' ? 'Warning:' : 'ERROR:'} ${msg}`}
        </Alert>
      </Snackbar>
    );
}

export default AlertBar
