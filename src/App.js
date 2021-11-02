/** @format */

import React, { useState, useEffect } from 'react';

//Components & util
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import { sortData } from './util';

//CSS
import './App.scss';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // For 'worldwide' data
  // because dropdown default value is 'worldwide'
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((resp) => resp.json())
      .then((data) => setCountryInfo(data));
  }, []);

  // For dropdown list & table data
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((resp) => resp.json())
        .then((data) => {
          const countries = data.map((ctr) => ({
            name: ctr.country, //United States, United Kingdom
            value: ctr.countryInfo.iso2, //US, UK,
          }));

          const sortedData = sortData(data);
          setCountries(countries); // For dropdown list
          setTableData(sortedData); // For table data
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    //console.log('COUNTRY CODE', countryCode);

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log('country Info >>>>>>', countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          <select
            className="app__form"
            value={country}
            onChange={onCountryChange}
          >
            <option value="worldwide">Worldwide</option>
            {countries.map((ctr) => (
              <option value={ctr.value}>{ctr.name}</option>
            ))}
          </select>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <div className="app__map">
          <Map />
        </div>
      </div>
      <div className="app__right">
        <div className="app__data">
          <div className="app__data--table">
            <Table countries={tableData} />
          </div>
          <div className="app__data--graph">
            <LineGraph casesType="cases" title="Worldwide Cases" />
            {/* <LineGraph casesType='recovered' title='' /> */}
            <LineGraph casesType="deaths" title="Worldwide Deaths" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
