import React, { Component } from 'react'

import withAutorization from '../withAutorization'
import { db, auth } from '../../firebase/firebase'
import { Grid, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import { Users, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import Imagen from '../imagen.png'
import SideNav from './side-nav'

class Consultorio extends Component {
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
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row className="clearfix">
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first"> <Users  className="ic" size={20} /> Pacientes</NavItem>
        
      </Nav>
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
      
        <NavItem eventKey="second"> <Clipboard className="ic" size={20} /> Dietas</NavItem>
      </Nav>
      
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
      
        <NavItem eventKey="tercera"><BookOpen className="ic" size={20} /> Recetas</NavItem>
      </Nav>
      
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="cuarta"><Award className="ic" size={20} />  Premios</NavItem>
      </Nav>
      
    </Col>
    <Col xs={12} md={11}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">
      
        <FormGroup className="search">
        <InputGroup bsSize="large">
         <InputGroup.Addon><Search color="#FF7500" className="ic" size={20} /></InputGroup.Addon>
          <FormControl type="text" />
          </InputGroup>
          </FormGroup>
          
          <Row className="show-grid">
           <Col className="card-cliente" xs={12} md={3}>
       
           <Image src={Imagen} className="img-card-cliente" circle />
           <div className="tittle-card-cliente">
               <h4>Sergio Maldonado</h4>
               <p className="text-card-cliente">Tel: (321) 23 23 0</p>
               <p className="text-card-cliente">srgiomaldonado@gmail.com</p>
           </div>
          </Col>
           <Col className="card-cliente" xs={12} md={3}>
             <code>{'<Col xs={6} md={4} />'}</code>
              </Col>
           <Col className="card-cliente" xs={12}  md={3}>
             <code>{'<Col xsHidden md={4} />'}</code>
             </Col>
             <Col className="card-cliente" xs={12}  md={3}>
             <code>{'<Col xsHidden md={4} />'}</code>
             </Col>
             <Col className="card-cliente" xs={12}  md={3}>
             <code>{'<Col xsHidden md={4} />'}</code>
             </Col>
             <Col className="card-cliente" xs={12}  md={3}>
             <code>{'<Col xsHidden md={4} />'}</code>
             </Col>

         </Row>
        </Tab.Pane>
        <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
        <Tab.Pane eventKey="tercera">Tab 3 content</Tab.Pane>
        <Tab.Pane eventKey="cuarta">Tab 3 content</Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
 
    </Col>
  </Row>
  </Grid>

      )
   
    
   
  }
}


const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(Consultorio);