
import React, { Component } from 'react';
import { User,  Activity, TrendingUp, Book, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import { Grid, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import NombreUser from './nombre-user';

class SideNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return(
    <Col xs={12} md={2}>
     <ul className="left-menu">
     <Link className="left-menu-item" to={routes.HOME}> <li >  <Globe  className="ic" size={20} /> <NombreUser /> </li></Link>
     <Link to={routes.HOME}> <li className="left-menu-item">  <Globe  className="ic" size={20} /> Comunidad</li> </Link>
     <li className="left-menu-item">  <Calendar  className="ic" size={20} /> Agenda</li>
     <Link to={routes.NUTRIOLOGOS}> <li className="left-menu-item">  <User  className="ic" size={20} /> Nutriologos</li> </Link>
     </ul>
    </Col>
      )
  }
}


export default SideNav;
