import React from 'react';

import './JsonDisplay.css';

const JsonDisplay = (props) => {
  return (
    <pre className={'JsonDisplay ' + props.className}>
      {props.data && JSON.stringify(props.data, null, 2)}
    </pre>
  );
};

export default JsonDisplay;
