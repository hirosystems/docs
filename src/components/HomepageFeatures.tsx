/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Setup development environment",
    image: "/img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Hiro developer tools provide an easy, complete development environment
        without the need to install multiple packages. Simply install{" "}
        <a href="/docs/smart-contracts/clarinet">Clarinet</a> and start building
        on Stacks.
      </>
    ),
  },
  {
    title: "Write and test smart contracts",
    image: "/img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Check out our{" "}
        <a href="/docs/tutorials">extensive library of tutorials</a> for
        guidance on how to write smart contracts in Clarity using Hiro developer
        tools.
      </>
    ),
  },
  {
    title: "Troubleshoot contracts",
    image: "/img/undraw_docusaurus_react.svg",
    description: (
      <>
        <a href="/docs/smart-contracts/clarinet">Clarinet</a> provides{" "}
        <a href="/docs/smart-contracts/devnet">powerful debugging tools</a> and
        troubleshooting your smart contracts locally, so you don't have to
        deploy work-in-progress code to a live blockchain.
      </>
    ),
  },
  {
    title: "Deploy contracts",
    image: "/img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Quickly go from local development to a live testnet using Clarinet's
        configurable deployment system.
      </>
    ),
  },
  {
    title: "Integrate contracts and apps",
    image: "/img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Use the local DevNet to integrate your smart contracts with a web
        frontend, or check out some{" "}
        <a href="/docs/example-apps/billboard">example apps</a> that demonstrate
        the local integration environment.
      </>
    ),
  },
  {
    title: "Deploy apps",
    image: "/img/undraw_docusaurus_react.svg",
    description: (
      <>
        Easily deploy and manage your full stack app with Hiro developer tools.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
