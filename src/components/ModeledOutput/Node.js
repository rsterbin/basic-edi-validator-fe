import React, { useState } from 'react';

const ModeledOutputNode = (props) => {
  const [open, setOpen] = useState(props.expanded || false);
  const doOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const doClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  let detailType = 'scalar';
  if (typeof props.elementValue === 'object' && props.elementValue !== null) {
    if (Array.isArray(props.elementValue)) {
      detailType = 'array';
    } else {
      detailType = 'object';
    }
  }

  return (
    <div className="Node" key={props.keyName}>
      {detailType === 'scalar' ? (
        <div className="NodeSingle">
          <span className="NodeName">{props.elementName}</span>
          <span className="NodeScalarValue">{props.elementValue}</span>
        </div>
      ) : (
        <div className="NodeToggle">
          <button onClick={open ? doClose : doOpen}>{open ? '-' : '+'}</button>
          <span className="NodeName">{props.elementName}</span>
        </div>
      )}
      {open && (
        <div className="NodeDetail">
          {detailType === 'object' && Object.keys(props.elementValue).map((childKey, idx) => (
            <ModeledOutputNode
              keyName={props.keyName + '-' + idx}
              elementName={childKey}
              elementValue={props.elementValue[childKey]}
              />
          ))}
          {detailType === 'array' && props.elementValue.map((childNode, idx) => (
            <ModeledOutputNode
              keyName={props.keyName + '-' + idx}
              elementName={props.elementName + '[' + idx + ']'}
              elementValue={childNode}
              />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModeledOutputNode;
