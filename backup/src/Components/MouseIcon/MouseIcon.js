import React, { useEffect, useState } from 'react';
import styles from './MouseIcon.module.scss';

const MouseIcon = (props) => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.onscroll = () => {
                let currentScrollPosition = window.pageYOffset;
                //let maxScroll = document.body.scrollHeight - window.innerHeight;
                //if (currentScrollPosition > 0 && currentScrollPosition <= maxScroll) {
                if (currentScrollPosition > 200) {
                    setOpacity(0);
                } else {
                    setOpacity(1);
                }
            }
        }
    }, [])

    return (
        <div className={styles.mouse_icon} style={{ opacity }}>
            <div className={styles.wheel}></div>
        </div>
    )
}

export default MouseIcon;