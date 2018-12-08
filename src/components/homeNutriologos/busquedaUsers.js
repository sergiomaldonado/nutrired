import React, {Component} from 'react'
import {InputGroup,Row, Grid, FormControl, FormGroup, Col, Button, Alert} from 'react-bootstrap'
import {debounce} from 'lodash'
import { dbfb, authfb } from '../../firebase/firebase'

import {Search, PlusCircle} from 'react-feather'

 class BusquedaUsuarios extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    filter: Object.keys(this.props.array).map(key=>this.props.array[key])
    }
  }
filtrarUsuario = (e) => {
    const users = Object.keys(this.props.array).map(key=>this.props.array[key])
    console.log(users)
    this.setState({cargando:true})
    let filter = users.filter((user) => {
    return user.nombre.toLowerCase().includes(e.target.value)
    });
    this.setState({filter, cargando:false })
    console.log(filter)
}
asignarDietaAUnPaciente = (idPaciente, nombre, apellido) => {
  const idDieta = this.props.dietaEnProceso
  const uid = authfb.currentUser.uid
  dbfb.ref(`users/pacientes/${idPaciente}/dietaAsignada/`).set({
    idDieta
  })
  dbfb.ref(`users/nutriologos/${uid}/dietas/${idDieta}/usuariosAsignados`).push({
    idPaciente
  })
  this.props.notificacion(nombre, apellido)
}
notificacionUsuarioAgregado = (nombre) => {
}
  render() {
    const users = this.state.filter
    return (
      <div>
      
          <InputGroup bsSize="large">
          <InputGroup.Addon><Search color="#FF7500" className="ic" size={20} /></InputGroup.Addon>
          <FormControl onChange={this.filtrarUsuario}  type="text" placeholder="Escribe el nombre del paciente" />
          </InputGroup>  
                      <div>
                                <Grid className="gridShowUsers">
                                 <Row>          
                                  { !!users && (
                                  Object.keys(users).map((key) => (
                                  <div>
                                  <Col className="colUser" md="6">

                                   <div className="containerResultUserDieta">
                                  
                                     <div className="containerButtonAsignarDieta">
                                      <Button onClick={()=>this.asignarDietaAUnPaciente(users[key].pacienteId, users[key].nombre, users[key].apellido)} className="primary-button">Asignar Dieta</Button>
                                    </div>
                                    <Col md="2"><img className="imgResultadoUserDieta" src={users[key].urlPic.img}></img></Col>
                                    <Col md="10"><h4 className="textNameUserDieta">{ users[key].nombre} {users[key].apellido}</h4></Col>

                                  </div>
                                  
                                  </Col>
                                  </div>
                         
                                  ))
                                  )
                          }   </Row>
                                </Grid>
                               
                              </div>
                         </div>  
    
    )
  }
}
export default BusquedaUsuarios