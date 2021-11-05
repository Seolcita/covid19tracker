/** @format */

import React, { useState, useEffect } from 'react';

//Components & util
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import Vaccine from './Vaccine';
import { sortData, prettyPrintStat } from './util';
import numeral from 'numeral';

//CSS
import 'leaflet/dist/leaflet.css';
import './App.scss';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 5 });
  const [mapZoom, setMapZoom] = useState(3);

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
          setMapCountries(data); // For map - all data from API
        });
    };

    getCountriesData();
  }, []);
  console.log(mapCountries);

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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  // console.log('country Info >>>>>>', countryInfo);
  return (
    <div className="app">
      <div className="app__covid">
        <div className="app__left">
          <div className="app__header">
            <h1 className="app__title">COVID-19 TRACKER</h1>

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
              title="Cases"
              onClick={(e) => setCasesType('cases')}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format('0.0a')}
              active={casesType === 'cases'}
            />
            <InfoBox
              title="Recovered"
              onClick={(e) => setCasesType('recovered')}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format('0.0a')}
              active={casesType === 'recovered'}
            />
            <InfoBox
              title="Deaths"
              onClick={(e) => setCasesType('deaths')}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format('0.0a')}
              active={casesType === 'deaths'}
            />
          </div>

          <div className="app__map">
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
        </div>
        <div className="app__right">
          <div className="app__data">
            <div className="app__data--table">
              <Table countries={tableData} />
            </div>
            <div className="app__data--graph">
              <LineGraph casesType={casesType} title="Worldwide" />
            </div>
          </div>
        </div>
      </div>
      <div className="app__vaccine">
        <Vaccine />
      </div>
    </div>
  );
};

export default App;
