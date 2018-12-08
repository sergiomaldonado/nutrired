
import React, { Component } from 'react';
import { User,  Activity, TrendingUp, Book, Clipboard,BookOpen, Award, Globe, Calendar, Search } from 'react-feather'
import {ButtonToolbar, ToggleButtonGroup,ToggleButton,ListGroup,ListGroupItem, Grid, ProgressBar, Row, Col, NavItem, Nav, Tab, Glyphicon, Form, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import NombreUser from './nombre-user';
import Imagen from '../imagen.png'
import { db, auth } from '../../firebase/firebase';
import Moment from 'react-moment'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import icoDesayuno from '../homeNutriologos/icons/icoDesayunoPlanAlimentacion.svg'
import icoColacion from '../homeNutriologos/icons/icoColacionPlanAlimentacion.svg'
import icoComida from '../homeNutriologos/icons/icoComidaPlanAlimentacion.svg'
import icoCena from '../homeNutriologos/icons/icoCenaPlanAlimentacion.svg'

class PlanDeAlimentacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        historial: null,
      };
  } 
  componentDidMount() {
    const uid = auth.currentUser.uid;
    
    db.ref(`users/pacientes/${uid}/minutriologo/`).on('value', snapshot => {
        const idNutriologo = snapshot.val().ref
       db.ref(`users/pacientes/${uid}/dietaAsignada`).on('value', snapshot=>{
         const idDieta = snapshot.val().idDieta
        db.ref(`users/nutriologos/${idNutriologo}/dietas/${idDieta}`).on('value', snapshot=>{
       
            this.setState({
                dietaAsignada:snapshot.val()
            })
        })

        db.ref(`users/nutriologos/${idNutriologo}/dietas/${idDieta}/dieta/desayuno`).on('value', snapshot=>{
          
              this.setState({
                arrayDesayuno:snapshot.val(),
                desayunoPlatilo1Alimentos:snapshot.val().platillo1.alimentos,
                desayunoPlatilo2Alimentos:snapshot.val().platillo2.alimentos,
                desayunoPlatilo3Alimentos:snapshot.val().platillo3?snapshot.val().platillo3.alimentos:null 
            })
        })
        
        db.ref(`users/nutriologos/${idNutriologo}/dietas/${idDieta}/dieta/colacion1`).on('value', snapshot=>{
      
              this.setState({
                arraycolacion1:snapshot.val(),
                colacion1Platilo1Alimentos:snapshot.val().platillo1?snapshot.val().platillo1.alimentos:null,
                colacion1Platilo2Alimentos:snapshot.val().platillo2?snapshot.val().platillo2.alimentos:null,
                colacion1Platilo3Alimentos:snapshot.val().platillo3?snapshot.val().platillo3.alimentos:null
            })
        })
        db.ref(`users/nutriologos/${idNutriologo}/dietas/${idDieta}/dieta/comida`).on('value', snapshot=>{
          
              this.setState({
                arraycomida:snapshot.val(),
                comidaPlatilo1Alimentos:snapshot.val().platillo1?snapshot.val().platillo1.alimentos:null,
                comidaPlatilo2Alimentos:snapshot.val().platillo2?snapshot.val().platillo2.alimentos:null,
                comidaPlatilo3Alimentos:snapshot.val().platillo3?snapshot.val().platillo3.alimentos:null
            })
        })
        db.ref(`users/nutriologos/${idNutriologo}/dietas/${idDieta}/dieta/colacion2`).on('value', snapshot=>{
          
            this.setState({
              arraycolacion2:snapshot.val(),
              colacion2Platilo1Alimentos:snapshot.val().platillo1?snapshot.val().platillo1.alimentos:null,
              colacion2Platilo2Alimentos:snapshot.val().platillo2?snapshot.val().platillo2.alimentos:null,
              colacion2Platilo3Alimentos:snapshot.val().platillo3?snapshot.val().platillo3.alimentos:null
          })
      })

      db.ref(`users/nutriologos/${idNutriologo}/dietas/${idDieta}/dieta/cena`).on('value', snapshot=>{
          
        this.setState({
          arraycena:snapshot.val(),
          cenaPlatilo1Alimentos:snapshot.val().platillo1?snapshot.val().platillo1.alimentos:null,
          cenaPlatilo2Alimentos:snapshot.val().platillo2?snapshot.val().platillo2.alimentos:null,
          cenaPlatilo3Alimentos:snapshot.val().platillo3?snapshot.val().platillo3.alimentos:null
      })
  })



       }) 
      })
    
  }

  render() {

    if(this.state.dietaAsignada){
        const {nombre, recomendaciones} = this.state.dietaAsignada
        const arrayDesayuno = this.state.arrayDesayuno
        const platillo1Desayuno = this.state.desayunoPlatilo1Alimentos
        const platillo2Desayuno = this.state.desayunoPlatilo2Alimentos
        const platillo3Desayuno = this.state.desayunoPlatilo3Alimentos

        const arraycolacion1 = this.state.arraycolacion1
        const platillo1colacion1 = this.state.colacion1Platilo1Alimentos
        const platillo2colacion1 = this.state.colacion1Platilo2Alimentos
        const platillo3colacion1 = this.state.colacion1Platilo3Alimentos

        const arraycomida = this.state.arraycomida
        const platillo1comida = this.state.comidaPlatilo1Alimentos
        const platillo2comida = this.state.comidaPlatilo2Alimentos
        const platillo3comida = this.state.comidaPlatilo3Alimentos

        const arraycolacion2 = this.state.arraycolacion2
        const platillo1colacion2 = this.state.colacion2Platilo1Alimentos
        const platillo2colacion2 = this.state.colacion2Platilo2Alimentos
        const platillo3colacion2 = this.state.colacion2Platilo3Alimentos

        const arraycena = this.state.arraycena
        const platillo1cena = this.state.cenaPlatilo1Alimentos
        const platillo2cena = this.state.cenaPlatilo2Alimentos
        const platillo3cena = this.state.cenaPlatilo3Alimentos

        
       
        return(
          
            <div>
            <ButtonToolbar className="buttonSelectPrograma">
    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
      <ToggleButton value={1}>Alimentación</ToggleButton>
      <ToggleButton value={2}>Entrenamiento</ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>
            <div className="card-dietaAsignada">
        <div className="headerDietaAsignada">
            <div className="colorFondoTituloDietaAsignada">
            <h1 className="tittleDietaAsignada">{nombre}</h1>
            </div>
       
     <p>{/** recomendaciones.comentarios*/}</p>
        </div>
  
     <Grid className="gridColumnasPlanAlimentacion">
         <Row>
              {/** D E S A Y U N O */}
             <Col className="columnaDieta" md="12" xs="12">
               <Col className="colDesayunoPlanAlimentacion" md="2"><img src={icoDesayuno}></img> <h4>Desayuno</h4></Col>
               <Col md="10">
               
               {!!platillo1Desayuno&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                    <ListGroup>
                    <ListGroupItem className="tituloPlatilloPlanAlimentacion" header={arrayDesayuno.platillo1.nombre}></ListGroupItem>
                        {Object.keys(platillo1Desayuno).map(key=> 
                      <ListGroupItem header={platillo1Desayuno[key].nombre}>{platillo1Desayuno[key].cantidad} {platillo1Desayuno[key].unidad} o {platillo1Desayuno[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

          {!!platillo2Desayuno&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                    <ListGroup>
                    <ListGroupItem className="tituloPlatilloPlanAlimentacion" header={arrayDesayuno.platillo2.nombre}></ListGroupItem>
                        
                        {Object.keys(platillo2Desayuno).map(key=> 
                      <ListGroupItem header={platillo2Desayuno[key].nombre}>{platillo2Desayuno[key].cantidad} {platillo2Desayuno[key].unidad} o {platillo2Desayuno[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

               {!!platillo3Desayuno&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
               <ListGroupItem className="tituloPlatilloPlanAlimentacion" header={arrayDesayuno.platillo3.nombre}></ListGroupItem>
                        
                    <ListGroup>{Object.keys(platillo3Desayuno).map(key=> 
                      <ListGroupItem header={platillo3Desayuno[key].nombre}>{platillo3Desayuno[key].cantidad} {platillo3Desayuno[key].unidad} o {platillo3Desayuno[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }
               </Col>
             </Col>

       {/** C O L A C I O N  U N O*/}

             <Col className="columnaDieta" md="12" xs="12">
               <Col className="colColacionPlanAlimentacion" md="2"><img src={icoColacion}></img> <h4>Colacion 1</h4></Col>
               <Col md="10">
                 {!!platillo1colacion1&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
               <ListGroup>
               <ListGroupItem className="tituloPlatilloColacion1PlanAlimentacion" header={arraycolacion1.platillo1.nombre}></ListGroupItem>
                        
                   {Object.keys(platillo1colacion1).map(key=> 
                      <ListGroupItem header={platillo1colacion1[key].nombre}>{platillo1colacion1[key].cantidad} {platillo1colacion1[key].unidad} o {platillo1colacion1[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

          {!!platillo2colacion1&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                  <div className="contenedorPlatilloPlanAlimentacion">
                  <div className="tituloPlatilloPlanAlimentacion">
                  <h4>{arraycolacion1.platillo2.nombre}</h4> 
                  </div>
                    <ListGroup>{Object.keys(platillo2colacion1).map(key=> 
                      <ListGroupItem header={platillo2colacion1[key].nombre}>{platillo2colacion1[key].cantidad} {platillo2colacion1[key].unidad} o {platillo2colacion1[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </div></Col></span>)
               }

               {!!platillo3colacion1&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                  <div className="contenedorPlatilloPlanAlimentacion">
                  <div className="tituloPlatilloPlanAlimentacion">
                  <h4>{arraycolacion1.platillo3.nombre}</h4>
                  </div>
                    <ListGroup>{Object.keys(platillo3colacion1).map(key=> 
                      <ListGroupItem header={platillo3colacion1[key].nombre}>{platillo3colacion1[key].cantidad} {platillo3colacion1[key].unidad} o {platillo3colacion1[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </div></Col></span>)
               }
          
               </Col>
         </Col>

         {/** C O M I D A */}
         <Col className="columnaDieta" md="12" xs="12">
               <Col className="colComidaPlanAlimentacion" md="2"><img src={icoComida}></img> <h4>Comida</h4></Col>
               <Col md="10">
                 {!!platillo1comida&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
               <ListGroup>
               <ListGroupItem className="tituloPlatilloComidaPlanAlimentacion" header={arraycomida.platillo1.nombre}></ListGroupItem>
                        
                   {Object.keys(platillo1comida).map(key=> 
                      <ListGroupItem header={platillo1comida[key].nombre}>{platillo1comida[key].cantidad} {platillo1comida[key].unidad} o {platillo1comida[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

          {!!platillo2colacion1&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                  <div className="contenedorPlatilloPlanAlimentacion">
                  <div className="tituloPlatilloPlanAlimentacion">
                  <h4>{arraycomida.platillo2.nombre}</h4> 
                  </div>
                    <ListGroup>{Object.keys(platillo2comida).map(key=> 
                      <ListGroupItem header={platillo2comida[key].nombre}>{platillo2comida[key].cantidad} {platillo2comida[key].unidad} o {platillo2comida[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </div></Col></span>)
               }

               {!!platillo3comida&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                  <div className="contenedorPlatilloPlanAlimentacion">
                  <div className="tituloPlatilloPlanAlimentacion">
                  <h4>{arraycomida.platillo3.nombre}</h4>
                  </div>
                    <ListGroup>{Object.keys(platillo3comida).map(key=> 
                      <ListGroupItem header={platillo3comida[key].nombre}>{platillo3comida[key].cantidad} {platillo3comida[key].unidad} o {platillo3comida[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </div></Col></span>)
               }
          
               </Col>
         </Col>

       {/** C O L A C I O N  D O S*/}

             <Col className="columnaDieta" md="12" xs="12">
               <Col className="colColacionPlanAlimentacion" md="2"><img src={icoColacion}></img> <h4>Colacion 2</h4></Col>
               <Col md="10">
                 {!!platillo1colacion2&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
               <ListGroup>
               <ListGroupItem className="tituloPlatilloColacion1PlanAlimentacion" header={arraycolacion2.platillo1.nombre}></ListGroupItem>
                        
                   {Object.keys(platillo1colacion2).map(key=> 
                      <ListGroupItem header={platillo1colacion2[key].nombre}>{platillo1colacion2[key].cantidad} {platillo1colacion2[key].unidad} o {platillo1colacion2[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

          {!!platillo2colacion2&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                  <div className="contenedorPlatilloPlanAlimentacion">
                  <div className="tituloPlatilloPlanAlimentacion">
                  <h4>{arraycolacion2.platillo2.nombre}</h4> 
                  </div>
                    <ListGroup>{Object.keys(platillo2colacion2).map(key=> 
                      <ListGroupItem header={platillo2colacion2[key].nombre}>{platillo2colacion2[key].cantidad} {platillo2colacion2[key].unidad} o {platillo2colacion2[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </div></Col></span>)
               }

               {!!platillo3colacion2&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                  <div className="contenedorPlatilloPlanAlimentacion">
                  <div className="tituloPlatilloPlanAlimentacion">
                  <h4>{arraycolacion2.platillo3.nombre}</h4>
                  </div>
                    <ListGroup>{Object.keys(platillo3colacion2).map(key=> 
                      <ListGroupItem header={platillo3colacion2[key].nombre}>{platillo3colacion2[key].cantidad} {platillo3colacion2[key].unidad} o {platillo3colacion2[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </div></Col></span>)
               }
          
               </Col>
         </Col>

{/** D E S A Y U N O */}
<Col className="columnaDieta" md="12" xs="12">
               <Col className="colDesayunoPlanAlimentacion" md="2"><img src={icoCena}></img> <h4>Cena</h4></Col>
               <Col md="10">
               
               {!!platillo1cena&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                    <ListGroup>
                    <ListGroupItem className="tituloPlatilloPlanAlimentacion" header={arraycena.platillo1.nombre}></ListGroupItem>
                        {Object.keys(platillo1cena).map(key=> 
                      <ListGroupItem header={platillo1cena[key].nombre}>{platillo1cena[key].cantidad} {platillo1cena[key].unidad} o {platillo1cena[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

          {!!platillo2cena&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
                    <ListGroup>
                    <ListGroupItem className="tituloPlatilloPlanAlimentacion" header={arraycena.platillo2.nombre}></ListGroupItem>
                        
                        {Object.keys(platillo2cena).map(key=> 
                      <ListGroupItem header={platillo2cena[key].nombre}>{platillo2cena[key].cantidad} {platillo2cena[key].unidad} o {platillo2cena[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }

               {!!platillo3cena&&(<span>
               <Col className="colPlatilloPlanAlimentacion" md="6">
               <ListGroupItem className="tituloPlatilloPlanAlimentacion" header={arraycena.platillo3.nombre}></ListGroupItem>
                        
                    <ListGroup>{Object.keys(platillo3cena).map(key=> 
                      <ListGroupItem header={platillo3cena[key].nombre}>{platillo3cena[key].cantidad} {platillo3cena[key].unidad} o {platillo3cena[key].gramos} gramos. </ListGroupItem>) 
                    }</ListGroup>
                  </Col></span>)
               }
               </Col>
             </Col>
         
       </Row>
     </Grid>
        
         </div>
           </div>            
       
        )
     

    }else {
        return null
    }
        
   
    
          
      
  
    
          
      
  }
}
export default PlanDeAlimentacion;
