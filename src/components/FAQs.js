import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FadeInContainer from './FadeInContainer';
import '../stylesheet/FAQs.css';


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
            <Accordion className={`accordian-container ${expanded === 'f0' ? 'accordian-selected' : ''}`} id="f0" expanded={expanded === 'f0'} onChange={onAccordionChange('f0')}>
                <AccordionSummary expandIcon={expanded === 'f0' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
                    <p>What is FOMO SAPIENS?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}><b>FOMO SAPIENS</b> is a collection of 5,500 3D, generative digital assets who call the Ethereum blockchain their home.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion className={`accordian-container ${expanded === 'f1' ? 'accordian-selected' : ''}`} id="f1" expanded={expanded === 'f1'} onChange={onAccordionChange('f1')}>
                <AccordionSummary expandIcon={expanded === 'f1' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
                    <p>What chain is this project on?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>This project will be launched on the Ethereum network.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion className={`accordian-container ${expanded === 'f2' ? 'accordian-selected' : ''}`} id="f2" expanded={expanded === 'f2'} onChange={onAccordionChange('f2')}>
                <AccordionSummary expandIcon={expanded === 'f2' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
                    <p>What is the cost to mint?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>Due to the limited nature of this collection, each sapien will cost <b>0.1 ETH + gas fees</b> to mint. This will help build a solid foundation for expanding our team and building endless value for our holders.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion className={`accordian-container ${expanded === 'f3' ? 'accordian-selected' : ''}`} id="f3" expanded={expanded === 'f3'} onChange={onAccordionChange('f3')}>
                <AccordionSummary expandIcon={expanded === 'f3' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
                    <p>How many sapiens will be available?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>There will be <b>5,500</b> sapiens available in this collection. We've elected 2,000 sapiens to be minted during presale, and the rest will be available during the public sale.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion className={`accordian-container ${expanded === 'f4' ? 'accordian-selected' : ''}`} id="f4" expanded={expanded === 'f4'} onChange={onAccordionChange('f4')}>
                <AccordionSummary expandIcon={expanded === 'f4' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
                    <p>Will my sapien have rarities and traits?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>Yes. Each sapien and thier traits were carefully crafted by our beloved artist, therefore each sapien contains their own unique traits. Some of these traits possess a higher rarity, but will not effect the amount of <b>$SAPIEN</b> tokens received during the staking process.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion className={`accordian-container ${expanded === 'f5' ? 'accordian-selected' : ''}`} id="f5" expanded={expanded === 'f5'} onChange={onAccordionChange('f5')}>
                <AccordionSummary expandIcon={expanded === 'f5' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
                    <p>Will I be able to stake my sapien?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p style={{fontWeight: 'normal'}}>Yes. You will have the option to stake your sapien in return for <b>$SAPIEN</b> tokens.</p>
                </AccordionDetails>
            </Accordion>
            </FadeInContainer>
            <FadeInContainer animation="fade-in">
            <Accordion className={`accordian-container ${expanded === 'f6' ? 'accordian-selected' : ''}`} id="f6" expanded={expanded === 'f6'} onChange={onAccordionChange('f6')}>
                <AccordionSummary expandIcon={expanded === 'f6' ? <CloseIcon style={{color: 'black'}} /> : <AddIcon style={{color: 'black'}} />}>
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
