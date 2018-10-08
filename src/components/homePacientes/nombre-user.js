import React, { Component } from 'react';
import withAutorization from '../withAutorization';
import { db, auth } from '../../firebase/firebase';


class NombreUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    const uid = auth.currentUser.uid;
    db.ref(`users/pacientes/${uid}`).on('value', snapshot => {
      this.setState({
        user: snapshot.val()
      })
    })
  }
  render() {
    if(this.state.user){
      const  {nombre, apellido} = this.state.user;
      return(<p> {nombre} {apellido} </p>)
    }else{
      return null
    }
    
  }
}


const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(NombreUser);