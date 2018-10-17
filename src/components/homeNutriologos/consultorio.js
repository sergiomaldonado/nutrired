import React, { Component } from 'react'

import withAutorization from '../withAutorization'
import { dbfb, authfb } from '../../firebase/firebase'
import { Grid, Button, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import { Users, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import Imagen from '../imagen.png'
import SideNav from './side-nav'

class Consultorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){  
    {/** const {pacientes} = this.state
    console.log(pacientes)
    dbfb.ref(`users/pacientes/${pacientes}`).once('value', snapshot => {
       this.setState({
         mostrarPacientes: snapshot.val()
     })
    alert(this.state.mostrarPacientes)
    })*****/}
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/nutriologos/${uid}/pacientes`).once('value', snapshot =>{
    this.setState({
         users: snapshot.val()
          }) 
       })
    }
  
  mostrarPacientes = () =>  {
    
    
   {/**   {Object.keys(pacientes).map( key =>
    
   )} ****/}

  }

  render() {
   
      const  {users} = this.state;

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
          <div>
        
          <div>
            
          { !!users && (
     <div>
             {Object.keys(users).map( key =>
            
     
              <Row className="show-grid">
           <Col className="card-cliente" xs={12} md={3}>
           <Image  className="img-card-cliente" circle />
           <div className="tittle-card-cliente">
               <h4></h4>
               <p className="text-card-cliente"></p>
               <p className="text-card-cliente">srgiomaldonado@gmail.com</p>
           </div>
          </Col>
         </Row>
      

              
            )}
     </div>
    ) }
        
     </div>

        </div>
  


        
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