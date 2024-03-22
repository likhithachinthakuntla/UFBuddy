import React, { useState } from 'react';
import { Container, Box, Grid, Button, Typography, TextField, Alert } from '@mui/material';
import { SimpleHeader, Link } from '../../components'
import validate from 'validate.js'
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

type Field = 'username' | 'password' | 'firstName' | 'lastName' | 'email' | 'confirmPassword'

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
  },
  confirmPassword: {
    presence: {
      allowEmpty: false
    },
    equality: "password"
  },
  lastName: {
    presence: {
      allowEmpty: false
    },
  },
  firstName: {
    presence: {
      allowEmpty: false
    },
  },
  email: {
    email: true,
    presence: {
      allowEmpty: false
    },
  },
};


export default function SignUpPage() {

  const [form, setForm] = useState<Form<string>>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    confirmPassword: ''
  })
  const [touched, setTouched] = useState<Form<boolean>>({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    email: false,
    confirmPassword: false
  })
  const [errors, setErrors] = useState<Form<string[]>>({
    username: [],
    password: [],
    firstName: [],
    lastName: [],
    email: [],
    confirmPassword: []
  })



  const [init, setInit] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { isAuthenticated, signUp } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if(!success) {
      return
    }
    const t = setTimeout(() => {
      navigate('/')
    }, 3000)
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
  
  const onSignUp = () => {
    setInit(true)
    setTouched({username: true, password: true, firstName: true, lastName: true, email: true, confirmPassword: true})
    setErrors({
      username: [],
      password: [],
      firstName: [],
      lastName: [],
      email: [],
      confirmPassword: []
    })
    const result = validate(form, constraints)
    if(result) {
      setErrors(e => ({...e, ...result}))
      return
    }

    setLoading(true)
    setError(false)
    signUp({
      Username: form.username,
      Password: form.password,
      FirstName: form.firstName,
      LastName: form.lastName,
      Email: form.email
    }).then((result) => {
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
              {error && <Alert onClose={() => setError(false)} severity="error" sx={{flex: 1}}>There was an error creating your account.</Alert>}
              {success && <Alert severity="success" sx={{flex: 1}}>Your account was created successfully. Redirecting...</Alert>}
            </Grid>
            <Grid item xs={6} container direction="column" alignItems="center" justifyContent="center">
              <Typography variant="h4" color="primary" sx={{fontSize: 24, mb: 2, mt: 2}}>Sign Up for Yelp UF</Typography>      
              <Box sx={{my: 3, maxWidth: 300}}>
                <TextField required name="username" autoComplete="username" inputProps={{'aria-label': 'Username'}} placeholder="Username" margin="dense" size="small" fullWidth value={form.username} onChange={onChange} disabled={isLoading || success} error={(!!form.username || init) && touched.username && hasError('username')} helperText={getHelperText('username')}/>

                <TextField required name="email" inputProps={{'aria-label': 'UF Email'}} placeholder="UF Email" margin="dense" size="small" fullWidth value={form.email} onChange={onChange} disabled={isLoading || success} error={(!!form.email || init) && touched.email && hasError('email')} helperText={getHelperText('email')}/>
                
                <Grid container spacing={2} sx={{mb: 2}}>
                  <Grid item xs={6}>
                    <TextField required name="firstName" autoComplete="first" inputProps={{'aria-label': 'First Name'}} placeholder="First Name" margin="dense" size="small" fullWidth value={form.firstName} onChange={onChange} disabled={isLoading || success} error={(!!form.firstName || init) && touched.firstName && hasError('firstName')}  helperText={getHelperText('firstName')} />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField required name="lastName" autoComplete="last" inputProps={{'aria-label': 'Last Name'}} placeholder="Last Name" margin="dense" size="small" fullWidth value={form.lastName} onChange={onChange} disabled={isLoading || success} error={(!!form.lastName || init) && touched.lastName && hasError('lastName')}  helperText={getHelperText('lastName')} />
                  </Grid>
                </Grid>
                
                
                
                <TextField required name="password" inputProps={{'aria-label': 'Password'}} type="password" placeholder="Password" margin="dense" size="small" fullWidth value={form.password} onChange={onChange} disabled={isLoading || success} error={(!!form.password || init) && touched.password && hasError('password')}  helperText={getHelperText('password')} />
                <TextField required name="confirmPassword" inputProps={{'aria-label': 'Confirm Password'}} type="password" placeholder="Confirm Password" margin="dense" size="small" fullWidth value={form.confirmPassword} onChange={onChange} disabled={isLoading || success} error={(!!form.confirmPassword || init) && touched.confirmPassword && hasError('confirmPassword')}  helperText={getHelperText('confirmPassword')} />
                
                <Button sx={{mt: 5, mb: 1}} variant="contained" fullWidth onClick={onSignUp}>
                  Sign Up
                </Button>
                <div style={{textAlign: 'right'}}>
                  <Typography color="textSecondary" variant="caption">Already on Yelp UF? <Link to="/login">Log in</Link></Typography>
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