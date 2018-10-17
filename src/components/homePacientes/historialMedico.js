
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
    })
    
  }
  render() {
    if(this.state.historial){
       
        const  {alcohol, enfermedadActual} = this.state.historial;
        return(
          
            <div>
           
           <h1>{alcohol}</h1>
           <ul>
           <li>{enfermedadActual}</li>
           </ul>
           </div>            
       
        )
      }else{
        return null
      }
   
    
          
      
  }
}
export default HMedico;
