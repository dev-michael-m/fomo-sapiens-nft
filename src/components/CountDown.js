import React, {useEffect,useState} from 'react';
import { FormatDropDate, FormatDropTimer, mintNFT } from './../utilities/util';
import Button from '@mui/material/Button';

const CountDown = ({launch_date = ''}) => {
    const [timer,setTimer] = useState(FormatDropTimer(new Date(), new Date(launch_date)));
    const [dropDisplay,setDropDisplay] = useState({});

    useEffect(() => {
        const timer = setInterval(() => {
            setTimer(FormatDropTimer(new Date(), new Date(launch_date)))            
        },100)

        return () => {
            clearInterval(timer);
        }
    },[])

    useEffect(() => {
        console.log('calling display')
        setDropDisplay(FormatDropDate(launch_date));
        
    },[])

    const onMint = async () => {
        const status = await mintNFT('someuri');
    }

    return (
        <div className="section-background">
            <div>
                <h2 style={{marginBottom: 75}}>Launching</h2>
            </div>
            <div className="countdown-container" style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{margin: 'auto'}}>
                    <div className="progress">
                        <div className="barOverflow">
                            <div id="progress-bar" className="bar"></div>
                        </div>
                        <div style={{position: 'relative', bottom: 60}}>
                            <label style={{color: 'rgba(255,255,255,0.5)',fontSize: 14}}>{dropDisplay.day}</label><br></br>
                            <label>{`${dropDisplay.date} ${dropDisplay.month} ${dropDisplay.year}`}</label><br></br><br></br>
                            <h2 style={{margin: 2}}>09:30</h2>
                        </div>                    
                    </div>
                </div>
                <div id="countdown-timer" className="timer-container">
                    <div style={{color: "white", display: 'flex', justifyContent: 'space-evenly'}} className="timer-1">                
                        <div>
                            <h3>{timer.days}</h3>
                            <label>Days</label>
                        </div>
                        <div>
                            <h3>{timer.hours}</h3>
                            <label>Hours</label>
                        </div>
                        <div>
                            <h3>{timer.minutes}</h3>
                            <label>Mins</label>
                        </div>
                        <div>
                            <h3>{timer.seconds}</h3>
                            <label>Sec</label>
                        </div>                        
                    </div>
                </div>
            </div>
            <div style={{marginTop: 32}}>
                <Button className="custom-button medium" variant="contained" color="primary" onClick={onMint}>Mint</Button>
            </div>
        </div>
        
    )
}

export default CountDown;