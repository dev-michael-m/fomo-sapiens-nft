import React from 'react';
import '../stylesheet/Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <div className="footer-container">
            {/* <div className="inner-footer-container">
                <div className="link-list-container">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">Publications</a></li>
                        <li><a href="#">My Account</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </div>
                <div className="link-list-container">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div> */}
            <div style={{paddingTop: 14}}>
                <label >Fomo Sapiens</label>
                <div style={{marginTop: 20}}>
                    <TwitterIcon />
                </div>
            </div>
            <div className="footer-copyright">
                <label>&copy; {new Date().getFullYear()} Fomo Sapiens</label>
            </div>
        </div>
    )
}

export default Footer;