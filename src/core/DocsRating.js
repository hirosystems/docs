/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React, { useState } from 'react';

const DocsRating = ({ label }) => {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const [haveVoted, setHaveVoted] = useState(false);
  const giveFeedback = value => {
    try {
      window.dataLayer.push({
        event: 'docs_feedback',
        vote: value,
      });
    } catch (e) {}
    setHaveVoted(true);
  };

  return (
    <div className="docsRating">
      {haveVoted ? (
        'Thanks for letting us know!'
      ) : (
        <>
          Is this page useful?
          <svg
            role="button"
            className="i_thumbsup"
            alt="Like"
            onClick={() => giveFeedback(1)}
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: 20, width: 20 }}
          >
            <path
              fill-rule="nonzero"
              d="M12.6 8H18a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 6.515a1 1 0 0 1-.925.619H1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L9.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L12.6 8ZM6 10.588V18h9.16L18 12.104V10h-5.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-3.71 6.672c-.25.354-.57.644-.933.858ZM4 11H2v7h2v-7Z"
            />
          </svg>
          <svg
            role="button"
            className="i_thumbsdown"
            alt="Dislike"
            onClick={() => giveFeedback(0)}
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: 20, width: 20 }}
          >
            <path
              fill-rule="nonzero"
              d="M12.6 8H18a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 6.515a1 1 0 0 1-.925.619H1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L9.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L12.6 8ZM6 10.588V18h9.16L18 12.104V10h-5.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-3.71 6.672c-.25.354-.57.644-.933.858ZM4 11H2v7h2v-7Z"
            />
          </svg>
        </>
      )}
    </div>
  );
};

export default DocsRating;
