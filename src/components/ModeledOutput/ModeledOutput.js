import React from 'react';

import Node from './Node';

import './ModeledOutput.css';

const ModeledOutput = (props) => {

  var output = null;
  if (props.data && typeof props.data === 'object' && 'data' in props.data && typeof props.data.data === 'object' && props.data.data !== null) {
    if ('output' in props.data.data && typeof props.data.data.output === 'object' && props.data.data.output !== null) {
      output = props.data.data.output;
    } else if ('errors' in props.data.data && typeof props.data.data.errors === 'object' && props.data.data.errors !== null) {
      output = props.data.data.errors;
    }
  }

  return (
  <div className={'ModeledOutput ' + props.className}>
    <Node
      keyName="document"
      elementName="document"
      elementValue={output}
      expanded
      />
  </div>
  );
};

export default ModeledOutput;
