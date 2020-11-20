import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
    return (
        <section className={styles.card}>
            {props.children}
        </section>
    )
}

export default Card;