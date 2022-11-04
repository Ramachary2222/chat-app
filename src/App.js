import React from 'react';
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
      <switch>
        <PublicRoute path="/signin">
          <Signin />
        </PublicRoute>
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </switch>
    </ProfileProvider>
  );
}

export default App;
