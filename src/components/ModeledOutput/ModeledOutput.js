import React from 'react';

import Node from './Node';

import './ModeledOutput.css';

const ModeledOutput = (props) => {

  var output = null;
  if (props.data &&
    typeof props.data === 'object' &&
    'data' in props.data &&
    typeof props.data.data === 'object' &&
    props.data.data !== null &&
    'output' in props.data.data &&
    typeof props.data.data.output === 'object' &&
    props.data.data.output !== null) {
    output = props.data.data.output;
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
