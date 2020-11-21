import React from 'react';
import Typewriter from 'typewriter-effect';
import MouseIcon from '../../Components/MouseIcon/MouseIcon';
import styles from './MainScreen.module.scss';

const MainScreen = () => {
    return (
        <section className={styles.mainscreen}>
            <section className={styles.title}>
                <Typewriter
                    options={{
                        autoStart: true,
                        loop: true,
                        wrapperClassName: styles.Typewriter__wrapper,
                        cursorClassName: styles.Typewriter__cursor
                    }}
                    onInit={(typewritter) => {
                        typewritter
                            .typeString(`<span>I am <b class=${styles.green}>Agustin Luques</b></span>`)
                            .pasteString('🙋🏽‍♂️')
                            .pauseFor(500)
                            .deleteChars(15)
                            .typeString(`<span>a <b class=${styles.green}>Software Engineer</b></span>`)
                            .pasteString('💻')
                            .pauseFor(500)
                            .start();
                    }}
                />
            </section>
            <MouseIcon />
        </section>
    )
};

export default MainScreen;