import './App.css';
import Hero from './components/Hero';
import Footer from './pages/Footer';
import Button from '@mui/material/Button';
import MainApp from './pages/MainApp';
import CountDown from './components/CountDown';
import ApiIcon from '@mui/icons-material/Api';
import { ConnectWallet } from './utilities/util';
import RoadMap from './components/RoadMap';
import FadeInContainer from './components/FadeInContainer';

function App() {

  const handleConnectWallet = async () => {
    const status = await ConnectWallet();
    console.log({status});
  }

  return (
    <div className="App">
        <MainApp>
          <div className="main-container parallax-container">
            <div className="inner-main">
              <Hero />
              <div className="body-container">
                <FadeInContainer>
                  <div id="countdown" className="section-large" >
                    <CountDown />                  
                  </div>
                </FadeInContainer>
                
                <div id="welcome-section" className="section-large">
                  <FadeInContainer>
                    <div style={{marginBottom: 86}}>
                      <h1 style={{margin: 40}}>WELCOME</h1>
                      <p><i>Fomo Sapiens is an exclusive collection of <label className="secondary-text"><b>2,000</b></label> NFT digital assets residing on the Ethereum blockchain.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet purus gravida quis blandit turpis cursus in hac.</i></p>
                    </div>
                  </FadeInContainer>
                  <FadeInContainer>
                    <div style={{marginBottom: 16}}>
                      <Button className="custom-button primary medium" variant="contained" color="primary">View on OpenSea</Button>
                    </div>                    
                  </FadeInContainer>  
                  <FadeInContainer>
                    <div>
                      <Button className="custom-button primary small" variant="contained" color="primary" onClick={handleConnectWallet}>Join the List</Button>
                    </div>
                  </FadeInContainer>                
                </div>               
                <RoadMap />
                <div className="section">
                  <ApiIcon className="accent" />
                  <h2 className="accent">EVOLVE</h2>
                  <p>Step into a world of human evolution. Become the past, present, and the future.</p>
                </div>
                <div className="section">
                  <ApiIcon className="accent" />
                  <h2 className="accent">REVOLUTIONIZE</h2>
                  <p>Step into a world of human evolution. Become the past, present, and the future.</p>
                </div>
                <div className="section">
                  <ApiIcon className="accent" />
                  <h2 className="accent">EVOLVE</h2>
                  <p>Step into a world of human evolution. Become the past, present, and the future.</p>
                </div>
                <div className="section">

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
