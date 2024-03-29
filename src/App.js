import './App.css';
import Hero from './components/Hero';
import Footer from './pages/Footer';
import MainApp from './pages/MainApp';
import { ConnectWallet, getMintPrice, getSoldOut, MaskAddress, getPublicState, getPresaleState } from './utilities/util';
import RoadMap from './components/RoadMap';
import FadeInContainer from './components/FadeInContainer';
import { useEffect, useState } from 'react';
import Founders from './components/Founders';
import AlertBar from './components/AlertBar';
import FAQs from './components/FAQs';
import Promo from './components/Promo';
import Carousel from './components/Carousel';
import Button from '@mui/material/Button';
import GroupSapiens from './assets/group-nft.png';
import SapienCoin from './assets/crypto-coin-web.png';
import MultiCoins from './assets/crypto-coins-web.png';
import CustomModal from './components/Modal';
import Fade from '@mui/material/Fade';
import CoinbaseLogo from './assets/coinbase-wallet-icon.jpg';
import MetaMaskLogo from './assets/metamask-icon.jpg';
import WalletConnectLogo from './assets/wallet-connect-icon.jpg';

function App() {
  
  const [alert,setAlert] = useState({
    severity: 'success',
    msg: '',
    visible: false
  });

  const [wallet, setWallet] = useState({
    address: null,
    provider: null,
    snippet: null,
  });

  const [modalOpen,setModalOpen] = useState(false);
  const [soldOut,setSoldOut] = useState(false);
  const [saleActive,setSaleActive] = useState(false);
  const [pubSale,setPubSale] = useState(false);
  const [presale,setPresale] = useState(false);

    useEffect(() => {
      let mounted = true;

      if (mounted) {
        (async() => {
          //await window.ethereum.enable();
          const sold_out = await getSoldOut();

          if(sold_out.data){
            setSoldOut(true);
          }else{
            const publicSale = await getPublicState();
            const presale = await getPresaleState();
  
            if(publicSale.status && presale.status){
              if(publicSale.active){
                  setSaleActive(true);
                  setPubSale(publicSale.active);
              }else if(presale.active){
                  setSaleActive(true);
                  setPresale(presale.active);
              }          
            }
          }
        })();

        const connected = sessionStorage.getItem('connected');

        if(connected === 'true'){
          
          ConnectWallet()
          .then((status) => {
            setWallet({
              address: status.address,
              snippet: status.address_snippet,
            });
            window.ethereum.on("accountsChanged", handleAccountsChanged);
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
        

      return () => {
        mounted = false;
      };
    }, []);

    async function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.warn("user has not connected to metamask");
      } else {
        setWallet((prevState) => ({
          ...prevState,
          address: accounts[0],
          snippet: MaskAddress(accounts[0]),
        }));
      }
    }

  const onConnectWallet = (suppress) => {
    setModalOpen(true);
  };

  const onWalletClick = async (event) => {
    const selected = event.target.id;

    ConnectWallet()
      .then((status) => {
        setWallet({
          address: status.address,
          snippet: status.address_snippet,
        });
        setModalOpen(false);
        window.sessionStorage.setItem('connected',true);
      })
      .catch((error) => {
        console.error(error);
      });

      window.ethereum.on("accountsChanged", handleAccountsChanged);
  }

  const onModalClose = () => {
    setModalOpen(false);
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
        <MainApp wallet={wallet} onConnectWallet={onConnectWallet} onAlert={onAlert}>
          {alert.visible ? <AlertBar severity={alert.severity} visible={alert.visible} msg={alert.msg} onClose={onCloseAlert} /> : null}
          <CustomModal id="wallet-connect" visible={modalOpen} width='332px' onClose={onModalClose}>
              <h3>Connect Wallet</h3>
              <Button className="wallet-button" id="metamask" variant='contained' onClick={onWalletClick} endIcon={
                <img id="metamask" src={MetaMaskLogo} width="42px"></img>
              }>MetaMask</Button>
              <Button className="wallet-button" id="coinbase" variant='contained' onClick={onWalletClick} endIcon={
                <img id="coinbase" src={CoinbaseLogo} width="42px"></img>
              }>Coinbase Wallet</Button>
              <Button className="wallet-button" id="walletconnect" variant='contained' onClick={onWalletClick} endIcon={
                <img id="walletconnect" src={WalletConnectLogo} width="42px"></img>
              }>WalletConnect</Button>           
          </CustomModal>
          <div className="main-container parallax-container">
            <div className="inner-main">
              <Hero soldOut={soldOut} preSale={presale} pubSale={pubSale} saleActive={saleActive} wallet={wallet} onAlert={onAlert} />
              <div className="body-container">
                <div className='section-medium'>
                  <Carousel />
                </div>
                
                <div id="benefits" className="primary-section">
                  <h1>UTILITY AND BENEFITS</h1>
                  <FadeInContainer animation="fade-in" >
                    <Promo />
                  </FadeInContainer>
                  <div className='utility-section-inverted'>
                    <div className='utility-left'>
                      <FadeInContainer animation="fade-x">
                        <h3 style={{width: 'fit-content'}}>STAKING</h3>
                      </FadeInContainer>
                      <FadeInContainer animation='fade-in'>
                        <div className='divider'></div>
                        <p>
                          Purchasing a sapien doesn't simply provide you with a valuable, and rare piece of artwork, but also ever lasting value.  Staking your sapien allows them to gather resources, which reward you in <b>$SAPIEN</b> tokens each day.
                          And the best part is, you don't have to do a thing.  Just sit back and let your sapien do the work for you.
                        </p>
                      </FadeInContainer>
                    </div>
                    <div className='utility-right'>
                      <FadeInContainer animation="fade-in">
                        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                          <img className='float' style={{position: 'relative', top: 32}} src={SapienCoin} width="25%"></img>
                          <img src={GroupSapiens} width="100%"></img>
                        </div>                      
                      </FadeInContainer>
                    </div>                    
                  </div>
                  <div className='utility-section'>
                    <div className='utility-left'>
                      <FadeInContainer animation="fade-x">
                        <h3 style={{width: 'fit-content'}}>EVOLUTION</h3>
                      </FadeInContainer>
                      <FadeInContainer animation="fade-in">
                        <div className='divider'></div>
                        <p>
                          What if we told you there was a way to generate even more <b>$SAPIEN</b> daily?  Evolving your sapien makes them smarter and even more resourceful, rewarding you with a higher daily yield.
                          The more you evolve, the bigger the reward!
                        </p>
                      </FadeInContainer>
                    </div>
                    <div className='utility-right'>
                      <FadeInContainer animation="fade-in">
                        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                          <img className='float' style={{position: 'relative', top: 32}} src={MultiCoins} width="100%"></img>
                          <img src={GroupSapiens} width="100%"></img>
                        </div>                      
                      </FadeInContainer>
                    </div>                    
                  </div>
                  <div className='utility-section-inverted'>
                    <div className='utility-left'>
                      <FadeInContainer animation="fade-x">
                        <h3 style={{width: 'fit-content'}}>$SAPIEN</h3>
                      </FadeInContainer>
                      <FadeInContainer animation="fade-in">
                        <div className='divider'></div>
                        <p>
                          $SAPIEN is the universal utility token that revolves around the sapien metaverse.  It's rewarded to those who stake their NFT and/or by staking the tokens themselves.
                          Members can also use $SAPIEN tokens to evolve their unique NFT, producing a higher yield.
                        </p>
                      </FadeInContainer>
                    </div>                  
                  </div>
                  <div className='utility-section'>
                    <div className='utility-left'>
                      <FadeInContainer animation="fade-x">
                        <h3 style={{width: 'fit-content'}}>FOMO DAO</h3>
                      </FadeInContainer>
                      <FadeInContainer animation='fade-in'>
                        <div className='divider'></div>
                        <p>
                          Want to suggest what we do next?  The $SAPIEN token is your big ticket into the DAO, and letting your voice be heard.
                        </p>
                      </FadeInContainer>
                    </div>
                  </div>
                </div>
                <div className="section-large">
                  <RoadMap />
                </div>
                <div id="faqs" className="section-large">
                  <FAQs />
                </div>
                <div id="founders" className="section-medium primary-section">
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
