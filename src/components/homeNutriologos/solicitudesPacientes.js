
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
  aceptarSolicitud = (refEmisor, datospersonales, historialmedico) => {
    const ref = authfb.currentUser.uid
    db.aceptarPaciente(ref, refEmisor, datospersonales, historialmedico)
    .then(() => {
    this.setState({ ...INITIAL_STATE, aceptado: true });
         })
    .catch(error => {
    this.setState(byPropKey('error', error));
    });
    dbfb.ref(`users/nutriologos/${ref}/solicitudes/${refEmisor}`).remove()

}
  
  componentDidMount(){
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/nutriologos/${uid}/solicitudes`).on('value', snapshot => {
        this.setState({
          users: snapshot.val()
        })
    }) 
  }
  render() {
    const { users } = this.state;
      return(
        <div>
        { !!users && (
     <div>
          {Object.keys(users).map( key =>
            <SolicitudIndependiente   
            img={users[key].urlPic.img} 
            mensaje={users[key].mensaje}
            aceptarSolicitud={()=>this.aceptarSolicitud(users[key].refEmisor, users[key].datospersonales, users[key].historialmedico)}
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

