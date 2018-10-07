
import React, { Component } from 'react';
import { User,  Activity, TrendingUp, Book, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import { Grid, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import NombreUser from './nombre-user';
import Imagen from '../imagen.png'
import { db, auth } from '../../firebase/firebase';

class Resumen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
      };
  }
  componentDidMount() {
    const uid = auth.currentUser.uid;
    db.ref(`users/pacientes/${uid}`).on('value', snapshot => {
      this.setState({
        user: snapshot.val()
      })
    })
  }
  render() {

    if(this.state.user){
        const  {nombre, apellido, telefono, email} = this.state.user;
        return(
            <Col xs={12} md={10}>
          <Row className="show-grid">
           <Col className="card-cliente" xs={12} md={12}>
           <Col  xs={12} md={3}>
           <Image src={Imagen} className="img-card-cliente" circle />
              </Col>
              <Col  xs={12}  md={9}>
              <h2 className="contenidoCard"> {nombre} {apellido} </h2>
              <p className="contenidoCard">Contacto: Tel {telefono}  Mail {email}</p>
              <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</h4>
             </Col> 
          </Col>
         </Row>  
         </Col>
        )
      }else{
        return null
      }
   
    
          
      
  }
}


export default Resumen;
