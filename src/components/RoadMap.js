import Card from '../components/Card';
import React, { useState } from 'react'
import '../stylesheet/RoadMap.css';
import FadeInContainer from './FadeInContainer';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

const steps = [
    {
        label: 'Phase 1 - Airdrop',
        description: 'Airdrop 2-D pixel version of each individual holders sapien.'
    },
    {
        label: 'Phase 2 - Companion',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque id diam.'
    },
    {
        label: 'Phase 3 - Evolution',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque id diam.'
    },
    {
        label: 'Phase 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque id diam.'
    },
    {
        label: 'Phase 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque id diam.'
    },
]

const RoadMap = () => {
    const [active,setActive] = useState(0);
    return (
        <div id="roadmap" className="roadmap-container">
            <FadeInContainer>
                <div style={{margin: 40}}>
                    <h1>ROADMAP</h1>
                </div>
            </FadeInContainer>
            <Timeline position="right">
                {steps.map((step, index) => (
                    <FadeInContainer>
                        <TimelineItem className="roadmap-seperator" key={step.label}>
                            <TimelineSeparator>
                                <TimelineDot className="roadmap-dot">
                                    <div>
                                        <label>{index + 1}</label>
                                    </div>
                                </TimelineDot>
                                <TimelineConnector className="roadmap-connector" />
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <h2 style={{margin: '10px 0px'}}>{step.label}</h2>
                                    <div className="roadmap-desc" style={{marginTop: 16}}>{step.description}</div>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    </FadeInContainer>
                    
                ))}                
            </Timeline>
            {/* <FadeInContainer>
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
            </FadeInContainer>             */}
        </div>
    )
}

export default RoadMap;
