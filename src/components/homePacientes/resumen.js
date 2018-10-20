
import React, { Component } from 'react';
import { Button, Tooltip, Popover, ProgressBar,Modal,OverlayTrigger, Row, Col, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import NombreUser from './nombre-user';
import Imagen from '../imagen.png'
import { db, auth } from '../../firebase/firebase';
import Moment from 'react-moment'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import FotoPaciente from './editarFotoUser'

class Resumen extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
        user: null,
        datos:null,
        show: false
      };
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
    db.ref(`users/pacientes/${uid}/urlPic/img/`).on('value', snapshot => {
      this.setState({
        img: snapshot.val()
      })
    })
  }
  render() {

    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    if(this.state.user){
        const  {nombre, apellido, telefono, email} = this.state.user;
        const  {anoNacimiento, diaNacimiento, estatura, peso, meta} = this.state.datos;
        const  {img} = this.state.img;
        return(
            <Col xs={12} md={10}>
          <Row className="show-grid">
           <Col className="card-cliente" xs={12} md={12}>
            <Col className="contfoto" xs={12} md={12}>
            <Col  xs={12} md={3}>  <Button className="btnPic" onClick={this.handleShow}>Cambiar</Button><Image src={this.state.img} className="img-card-cliente" thumbnail circle />
           
             </Col>

               <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar foto de perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <FotoPaciente />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>¡Listo!</Button>
          </Modal.Footer>
        </Modal>


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
