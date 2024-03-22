import * as React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './index.css'

type MapProps = {
  coordinates: LatLngTuple,
  height: number
}

var poiIcon = L.divIcon({
  className: 'loc',
  html: '📍',
  iconSize: [36, 36],
  popupAnchor: [0, -18],
});


export default function Map({coordinates, height}: MapProps) {

  return (
      <MapContainer center={coordinates} zoom={15} style={{height}} doubleClickZoom={false} zoomControl={false} minZoom={15} maxZoom={17}>
      <TileLayer
        attribution=''
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={poiIcon} />
  </MapContainer>
  );
};