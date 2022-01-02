import React, {useState,useEffect} from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {getPaused, getPresaleState,getPublicState,pauseContract,setSaleState, updateWhitelist} from '../utilities/util';
import '../stylesheet/Admin.css';
import AlertBar from './../components/AlertBar';

const AdminPanel = () => {
    const [presale,setPresale] = useState(false);
    const [publicSale,setPublicSale] = useState(false);
    const [paused,setPaused] = useState(false);
    const [loading,setLoading] = useState(true);
    const [pendingPresale,setPendingPresale] = useState(false);
    const [pendingPublic,setPendingPublic] = useState(false);
    const [pendingPaused,setPendingPaused] = useState(false);
    const [alert,setAlert] = useState({
        severity: 'success',
        msg: '',
        visible: false
      });

    useEffect(() => {
        let mounted = true;

        if(mounted){
            Promise.all([getPresaleState(),getPublicState(),getPaused()]).then(([pre,pub,paus]) => {
                setPresale(pre.active);
                setPublicSale(pub.active);
                setPaused(paus.data);
                setLoading(false);
            }).catch(error => {
                console.error(error);
                setLoading(false);
            })
        }

        return () => {
            mounted = false;
        }
        // check state variables here
    },[])

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

    const handleSaleAction = (event) => {
        const action = event.target.id;

        switch (action) {
            case 'presale':
                setPendingPresale(true);
                setSaleState(!presale,'presale').then(res => {
                    if(res.status){
                        setPendingPresale(false);
                        setPresale(prevState => !prevState) 
                    }
                }).catch(error => {
                    console.error(error);
                    setPendingPresale(false);
                })
                               
                break;
            case 'public': 
                setPendingPublic(true);
                setSaleState(!publicSale,'public').then(res => {
                    if(res.status){
                        setPendingPublic(false);
                        setPublicSale(prevState => !prevState);
                    }
                }).catch(error => {
                    console.error(error);
                    setPendingPublic(false);
                })
                
                break;
        }
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

    const onTogglePause = () => {
        const temp = !paused;
        setPendingPaused(true);

        pauseContract(temp).then(res => {
            setPaused(temp);
            setPendingPaused(false);
            onAlert(
                'success',
                `Contract has been ${temp ? 'paused.' : 'set to active.'}`,
                true
            )
        }).catch(error => {
            setPendingPaused(false);
            onAlert(
                error.status,
                error.msg,
                true
            )
        })
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
                    <h3>Whitelist</h3>
                    {/* <div>
                        <FormControlLabel control={<Switch id="presale" checked={presale} onChange={handleSaleAction} />} label="Presale" />{pendingPresale && presale || pendingPresale && !presale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'orange'}}>pending...</label> : !pendingPresale && presale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'forestgreen'}}>active</label> : null}
                    </div>
                    <div>
                        <FormControlLabel control={<Switch id="public" checked={publicSale} onChange={handleSaleAction} />} label="Public Sale" />{pendingPublic && publicSale || pendingPublic && !publicSale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'orange'}}>pending...</label> : !pendingPublic && publicSale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'forestgreen'}}>active</label> : null}
                    </div> */}
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
