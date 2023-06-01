import React, { useEffect, useState } from 'react';

import content from '../_content';

import styles from './banner.module.css';
import clsx from 'clsx';

export function Banner() {
  const { banner } = content;
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // only run client side to avoid client/server conflict
    const now = Date.now();
    setShowBanner(now >= new Date(banner.from).getTime() && now < new Date(banner.to).getTime());
  }, []);

  if (!showBanner) return null;

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
