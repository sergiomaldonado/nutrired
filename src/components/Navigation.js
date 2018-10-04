import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.svg';
import './App.css';
import SingOutButton from './SingOut';
import * as routes from '../constants/routes';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Badge } from 'react-bootstrap';
import { Mail, Bell, Power } from 'react-feather';
import { db, auth } from '../firebase/firebase';


import AuthUserContext from './AuthUserContext';


const Navigation = () =>

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
        
      <Link to={routes.ACCOUNT}>Sergio Maldonado</Link>
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