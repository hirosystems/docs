import React from 'react';
import Playground from '@theme/Playground';
import ReactLiveScope from '@theme/ReactLiveScope';
import CodeBlock from '@theme-init/CodeBlock';
const withLiveEditor = Component => {
  function WrappedComponent(props) {
    if (props.live) {
      // @ts-expect-error: we have deliberately widened the type of language prop
      return <Playground scope={ReactLiveScope} {...props} />;
    }
    return <Component {...props} />;
  }
  return WrappedComponent;
};
export default withLiveEditor(CodeBlock);
