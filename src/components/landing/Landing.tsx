import React from 'react';

import Link from '@docusaurus/Link';

import content from './_content';
import styles from './landing.module.css';

const { hero, popularSections, sections } = content;

export function Landing() {
  return (
    <div className={styles.landingPage}>
      <section className={styles.hero}>
        <img src={hero.image.src} alt={hero.image.alt} title={hero.image.alt} />
        <div>
          <h1>{hero.title}</h1>
          <p>{hero.text}</p>
          <ul>
            {hero.links.map((link, i) => (
              <li key={i}>
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h4>{popularSections.title}</h4>
        <div className={styles.popularSections}>
          {popularSections.sections.map((section, i) => (
            <Link href={section.href} key={i}>
              <div className={styles.backgroundImageContainer}>
                <div
                  style={{ backgroundImage: `url(${section.image.src})` }}
                  className={styles.backgroundImage}
                />
              </div>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        {sections.map((section, i) => (
          <div key={i} className={styles.docSection}>
            <div className={styles.sectionTitle}>
              <img src={section.image.src} />
              <h2>{section.title}</h2>
            </div>
            <p>{section.description}</p>
            <Link className={styles.subSections}>
              {section.subSections.map((sub, j) => (
                <Link href={sub.link} key={`${i}-${j}`}>
                  <div className={styles.subSectionTitle}>
                    <h3>{sub.title}</h3>
                    <span>&rarr;</span>
                  </div>
                  <p>{sub.description}</p>
                </Link>
              ))}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
