import React, { Component } from 'react'
import { db, auth } from '../firebase/firebase'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Badge } from 'react-bootstrap';
import { Mail, Bell, Power } from 'react-feather';
import { Link } from 'react-router-dom';
import Logo from './logo.svg';
import SingOutButton from './SingOut';
import * as routes from '../constants/routes';
import Nombre from './homeNutriologos/nombre'
import NombreUser from './homePacientes/nombre-user'


class NavigationAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutriologo: null
    };
  }
  componentDidMount() {
        const uid = auth.currentUser.uid;
        db.ref('users/nutriologos/').child(uid).on('value', snapshot => {
          const exists = (snapshot.val() !== null);
          console.log(exists)
          this.setState({
            nutriologo: exists
          });
        })      
  } 
  render() {
    return this.state.nutriologo === true
      ? (<div>
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
      
      </div>)

// NAV USUARIOS

      :(<div>
        <Navbar  className="nav-top" inverse collapseOnSelect>
        <Navbar.Header >
        <Link to={routes.HOME}><img  className="logo" src={Logo} alt=""/></Link>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="nav-sub"  pullRight>
            <NavItem>
              
            <p className="nav-item-hijo"> <Link to={routes.ACCOUNT}> <NombreUser /> </Link></p>
            </NavItem>
            <NavItem>
            <p className="nav-item-hijo"> <Badge className="notificacion-numero">2</Badge> <Mail  className="ic" size={20} /> Inbox</p>
            </NavItem>
            <NavItem className="nav-item">
            <p className="nav-item-hijo"> <Badge className="notificacion-numero">9</Badge> <Bell  className="ic" size={20} /> Solicitudes </p>
            </NavItem>
            <NavItem>
             <Link to={routes.SIGN_IN}><SingOutButton /></Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      </div>)
           }     
  }
export default NavigationAuth;