import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroImg from '../assets/hero-img-2.jpg';
import $ from 'jquery';
import { FormatDropTimer } from './../utilities/util';

const Hero = () => {
    const handleScrollView = () => {
        const pos = $('#welcome-section').position();
        window.scrollTo({top: pos.top, behavior: 'smooth'})
    }

    return (
        <div>
            <div className="hero-container">
                <div className="hero-img" id="hero-img">
                    <img style={{transform: 'scale(2.5)'}} src={HeroImg} width="100%"></img>
                </div>
                <div className="nft-stat">
                    <div className="inner-stat">
                        <div className="hero-desc">
                            <h5>Unique</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="hero-desc">
                            <h5>Exclusivity</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
                <div style={{position: 'relative', bottom: 84}}>
                    <IconButton className="down-arrow-button" onClick={handleScrollView}><KeyboardArrowDownIcon style={{color: 'white'}} /></IconButton>
                </div>             
                
            </div>
        </div>
    )
}

export default Hero
