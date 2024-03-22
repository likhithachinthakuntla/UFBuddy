import React from "react"
import hours from './spring2022.json'
import useBuilding from '../buildings'

const useDiningHours = (e: Diner | null) => {
  const building = useBuilding(e)
  return React.useMemo(() => {
    if(!building || !e) {
      return null
    }
    const hour = hours.data.find(h => {
      return h.name.includes(e.Name) && (building?.PropName || '').split(' ').some((word: string) => h.fullName.includes(word))
    })
    if(!hour || !Array.isArray(hour.hours)) {
      return null
    }
    return hour?.hours ?? null
  }, [building, e])

}

export default useDiningHours