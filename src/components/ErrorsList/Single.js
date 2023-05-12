import React, { useState } from 'react';

import JsonDisplay from '../JsonDisplay';

const Single = (props) => {

  const [showContext, setShowContext] = useState(false);

  const expandContext = (e) => {
    e.preventDefault();
    setShowContext(true);
  };

  const collapseContext = (e) => {
    e.preventDefault();
    setShowContext(false);
  };

  return (
    <div className="SingleError" key={props.key}>
      <div className="ContextControl">
        {showContext ? (
          <button onClick={collapseContext}>v</button>
        ) : (
          <button onClick={expandContext}>&gt;</button>
        )}
      </div>
      <div className="ErrorInfo">
        <div className="Code" key="code"><strong>Code</strong> {props.code}</div>
        <div className="Message" key="message"><strong>Message</strong> {props.message}</div>
        {showContext && (
          <div className="Context" key="context">
            <JsonDisplay data={props} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
