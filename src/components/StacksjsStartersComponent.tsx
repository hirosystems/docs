import React, { MutableRefObject, useRef, useState } from 'react';
import '../css/stacksjs-starter.css';

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
  featuresConcatenated: string;
  other: string;
};

// Available Form Options ======================================================
const frameworks = [
  { key: 'react', framework: 'React', context: 'create-react-app' },
  { key: 'nextjs', framework: 'React', context: 'Next.js' },
  { key: 'svelte', framework: 'Svelte', context: 'Vite' },
  { key: 'vue', framework: 'Vue', context: 'Vite' },
  // Angular doesn't work with CodeSandbox/Stackblitz
];
const features = {
  connectWallet: 'Connect with Wallet',
  stxTokens: 'Send/Receive STX',
  otherTokens: 'Send/Receive other FTs (Fungible Tokens)',
  nft: 'Interact with NFTs (Non-Fungible Tokens)',
  contractCall: 'Call and Read from Clarity Smart-Contracts',
  multiSig: 'Create/Sign Multi-Sig Transactions',
};

const EVENT_NAME = 'stacksjs_starter_web';

export default function StacksjsStartersComponent() {
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
        features: Object.keys(features),
        featuresConcatenated: Object.keys(features).join(','),
        other: features.other || '',
      };
      window.dataLayer.push(pushData);
    } catch (e) {}
  }

  function openSandbox() {
    window.open(`https://stacks.new/${framework}`, '_blank').focus();
    trackButton('sandbox');
  }

  function openTerminal() {
    setShowCode(!showCode);
    trackButton('terminal');
  }

  return (
    <div className="container start">
      <div className="form">
        <div className="framework-form card" onChange={(e: any) => setFramework(e.target.value)}>
          <span className="card-title">Which framework will your project use?</span>
          {frameworks.map(f => (
            <div key={f.key}>
              <input
                type="radio"
                name="framework"
                id={f.key}
                value={f.key}
                defaultChecked={framework == f.key}
              />
              <label htmlFor={f.key}>
                <strong>{f.framework}</strong> ({f.context})
              </label>
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
              <label htmlFor={k}>{v.split(' (')}</label>
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
