import React from 'react'
import '../stylesheet/RoadMap.css';

const Card = ({number = 0}) => {
    return (
            <div className="card-container">
                <div className="card-inner">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <h2 className="card-header accent" style={{marginRight: 12}}>{number}</h2>
                        <div style={{border: '1px solid rgba(255,255,255,0.30)', height: 36}}></div>
                        <h2 style={{marginLeft: 12}}>RoadMap {number}</h2>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque id diam.</p>
                </div>
            </div>
        
    )
}

export default Card
