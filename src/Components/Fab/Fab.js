import React, { useState } from 'react';
import Me from '../../assets/images/me.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import styles from './Fab.module.scss';

const Fab = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <section 
            className={styles.fab_container}
            onMouseLeave={close}
        >
            <div className={`${styles.fab} ${isOpen ? styles.open : ''}`} onMouseEnter={open} onClick={open}>
                <button type="button" className={styles.fab_main}>
                    <img src={Me} className={styles.me_pic} alt="me" />
                </button>
            </div>
            <div className={styles.social_container} style={{ opacity: isOpen ? 1 : 0, display: isOpen ? '' : 'none'}}>
                <a href="https://www.linkedin.com/in/agustin-luques/">
                    <FontAwesomeIcon icon={faLinkedin} className={styles.fa} title="LinkedIn" />
                </a>
                <a href="https://github.com/agusluques">
                    <FontAwesomeIcon icon={faGithub} className={styles.fa} title="Github" />
                </a>
                <a href="mailto:luquesagustin@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} className={styles.fa} title="Mail" />
                </a>
                <a href="https://www.instagram.com/aguusluques/">
                    <FontAwesomeIcon icon={faInstagram} className={styles.fa} title="Instagram" />
                </a>
                <a href="https://twitter.com/aguusluques">
                    <FontAwesomeIcon icon={faTwitter} className={styles.fa} title="Instagram" />
                </a>
                <a href="/cv/CV-AgustinLuques(English).pdf" download>
                    <FontAwesomeIcon icon={faFilePdf} className={styles.fa} title="CV english" />
                </a>

            </div>
        </section>
    );
};

export default Fab;

