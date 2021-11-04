import React from 'react';
import NavBar from '../components/NavBar';

const MainApp = (props) => {

    return (
        <div>
            <NavBar />
            {props.children}
        </div>
    )
}

export default MainApp;