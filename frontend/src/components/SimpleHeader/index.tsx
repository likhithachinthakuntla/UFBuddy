import { AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SimpleHeader() {
  const navigate = useNavigate()
  return(
    <AppBar position="static">
      <Toolbar style={{minHeight: 64, alignItems: 'center', justifyContent: 'center'}}>
          <img src="/images/logo-white.png" style={{height: 36, width: 'auto', cursor: 'pointer'}}  alt="yelp UF" onClick={() => navigate('/')} />
      </Toolbar>
    </AppBar>
  )
}
