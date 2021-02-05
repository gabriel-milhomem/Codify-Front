/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { CookiesProvider, Cookies } from 'react-cookie';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect 
} from 'react-router-dom';

import GlobalStyle from './assets/GlobalStyles';
import { UserProvider } from './contexts/UserContext';
import * as Pages from './pages';

export default function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <Router>
          <GlobalStyle />
          <Switch>
            <UnprotectedRoute path="/cadastrar" component={Pages.SignUp} />
            <UnprotectedRoute path="/entrar" component={Pages.SignIn} />
            <UnprotectedRoute path="/esqueci-senha" component={Pages.ForgotPassword} />
            {/*<Route path="/redefinir-senha" component={Pages.RedefinePassword} />*/}
            <ProtectedRoute path="/" exact component={Pages.Home} />
          </Switch>
        </Router>
      </UserProvider>
    </CookiesProvider>
  );
}

function ProtectedRoute(props) {
  const token = Cookies.get('token');

  if(!token) {
    return (
      <Redirect to='/entrar' />
    );
  }

  return (
    <Route {...props} />
  );
}

function UnprotectedRoute(props) {
  const token = Cookies.get('token');

  if(token) {
    return (
      <Redirect to='/'/>
    );
  }

  return (
    <Route {...props} />
  );
}