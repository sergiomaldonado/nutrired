import React, { Component } from 'react';
import { Grid, Button, Row, Col, ProgressBar, FormControl, Image} from 'react-bootstrap'
import Imagen from '../imagen.png'
import {storage, authfb, dbfb} from '../../firebase/firebase'
import {db} from '../../firebase'
import './../App.css';


class FotoPaciente extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            loader: 0,
            imagen:null,
            porcentaje:"%"
        }
    }

    subidaDeimagen (event) {
        const file = event.target.files[0];
        const storageRef = storage.ref(`usersPics/${file.name}`);
        const task = storageRef.put(file);
        const uid = authfb.currentUser.uid;
        task.on('state_changed', (snapshot) => {
          let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.setState({
            loader: porcentaje
          })
         
        }, (error) => {
          console.error(error.message)
        }, () => {

                 storage.ref('usersPics').child(file.name).getDownloadURL().then(url => {
               
                this.setState({url});
                const img = this.state.url
               
                dbfb.ref(`users/pacientes/${uid}/urlPic/`).set({
                  img
                });
            })
           
          
    
            
          

         {/** this.setState({
            imagen: task.snapshot.downloadURL
          }) **/}
    
        })
      }
  render(){
   return(
      <div>
      {this.state.loader === 0
          ? <div></div>
          :  <Image className="imagenMuestra" src={this.state.url} circle />
        }
       
        {this.state.loader === 0
          ? <FormControl className="buttonPic" type="file" onChange={this.subidaDeimagen.bind(this)}>
            
          </FormControl>
          :  <div></div>
        }
       
        {this.state.loader === 0
          ? <div></div>
          : <ProgressBar bsStyle="success" label={Math.round(this.state.loader)} now={this.state.loader} />
        }
       

      </div>
   )
     
  }
}

export default FotoPaciente