import React, { Component } from 'react'
import withAutorization from '../withAutorization';
import './../App.css';
import { db, auth } from './../../firebase'
import { authfb } from './../../firebase/firebase'
import {
    Link,
    withRouter,
  } from 'react-router-dom'
import { Grid, Row, Col, HelpBlock, Button, Form, FormGroup, FormControl, FieldGroup, ControlLabel, InputGroup} from 'react-bootstrap'
import * as routes from '../../constants/routes'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Select from 'react-select'
import Chips from 'react-chips'

const enfermedadesSugeridas = [
    { label: "Alligators", value: 1 },
    { label: "Crocodiles", value: 2 },
    { label: "Sharks", value: 3 },
    { label: "Small crocodiles", value: 4 },
    { label: "Smallest crocodiles", value: 5 },
    { label: "Snakes", value: 6 },
  ];
  const antecedentesFamiliaries = ["hola","hik",];
  
  

class FormStep2 extends Component{
  
    render(){

        return(

<form inline  onSubmit={this.enviarHistoriaMedico}>
            <FormGroup controlId="formBasicText">
          <ControlLabel></ControlLabel>
          <ControlLabel>¿Tienes familiares cercanos con alguna de las siguies enfermedades?</ControlLabel>
          <div className="control-form">
            <div className="multiselect-1">
            <Chips
          value={this.state.chips}
          onChange={this.onChangeChips}
          suggestions={enfermedadesSugeridas}
          placeholder='Puedes seleccionar más de una enfermedad' 
        />
            
            </div>
            </div>
            <div className="control-form">
            <div className="multiselect-1">
            <Select isMulti 
               options={antecedentesFamiliaries} 
              onChange={this.onChangeSelectChips}
              value={this.state.enfermedadesSelect}
              placeholder='Puedes seleccionar más de una enfermedad' 
            />
            </div>
            </div>
         
            
            <div className="control-form">
            <div className="button-1">
            <Button className="btn-primary" lg type="submit">Siguiente</Button>
            </div>
            </div>
            </FormGroup>
            </form>
        )

    }
   


}

export default FormStep2