import axios from 'axios';
import React, { useCallback, useMemo, FC, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface IAuthContext {
  isAuthenticated: boolean;
  login: (u: string, p: string) => Promise<boolean>
  logout: () => any,
  signUp: (user: User) => Promise<boolean>
  user: Record<string, string> | null
}

const defaultState: IAuthContext = {
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  signUp: () => Promise.resolve(false),
  logout: () => {},
  user: null
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

const AuthProvider: FC = ({ children }) => {
  
  // temporary local user management and login status - NOT SECURE
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuth', defaultState.isAuthenticated);
  const [user, setUser] = useLocalStorage('localUser', defaultState.user);

  const login = useCallback((user: string, pass: string) => {
    return axios.post('/api/users/login', {
      Username: user,
      Password: pass
    }).then((res) => {
      setUser(res.data)
      setIsAuthenticated(true)
      return true
    }).catch(err => {
      setIsAuthenticated(false)
      return false
    })
    
  }, [setIsAuthenticated, setUser])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    window.location.href = '/login'
  }, [setUser, setIsAuthenticated])

  const signUp = useCallback((user: User) => {
    return axios.post('/api/users', user).then((res) => {
      setUser(res.data)
      setIsAuthenticated(true)
      return true
    }).catch(err => {
      setIsAuthenticated(false)
      return false
    })
    
  }, [setIsAuthenticated, setUser])

  const value = useMemo<IAuthContext>(() => ({
    isAuthenticated,
    login,
    user,
    logout,
    signUp
  }), [isAuthenticated, login, user, logout, signUp])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider