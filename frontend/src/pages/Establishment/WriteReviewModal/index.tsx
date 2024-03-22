import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Stars } from '../../../components'

type WriteReviewModalProps = {
  open: boolean,
  handleClose: () => void,
  establishment: Diner,
  handleSubmit: (data: {rating: number, review: string }) => Promise<void> 
}

export default function WriteReviewModal({open, handleClose, establishment, handleSubmit}: WriteReviewModalProps) {

  const [rating, setRating] = React.useState(0)
  const [text, setText] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async () => {
    setLoading(true)
    setTimeout(async () => {
      await handleSubmit({review: text, rating: rating})
      setText('')
      setRating(0)
      setLoading(false)
      handleClose()
    }, 1250)

  }


  return (
  <Dialog open={open} onClose={() => !loading && handleClose()} maxWidth="sm" fullWidth>
        <DialogTitle>{establishment.Name}</DialogTitle>
        <DialogContent>
          <Box sx={{display: 'inline', mb: 3, alignItems: 'left'}}>
            <Stars size={50} rating={rating} setRating={setRating} sx={{mr: 3}}/>
            <Typography>
              {rating === 0 ? `Select Your Rating` : `${rating} stars`}
            </Typography>
          </Box>
          <TextField
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            margin="dense"
            id="review"
            fullWidth
            placeholder="Please leave a review!"
            variant="filled"
            multiline
            minRows={8}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button variant="contained" onClick={() => onSubmit()} disabled={rating===0 || !text || loading}>Submit</Button>
        </DialogActions>
      </Dialog>
  );
};