import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroImg from '../assets/sapienhero.png';
import $ from 'jquery';
import FadeInContainer from './FadeInContainer';
import DiscordIcon from '../assets/discord.png';
import OpenSeaIcon from '../assets/opensea.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import { getPresaleState, getPublicState, mintNFT } from './../utilities/util';

const TABS = [
    {title: 'Unique', desc: <p><b>FOMO SAPIENS</b> is a hand-crafted collection of <b>4,000</b>, non-generative digital assets. Each sapien is personalized with their own traits, to guarantee what you receive is truly one of a kind.</p>},
    {title: 'Exclusive', desc: <p>Due to the limited nature of this collection, we want to make sure everyone has a fair chance to mint their own sapien.</p>},
    {title: 'Community First', desc: <p>Here the community comes first. We've dedicated <b>30%</b> of sales and <b>50%</b> of all royalties to be distributed back into the DAO. This way we can continue to provide you the most value out of your NFT than any other collection.</p>},
]

const Hero = ({onAlert}) => {
    const [active,setActive] = useState(false);
    const [timer,setTimer] = useState({});
    const [saleActive,setSaleActive] = useState(false);
    const handleScrollView = () => {
        const pos = $('#welcome-section').position();
        window.scrollTo({top: pos.top, behavior: 'smooth'})
    }

    useEffect(() => {
        let mounted = true;

        if(mounted){
            (async () => {
                const presale = await getPresaleState();
                const publicSale = await getPublicState();
                
                if(presale.status && publicSale.status){
                    if(presale.active || publicSale.active){
                        setSaleActive(true)
                    }
                }
            })();
        }

        return () => {
            mounted = false;
        }
    },[])

    const onMint = async () => {
        const status = await mintNFT('presale');
        console.log({status});
        onAlert(
            status.status,
            status.msg,
            true
        )
    }

    return (
        <div className="hero-container">
            <div className='hero-inner'>
                <FadeInContainer>
                    <div className="hero-img" id="hero-img">
                        <img src={HeroImg} width="100%"></img>
                    </div>
                </FadeInContainer>
                <div className='countdown-container' id="countdown-container">
                    <FadeInContainer>
                    <div id="countdown-timer" className="timer-container">
                        <div style={{color: "white", display: 'flex', justifyContent: 'space-evenly'}} className="timer-1">                
                            <div>
                                <h3>{active ? timer.days : 'TBA'}</h3>
                                <label>Days</label>
                            </div>
                            <div>
                                <h3>{active ? timer.hours : 'TBA'}</h3>
                                <label>Hours</label>
                            </div>
                            <div>
                                <h3>{active ? timer.minutes : 'TBA'}</h3>
                                <label>Mins</label>
                            </div>
                            <div>
                                <h3>{active ? timer.seconds : 'TBA'}</h3>
                                <label>Sec</label>
                            </div>                        
                        </div>
                    </div>
                    </FadeInContainer>
                    <FadeInContainer>
                    <div style={{marginTop: 32}}>
                        <Button className={`custom-button medium ${!saleActive ? 'disabled' : ''}`} disabled={!saleActive ? true : false} variant="contained" color="primary" onClick={onMint}>Mint</Button>
                    </div>
                    </FadeInContainer>
                    
                </div>               
                 
            </div>
            <div className="down-arrow">
                <IconButton className="down-arrow-button" onClick={handleScrollView}><KeyboardArrowDownIcon style={{color: 'wheat', fontSize: 38}} /></IconButton>
            </div> 
            
            <div id="welcome-section" className="section-large primary-section">
                  <FadeInContainer animation="fade-in">
                    <div style={{marginBottom: '12%'}}>
                      <h1 style={{margin: 40}}>WELCOME</h1>
                      <p>
                          2 million years ago a brave ape decided he would no longer let his environment determine how he lived:  his back hurt, knees shot, and quite frankly was disguisted at the idea
                          of continuing to crawl around.  He stood up tall, looked across the desert and took our species first steps.  2 million years later his ancestors dubbed him FOMO Habilis.<br></br><br></br>
                          Today we pay homage not only to him, not only to the pinnacle of evolution, the <b>FOMO SAPIENS</b>, but to all our ancestors who perished so we could prosper.
                      </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '12%'}}>
                      <div id="twitter">
                          <TwitterIcon style={{color: 'rgb(0,0,0)', fontSize: 26}} />
                          <a id="twitter-link-nav" target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
                      </div>
                      <div id="discord">
                        <img style={{margin: '0px 10px',filter: 'invert(1)'}} src={DiscordIcon} width="26px"></img>
                      </div>
                      <div id="opensea">
                        <img style={{margin: '0px 10px', filter: 'invert(1)'}} src={OpenSeaIcon} width="26px"></img>
                      </div>
                    </div>
                  </FadeInContainer>
                  <FadeInContainer>
                    <div>
                      <Button className="custom-button primary small" variant="contained" color="primary" onClick={() => document.getElementById('discord-link').click()}>Join the List</Button>
                      <a id="discord-link" target="_blank" href="https://discord.com/channels/909901600775086141/909901601521684512"></a>
                    </div>
                  </FadeInContainer>                
                </div>                                         
        </div>
    )
}

export default Hero
