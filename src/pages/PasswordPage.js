import React, {useState} from 'react';
import Logo from '../assets/fomo-sapiens-logo.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AlertBar from '../components/AlertBar';
import '../stylesheet/Admin.css';
import { useNavigate } from 'react-router-dom';
require('dotenv').config();

const PasswordPage = () => {
    const [alert, setAlert] = useState({
        severity: "success",
        msg: "",
        visible: false,
      });
    
    const navigate = useNavigate();

    const verifyAccount = () => {
        const pass = document.getElementById('pfield').value;

        if(pass){
            if(pass === process.env.REACT_APP_PASSWORD_PAGE){
                window.sessionStorage.setItem('fsnftv',process.env.REACT_APP_PASSWORD_PAGE);
                navigate('/',{replace: true})
            }else{
                setAlert({
                    severity: 'error',
                    msg: 'The password you have entered is incorrect.',
                    visible: true
                })
            }
        }else{
            setAlert({
                severity: 'warning',
                msg: 'Please enter a value into the password field.',
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
        <div className='password-container'>
            {alert.visible ? <AlertBar severity={alert.severity} visible={alert.visible} msg={alert.msg} onClose={onCloseAlert} /> : null}
            <img src={Logo} width="50%"></img>
            <div style={{margin: 50}}>
                <TextField className="pfield-input" style={{borderBottom: '2px solid wheat'}} variant="standard" placeholder='Password' id="pfield" type="text" />
            </div>
            <div>
                <Button className='custom-button medium secondary' variant='contained' color="primary" onClick={verifyAccount}>Enter</Button>
            </div>
        </div>
    )
}

export default PasswordPage;
