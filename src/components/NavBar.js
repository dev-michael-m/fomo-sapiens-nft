import React,{useEffect, useState} from 'react';
import Logo from '../assets/fomo-sapiens-logo.png';
import '../stylesheet/NavBar.css';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AppsIcon from '@mui/icons-material/Apps';
import Drawer from '@mui/material/Drawer';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import $ from 'jquery';
import { ConnectWallet } from '../utilities/util';
import { setSaleActive } from './../utilities/util';


const NavBar = ({onAlert}) => {

    const [menu,setMenu] = useState(false);
    const [active,setActive] = useState(false);
    const [wallet,setWallet] = useState({
        address: null,
        provider: null,
        snippet: null
    })
    const [walletActive,setWalletActive] = useState(false);

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
                pos = $('#specs').position();
                break;
            case 'team':
                pos = $('#founders').position();                    
                break;
            case 'stake':
                pos = $('#stake').position();
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
            onAlert(
                status.status,
                status.msg,
                true
            )
        })
        .catch(error => {
            console.error(error);
        })
      }

    const setSale = () => {
        setSaleActive(!active); 
        setActive(prevState => !prevState);
    }

    return (
        <div id="nav-container" className="nav-container">
            <div id="inner-nav" className="inner-nav">
                <div style={{marginLeft: 12, marginRight: 'auto', textAlign: 'left', display: 'flex'}}>
                    {/* <h3 className="nav-header">FOMO SAPIENS</h3> */}
                    <img src={Logo} width="185px"></img>
                </div>
                <div className="socials">
                    {walletActive && !wallet.address ? <div id="connect-wallet" style={{width: 122}}>
                        <Button className="custom-button small-social social-button" style={{fontSize: 10}} onClick={handleConnectWallet}> Connect Wallet</Button>
                    </div> : walletActive && wallet.address ?
                    <div style={{width: 122,display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                        <VerifiedIcon style={{color: '#f5deb3d9', fontSize: 15, paddingRight: 6}} />
                        <label style={{fontSize: 10, color: '#f5deb3d9'}}>{wallet.snippet}</label>
                    </div> : null
                    }
                    <div id="twitter">
                        <IconButton className="social-button" onClick={() => document.getElementById('twitter-link-nav').click()}><TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 20}} /></IconButton>
                        <a id="twitter-link-nav" target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
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
                                <a id="stake" href="#" onClick={handleLinkClick}>Staking</a>
                                <a id="specs" href="#" onClick={handleLinkClick}>Specs</a>
                                <a id="roadmap" href="#" onClick={handleLinkClick}>Roadmap</a>                                
                                <a id="team" href="#" onClick={handleLinkClick}>The Founders</a>
                            </div>                            
                        </div>                        
                    </Drawer>
                </div>
            </div>
        </div>
    )
}

export default NavBar;