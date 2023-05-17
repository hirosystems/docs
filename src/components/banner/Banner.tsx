import React from 'react';

import content from '../_content';

import styles from './banner.module.css';
import clsx from 'clsx';

export function Banner() {
  const { banner } = content;
  if (!banner.showBanner) return null;

  return (
    <div className={clsx(styles.banner, styles[`banner-${banner.type}`])}>
      <div className="image" />

      <div className={styles.bannerContent}>
        {banner.text.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>

      {banner.cta ? (
        <div>
          <a href={banner.ctaLink} target="_blank" rel="noopener noreferrer">
            {banner.cta}
          </a>
        </div>
      ) : null}
    </div>
  );
}
