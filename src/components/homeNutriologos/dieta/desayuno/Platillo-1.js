import React, {Component} from 'react'
import { Col,FormGroup, FormControl,Button} from 'react-bootstrap'
import { Plus,Trash2, PlusCircle} from 'react-feather'

class Platillo1Desayuno extends Component{

    render(){
        const platillo1array = this.props.arrayPlatillo 
        const alimentosFiltro = this.props.alimentosFiltro
        return(
            <div>
                         <div onClick={this.props.activar} className={this.props.clase}> 
                         <h3 className="titleAgregarDieta"><Plus className="icoAgregarDieta" size={100} /><br/>Agregar Platillo</h3>                     
                        </div>
                         <div className="platillo1">
                         <FormGroup bsSize="large">
                         <FormControl value={this.props.nombre} onBlur={(e)=>this.props.nombrePlatillo(e.target.value)} className="formTittlePlatillo" type="text" placeholder="Nombre del platillo." />
                         </FormGroup>
                         <FormControl type="text" placeholder="Escribe el nombre del equivalente" onInput={this.props.busqueda}/>
                         
                         <div className="siMostrar">
                         { this.props.cargador == true
                            ?<div><img src="https://loading.io/spinners/message/index.messenger-typing-preloader.svg"></img></div>
                            :<div></div>
                         }
                        
                         { !!alimentosFiltro && (
                            Object.keys(alimentosFiltro).map((alimento) => (
                              <div onClick={()=>this.props.mostrarAlimento(
                                alimentosFiltro[alimento].alimento,
                                alimentosFiltro[alimento].tipo,
                                alimentosFiltro[alimento].unidad,
                                alimentosFiltro[alimento].energiaKCal,
                                alimentosFiltro[alimento].clase,
                                alimentosFiltro[alimento].pesoNetoGrm,
                                alimentosFiltro[alimento].cantidad,
                                alimentosFiltro[alimento].lipidosGrm ?alimentosFiltro[alimento].lipidosGrm:"0",
                                alimentosFiltro[alimento].proteinaGrm ?alimentosFiltro[alimento].proteinaGrm:"0",
                                alimentosFiltro[alimento].sodioMGrm?alimentosFiltro[alimento].sodioMGrm:"0",
                                alimentosFiltro[alimento].hidratosCarbonoGrm?alimentosFiltro[alimento].hidratosCarbonoGrm:"0"   
                               )} className="resultadoAlimentosBusqueda">

                               {
                                alimentosFiltro[alimento].tipo
                                ?null
                                :<h1>Cargando..</h1>
                               }
                           <Col className="colSugerenciaAlimentos" md="3">{ alimentosFiltro[alimento].tipo}</Col>
                              <Col className="colSugerenciaAlimentos" md="7">{alimentosFiltro[alimento].alimento}</Col>
                               <Col className="colSugerenciaAlimentos" md="1"><Button bsSize="xsmall" bsStyle="success"><PlusCircle  className="ic" size={15} /></Button></Col>
                         </div>
                            ))
                          )
                          } 
                         </div>  
                             <h3>Alimentos:</h3>
                              <Col className="colSeleccionAlimentosProTitle" md="2">Nombre</Col>
                              <Col className="colSeleccionAlimentosTitle" md="1">Eq</Col>
                              <Col className="colSeleccionAlimentosTitle" md="2">Grupo</Col>
                              <Col className="colSeleccionAlimentosTitle" md="2">Unidad</Col>
                              <Col className="colSeleccionAlimentosTitle" md="2">Cantidad</Col>
                              <Col className="colSeleccionAlimentosTitle" md="2">Gramos</Col>
                              <Col className="colSeleccionAlimentosTitle" md="2">Borrar</Col>
                                { !!platillo1array && (
                            Object.keys(platillo1array).map((alimento) => (
                              <div className="alimentosYaSeleccionados">
    
                              <Col className="colSeleccionAlimentosPro" md="2">{platillo1array[alimento].nombre}</Col>
                              <Col className="colSeleccionAlimentos" md="1">
                              <FormGroup bsSize="sm"><FormControl  placeholder="1" onChange={(e)=>this.props.Eq(e.target.value, platillo1array[alimento].ref)} type="number" />
                              </FormGroup></Col>
                              <Col className="colSeleccionAlimentos" md="2">{platillo1array[alimento].categoria}</Col>
                              <Col className="colSeleccionAlimentos" md="2">{platillo1array[alimento].unidad}</Col>
                              <Col className="colSeleccionAlimentos" md="2">{parseInt(platillo1array[alimento].cantidad) * platillo1array[alimento].eq}</Col>
                              <Col className="colSeleccionAlimentos" md="2">{platillo1array[alimento].gramos * platillo1array[alimento].eq }</Col>
                              <Col className="colSeleccionAlimentos" md="2"> 
                              <Button onClick={()=>this.props.borrar(platillo1array[alimento].ref)} bsSize="xsmall" bsStyle="danger">
                              <Trash2  className="ic" size={15} /></Button></Col>
                              </div>
                            ))
                          )} 
                    </div> 
            </div>
        )
    }
}

export default Platillo1Desayuno