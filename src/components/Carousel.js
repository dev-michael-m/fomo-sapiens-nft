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

const styles = {
    root: {
      
    },
    slideContainer: {
      width: '30%'
    },
    slide: {
      minHeight: 100,
      minWidth: 100
    }
  };

const Carousel = () => {
    const [active,setActive] = useState(0);
    const [activeStep,setActiveStep] = useState(0);

    const handleClickTab = (event) => {
        const id = event.target.id;
        setActive(parseInt(id));
    }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         if(activeStep === IMGS.length){
    //             setActiveStep(0);
    //         }else{
    //             setActiveStep(prevState => {
    //                 if(prevState === IMGS.length - 1){
    //                     return 0;
    //                 }else{
    //                     return prevState + 1;
    //                 }
    //             });
    //         }
    //     },6500)

    //     return () => {
    //         clearInterval(timer);
    //     }
    // },[])

    const onIndexChange = (index) => {
        setActiveStep(index);
    }

    const handleSlideChange = (event) => {
        setActiveStep(event.activeIndex);
    }

    return (
        <div className='carousel-container'>
            <FadeInContainer animation="fade-in">
            <div className='carousel-header-img'>
                <img style={{boxShadow: '0px 2px 10px black'}} src={Sapien18} width="75%"></img>
            </div>
            </FadeInContainer>
            <FadeInContainer>
            <div>
                <Swiper
                    spaceBetween={2}
                    slidesPerView={3}
                    onSlideChange={handleSlideChange}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false
                    }}
                >
                    {IMGS.map((image,index) => (<SwiperSlide key={index}><img src={image} width="90%"></img></SwiperSlide>))}
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
