import React, { Component } from 'react'
import withAutorization from '../withAutorization';
import './../App.css';
import { db } from './../../firebase'
import { authfb, dbfb } from './../../firebase/firebase'
import {
    Link,
    withRouter,
  } from 'react-router-dom'
import { Grid, Row, Col, HelpBlock, Button, Form, FormGroup, FormControl, FieldGroup, ControlLabel, InputGroup} from 'react-bootstrap'
import * as routes from '../../constants/routes'
import Select from 'react-select'
import Chips from 'react-chips'

const antecedentesFamiliares  = [ 
  { label: "Hipertencion", value: 1 },
  { label: "Diabetes", value: 2 },
  { label: "Cancer", value: 3 },
  { label: "Infartos", value: 4 },
  { label: "Embolia", value: 4 },
  { label: "Obesidad", value: 4 },
  { label: "Problemas de Tiroides", value: 4 },
  { label: "Otras enfermedades cardiacas", value: 5 },
  { label: "Enfermedad renal", value: 6 },
];
const enfermedadesSugeridas = [
  "Alergia al polen","Alzheimer","Asma","Caida de cabello",
  "Cáncer","Cancer","Cistitis","Diabetes","Disfuncion eréctil","Dolor de cabeza",
  "Dolor de espalda","Enfermedad Coronaria","Parkinson","EPOC","Gripe",
  "Hernia discal","Herpes zóster","Hipertención","Hipertiroidismo","Ictus","Infarto de miocardio",
  "Migraña","Obesidad","Osteoporosis","Psoriasis","Resfriado","Intestino irritable",
  "Sudoración","VPH","Depresión","Desmayos o mareos","Diarrea","Dolor de oído",
  "Estreñimiento","Hemorroides","Colesterol elevado","Hongos en la unñas","Juanetes",
  "Gripe","Paralisis facial","Piel seca","Reflujo","Resfriado","Ronquidos",
  "Sangre en la orina","Daño renal","Sinusitis","Varises","Vertigo","Vomito","Bronquitis","Asma","Acne"
];

const FormCompletarPerfil = ({ history }) =>

     <div>
     <Grid>
  <Row className="show-grid ungrid">
  
  <h1>Casi estas listo para cambiar tu vida.</h1>
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
    sexo:'',
    peso:'',
    estatura:'',
    meta:'',
    paso1:'paso1visible',
    paso2:'paso2invisible',
    paso3:'paso2invisible',
    step1:'step-activado',
    counter1:'step-counter-activado',
    line1:'line-activado',
    step2:'step-desactivado',
    step3:'step-desactivado',
    counter2:'step-counter-desactivado',
    line2:'line-desactivado',
    step3:'step-desactivado',
    counter3:'step-counter-desactivado',
    line3:'line-desactivado',
    value:"",
    error: null,
    user:null,
    enfermedadActual: [],
    desayunoHorario:'',
    desayunoAlimento:'',
    desayunoComida:'',
    cenaHorario:'',
    cenaAlimento:'',
    cenaComida:'',
    cenaHorario:'',
    cenaAlimento:'',
    cenaComida:''
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  

class ActualizarPerfilForm extends Component {
 
