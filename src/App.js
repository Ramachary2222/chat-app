import React from 'react';
// eslint-disable-next-line import/no-unresolved
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import Home from './pages/Home';
import Signin from './pages/Signin';
import './styles/main.scss'

function App() {
  return (
    <switch>
      <PublicRoute path="/signin">
        <Signin />
      </PublicRoute>
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    </switch>
  );
}

export default App;
