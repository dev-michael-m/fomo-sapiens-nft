import Card from '../components/Card';
import React from 'react'
import '../stylesheet/RoadMap.css';
import FadeInContainer from './FadeInContainer';

const RoadMap = () => {
    return (
        <div id="roadmap" className="roadmap-container">
            <FadeInContainer>
                <div style={{margin: 40}}>
                    <h1>RoadMap</h1>
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <Card number={1}/>
            </FadeInContainer>
            <FadeInContainer>
                <Card number={2}/>
            </FadeInContainer>
            <FadeInContainer>
                <Card number={3}/>
            </FadeInContainer>
            <FadeInContainer>
                <Card number={4}/>
            </FadeInContainer>
            <FadeInContainer>
                <Card number={5}/>
            </FadeInContainer>            
        </div>
    )
}

export default RoadMap;
