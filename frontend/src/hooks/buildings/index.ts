import React from "react"
import buildings from './boundaries.json'

const useBuilding = (e: Diner | null) => {
  return React.useMemo(() => {
    if(!e) {
      return null
    }
    const building = buildings.features.find(f => parseInt(f.properties.PropCID ?? '0') === parseInt(e.Building))?.properties
    return building ?? null
  }, [e])
}

export default useBuilding