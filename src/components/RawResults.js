import React from 'react';

import JsonDisplay from './JsonDisplay';

const RawResults = (props) => {
  return props.data ? (
    <div className="RawResults">
      <JsonDisplay
        data={props.data}
        className={props.className} />
    </div>
  ) : null;
};

export default RawResults;
