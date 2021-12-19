import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import FadeInContainer from './FadeInContainer';


const FAQs = () => {
    const [expanded,setExpanded] = useState(false);

    const onAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className='faq-container'>
            <FadeInContainer animation="fade-in">
                <h1>FAQs</h1>
            </FadeInContainer>
            <div style={{marginTop: 60}}>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f0" expanded={expanded === 'f0'} onChange={onAccordionChange('f0')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>What is FOMO SAPIENS?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>FOMO SAPIENS is a hand crafted collection of 2,000, non-generative digital assets who call the Ethereum blockchain their home.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f1" expanded={expanded === 'f1'} onChange={onAccordionChange('f1')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>What chain is this project on?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>This project will be launched on the Ethereum network.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f2" expanded={expanded === 'f2'} onChange={onAccordionChange('f2')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>What is the cost to mint?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>Due to the limited nature of this collection, each sapien will cost 0.1 ETH to mint. This will help build a solid foundation for expanding our team and building endless value for our holders.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f3" expanded={expanded === 'f3'} onChange={onAccordionChange('f3')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>How many sapiens will be available?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>There are 2,000 sapiens available in this collection. We've elected 1,000 sapiens to be minted during presale, and the rest will be available during the public sale.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f4" expanded={expanded === 'f4'} onChange={onAccordionChange('f4')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>Will my sapien have rarities and traits?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>Yes. Each sapien was carefully hand crafted by our beloved artist, therefore each sapien contains their own unique traits. Some of these traits possess a higher rarity, but will not effect the amount of $SAPIEN tokens received during the staking process.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f5" expanded={expanded === 'f5'} onChange={onAccordionChange('f5')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>Will I be able to stake my sapien?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>Yes. You will have the option to stake your sapien in return for $SAPIEN tokens.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion style={{margin: 10, background: 'wheat', color: 'black',fontWeight: 600}} id="f6" expanded={expanded === 'f6'} onChange={onAccordionChange('f6')}>
                <AccordionSummary expandIcon={<AddIcon style={{color: 'black'}} />}>
                    <p>What is the commission on OpenSea?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>The commission on OpenSea is set to 10%.  50% of this commission will be transfered directly back into the DAO.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            </div>
        </div>
    )
}

export default FAQs;
