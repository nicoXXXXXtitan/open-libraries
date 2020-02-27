import React from 'react';
import 'src/components/HomeUser/PageHome/Map/map.scss';


// leaflet
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [48.638099, -1.995478];
const position2 = [48.638325, -2.003374];
const position3 = [48.638180, -1.996851];

const Map = () => {
  return (
    <LeafletMap center={position} zoom={14} id="map-homeUserTest">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
      <Marker position={position2}>
        <Popup>henri.<br />Easily customizable.</Popup>
      </Marker>
      <Marker position={position3}>
        <Popup>mathilde.<br />Easily customizable.</Popup>
      </Marker>
    </LeafletMap>

  );
};

export default Map;
