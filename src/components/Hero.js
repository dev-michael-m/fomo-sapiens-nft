import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroImg from '../assets/sapienhero.png';
import $ from 'jquery';
import FadeInContainer from './FadeInContainer';
import DiscordIcon from '../assets/discordteal.png';
import OpenSeaIcon from '../assets/openseateal.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import { FormatDropTimer, getPresaleState, getPublicState, mintNFT, getTokensMinted } from './../utilities/util';
import Promo from './Promo';
import CustomModal from './Modal';

require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const MAX_MINT = process.env.REACT_APP_MAX_MINT;
const web3 = createAlchemyWeb3(alchemyKey);

const LAUNCH_DATE = '12/26/2021 23:35:00';

const Hero = ({wallet,onAlert}) => {
    const [active,setActive] = useState(true);
    const [tokens,setTokens] = useState(3);
    const [refreshTimer,setRefreshTimer] = useState(false);
    const [timer,setTimer] = useState(FormatDropTimer(new Date(), new Date(LAUNCH_DATE)));
    const [saleActive,setSaleActive] = useState(false);
    const [minting,setMinting] = useState(false);
    const [txn,setTxn] = useState(null);
    const [modalOpen,setModalOpen] = useState(false);
    const [imgSeed,setImgSeed] = useState([0,1,2]);

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
                        setSaleActive(true);
                        setRefreshTimer(false);
                    }
                }
            })();

            generateImageSeed();

            if(active){
                const timer = setInterval(() => {
                    const current_timer = FormatDropTimer(new Date(), new Date(LAUNCH_DATE));
                    setTimer(current_timer);

                    if(parseInt(current_timer.seconds) == 20){
                        onAlert(
                            'info',
                            'Minting is about to commence!',
                            true
                        )
                    }
                    
                    if(current_timer.active){
                        setRefreshTimer(true);
                        clearInterval(timer);
                    }
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

    const generateImageSeed = () => {
        const shuffledImages = imgSeed.sort((a,b) => 0.5 - Math.random());
        setImgSeed(shuffledImages);
    }

    const onMint = async () => {
        const amount_minted = await getTokensMinted(wallet.address);

        if(amount_minted.status === 'success'){
            if(amount_minted.data < MAX_MINT){
                setMinting(true);
                await mintNFT('public',tokens).then(res => {
                    const txHash = res.data;
        
                    const progress = setInterval(() => {
                        web3.eth.getTransactionReceipt(txHash).then(status => {
                            if(!status){
                                //console.log({status})
                            }else if(status.status){
                                // const tokenIds = status.logs.reduce((tokensMinted,log) => {
                                //     tokensMinted.push(web3.utils.hexToNumber(log.topics[3]));
                                //     return tokensMinted;
                                // },[]);
                                setTxn(status.transactionHash);
                                setMinting(false);
                                setModalOpen(true);
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
            }else{
                onAlert("warning",`You cannot mint more than ${MAX_MINT} sapiens!`, true);
            }
        }else{
            onAlert("error", amount_minted.msg, true);
        }                
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

    const onSocialClick = (event) => {
        const social = event.target.id;
        
        switch(social){
            case 'twitter': document.getElementById('twitter-link-hero').click();
                break;
            case 'discord': document.getElementById('discord-link-hero').click();
                break;
            case 'opensea': document.getElementById('opensea-link-hero').click();
                break;
        }
    }

    const onRefresh = () => {
        window.location.reload();
    }

    const onModalClose = () => {
        setModalOpen(false);
    }

    return (
        <div className="hero-container">
            {txn ? <CustomModal id="mint-success" visible={modalOpen} onClose={onModalClose}>
                <h1>Hi im a modal</h1>
            </CustomModal> : null}
            <div className='hero-inner'>
                <FadeInContainer>
                    {/* <div className="hero-img" id="hero-img">
                        <img src={HeroImg} width="100%"></img>
                    </div> */}
                    <div style={{paddingTop: 100}}>
                        <Promo styling="full" animated glow seed={imgSeed} />
                    </div>
                </FadeInContainer>
                <div className='countdown-container' id="countdown-container">
                    <FadeInContainer>
                    <div id="countdown-timer" className="timer-container">
                        <div style={{color: timer.color ? timer.color : 'white', display: 'flex', justifyContent: 'space-evenly'}} className="timer-1">                
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
                        <Button className={`custom-button primary medium ${!saleActive && !refreshTimer ? 'disabled' : ''}`} disabled={!saleActive && !refreshTimer ? true : false} variant="contained" color="primary" onClick={saleActive && !refreshTimer ? onMint : onRefresh}>{minting ? 'Minting...' : !saleActive && refreshTimer ? 'Refresh' : 'Mint'}</Button>
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
                  </FadeInContainer>
                  <FadeInContainer>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: 300, alignItems: 'center', margin: '0px auto 20px auto'}}>
                      <div id="twitter">
                          <IconButton id="twitter" style={{width: 40}} onClick={onSocialClick}>
                            <TwitterIcon id="twitter" style={{color: 'lightseagreen', fontSize: 26}} />
                            <a id="twitter-link-hero" hidden target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
                          </IconButton>
                      </div>
                      <div id="discord">
                          <IconButton id="discord" style={{width: 40}} onClick={onSocialClick}>
                              <img id="discord" style={{margin: '0px 10px'}} src={DiscordIcon} width="26px"></img>
                              <a id="discord-link-hero" hidden target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
                          </IconButton>
                      </div>
                      <div id="opensea">
                          <IconButton id="opensea" style={{width: 40}} onClick={onSocialClick}>
                              <img id="opensea" style={{margin: '0px 10px'}} src={OpenSeaIcon} width="26px"></img>
                              <a id="opensea-link-hero" hidden target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
                          </IconButton>
                      </div>
                    </div>
                    <div>
                      <Button className={`custom-button primary small`} variant="contained" color="primary" onClick={() => document.getElementById('discord-link').click()}>Join the List</Button>
                      <a id="discord-link" target="_blank" href="https://discord.com/channels/909901600775086141/909901601521684512"></a>
                    </div>
                  </FadeInContainer>                
                </div>                                         
        </div>
    )
}

export default Hero
