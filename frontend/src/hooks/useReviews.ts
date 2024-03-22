import React from "react"
import axios from 'axios';


export default function useReviews(id: string | null | undefined) {
  const [reviews, setReviews] = React.useState<null | Review[]>(null)
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'error' | 'success'>('idle')


  React.useEffect(() => {
    if(id) {
      setStatus('loading')
      axios.get(`/api/reviews/est/${id}`).then(res => {
        setReviews(res.data)
        setStatus('success')
      }).catch(e => {
        setStatus('error')
      })
    }
  }, [id])

  const rating = React.useMemo(() => {
    return (reviews || []).reduce((acc, val) => {
      acc += val.Rating
      return acc
    }, 0)/(reviews?.length || 1)
  }, [reviews])

  const numRatings = reviews?.length || 0

  const appendReview = (newRev: Review) => setReviews(r => ([newRev, ...(r || [])]))

  return { rating, numRatings, reviews, status, appendReview }




}