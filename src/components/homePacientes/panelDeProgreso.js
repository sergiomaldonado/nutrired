import React, { Component } from 'react';
import { } from 'react-feather'
import { Grid, Label, Row, Col} from 'react-bootstrap'
import { db, auth } from '../../firebase/firebase';
import 'react-input-range/lib/css/index.css';
import BarChart from './graficas/BarChart.js'

class PanelDeProgreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [12, 5, 6, 6, 9, 10],
        width: 700,
        height: 500,
        id: root
      }
  }
  componentDidMount() {
    
    
  }
  render() {

        return(
          
            <div>
            <div className="card-cliente">

         <div className="tittleHistorialMedico">
             
           <h4>Indice de Masa Corporal</h4>
          
       </div>
       <BarChart />
         </div>
           </div>            
       
        )
   
    
          
      
  }
}
export default PanelDeProgreso;
