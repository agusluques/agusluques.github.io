import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Card from '../../Containers/Card/Card';

import styles from './About.module.scss';

const About = (props) => {
    const {
        start
    } = props;

    const [showText, setShowText] = useState(false);

    return (
        <Card>
            <section className={styles.title}>
                {start && <Typewriter
                    options={{
                        autoStart: false,
                        wrapperClassName: styles.Typewriter__wrapper,
                        cursorClassName: styles.Typewriter__cursor
                    }}
                    onInit={(typewritter) => {
                        typewritter
                            .typeString('<span>Who am I?</span>')
                            .callFunction(() => {
                                setShowText(true);
                            })
                            .start();
                    }}
                />}
            </section>
            <section className={showText ? `${styles.about_me} ${styles.is_visible}` : styles.about_me}>
                <ul className={styles.about_me_list}>
                    <li><u>software engineer</u> from <u>University of Buenos Aires</u>.</li>
                    <li><u>.NET</u> fullstack developer with <u>+4 years</u> of experience.</li>
                    <li>been working on my personal projects for <u>+2 years</u> with <u>Python</u>.</li>
                    <li><u>quick learner</u> and <u>hard worker</u>.</li>
                    <li>passionate about <u>technology</u> and <u>learning</u> new things.</li>
                </ul>
            </section>
        </Card>
    )
}

export default About;