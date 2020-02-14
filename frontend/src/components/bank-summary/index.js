import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

import './bank-summary.css';

export default ({ ledger, showAll = false }) => {
  const ledgerElements = showAll ? ledger : ledger.slice(-5);
  return <>
    <div className="bank-summary">
      <div className="bank-summary__icon">
        <FontAwesomeIcon icon={faPiggyBank} />
      </div>
      <div className="bank-summary__amount">
        Your Balance:<br/>
        £{ledger.reduce((total, { amount = 0 }) => total + amount, 0)}
      </div>
    </div>
    <ul className="bank-summary__transactions">
      {ledgerElements.reverse().map(({ amount, description }, i) => <li className="bank-summary__transactions__item" key={`transaction-${i}`}>
        <div className="bank-summary__transactions__item__description">
          {description}
        </div>
        <div className="bank-summary__transactions__item__amount">
          {amount > 0 ? '+' : amount < 0 ? '-' : ''}£{Math.abs(amount)}
        </div>
      </li>)}
    </ul>
  </>;
};
