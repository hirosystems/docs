import React, { useState } from 'react';
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

export default function StartComponent() {
  const [framework, setFramework] = useState('');
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="container start">
      <div className="form">
        <div className="framework-form card" onChange={(e: any) => setFramework(e.target.value)}>
          <span className="card-title">Which framework will your project use?</span>
          {Object.entries(frameworks).map(([k, v]) => (
            <div key={k}>
              <input type="radio" name="framework" id={k} value={k} checked={framework == k} />
              <label htmlFor={k}>{v}</label>
            </div>
          ))}
        </div>
        <div className={`features-form card ${!framework && 'disabled'}`}>
          <span className="card-title">
            Which Stacks features do you need for your project?{' '}
            <span className="card-subtitle">Help us improve</span>
          </span>

          {Object.entries(features).map(([k, v]) => (
            <div key={k}>
              <input type="checkbox" name="features" id={k} value={k} disabled={!framework} />
              <label htmlFor={k}>{v}</label>
            </div>
          ))}
          <div>
            <input type="checkbox" name="features" id="other" value="other" disabled={!framework} />
            <input
              type="text"
              id="other-text"
              name="other-text"
              placeholder={framework ? 'What are we missing?' : ''}
              disabled={!framework}
            />
          </div>
        </div>
      </div>
      {framework && (
        <div className="align-right">
          <div>
            <button
              className="sandbox"
              onClick={() =>
                window
                  .open(
                    `https://githubbox.com/hirosystems/create-stacks/tree/main/templates/template-${framework}`
                  )
                  .focus()
              }
            >
              <span className="emoji">📦</span> Create Project in Browser Sandbox
            </button>
          </div>
          <span className="or">
            <i>OR</i>
          </span>
          <button className="terminal" onClick={() => setShowCode(!showCode)}>
            <span className="emoji">💻</span> Generate Project Locally
          </button>
        </div>
      )}
      {showCode && (
        <div>
          <br />
          <p>
            To scaffold the starter project on your own machine, run the following command in your
            terminal. This will copy the project files to a directory of your choice. Finally, the
            command will show instructions on how to run the project.
            <br />
            <pre>
              <code>npm create stacks --template {framework}</code>
            </pre>
          </p>
        </div>
      )}
    </div>
  );
}
