import React,{useState} from 'react';
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


const NavBar = ({wallet,onAlert,onConnectWallet}) => {

    const [menu,setMenu] = useState(false);
    const [walletActive,setWalletActive] = useState(true);

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
            case 'faqs':
                pos = $('#faqs').position();
                break;
            case 'team':
                pos = $('#founders').position();                    
                break;
            case 'benefits':
                pos = $('#benefits').position();
                break;
        }

        window.scrollTo({top: pos.top, behavior: 'smooth'})
        handleDrawer();
        
    }

    return (
        <div id="nav-container" className="nav-container">
            <div id="inner-nav" className="inner-nav">
                <div style={{marginLeft: 12, marginRight: 'auto', textAlign: 'left', display: 'flex'}}>
                    {/* <h3 className="nav-header">FOMO SAPIENS</h3> */}
                    <img className='nav-logo' src={Logo} ></img>
                </div>
                <div style={{display: 'flex'}}>
                    <div className="socials">
                        {walletActive && !wallet.address ? <div id="connect-wallet" style={{width: 122, marginRight: 10}}>
                            <Button className="custom-button small-social connect-button" style={{fontSize: 10}} onClick={onConnectWallet}> Connect Wallet</Button>
                        </div> : walletActive && wallet.address ?
                        <div style={{width: 122,display: 'flex',alignItems: 'center', justifyContent: 'center', marginRight: 10}}>
                            <VerifiedIcon style={{color: '#ffffff', fontSize: 18, paddingRight: 6}} />
                            <label style={{fontSize: 14, color: '#ffffff'}}>{wallet.snippet}</label>
                        </div> : null
                        }
                        {/* <div id="twitter">
                            <IconButton className="social-button" onClick={() => document.getElementById('twitter-link-nav').click()}><TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 20}} /></IconButton>
                            <a id="twitter-link-nav" target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
                        </div>
                        <div id="discord">

                        </div> */}
                    </div>
                    <div className="right-nav-container">
                        <IconButton style={{padding: 0}} onClick={handleDrawer}>
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
                                    <a id="benefits" href="#" onClick={handleLinkClick}>Utility and Benefits</a>
                                    <a id="roadmap" href="#" onClick={handleLinkClick}>Roadmap</a>                             
                                    <a id="faqs" href="#" onClick={handleLinkClick}>FAQs</a>                             
                                    <a id="team" href="#" onClick={handleLinkClick}>The Founders</a>
                                </div>                            
                            </div>                        
                        </Drawer>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default NavBar;