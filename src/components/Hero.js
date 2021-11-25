import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroImg from '../assets/hero-img-2.jpg';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';
import $ from 'jquery';
import FadeInContainer from './FadeInContainer';

const TABS = [
    {title: 'Unique', desc: <p><b>FOMO SAPIENS</b> is a hand-crafted collection of <b>2,000</b>, non-generative digital assets. Each sapien is personalized with their own traits, to guarantee what you receive is truly one of a kind.</p>},
    {title: 'Exclusive', desc: <p>Due to the limited nature of this collection, we want to make sure everyone has a fair chance to mint their own sapien.</p>},
    {title: 'Community First', desc: <p>Here the community comes first. We've dedicated <b>30%</b> of sales and <b>50%</b> of all royalties to be distributed back into the DAO. This way we can continue to provide you the most value out of your NFT than any other collection.</p>},
]

const Hero = () => {
    const [active,setActive] = useState(0);
    const [activeStep,setActiveStep] = useState(0);

    const handleScrollView = () => {
        const pos = $('#welcome-section').position();
        window.scrollTo({top: pos.top, behavior: 'smooth'})
    }

    const handleClickTab = (event) => {
        const id = event.target.id;
        setActive(parseInt(id));
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if(activeStep === TABS.length){
                setActiveStep(0);
            }else{
                setActiveStep(prevState => {
                    if(prevState === TABS.length - 1){
                        return 0;
                    }else{
                        return prevState + 1;
                    }
                });
            }
        },6500)

        return () => {
            clearInterval(timer);
        }
    },[])

    const onIndexChange = (index) => {
        setActiveStep(index);
    }

    return (
        <div>
            <div className="hero-container">
                <div className="hero-img" id="hero-img">
                    <img src={HeroImg} width="100%"></img>
                </div>
                <div className="hero-details" id="hero-details">
                    <SwipeableViews enableMouseEvents index={activeStep} onChangeIndex={onIndexChange}>
                        {TABS.map((tab,index) => (
                            <div key={index} id={`stepper-${index}`} className={index === activeStep ? 'inner-stepper fade-section' : 'inner-stepper'}>
                                <p style={{fontWeight: 'bold', fontSize: 26, width: 'fit-content', borderBottom: '4px solid wheat'}}>{tab.title}</p>
                                <p>{tab.desc}</p>
                            </div>
                        ))}
                    </SwipeableViews>      
                    <MobileStepper
                        className="mobile-stepper"
                        steps={TABS.length}
                        position="static"
                        activeStep={activeStep}
                    />            
                </div>
                <div className="nft-stat">
                    <div className="inner-stat">
                    </div>
                </div>                           
                
            </div>
            <div className="down-arrow">
                <IconButton className="down-arrow-button" onClick={handleScrollView}><KeyboardArrowDownIcon style={{color: 'wheat', fontSize: 38}} /></IconButton>
            </div> 
        </div>
    )
}

export default Hero
