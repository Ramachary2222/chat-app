import React from 'react';
import { Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import Home from './pages/Home';
import Signin from './pages/Signin';
import './styles/main.scss'

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <Signin />
        </PublicRoute>
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
