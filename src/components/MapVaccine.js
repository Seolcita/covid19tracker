/** @format */

import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showVaccineDataOnMap } from '../util';

//CSS
import './Map.scss';

function MapVaccine({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showVaccineDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default MapVaccine;
