import React from 'react'
import FSNFT1 from '../assets/22.png';
import FSNFT2 from '../assets/20.png';
import FSNFT3 from '../assets/21.png';

const Promo = ({styling = 'default', animated = false}) => {
    return (
        <div style={{margin: '80px 0px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className={animated ? 'float-slow' : null} style={{position: 'relative', left: styling === 'default' ? '10%' : '2%', opacity: '90%'}}>
                    <img className="nft-img-side" src={FSNFT3}></img>
                </div>
                <div className={animated ? 'float-slow' : null} style={{position: 'relative',right: '3%',zIndex: 10}}>
                    <img src={FSNFT1} className="nft-img-front"></img>
                </div>
                <div className={animated ? 'float-slow' : null} style={{position: 'relative', right: styling === 'default' ? '10%' : '2%', opacity: '90%'}}>
                    <img className="nft-img-side" src={FSNFT2}></img>
                </div>
            </div>
                      
        </div>
    )
}

export default Promo
