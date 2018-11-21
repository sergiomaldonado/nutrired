import React, { Component } from 'react'
import withAutorization from '../withAutorization'
import { dbfb, authfb } from '../../firebase/firebase'
import { db, auth } from '../../firebase/'
import { Grid, Thumbnail, Modal, Button, Row, Col, NavItem, Nav, Tab, Label, FormGroup, FormControl, InputGroup, Image} from 'react-bootstrap'
import { Users, User,Phone, Clipboard,BookOpen, Award, MessageCircle, Search, ChevronDown} from 'react-feather'
import Imagen from '../imagen.png'
import SideNav from './side-nav'
import './../App.css'
import InputRange from 'react-input-range';
import ModalDietas from './modalDietas'
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});  
class Consultorio extends Component {
  constructor(props, context) {
    
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      showDieta: false,
      nombrePaciente:'',
      apellidoPaciente:'',
      emailPaciente:'',
      telefonoPaciente:'',
      datosPersonalesPaciente:'',
      historialMedicoPaciente:'',
      urlImg:'',
      perfilActivo: "1",
      tabActivo1: "show",
      tabActivo2: "noshow",
      tabActivo3: "noshow",
      dieta:'',
       btnCerrarModal:"salirModalDesactivado"
    }
  }
  componentDidMount(){  
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/nutriologos/${uid}/pacientes`).on('value', snapshot =>{
    this.setState({
         users: snapshot.val()
          }) 
       })
    }
    handleClose() {
      this.setState({ show: false });
    }

    handleShow(
      nombre, 
      apellido, 
      datospersonales, 
      historialmedico, 
      urlPic, 
      email, 
      telefono, 
      desayunoHorario,
      desayunoAlimento,
      desayunoBebida,
      comidaHorario,
      comidaAlimento,
      comidaBebida,
      cenaHorario,
      cenaAlimento,
      cenaBebida,
      ) {
      this.setState({ 
        show: true, 
        nombrePaciente:nombre,
        apellidoPaciente:apellido,
        emailPaciente:email,
        telefonoPaciente:telefono,
        datosPersonalesPaciente:datospersonales,
        historialMedicoPaciente:historialmedico,
        urlImg:urlPic,
        desayunoHorario:desayunoHorario,
        desayunoAlimento:desayunoAlimento,
        desayunoBebida:desayunoBebida,
        comidaHorario:comidaHorario,
        comidaAlimento:comidaAlimento,
        comidaBebida:comidaBebida,
        cenaHorario:cenaHorario,
        cenaAlimento:cenaAlimento,
        cenaBebida:cenaBebida,
       });

    }
    cerrarDieta = () => {
      this.setState({ showDieta: false,
        btnCerrarModal:"salirModalDesactivado"
      
      });
    }
    mostrarDieta = () => {
      const uid = authfb.currentUser.uid;
      const claveDieta = dbfb.ref().push();
      const key = claveDieta.key
      db.crearDieta(uid,key)
      this.setState({ showDieta: true,
          btnCerrarModal:"salirModal",
          dietaId:key
          });
    }

     clickTab1 = ()=>{
       this.setState({
         perfilActivo:"1",
         tabActivo1: "show",
         tabActivo2: "noshow",
         tabActivo3: "noshow",
       })
     }
     clickTab2 = ()=>{
      this.setState({
        perfilActivo:"2",
        tabActivo1: "noshow",
        tabActivo2: "show",
        tabActivo3: "noshow",
      })
    }
    clickTab3 = ()=>{
      this.setState({
        perfilActivo:"3",
        tabActivo1: "noshow",
        tabActivo2: "noshow",
        tabActivo3: "show",
      })
    }

  render() {
      
      const  {users} = this.state;
      return(
         
         <div>
              <button onClick={this.cerrarDieta} className={this.state.btnCerrarModal}>x</button>
              <ModalDietas mostrar={this.state.showDieta} idReceta={this.state.dietaId} />
            <Grid>
                {/***  MODAL PERFIL USUARIO ***/}
          <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="modalPerfil" closeButton>
          <Nav bsStyle="tabs" activeKey={this.state.perfilActivo} >
        <NavItem eventKey="1" onClick={this.clickTab1} >
          Resumen
        </NavItem>
        <NavItem eventKey="2" onClick={this.clickTab2} >
          Historial Medico
        </NavItem>
        <NavItem eventKey="3" onClick={this.clickTab3} >
          Plan de Alimentacion
        </NavItem>
      </Nav>
          </Modal.Header>
          <Modal.Body>
     {/*******     TAB PERFIL 1 ****/}     
      <div className={this.state.tabActivo1}>
        <Col xs={12} md={12}>
          <Row className="show-grid">
           <Col className="card-cliente-nutriologo" xs={12} md={12}>
            <Col className="contfoto" xs={12} md={12}>
            <Col  xs={12} md={3}><Image src={this.state.urlImg.img} className="img-card-cliente" thumbnail circle />
             </Col>
            <Col  xs={12} md={9}> <h2 className="p-meta">"{this.state.datosPersonalesPaciente.meta}"</h2></Col>
            </Col>
           <Col  xs={12} md={9}>
           <h1 className="nombreCard">{this.state.nombrePaciente} {this.state.apellidoPaciente}</h1>
              <p className="p-card"> <strong className="strongCard">Tel: </strong> {this.state.telefonoPaciente} <strong className="strongCard"> Mail:</strong> {this.state.emailPaciente}</p>
             
              </Col>
              <Col  className="continfo" xs={12}  md={3}>
              <p className="p-card"> <strong  className="strongCard">IMC:</strong> { Math.round(this.state.datosPersonalesPaciente.peso / Math.pow(this.state.datosPersonalesPaciente.estatura, 2)) }% <strong className="strongCard"> Edad: {this.state.datosPersonalesPaciente.edad}</strong>  <strong className="strongCard">Estatura:</strong>{this.state.datosPersonalesPaciente.estatura} <strong className="strongCard">Peso Actual:</strong>{this.state.datosPersonalesPaciente.peso} <strong className="strongCard">Dieta:</strong>Sin Asignar </p>
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
        value={Math.round(this.state.datosPersonalesPaciente.peso / Math.pow(this.state.datosPersonalesPaciente.estatura, 2)) }/>
         </row>
         </Col>
         </Col>
         </div>

          {/*******     TAB PERFIL 2 */}     
      <div className={this.state.tabActivo2}>
         <div className="tittleHistorialMedico">
           <h4>Historial Clinico</h4>
         </div>
        <Grid className="gridHistorial">
          <Row className="show-grid">
            <Col xs={12} md={6}>
            <h5 className="tittleHistorial">Enfermedades Recientes</h5>
                <div className="cardPerfil">
                <Grid className="chipsPerfil">
                <Row>
                  {
                   this.state.historialMedicoPaciente
                   ? this.state.historialMedicoPaciente.enfermedadActual.map(element => {
                     return( <Col className="labelHistorial"><Label className="enfermedadActual"> {element}</Label></Col> )
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
                   {
                   this.state.historialMedicoPaciente
                   ? this.state.historialMedicoPaciente.enfermedadesFamiliares.map(element => {
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
            
                  {this.state.desayunoHorario}
                  </div>
                <div className="cardPerfil-desayuno">
                  
                  <p>{this.state.desayunoAlimento} con {this.state.desayunoBebida}</p>
                </div>
                </Col>
            <Col xs={12} md={4}>
            <h5 className="tittleHistorial">Comida</h5>
            <div className="horaHistorial-comida">
            {this.state.comidaHorario}
            </div>
          <div className="cardPerfil-desayuno">
            
            <p>{this.state.comidaAlimento} con {this.state.comidaBebida}</p>
          </div></Col>
              <Col xs={12} md={4}>
            <h5 className="tittleHistorial">Cena</h5>
            <div className="horaHistorial-cena">
                  {this.state.cenaHorario}
                  </div>
                <div className="cardPerfil-desayuno">
                  <p>{this.state.cenaAlimento} con {this.state.cenaBebida}</p>
                </div>
              </Col>
          </Row>
        </Grid>
         </div>
         </Modal.Body>
        </Modal>
  <Row className="show-grid">
   <SideNav />
    <Col xs={12} md={10}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row className="clearfix">
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first"> <Users  className="ic" size={20} /> Pacientes</NavItem>
      </Nav>
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
      
        <NavItem eventKey="second"> <Clipboard className="ic" size={20} />Dietas</NavItem>
      </Nav>
      
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
      
        <NavItem eventKey="tercera"><BookOpen className="ic" size={20} />Recetas</NavItem>
      </Nav>
      
    </Col>
    <Col xs={4} md={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="cuarta"><Award className="ic" size={20} />  Premios</NavItem>
      </Nav>
      
    </Col>
    <Col xs={12} md={11}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">
        <FormGroup className="search">
        <InputGroup bsSize="large">
         <InputGroup.Addon><Search color="#FF7500" className="ic" size={20} /></InputGroup.Addon>
          <FormControl type="text" />
          </InputGroup>
          </FormGroup>
          <div>
          <div>
            
          { !!users && (
            <div><Row className="show-grid">
             {Object.keys(users).map( key =>
              
           <Col xs={12} md={4}>
           <Thumbnail className="card">
           <Image src={users[key].urlPic.img}  className="img-card-cliente" circle thumbnail />
           <h3>{users[key].nombre} {users[key].apellido}</h3>
            <p><Phone className="ic" size={15} /> {users[key].telefono}</p>
            <h4> "{users[key].datospersonales.meta}"</h4>
            <p>
          <Button onClick={()=>this.handleShow(
             users[key].nombre,
             users[key].apellido, 
             users[key].datospersonales, 
             users[key].historialmedico, 
             users[key].urlPic, 
             users[key].email, users[key].telefono,
             users[key].dietaHabitual.desayuno.horario,
             users[key].dietaHabitual.desayuno.alimento,
             users[key].dietaHabitual.desayuno.bebida,
             users[key].dietaHabitual.comida.horario,
             users[key].dietaHabitual.comida.alimento,
             users[key].dietaHabitual.comida.bebida, 
             users[key].dietaHabitual.cena.horario,
             users[key].dietaHabitual.cena.alimento,
             users[key].dietaHabitual.cena.bebida, 
             )} bsStyle="primary"><User className="ic" size={20} /></Button>
          &nbsp;
          <Button className="btn-green"><MessageCircle className="ic" size={20} /></Button>
          &nbsp;
          <Button className="btn-orange" bsStyle="default">Consultar</Button>
        </p>
         
      </Thumbnail>
           
        
          </Col>
            )}  </Row>
     </div>
    ) }
        
     </div>

        </div>
  


        
        </Tab.Pane>
        <Tab.Pane eventKey="second">
   

      <Grid> 
        <Row>
       <FormGroup className="search">
       <Col  className="crearDieta" xs={12} md={1}>
          <InputGroup bsSize="large">
         <Button onClick={this.mostrarDieta} className="btn-primary">Crear Dieta</Button>
          </InputGroup>
          </Col>
         <Col xs={12} md={8}>
        <InputGroup bsSize="large">
         <InputGroup.Addon><Search color="#FF7500" className="ic" size={20} /></InputGroup.Addon>
          <FormControl type="text" />
          </InputGroup>
          </Col>
         
          </FormGroup>
          </Row>
          </Grid>  
        </Tab.Pane>
        <Tab.Pane eventKey="tercera">Tab 3 content</Tab.Pane>
        <Tab.Pane eventKey="cuarta">Tab 3 content</Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>


 
    </Col>
  </Row>

  
  </Grid>
  
  </div>
      ) 
   
    
   
  }
}


const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(Consultorio);