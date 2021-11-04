import './App.css';
import Hero from './components/Hero';
import Footer from './pages/Footer';
import Button from '@mui/material/Button';
import MainApp from './pages/MainApp';
import CountDown from './components/CountDown';
import ApiIcon from '@mui/icons-material/Api';

function App() {
  return (
    <div className="App">
        <MainApp>
          <div className="main-container parallax-container">
            <div className="inner-main">
              <Hero />
              <div id="welcome-section" className="section-large">
                <h1>WELCOME</h1>
                <p><i>Fomo Sapiens is an exclusive collection of 2,000 NFT digital assets residing on the Ethereum blockchain.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet purus gravida quis blandit turpis cursus in hac.</i></p>
              </div>
              <div id="countdown" className="section-large">
                <CountDown />
                <div style={{margin: 64}}>
                  <Button className="custom-button medium primary" variant="contained" color="primary">Join the List</Button>
                </div>
              </div>
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
              
              <div className="section" style={{margin: '80px 0px'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div style={{width: '56%', margin: '10px 0px'}}>
                        <Button className="custom-button primary" variant="contained" color="primary">View on OpenSea</Button>
                      </div>
                  </div>
              </div>
              <div className="section">

              </div>
              <Footer />
            </div>            
          </div>          
        </MainApp>
    </div>
  );
}

export default App;
