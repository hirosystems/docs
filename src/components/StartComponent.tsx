import React, { MutableRefObject, useRef, useState } from 'react';
import '../css/start.css';

// Types =======================================================================
declare global {
  interface Window {
    dataLayer: any; // google tag manager
  }
  interface FormData {
    entries: any;
  }
}

type AnalyticsEvent = {
  event: string;
  button: string;
  framework: string;
  features: string[];
  other?: string;
};

// Available Form Options ======================================================
const frameworks = { react: 'React', svelte: 'Svelte', vue: 'Vue', angular: 'Angular' };
const features = {
  connectWallet: 'Connect with Wallet',
  stxTokens: 'Send/Receive STX',
  otherTokens: 'Send/Receive other FTs (Fungible Tokens)',
  nft: 'Interact with NFTs (Non-Fungible Tokens)',
  contractCall: 'Call and Read from Clarity Smart-Contracts',
  multiSig: 'Create/Sign Multi-Sig Transactions',
};

const EVENT_NAME: string = 'stacksjs_starter_web';

export default function StartComponent() {
  const [framework, setFramework] = useState('');
  const [showCode, setShowCode] = useState(false);
  const formRef: MutableRefObject<any> = useRef();

  function trackButton(button: string) {
    try {
      const features = Object.fromEntries(new FormData(formRef.current).entries());
      const pushData: AnalyticsEvent = {
        event: EVENT_NAME,
        button,
        framework,
        features: Object.keys(features).filter(k => k != 'other'), // keys of selected checkboxes
      };
      if (features.other) pushData.other = features.other;
      window.dataLayer.push(pushData);
    } catch (e) {}
  }

  function openSandbox() {
    trackButton('sandbox');
    window
      .open(
        `https://githubbox.com/hirosystems/stacks.js-starters/tree/main/templates/template-${framework}`,
        '_blank'
      )
      .focus();
  }

  function openTerminal() {
    trackButton('terminal');
    setShowCode(!showCode);
  }

  return (
    <div className="container start">
      <div className="form">
        <div className="framework-form card" onChange={(e: any) => setFramework(e.target.value)}>
          <span className="card-title">Which framework will your project use?</span>
          {Object.entries(frameworks).map(([k, v]) => (
            <div key={k}>
              <input
                type="radio"
                name="framework"
                id={k}
                value={k}
                defaultChecked={framework == k}
              />
              <label htmlFor={k}>{v}</label>
            </div>
          ))}
        </div>
        <form ref={formRef} className={`features-form card ${!framework && 'disabled'}`}>
          <span className="card-title">
            Which Stacks features do you need for your project?{' '}
            <span className="card-subtitle">Help us improve</span>
          </span>

          {Object.entries(features).map(([k, v]) => (
            <div key={k}>
              <input type="checkbox" name={k} id={k} value={k} disabled={!framework} />
              <label htmlFor={k}>{v}</label>
            </div>
          ))}
          <div>
            <input type="checkbox" disabled={!framework} />
            <input
              type="text"
              id="other"
              name="other"
              placeholder={framework ? 'What are we missing?' : ''}
              disabled={!framework}
            />
          </div>
        </form>
      </div>
      {framework && (
        <div className="align-right">
          <div>
            <button className="sandbox" onClick={openSandbox}>
              <span className="emoji">📦</span> Create Project in Browser Sandbox
            </button>
          </div>
          <span className="or">
            <i>OR</i>
          </span>
          <button className="terminal" onClick={openTerminal}>
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
          </p>
          <pre>
            <code>npm create stacks --template {framework}</code>
          </pre>
          <blockquote>
            Requires <a href="https://nodejs.org/en/download/">Node.js</a> (with <code>npm</code>{' '}
            &gt;= v7.x.x)
          </blockquote>
        </div>
      )}
    </div>
  );
}
