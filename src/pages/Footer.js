import React from 'react';
import '../stylesheet/Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from '../assets/discord.png';

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
        </div>
    )
}

export default Footer;