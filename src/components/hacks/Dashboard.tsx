import React, { useEffect } from 'react';

import Link from '@docusaurus/Link';

import content from '../_content';
import styles from './dashboard.module.css';

const { hero, popularSections, sections } = content;

export function Dashboard() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://paperform.co/__embed.min.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.landingPage}>
      <button data-paperform-id="hiroapi" data-popup-button="1">
        Click me to show the form!
      </button>
      {/* Rest of your code */}
    </div>
  );
}
