import React, { Component } from 'react'
import {authfb, dbfb} from './../../firebase/firebase'
import {Badge} from 'react-bootstrap';

class CountSolicitudes extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        contador: 0
    };
  }
contador = () =>{
   
    const uid = authfb.currentUser.uid
    dbfb.ref(`users/nutriologos/${uid}/solicitudes`).on('value', snapshot => {
        if( snapshot.val() !== null ){
            const numero = Object.keys(snapshot.val()).length 
            this.state = {
              contador: numero
            }
        }else{
            return false
        }
    }) 
   }
  componentWillMount() {    
     this.contador()
      }
      shouldComponentUpdate(){
        this.contador()
      } 

  render() {
        return(
            <Badge className="notificacion-numero">{this.state.contador}</Badge>        
            )
           }     
  }
export default CountSolicitudes;