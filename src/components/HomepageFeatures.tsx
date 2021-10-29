/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  imageDark: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Setup development environment",
    image: "/img/setup-dev-env-light.svg",
    imageDark: "/img/setup-dev-env-dark.svg",
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
    image: "/img/write-smart-contracts-light.svg",
    imageDark: "/img/write-smart-contracts-dark.svg",
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
    image: "/img/troubleshoot-contracts-light.svg",
    imageDark: "/img/troubleshoot-contracts-dark.svg",
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
    image: "/img/deploy-contracts-light.svg",
    imageDark: "/img/deploy-contracts-dark.svg",
    description: (
      <>
        Quickly go from local development to a live testnet using Clarinet's
        configurable deployment system.
      </>
    ),
  },
  {
    title: "Integrate contracts and apps",
    image: "/img/integrate-contracts-light.svg",
    imageDark: "/img/integrate-contracts-dark.svg",
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
    image: "/img/deploy-apps-light.svg",
    imageDark: "/img/deploy-apps-dark.svg",
    description: (
      <>
        Easily deploy and manage your full stack app with Hiro developer tools.
      </>
    ),
  },
];

function Feature({ title, image, imageDark, description }: FeatureItem) {
  return (
    <div className="col">
      <div className="text--left">
        <ThemedImage
          alt={title}
          className={styles.featureSvg}
          sources={{
            light: useBaseUrl(image),
            dark: useBaseUrl(imageDark),
          }}
        />
      </div>
      <div className="text--left padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FeatureRow({ index, items }): JSX.Element {
  const features = FeatureList.slice(index, index + items);

  return (
    <div className="row">
      {features.map((props, idx) => {
        return <Feature key={idx} {...props} />;
      })}
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  let rows: JSX.Element[] = [];

  for (let i = 0; i < Math.ceil(FeatureList.length / 3); i++) {
    rows.push(<FeatureRow index={i * 3} items={3} />);
  }

  return (
    <section className={styles.features}>
      <div className="container">{rows}</div>
    </section>
  );
}
