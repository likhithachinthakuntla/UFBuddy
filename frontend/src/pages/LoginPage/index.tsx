import React, { useState } from 'react';
import { Container, Box, Grid, Button, Typography, TextField, Alert } from '@mui/material';
import { Link, SimpleHeader } from '../../components'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import validate from 'validate.js'

type Field = 'username' | 'password'

type Form<T> = Record<Field, T>

var constraints = {
  username: {
    presence: {
      allowEmpty: false
    },
  },
  password: {
    presence: {
      allowEmpty: false
    },
  }
};

export default function LoginPage() {

  const [form, setForm] = useState<Form<string>>({
    username: '',
    password: ''
  })
  const [touched, setTouched] = useState<Form<boolean>>({
    username: false,
    password: false
  })
  const [errors, setErrors] = useState<Form<string[]>>({
    username: [],
    password: []
  })

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [init, setInit] = useState(false)

  const navigate = useNavigate()
  
  const { login, isAuthenticated } = useAuth()

  React.useEffect(() => {
    if(!success) {
      return
    }
    const t = setTimeout(() => {
      navigate('/')
    }, 2500)

    return () => clearTimeout(t)

  }, [success, navigate])

  React.useEffect(() => {
    if(isAuthenticated && !success && !init) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate, success, init])

  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({...f, [e.target.name]: e.target.value}))
    setTouched(f => ({...f, [e.target.name]: true}))
  }

  const onLogIn = () => {

    setInit(true)
    setTouched({username: true, password: true})

    const result = validate(form, constraints)

    if(result) {
      setErrors(e => ({...e, ...result}))
      return
    }

    setLoading(true)
    setError(false)
    login(form.username, form.password).then((result) => {
      setError(!result)
      setSuccess(result)
    }).catch(() => {
      setError(true)
    }).finally(() => {
      setLoading(false)
    })
  }


  const hasError = (field: Field): boolean => {
    if(error) {
      return true
    }
    return !!errors[field] && errors[field].length > 0
  }
  const getHelperText = (field: Field): string|undefined => {
    return errors[field]?.[0]
  }
  
  return (
    <div>
      <SimpleHeader />
        <Container  sx={{py: 4, minHeight: 720, display: 'flex'}} maxWidth="md">
          <Grid container justifyContent="space-between" spacing={4} style={{flex: 1}}>
            <Grid item container alignItems="flex-end" xs={12}>
              {error && <Alert onClose={() => setError(false)} severity="error" sx={{flex: 1}}>The email address or password you entered is incorrect.</Alert>}
              {success && <Alert severity="success" sx={{flex: 1}}>Successfully logged in. Redirecting...</Alert>}
            </Grid>
            <Grid item xs={6} container direction="column" alignItems="center" justifyContent="center">
              <Typography variant="h4" color="primary" sx={{fontSize: 24, mb: 2, mt: 2}}>Log in to Yelp UF</Typography>
              
                <Typography sx={{'& a': { fontWeight: 'bold'}}}>
                  New to Yelp UF? <Link to="/signup">Sign up</Link>
                </Typography>
              <Box component="form" sx={{my: 3, maxWidth: 300}}>
                <TextField name="username" autoComplete="username" spellCheck={false} disabled={isLoading || success} error={(!!form.username || init) && touched.username && hasError('username')} helperText={getHelperText('username')} inputProps={{'aria-label': 'Username'}} placeholder="Username" margin="dense" size="small" fullWidth value={form.username} onChange={onChange} />
                <TextField name="password" autoComplete="current-password" disabled={isLoading || success} error={(!!form.username || init) && touched.password && hasError('password')} helperText={getHelperText('password')} inputProps={{'aria-label': 'Password'}} type="password" placeholder="Password" margin="dense" size="small" fullWidth value={form.password} onChange={onChange} />
                <div style={{textAlign: 'right'}}>
                  <Link sx={{fontSize: 12}} to="/forgot-password">Forgot Password?</Link>
                </div>
                <Button sx={{mt: 5, mb: 1}} variant="contained" fullWidth onClick={onLogIn}>
                  Log In
                </Button>
                <div style={{textAlign: 'right'}}>
                  <Typography color="textSecondary" variant="caption">New to Yelp UF? <Link to="/signup">Sign Up</Link></Typography>
                </div>
              </Box>

            </Grid>
            <Grid item xs={6} container direction="column" alignItems="center" justifyContent="center">
              <img src="/images/tower-circle.png" alt="tower" aria-hidden="true" style={{width: '90%', height: 'auto'}} />
            </Grid>
          </Grid>
        </Container>    
    </div>
  );
};