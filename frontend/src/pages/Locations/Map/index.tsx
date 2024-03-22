import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L, { LatLngTuple, LocationEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './index.css'


type MapProps = {
  locations: Diner[],
  setMap: (map: L.Map) => void
}

const position: LatLngTuple = [29.6382, -82.3566]

var currentLocationIcon = L.divIcon({
  className: 'loc',
  html: '⭐',
  iconSize: [36, 36],
});

var poiIcon = L.divIcon({
  className: 'loc',
  html: '📍',
  iconSize: [36, 36],
  popupAnchor: [0, -18],
});





export default function Map({locations, setMap}: MapProps) {

  const [userLocation, setUserLocation] = React.useState<LatLngTuple | null>(null)

  return (
      <MapContainer center={position} zoom={14} style={{height: '100%'}} doubleClickZoom={false} whenCreated={(map) => {
        map.on('locationfound', (e: LocationEvent) => {
          console.log(e)
          setUserLocation([e.latlng.lat, e.latlng.lng])
        })
        map.locate({
          watch: true,
          enableHighAccuracy: true
        })
        setMap(map)
      }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation && <Marker position={userLocation} icon={currentLocationIcon}/>}
      {
        locations.map(({Est_Id: id, X_coordinate: x, Y_coordinate: y, Name: name}) => {
          return (<Marker key={id} position={[x,y]} icon={poiIcon}>
            <Popup closeButton={false}>
              {name}
            </Popup>
          </Marker>)
        })
      }
  </MapContainer>
  );
};