import React from "react"
import axios from 'axios';
import useDiningHours from "./dininghours";
import useBuilding from "./buildings";
import useReviews from './useReviews'
import { addDays, getDay, isAfter, isBefore, isValid, parse } from 'date-fns';

export default function useEstablishment(id: string | null | undefined, inputData?: Diner) {
  
  const [data, setData] = React.useState<null | Diner>(inputData || null)
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'error' | 'success'>(!!inputData ? 'success' : 'idle')

  const tags = ['Coffee & Tea', 'Fast Food', 'Convenience']

  React.useEffect(() => {
    if(id && !inputData) {
      setStatus('loading')
      axios.get(`/api/establishments/${id}`).then(res => {
        setData(res.data)
        setStatus('success')
      }).catch(e => {
        setStatus('error')
      })
    }
  }, [id, inputData])

  const reviewInfo = useReviews(data?.Est_Id)
  const hours = useDiningHours(data)
  const building = useBuilding(data)

  const day = (getDay(new Date()) + 6) % 7
  
  // for today
  const hoursOfOperation = React.useMemo<null | Date[]>(() => {
    if(!hours) {
      return null
    } else {
      const h = hours[day]
      if(h.hoursOfOperation === 'CLOSED') {
        return null
      } else {
        const [start, end] = h.hoursOfOperation.split(' ‑ ')
        let open = parse(start, 'h:mm aa', new Date())
        let close = parse(end, 'h:mm aa', new Date())
        if(!isValid(open) || !isValid(close)) {
          return null
        }
        if(isBefore(close, open)) {
          close = addDays(close, 1)
        }
        return [open, close]
      }

    }

  }, [hours, day])

  const isOpen = React.useMemo(() => {
    if(!hoursOfOperation) {
      return null
    } else {
      const now = new Date()
      return isAfter(now, hoursOfOperation[0]) && isBefore(now, hoursOfOperation[1])
    }
  }, [hoursOfOperation])

  return { reviewInfo, hours, building, isOpen, hoursOfOperation, day, status, data, tags  }

}