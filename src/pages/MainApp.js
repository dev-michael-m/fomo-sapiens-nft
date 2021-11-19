import React from 'react';
import NavBar from '../components/NavBar';

const MainApp = (props) => {
    return (
        <div>
            <NavBar onAlert={props.onAlert} />
            {props.children}
        </div>
    )
}

export default MainApp;