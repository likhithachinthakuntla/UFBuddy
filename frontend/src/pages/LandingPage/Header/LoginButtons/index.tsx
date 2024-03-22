import { Box, Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Button = styled(MuiButton)(({ theme }) => {
  return {
    '&:not(:last-child)': {
      marginRight: theme.spacing(1)
    }
  }
})

export default function LoginButtons() {

  const navigate = useNavigate()

  return(<Box sx={{color: "white"}}>
          <Button onClick={() => navigate('/login')} color="inherit">
            Log In
          </Button>
      <Button onClick={() => navigate('/signup')} color="inherit" variant="outlined">
        Sign Up
      </Button>
    </Box>)
}