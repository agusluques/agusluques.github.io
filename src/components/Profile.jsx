import { useState } from "react";
import mePicture from "../assets/me.jpg";
import { cv, links, profile, skills } from "../data/profile.js";
import { useI18n } from "../i18n/I18nContext.jsx";
import Icon from "./Icon.jsx";
import styles from "./Profile.module.scss";

export default function Profile() {
  const [openSkill, setOpenSkill] = useState(null);
  const { t } = useI18n();

  const about = t("about.items");
  const skillInfo = t("skill.info");

  return (
    <div className={styles.profile}>
      <section className={styles.identity}>
        <img
          src={mePicture}
          alt={profile.name}
          className={styles.photo}
          width="96"
          height="96"
        />
        <div>
          <h2 className={styles.name}>{profile.name}</h2>
          <p className={styles.role}>{t("profile.role")}</p>
          <p className={styles.location}>{profile.location}</p>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="about-heading">
        <h3 id="about-heading" className={styles.blockTitle}>
          {t("profile.about.title")}
        </h3>
        <ul className={styles.about}>
          {about.map((line) => (
            // The copy carries its own emphasis tags, and is authored in
            // src/i18n/translations.js — never from user input.
            <li key={line} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </ul>
      </section>

      {/* <section className={styles.block} aria-labelledby="skills-heading">
        <h3 id="skills-heading" className={styles.blockTitle}>
          {t('profile.skills.title')}
        </h3>
        <ul className={styles.skills}>
          {skills.map((skill) => {
            const isOpen = openSkill === skill.id;
            return (
              <li key={skill.id}>
                <button
                  type="button"
                  className={isOpen ? styles.chipOn : styles.chip}
                  aria-expanded={isOpen}
                  onClick={() => setOpenSkill(isOpen ? null : skill.id)}
                >
                  {skill.label}
                </button>
              </li>
            );
          })}
        </ul>
        <p className={styles.skillInfo} role="status">
          {openSkill ? skillInfo[openSkill] : t('profile.skills.hint')}
        </p>
      </section> */}

      <section className={styles.block} aria-labelledby="links-heading">
        <h3 id="links-heading" className={styles.blockTitle}>
          {t("profile.links.title")}
        </h3>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.href} className={styles.link}>
                <Icon name={link.icon} className={styles.linkIcon} />
                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>
                    {t(`links.${link.id}`)}
                  </span>
                  <span className={styles.linkHint}>{link.hint}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href={cv.href} className={styles.cv} download>
          {t("profile.cv")}
        </a>
      </section>
    </div>
  );
}
