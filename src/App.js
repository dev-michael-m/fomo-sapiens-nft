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
import AlertBar from './components/AlertBar';
import FAQs from './components/FAQs';
import Promo from './components/Promo';
import DiscordIcon from './assets/discord.png';
import OpenSeaIcon from './assets/opensea.png';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';

const LAUNCH_DATE = '11/20/2021';

function App() {
  const [progress,setProgress] = useState(DateDifference(new Date(), new Date(LAUNCH_DATE)));
  const [active, setActive] = useState(false);
  const [alert,setAlert] = useState({
    severity: 'success',
    msg: '',
    visible: false
  });

  const handleTokensMinted = async () => {
    const minted = await tokensMinted();
    console.log({minted})
  }

  const onAlert = (severity, msg, visible) => {
    setAlert({
      severity,
      msg,
      visible
    })
  }

  const onCloseAlert = () => {
    setAlert(prevState => ({
      ...prevState,
      visible: false
    }))
  }

  return (
    <div className="App">
        <MainApp onAlert={onAlert}>
          {alert.visible ? <AlertBar severity={alert.severity} visible={alert.visible} msg={alert.msg} onClose={onCloseAlert} /> : null}
          
          <div className="main-container parallax-container">
            <div className="inner-main">
              <FadeInContainer>
                <Hero />
              </FadeInContainer>
              <div className="body-container">
                <div id="welcome-section" className="section-large primary-section">
                  <FadeInContainer>
                    <div style={{marginBottom: '12%'}}>
                      <h1 style={{margin: 40}}>WELCOME</h1>
                      <p>
                          2 million years ago a brave ape decided he would no longer let his environment determine how he lived:  his back hurt, knees shot, and quite frankly was disguisted at the idea
                          of continuing to crawl around.  He stood up tall, looked across the desert and took our species first steps.  2 million years later his ancestors dubbed him FOMO Habilis.<br></br><br></br>
                          Today we pay homage not only to him, not only to the pinnacle of evolution, the <b>FOMO SAPIENS</b>, but to all our ancestors who perished so we could prosper.
                      </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '12%'}}>
                      <div id="twitter">
                          <TwitterIcon style={{color: 'rgb(255,255,255)', fontSize: 26}} />
                          <a id="twitter-link-nav" target="_blank" href="https://twitter.com/FomoSapiens_NFT"></a>
                      </div>
                      <div id="discord">
                        <img style={{margin: '0px 10px'}} src={DiscordIcon} width="26px"></img>
                      </div>
                      <div id="opensea">
                        <img style={{margin: '0px 10px'}} src={OpenSeaIcon} width="26px"></img>
                      </div>
                    </div>
                  </FadeInContainer>
                  <FadeInContainer>
                    <div>
                      <Button className="custom-button primary small" variant="contained" color="primary" onClick={() => document.getElementById('discord-link').click()}>Join the List</Button>
                      <a id="discord-link" target="_blank" href="https://discord.com/channels/909901600775086141/909901601521684512"></a>
                    </div>
                  </FadeInContainer>                
                </div>
                <div className="section-large">
                  <FadeInContainer>
                    <Promo />
                  </FadeInContainer>
                </div>
                <FadeInContainer progress_enabled progress={progress}>
                  <div id="countdown" className="section-large" >
                    <CountDown launch_date={active ? LAUNCH_DATE : null} onAlert={onAlert} />                  
                  </div>
                </FadeInContainer> 
                
                <FadeInContainer>
                  <div id="stake" className="section-large primary-section">
                    <h1>STAKING</h1>
                    <p>Earn <b>$SAPIEN</b> tokens by simply holding your NFT.  Our user's come first, and it's our mission to provide you with ever lasting value. Simply stake your sapien and let him do the work for you.</p>
                    <div style={{margin: '40px 0px'}}>
                      <Button className="custom-button primary small" variant="contained" color="primary" onClick={handleTokensMinted}>Staking</Button>
                    </div>
                  </div>                  
                </FadeInContainer>
                {/* <div id="specs" className="section-large">
                  <Specs />           
                </div> */}
                <div className="section-large">
                  <RoadMap />
                </div>
                <div className="section-large">
                  <FAQs />
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
