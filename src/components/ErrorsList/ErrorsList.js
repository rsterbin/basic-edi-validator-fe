import React from 'react';

import Single from './Single';

import './ErrorsList.css';

const ErrorsList = (props) => {

  var errorsList = [];
  var output = {};
  if (props.data && typeof props.data == 'object' &&
    'data' in props.data &&
    typeof props.data.data == 'object') {
    if ('errors' in props.data.data &&
      typeof props.data.data.errors == 'object' &&
      Array.isArray(props.data.data.errors)) {
      errorsList = props.data.data.errors;
    }
    if ('output' in props.data.data &&
      typeof props.data.data.output == 'object' &&
      props.data.data.output !== null) {
      output = props.data.data.output;
    }
  }

  if (errorsList.length > 0) {
    return (
      <div className="ErrorsList">
        {errorsList.map((err, idx) => (
          <div className={'ListedError ' + err.severity} key={idx}>
            <Single {...err} output={output} />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorsList;
