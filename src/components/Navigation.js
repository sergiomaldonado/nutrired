import React, { Component } from 'react';
import { db, auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import Logo from './logo.svg';
import withAutorization from './withAutorization';
import './App.css';
import SingOutButton from './SingOut';
import * as routes from '../constants/routes';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Badge } from 'react-bootstrap';
import { Mail, Bell, Power } from 'react-feather';
import Nombre from './homeNutriologos/nombre'

import AuthUserContext from './AuthUserContext';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  render() {
    
     return( 
    
     reNavigation()

     )

  }
}




const reNavigation = () =>

  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

 
const NavigationAuth = () =>

<div>
  <Navbar  className="nav-top" inverse collapseOnSelect>
  <Navbar.Header >
  <Link to={routes.HOME}><img  className="logo" src={Logo} alt=""/></Link>
  <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav className="nav-sub"  pullRight>
      <NavItem>
        
      <Link to={routes.ACCOUNT}> <Nombre /> </Link>
      </NavItem>
      <NavItem>
      <Badge className="notificacion-numero">2</Badge> <Mail  className="ic" size={20} /> Inbox
      </NavItem>
      <NavItem>
      <Badge className="notificacion-numero">9</Badge> <Bell  className="ic" size={20} /> Solicitudes
      </NavItem>
      <NavItem>
       <Link to={routes.SIGN_IN}><SingOutButton /></Link>
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>

</div>

const NavigationNonAuth = () =>
<div>
  <Navbar className="nav-top" inverse collapseOnSelect>
  <Navbar.Header >
  <Link to={routes.LANDING}><img  className="logo" src={Logo} alt=""/></Link>
  <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav className="nav-sub"  pullRight>
      <NavItem eventKey={1} href="#">
      </NavItem>
      <NavItem>
      <Link to={routes.SIGN_IN}> <Button>Iniciar Sesión</Button></Link>
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>

</div>



export default Navigation;