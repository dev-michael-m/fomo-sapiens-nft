import React,{useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
require('dotenv').config();

const PasswordProtected = ({children,enabled}) => {
    const [auth,setAuth] = useState(null);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            const verifier = window.sessionStorage.getItem('fsnftv');

            if(verifier && enabled && verifier === process.env.REACT_APP_PASSWORD_PAGE){
                setAuth(true);
            }else if(!enabled){
                setAuth(true);
            }else {
                setAuth(false);
            }
        }

        return () => {
            mounted = false;
        }
    },[]);
    
    return (
        auth === true ? children : auth === false ? <Navigate to="/password-page" replace /> : null
    )
}

export default PasswordProtected;
