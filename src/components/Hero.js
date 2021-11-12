import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroImg from '../assets/hero-img-3.jpg';
import $ from 'jquery';

const TABS = [
    {title: 'Unique', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {title: 'Exclusive', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl.'},
]

const Hero = () => {
    const [active,setActive] = useState(0);

    const handleScrollView = () => {
        const pos = $('#welcome-section').position();
        window.scrollTo({top: pos.top, behavior: 'smooth'})
    }

    const handleClickTab = (event) => {
        const id = event.target.id;
        setActive(parseInt(id));
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
                            <div style={{display: 'flex'}}>
                                {TABS.map((tab,index) => (
                                    <h4 key={tab.title} id={index} className={`hero-tab ${active === index ? 'active-tab' : ""}`} onClick={handleClickTab}>{tab.title}</h4>
                                ))}
                            </div>                            
                            {TABS.filter((tab,index) => index === active).map(tab => (
                                <p>{tab.desc}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{position: 'relative', bottom: 130}}>
                    <IconButton className="down-arrow-button" onClick={handleScrollView}><KeyboardArrowDownIcon style={{color: 'wheat', fontSize: 38}} /></IconButton>
                </div>             
                
            </div>
        </div>
    )
}

export default Hero
