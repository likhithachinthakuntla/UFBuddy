import { Box, CardContent, Typography, CardMedia, ListItemButton, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { Link, Rating, Tags } from '../../../../components'
import BuildingImage from '../../../../components/BuildingImage';
import useEstablishment from '../../../../hooks/useEstablishment';

type LocationsCardProps = {
  data: Diner,
  selected?: boolean,
  onClick: () => void,
  filters: EstFilters
}

const StyledListItem = styled(ListItemButton)(({ theme }) => {

  return {
    display: 'flex',
    borderWidth: 1,
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
    padding: 0,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    },
    '&:hover, &:focus': {
      //boxShadow: theme.shadows[3],
      //backgroundColor: 'initial' //modify hover bg color?
    }
  }
})

const StyledLink = styled(Link)(({ theme }) => {
  return {
    fontWeight: 'normal',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover, &:focus': {
      textDecoration: 'underline'
    }
  }
})


type InteractiveElementType = {
  name: Diner['Name'],
  id: number | string
  tags: string[],
  rating: number,
  numRatings: number,
  loading: boolean,
  onClick: LocationsCardProps['onClick']
}

function InteractiveElement({name, id, tags, rating, numRatings, loading, onClick}: InteractiveElementType) {
  return (<Box sx={{position: 'absolute', left: 191, top: 24, backgroundColor: 'transparent', cursor: 'pointer'}} onClick={onClick}>
      <StyledLink to={`/est/${id}`} variant="h4">
        {name}
      </StyledLink>
      {loading ? <Box sx={{my: 1, maxWidth: 600}}>
        <Skeleton width={110} sx={{mb: 0.5, maxWidth: '100%'}}/>
        <Skeleton width={200} sx={{maxWidth: '100%'}} />
      </Box> : <>
        <Box sx={{my: 1.5}}>
          <Rating rating={rating} numRatings={numRatings} />
        </Box>
        <Box sx={{my: 1}}>
          <Tags variant="chips" tags={tags} />
        </Box>
      </>}
      
      </Box>)
}


export default function LocationsCard({data, selected, onClick, filters}: LocationsCardProps) {

  const { Name: name, Est_Id: id } = data

  const { reviewInfo, tags, isOpen, building, hoursOfOperation } = useEstablishment(id, data)
  const { rating, numRatings, reviews, status } = reviewInfo

  const firstReview = reviews?.[0]

  if(status === 'success') {
    if(rating < filters.minStars || (filters.openNow ? !isOpen : false)) {
      return null
    }
  }

  return (
    <Box sx={{position: 'relative'}}>
    <StyledListItem selected={selected} alignItems="flex-start" focusRipple={false} onClick={onClick}>
      <BuildingImage buildingId={building?.PropCID} style={{ width: 150, height: 150, padding: 16 }}  />
      <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', px: 1, pt: 2 }}>
          <Box sx={{minHeight: 110}}/> 
          <Typography sx={{fontWeight: 'bold', color: 'darkgreen', fontSize: 14}} gutterBottom>
            {isOpen ? <>Open {hoursOfOperation && <Typography variant="caption" style={{fontSize: 14, color: 'initial'}}>until {format(hoursOfOperation[1], 'p')}</Typography>}</> : ""}
          </Typography>
          {firstReview ? <Typography variant="caption" color="text.secondary" component="div">
            {firstReview?.Review}
            <span style={{fontWeight: 'bold', marginLeft: '1.5ch', textTransform: 'capitalize'}}>{'–'}{firstReview?.Review_user}</span>
          </Typography> : <Typography variant="caption" color="text.secondary" component="div">
            No Reviews yet.
          </Typography>}
        </CardContent>
      </Box>
    </StyledListItem>
    {<InteractiveElement id={id} name={name} tags={tags} numRatings={numRatings} rating={rating} loading={status !== 'success'} onClick={onClick}/>}
    </Box>
  );
};