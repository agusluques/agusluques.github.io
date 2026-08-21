import { useI18n } from '../i18n/I18nContext.jsx';
import styles from './LanguagePicker.module.scss';

/**
 * A native <select> on purpose. On a phone it opens the operating system's own
 * picker, which is faster and more accessible than any custom dropdown.
 *
 * The control is stretched invisibly over the whole pill and the value is drawn
 * by the span beside it. A bare <select> is only as wide as its text, which
 * left the globe, the caret and all the padding dead to the touch.
 */
export default function LanguagePicker() {
  const { lang, setLang, languages, t } = useI18n();
  const current = languages.find((language) => language.code === lang) ?? languages[0];

  return (
    <div className={styles.picker}>
      <svg
        className={styles.globe}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4.2" ry="9" />
        <path d="M3.2 9h17.6M3.2 15h17.6" />
      </svg>

      {/* The select announces its own value, so this is decoration. */}
      <span className={styles.value} aria-hidden="true">
        {current.short}
      </span>

      <svg className={styles.caret} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>

      <select
        className={styles.select}
        value={lang}
        aria-label={t('header.language')}
        onChange={(event) => setLang(event.target.value)}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}
