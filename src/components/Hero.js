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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import { FormatDropTimer, getPresaleState, getPublicState, mintNFT } from './../utilities/util';
import Promo from './Promo';
require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

const LAUNCH_DATE = '12/30/2021';

const Hero = ({onAlert}) => {
    const [active,setActive] = useState(true);
    const [tokens,setTokens] = useState(3);
    const [timer,setTimer] = useState(FormatDropTimer(new Date(), new Date(LAUNCH_DATE)));
    const [saleActive,setSaleActive] = useState(false);
    const [minting,setMinting] = useState(false);

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

            if(active){
                const timer = setInterval(() => {
                    setTimer(FormatDropTimer(new Date(), new Date(LAUNCH_DATE)))            
                },100)
        
                return () => {
                    clearInterval(timer);
                }
            }
        }

        return () => {
            mounted = false;
        }
    },[])

    const onMint = async () => {
        setMinting(true);
        await mintNFT('public',tokens).then(res => {
            const txHash = res.data;

            const progress = setInterval(() => {
                const receipt = web3.eth.getTransactionReceipt(txHash).then(status => {
                    if(!status){
                        //console.log({status})
                    }else if(status.status){
                        console.log({status})
                        const tokenIds = status.logs.reduce((tokensMinted,log) => {
                            tokensMinted.push(web3.utils.hexToNumber(log.topics[3]));
                        },[])
                        console.log({tokenIds});
                        console.log({status})
                        setMinting(false);
                        clearInterval(progress);
                    }
                }).catch(error => {
                    console.error(error);
                    clearInterval(progress);
                    setMinting(false);
                })
            },1000)
        }).catch(error => {
            console.error(error);
            onAlert(
                'error',
                error.msg.message,
                true
            )
            setMinting(false);
        })        
    }

    const mintMinus = () => {
        if(tokens > 1){
            setTokens(prevState => prevState - 1);
        }        
    }

    const mintAdd = () => {
        if(tokens < 3){
            setTokens(prevState => prevState + 1);
        }
    }

    return (
        <div className="hero-container">
            <div className='hero-inner'>
                <FadeInContainer>
                    {/* <div className="hero-img" id="hero-img">
                        <img src={HeroImg} width="100%"></img>
                    </div> */}
                    <div style={{paddingTop: 100}}>
                        <Promo styling="full" animated outline="gold" />
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
                    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                        <IconButton onClick={mintMinus}><RemoveIcon style={{color: 'white'}} /></IconButton>
                        <TextField className="mint-num" id="num-tokens" type="number" inputMode="numeric" value={tokens} />
                        <IconButton onClick={mintAdd}><AddIcon style={{color: 'white'}} /></IconButton>
                    </div>
                    <div style={{marginTop: 32}}>
                        <Button className={`custom-button primary medium ${!saleActive ? 'disabled' : ''}`} disabled={!saleActive ? true : false} variant="contained" color="primary" onClick={onMint}>{minting ? 'Minting...' : 'Mint'}</Button>
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
                    <div style={{display: 'flex', justifyContent: 'space-around', width: 300, alignItems: 'center', margin: '0px auto 12% auto'}}>
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
