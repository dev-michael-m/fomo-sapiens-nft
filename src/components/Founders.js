import React from 'react'
import Avatar from '@mui/material/Avatar';
import FadeInContainer from './FadeInContainer';
import Avatar1 from '../assets/syndk8.png';
import Avatar2 from '../assets/adamkruz.png';
import Avatar3 from '../assets/chefcoliin.png';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';

const Founders = () => {
    return (
        <div>
            <FadeInContainer>
                <h1>THE FOUNDERS</h1>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>
                    <Avatar src={Avatar2} style={{width: 120, height: 120}} />
                    <h3>Adamkruz</h3>
                    <h5 style={{marginTop: 0}}>Marketing | Project Manager | Co-Founder</h5>
                    <div>
                    <IconButton className="social-button" ><TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 20}} /></IconButton>
                    </div>
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>
                    <Avatar src={Avatar3} style={{width: 120, height: 120}} />
                    <h3>ChefColin.eth</h3>
                    <h5 style={{marginTop: 0}}>Marketing | Design | Co-Founder</h5>
                    <div>
                    <IconButton className="social-button" ><TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 20}} /></IconButton>
                    </div>
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>   
                    <Avatar src={Avatar1} style={{width: 120, height: 120}}/>
                    <h3>FOMO Syndk8</h3>
                    <h5 style={{marginTop: 0}}>Lead Developer | Smart Contract | Co-Founder</h5>
                    <div>
                    <IconButton className="social-button" ><TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 20}} /></IconButton>
                    </div>
                </div>
            </FadeInContainer>            
        </div>
    )
}

export default Founders
