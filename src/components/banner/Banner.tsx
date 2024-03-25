import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';

import content from '../_content';

import styles from './banner.module.css';
import clsx from 'clsx';

import { X } from 'lucide-react';

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
          {banner.relativeUrl ? (
            <Link to={banner.ctaLink}>{banner.cta}</Link>
          ) : (
            <a href={banner.ctaLink} target="_blank" rel="noopener noreferrer">
              {banner.cta}
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function TopBanner() {
  const { topBanner } = content;
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // only run client side to avoid client/server conflict
    const now = Date.now();
    setShowBanner(
      now >= new Date(topBanner.from).getTime() && now < new Date(topBanner.to).getTime()
    );
  }, []);

  if (!showBanner) return null;

  return (
    <div className={clsx(styles.banner, styles[`banner-${topBanner.type}`])}>
      <div className="image hidden" />

      <div className={styles.topBannerContent}>
        {topBanner.text.map((t, i) => (
          <p key={i}>
            {t}. <Link to={topBanner.ctaLink}>{topBanner.cta}</Link>
          </p>
        ))}
      </div>

      {/* <X className="text-neutral-800" /> */}
    </div>
  );
}
