import React, { useState } from 'react';
import Layout from '@theme/Layout';
import '../css/start.css';

const frameworks = { react: 'React', svelte: 'Svelte', vue: 'Vue', angular: 'Angular' };
const features = {
  connectWallet: 'Connect with Wallet',
  stxTokens: 'Send/Receive STX',
  otherTokens: 'Send/Receive other FTs (Fungible Tokens)',
  nft: 'Interact with NFTs (Non-Fungible Tokens)',
  contractCall: 'Call and Read from Clarity Smart-Contracts',
  multiSig: 'Create/Sign Multi-Sig Transactions',
};

export default function Hello() {
  const [framework, setFramework] = useState('');
  const [showCode, setShowCode] = useState(false);

  return (
    <Layout title="Start Stacks.js" description="Stacks.js Starter Projects">
      <div className="container start">
        <h1>Stacks.js Starter ⚡️</h1>
        <p>
          The fastest way to start a new JavaScript project using Stacks.js — web3 here we come!
        </p>
        <p>Select frameworks and features below to generate a starter project.</p>
        <div className="framework-form card" onChange={(e: any) => setFramework(e.target.value)}>
          <span className="card-title">Which framework will the project use?</span>
          {Object.entries(frameworks).map(([k, v]) => (
            <div key={k}>
              <input type="radio" name="framework" id={k} value={k} checked={framework == k} />
              <label htmlFor={k}>{v}</label>
            </div>
          ))}
        </div>
        <div className="features-form card">
          <span className="card-title">Which Stacks features do you need for your project?</span>
          {Object.entries(features).map(([k, v]) => (
            <div key={k}>
              <input type="checkbox" name="features" id={k} value={k} />
              <label htmlFor={k}>{v}</label>
            </div>
          ))}
          <div>
            <input type="checkbox" name="features" id="other" value="other" />
            <input
              type="text"
              id="other-text"
              name="other-text"
              placeholder="What are we missing?"
            />
          </div>
        </div>
        {framework && (
          <div className="align-right">
            <div>
              <button
                onClick={() =>
                  window
                    .open(
                      `https://githubbox.com/hirosystems/create-stacks/tree/main/templates/template-${framework}`
                    )
                    .focus()
                }
              >
                ⚡️ Create Project in Browser Sandbox
              </button>
            </div>
            <span className="or">
              <i>OR</i>
            </span>
            <button className="terminal" onClick={() => setShowCode(!showCode)}>
              💻 Generate Project Locally
            </button>
          </div>
        )}
        {showCode && (
          <div>
            <br />
            <p>
              Run the following command in your local terminal: <br />
              <code>npm create stacks --template {framework}</code>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
