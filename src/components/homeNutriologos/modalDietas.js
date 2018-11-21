import React, { Component } from 'react'
import './../App.css'
import { db, auth } from './../../firebase'
import { authfb, dbfb } from './../../firebase/firebase'
import { Grid,Row, Tooltip, Col, OverlayTrigger, FormGroup, FormControl, Navbar,NavItem , Nav, Button} from 'react-bootstrap'
import { CheckCircle, Check, AlertCircle,Plus, ChevronDown, Trash2, ArrowRight, ArrowLeft, PlusCircle} from 'react-feather'
import Slider from 'react-rangeslider'
import './../rangeSlideStyles.css'
import ico1 from './icons/ico-1.svg'
import ico2 from './icons/ico-2.svg'
import ico3 from './icons/ico-3.svg'
import ico4 from './icons/ico-4.svg'
import ico5 from './icons/ico-5.svg'
import ico6 from './icons/ico-6.svg'
import ico7 from './icons/ico-7.svg'
import ico8 from './icons/ico-8.svg'
import ico9 from './icons/ico-9.svg'
import icoDesayuno from './icons/icoDesayuno.svg'
import icoDesayunoActivado from './icons/icoDesayuno-activado.svg'
import icoColacionActivado from './icons/icoColacion-activado.svg'
import icoColacion from './icons/icoColacion.svg'
import icoComida from './icons/icoComida.svg'
import icoCena from './icons/icoCena.svg'
import Chips from 'react-chips'
import CCG from './dbAlimentos/cerealesConGrasa.json'
import ListaDeAlimentos from './listaAlimentos'
import Platillo1Desayuno from './dieta/desayuno/Platillo-1'
import Platillo2Desayuno from './dieta/desayuno/Platillo-2'
import Platillo3Desayuno from './dieta/desayuno/Platillo-3'
import TablaNutrimentalDesayuno from './dieta/desayuno/infNutrimental' 
import {debounce} from 'lodash'
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
class ModalDietas extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        filter:{
            alimento:'',
            search:''
        },
        show:false,
        frutasValue: 0,
        verdurasValue:0,
        proteinasValue:0,
        grasasValue:0,
        lacteosValue:0,
        azucaresValue:0,
        cerealesValue:0,
        leguminosasValue:0,
        aguaValue:0,
        sumaPrueba:12,
        verdurasKcal:25,verdurasHCO:4,verdurasLip:0,verdurasProt:2,
        frutasKcal:60,frutasHCO:15,frutasLip:0,frutasProt:0,
        proteinasKcal:75, proteinasHCO:0, proteinasLip:5, proteinasProt:7,  /** AOA MAG */
        grasasKcal:45, grasasHCO:0, grasasLip:5, grasasProt:0, /** Aceites S/P */
        lacteosKcal:110, lacteosHCO:12, lacteosLip:4, lacteosProt:9,  /** leche semi descremada */
        azucaresKcal:40, azucaresHCO:10, azucaresLip:0, azucaresProt:0, /** Azucar S/G */
        cerealesKcal:60, cerealesHCO:15, cerealesLip:0, cerealesProt:0,  /** Cereales S/G **/
        leguminosasKcal:120, leguminosasHCO:20, leguminosasLip:1, leguminosasProt:8, /** Leguminosas **/
        aguaKcal:0, aguaHCO:0, aguaLip:0, aguaProt:0, /** Agua **/
        /** Valores de Tablero de resultados de meta  */
        metaKcalDieta: 0, metaLipDieta: null, metaHCODieta:null, metaProDieta:null,
        frutasDatoKcal:0,frutasDatoHCO:0,frutasDatoLip:0,frutasDatoPro:0,
        verdurasDatoKcal:0,verdurasDatoHCO:0,verdurasDatoLip:0,verdurasDatoPro:0,
        proteinasDatoKcal:0,proteinasDatoHCO:0,proteinasDatoLip:0,proteinasDatoPro:0,
        grasasDatoKcal:0,grasasDatoHCO:0,grasasDatoLip:0,grasasDatoPro:0,
        lacteosDatoKcal:0,lacteosDatoHCO:0,lacteosDatoLip:0,lacteosDatoPro:0,
        azucaresDatoKcal:0,azucaresDatoHCO:0,azucaresDatoLip:0,azucaresDatoPro:0,
        cerealesDatoKcal:0,cerealesDatoHCO:0,cerealesDatoLip:0,cerealesDatoPro:0,
        leguminosasDatoKcal:0,leguminosasDatoHCO:0,leguminosasDatoLip:0,leguminosasDatoPro:0,
        Kcalsumatoria:0,
        HCOsumatoria:0,
        Lipsumatoria:0,
        Prosumatoria:0,
        inputDisabled1:true,inputDisabled2:true,inputDisabled3:true,inputDisabled4:true,inputDisabled5:true,inputDisabled6:true,
        inputDisabled7:true,inputDisabled8:true,inputDisabled9:true,
        FrutasInputStyle:"frutasDesayunoInactivo",
        frutasDistribucion:0, frutaDesayunoValue:0, frutaColacion1Value:0,frutaComidaValue:0,frutaColacion2Value:0,frutaCenaValue:0,
        /**** VALORES INICIALES DE DISTRIBUCION  */
        DisfrutaDesayunoVal:0, DisfrutaColacion1Val:0, DisfrutaComidaVal:0, DisfrutaColacion2Val:0, DisfrutaCenaVal:0,
        DisVerdurasDesayunoVal:0, DisVerdurasColacion1Val:0, DisVerdurasComidaVal:0, DisVerdurasColacion2Val:0, DisVerdurasCenaVal:0,
        DisProteinasDesayunoVal:0, DisProteinasColacion1Val:0, DisProteinasComidaVal:0, DisProteinasColacion2Val:0, DisProteinasCenaVal:0,
        DisGrasasDesayunoVal:0, DisGrasasColacion1Val:0, DisGrasasComidaVal:0, DisGrasasColacion2Val:0, DisGrasasCenaVal:0,
        DisLacteosDesayunoVal:0, DisLacteosColacion1Val:0, DisLacteosComidaVal:0, DisLacteosColacion2Val:0, DisLacteosCenaVal:0,
        DisAzucaresDesayunoVal:0, DisAzucaresColacion1Val:0, DisAzucaresComidaVal:0, DisAzucaresColacion2Val:0, DisAzucaresCenaVal:0,
        DisCerealesDesayunoVal:0, DisCerealesColacion1Val:0, DisCerealesComidaVal:0, DisCerealesColacion2Val:0, DisCerealesCenaVal:0,
        DisLeguminosasDesayunoVal:0, DisLeguminosasColacion1Val:0, DisLeguminosasComidaVal:0, DisLeguminosasColacion2Val:0, DisLeguminosasCenaVal:0,
        DisAguaDesayunoVal:0, DisAguaColacion1Val:0, DisAguaComidaVal:0, DisAguaColacion2Val:0, DisAguaCenaVal:0,
        
     /** PASOS DIETA */
        paso1:'paso1visible',
        paso2:'paso2invisible',
        paso3:'paso2invisible',
        step1:'dieta-activado',
        counter1:'step-dieta-activado',
        line1:'line-activado',
        step2:'dieta-desactivado',
        step3:'dieta-desactivado',
        counter2:'step-counter-desactivado',
        line2:'line-desactivado',
        step3:'dieta-desactivado',
        counter3:'step-dieta-desactivado',
        line3:'line-desactivado',
        pasoUno:true,
        pasoDos:false,
        pasoTres:false,
        btnRegresar:"btnDisplayNone",
        users: [],
        filteredAlimento: [],
        mostrarAlimentos:'noMostrar',
        alimentosSeleccionados:{ 
        },
        idPlatillo:0,
        platillo1:'platillo-1-desactivado',
        platillo2:'platillo-2-desactivado',
        platillo3:'platillo-3-desactivado',
        mostrarPaso2:'mostrarPaso2',
         /*** Distribucion */
         desayunoDistribucion:{
             frutas:{clase:"1",  valor:5},
             verduras:0,
             proteinas:0,
             grasas:0,
             lacteos:0,
             azucares:0,
             cereales:0,
             leguminosas:0,
             agua:0,   
        },
        cargando:false,
        mostrar:"nohayquemostrar",
        mostrarPlatillo3:"nohayquemostrar",
        stepDesayuno:true,
        stepColacion1:false,
        stepComida:false,
        stepColacion2:false,
        stepCena:false,
        checkDesayuno:true,
        bottomNavDesayuno:true
    }
    
  
   /** this.handleOnFilter = this.handleOnFilter.bind(this)*/
  }
  activarPlatillo1desayuno = () =>{
      this.setState({
          platillo1:"platillo-1-activado",
          mostrar:'hayquemostrar'
      })
  }
  activarPlatillo2desayuno = () =>{
    this.setState({
        platillo2:"platillo-2-activado",
        platillo3:"platillo-3-desactivado",
        mostrarPlatillo3:"hayquemostrar"  
    })  
  }
  activarPlatillo3desayuno = () =>{
    this.setState({
        platillo3:"platillo-3-activado"
        
    })  

  }

