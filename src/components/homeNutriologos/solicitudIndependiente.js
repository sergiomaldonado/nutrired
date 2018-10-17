
import React, { Component } from 'react';
import { db, auth} from '../../firebase/'
import { authfb, dbfb } from '../../firebase/firebase';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';
import './../App.css';
const INITIAL_STATE = {
    ref: '',
    mensaje:'',
    error: null,
  };
  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  
class SolicitIndependiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: null
      }  
  }
  aceptarSolicitud = (refEmisor, datospersonales, historialmedico) => {
      const ref = authfb.currentUser.uid
      db.aceptarPaciente(ref, refEmisor, datospersonales, historialmedico)
      .then(() => {
      this.setState({ ...INITIAL_STATE });
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
      const {img, mensaje, aceptarSolicitud, estadoSolicitud} = this.props
       return(
        <div className="solicitudPendiente">  
               <div className="datosSolicitud">
               <div className="pps"><Image className="solicitudPic" src={img} circle></Image></div>
               <div className="ts">{mensaje}</div>   
                 </div> 
               <div> 
              
                  
                   <div><Button onClick={aceptarSolicitud} >Aceptar</Button> 
                     <Button onClick={()=> alert("aqui estoy")} >Eliminar</Button>
                     </div>  
             
               </div> </div>
    
       )
      
  } 
}


export default SolicitIndependiente;

