import React from 'react';
import '../stylesheet/Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from '../assets/discord.png';
import IconButton from '@mui/material/IconButton';
//https://twitter.com/FomoSapiens_NFT
const Footer = () => {
    return (
        <div className="footer-container">
            <div style={{paddingTop: 14}}>
                <label >Fomo Sapiens</label>
                <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TwitterIcon style={{margin: '0px 10px'}} />
                    <img style={{margin: '0px 10px'}} src={DiscordIcon} width="26px"></img>
                </div>
            </div>
            <div className="footer-copyright">
                <label>&copy; {new Date().getFullYear()} Fomo Sapiens. All Rights Reserved.</label>
            </div>
            <div style={{fontSize: 10, color: 'rgba(255,255,255,0.52)'}}>
                <label>Powered by Lythium.io</label>
            </div>
        </div>
    )
}

export default Footer;