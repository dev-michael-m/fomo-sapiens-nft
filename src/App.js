import './App.css';
import Hero from './components/Hero';
import Footer from './pages/Footer';
import Button from '@mui/material/Button';
import MainApp from './pages/MainApp';
import CountDown from './components/CountDown';
import ApiIcon from '@mui/icons-material/Api';
import { ConnectWallet, DateDifference, tokensMinted } from './utilities/util';
import RoadMap from './components/RoadMap';
import FadeInContainer from './components/FadeInContainer';
import { useEffect, useState } from 'react';
import Specs from './components/Specs';
import Founders from './components/Founders';

const LAUNCH_DATE = '11/20/2021';

function App() {
  const [progress,setProgress] = useState(DateDifference(new Date(), new Date(LAUNCH_DATE)));
  const handleConnectWallet = async () => {
    const status = await ConnectWallet();
    console.log({status});
  }

  const handleTokensMinted = async () => {
    const minted = await tokensMinted();
    console.log({minted})
  }

  return (
    <div className="App">
        <MainApp>
          <div className="main-container parallax-container">
            <div className="inner-main">
              <FadeInContainer>
                <Hero />
              </FadeInContainer>
              <div className="body-container">
                <div id="welcome-section" className="section-large">
                  <FadeInContainer>
                    <div style={{marginBottom: 86}}>
                      <h1 style={{margin: 40}}>WELCOME</h1>
                      <p>
                          2 million years ago a brave ape decided he would no longer let his environment determine how he lived:  his back hurt, knees shot, and quite frankly was disguisted at the idea
                          of continuing to crawl around.  He stood up tall, looked across the desert and took our species first steps.  2 million years later his ancestors dubbed him FOMO Habilis.<br></br><br></br>
                          Today we pay homage not only to him, not only to the pinnacle of evolution, the <b>FOMO Sapiens</b>, but to all our ancestors who perished so we could prosper.
                      </p>
                    </div>
                  </FadeInContainer>
                  <FadeInContainer>
                    <div style={{marginBottom: 16}}>
                      <Button className="custom-button primary medium" variant="contained" color="primary" onClick={() => document.getElementById('OS').click()}>View on OpenSea</Button>
                      <a id="OS" target="_blank" href="https://opensea.io/FomoSapiensNFT"></a>
                    </div>                    
                  </FadeInContainer>  
                  <FadeInContainer>
                    <div>
                      <Button className="custom-button primary small" variant="contained" color="primary" onClick={() => document.getElementById('discord-link').click()}>Join the List</Button>
                      <a id="discord-link" target="_blank" href="https://discord.com/channels/909901600775086141/909901601521684512"></a>
                    </div>
                  </FadeInContainer>                
                </div>
                <FadeInContainer progress_enabled progress={progress}>
                  <div id="countdown" className="section-large" >
                    <CountDown launch_date={LAUNCH_DATE} />                  
                  </div>
                </FadeInContainer>   
                <FadeInContainer>
                  <div id="stake" className="section-large">
                    <h2>Staking</h2>
                    <p>Earn <b>$SAPIEN</b> tokens by simply holding your NFT.  Our user's come first, and it's our mission to provide you with ever lasting value. Simply stake your sapien and let him do the work for you.</p>
                    <div style={{margin: '40px 0px'}}>
                      <Button className="custom-button primary small" variant="contained" color="primary" onClick={handleTokensMinted}>Staking</Button>
                    </div>
                  </div>                  
                </FadeInContainer>
                <div id="specs" className="section-large">
                  <Specs />           
                </div>
                <div className="section-large">
                  <RoadMap />
                </div>
                <div id="founders" className="section-medium">
                  <Founders />
                </div>
              </div>              
              <Footer />
            </div>            
          </div>          
        </MainApp>
    </div>
  );
}

export default App;
