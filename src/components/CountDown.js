import React, {useEffect,useState} from 'react';
import { FormatDropDate, FormatDropTimer, mintNFT, DateDifference } from './../utilities/util';
import Button from '@mui/material/Button';
import FadeInContainer from './FadeInContainer';
const LAUNCH_DATE = '11/20/2021';
const CountDown = ({launch_date = '', onAlert}) => {
    const [progress,setProgress] = useState(DateDifference(new Date(), new Date(LAUNCH_DATE)));
    const [timer,setTimer] = useState(FormatDropTimer(new Date(), new Date(launch_date)));
    const [dropDisplay,setDropDisplay] = useState({});
    const [active,setActive] = useState(false);

    useEffect(() => {
        if(active){
            const timer = setInterval(() => {
                setTimer(FormatDropTimer(new Date(), new Date(launch_date)))            
            },100)
    
            return () => {
                clearInterval(timer);
            }
        }        
    },[])

    useEffect(() => {
        if(active){
            setDropDisplay(FormatDropDate(launch_date));
        }else{

            const timer = setInterval(() => {
                const today = new Date();
                const ld = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;
                setDropDisplay(FormatDropDate(ld));
            },1000);

            return () => {
                clearInterval(timer);
            }
        }       
    },[])

    return (
        
        <div className="section-background">
            <FadeInContainer animation="fade-in">
                <div>
                    <h1 style={{marginBottom: 75}}>LAUNCHING</h1>
                </div>
            </FadeInContainer>            
            <FadeInContainer  animation="fade-in" progress_enabled progress={progress}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{margin: 'auto'}}>
                    <div className="progress">
                        <div className="barOverflow">
                            <div id="progress-bar" className="bar"></div>
                        </div>
                        <div className="inner-prog-bar">
                            <label style={{color: 'rgba(255,255,255,0.5)',fontSize: 14}}>{dropDisplay.day}</label><br></br>
                            <label>{`${dropDisplay.date} ${dropDisplay.month} ${dropDisplay.year}`}</label><br></br><br></br>
                            <h2 style={{margin: 2}}>{dropDisplay.time}</h2>
                        </div>                    
                    </div>
                </div>
                <div id="countdown-timer" className="timer-container">
                    <div style={{color: "white", display: 'flex', justifyContent: 'space-evenly'}} className="timer-1">                
                        <div>
                            <h3>{active ? timer.days : 'TBA'}</h3>
                            <label>Days</label>
                        </div>
                        <div>
                            <h3>{active ? timer.hours : 'TBA'}</h3>
                            <label>Hours</label>
                        </div>
                        <div>
                            <h3>{active ? timer.minutes : 'TBA'}</h3>
                            <label>Mins</label>
                        </div>
                        <div>
                            <h3>{active ? timer.seconds : 'TBA'}</h3>
                            <label>Sec</label>
                        </div>                        
                    </div>
                </div>
            </div>
            </FadeInContainer>
        </div>
    )
}

export default CountDown;