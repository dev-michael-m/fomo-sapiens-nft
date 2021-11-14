import React from 'react'
import Avatar from '@mui/material/Avatar';
import FadeInContainer from './FadeInContainer';
import Avatar1 from '../assets/syndk8.png';
import Avatar2 from '../assets/adamkruz.png';
import Avatar3 from '../assets/chefcoliin.png';
import GroupsIcon from '@mui/icons-material/Groups';

const Founders = () => {
    return (
        <div>
            <FadeInContainer>
                <GroupsIcon fontSize="40px" className="secondary-text" />
                <h2>The Founders</h2>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>
                    <Avatar src={Avatar2} style={{width: 80, height: 80}} />
                    <h3>Adamkruz</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet cursus.
                    </p>
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>
                    <Avatar src={Avatar3} style={{width: 80, height: 80}} />
                    <h3>ChefColin.eth</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet cursus.
                    </p>
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px 0px'}}>   
                    <Avatar src={Avatar1} style={{width: 80, height: 80}}/>
                    <h3>FOMO Syndk8</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet cursus.
                    </p>
                </div>
            </FadeInContainer>            
        </div>
    )
}

export default Founders
