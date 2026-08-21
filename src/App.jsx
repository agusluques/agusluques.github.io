import { useCallback, useEffect, useRef, useState } from "react";
import PenaltyGame from "./components/PenaltyGame.jsx";
import Profile from "./components/Profile.jsx";
import LanguagePicker from "./components/LanguagePicker.jsx";
import Confetti from "./components/Confetti.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import { smoothScrollTo } from "./utils/smoothScroll.js";
import styles from "./App.module.scss";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [skipped, setSkipped] = useState(false);
  // Bumped on every goal, so a second goal fires a fresh burst.
  const [celebrations, setCelebrations] = useState(0);
  const profileRef = useRef(null);
  const { t } = useI18n();

  const unlock = useCallback(() => {
    setUnlocked(true);
    setCelebrations((n) => n + 1);
  }, []);

  const skip = useCallback(() => {
    setSkipped(true);
    setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!unlocked) return undefined;

    // Let the goal land first: the verdict, the confetti and the 0.6s reveal
    // all play out before the page moves. Scrolling mid-reveal also chased a
    // target that was still animating.
    let cancelScroll = () => {};
    const id = window.setTimeout(() => {
      cancelScroll = smoothScrollTo(profileRef.current, { offset: 24 });
    }, 1100);

    return () => {
      window.clearTimeout(id);
      cancelScroll();
    };
  }, [unlocked]);

  return (
    <div className={styles.page}>
      <Confetti trigger={celebrations} />

      <header className={styles.scoreboard}>
        <div className={styles.match}>
          <span>
            <i className={styles.kitBoca} aria-hidden="true" />
            Boca
          </span>
          <span aria-hidden="true">vs</span>
          <span>
            <i className={styles.kitRiver} aria-hidden="true" />
            River
          </span>
          <span className={styles.venue}>{t("header.venue")}</span>
        </div>
        <div className={styles.tools}>
          <LanguagePicker />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: t("hero.title") }}
          />
          <p
            className={styles.lede}
            dangerouslySetInnerHTML={{ __html: t("hero.lede") }}
          />

          <PenaltyGame onGoal={unlock} />

          {!unlocked && (
            <button type="button" className={styles.skip} onClick={skip}>
              {t("hero.skip")}
            </button>
          )}
        </section>

        <section
          ref={profileRef}
          className={unlocked ? styles.unlocked : styles.locked}
          aria-hidden={!unlocked}
        >
          {unlocked && (
            <>
              <p className={styles.stamp}>
                {skipped ? t("stamp.skipped") : t("stamp.goal")}
              </p>
              <Profile />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
