import React, { Component } from 'react'
import withAutorization from '../withAutorization'
import { db, auth} from '../../firebase/'
import { authfb, dbfb } from '../../firebase/firebase';
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
      registrado: null,
      yaenviado:null
    }
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/pacientes/${uid}`).on('value', snapshot => {
      this.setState({
        user: snapshot.val()
      })
    })
    dbfb.ref(`users/pacientes/${uid}/datospersonales`).on('value', snapshot => {
      this.setState({
        userDatos: snapshot.val()
      })
    })
  }
  enviarSolicitud = (ref) => {
      const emisorid = authfb.currentUser.uid
      const refEmisor = emisorid
      const {nombre, apellido, datospersonales, historialmedico, urlPic} = this.state.user
      const estadoSolicitud = false
      const mensaje = `${nombre} ${apellido} quiere ser tu paciente.`
      dbfb.ref(`users/nutriologos/${ref}/pacientes`).child(emisorid).once('value', snapshot => {
      const existe = (snapshot.val() !== null);
       this.setState({
           registrado: existe
       })
       
    })
      dbfb.ref(`users/nutriologos/${ref}/solicitudes`).child(emisorid).once('value', snapshot => {
        const existe = (snapshot.val() !== null);
         this.setState({
             yaenviado: existe
         })})
      this.state.registrado || this.state.yaenviado
      ? alert("Ya enviaste una solicitud o ya eres paciente de este nutriologo.")
      : db.solicitud(ref, emisorid, datospersonales, historialmedico, mensaje, refEmisor, urlPic)
        .then(() => {
        this.setState({ ...INITIAL_STATE });
               })
        .catch(error => {
        this.setState(byPropKey('error', error));
      });
            
  
       }

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