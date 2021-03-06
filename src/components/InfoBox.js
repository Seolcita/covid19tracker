/** @format */

import React from 'react';
import './InfoBox.scss';

//CSS
import './InfoBox.scss';

function InfoBox(props) {
  const { title, cases, total, active } = props;

  return (
    <div
      className={`infoBox ${active && 'infoBox--selected'}`}
      onClick={props.onClick}
    >
      <div className="infoBox__card">
        <h2 className="infoBox__card--title">{title}</h2>
        <h2 className="infoBox__card--case">{cases} </h2>
        <h2 className="infoBox__card--total">{total} Total</h2>
      </div>
    </div>
  );
}

export default InfoBox;
