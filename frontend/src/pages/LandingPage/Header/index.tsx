import { Container, Box, ContainerProps, Button as MuiButton, Paper, FormControl, Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { bodyCategories } from '../config'
import LoginButtons from './LoginButtons'
import Links from './Links'
import { ProfileButtons } from '../../../components'
import { useAuth } from '../../../context/auth';


type HeaderProps = {
  maxWidth: ContainerProps['maxWidth'],
  handleSearch: (searchTerm: string) => void
}


const opacity = 0.4


export default function Header({ maxWidth, handleSearch }: HeaderProps) {

  const [search, setSearch] = React.useState('')
 
  const { isAuthenticated } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch(search)
  }

  return(
    <Box sx={{background: `url("/images/campus.jpg") rgba(0, 0, 0, ${opacity})`, backgroundBlendMode: 'multiply', backgroundPosition: 'center top', backgroundSize: 'cover', height: 600}}>
    <Container maxWidth={maxWidth} sx={{p: 3, display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Links />
        {isAuthenticated ? <ProfileButtons variant="dark" /> : <LoginButtons />}
      </Box>
      <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{maxWidth: 700, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src="/images/logo.png" alt="logo" style={{width: 250, height:'auto'}} />
            <Paper sx={{width: '100%', display: 'flex', mt: 4}} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <Input
                  id="search-input"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={bodyCategories.map(c => c.name).join(', ') + "..."}
                  inputProps={{
                    "aria-label": "Search Input"
                  }}
                  startAdornment={<InputAdornment position="start">Find</InputAdornment>}
                  sx={{py: 0.5, px: 1}}
                />
              </FormControl>
              <MuiButton variant="contained" sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} type="submit">
                <SearchIcon />
              </MuiButton>
            </Paper>
        </Box>
      </Box>
    </Container>
  </Box>
  )
}