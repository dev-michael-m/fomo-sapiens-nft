import React,{useEffect, useState} from 'react';
import Logo from '../assets/rmp.png';
import '../stylesheet/NavBar.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AppsIcon from '@mui/icons-material/Apps';
import Drawer from '@mui/material/Drawer';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import $ from 'jquery';
import { ConnectWallet } from '../utilities/util';


const NavBar = (props) => {

    const [menu,setMenu] = useState(false);
    const [wallet,setWallet] = useState({
        address: null,
        provider: null,
        snippet: null
    })

    useEffect(() => {
        // if(window.ethereum.request({method: 'eth_requestAccounts'})){
        //     handleConnectWallet();
        // }else{
        //     console.warn(`User has not connected their wallet to this DApp.`)
        // }
    },[])

    const handleDrawer = () => {
        setMenu(prevState => !prevState);
    }

    const handleLinkClick = (event) => {
        const id = event.target.id;
        let pos = null;

        switch(id){
            case 'whitelist':
                pos = $('#welcome-section').position();
                break;
            case 'roadmap':
                pos = $('#roadmap').position();
                break;
            case 'specs':
                pos = $('#countdown').position();
                break;
            case 'team':
                pos = $('#countdown').position();                    
                break;
        }

        window.scrollTo({top: pos.top, behavior: 'smooth'})
        handleDrawer();
        
    }

    const handleConnectWallet = () => {
        ConnectWallet().then(status => {
            setWallet({
                address: status.address,
                snippet: status.address_snippet
            });
        })
        .catch(error => {
            console.error(error);
        })
      }

    return (
        <div id="nav-container" className="nav-container">
            <div id="inner-nav" className="inner-nav">
                <div>
                    
                </div>
                <div style={{marginLeft: 12, marginRight: 'auto'}}>
                    <h3 className="nav-header">FOMO SAPIENS</h3>
                </div>
                <div className="socials">
                    {!wallet.address ? <div id="connect-wallet" style={{width: 122}}>
                        <Button className="custom-button small-social social-button" style={{fontSize: 10}} onClick={handleConnectWallet}> Connect Wallet</Button>
                    </div> :
                    <div style={{width: 122,display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                        <VerifiedIcon style={{color: '#f5deb3d9', fontSize: 15, paddingRight: 6}} />
                        <label style={{fontSize: 10, color: '#f5deb3d9'}}>{wallet.snippet}</label>
                    </div>
                    }
                    <div id="twitter">
                        <IconButton className="social-button" ><TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 20}} /></IconButton>
                    </div>
                    <div id="discord">

                    </div>
                </div>
                <div className="right-nav-container">
                    <IconButton onClick={handleDrawer}>
                        <AppsIcon style={{color: 'rgb(255,255,255)'}} />
                    </IconButton>
                    <Drawer 
                        anchor="right"
                        open={menu}
                        onClose={handleDrawer}
                    >
                        <div className="menu-container" id="menu-container">
                            <div className="menu-close">
                                <IconButton onClick={handleDrawer}>
                                    <CloseIcon style={{color: 'rgb(255,255,255)'}} />
                                </IconButton>
                            </div>
                            <div className="menu-list">
                                <a id="whitelist" href="#" onClick={handleLinkClick}>Join the List</a>
                                <a id="roadmap" href="#" onClick={handleLinkClick}>Roadmap</a>
                                <a id="specs" href="#" onClick={handleLinkClick}>Specs</a>
                                <a id="team" href="#" onClick={handleLinkClick}>Team Members</a>
                            </div>                            
                        </div>                        
                    </Drawer>
                </div>
            </div>
        </div>
    )
}

export default NavBar;