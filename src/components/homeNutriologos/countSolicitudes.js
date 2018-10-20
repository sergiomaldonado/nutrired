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
            this.setState({
              contador: numero
            })
        }else{
            
            this.setState({
                contador: 0
              })
        }
    }) 
   }
  componentDidMount() {    
     this.contador()
      }


  render() {
       
        return (
            this.state.contador === 0 
            ? null      
            : <Badge className="notificacion-numero">{this.state.contador}</Badge> 
            
            )
           }     
  }
export default CountSolicitudes;