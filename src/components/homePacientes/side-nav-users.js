
import React, { Component } from 'react';
import { Users, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import { Grid, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';


class SideNav extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
      return(
 <Col xs={12} md={2}>
     <ul className="left-menu">
     <Link to={routes.HOME}> <li className="left-menu-item">  <Globe  className="ic" size={20} /> Comunidad</li> </Link>
    <li className="left-menu-item">  <Calendar  className="ic" size={20} /> Agenda</li>
     </ul>
    </Col>
      )
  }
}


export default SideNav;
