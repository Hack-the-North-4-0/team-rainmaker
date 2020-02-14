import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

import './bank-summary.css';

export default ({ ledger }) => {
  return <div className="bank-summary">
    <div className="bank-summary__icon">
      <FontAwesomeIcon icon={faPiggyBank} />
    </div>
    <div className="bank-summary__amount">
      Your Balance:<br/>
      £{ledger.reduce((total, { amount = 0 }) => total + amount, 0)}
    </div>
  </div>;
};
