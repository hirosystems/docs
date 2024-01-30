import React, { useRef, useState } from 'react';
import CodeBlock from '@theme-original/CodeBlock';

const IMPORT_LINES_REGEX = /^import\s*(?:(?:(?:[\w*\s{},]*)\s*from)?\s*['"].+['"])?.*?(?:;|$)/gm;

export default function CodeBlockWrapper(props) {
  const ref = useRef(null);

  const run = () => {
    const oldConsoleLog = console.log;
    const oldConsoleError = console.error;

    console.log = (...args) => {
      ref.current.innerHTML += args.map(argToHtml()).join('');
    };
    console.error = (...args) => {
      ref.current.innerHTML += args.map(argToHtml('bg-red-950')).join('');
    };

    const uuid = crypto?.randomUUID() ?? 'uuid';
    document.addEventListener(`scriptExecuted-${uuid}`, () => {
      console.log = oldConsoleLog;
      console.error = oldConsoleError;
      document.head.removeChild(script);
    });

    const importStatements = props.children.match(IMPORT_LINES_REGEX)?.join('\n') || '';
    const code = props.children.replace(IMPORT_LINES_REGEX, '');

    const script = document.createElement('script');
    script.setAttribute('type', 'module');
    script.innerHTML = `
      ${importStatements};
      try {
        ${code};
      } catch(e) {
        console.error(e);
      }
      document.dispatchEvent(new CustomEvent('scriptExecuted-${uuid}'));
    `;
    document.head.appendChild(script);
  };

  const isRunnable = props.metastring?.includes('run') ?? false;
  if (!isRunnable) return <CodeBlock {...props} />;

  return (
    <>
      <div className="relative">
        <CodeBlock {...props} />
        <button onClick={run} className="absolute right-2 bottom-2">
          Run ▶︎
        </button>
      </div>
      <div ref={ref} />
    </>
  );
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function argToHtml(className = '') {
  return arg => {
    let value;
    if (arg instanceof Error) {
      value = escapeHtml(
        JSON.stringify({ ...arg, message: arg.message, stack: arg.stack }, null, 2)
      );
    } else if (typeof arg === 'object') {
      try {
        value = escapeHtml(
          JSON.stringify(
            arg,
            (key, value) => {
              return typeof value === 'bigint' ? value.toString() : value;
            },
            2
          )
        );
      } catch {
        value = escapeHtml(arg);
      }
    } else if (typeof arg === 'string') {
      value = escapeHtml(arg);
    } else {
      value = escapeHtml('' + arg);
    }
    const currentDate = new Date();
    const formattedTime = currentDate.toISOString().split('T')[1].replace('Z', '').slice(0, -2);
    const timeTag = "<span style='color: rgb(151 149 149)'>" + formattedTime + ' </span>';
    return `<pre style="white-space:pre-wrap;" class="${className}">${timeTag}${value}</pre>`;
  };
}
