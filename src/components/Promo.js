import React from 'react'
import FSNFT1 from '../assets/18.png';
import FSNFT2 from '../assets/11.png';
import FSNFT3 from '../assets/13.png';

const Promo = () => {
    return (
        <div style={{marginBottom: 72}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{position: 'relative', left: '10%', opacity: '90%'}}>
                    <img className="nft-img-side" src={FSNFT3}></img>
                </div>
                <div style={{position: 'relative',right: '3%',zIndex: 10}}>
                    <img src={FSNFT1} className="nft-img-front"></img>
                </div>
                <div style={{position: 'relative', right: '10%', opacity: '90%'}}>
                    <img className="nft-img-side" src={FSNFT2}></img>
                </div>
            </div>
                      
        </div>
    )
}

export default Promo
