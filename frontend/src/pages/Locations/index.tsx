import * as React from 'react';
import Map from './Map'
import LocationsList from './LocationsList'
import ListHeader from './ListHeader'
import Filters from './Filters';
import { styled } from '@mui/material/styles';
import { InsetDrawer } from '../../components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const FILTER_DRAWER_WIDTH = 225
const MAP_DRAWER_WIDTH = '40%'

const LocationListContainer = styled('div')(({ theme }) => ({
  marginLeft: FILTER_DRAWER_WIDTH,
  marginRight: MAP_DRAWER_WIDTH,
  padding: theme.spacing(2),
}));




export default function Locations() {
  

  const [filters, setFilters] = React.useState<EstFilters>({
    minStars: 0,
    openNow: false
  })

  const [locations, setLocations] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const [map, setMap] = React.useState<null | L.Map>(null)
  
  let [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const searchType = searchParams.get('type')

  // currently filtering on the front end
  React.useEffect(() => {
    setLoading(true)
    axios.get('/api/establishments').then(res => {
      if(query) {
        setLocations(res.data.filter((d: Diner) => {
          return d?.Name?.replace(/[^a-zA-Z0-9]/g, '')?.toLowerCase().includes(query.toLowerCase())
        }))
      } else {
        setLocations(res.data)
      }

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }, [query])

  const onLocationClick = React.useCallback((d: Diner) => {
    if(!map) {
      return
    }
    map.setView([d.X_coordinate, d.Y_coordinate], 18, {
      animate: true,
      duration: 1.5
    })
    map.eachLayer((l: L.Layer) => {
      const latlng = l.getPopup()?.getLatLng()
      if(latlng?.lat === d.X_coordinate && latlng?.lng === d.Y_coordinate) {
        setTimeout(() => {
          l.openPopup()
        }, 1600)
      }
    })
  }, [map])

  return (
    <div>
      <InsetDrawer anchor="left" width={FILTER_DRAWER_WIDTH}>
        <Filters {...{filters, setFilters}}/>
      </InsetDrawer>
      <LocationListContainer>
        <ListHeader />
        <LocationsList locations={locations} loading={loading} onLocationClick={onLocationClick} {...{filters, setFilters}} />
      </LocationListContainer>
      <InsetDrawer anchor="right" width={MAP_DRAWER_WIDTH}>
        <Map locations={locations} setMap={setMap} />  
      </InsetDrawer>
    </div>
  );
};