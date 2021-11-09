import React, { useEffect, useRef, useState } from 'react'

const FadeInContainer = (props) => {
    const [visible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    setVisible(entry.isIntersecting);
                }
            })
        });

        observer.observe(domRef.current);

        return () => observer.unobserve(domRef.current);
    },[])

    return (
        <div
            className={`fade-in-section ${visible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    )
}

export default FadeInContainer
