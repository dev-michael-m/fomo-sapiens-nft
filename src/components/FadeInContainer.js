import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery';

const TOTAL_PROG = 180;

const FadeInContainer = (props) => {
    const [visible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    setVisible(entry.isIntersecting);
                    if(props.progress_enabled){
                        const percent = (TOTAL_PROG / props.progress) / 100;
                        $('#progress-bar').css({transform: `rotate(${45 + (TOTAL_PROG * percent)}deg)`});
                    }                    
                }
            })
        });

        observer.observe(domRef.current);

        return () => observer.unobserve(domRef.current);
    },[])

    return (
        <div
            className={`${props.animation == 'fade-in' ? 'fade-in-section' : props.animation == 'fade-x' ? 'fade-in-section-x' : 
            props.animation == 'fade-left' ? 'fade-in-left' : props.animation == 'fade-right' ? 'fade-in-right' : props.animation == 'fade-bottom' ? 'fade-in-bottom' : 
            'ease-in-section'} ${visible ? 'is-visible' : ''} ${props.className ? props.className : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    )
}

export default FadeInContainer
