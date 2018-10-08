import React, { Component } from 'react'
import withAutorization from '../withAutorization';
import './../App.css';
import { db, auth } from './../../firebase'
import { authfb } from './../../firebase/firebase'
import {
    Link,
    withRouter,
  } from 'react-router-dom'
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, FieldGroup, ControlLabel, InputGroup} from 'react-bootstrap'
import * as routes from '../../constants/routes'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

const FormCompletarPerfil = ({ history }) =>

     <div>
     <Grid class="ungrid">
  <Row className="show-grid">
  <h1>¡Casi esta listo para cambiar tu vida! Completa tu perfil</h1>
  <h4>Esto ayudara a tu nutriologo a atenderte mejor</h4>
    <Col xs={12} md={12}>
    <ActualizarPerfilForm history={history} />
    </Col>
    
  </Row> 
</Grid>
     </div>
     
const INITIAL_STATE = {
    anoNacimiento:'',
    diaNacimiento:'',
    mesNacimiento:'',
    peso:'',
    estatura:'',
    meta:'',
    paso1:'paso1visible',
    paso2:'paso2invisible',
    paso3:'paso3invisible',
    step1:'step-activado',
    counter1:'step-counter-activado',
    line1:'line-activado',
    step2:'step-desactivado',
    counter2:'step-counter-desactivado',
    line2:'line-desactivado',
    step3:'step-desactivado',
    counter3:'step-counter-desactivado',
    line3:'line-desactivado',
    
    error: null,
    user:null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  



  
class ActualizarPerfilForm extends Component {
 
        constructor(props) {
          super(props);
          this.state = { ...INITIAL_STATE };
        }
        componentDidMount() {
            
          }
        handleChange(date) {
            this.setState({
              startDate: date
            });
          }
        onSubmit = (event) => {
            const uid = authfb.currentUser.uid;
            const {
                anoNacimiento,
                diaNacimiento,
                mesNacimiento,
                peso,
                estatura,
                meta
              } = this.state;
              const {
                history,
              } = this.props;
  
              db.actualizarPerfil(uid,anoNacimiento,diaNacimiento, mesNacimiento, peso, estatura, meta )
              .then(() => {
              this.setState({ ...INITIAL_STATE });
              this.setState({
                paso1:'paso1invisible',
                paso2:'paso2visible',
                paso2mark:'pasomarkactivado',
                step2:'step-activado',
                counter2:'step-counter-activado',
                line2:'line-activado',
              }
                  
              )
             
                   })
              .catch(error => {
              this.setState(byPropKey('error', error));
              });
                event.preventDefault();
          
        }
      
        render() {

            const {
                anoNacimiento,
                diaNacimiento,
                mesNacimiento,
                peso,
                estatura,
                meta,
                error
              } = this.state;
              const isInvalid =
              mesNacimiento === '' ||
              diaNacimiento === '' ||
              anoNacimiento === '' 
              peso === '';
              estatura === '';  
              meta === '';    
          return (
            <div>
            <Grid className="gridgrid">
            <Row>
            <Col className="col-paso" xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step1}><h3 className={this.state.counter1}>1</h3></div>
            <div className={this.state.line1}> </div>
            </div>
            <p>Datos personales</p>
            </Col>
            <Col  className="col-paso"  xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step2}><h3 className={this.state.counter2}>2</h3></div>
            <div className={this.state.line2}> </div>
            </div>
            <p>Datos personales</p>
            </Col>
            <Col  className="col-paso"  xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step3}><h3 className={this.state.counter3}>3</h3></div>
            <div className="line-3"></div>
            </div>
            <p>Datos personales</p>
            </Col> 
            </Row>
            
            </Grid>
            <form className={this.state.paso1} onSubmit={this.onSubmit}>
                <Grid>
                    <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6}>
            <h2 className="row-paso">Escribe tu siguiente informacion personal:</h2>
            <div className="optionContainer">
                <h1>hola</h1>
            <Col  xs={12} md={2}>
           <select
          className="uninput"
          value={diaNacimiento}
          onChange={event => this.setState(byPropKey('diaNacimiento', event.target.value))}
          type="text"
          placeholder="Dia de Nacimiento"
            >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            </select>
            </Col>
            <Col xs={12} md={2}>    
            <select
            className="uninput"
          value={mesNacimiento}
          onChange={event => this.setState(byPropKey('mesNacimiento', event.target.value))}
          type="text"
          placeholder="Mes de Nacimiento">
        <option>Enero</option>
        <option>Febrero</option>
        <option>Marzo</option>
        <option>Abril</option>
        <option>Mayo</option>
        <option>Junio</option>
        <option>Julio</option>
        <option>Agosto</option>
        <option>Septiembre</option>
        <option>Octubre</option>
        <option>Noviembre</option>
        <option>Diciembre</option>
        </select>
            </Col>
            <Col  xs={12} md={2}>
            <select
            className="uninput"
          value={anoNacimiento}
          onChange={event => this.setState(byPropKey('anoNacimiento', event.target.value))}
          type="text"
          placeholder="Año de Nacimiento"
            ><option value="2018">2018</option>
    <option value="2017">2017</option>
    <option value="2016">2016</option>
    <option value="2015">2015</option>
    <option value="2014">2014</option>
    <option value="2013">2013</option>
    <option value="2012">2012</option>
    <option value="2011">2011</option>
    <option value="2010">2010</option>
    <option value="2009">2009</option>
    <option value="2008">2008</option>
    <option value="2007">2007</option>
    <option value="2006">2006</option>
    <option value="2005">2005</option>
    <option value="2004">2004</option>
    <option value="2003">2003</option>
    <option value="2002">2002</option>
    <option value="2001">2001</option>
    <option value="2000">2000</option>
    <option value="1999">1999</option>
    <option value="1998">1998</option>
    <option value="1997">1997</option>
    <option value="1996">1996</option>
    <option value="1995">1995</option>
    <option value="1994">1994</option>
    <option value="1993">1993</option>
    <option value="1992">1992</option>
    <option value="1991">1991</option>
    <option value="1990">1990</option>
    <option value="1989">1989</option>
    <option value="1988">1988</option>
    <option value="1987">1987</option>
    <option value="1986">1986</option>
    <option value="1985">1985</option>
    <option value="1984">1984</option>
    <option value="1983">1983</option>
    <option value="1982">1982</option>
    <option value="1981">1981</option>
    <option value="1980">1980</option>
    <option value="1979">1979</option>
    <option value="1978">1978</option>
    <option value="1977">1977</option>
    <option value="1976">1976</option>
    <option value="1975">1975</option>
    <option value="1974">1974</option>
    <option value="1973">1973</option>
    <option value="1972">1972</option>
    <option value="1971">1971</option>
    <option value="1970">1970</option>
    <option value="1969">1969</option>
    <option value="1968">1968</option>
    <option value="1967">1967</option>
    <option value="1966">1966</option>
    <option value="1965">1965</option>
    <option value="1964">1964</option>
    <option value="1963">1963</option>
    <option value="1962">1962</option>
    <option value="1961">1961</option>
    <option value="1960">1960</option>
    <option value="1959">1959</option>
    <option value="1958">1958</option>
    <option value="1957">1957</option>
    <option value="1956">1956</option>
    <option value="1955">1955</option>
    <option value="1954">1954</option>
    <option value="1953">1953</option>
    <option value="1952">1952</option>
    <option value="1951">1951</option>
    <option value="1950">1950</option>
    <option value="1949">1949</option>
    <option value="1948">1948</option>
    <option value="1947">1947</option>
    <option value="1946">1946</option>
    <option value="1945">1945</option>
    <option value="1944">1944</option>
    <option value="1943">1943</option>
    <option value="1942">1942</option>
    <option value="1941">1941</option>
    <option value="1940">1940</option>
    <option value="1939">1939</option>
    <option value="1938">1938</option>
    <option value="1937">1937</option>
    <option value="1936">1936</option>
    <option value="1935">1935</option>
    <option value="1934">1934</option>
    <option value="1933">1933</option>
    <option value="1932">1932</option>
    <option value="1931">1931</option>
    <option value="1930">1930</option>
    <option value="1929">1929</option>
    <option value="1928">1928</option>
    <option value="1927">1927</option>
    <option value="1926">1926</option>
    <option value="1925">1925</option>
    <option value="1924">1924</option>
    <option value="1923">1923</option>
    <option value="1922">1922</option>
    <option value="1921">1921</option>
    <option value="1920">1920</option>
    <option value="1919">1919</option>
    <option value="1918">1918</option>
    <option value="1917">1917</option>
    <option value="1916">1916</option>
    <option value="1915">1915</option>
    <option value="1914">1914</option>
    <option value="1913">1913</option>
    <option value="1912">1912</option>
    <option value="1911">1911</option>
    <option value="1910">1910</option>
    <option value="1909">1909</option>
    <option value="1908">1908</option>
    <option value="1907">1907</option>
    <option value="1906">1906</option>
    <option value="1905">1905</option></select> 
             </Col>
             </div>
            <Col  xs={12} md={12}>
             <input
          value={peso}
          onChange={event => this.setState(byPropKey('peso', event.target.value))}
          type="text"
          placeholder="Tu Peso"
            />
            </Col>
            <Col xs={12} md={12}>
             <input
             className="input-form"
          value={estatura}
          onChange={event => this.setState(byPropKey('estatura', event.target.value))}
          type="text"
          placeholder="Tu estatura"
            />
            </Col>
            <Col xs={12} md={12}>
            <input
          value={meta}
          onChange={event => this.setState(byPropKey('meta', event.target.value))}
          type="text"
          placeholder="Tu Meta en Nutrired"
            />
          </Col>
        
          <Col xs={12} md={12}>
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
          </Col>
         { error && <p>{error.message}</p> }
         </Col>
         <Col xs={12} md={3}></Col>
         </Row>
         </Grid>
            </form>
            
            
            
          
            
            <form className={this.state.paso2} onSubmit={this.onSubmit}>
            <h2>Escribe tu siguiente informacion personal:</h2>
       <input
          value={diaNacimiento}
          onChange={event => this.setState(byPropKey('diaNacimiento', event.target.value))}
          type="text"
          placeholder="Dia de Nacimiento"
            />

 
      <input
          value={mesNacimiento}
          onChange={event => this.setState(byPropKey('mesNacimiento', event.target.value))}
          type="text"
          placeholder="Mes de Nacimiento"
        />
  
       <input
          value={anoNacimiento}
          onChange={event => this.setState(byPropKey('anoNacimiento', event.target.value))}
          type="text"
          placeholder="Año de Nacimiento"
            />
       
       <input
          value={peso}
          onChange={event => this.setState(byPropKey('peso', event.target.value))}
          type="text"
          placeholder="Tu Peso"
            />
       <input
          value={estatura}
          onChange={event => this.setState(byPropKey('estatura', event.target.value))}
          type="text"
          placeholder="Tu estatura"
            />
            <input
          value={meta}
          onChange={event => this.setState(byPropKey('meta', event.target.value))}
          type="text"
          placeholder="Tu Meta en Nutrired"
            />
       
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        { error && <p>{error.message}</p> }
            </form>
            
            
            
            
            
            
            </div>
          );
        }
      }

      const authCondition = (authUser) => !!authUser;      
export default withAutorization(authCondition)(FormCompletarPerfil);
//export default withRouter(FormCompletarPerfil);
export {
    ActualizarPerfilForm

  };