        constructor(props) {
          super(props);
          this.state = { ...INITIAL_STATE };
          this.handleChange = this.handleChange.bind(this)
        }
        onChangeSelectChips = enfermedadesFamiliares => {
          this.setState({
            enfermedadesFamiliares
          });
          enfermedadesFamiliares.forEach( enfermedadesFamiliares => 
            false
          )
        }
        onChangeChips = enfermedadActual => {
          this.setState({ enfermedadActual });
        }
        componentDidMount() {
            
          }
        handleChange(date) {
            this.setState({
              startDate: date
            });
          }
        enviarDatosPersonales = (event) => {
            const uid = authfb.currentUser.uid;
            const {
                selectedOptions,
                anoNacimiento,
                diaNacimiento,
                mesNacimiento,
                sexo,
                peso,
                estatura,
                meta
              } = this.state;
              const {
                history,
              } = this.props;
  
              db.actualizarPerfil(uid,anoNacimiento,diaNacimiento, mesNacimiento, sexo, peso, estatura, meta )
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

        enviarHistorialMedico = (event) => {
          const uid = authfb.currentUser.uid;
          const {
             enfermedadesFamiliares,
             enfermedadActual,
             medicamentos,
             cirujia,
             ejercicio,
             cigarro,
             alcohol,
             suplementos
            } = this.state;
            const {
              history,
            } = this.props;

            db.actualizarHistorialMedico(uid,enfermedadesFamiliares, enfermedadActual, medicamentos, cirujia, ejercicio, cigarro, alcohol, suplementos )
            .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.setState({
              paso1:'paso1invisible',
              paso2:'paso2invisible',
              paso3:'paso2visible',
              paso2mark:'pasomarkactivado',
              step2:'step-activado',
              counter2:'step-counter-activado',
              line2:'line-activado',
              paso3mark:'pasomarkactivado',
              step3:'step-activado',
              counter3:'step-counter-activado',
              line3:'line-activado',
            }
            )
                 })
            .catch(error => {
            this.setState(byPropKey('error', error));
            });
              event.preventDefault();
      }
     
      enviarDietaHabitual= (event) => {
       const uid = authfb.currentUser.uid;
       const horarioDesayuno = this.state.desayunoHorario
       const alimentoDesayuno  = this.state.desayunoAlimento
       const  bebidaDesayuno = this.state.desayunoBebida
       const horarioComida = this.state.comidaHorario
       const alimentoComida = this.state.comidaAlimento
       const bebidaComida = this.state.comidaBebida
       const horarioCena = this.state.cenaHorario
       const alimentoCena = this.state.cenaAlimento
       const bebidaCena = this.state.cenaBebida
        const {
            history,
          } = this.props;

          const img = "https://firebasestorage.googleapis.com/v0/b/nutrired-cf271.appspot.com/o/usersPics%2Fpp.png?alt=media&token=e155910a-51bf-4c91-be3e-d9a1cebdbccd"
          console.log(uid)
          dbfb.ref(`users/pacientes/${uid}/urlPic/`).set({
          img
          });
          db.actualizarDietaHabitual(uid, horarioDesayuno, alimentoDesayuno, bebidaDesayuno, horarioComida, alimentoComida, bebidaComida,  horarioCena, alimentoCena, bebidaCena)
          .then(() => {
          this.setState({ ...INITIAL_STATE });
          history.push(routes.ACCOUNT);
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
                sexo,
                peso,
                estatura,
                meta,
                medicamentos,
                cirujia,
                ejercicio,
                cigarro,
                alcohol,
                suplementos,
                desayunoHorario,
                desayunoAlimento,
                desayunoBebida,
                comidaHorario,
                comidaAlimento,
                comidaBebida, 
                cenaHorario,
                cenaAlimento, 
                cenaBebida,
                error
              } = this.state;
              const isInvalid =
              mesNacimiento === '' ||
              diaNacimiento === '' ||
              anoNacimiento === '' || 
              sexo === ''||
              peso == ''||
              estatura === '' ||
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
            <p className="tittle-step">Datos personales</p>
            </Col>
            <Col  className="col-paso"  xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step2}><h3 className={this.state.counter2}>2</h3></div>
            <div className={this.state.line2}></div>
            </div>
            <p className="tittle-step2">Historial Medico</p>
            </Col>
            <Col  className="col-paso"  xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step3}><h3 className={this.state.counter3}>3</h3></div>
            <div className="line-3"></div>
            </div>
            <p className="tittle-step2">Dieta Habitual</p>
            </Col> 
            </Row>
            </Grid>
            <Grid className="formulario1">
              <Row>
              <Col  xs={12} md={3}></Col>
              <Col  xs={12} md={6}>

