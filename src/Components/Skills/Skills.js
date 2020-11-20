import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Card from '../../Containers/Card/Card';
import styles from './Skills.module.scss';
import { skills } from './my-skills';
import Search from './Search/Search';

const Skills = (props) => {
    const {
        start
    } = props;

    const [showText, setShowText] = useState(false);
    const [finished, setFinished] = useState(false);

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
                            .typeString('<span>What do I know?</span>')
                            .callFunction(() => {
                                setShowText(true);
                            })
                            .start();
                    }}
                />}
            </section>
            <section className={showText ? `${styles.skills} ${styles.is_visible}` : styles.skills}>
                <section className={styles.skills_row}>
                    {skills.map((skill) => {
                        return (
                            <section key={skill.value} className={styles.skill}>
                                <Typewriter
                                    options={{
                                        autoStart: false,
                                        cursorClassName: styles.Typewriter__cursor_skill
                                    }}
                                    onInit={(typewritter) => {
                                        typewritter
                                            .pasteString(`<span>${skill.label}</span>`)
                                            .callFunction(() => {
                                                setFinished(true);
                                            })
                                            .start();
                                    }}
                                />
                            </section>
                        )
                    })}

                </section>
            </section>
            {finished && <section className={`${styles.search} ${showText ? styles.is_visible : ''}`}>
                <Search/>
            </section>}
        </Card>
    )
};

export default Skills;