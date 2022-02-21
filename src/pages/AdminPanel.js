import React, {useState,useEffect} from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {updateWhitelist} from '../utilities/util';
import '../stylesheet/Admin.css';
import AlertBar from './../components/AlertBar';

const AdminPanel = () => {
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] = useState({
        severity: 'success',
        msg: '',
        visible: false
      });

    const onAlert = (severity, msg, visible) => {
        setAlert({
          severity,
          msg,
          visible
        })
      }
    
      const onCloseAlert = () => {
        setAlert(prevState => ({
          ...prevState,
          visible: false
        }))
      }


    const onAddWhitelist = async () => {
        const address = document.getElementById('wl-address').value;
        if(address){
            updateWhitelist('add',address).then(res => {
                onAlert(
                    res.status,
                    'Address has been added to the whitelist',
                    true
                )
                document.getElementById('wl-address').value = "";
            }).catch(error => {
                onAlert(
                    error.status,
                    error.msg,
                    true
                )
            })
        }else{
            onAlert(
                'warning',
                'Address field cannot be empty',
                true
            )
        }        
    }

    const onRemoveWhitelist = async () => {
        const address = document.getElementById('rm-address').value;

        if(address){
            updateWhitelist('remove',address).then(res => {
                onAlert(
                    res.status,
                    'Address has been removed from the whitelist.',
                    true
                )
    
                document.getElementById('rm-address').value = "";
            }).catch(error => {
                onAlert(
                    error.status,
                    error.msg,
                    true
                )
            })
        }else{
            onAlert(
                'warning',
                'Address field cannot be empty',
                true
            )
        }
        
    }

    return (
        <div className="panel-main">
            {alert.visible ? <AlertBar severity={alert.severity} visible={alert.visible} msg={alert.msg} onClose={onCloseAlert} /> : null}
            <div className="panel-inner">
                <h2>ADMIN PANEL</h2>
                <WarningIcon style={{color: 'orange'}} />
                <p>
                    All actions performed in the admin panel have direct consequences in the contract. Actions perfomed
                    from this panel will take effect immediately, and may cost gas fees to execute.
                </p>
                {!loading ? <div className="sale-opts">
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between',margin: '20px 0px'}}>
                        <div style={{width: '60%'}}>
                            <TextField id="wl-address" type="text" placeholder='0x...' variant="standard"></TextField>
                        </div>
                        <div>
                            <Button variant="contained" onClick={onAddWhitelist}>Add</Button>
                        </div>
                    </div>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                        <div style={{width: '60%'}}>
                            <TextField id="rm-address" type="text" placeholder='0x...' variant="standard"></TextField>
                        </div>
                        <div>
                            <Button variant="contained" onClick={onRemoveWhitelist}>Remove</Button>
                        </div>
                    </div>
                    {/* <div>
                        <FormControlLabel control={<Switch id="paused" checked={paused} onChange={onTogglePause} />} label="Contract Paused" />{pendingPaused ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'orange'}}>pending...</label> : null}
                    </div> */}
                </div> :
                    <CircularProgress />
                }
            </div>
        </div>
    )
}

export default AdminPanel
