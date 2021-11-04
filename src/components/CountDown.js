import React, {useEffect,useState} from 'react';
import { FormatDropTimer } from './../utilities/util';

const CountDown = () => {
    const [timer,setTimer] = useState(FormatDropTimer(new Date()));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimer(FormatDropTimer(new Date()))
        },100)

        return () => {
            clearInterval(timer);
        }
    },[])

    return (
        <div id="countdown-timer" className="timer-container">
            <div style={{color: "white"}} className="timer-1">
                <div style={{margin: '16px 0px'}}>
                    <label style={{color: 'rgba(255,255,255,0.82)'}}>Launching</label>
                </div>
                <div>
                    {timer}   
                </div>
            </div>
            <div style={{color: "white"}} className="timer-2">
                {timer}
            </div>
        </div>
    )
}

export default CountDown;