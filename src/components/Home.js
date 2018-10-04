import React, { Component } from 'react'
import withAutorization from './withAutorization'
import Consultorio from './homeNutriologos/consultorio'

class HomePage extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {

      return(
         <div>
          <Consultorio></Consultorio>
        </div>
   

      )
   
    
   
  }
}


const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(HomePage);