import React, { useState } from 'react';
import FadeIn from '../FadeIn/FadeIn';
import About from '../About/About';
import Skills from '../Skills/Skills';
import styles from './Profile.module.scss';

const Profile = () => {
    const [startAbout, setStartAbout] = useState(false);
    const [startSkills, setStartSkills] = useState(false);

    return (
        <section className={styles.profile}>
            <FadeIn hasFinished={setStartAbout}>
                <About start={startAbout}></About>
            </FadeIn>
            <FadeIn hasFinished={setStartSkills}>
                <Skills start={startSkills}></Skills>
            </FadeIn>
        </section>)
}

export default Profile;