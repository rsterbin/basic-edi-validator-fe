import React, { useState } from 'react';

import JsonDisplay from '../JsonDisplay';

const Single = (props) => {

  const [showContext, setShowContext] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const expandContext = (e) => {
    e.preventDefault();
    setShowContext(true);
  };

  const collapseContext = (e) => {
    e.preventDefault();
    setShowContext(false);
  };

  const zoomIn = (e) => {
    e.preventDefault();
    setZoomLevel(zoomLevel > 0 ? zoomLevel - 1 : 0);
  };

  const zoomOut = (e) => {
    e.preventDefault();
    setZoomLevel(zoomLevel < props.path.length ? zoomLevel + 1 : props.path.length);
  };

  const findByPath = (data, path, stopAt) => {
    if (Array.isArray(path) && path.length > stopAt) {
      const [head, ...tail] = path;
      if (head in data) {
        return findByPath(data[head], tail, stopAt);
      } else {
        return data;
      }
    } else {
      return data;
    }
  };

  return (
    <div class="SingleError" key={props.key}>
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
            <div className="Path"><strong>Path</strong> {props.path.join(' > ')}</div>
            <div className="ZoomControls">
              <strong>Zoom in or out:</strong>
              <button onClick={zoomOut}>+</button>
              <button onClick={zoomIn}>-</button>
            </div>
            <JsonDisplay data={findByPath(props.output, props.path, zoomLevel)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