{/********************** STEP 1 ***********************************/ }
            <form inline className={this.state.paso1} onSubmit={this.enviarDatosPersonales}>
            <FormGroup controlId="formBasicText">
          <ControlLabel></ControlLabel>
          <ControlLabel>Escribe tu fecha de nacimiento:</ControlLabel>
          <div className="control-form">
              <div className="select-1">
              <FormControl inline componentClass="select" placeholder="Dia de Nacimiento" value={diaNacimiento}  onChange={event => this.setState(byPropKey('diaNacimiento', event.target.value))}>
              <option>Dia</option>
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
          </FormControl>
              </div>
              <div className="select-1">
              <FormControl inline componentClass="select" placeholder="Mes de Naciemiento" value={mesNacimiento}  onChange={event => this.setState(byPropKey('mesNacimiento', event.target.value))}>
              <option>Mes</option>
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
          </FormControl>
              </div>
              <div className="select-1">
              <FormControl inline componentClass="select" placeholder="Año de Naciemiento" value={anoNacimiento}  onChange={event => this.setState(byPropKey('anoNacimiento', event.target.value))}>
              <option value="2018">2018</option>
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
    <option value="1905">1905</option>
          </FormControl>
              </div>
            </div>
               <div className="control-form">
               <div className="input-1">
              <ControlLabel>Sexo</ControlLabel>
              <FormControl inline componentClass="select" placeholder="Sexo" value={sexo} 
               onChange={event => this.setState(byPropKey('sexo', event.target.value))}>
              <option>Hombre</option>
              <option>Mujer</option>
              </FormControl>
              </div>

              <div className="input-1">
              <ControlLabel>Peso en Kilos</ControlLabel>
              <FormControl  placeholder="Ejemplo: 94" value={peso} 
               onChange={event => this.setState(byPropKey('peso', event.target.value))}>
              </FormControl>
              </div>
              <div className="input-1">
              <ControlLabel>Estatura en en Metros</ControlLabel>
              <FormControl  placeholder="Ejemplo: 1.70" value={estatura} 
               onChange={event => this.setState(byPropKey('estatura', event.target.value))}>
              </FormControl>
              </div>
            </div>
            <div className="control-form">
            <div className="textarea-1">
            <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Comparte cual es tu meta o razon por la cual uniste.</ControlLabel>
            <FormControl
            value={meta}
            onChange={event => this.setState(byPropKey('meta', event.target.value))}
            type="text" 
            componentClass="textarea" 
            placeholder='"Quiero bajar de peso para mejorar mi calidad de vida"' />
            </FormGroup>
            </div>
            </div>
            <div className="control-form">
            <div className="button-1">
            <Button className="btn-primary" lg disabled={isInvalid} type="submit">Siguiente</Button>
            </div>
            </div>
            </FormGroup>
            </form>
 