setAlimentosPlatillo1 = debounce(query =>{
       let filteredAlimento = CCG.filter((alimento) => {
       return alimento.alimento.toLowerCase().includes(query)
       });
      query == ""
      ?this.setState({filteredAlimento:[], cargando:false })
      :this.setState({filteredAlimento, cargando:false })
},1000)

buscarPlatillo1Desayuno = (e) => {
       e.target.value == '' ?this.setState({filteredAlimento:[], cargando:false}) :null
       this.setState({cargando:true})
       this.setAlimentosPlatillo1(e.target.value.toLowerCase())
  }
  setAlimentosPlatillo1 = debounce(query =>{
    let filteredAlimento = CCG.filter((alimento) => {
    return alimento.alimento.toLowerCase().includes(query)
    });
   query == ""
   ?this.setState({filteredAlimento:[], cargando:false })
   :this.setState({filteredAlimento, cargando:false })
},1000)

  buscarPlatillo2Desayuno = (e) => {

       e.target.value == '' ?this.setState({filteredAlimento2:[], cargando2:false}) :null
       this.setState({cargando2:true})
       this.setAlimentosPlatillo2(e.target.value.toLowerCase())
}
setAlimentosPlatillo2 = debounce(query =>{
        let filteredAlimento2 = CCG.filter((alimento) => {
        return alimento.alimento.toLowerCase().includes(query)
        });
       query == ""
       ?this.setState({filteredAlimento2:[], cargando2:false })
       :this.setState({filteredAlimento2, cargando2:false })
},1000)

