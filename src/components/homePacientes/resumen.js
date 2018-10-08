
import React, { Component } from 'react';
import { User,  Activity, TrendingUp, Book, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import { Grid, ProgressBar, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import NombreUser from './nombre-user';
import Imagen from '../imagen.png'
import { db, auth } from '../../firebase/firebase';
import Moment from 'react-moment'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Resumen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        datos:null
      };
  }
  componentDidMount() {
    const uid = auth.currentUser.uid;
    db.ref(`users/pacientes/${uid}`).on('value', snapshot => {
      this.setState({
        user: snapshot.val()
      })
    })
    db.ref(`users/pacientes/${uid}/datospersonales`).on('value', snapshot => {
      this.setState({
        datos: snapshot.val()
      })
    })
  }
  render() {

    if(this.state.user){
        const  {nombre, apellido, telefono, email} = this.state.user;
        const  {anoNacimiento, diaNacimiento, estatura, peso, meta} = this.state.datos;
        return(
            <Col xs={12} md={10}>
          <Row className="show-grid">
           <Col className="card-cliente" xs={12} md={12}>
            <Col className="contfoto" xs={12} md={12}>
            <Col  xs={12} md={3}><Image src={Imagen} className="img-card-cliente" circle /></Col>
            <Col  xs={12} md={9}> <h2 className="p-meta">"{meta}"</h2></Col>
     
            </Col>
           <Col  xs={12} md={9}>
           <h1 className="nombreCard">{nombre} {apellido} </h1>
              <p className="p-card"> <strong className="strongCard">Tel:</strong> {telefono}  <strong className="strongCard">Mail:</strong> {email}</p>
             
              </Col>
              <Col  className="continfo" xs={12}  md={3}>
              <p className="p-card"> <strong  className="strongCard">IMC:</strong> { Math.round(peso / Math.pow(estatura, 2)) }% <strong className="strongCard"> Edad:</strong> { 2018 - anoNacimiento } <strong className="strongCard">Estatura:</strong>{estatura}Cm. <strong className="strongCard">Peso Actual:</strong>{peso}kl. <strong className="strongCard">Dieta:</strong>Sin Asignar </p>
             </Col> 
          </Col>
         </Row>  
         <div>
        
         </div>
         <Col xs={12} md={12}>
         <row>
           <div className="rangos">
              <div className="rango1">Normal</div>
              <div className="rango2">Sobrepeso</div>
              <div className="rango3">Obesidad 1</div>
              <div className="rango4">Obesidad 2</div>
              <div className="rango5">Obesidad extrema</div>
           </div>
         <InputRange
        maxValue={60}
        minValue={0}
        value={Math.round(peso / Math.pow(estatura, 2)) }/>
         </row>
         
         </Col>
         </Col>

         
         
        )
      }else{
        return null
      }
   
    
          
      
  }
}


export default Resumen;
