import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageBanner from "../components/HomepageBanner";
import HomepageFeatures from "../components/HomepageFeatures";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Easily write Clarity smart contracts, build apps, and use developer tools for Stacks"
    >
      <main>
        <HomepageBanner />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
