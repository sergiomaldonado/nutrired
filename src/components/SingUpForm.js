import React, { Component } from 'react';
import './App.css';
import { auth, db } from './../firebase'
import {
    Link,
    withRouter,
  } from 'react-router-dom';
  import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>

     <div>
     <SignUpForm history={history} />
     <SignUpPaciente history={history} />
     </div>
     
const INITIAL_STATE = {
    nombre: '',
    apellido:'',
    email: '',
    telefono: '',
    matricula: '',
    pacientes:'',
    dietas:'',
    recetas:'',
    agenda:'',
    alertas:'',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  
  
class SignUpForm extends Component {
 
        constructor(props) {
          super(props);
          this.state = { ...INITIAL_STATE };
        }
      
        onSubmit = (event) => {
          const roll = "nutriologo"
            const {
                nombre,
                apellido,
                email,
                telefono,
                matricula,
                passwordOne,
                pacientes,
                dietas,
                recetas,
                agenda,
                alertas
              } = this.state;

              const {
                history,
              } = this.props;
          
              auth.doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
              
              db.doCreateUser(authUser.user.uid, nombre, apellido, email, telefono, matricula, pacientes, dietas, recetas, agenda, alertas, roll )
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
                })
                .catch(error => {
                  this.setState(byPropKey('error', error));
                });
          
              event.preventDefault();
      
        }
      
        render() {

            const {
                nombre,
                apellido,
                email,
                telefono,
                matricula,
                pacientes,
                dietas,
                recetas,
                agenda,
                alertas,
                passwordOne,
                passwordTwo,
                error,
              } = this.state;
              const isInvalid =
              passwordOne !== passwordTwo ||
              passwordOne === '' ||
              email === '' ||
              telefono === '' ||
              matricula === '' ||
              apellido === ''
              nombre === '';
           
            
          return (
            <form onSubmit={this.onSubmit}>
            <h1>Registrate como nutriologo</h1>
            <input
          value={nombre}
          onChange={event => this.setState(byPropKey('nombre', event.target.value))}
          type="text"
          placeholder="Nombre"
        />
        <input
          value={apellido}
          onChange={event => this.setState(byPropKey('apellido', event.target.value))}
          type="text"
          placeholder="Apellido"
        />
       
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Correo Electronico"
        />
        <input
          value={telefono}
          onChange={event => this.setState(byPropKey('telefono', event.target.value))}
          type="text"
          placeholder="Telefono"
        />
      
        <input
          value={matricula}
          onChange={event => this.setState(byPropKey('matricula', event.target.value))}
          type="text"
          placeholder="matricula"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
            </form>
          );
        }
      }

      class SignUpPaciente extends Component {
 
        constructor(props) {
          super(props);
          this.state = { ...INITIAL_STATE };
        }
      
        onSubmit = (event) => {
          const roll = "paciente"
            const {
                nombre,
                apellido,
                email,
                telefono,
                passwordOne,
    
              } = this.state;

              const {
                history,
              } = this.props;
          
              auth.doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
              
              db.doCreatePaciente(authUser.user.uid, nombre, apellido, email, telefono, roll )
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          history.push(routes.LANDING);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
                })
                .catch(error => {
                  this.setState(byPropKey('error', error));
                });
          
              event.preventDefault();
      
        }
      
        render() {

            const {
                nombre,
                apellido,
                email,
                telefono,
                passwordOne,
                passwordTwo,
                error,
              } = this.state;
              const isInvalid =
              passwordOne !== passwordTwo ||
              passwordOne === '' ||
              email === '' ||
              telefono === '' ||
              apellido === ''
              nombre === '';
           
            
          return (
            <form onSubmit={this.onSubmit}>
              <h1>Registrate como usuario</h1>
            <input
          value={nombre}
          onChange={event => this.setState(byPropKey('nombre', event.target.value))}
          type="text"
          placeholder="Nombre"
        />
        <input
          value={apellido}
          onChange={event => this.setState(byPropKey('apellido', event.target.value))}
          type="text"
          placeholder="Apellido"
        />
       
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Correo Electronico"
        />
        <input
          value={telefono}
          onChange={event => this.setState(byPropKey('telefono', event.target.value))}
          type="text"
          placeholder="Telefono"
        />
      
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
            </form>
          );
        }
      }
      
      const SignUpLink = () =>
        <p>
          Don't have an account?
          {' '}
          <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
      

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink,
  };