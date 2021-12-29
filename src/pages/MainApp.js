import React from 'react';
import NavBar from '../components/NavBar';

const MainApp = ({wallet,onAlert,onConnectWallet,children}) => {
    return (
        <div>
            <NavBar wallet={wallet} onAlert={onAlert} onConnectWallet={onConnectWallet} />
            {children}
        </div>
    )
}

export default MainApp;