buscarPlatillo3Desayuno = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento3:[], cargando3:false}) :null
    this.setState({cargando3:true})
    this.setAlimentosPlatillo3(e.target.value.toLowerCase())
}
setAlimentosPlatillo3 = debounce(query =>{
    let filteredAlimento3 = CCG.filter((alimento) => {
    return alimento.alimento.toLowerCase().includes(query)
    });
   query == ""
   ?this.setState({filteredAlimento3:[], cargando3:false })
   :this.setState({filteredAlimento3, cargando3:false })
},1000)
 
  crearReceta = () => {
      const uid = authfb.currentUser.uid
      this.setState({pasoUno:false,pasoDos:true, clickPaso:this.crearReceta, btnRegresar:"siguienteStepDieta2"}) 
      const idRecetaEnProceso = this.props.idReceta
      const {metaKcalDieta, metaLipDieta, metaHCODieta, metaProDieta} = this.state
      const dietoCalculo = {
          frutas: {eq:this.state.frutasValue,Kcal:this.state.frutasDatoKcal, HCO:this.state.frutasDatoHCO,Lip:this.state.frutasDatoLip,Pro:this.state.frutasDatoPro, },
          verduras:{eq:this.state.verdurasValue, Kcal:this.state.verdurasDatoKcal, HCO:this.state.verdurasDatoHCO,Lip:this.state.verdurasDatoLip,Pro:this.state.verdurasDatoPro},
          proteinas:{eq:this.state.proteinasValue, Kcal:this.state.proteinasDatoKcal, HCO:this.state.proteinasDatoHCO,Lip:this.state.proteinasDatoLip,Pro:this.state.proteinasDatoPro },
          grasas:{eq:this.state.grasasValue, Kcal:this.state.grasasDatoKcal, HCO:this.state.grasasDatoHCO,Lip:this.state.grasasDatoLip,Pro:this.state.grasasDatoPro },
          lacteos:{eq:this.state.lacteosValue, Kcal:this.state.lacteosDatoKcal, HCO:this.state.lacteosDatoHCO,Lip:this.state.lacteosDatoLip,Pro:this.state.lacteosDatoPro },
          azucares:{eq:this.state.azucaresValue, Kcal:this.state.azucaresDatoKcal, HCO:this.state.azucaresDatoHCO,Lip:this.state.azucaresDatoLip,Pro:this.state.azucaresDatoPro },
          cereales:{eq:this.state.cerealesValue, Kcal:this.state.cerealesDatoKcal, HCO:this.state.cerealesDatoHCO,Lip:this.state.cerealesDatoLip,Pro:this.state.cerealesDatoPro },  
          leguminosas:{eq:this.state.leguminosasValue, Kcal:this.state.leguminosasDatoKcal, HCO:this.state.leguminosasDatoHCO,Lip:this.state.leguminosasDatoLip,Pro:this.state.leguminosasDatoPro },
          agua:{eq:this.state.aguaValue, Kcal:this.state.aguaKcal, HCO:this.state.aguaHCO,Lip:this.state.aguaLip,Pro:this.state.aguaProt },
        }
      db.dietoCalculoReceta(uid, idRecetaEnProceso, metaKcalDieta, metaLipDieta, metaHCODieta, metaProDieta, dietoCalculo)
}
  otrosDatosReceta = () => {
    this.setState({pasoDos:false,pasoTres:true, clickPaso:this.otrosDatosReceta})
    alert("mas Datos para receta") 
}
  pasoUno = () =>{
    this.state.pasoUno === true ? this.crearReceta() :null
    this.state.pasoDos === true ? this.otrosDatosReceta()  :null
}
  regresarSteps = () =>{
    this.state.pasoDos === true ?this.setState({pasoUno:true,pasoDos:false, btnRegresar:"btnDisplayNone"}) :null
    this.state.pasoTres === true ?this.setState({pasoDos:true,pasoTres:false}) :null
}
  frutasValue = (value) => { 
    this.setState({ 
       frutasValue: value,
       frutasDatoKcal: this.state.frutasValue === 0.5 ? this.state.frutasKcal / 2 : this.state.frutasValue * this.state.frutasKcal,
       frutasDatoHCO: this.state.frutasValue === 0.5 ? this.state.frutasHCO / 2 : this.state.frutasValue * this.state.frutasHCO,
       frutasDatoLip:this.state.frutasValue === 0.5 ? this.state.frutasLip / 2 : this.state.frutasValue * this.state.frutasLip,
       frutasDatoPro:this.state.frutasValue === 0.5 ? this.state.frutasProt / 2 : this.state.frutasValue * this.state.frutasProt,
       Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
       HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
       Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
       Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,
      })
      this.state.frutasValue <= 0
      ? this.setState({ inputDisabled1:true,FrutasInputStyle:"frutasDesayunoInactivo"}) 
      : this.setState({ inputDisabled1:false})
}
verdurasValue = (value) => { 
    this.setState({ 
        verdurasValue: value,
        verdurasDatoKcal: this.state.verdurasValue === 0.5 ? this.state.verdurasKcal / 2 : this.state.verdurasValue * this.state.verdurasKcal,
        verdurasDatoHCO:this.state.verdurasValue === 0.5 ? this.state.verdurasHCO / 2 : this.state.verdurasValue * this.state.verdurasHCO,
        verdurasDatoLip:this.state.verdurasValue === 0.5 ? this.state.verdurasLip / 2 : this.state.verdurasValue * this.state.verdurasLip,
        verdurasDatoPro:this.state.verdurasValue === 0.5 ? this.state.verdurasProt / 2 : this.state.verdurasValue * this.state.verdurasProt,
        Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
        HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
        Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
        Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,
      }) 
      this.state.verdurasValue <= 0
      ? this.setState({ inputDisabled2:true}) 
      : this.setState({ inputDisabled2:false})
}
  proteinasValue = (value) => { this.setState({ 
      proteinasValue: value,
      proteinasDatoKcal:  this.state.proteinasValue === 0.5 ? this.state.proteinasKcal / 2 : this.state.proteinasValue * this.state.proteinasKcal,
      proteinasDatoHCO:this.state.proteinasValue === 0.5 ? this.state.proteinasHCO / 2 : this.state.proteinasValue * this.state.proteinasHCO,
      proteinasDatoLip:this.state.proteinasValue === 0.5 ? this.state.proteinasLip / 2 : this.state.proteinasValue * this.state.proteinasLip,
      proteinasProt: this.state.proteinasValue === 0.5 ? this.state.proteinasProt / 2 : this.state.proteinasValue * this.state.proteinasProt,
      Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
      HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
      Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
      Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,
  })
  this.state.proteinasValue <= 0
      ? this.setState({ inputDisabled3:true}) 
      : this.setState({ inputDisabled3:false})
}
  grasasValue = (value) => { this.setState({ 
      grasasValue: value, 
      grasasDatoKcal: this.state.grasasValue === 0.5 ? this.state.grasasKcal / 2 : this.state.grasasValue * this.state.grasasKcal,
      grasasDatoHCO: this.state.grasasValue === 0.5 ? this.state.grasasHCO / 2 : this.state.grasasValue * this.state.grasasHCO,
      grasasDatoLip: this.state.grasasValue === 0.5 ? this.state.grasasLip / 2 : this.state.grasasValue * this.state.grasasLip,
      grasasDatoPro: this.state.grasasValue === 0.5 ? this.state.grasasProt / 2 : this.state.grasasValue * this.state.grasasProt,
      Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
      HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
      Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
      Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,
  }) 
  this.state.grasasValue <= 0
  ? this.setState({ inputDisabled4:true}) 
  : this.setState({ inputDisabled4:false})
}
  lacteosValue = (value) => { this.setState({ 
      lacteosValue: value,
      lacteosDatoKcal:this.state.lacteosValue === 0.5 ? this.state.lacteosKcal / 2 : this.state.lacteosValue * this.state.lacteosKcal,
      lacteosDatoHCO:this.state.lacteosValue === 0.5 ? this.state.lacteosHCO / 2 : this.state.lacteosValue * this.state.lacteosHCO,
      lacteosDatoLip:this.state.lacteosValue === 0.5 ? this.state.lacteosLip / 2 : this.state.lacteosValue * this.state.lacteosLip,
      lacteosDatoPro:this.state.lacteosValue === 0.5 ? this.state.lacteosProt / 2 : this.state.lacteosValue * this.state.lacteosProt,
      Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
      HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
      Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
      Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,
  })
  this.state.lacteosValue <= 0
  ? this.setState({ inputDisabled5:true}) 
  : this.setState({ inputDisabled5:false})
}
  azucaresValue = (value) => { this.setState({ 
      azucaresValue: value, 
      azucaresDatoKcal:this.state.azucaresValue === 0.5 ? this.state.azucaresKcal / 2 : this.state.azucaresValue * this.state.azucaresKcal,
      azucaresDatoHCO:this.state.azucaresValue === 0.5 ? this.state.azucaresHCO / 2 : this.state.azucaresValue * this.state.azucaresHCO,
      azucaresDatoLip:this.state.azucaresValue === 0.5 ? this.state.azucaresLip / 2 : this.state.azucaresValue * this.state.azucaresLip,
      azucaresDatoPro: this.state.azucaresValue === 0.5 ? this.state.azucaresProt / 2 : this.state.azucaresValue * this.state.azucaresProt,
      Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
      HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
      Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
      Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,    
  }) 
  this.state.azucaresValue <= 0
  ? this.setState({ inputDisabled6:true}) 
  : this.setState({ inputDisabled6:false})
}
  cerealesValue = (value) => { this.setState({ 
      cerealesValue: value,
       cerealesDatoKcal:this.state.cerealesValue === 0.5 ? this.state.cerealesKcal / 2 : this.state.cerealesValue * this.state.cerealesKcal,
       cerealesDatoHCO:this.state.cerealesValue === 0.5 ? this.state.cerealesHCO / 2 : this.state.cerealesValue * this.state.cerealesHCO,
       cerealesDatoLip:this.state.cerealesValue === 0.5 ? this.state.cerealesLip / 2 : this.state.cerealesValue * this.state.cerealesLip,
       cerealesDatoPro:this.state.cerealesValue === 0.5 ? this.state.cerealesProt / 2 : this.state.cerealesValue * this.state.cerealesProt,
       Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
       HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
       Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
       Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro,
  }) 
  this.state.cerealesValue <= 0
  ? this.setState({ inputDisabled7:true}) 
  : this.setState({ inputDisabled7:false})
}
  leguminosasValue = (value) => { this.setState({ 
      leguminosasValue: value,
      leguminosasDatoKcal:this.state.leguminosasValue === 0.5 ? this.state.leguminosasKcal / 2 : this.state.leguminosasValue * this.state.leguminosasKcal,
      leguminosasDatoHCO: this.state.leguminosasValue === 0.5 ? this.state.leguminosasHCO / 2 : this.state.leguminosasValue * this.state.leguminosasHCO,
      leguminosasDatoLip:this.state.leguminosasValue === 0.5 ? this.state.leguminosasLip / 2 : this.state.leguminosasValue * this.state.leguminosasLip,
      leguminosasDatoPro:this.state.leguminosasValue === 0.5 ? this.state.leguminosasProt / 2 : this.state.leguminosasValue * this.state.leguminosasProt,
      Kcalsumatoria: this.state.frutasDatoKcal + this.state.verdurasDatoKcal + this.state.proteinasDatoKcal + this.state.grasasDatoKcal + this.state.lacteosDatoKcal + this.state.azucaresDatoKcal + this.state.cerealesDatoKcal + this.state.leguminosasDatoKcal,
      HCOsumatoria: this.state.frutasDatoHCO + this.state.verdurasDatoHCO + this.state.proteinasDatoHCO + this.state.grasasDatoHCO + this.state.lacteosDatoHCO + this.state.azucaresDatoHCO + this.state.cerealesDatoHCO + this.state.leguminosasDatoHCO,
      Lipsumatoria: this.state.frutasDatoLip + this.state.verdurasDatoLip + this.state.proteinasDatoLip + this.state.grasasDatoLip + this.state.lacteosDatoLip + this.state.azucaresDatoLip + this.state.cerealesDatoLip + this.state.leguminosasDatoLip,
      Prosumatoria: this.state.frutasDatoPro + this.state.verdurasDatoPro + this.state.proteinasDatoPro + this.state.grasasDatoPro + this.state.lacteosDatoPro + this.state.azucaresDatoPro + this.state.cerealesDatoPro + this.state.leguminosasDatoPro, 
  }) 
  this.state.leguminosasValue <= 0
  ? this.setState({ inputDisabled8:true}) 
  : this.setState({ inputDisabled8:false})
}

  aguaValue = (value) => { 
      this.setState({ aguaValue: value }) 
      this.state.aguaValue <= 0
      ? this.setState({ inputDisabled9:true}) 
      : this.setState({ inputDisabled9:false})
  }
  agregarPlatillo = ()=>{
    this.setState({
        idPlatillo:2
    })
    alert(this.state.idPlatillo)
}
  mostrarAlimento = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo1/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo1/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo1array: snapshot.val()
            })
         })
    this.setState({filteredAlimento:[]})
  }
  fuera = () =>{
    this.setState({filteredAlimento:[],filteredAlimento2:[],filteredAlimento3:[] })
  }
  mostrarAlimento2 = (nombre, categoria, unidad, kcal,clase, grm, cantidad) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo2/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo2/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo2array: snapshot.val()
            })
         })
         this.setState({mostrarAlimentos2:'noMostrar'})      
  }
  mostrarAlimento3 = (nombre, categoria, unidad, kcal,clase, grm, cantidad) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo3/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo3/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo3array: snapshot.val()
            })
         })
         this.setState({mostrarAlimentos3:'noMostrar'})
  }
   enviarEq = (e, ref)=>{
       const uid = authfb.currentUser.uid
       const idRecetaEnProceso = this.props.idReceta
       const valor = e == "" ?0 :e
       dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo1/alimentos/${ref}/`).update({
         eq: parseInt(valor)
      });
   }
   enviarEq2 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo2/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEq3 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo3/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
   borrarAlimento = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo1/alimentos/${ref}/`).remove()
}
    borrarAlimento2 = (ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo2/alimentos/${ref}/`).remove()
}
borrarAlimento3 = (ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo3/alimentos/${ref}/`).remove()
}
   enviarNombre = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 1" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo1`).update({
      nombre: valor
   });
   }
   enviarNombre2 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 2" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo2`).update({
      nombre: valor
   });
   }
   enviarNombre3 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 2" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo3`).update({
      nombre: valor
   });
   }
   stepDieta1 = () =>{
    this.setState({
     stepDesayuno:true,
     stepColacion1:false,
     bottomNavDesayuno:true,
        bottomNavColacion1:false
    })
}
   stepDieta2 = () =>{
       this.setState({
        stepDesayuno:false,
        stepColacion1:true,
        checkColacion1:true,
        bottomNavDesayuno:false,
        bottomNavColacion1:true
       })
   }
