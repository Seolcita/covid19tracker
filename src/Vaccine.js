/** @format */

import React, { useState, useEffect } from 'react';
import MapVaccine from './components/MapVaccine';

function Vaccine() {
  const [countryInfo, setCountryInfo] = [];
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const mapCenter = { lat: 20, lng: 5 };
  const mapZoom = 3;

  //For Today's worldwide data
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(
        'https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1'
      )
        .then((resp) => resp.json())
        .then((data) => {
          const countriesData = data.map((ctr) => ({
            name: ctr.country,
            timeline: Object.keys(ctr.timeline)[0],
            num: ctr.timeline[Object.keys(ctr.timeline)[0]],
          }));
          setCountries(countriesData);
        });
    };
    getCountriesData();
  }, []);

  // console.log('DATA VACCINE', countries);

  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <h1>VACCINE</h1>
      <div className="app__vaccine--header">
        <select
          className="app__form"
          value={country}
          onChange={onCountryChange}
        >
          <option value="worldwide">Worldwide</option>
          {countries.map((ctr) => (
            <option value={ctr.name}> {ctr.name}</option>
          ))}
          {console.log('SELECTED', country)}
        </select>
      </div>
      <div className="app__vaccine--table">
        {console.log('countries!!!!', countries)}

        {countries.map((ctr) => (
          <tr>
            <td>{ctr.name}</td>
            <td>{ctr.num}</td>
          </tr>
        ))}
      </div>
      <div className="app__vaccine--Map">
        <MapVaccine
          countries={countries}
          caseType="vaccine"
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  );
}

export default Vaccine;
