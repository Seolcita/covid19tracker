/** @format */

import React from 'react';

//CSS
import './Table.scss';

function Table({ countries }) {
  return (
    <div className="table">
      <h2>Live Cases by Country</h2>
      {countries.map((ctr, id) => (
        <tr key={id}>
          <td>{ctr.country}</td>
          <td>
            <strong>{ctr.cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
