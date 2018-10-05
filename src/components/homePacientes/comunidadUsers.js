import React, { Component } from 'react'

import withAutorization from '../withAutorization'
import { db, auth } from '../../firebase/firebase'
import { Grid, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import { Users, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import Imagen from '../imagen.png'
import SideNav from './side-nav'

class ComunidadPacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  
  render() {

      return(
            <Grid>
  <Row className="show-grid">
   <SideNav />
    <Col xs={12} md={10}>
    <h1>Bienvenido a la comunidad a la mejor red social del mundo</h1>
    </Col>
  </Row>
  </Grid>

      )
   
    
   
  }
}


const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(ComunidadPacientes);