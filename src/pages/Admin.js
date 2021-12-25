import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import {CheckAdmin} from '../utilities/util';
import AlertBar from './../components/AlertBar';
import LockIcon from '@mui/icons-material/Lock';
import '../stylesheet/Admin.css';

const VERIFIER = "F58148Aa5";

const Admin = ({children}) => {
    const [alert, setAlert] = useState({
      severity: "success",
      msg: "",
      visible: false,
    });
    const [verified,setVerified] = useState(null);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            const admin = window.sessionStorage.getItem('fsnftadmin');

            if(admin === VERIFIER){
                setVerified(true);
            }else {
                setVerified(false);
            }
        }

        return () => {
            mounted = false;
        }
    },[]);

    const handleLogin = async () => {
        const verified = await CheckAdmin();

        if(verified.status == 'success'){
            setAlert({
                severity: verified.status,
                msg: verified.msg,
                visible: true
            })
            setVerified(true);
            window.sessionStorage.setItem('fsnftadmin',VERIFIER)
        }else{
            setAlert({
                severity: verified.status,
                msg: verified.msg,
                visible: true
            })
        }
    }

    const onCloseAlert = () => {
      setAlert((prevState) => ({
        ...prevState,
        visible: false,
      }));
    };

    return (
        verified == false ? <div className="login-parent">
            {alert.visible ? <AlertBar severity={alert.severity} visible={alert.visible} msg={alert.msg} onClose={onCloseAlert} /> : null}
            <div className="login-container">
                <div className="login-inner">
                    <h2>LOGIN</h2>
                    <LockIcon style={{fontSize: 50}} />
                    <Button className="custom-button medium" variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                </div>
            </div>
        </div> : verified == true ? children : null
    )
}

export default Admin;
