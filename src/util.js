/** @format */

import React, { useState } from 'react';
import numeral from 'numeral'; // format numbers certain way
import { Circle, Popup } from 'react-leaflet';

export const sortData = (data) => {
  const sortedData = [...data];

  // Descending order
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  // Ascending order
  //return sortedData.sort((a,b) => a.cases > b.cases ? 1 : -1)
};

const casesTypeColors = {
  cases: {
    hex: '#CC1034', // color of circle
    multiplier: 200, //size of circle
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 800,
  },

  vaccine: {
    hex: '#fb4443',
    multiplier: 800,
  },
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';

// Draw circles on the map with interactive tooltip - For Covid19 Map
export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info">
          <div
            className="info__flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info__name">{country.country}</div>
          <div className="info__confirmed">
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className="info__recovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="info__deaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

// Draw circles on the map with interactive tooltip - For vaccine Map
export const showVaccineDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[20, 5]}
      color="yellow"
      fillColor="green"
      fillOpacity={0.4}
      radius={Math.sqrt(country.num)}
    >
      <Popup>
        <div className="info">
          <div className="info__name">{country.name}</div>
          <div className="info__confirmed">
            Vaccine: {numeral(country.num).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
