import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroImg from '../assets/hero-img-3.jpg';
import $ from 'jquery';

const TABS = [
    {title: 'Unique', desc: <p>FOMO Sapiens is a hand-crafted collection of <b>2,000</b>, non-generative digital assets. Each sapien was tailored with their own unique traits, to guarantee what you receive is truly one of a kind.</p>},
    {title: 'Exclusive', desc: <p>We've limited each address to one sapien due to the limited nature of this collection.  Therefore, giving each individual the opportunity to mint their own piece of history.</p>},
    {title: 'Added Value', desc: <p>Most NFT collections stop providing value after the minting process, but FOMO Sapiens goes above and beyond that.  We wanted to give our users the most value out of their NFT by adding the ability to stake your sapien in return for <b>$SAPIEN tokens</b>. You can learn more about the staking process here.</p>},
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
                            <div className="hero-tabs" style={{display: 'flex'}}>
                                {TABS.map((tab,index) => (
                                    <h4 key={tab.title} id={index} className={`hero-tab ${active === index ? 'active-tab' : ""}`} onClick={handleClickTab}>{tab.title}</h4>
                                ))}
                            </div>                            
                            {TABS.filter((tab,index) => index === active).map(tab => (
                                tab.desc
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{position: 'relative', bottom: 60}}>
                    <IconButton className="down-arrow-button" onClick={handleScrollView}><KeyboardArrowDownIcon style={{color: 'wheat', fontSize: 38}} /></IconButton>
                </div>             
                
            </div>
        </div>
    )
}

export default Hero
