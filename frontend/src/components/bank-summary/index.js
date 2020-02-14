import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

import './bank-summary.css';

export default ({ ledger, filterToRound, showAll = false }) => {
  const ledgerElements = showAll
    ? ledger
    : filterToRound
      ? ledger.filter(({ round }) => round === filterToRound)
      : ledger.slice(-5);
  const total = ledger.reduce((total, { amount = 0 }) => total + amount, 0);

  return <>
    <div className="bank-summary">
      <div className="bank-summary__icon">
        <FontAwesomeIcon icon={faPiggyBank} />
      </div>
      <div className="bank-summary__amount">
        Your Balance:<br/>
        <span style={{ color: total >= 0 ? 'black' : 'red' }}>
          £{Math.abs(total)} {total >= 0 ? '' : <b>In Debt</b>}
        </span>
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
