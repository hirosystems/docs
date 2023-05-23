import React from 'react';
import * as StacksNetwork from '@stacks/network';
const ButtonExample = props => (
  <button
    {...props}
    style={{
      backgroundColor: 'white',
      color: 'black',
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
);

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample,
  ...StacksNetwork,
};

export default ReactLiveScope;
