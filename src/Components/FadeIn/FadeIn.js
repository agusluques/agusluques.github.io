import React, { useRef, useState, useEffect } from 'react';
import styles from './FadeIn.module.scss';

const FadeIn = ({
  children,
  hasFinished
}) => {
  const domRef = useRef();

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const current = domRef.current;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          hasFinished && hasFinished(true);
          observer.unobserve(current);
        }
      })
    });

    observer.observe(current);

    return () => observer.unobserve(current);
  }, []);

  return (
    <section
      ref={domRef}
      className={`${styles.fadeIn} ${isVisible ? styles.is_visible : ''}`}
    >
      {children}
    </section>
  );
};

export default FadeIn;