import React, { Component } from 'react';
import { User,  Activity, TrendingUp, Book, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import { Grid, Label,ButtonToolbar, ToggleButtonGroup,ToggleButton, Button, ProgressBar, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import NombreUser from './nombre-user';
import Imagen from '../imagen.png'
import { db, auth } from '../../firebase/firebase';
import Moment from 'react-moment'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class HMedico extends Component {
  constructor(props) {
    super(props);
    this.state = {
        historial: null,
       
      };
  }
  componentDidMount() {
    const uid = auth.currentUser.uid;
    db.ref(`users/pacientes/${uid}/historialmedico`).on('value', snapshot => {
      this.setState({
        historial: snapshot.val()
      })
      db.ref(`users/pacientes/${uid}/dietaHabitual`).on('value', snapshot => {
        console.log(`horario:${snapshot.val()}`)
        this.setState({
          dietaHabitual: snapshot.val()
        })
      })
    })
  }
  render() {
    if(this.state.historial || this.state.dietaHabitual){
       
        const  {enfermedadActual,enfermedadesFamiliares} = this.state.historial
        const {desayuno, comida, cena} = this.state.dietaHabitual
       
        return(
          
            <div>
            <div className="card-cliente">
         <div className="tittleHistorialMedico">
           <h4>Mi Historial Clinico</h4>
         </div>
        <Grid className="gridHistorial">
          <Row className="show-grid">
            <Col xs={12} md={6}>
            <h5 className="tittleHistorial">Enfermedades Recientes</h5>
                <div className="cardPerfil">
                <Grid className="chipsPerfil">
                <Row>
                   {
                   enfermedadActual
                   ? enfermedadActual.map(element => {
                     return( <Col className="labelHistorial"><Label className="enfermedadActual">{element}</Label></Col> )
                   })
                   : null
                  }                  
                  </Row>
                  </Grid>
                </div>
                </Col>
            <Col xs={12} md={6}>
            <h5 className="tittleHistorial">Antecedentes Familiares</h5>
            <div className="cardPerfil">
            <Grid className="chipsPerfil">
                <Row>
                {  enfermedadesFamiliares
                   ? enfermedadesFamiliares.map(element => {
                   return( <Col className="labelHistorial"><Label className="enfermedadesFamiliares"> {element.label}</Label></Col> )     
                   })
                   : null
                  }

                  </Row></Grid>
              </div></Col>
          </Row>
        </Grid>
        <div className="tittleHistorialMedico">
           <h4>Estilo de Vida</h4>
         </div>
        <Grid className="gridHistorial">
          <Row className="show-grid">
            <Col xs={12} md={4}>
            <h5 className="tittleHistorial">Desayuno / Almuerso</h5>
            <h5 className="tittleHistorial"></h5>
            <div className="horaHistorial">
               
                  {
                   desayuno
                   ? desayuno.horario     
                   : null
                  }

                   
                  </div>
                <div className="cardPerfil-desayuno">
                  
                  <p>{
                   desayuno
                   ? desayuno.alimento
                   : null
                  } con {
                   desayuno
                   ? desayuno.bebida   
                   : null
                  }</p>
                </div>
                </Col>
            <Col xs={12} md={4}>
            <h5 className="tittleHistorial">Comida</h5>
            <div className="horaHistorial-comida">
            {comida?comida.horario:null}
            </div>
          <div className="cardPerfil-desayuno">
            
            <p>{comida?comida.alimento:null} con   {comida?comida.bebida:null}</p>
          </div></Col>
              <Col xs={12} md={4}>
            <h5 className="tittleHistorial">Cena</h5>
            <div className="horaHistorial-cena">
            {cena?cena.horario:null}
                  </div>
                <div className="cardPerfil-desayuno">
                  <p>   {cena?cena.alimento:null} con  {cena?cena.bebida:null}</p>
                </div>
              </Col>
          </Row>
        </Grid>
         </div>
         <ButtonToolbar className="buttonSelectPrograma">
    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
      <ToggleButton value={1}>Consultas</ToggleButton>
      <ToggleButton value={2}>Laboratorios</ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>
    <Grid className="gridHistorialDeConsultas">
      <Row>
        <Col md="12" xs="12">
        <div className="card-consulta-historial">
           <Col md="10" xs="12">
           <span><h3 className="tittleConsultaHistorial">Revision de dieta asignada</h3> Fecha: 10/12/18  Hora: 2:00pm</span>
           </Col>
           <Col md="2" xs="12"><Button>Ver Consulta</Button></Col>
        </div>
        </Col>
        <Col md="12" xs="12">
        <div className="card-consulta-historial">
           <Col md="10" xs="12">
           <span><h3 className="tittleConsultaHistorial">Revision de dieta asignada</h3> Fecha: 10/12/18  Hora: 2:00pm</span>
           </Col>
           <Col md="2" xs="12"><Button>Ver Consulta</Button></Col>
        </div>
        </Col>
        <Col md="12" xs="12">
        <div className="card-consulta-historial">
           <Col md="10" xs="12">
           <span><h3 className="tittleConsultaHistorial">Revision de dieta asignada</h3> Fecha: 10/12/18  Hora: 2:00pm</span>
           </Col>
           <Col md="2" xs="12"><Button>Ver Consulta</Button></Col>
        </div>
        </Col>
      </Row>
    </Grid>
         

           </div> 
           
           
       
        )
      }else{
        return null
      }
   
    
          
      
  }
}
export default HMedico;
