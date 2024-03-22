import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../../context/auth';
import ProfileButtons from '../../ProfileButtons';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = styled(props => <Paper elevation={3} {...props}/>)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  padding: '4px 12px',
  fontSize: '1rem',
  '&, &:hover': {
    borderWidth: 2,
  },
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  }
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    //width: '100%',
    [theme.breakpoints.up('md')]: {
      //width: '20ch',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  borderBottomColor: theme.palette.grey[200],
  backgroundColor: 'white'
}));

export default function Header() {
  
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  let [searchParams,setSearchParams] = useSearchParams()

  const [search, setSearch] = React.useState(searchParams.get('query') ?? '')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchParams(search ? { query: search } : {})
  }

  const profileArea = (<ProfileButtons variant="light" />)

  const loginButtons = (<>
    <StyledButton onClick={() => navigate('/login')} variant="outlined">
      Log in
    </StyledButton>
    <StyledButton onClick={() => navigate('/signup')} variant="contained">
      Sign up
    </StyledButton>
  </>)

  return (
    <>
      <StyledAppBar color="transparent" elevation={0} position="fixed">
        <Toolbar>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
            <img src="/images/logo.png" alt="logo" style={{width: 110, height:'auto', cursor: 'pointer'}} onClick={() => navigate('/')} />
          </Box>
          <Box sx={{ flexGrow: 1.5 }} component="form" onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            { isAuthenticated ? profileArea : loginButtons }
          </Box>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};