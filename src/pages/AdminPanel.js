import React, {useState,useEffect} from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import {getPresaleState,getPublicState,setSaleState} from '../utilities/util';
import '../stylesheet/Admin.css';

const AdminPanel = () => {
    const [presale,setPresale] = useState(false);
    const [publicSale,setPublicSale] = useState(false);
    const [loading,setLoading] = useState(true);
    const [pendingPresale,setPendingPresale] = useState(false);
    const [pendingPublic,setPendingPublic] = useState(false);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            Promise.all([getPresaleState(),getPublicState()]).then(([pre,pub]) => {
                console.log({pub,pre})
                setPresale(pre.active);
                setPublicSale(pub.active);
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

    return (
        <div className="panel-main">
            <div className="panel-inner">
                <h2>ADMIN PANEL</h2>
                <WarningIcon style={{color: 'orange'}} />
                <p>
                    All actions performed in the admin panel have direct consequences in the contract. Actions perfomed
                    from this panel will take effect immediately, and may cost gas fees to execute.
                </p>
                {!loading ? <div className="sale-opts">
                    <h3>Sale Options</h3>
                    <div>
                        <FormControlLabel control={<Switch id="presale" checked={presale} onChange={handleSaleAction} />} label="Presale" />{pendingPresale && presale || pendingPresale && !presale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'orange'}}>pending...</label> : !pendingPresale && presale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'forestgreen'}}>active</label> : null}
                    </div>
                    <div>
                        <FormControlLabel control={<Switch id="public" checked={publicSale} onChange={handleSaleAction} />} label="Public Sale" />{pendingPublic && publicSale || pendingPublic && !publicSale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'orange'}}>pending...</label> : !pendingPublic && publicSale ? <label style={{fontSize: 14,fontWeight: 'bold',color: 'forestgreen'}}>active</label> : null}
                    </div>
                </div> :
                    <CircularProgress />
                }
            </div>
        </div>
    )
}

export default AdminPanel
