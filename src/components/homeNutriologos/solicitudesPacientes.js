
import React, { Component } from 'react';
import { db, auth} from '../../firebase/'
import { authfb, dbfb } from '../../firebase/firebase';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';
import './../App.css';
import SolicitudIndependiente from './solicitudIndependiente'

const INITIAL_STATE = {
    ref: '',
    mensaje:'',
    error: null,
  };
  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  
class SolicitudesPendientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: null,
        aceptado: false
      }  
  }
  contador = () => {
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/nutriologos/${uid}/solicitudes`).on('value', snapshot => {
        if( snapshot.val() !== null ){
            const numero = Object.keys(snapshot.val()).length 
            this.setState({
              contador: numero
            })
        }else{
            this.setState({
                contador: 0
              })
        }
    }) 
   }
  aceptarSolicitud = (refEmisor, nombre, apellido, datospersonales, historialmedico, urlPic, email, telefono, dietaHabitual) => {
    const ref = authfb.currentUser.uid
    db.aceptarPaciente(ref, refEmisor, nombre, apellido, datospersonales, historialmedico, urlPic, email, telefono, dietaHabitual)
    .then(() => {
    this.setState({ ...INITIAL_STATE, aceptado: true });
         })
    .catch(error => {
    this.setState(byPropKey('error', error));
    });
    dbfb.ref(`users/nutriologos/${ref}`).on('value', snapshot => {
      const datosNutriologos = snapshot.val()
      const {nombre, apellido, email, telefono}  = datosNutriologos
     db.confirmacionUsuario(refEmisor, ref, nombre, apellido, email, telefono)
    })
    dbfb.ref(`users/nutriologos/${ref}/solicitudes/${refEmisor}`).remove()
}
  componentDidMount(){
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/nutriologos/${uid}/solicitudes`).on('value', snapshot => {
        this.setState({
          users: snapshot.val()
        })
    }) 
    this.contador()
  }
  render() {
    const { users } = this.state;
    this.state.contador === 0
      return(
        <div>
        { !!users && (
     <div> 
       
          {Object.keys(users).map( key =>
            <SolicitudIndependiente   
            img={users[key].urlPic.img} 
            mensaje={users[key].mensaje}
            aceptarSolicitud={()=>this.aceptarSolicitud(users[key].refEmisor, users[key].nombre,users[key].apellido, users[key].datospersonales, users[key].historialmedico, users[key].urlPic, users[key].email, users[key].telefono, users[key].dietaHabitual)}
            estadoSolicitud={this.state.aceptado}
            />
            )}
     </div>
    ) }
        </div>
      )
  } 
}
export default SolicitudesPendientes;

