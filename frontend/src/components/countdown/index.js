import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './countdown.css';

export default ({ total, current, width = '40%', text }) => {
  if (text) {
    return <div className="game__countdown-with-text">
      <div style={{ width }}>
        <CircularProgressbar text={`${current}s`} value={Math.min((current / total) * 100)} styles={buildStyles({ width })} />
      </div>
      <div className="game__countdown__text">
        {text}
      </div>
    </div>;
  }

  return <div className="game__countdown" style={{ width }}>
    <CircularProgressbar text={`${current}s`} value={Math.min((current / total) * 100)} styles={buildStyles({ width })} />
  </div>;
};
