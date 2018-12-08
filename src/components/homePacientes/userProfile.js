import React, { Component } from 'react'
import withAutorization from '../withAutorization'
import { dbfb, authfb } from '../../firebase/firebase'
import { db, auth } from '../../firebase/firebase'
import { Grid, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import { Users, User, TrendingUp,  Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import Imagen from '../imagen.png'
import SideNav from './side-nav-users'
import Resumen from './resumen'
import HMedico from './historialMedico'
import PlanDeAlimentacion from './planDeAlimentacion'
import PanelDeProgreso from './panelDeProgreso'


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      
    }
  }
  componentDidMount(){
    const uid = auth.currentUser.uid;
    db.ref(`users/pacientes/${uid}/historialmedico`).on('value', snapshot => {
      this.setState({
        historial: snapshot.val()
      })
    })
  }
  render(){
    const historial = this.state.historial
      return(
            <Grid>
  <Row className="show-grid">
   <SideNav />
    <Col xs={12} md={10}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row className="clearfix">
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first"> <User  className="ic" size={20} /> Resumen</NavItem>
        
      </Nav>
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="second"> <Clipboard className="ic" size={20} /> Historial</NavItem>
      </Nav>
      
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
      
        <NavItem eventKey="tercera"><BookOpen className="ic" size={20} /> Programa</NavItem>
      </Nav>
      
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
      
        <NavItem eventKey="cuarta"><TrendingUp className="ic" size={20} /> Progreso</NavItem>
      </Nav>
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="quinta"><Award className="ic" size={20} />  Premios</NavItem>
      </Nav>
    </Col>
    <Col xs={12} md={11}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">
            <Resumen />
        
        </Tab.Pane>
        <Tab.Pane eventKey="second">
            
            <HMedico/>
           
        </Tab.Pane>
        <Tab.Pane eventKey="tercera">
          <PlanDeAlimentacion></PlanDeAlimentacion>
      
        </Tab.Pane>
        <Tab.Pane eventKey="cuarta">
          <PanelDeProgreso></PanelDeProgreso>
        </Tab.Pane>
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

export default withAutorization(authCondition)(UserProfile);