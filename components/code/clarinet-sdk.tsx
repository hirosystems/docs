'use client';

import { initSimnet } from '@hirosystems/clarinet-sdk-browser';
import { Cl } from '@stacks/transactions';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Code } from '../docskit/code';

export const ClarinetSDK: React.FC = () => {
  const [evaluatedResponse, setEvaluatedResponse] = React.useState<string>();

  // Clarity code to be executed
  const clarityCode = `(define-map Users uint {address: principal})
(map-insert Users u1 { address: tx-sender })
(map-get? Users u1)`;

  async function runCode() {
    const simnet = await initSimnet();
    await simnet.initEmptySession(false);
    simnet.setEpoch('2.5');

    const result = simnet.runSnippet(clarityCode) as any;
    const deserializedResult = Cl.deserialize(result);
    console.log(deserializedResult);
    setEvaluatedResponse(Cl.prettyPrint(deserializedResult, 2));
  }

  return (
    <>
      <Button
        className={cn(
          'px-5 py-2 text-sm leading-5 rounded-full font-semibold z-10',
          'bg-neutral-900 text-white',
          'dark:bg-white dark:text-neutral-900',
          'hover:bg-neutral-900/90 dark:hover:bg-gray-100/90',
        )}
        onClick={runCode}
      >
        Run
      </Button>

      <Code
        codeblocks={[
          {
            lang: 'clarity',
            value: clarityCode,
            meta: '',
          },
        ]}
      />

      {evaluatedResponse && (
        <Code
          codeblocks={[
            {
              lang: 'clarity',
              value: evaluatedResponse,
              meta: '',
            },
          ]}
        />
      )}
    </>
  );
};
