/** @format */

import React from 'react';
import numeral from 'numeral';

//CSS
import './Table.scss';

function Table({ countries }) {
  return (
    <div className="table">
      <h2>Live Cases by Country</h2>
      {countries.map((ctr, id) => (
        <tr key={id}>
          <td>{ctr.country}</td>
          <td>{numeral(ctr.cases).format('0,0')}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
