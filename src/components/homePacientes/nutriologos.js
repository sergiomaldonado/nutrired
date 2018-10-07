import React, { Component } from 'react'

import withAutorization from '../withAutorization'
import { db, auth} from '../../firebase/'
import { Grid, Row, Col, Button, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import { Users, User, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import Imagen from '../imagen.png'
import SideNav from './side-nav-users'

const INITIAL_STATE = {
  ref: '',
  mensaje:'',
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});  
class Nutriologos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    }
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }
  enviarSolicitud = (id) => {
      
      const mensaje = "hola"
      db.solicitud(id, mensaje )
      .then(() => {
      this.setState({ ...INITIAL_STATE });
           })
      .catch(error => {
      this.setState(byPropKey('error', error));
      }); }
  

  render() {
    const {
      mensaje,
    } = this.state;
    const { users } = this.state;
      return(
            <Grid>
  <Row className="show-grid">
   <SideNav />
    <Col xs={12} md={10}>
    <h1>Encuentra un nutriologo</h1>
    <Row className="show-grid">
    { !!users && (
     <div>
     
          {Object.keys(users).map( key =>
           <Col className="card-cliente" xs={12} md={3}>
           <Image src={Imagen} className="img-card-cliente" circle />
           <div className="tittle-card-cliente" key={key}>
               <h4>{users[key].nombre} {users[key].apellido} </h4>
              
               <form>
               </form>
               <form>
                 
               <Button onClick={ ()=>this.enviarSolicitud(users[key].ref)}> Enviar solicitud </Button>
               </form>
  
           </div>
          </Col>
            )}

     </div>


    ) }
    </Row>
    </Col>
  </Row>

  </Grid>

      ) 
  }
}




 




const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(Nutriologos);