/** Funciones Set de Valores de Tablero de resultados de meta  */
metaKcalDieta = (value) => { this.setState({ metaKcalDieta: value }) }
cerrarDieta = () =>{
    this.setState({
        show:true
    })
}
  render() { 
    const{ DisfrutaDesayunoVal, DisfrutaColacion1Val, DisfrutaComidaVal, DisfrutaColacion2Val, DisfrutaCenaVal,
        DisVerdurasDesayunoVal, DisVerdurasColacion1Val, DisVerdurasComidaVal, DisVerdurasColacion2Val, DisVerdurasCenaVal,
        DisProteinasDesayunoVal, DisProteinasColacion1Val, DisProteinasComidaVal, DisProteinasColacion2Val, DisProteinasCenaVal,
        DisGrasasDesayunoVal, DisGrasasColacion1Val, DisGrasasComidaVal, DisGrasasColacion2Val, DisGrasasCenaVal,
        DisLacteosDesayunoVal, DisLacteosColacion1Val, DisLacteosComidaVal, DisLacteosColacion2Val, DisLacteosCenaVal,
        DisAzucaresDesayunoVal, DisAzucaresColacion1Val, DisAzucaresComidaVal, DisAzucaresColacion2Val, DisAzucaresCenaVal,
        DisCerealesDesayunoVal, DisCerealesColacion1Val, DisCerealesComidaVal, DisCerealesColacion2Val, DisCerealesCenaVal,
        DisLeguminosasDesayunoVal, DisLeguminosasColacion1Val, DisLeguminosasComidaVal, DisLeguminosasColacion2Val, DisLeguminosasCenaVal,
        DisAguaDesayunoVal, DisAguaColacion1Val, DisAguaComidaVal, DisAguaColacion2Val, DisAguaCenaVal,} = this.state  
    
        const arrayPlatillo = this.state.platillo1array
        const arrayPlatillo2 = this.state.platillo2array
        const arrayPlatillo3 = this.state.platillo3array
    /** Indicadores Equivalentes Dieta */  
    /** Frutas */
    /** Platillo 1 */
    const DesayunoEqFrutas = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "7" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqFrutas = !! arrayPlatillo && DesayunoEqFrutas.reduce((a,b) => a + b)
    const DesayunoEqFrutas2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "7" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqFrutas2 = !! arrayPlatillo2 && DesayunoEqFrutas2.reduce((a,b) => a + b)
    const DesayunoEqFrutas3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "7" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqFrutas3 = !! arrayPlatillo3 && DesayunoEqFrutas3.reduce((a,b) => a + b)
    const totalEqDesayuno1 = sumDesayunoEqFrutas + sumDesayunoEqFrutas2 + sumDesayunoEqFrutas3
    const eqFrutas = parseInt(DisfrutaDesayunoVal) - totalEqDesayuno1
     /** Verduraz */
     const DesayunoEqVerduras = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "2" ?arrayPlatillo[key].eq:0)
     const sumDesayunoEqVerduras = !! arrayPlatillo && DesayunoEqVerduras.reduce((a,b) => a + b)
     const DesayunoEqVerduras2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "2" ?arrayPlatillo2[key].eq:0)
     const sumDesayunoEqVerduras2 = !! arrayPlatillo2 && DesayunoEqVerduras2.reduce((a,b) => a + b)
     const DesayunoEqVerduras3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "2" ?arrayPlatillo3[key].eq:0)
     const sumDesayunoEqVerduras3 = !! arrayPlatillo3 && DesayunoEqVerduras3.reduce((a,b) => a + b)
     const totalEqVerdurazDesayuno1 = sumDesayunoEqVerduras  + sumDesayunoEqVerduras2  + sumDesayunoEqVerduras3
     const eqVerduras = parseInt(DisVerdurasDesayunoVal) - totalEqVerdurazDesayuno1
      /** Proteinas */
      /** Platillo 1 */
      const DesayunoEqProteinas = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "6" ?arrayPlatillo[key].eq:0)
      const sumDesayunoEqProteinas = !! arrayPlatillo && DesayunoEqProteinas.reduce((a,b) => a + b)
      const DesayunoEqProteinas2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "6" ?arrayPlatillo2[key].eq:0)
      const sumDesayunoEqProteinas2 = !! arrayPlatillo2 && DesayunoEqProteinas2.reduce((a,b) => a + b)
      const DesayunoEqProteinas3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "6" ?arrayPlatillo3[key].eq:0)
      const sumDesayunoEqProteinas3 = !! arrayPlatillo3 && DesayunoEqProteinas3.reduce((a,b) => a + b)
      const totalEqProteinasDesayuno1 = sumDesayunoEqProteinas+sumDesayunoEqProteinas2+sumDesayunoEqProteinas3
      const eqProteinas = parseInt(DisProteinasDesayunoVal) - totalEqProteinasDesayuno1
      /** Cereales */
      /** Platillo 1 */
    const DesayunoEqCereales = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "1" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqCereales = !! arrayPlatillo && DesayunoEqCereales.reduce((a,b) => a + b)
    const DesayunoEqCereales2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "1" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqCereales2 = !! arrayPlatillo2 && DesayunoEqCereales2.reduce((a,b) => a + b)
    const DesayunoEqCereales3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "1" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqCereales3 = !! arrayPlatillo3 && DesayunoEqCereales3.reduce((a,b) => a + b)
    const totalEqCerealesDesayuno1 = sumDesayunoEqCereales + sumDesayunoEqCereales2 + sumDesayunoEqCereales3
    const eqCereales = parseInt(DisCerealesDesayunoVal) - totalEqCerealesDesayuno1
    /** Lacteos */
    const DesayunoEqLacteos = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "8" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqLacteos = !! arrayPlatillo && DesayunoEqLacteos.reduce((a,b) => a + b)
    const DesayunoEqLacteos2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "8" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqLacteos2 = !! arrayPlatillo2 && DesayunoEqLacteos2.reduce((a,b) => a + b)
    const DesayunoEqLacteos3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "8" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqLacteos3 = !! arrayPlatillo3 && DesayunoEqLacteos3.reduce((a,b) => a + b)
    const totalEqLacteosDesayuno1 = sumDesayunoEqLacteos+sumDesayunoEqLacteos2+sumDesayunoEqLacteos3
    const eqLacteos = parseInt(DisLacteosDesayunoVal) - totalEqLacteosDesayuno1
    /** Aceites y Grasas */
    const DesayunoEqGrasas = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "8" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqGrasas = !! arrayPlatillo && DesayunoEqGrasas.reduce((a,b) => a + b)
    const DesayunoEqGrasas2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "8" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqGrasas2 = !! arrayPlatillo2 && DesayunoEqGrasas2.reduce((a,b) => a + b)
    const DesayunoEqGrasas3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "8" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqGrasas3 = !! arrayPlatillo3 && DesayunoEqGrasas3.reduce((a,b) => a + b)
    const totalEqGrasasDesayuno1 = sumDesayunoEqGrasas+sumDesayunoEqGrasas2+sumDesayunoEqGrasas3
    const eqGrasas = parseInt(DisGrasasDesayunoVal) - totalEqGrasasDesayuno1
    /** Azucares */
    const DesayunoEqAzucares = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "5" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqAzucares = !! arrayPlatillo && DesayunoEqAzucares.reduce((a,b) => a + b)
    const DesayunoEqAzucares2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "5" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqAzucares2 = !! arrayPlatillo2 && DesayunoEqAzucares2.reduce((a,b) => a + b)
    const DesayunoEqAzucares3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "5" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqAzucares3 = !! arrayPlatillo3 && DesayunoEqAzucares3.reduce((a,b) => a + b)
    const totalEqAzucaresDesayuno1 = sumDesayunoEqAzucares+sumDesayunoEqAzucares2+sumDesayunoEqAzucares3
    const eqAzucares = parseInt(DisAzucaresDesayunoVal) - totalEqAzucaresDesayuno1
    /** Leguminosas */
    const DesayunoEqLeguminosas = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "3" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqLeguminosas = !! arrayPlatillo && DesayunoEqLeguminosas.reduce((a,b) => a + b)
    const DesayunoEqLeguminosas2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "3" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqLeguminosas2 = !! arrayPlatillo2 && DesayunoEqLeguminosas2.reduce((a,b) => a + b)
    const DesayunoEqLeguminosas3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "3" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqLeguminosas3 = !! arrayPlatillo3 && DesayunoEqLeguminosas3.reduce((a,b) => a + b)
    const totalEqLeguminosasDesayuno1 = sumDesayunoEqLeguminosas+sumDesayunoEqLeguminosas2+sumDesayunoEqLeguminosas3
    const eqLeguminosas = parseInt(DisLeguminosasDesayunoVal) - totalEqLeguminosasDesayuno1
    /** Leguminosas */
    const DesayunoEqAgua = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "9" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqAgua = !! arrayPlatillo && DesayunoEqAgua.reduce((a,b) => a + b)
    const DesayunoEqAgua2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "9" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqAgua2 = !! arrayPlatillo2 && DesayunoEqAgua2.reduce((a,b) => a + b)
    const DesayunoEqAgua3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "9" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqAgua3 = !! arrayPlatillo3 && DesayunoEqAgua3.reduce((a,b) => a + b)
    const totalEqAguaDesayuno1 = sumDesayunoEqAgua+sumDesayunoEqAgua2+sumDesayunoEqAgua3
    const eqAgua = parseInt(DisAguaDesayunoVal) - totalEqAguaDesayuno1
   
 
    const valido = eqFrutas <= -1 || eqVerduras <= -1 || eqProteinas <= -1 || eqCereales <= -1 || eqAzucares <= -1 || eqGrasas <= -1
                                  || eqLeguminosas <= -1 || eqAgua <= -1


    const obt = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> parseInt(arrayPlatillo[key].kcal) * arrayPlatillo[key].eq)
    const obt2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> parseInt(arrayPlatillo2[key].kcal) * arrayPlatillo2[key].eq)
    const obt3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> parseInt(arrayPlatillo3[key].kcal) * arrayPlatillo3[key].eq)


    const sumatoria = !! arrayPlatillo && obt.reduce((a,b) => a + b)
    const sumatoria2 = !! arrayPlatillo2 && obt2.reduce((a,b) => a + b)
    const sumatoria3 = !! arrayPlatillo3 && obt3.reduce((a,b) => a + b)

    const sumar = sumatoria + sumatoria2 + sumatoria3
    

    const {platillo1array, platillo2array, platillo3array, sumatoria1} = this.state
    const alimentosSeleccionados = this.state
    const alimentosFiltro = this.state.filteredAlimento
    const alimentosFiltro2 = this.state.filteredAlimento2
    const alimentosFiltro3 = this.state.filteredAlimento3
    const {enfermedadesFamiliares} = this.state
    

 const distribucionFrutas = parseInt(DisfrutaDesayunoVal) + parseInt(DisfrutaColacion1Val) + parseInt(DisfrutaComidaVal) + parseInt(DisfrutaColacion2Val) + parseInt(DisfrutaCenaVal)
 const distribucionVerduras = parseInt(DisVerdurasDesayunoVal) + parseInt(DisVerdurasColacion1Val) + parseInt(DisVerdurasComidaVal) + parseInt(DisVerdurasColacion2Val) + parseInt(DisVerdurasCenaVal)
 const distribucionProteinas = parseInt(DisProteinasDesayunoVal) + parseInt(DisProteinasColacion1Val) + parseInt(DisProteinasComidaVal) + parseInt(DisProteinasColacion2Val) + parseInt(DisProteinasCenaVal)
 const distribucionGrasas = parseInt(DisGrasasDesayunoVal) + parseInt(DisGrasasColacion1Val) + parseInt(DisGrasasComidaVal) + parseInt(DisGrasasColacion2Val) + parseInt(DisGrasasCenaVal)
 const distribucionLacteos = parseInt(DisLacteosDesayunoVal) + parseInt(DisLacteosColacion1Val) + parseInt(DisLacteosComidaVal) + parseInt(DisLacteosColacion2Val) + parseInt(DisLacteosCenaVal)
 const distribucionAzucares = parseInt(DisAzucaresDesayunoVal) + parseInt(DisAzucaresColacion1Val) + parseInt(DisAzucaresComidaVal) + parseInt(DisAzucaresColacion2Val) + parseInt(DisAzucaresCenaVal)
 const distribucionCereales = parseInt(DisCerealesDesayunoVal) + parseInt(DisCerealesColacion1Val) + parseInt(DisCerealesComidaVal) + parseInt(DisCerealesColacion2Val) + parseInt(DisCerealesCenaVal)
 const distribucionLeguminosas = parseInt(DisLeguminosasDesayunoVal) + parseInt(DisLeguminosasColacion1Val) + parseInt(DisLeguminosasComidaVal) + parseInt(DisLeguminosasColacion2Val) + parseInt(DisLeguminosasCenaVal)
 const distribucionAgua = parseInt(DisAguaDesayunoVal) + parseInt(DisAguaColacion1Val) + parseInt(DisAguaComidaVal) + parseInt(DisAguaColacion2Val) + parseInt(DisAguaCenaVal)
 const calculoGramosMetaHco = Math.round((this.state.metaKcalDieta * (this.state.metaHCODieta / 100)) / 4)
 const calculoGramosMetaLip =  Math.round((this.state.metaKcalDieta * (this.state.metaLipDieta / 100)) / 9)
 const calculoGramosMetaPro = Math.round((this.state.metaKcalDieta * (this.state.metaProDieta / 100)) / 4)
 
 const tooltip = (<Tooltip id="tooltip"><strong>1</strong></Tooltip>);

     return(
          <div>
        {
            this.props.mostrar === true
           ? 
            <div onClick={this.fuera} className="modalDietas">
            <div className="contenidoModalDietas">
            <Navbar fixedTop>
            <Button onClick={this.regresarSteps} className={`${this.state.btnRegresar} btn-primary`}> <ArrowLeft  className="ic" size={18} /></Button>
            <Grid className="gridStepsDietas">
            <Row>
            <Col className="col-paso" xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step1}><h6 className={this.state.counter1}>1</h6></div>
            <div className={this.state.line1}> </div>
            </div>       
            </Col>
            <Col  className="col-paso"  xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step2}><h6 className={this.state.counter2}>2</h6></div>
            <div className={this.state.line2}></div>
            </div>
            </Col>
            <Col  className="col-paso"  xs={3} md={4}>
            <div class="alineador">
            <div className={this.state.step3}><h6 className={this.state.counter3}>3</h6></div>
            <div className="line-3"><Button onClick={this.pasoUno} className="siguienteStepDieta btn-primary"> <ArrowRight  className="ic" size={18} /></Button></div>
            </div>
            </Col> 
            </Row>
            </Grid>
            </Navbar>
             { this.state.pasoUno === true 
             ?<div> 
                <div className="dietoCalculo">
                    
                    <div className="headDietasModal">
                        <h5 className="asignadoDieta">Asignada: Sergio Maldonado</h5>
                        <h4>Dieta alta en carbohidratos</h4>
                    </div>
                    <div className="dietasContainer">
                        <div className="dietaConfiguracion">
                        <Grid>
                            <Row>
                                <Col xs={12} md={2}><h3>Dieta</h3></Col>
                                <Col xs={12} md={2}> 
                                <p>Kcal<FormGroup><FormControl  onChange={event => this.setState({metaKcalDieta:event.target.value, metaHCODieta:60, metaLipDieta:25, metaProDieta:15})}  type="nunumber"  placeholder="2000"/></FormGroup></p>
                                </Col>
                                <Col xs={12} md={2}>                                                                                
                                <p>% HCO<FormGroup><FormControl value={this.state.metaHCODieta}   onChange={event => this.setState({metaHCODieta:event.target.value })} type="nunumber"  placeholder ="%"/></FormGroup></p> 
                                <p className="porcentajeKcal">{this.state.metaKcalDieta * (this.state.metaHCODieta / 100)} Kcal / {calculoGramosMetaHco} g  </p>
                                </Col>
                                <Col xs={12} md={2}> 
                                <p>% Lip<FormGroup><FormControl  value={this.state.metaLipDieta}  onChange={event => this.setState({metaLipDieta:event.target.value})} type="nunumber"  placeholder="%"/></FormGroup></p>
                                <p className="porcentajeKcal">{this.state.metaKcalDieta * (this.state.metaLipDieta / 100)} Kcal / {calculoGramosMetaLip} g  </p>
                               
                                </Col>
                                 <Col xs={12} md={2}> 
                                <p>% Pro<FormGroup><FormControl value={this.state.metaProDieta}  onChange={event => this.setState({metaProDieta:event.target.value})} type="nunumber"  placeholder ="%"/></FormGroup></p>
                                <p className="porcentajeKcal">{this.state.metaKcalDieta * (this.state.metaProDieta / 100)} Kcal / {calculoGramosMetaPro} g  </p>
                                </Col>
                            </Row>
                            </Grid>
                        </div>
                       
                        <Grid className="containerPanelDietas">
                        <div className="dietoTittle"><h3>Dieto Calculo <ChevronDown  className="ic" size={20} /></h3></div>
                        <div className="dietoTittle2"><h3>Distribución <ChevronDown  className="ic" size={20} /></h3></div>
                            <Row>
                                <Col className="containerPanelDietas"  xs={12} md={12}>
                                <Col className="uno">&nbsp;</Col>
                                <Col className="uno">&nbsp;</Col>
                                <Col className="cuatro">Eq</Col>
                                <Col className="cuatro">Kcal</Col>
                                <Col className="cuatro">HCO</Col>
                                <Col className="cuatro">Lip</Col>
                                <Col className="cuatro">Pro</Col>
                                <Col className="cuatro">&nbsp;</Col>
                                <Col className="tres">Desayuno</Col>
                                <Col className="dos">Colación 1</Col>
                                <Col className="tres">Comida</Col>
                                <Col className="dos">Colacion 2</Col>
                                <Col className="tres">Cena</Col>
       
                                {/*** COMEINZA DIETOCALCULO */}
                                <div className="dietoCalculo">
                                <Col className="uno">
                                <ul className="ulAlimentos">
                                      <li className="liUlAlimentos" >Frutas</li>
                                      <li className="liUlAlimentos" >Verduras</li>
                                      <li className="liUlAlimentos" >Proteinas</li>
                                      <li className="liUlAlimentos" >Grasas</li>
                                      <li className="liUlAlimentos" >Lacteos</li>
                                      <li className="liUlAlimentos" >Azucares</li>
                                      <li className="liUlAlimentos" >Cereales</li>
                                      <li className="liUlAlimentos" >Leguminosas</li>
                                      <li className="liUlAlimentos" >Agua</li>
                                </ul>
                                </Col>
                                <Col className="uno">
                                <ul className="ulRange">
                                      <li className="liUlAlimentos" >
                                        <Slider min={0} max={10} value={this.state.frutasValue} onChange={this.frutasValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.verdurasValue} onChange={this.verdurasValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.proteinasValue} onChange={this.proteinasValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.grasasValue} onChange={this.grasasValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.lacteosValue} onChange={this.lacteosValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.azucaresValue} onChange={this.azucaresValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.cerealesValue} onChange={this.cerealesValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.leguminosasValue} onChange={this.leguminosasValue} /></li>
                                      <li className="liUlAlimentos" ><Slider min={0} max={10} value={this.state.aguaValue} onChange={this.aguaValue} /></li>
                                  </ul>
                                </Col>
                                <Col className="cuatro">
                                <ul className="ulEq">
                                      <li className="liEq">{this.state.frutasValue}</li>
                                      <li className="liEq">{this.state.verdurasValue}</li>
                                      <li className="liEq">{this.state.proteinasValue}</li>
                                      <li className="liEq">{this.state.grasasValue}</li>
                                      <li className="liEq">{this.state.lacteosValue}</li>
                                      <li className="liEq">{this.state.azucaresValue}</li>
                                      <li className="liEq">{this.state.cerealesValue}</li>
                                      <li className="liEq">{this.state.leguminosasValue}</li>
                                      <li className="liEq">{this.state.aguaValue}</li>
                                </ul>
                                </Col>
                                {/**** KCAL */}
                                <Col className="cuatro">
                                <ul className="ulEq">
       
                                      <li className="liEq">{this.state.frutasDatoKcal}</li>
                                      <li className="liEq">{this.state.verdurasDatoKcal}</li>
                                      <li className="liEq">{this.state.proteinasDatoKcal}</li>
                                      <li className="liEq">{this.state.grasasDatoKcal}</li>
                                      <li className="liEq">{this.state.lacteosDatoKcal}</li>
                                      <li className="liEq">{this.state.azucaresDatoKcal}</li>
                                      <li className="liEq">{this.state.cerealesDatoKcal}</li>
                                      <li className="liEq">{this.state.leguminosasDatoKcal}</li>
                                      <li className="liEq">
                                      { this.state.aguaValue === 0.5 ? this.state.aguaKcal / 2 : this.state.aguaValue * this.state.aguaKcal} 
                                      </li>
                                </ul>
                         
                                </Col>
                                   {/**** HCO */}
                                   <Col className="cuatro">
                                <ul className="ulEq">
                                      <li className="liEq">
                                          {this.state.frutasDatoHCO}
                                       </li>
                                      <li className="liEq">
                                      { this.state.verdurasDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      {this.state.proteinasDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      {this.state.grasasDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      { this.state.lacteosDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      {this.state.azucaresDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      {this.state.cerealesDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      {this.state.leguminosasDatoHCO}
                                      </li>
                                      <li className="liEq">
                                      { this.state.aguaValue === 0.5 ? this.state.aguaHCO / 2 : this.state.aguaValue * this.state.aguaHCO}
                                      </li>
                                </ul>
                                </Col>
                                  {/**** LIP */}
                                <Col className="cuatro">
                                <ul className="ulEq">
                                      <li className="liEq">{this.state.frutasDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.verdurasDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.proteinasDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.grasasDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.lacteosDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.azucaresDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.cerealesDatoLip}
                                      </li>
                                      <li className="liEq">
                                      {this.state.leguminosasDatoLip}
                                      </li>
                                      <li className="liEq">
                                      { this.state.aguaValue === 0.5 ? this.state.aguaLip / 2 : this.state.aguaValue * this.state.aguaLip}
                                      </li>
                                </ul>
                           
                                </Col>
                                  
                                  {/**** PROT */}
                                <Col className="cuatro">
                                <ul className="ulEq">
                                      <li className="liEq"> 
                                     {this.state.frutasDatoPro}
                                      </li>
                                      <li className="liEq">
                                      {this.state.verdurasDatoPro}
                                      </li>
                                      <li className="liEq">
                                      {this.state.proteinasDatoPro}
                                      </li>
                                      <li className="liEq">
                                      {this.state.grasasDatoPro}
                                      </li>
                                      <li className="liEq">
                                      {this.state.lacteosDatoPro}
                                      </li>
                                      <li className="liEq">
                                      {this.state.azucaresProt}
                                      </li>
                                      <li className="liEq">
                                      {this.state.cerealesDatoPro}
                                      </li>
                                      <li className="liEq">
                                      {this.state.leguminosasDatoPro}
                                      </li>
                                      <li className="liEq">
                                      { this.state.aguaValue === 0.5 ? this.state.aguaProt / 2 : this.state.aguaValue * this.state.aguaProt}
                                      </li>
                                </ul>
                           
                                </Col>
                                <Col className="cuatro">
                                <ul className="ulEq">
                                      <li className="liEq"> 
                                          <img className="icon" src={ico1} />
                                      </li>
                                      
                                      <li className="liEq">
                                      <img className="icon" src={ico2} />
                                      </li>
                                      <li className="liEq">
                                      <img className="icon" src={ico3} />
                                      </li>
                                      <li className="liEq">
                                      <img className="icon" src={ico4} />
                                       </li>
                                      <li className="liEq">
                                      <img className="icon" src={ico5} />
                                      </li>
                                      <li className="liEq">
                                      <img className="icon" src={ico6} />
                                      </li>
                                      <li className="liEq">
                                      <img className="icon" src={ico7} />
                                       </li>
                                      <li className="liEq">
                                      <img className="icon" src={ico9} />
                                     </li>
                                     <li className="liEq">
                                      <img className="icon" src={ico8} />
                                     </li>
                                     
                                </ul>
                           
                                </Col>
                                </div>
       
                             {/** termina dieto calculo */}  
                                <Col className="tres">
                                <ul className="desayunoDieta">
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled1} value={DisfrutaDesayunoVal}  className={distribucionFrutas > this.state.frutasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisfrutaDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled2}value={DisVerdurasDesayunoVal}  className={distribucionVerduras > this.state.verdurasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisVerdurasDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled3}value={DisProteinasDesayunoVal}  className={distribucionProteinas > this.state.proteinasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisProteinasDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled4}value={DisGrasasDesayunoVal}  className={distribucionGrasas > this.state.grasasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisGrasasDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled5}value={DisLacteosDesayunoVal}  className={distribucionLacteos > this.state.lacteosValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLacteosDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled6}value={DisAzucaresDesayunoVal}  className={distribucionAzucares > this.state.azucaresValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAzucaresDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled7}value={DisCerealesDesayunoVal}  className={distribucionCereales > this.state.cerealesValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisCerealesDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled8}value={DisLeguminosasDesayunoVal}  className={distribucionLeguminosas > this.state.leguminosasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLeguminosasDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled9}value={DisAguaDesayunoVal}  className={distribucionAgua > this.state.aguaValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAguaDesayunoVal', event.target.value))} type="number" /></FormGroup></li>
                                   </ul> 
                                </Col>
                                <Col className="dos">
                                <ul className="colacion1Dieta">
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled1} value={DisfrutaColacion1Val}  className={distribucionFrutas > this.state.frutasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisfrutaColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled2} value={DisVerdurasColacion1Val}  className={distribucionVerduras > this.state.verdurasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisVerdurasColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled3}value={DisProteinasColacion1Val}  className={distribucionProteinas > this.state.proteinasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisProteinasColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled4}value={DisGrasasColacion1Val}  className={distribucionGrasas > this.state.grasasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisGrasasColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled5}value={DisLacteosColacion1Val}  className={distribucionLacteos > this.state.lacteosValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLacteosColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled6}value={DisAzucaresColacion1Val}  className={distribucionAzucares > this.state.azucaresValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAzucaresColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled7}value={DisCerealesColacion1Val}  className={distribucionCereales > this.state.cerealesValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisCerealesColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled8}value={DisLeguminosasColacion1Val}  className={distribucionLeguminosas > this.state.leguminosasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLeguminosasColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled9}value={DisAguaColacion1Val}  className={distribucionAgua > this.state.aguaValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAguaColacion1Val', event.target.value))} type="number" /></FormGroup></li>
                                  
                                </ul>
                                </Col>
                                <Col className="tres">
                                <ul className="comidaDieta">
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled1} value={DisfrutaComidaVal}  className={distribucionFrutas > this.state.frutasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisfrutaComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled2} value={DisVerdurasComidaVal}  className={distribucionVerduras > this.state.verdurasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisVerdurasComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled3}value={DisProteinasComidaVal}  className={distribucionProteinas > this.state.proteinasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisProteinasComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled4}value={DisGrasasComidaVal}  className={distribucionGrasas > this.state.grasasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisGrasasComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled5}value={DisLacteosComidaVal}  className={distribucionLacteos > this.state.lacteosValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLacteosComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled6}value={DisAzucaresComidaVal}  className={distribucionAzucares > this.state.azucaresValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAzucaresComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled7}value={DisCerealesComidaVal}  className={distribucionCereales > this.state.cerealesValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisCerealesComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled8}value={DisLeguminosasComidaVal}  className={distribucionLeguminosas > this.state.leguminosasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLeguminosasComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled9}value={DisAguaComidaVal}  className={distribucionAgua > this.state.aguaValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAguaComidaVal', event.target.value))} type="number" /></FormGroup></li>
                                   
                                
                                </ul>
                                
                                </Col>
                                <Col className="dos">
                                <ul className="colacion1Dieta">
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled1} value={DisfrutaColacion2Val}  className={distribucionFrutas > this.state.frutasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisfrutaColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled2} value={DisVerdurasColacion2Val}  className={distribucionVerduras > this.state.verdurasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisVerdurasColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled3}value={DisProteinasColacion2Val}  className={distribucionProteinas > this.state.proteinasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisProteinasColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled4}value={DisGrasasColacion2Val}  className={distribucionGrasas > this.state.grasasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisGrasasColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled5}value={DisLacteosColacion2Val}  className={distribucionLacteos > this.state.lacteosValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLacteosColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled6}value={DisAzucaresColacion2Val}  className={distribucionAzucares > this.state.azucaresValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAzucaresColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled7}value={DisCerealesColacion2Val}  className={distribucionCereales > this.state.cerealesValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisCerealesColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled8}value={DisLeguminosasColacion2Val}  className={distribucionLeguminosas > this.state.leguminosasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLeguminosasColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled9}value={DisAguaColacion2Val}  className={distribucionAgua > this.state.aguaValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAguaColacion2Val', event.target.value))} type="number" /></FormGroup></li>
                                  
                                
                                </ul>
       
                                </Col>
                                <Col className="tres">
                                
                                <ul className="desayunoDieta">
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled1} value={DisfrutaCenaVal}  className={distribucionFrutas > this.state.frutasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisfrutaCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl disabled={this.state.inputDisabled2} value={DisVerdurasCenaVal}  className={distribucionVerduras > this.state.verdurasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisVerdurasCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled3}value={DisProteinasCenaVal}  className={distribucionProteinas > this.state.proteinasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisProteinasCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled4}value={DisGrasasCenaVal}  className={distribucionGrasas > this.state.grasasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisGrasasCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled5}value={DisLacteosCenaVal}  className={distribucionLacteos > this.state.lacteosValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLacteosCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled6}value={DisAzucaresCenaVal}  className={distribucionAzucares > this.state.azucaresValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAzucaresCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled7}value={DisCerealesCenaVal}  className={distribucionCereales > this.state.cerealesValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisCerealesCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled8}value={DisLeguminosasCenaVal}  className={distribucionLeguminosas > this.state.leguminosasValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisLeguminosasCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                <li className="liDesayuno"><FormGroup className="resetFG" bsSize="small"><FormControl  disabled={this.state.inputDisabled9}value={DisAguaCenaVal}  className={distribucionAgua > this.state.aguaValue ?"frutasDesayunoRojo":"frutasDesayunoVerde"} onChange={event => this.setState(byPropKey('DisAguaCenaVal', event.target.value))} type="number" /></FormGroup></li>
                                  
       
                                </ul>
       
                                </Col>
                       
                                </Col>
                            </Row>
                   </Grid> 
                 
                    </div>
                     </div>
               
       <Navbar className="footerModal" fixedBottom>
           
       {/** SUMA  */}
           <div className="tittleResultado"><p>Suma</p></div>
       <div className="resultDos"> <p>Kcal:  {
           
          this.state.Kcalsumatoria <= this.state.metaKcalDieta
       
           ? <span className="verde">{this.state.Kcalsumatoria}  <CheckCircle  className="ic" size={18} /></span>
           
           :<span className="rojo">{this.state.Kcalsumatoria}  <AlertCircle  className="ic" size={18} /></span>
           
           } </p></div>
       <div className="resultUno">HCO: {
           
           this.state.HCOsumatoria <= calculoGramosMetaHco
           ? <span className="verde">{this.state.HCOsumatoria} g <CheckCircle  className="ic" size={18} /></span>
           : <span className="rojo">{this.state.HCOsumatoria} g <AlertCircle  className="ic" size={18} /></span>
           
          
           
           }</div>
       <div className="resultDos">Lip: {  
           this.state.Lipsumatoria <= calculoGramosMetaLip
           ? <span className="verde">{this.state.Lipsumatoria} g <CheckCircle  className="ic" size={18} /></span>
           : <span className="rojo">{this.state.Lipsumatoria} g <AlertCircle  className="ic" size={18} /></span>
           
          }</div>
       <div className="resultUno">Pro: {
           
          this.state.Prosumatoria <= calculoGramosMetaPro
           ? <span className="verde">{this.state.Prosumatoria} g <CheckCircle  className="ic" size={18} /></span>
           : <span className="rojo">{this.state.Prosumatoria} g <AlertCircle  className="ic" size={18} /></span>
           
          
           }</div>
       
       
       {/** META  */}
        <div className="tittleResultado"><p>Meta</p></div>
       <div className="resultDos">Kcal: {this.state.metaKcalDieta} </div>
       <div className="resultUno">HCO:{calculoGramosMetaHco} g</div>
       <div className="resultDos">Lip: {calculoGramosMetaLip} g</div>
       <div className="resultUno">Pro: {calculoGramosMetaPro} g</div>
       
       
       </Navbar> 
             
             </div>
             
             
              :null }
             { this.state.pasoDos === true ? 
                 <div>
                     <Grid>
                     <Row>
                         <Col md="2"></Col>
                         <Col md="8">
                         <Nav className="navDieta" activeKey={1} >
                             <Col md="2">
                            { this.state.checkDesayuno == true
                              ? valido
                                ? <div className="circuloCheckRed"><AlertCircle  className="icoCheckDietas" size={20} /></div>
                                : <div className="circuloCheck"><Check  className="icoCheckDietas" size={20} /></div>
                              :null
                            }            
    <NavItem onClick={this.stepDieta1}>
        { this.state.stepDesayuno == true
        ? <img className="iconDieta"src={icoDesayunoActivado} />
        : <img className="iconDieta"src={icoDesayuno} />
        }
   
    <p className="parrafoDieta">Desayuno</p>
    </NavItem>
    </Col>
    <Col md="2">
    <NavItem onClick={this.stepDieta2}>
    { this.state.checkColacion1 == true
      ? valido
        ? <div className="circuloCheckRed"><AlertCircle  className="icoCheckDietas" size={20} /></div>
        : <div className="circuloCheck"><Check  className="icoCheckDietas" size={20} /></div>
            :null
    }  
    { this.state.stepColacion1 == true
    ? <img className="iconDieta"src={icoColacionActivado} />
    : <img className="iconDieta"src={icoColacion} />
    }
   
    <p className="parrafoDieta">Colación 1</p>
    </NavItem>
    </Col>
   
    <Col md="2">
    <NavItem eventKey={3} disabled="disabled">
    <img className="iconDieta" src={icoComida} /> 
    <p className="parrafoDieta">Comida</p>      
     </NavItem>
    </Col>
    
     <Col md="2">
     <NavItem eventKey={3} disabled>
    <img className="iconDieta" src={icoColacion} />
    <p className="parrafoDieta">Colación</p>
    </NavItem>
    </Col>
   
    <Col md="2">
    <NavItem eventKey={3} disabled>
    <img className="iconDieta" src={icoCena} />
    <p className="parrafoDieta">Cena</p>
    </NavItem>
    </Col>
    
  </Nav>

                         </Col>
                  
                     </Row>

                     </Grid>
                         <Grid className="gridPlatillos">
                         <Row>

                         {  
                             this.state.stepDesayuno === true
                             ? <span>
                        <Col md="8"><Platillo1Desayuno 
                        arrayPlatillo={platillo1array} 
                        alimentosFiltro={alimentosFiltro}
                        busqueda={this.buscarPlatillo1Desayuno}
                        mostrarAlimento={this.mostrarAlimento}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo1desayuno}
                        clase={this.state.platillo1}
                        borrar={this.borrarAlimento}
                        Eq={this.enviarEq}
                        fuera={this.fuera}
                        cargador={this.state.cargando}
                        />
                        <Platillo2Desayuno 
                        arrayPlatillo={platillo2array} 
                        alimentosFiltro={alimentosFiltro2}
                        busqueda={this.buscarPlatillo2Desayuno}
                        mostrarAlimento={this.mostrarAlimento2}
                        nombrePlatillo={this.enviarNombre2}
                        resultadoAlimentos={this.state.mostrarAlimentos2}
                        activar={this.activarPlatillo2desayuno}
                        clase={this.state.platillo2}
                        mostrar={this.state.mostrar}
                        borrar={this.borrarAlimento2}
                        Eq={this.enviarEq2}
                        cargador={this.state.cargando2}
                        />
                        <Platillo3Desayuno 
                        arrayPlatillo={platillo3array} 
                        alimentosFiltro={alimentosFiltro3}
                        busqueda={this.buscarPlatillo3Desayuno}
                        mostrarAlimento={this.mostrarAlimento3}
                        nombrePlatillo={this.enviarNombre3}
                        resultadoAlimentos={this.state.mostrarAlimentos3}
                        activar={this.activarPlatillo3desayuno}
                        clase={this.state.platillo3}
                        mostrar={this.state.mostrarPlatillo3}
                        borrar={this.borrarAlimento3}
                        Eq={this.enviarEq3}
                        cargador={this.state.cargando3}
                        />
                        </Col>
                        <TablaNutrimentalDesayuno
                        sumaKcal={sumar}
                        suma={sumatoria}
                        />
                        </span>
                         
                         :null

                         }

                        { /*** Platillo 1 Desayuno */}
                       
                         </Row>
                     </Grid>
                     <Navbar className="footerModal" fixedBottom>
           {/** META  */}
            
          {this.state.bottomNavDesayuno == true ?<div>
           <div className="eqTablero">
           <div className={eqFrutas === 0 ?"triggerGrey": eqFrutas >= 0 ?"trigger": "triggerRed"}><span>{eqFrutas}</span></div><img className="icon" src={ico1} /></div>
           <div className="eqTablero">
               <div className={eqVerduras === 0 ?"triggerGrey": eqVerduras >= 0 ?"trigger": "triggerRed"}><span>{eqVerduras}</span></div><img className="icon" src={ico2} /></div>
           <div className="eqTablero">
               <div className={eqProteinas === 0 ?"triggerGrey": eqProteinas >= 0 ?"trigger": "triggerRed"}><span>{eqProteinas}</span></div><img className="icon" src={ico3} /></div>
           <div className="eqTablero"> 
               <div className={eqGrasas === 0 ?"triggerGrey": eqGrasas >= 0 ?"trigger": "triggerRed"}><span>{eqGrasas}</span></div><img className="icon" src={ico4} /></div>
           <div className="eqTablero"> 
               <div className={eqLacteos === 0 ?"triggerGrey": eqLacteos >= 0 ?"trigger": "triggerRed"}><span>{eqLacteos}</span></div><img className="icon" src={ico5} /></div>
           <div className="eqTablero"> 
               <div className={eqAzucares === 0 ?"triggerGrey": eqAzucares >= 0 ?"trigger": "triggerRed"}><span>{eqAzucares}</span></div><img className="icon" src={ico6} /></div>
           <div className="eqTablero"> 
               <div className={eqCereales === 0 ?"triggerGrey": eqCereales >= 0 ?"trigger": "triggerRed"}><span>{eqCereales}</span></div><img className="icon" src={ico7} /></div>
           <div className="eqTablero">  
               <div className={eqLeguminosas === 0 ?"triggerGrey": eqLeguminosas >= 0 ?"trigger": "triggerRed"}><span>{eqLeguminosas}</span></div><img className="icon" src={ico9} /></div>
           <div className="eqTablero">  
               <div className={eqAgua === 0 ?"triggerGrey": eqAgua >= 0 ?"trigger": "triggerRed"}><span>{eqAgua}</span></div><img className="icon" src={ico8} /></div>
               </div>
          :null }
           </Navbar> 
           
           
           </div> :null }



             { this.state.pasoTres === true ? <h1> Paso 3</h1> :null }
             </div>  
              </div>
              : null
        }
          </div>
      )
  }
}
export default ModalDietas;