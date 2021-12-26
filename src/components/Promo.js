import React from 'react'
import FSNFT1 from '../assets/22.png';
import FSNFT2 from '../assets/20.png';
import FSNFT3 from '../assets/21.png';

const imgs = [
    FSNFT3,
    FSNFT1,
    FSNFT2
]

const Promo = ({styling = 'default', animated = false, glow = false, seed = [0,1,2]}) => {
    return (
        <div style={{margin: '80px 0px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className={animated ? 'float-slow' : null} style={{position: 'relative', left: styling === 'default' ? '10%' : '2%', opacity: '90%'}}>
                    <img className={`nft-img-side ${glow ? 'glow' : ''}`} src={imgs[seed[0]]}></img>
                </div>
                <div className={animated ? 'float-slow' : null} style={{position: 'relative',right: '3%',zIndex: 10}}>
                    <img src={imgs[seed[1]]} className={`nft-img-front ${glow ? 'glow' : ''}`}></img>
                </div>
                <div className={animated ? 'float-slow' : null} style={{position: 'relative', right: styling === 'default' ? '10%' : '2%', opacity: '90%'}}>
                    <img className={`nft-img-side ${glow ? 'glow' : ''}`} src={imgs[seed[2]]}></img>
                </div>
            </div>
                      
        </div>
    )
}

export default Promo
