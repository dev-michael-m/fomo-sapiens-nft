import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {CheckAdmin} from '../utilities/util';
import AlertBar from './../components/AlertBar';
import LockIcon from '@mui/icons-material/Lock';
import '../stylesheet/Admin.css';
import { useNavigate } from 'react-router';

const Admin = () => {
    const [alert, setAlert] = useState({
      severity: "success",
      msg: "",
      visible: false,
    });
    const navigate = useNavigate();
    const [verified,setVerified] = useState(false);

    const handleLogin = async () => {
        const verified = await CheckAdmin();

        if(verified.status == 'success'){
            setAlert({
                severity: verified.status,
                msg: verified.msg,
                visible: true
            })
            navigate('/dashboard',{replace: true})
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
        <div className="login-parent">
            {alert.visible ? <AlertBar severity={alert.severity} visible={alert.visible} msg={alert.msg} onClose={onCloseAlert} /> : null}
            <div className="login-container">
                <div className="login-inner">
                    <h2>LOGIN</h2>
                    <LockIcon style={{fontSize: 50}} />
                    <Button className="custom-button medium" variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Admin;
