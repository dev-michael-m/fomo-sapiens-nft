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
      <Snackbar style={severity === 'error' ? {background: 'red !important'} : severity === 'success' ? {background: 'green !important'} : severity === 'warning' ? {background: 'orange !important'} : {background: 'wheat !important'}} anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={severity !== 'error' ? 5000 : null} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {`${severity === 'success' ? 'Success!' : severity === 'warning' ? 'Warning:' : severity === 'error' ? 'ERROR:' : ''} ${msg}`}
        </Alert>
      </Snackbar>
    );
}

export default AlertBar
