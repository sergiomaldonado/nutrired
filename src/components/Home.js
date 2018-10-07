import React, { Component } from 'react'
import withAutorization from './withAutorization'
import Consultorio from './homeNutriologos/consultorio'
import ComunidadPacientes from './homePacientes/comunidadUsers'
import { db, auth } from '../firebase/firebase'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      nutriologo: null

    };
    
  }

  componentDidMount() {

        const uid = auth.currentUser.uid;
        db.ref('users/nutriologos/').child(uid).on('value', snapshot => {
          const exists = (snapshot.val() !== null);
          console.log(exists)
          this.setState({
            nutriologo: exists
          });
        })      
  } 
  render() {

    return this.state.nutriologo === true
      ?<Consultorio />
      :<ComunidadPacientes />

  
  
           }     
  }



const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(HomePage);