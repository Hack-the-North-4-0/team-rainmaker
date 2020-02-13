import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

export default ({ total, current }) => {
  return <div className="game__countdown">
    <CircularProgressbar text={`${current}s`} value={Math.min((current / total) * 100)} styles={buildStyles({ width: '60%' })} />
  </div>;
};