{/**********************  STEP 2 ***********************************/ }

  <form inline className={this.state.paso2}  onSubmit={this.enviarHistorialMedico}>
            <FormGroup controlId="formBasicText">
          <ControlLabel></ControlLabel>
          <ControlLabel>¿Actualmente tienes alguna enfermedad?</ControlLabel>
          <div className="control-form">
            <div className="multiselect-1">
            <Chips
          value={this.state.enfermedadActual}
          onChange={this.onChangeChips}
          suggestions={enfermedadesSugeridas}
          placeholder='Escribe una enfermedad' 
          /> 
            </div>
            </div>
            <div className="control-form">
            <div>
            <ControlLabel>¿Tienes familiares cercanos con alguna de las siguies enfermedades?</ControlLabel>
            <Select isMulti 
               options={antecedentesFamiliares} 
              onChange={this.onChangeSelectChips}
              value={this.state.enfermedadesFamiliares}
              placeholder='Puedes seleccionar más de una enfermedad' 
              className="multiselect-1"
            />
            </div> </div>
            <div className="control-form">
           
            <div className="input-3">
              <ControlLabel>Cirujias</ControlLabel>
              <FormControl  placeholder="Ejemplo: Cirujia de Apendice 23/02/17" value={cirujia} 
               onChange={event => this.setState(byPropKey('cirujia', event.target.value))}>
              </FormControl>
              </div>
              <div className="input-3">
              <ControlLabel>Medicamentos</ControlLabel>
              <FormControl  placeholder="Ejemplo: Miccil 1 cada 24hrs" value={medicamentos} 
               onChange={event => this.setState(byPropKey('medicamentos', event.target.value))}>
              </FormControl>
              </div> </div>

              <div className="control-form">
              <div className="input-4">
              <ControlLabel>Actividad Fisica</ControlLabel>
              <FormControl inline componentClass="select" placeholder="Menciona la candidad de ejercicio" value={ejercicio} 
               onChange={event => this.setState(byPropKey('ejercicio', event.target.value))}>
               <option>--</option>
              <option>Nunca hago ejercicio, el del tareas del hogar</option>
              <option>Nunca hago ejercicio, trabajo sentado todo el dia</option>
              <option>Nunca hago ejercicio, tengo un trabajo pesado</option>
              <option>1 o 2 dias a la semana</option>
              <option>Regularmente hago ejercicio 3 a 4 dias por semana</option>
              <option>Ejercicio diario por una hora</option>
              <option>Ejercicio diario por 2 horas o más</option>
              </FormControl>
              </div>
              <div className="input-4">
              <ControlLabel>Alcohol</ControlLabel>
              <FormControl inline componentClass="select" placeholder="Sexo" value={alcohol} 
               onChange={event => this.setState(byPropKey('alcohol', event.target.value))}>
               <option>--</option>
              <option>No consumo alcohol</option>
              <option>Cervesa una vez por semana</option>
              <option>Vodka una vez por semana</option>
              <option>Vino tinto una vez por semana</option>
              <option>Cervesa mas de una vez por semana</option>
              <option>Vodka mas de una vez por semana</option>
              <option>Vino mas de tinto una vez por semana</option>
              </FormControl>
              </div>
              <div className="input-4">
              <ControlLabel>Cigarro</ControlLabel>
              <FormControl inline componentClass="select" placeholder="Sexo" value={cigarro} 
               onChange={event => this.setState(byPropKey('cigarro', event.target.value))}>
               <option>--</option>
              <option>No fumo</option>
              <option>Uno diario</option>
              <option>Solo los fines de semana</option>
              <option>Una cajetilla por semana</option>
              <option>Dos o mas cajetillas por semana</option>
              </FormControl>
              </div>
              </div>
              <div className="control-form">
              <div className="textarea-2">
              
              <ControlLabel>Menciona si tomas suplementos alimenticios</ControlLabel>
              <FormControl
             value={suplementos}
             onChange={event => this.setState(byPropKey('suplementos', event.target.value))}
            type="text" 
            componentClass="textarea" 
            placeholder='Tipo/Dosis/Frecuencia' />
            </div></div>
            <div className="control-form">
            <div className="button-1">
            <Button className="btn-primary"  lg type="submit">Siguiente</Button>
            </div>
            </div>
            </FormGroup>
            </form>
{/**********************  STEP 3 ***********************************/ }
  <form inline className={this.state.paso3}  onSubmit={this.enviarDietaHabitual}>
            <FormGroup controlId="formBasicText">
            <ControlLabel>Desayuno o Almuerzo</ControlLabel>
            <div className="control-form-dieta">
            <div className="input-dieta-1">
            <ControlLabel>Horario</ControlLabel>
            <FormControl  placeholder="Ejemplo: 7:00 AM" value={desayunoHorario} 
               onChange={event => this.setState(byPropKey('desayunoHorario', event.target.value))}>
              </FormControl>
            </div> 
            <div className="input-dieta-1">
            <ControlLabel>Alimentos</ControlLabel>
            <FormControl  placeholder="Ejemplo: Pan con mantequilla" value={desayunoAlimento} 
               onChange={event => this.setState(byPropKey('desayunoAlimento', event.target.value))}>
              </FormControl>
            </div>
            <div className="input-dieta-1">
            <ControlLabel>Bebida</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={desayunoBebida} 
               onChange={event => this.setState(byPropKey('desayunoBebida', event.target.value))}>
              </FormControl>
            </div>
            
            </div>  
            <hr/>
            <ControlLabel className="comida">Comida</ControlLabel>
            <div className="control-form-dieta">
            <div className="input-dieta-1">
            <ControlLabel>Horario</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={comidaHorario} 
               onChange={event => this.setState(byPropKey('comidaHorario', event.target.value))}>
              </FormControl>
            </div> 
            <div className="input-dieta-1">
            <ControlLabel>Alimentos</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={comidaAlimento} 
               onChange={event => this.setState(byPropKey('comidaAlimento', event.target.value))}>
              </FormControl>
            </div>
            <div className="input-dieta-1">
            <ControlLabel>Bebida</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={comidaBebida} 
               onChange={event => this.setState(byPropKey('comidaBebida', event.target.value))}>
              </FormControl>
            </div>
            </div> 
            <hr/>
            <ControlLabel className="comida">Cena</ControlLabel>
            <div className="control-form-dieta">
            <div className="input-dieta-1">
            <ControlLabel>Horario</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={cenaHorario} 
               onChange={event => this.setState(byPropKey('cenaHorario', event.target.value))}>
              </FormControl>
            </div> 
            <div className="input-dieta-1">
            <ControlLabel>Alimentos</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={cenaAlimento} 
               onChange={event => this.setState(byPropKey('cenaAlimento', event.target.value))}>
              </FormControl>
            </div>
            <div className="input-dieta-1">
            <ControlLabel>Bebida</ControlLabel>
            <FormControl  placeholder="Ejemplo: Café o refesco" value={cenaBebida} 
               onChange={event => this.setState(byPropKey('cenaBebida', event.target.value))}>
              </FormControl>
            </div>
            </div> 

            
            <div className="control-form">
            <div className="button-1">
            <Button className="btn-primary"  lg type="submit">Finalizar</Button>
            </div>
            </div>
            </FormGroup>
            </form>
            </Col>
            <Col  xs={12} md={3}></Col>
            </Row>
            </Grid>
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