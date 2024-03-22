import { Container, Box, ContainerProps, Typography, Grid, Button as MuiButton, Divider, Paper, List, ListItem, Link, ListItemText, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Rating, Stars } from '../../components';
import Tags from '../../components/Tags/index';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MiniMap from './MiniMap'
import WriteReviewModal from './WriteReviewModal'
import { useAuth } from '../../context/auth';
import useEstablishment from '../../hooks/useEstablishment';

type HeaderProps = {
  name: string,
  maxWidth: ContainerProps['maxWidth'],
  rating: number,
  numRatings: number,
  tags: string[],
  isOpen: boolean | null,
  hoursOfOperation: string | null
}

function Header({name, maxWidth, rating, numRatings, tags, isOpen, hoursOfOperation}: HeaderProps) {

  const hasHourInfo = isOpen !==null && hoursOfOperation !==null

  return(
    <Box sx={{bgcolor: 'primary.dark', display: 'flex', alignItems: 'flex-end', height: 300}}>
    <Container maxWidth={maxWidth} sx={{p: 3}}>
      <Typography variant="h1" sx={{color: 'white'}}>{name}</Typography>
      <Box sx={{mt:1, mb: 2}}>
        <Rating size={24} rating={rating} numRatings={numRatings} label={'reviews'} labelStyles={{color: 'white'}} />
      </Box>
      <Box sx={{mb: 2}}>
       <Tags variant="links" tags={tags} linkStyle={{color: 'white'}}/>
      </Box>
      {hasHourInfo && <Box>
        <Typography sx={{fontWeight: 'bold', color: isOpen ? 'green' : 'red'}} component="span">{isOpen ? 'Open' : 'Closed'}</Typography>
        <Typography sx={{color: 'white', ml: 2}} component="span">{hoursOfOperation}</Typography>
      </Box>}
    </Container>

  </Box>
  )
}

const Button = styled(MuiButton)(({ theme }) => {
  return {
    marginBottom: theme.spacing(1),
    '&:not(:last-child)': {
      marginRight: theme.spacing(1)
    }
  }
})


export default function Establishment() {
  const { id } = useParams()

  const { reviewInfo, hours, building, status, data, tags, isOpen, day } = useEstablishment(id)
  const { rating, numRatings, reviews, status: reviewStatus, appendReview } = reviewInfo

  const [toastOpen, setToastOpen] = React.useState(false)
  
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const [modalOpen, setModalOpen] = React.useState(false)

  if(!id || status === 'error') {
    return (<Navigate to="/search" />)
  }

  if(!data) {
    return <div>Loading...</div>
  }

  const handleSubmit = (data: { review: string, rating: number}): Promise<void> => {
    return axios.post('/api/reviews', {
      "Review_user": user?.Username,
      "Review_est": parseInt(id ?? ''),
      "Review": data.review,
      "Rating": data.rating
  }).then(res => {
      appendReview(res.data)
      setToastOpen(true)
    })
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Header maxWidth="md" hoursOfOperation={hours ? hours[day].hoursOfOperation : null} {...{name: data?.Name, rating, numRatings, tags, isOpen}} />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Box sx={{mt: 2, mb: 1}}>
              <Button size="small" color="primary" variant="contained" startIcon={<StarOutlineIcon />} onClick={isAuthenticated ? () => setModalOpen(true) : () => navigate('/login')}>
                Write a Review
              </Button>
              <Button size="small" variant="outlined" startIcon={<CameraAltIcon />}>
                Add Photo
              </Button>
              <Button size="small" variant="outlined" startIcon={<IosShareIcon />}>
                Share
              </Button>
              <Button size="small" variant="outlined" startIcon={<BookmarkBorderIcon />}>
                Save
              </Button>
            </Box>
            <Divider />
            <Box sx={{mt: 2, mb: 1}}>
              <Typography component="h2" variant="h5" gutterBottom>Location &amp; Hours</Typography>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  {data?.X_coordinate && data?.Y_coordinate && <MiniMap height={150} coordinates={[data.X_coordinate, data.Y_coordinate]} />}


                  <Box sx={{display: 'flex', alignItems: 'flex-start', py: 2, justifyContent: 'space-between' }}>
                    {building !== null && <Box sx={{mr: 1}}>
                      <Typography style={{lineHeight: 1}}>{building.PropName}</Typography>
                      <Typography variant="caption">
                        Gainesville, FL
                      </Typography>
                    </Box>}
                    <Button variant="contained" size="small">
                      Directions
                    </Button>
                  </Box>

                </Grid>
                {hours !== null && <Grid item xs={7}>
                  {
                    hours.map((hr, i) => {

                      const fontWeight = i === day ? 'bold' : 'normal'

                      return <Box key={hr.day} sx={{display: 'flex' }}>
                      <Typography sx={{flex: '0 1 60px', fontWeight}}>
                        {hr.day.slice(0, 3)}
                      </Typography>
                      <Typography sx={{flex: '1 1 auto', fontWeight}}>
                        {hr.hoursOfOperation}
                      </Typography>
                      {i === day && <Typography sx={{flex: '1 1 auto', fontWeight: 'bold', color: isOpen ? 'green' : 'red'}}>
                        {isOpen ? 'Open now' : 'Closed'}
                      </Typography>}
                    </Box>
                    })
                  }
                </Grid>}
              </Grid>


            </Box>
            <Divider />
            <Box sx={{mt: 2, mb: 1}}>
              <Typography component="h2" variant="h5">Reviews</Typography>
              {reviews?.map((r, i) => {
                return <React.Fragment key={i}><Box sx={{my: 2}}>
                  <Typography variant="caption" sx={{fontWeight: 'bold'}}>@{r?.Review_user}</Typography>
                  <Stars rating={r.Rating} size={18} sx={{ mb: 1}}/>
                  <Typography>{r.Review}</Typography>
                </Box>
                <Divider />
                </React.Fragment>
              })}
              {reviews?.length === 0 && <Typography>This place has no reviews yet.</Typography>}

            </Box>



          </Grid>
          <Grid item xs={4} >
            <Paper square variant="outlined" sx={{p: 1.5, mt: 3}}>
              <List dense disablePadding>
                {data?.Url && <ListItem divider>
                  <ListItemText primary={<Link href={data?.Url} sx={{wordBreak: 'break-all'}}>{data?.Url}</Link>} />
                </ListItem>}
                <ListItem divider>
                  <ListItemText primary={'(352) 371-2323'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Link href={'#'}>Get Directions</Link>} secondary={building !== null ? building.PropName : null}/>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={toastOpen} autoHideDuration={4000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToastOpen(false)} severity="success">
          Your review has been posted successfully!
        </Alert>
      </Snackbar>
      {data !== null && <WriteReviewModal establishment={data} open={modalOpen} handleClose={() => setModalOpen(false)} handleSubmit={handleSubmit}/>}
    </Container>
  );
};