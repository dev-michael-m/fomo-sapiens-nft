import React from 'react'
import Avatar from '@mui/material/Avatar';
import FadeInContainer from './FadeInContainer';
import Avatar1 from '../assets/syndk8.png';
import Avatar2 from '../assets/adamkruz.png';
import Avatar3 from '../assets/chefcoliin.png';
import GroupsIcon from '@mui/icons-material/Groups';
import DiscordIcon from '../assets/discord.png';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';

const Founders = () => {
    return (
        <div>
            <FadeInContainer animation="fade-in">
                <h1>THE FOUNDERS</h1>
            </FadeInContainer>
            <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                <FadeInContainer className="flex-grow" styles="flex" animation="fade-in">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>
                        <Avatar src={Avatar2} style={{width: 120, height: 120}} />
                        <h3>Adamkruz</h3>
                        <h5 style={{marginTop: 0}}>Founder | Marketing | Project Manager</h5>
                        <div className='socials-founder'>
                            <IconButton ><TwitterIcon style={{color: 'rgb(0,0,0)', fontSize: 26}} /></IconButton>
                            <IconButton style={{width: 42}}><img style={{margin: '0px 10px',filter: 'invert(1)'}} src={DiscordIcon} width="26px"></img></IconButton>
                        </div>
                    </div>
                </FadeInContainer>
                <FadeInContainer className="flex-grow" styles="flex" animation="fade-in">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>
                        <div>
                            <Avatar src={Avatar3} style={{width: 120, height: 120}} />
                        </div>
                        <div>
                            <h3>ChefColin.eth</h3>
                        </div>
                        <div>
                            <h5 style={{marginTop: 0}}>Marketing | Co-Founder </h5>
                        </div>
                        <div className='socials-founder'>
                            <IconButton ><TwitterIcon style={{color: 'rgb(0,0,0)', fontSize: 26}} /></IconButton>
                            <IconButton style={{width: 42}}><img style={{margin: '0px 10px',filter: 'invert(1)'}} src={DiscordIcon} width="26px"></img></IconButton>
                        </div>
                    </div>
                </FadeInContainer>
                <FadeInContainer className="flex-grow" styles="flex" animation="fade-in">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>   
                        <Avatar src={Avatar1} style={{width: 120, height: 120}}/>
                        <h3>Syndk8</h3>
                        <h5 style={{marginTop: 0}}>Developer | Smart Contract | Website</h5>
                        <div className='socials-founder'>
                            <IconButton ><TwitterIcon style={{color: 'rgb(0,0,0)', fontSize: 26}} /></IconButton>
                            <IconButton style={{width: 42}}><img style={{margin: '0px 10px',filter: 'invert(1)'}} src={DiscordIcon} width="26px"></img></IconButton>
                        </div>
                    </div>
                </FadeInContainer>
            </div>
                        
        </div>
    )
}

export default Founders
