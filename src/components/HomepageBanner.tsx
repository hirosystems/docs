import React from "react";
import styles from "./HomepageBanner.module.css";

export default function HomepageBanner(): JSX.Element {
  return (
    <section className={styles.banner}>
      <div className="container padding-horiz--lg">
        <div className="row">
          <div className="col col--6">
            <h1>
              Easily write Clarity smart contracts, build apps, and use
              developer tools for Stacks.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
