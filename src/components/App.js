import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Navigation from './Navigation'
import Landing from './Landing'
import Home from './Home'
import Singin from './SingInPage'
import Singup from './SingUpPage'
import Acount from './acount'
import * as routes from '../constants/routes'
import { firebase } from '../firebase';
import withAuthentication from './withAutentication'
import Consultorio from './homeNutriologos/consultorio'
import Comunidad from './homeNutriologos/comunidad'
import Nutriologos from './homePacientes/nutriologos'

const App = () =>
  
      <Router>
        <div>
          <Navigation /> 
          <div>
     
     <Route exact path={routes.LANDING} component={ Landing } />
     <Route exact path={routes.HOME} component={ Home } />
     <Route exact path={routes.COMUNIDAD} component={ Comunidad } />
     <Route exact path={routes.NUTRIOLOGOS} component={ Nutriologos } />
     <Route exact path={routes.CONSULTORIO} component={ Consultorio } />
     <Route exact path={routes.SIGN_IN} component={ Singin } />
     <Route exact path={routes.SIGN_UP} component={ Singup } />
     <Route exact path={routes.ACCOUNT} component={ Acount } />
     </div>
        </div>
      </Router>
  
export default withAuthentication(App);

