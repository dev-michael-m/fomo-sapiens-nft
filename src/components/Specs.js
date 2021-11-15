import React from 'react'
import FadeInContainer from './FadeInContainer';
import PlaceholderImg from '../assets/hero-img.jpg';
import TextureIcon from '@mui/icons-material/Texture';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

const Specs = () => {
    return (
        <div>
            <FadeInContainer>
                <h2>Specs</h2>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{marginBottom: 70, textAlign: 'left'}}>
                    <p>
                        Each sapien was carefully handcrafted right down to the exact detail.  By using next gen graphics we were able to provide exquisite
                        results incomparable to anything else in the Metaverse
                    </p>
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex',flexWrap: 'wrap', alignItems: 'center', marginBottom: 180}}>
                    <div style={{width: '60%', zIndex: 2, textAlign: 'left'}}>
                        <div style={{display:'flex',alignItems: 'center',justifyContent: 'space-evenly'}}>
                            <h4 className="secondary-text">Realistic Textures</h4>
                            <TextureIcon className="secondary-text" />
                        </div>
                        <p>
                            The future of the Metaverse will one day provide us the ability to interact with our virtual assets.  We felt it was necessary to provide
                            our users with extremely detailed NFTs that will one day...
                        </p>
                    </div>
                    <div style={{width: '40%', transform: 'scale(2.5)'}}>
                        <img style={{transform: 'scale(3.5)'}} src={PlaceholderImg} width="40%"></img>
                    </div>                    
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex',flexWrap: 'wrap', alignItems: 'center', marginBottom: 180}}>
                    <div style={{width: '40%', transform: 'scale(2.5)'}}>
                        <img style={{transform: 'scale(3.5)'}} src={PlaceholderImg} width="40%"></img>
                    </div>
                    <div style={{width: '60%', zIndex: 2, textAlign: 'right'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <h4 className="secondary-text">Unique Traits</h4>
                            <AccountTreeIcon className="secondary-text" />
                        </div>
                        <p style={{textAlign: 'right'}}>
                            With over 100 different traits...
                        </p>
                    </div>                    
                </div>
            </FadeInContainer>
            <FadeInContainer>
                <div style={{display: 'flex',flexWrap: 'wrap', alignItems: 'center', marginBottom: 180}}>
                    <div style={{width: '60%', zIndex: 2, textAlign: 'left'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <h4 className="secondary-text">Added Depth</h4>
                            <ViewInArIcon className="secondary-text" />
                        </div>
                        <p>
                            Additional lighting is what brings your sapien to life.  This adds depth to your NFT that most 2-D collections can't provide.
                        </p>
                    </div>
                    <div style={{width: '40%', transform: 'scale(2.5)'}}>
                        <img style={{transform: 'scale(3.5)'}} src={PlaceholderImg} width="40%"></img>
                    </div>                    
                </div>
            </FadeInContainer>            
        </div>
    )
}

export default Specs
