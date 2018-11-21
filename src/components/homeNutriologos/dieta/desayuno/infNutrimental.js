import React, {Component} from 'react'
import { Col,FormGroup, FormControl,Button} from 'react-bootstrap'
import { Plus,Trash2, PlusCircle} from 'react-feather'


class TablaNutrimentalDesayuno extends Component{
    render(){
        const sumar = this.props.sumaKcal
        const sumatoria = this.props.suma

        return(
            <div>
            <Col md="4">
                    <div className="contenedorNutrimentos">
                       <div className="tituloInfo">
                           <h3 className="h4Title">Información Nutrimental del desayuno</h3>
                           <p>Tamaño por porcion: </p>
                           </div>
                  
                      <div className="kcalinfo">
                           <h4>Calorías: {sumar}Kcal.</h4>
                      </div> 
                      <div className="info">
                           <p>Total Lipidos: {sumatoria}</p>
                      </div> 
                      <div className="info">
                           <p>Proteína: {sumatoria}</p>
                      </div>
                      <div className="info">
                           <p>Sodio, Na: {sumatoria}</p>
                      </div>  

                    
                      </div> 
                    </Col>


            </div>
        )
    }
    


}

export default TablaNutrimentalDesayuno