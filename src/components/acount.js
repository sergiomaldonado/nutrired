import React, { Component } from 'react';
import './App.css';
import UserProfile from './homePacientes/userProfile'
import { db, auth } from '../firebase/firebase'


class Acount extends Component {

    constructor(props){
        super(props);
       this.state = {
           nutriologo:null
       }
    }

    componentDidMount(){
        const uid = auth.currentUser.uid;
        db.ref('users/nutriologos/').child(uid).on('value', snapshot => {
          const exists = (snapshot.val() !== null);
          console.log(exists)
          this.setState({
            nutriologo: exists
          });
        }) 
    }
    render(){
        return this.state.nutriologo === true
             ? <h1>soy nutriologo</h1>
             : <UserProfile />
        

    }



}

 

export default Acount;