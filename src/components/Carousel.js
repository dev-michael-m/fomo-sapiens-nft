import React,{useState,useEffect} from 'react'
import Sapien18 from '../assets/18.png';
import MobileStepper from '@mui/material/MobileStepper';
import Sapien11 from '../assets/11.png';
import Sapien13 from '../assets/13.png';
import Sapien20 from '../assets/20.png';
import Sapien21 from '../assets/21.png';
import Sapien22 from '../assets/22.png';
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react';
import SwiperCore,{
    Autoplay
} from 'swiper';
import 'swiper/swiper.min.css';
import FadeInContainer from './FadeInContainer';

SwiperCore.use([Autoplay]);
const IMGS = [
    Sapien18,
    Sapien11,
    Sapien20,
    Sapien13,
    Sapien21,
    Sapien22
]

const Carousel = () => {
    const [activeStep,setActiveStep] = useState(0);
    const [slides,setSlides] = useState(3);
    const [seed,setSeed] = useState(0);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            const width = window.innerWidth;
            if(width >= 1440){
                setSlides(4);
            }

            const rand_seed = Math.ceil(Math.random() * IMGS.length - 1);
            setSeed(rand_seed);
        }

        return () => {
            mounted = false;
        }        
    },[])

    const handleSlideChange = (event) => {
        setActiveStep(event.activeIndex);
    }

    return (
        <div className='carousel-container'>
            <FadeInContainer animation="fade-in">
            <div className='carousel-header-img'>
                <img className='carousel-head-img' style={{boxShadow: '0px 2px 10px black'}} src={IMGS[seed]}></img>
            </div>
            </FadeInContainer>
            <FadeInContainer>
            <div>
                <Swiper
                    spaceBetween={2}
                    slidesPerView={slides}
                    onSlideChange={handleSlideChange}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false
                    }}
                >
                    {IMGS.map((image,index) => (<SwiperSlide key={index}><img style={(activeStep + 4) % IMGS.length == index ? {boxShadow: '0px 0px 16px black'} : null} className='carousel-sub-img' src={image} width="106px"></img></SwiperSlide>))}
                </Swiper>
                <MobileStepper
                    className="mobile-stepper"
                    steps={IMGS.length}
                    position="static"
                    activeStep={activeStep % IMGS.length}
                /> 
                
            </div>
            </FadeInContainer>
        </div>
    )
}

export default Carousel;
