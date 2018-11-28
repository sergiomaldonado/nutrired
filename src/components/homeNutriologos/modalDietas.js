import React, { Component } from 'react'
import './../App.css'
import { db } from './../../firebase'
import { authfb, dbfb } from './../../firebase/firebase'
import { Grid,Row, Tooltip, Col, FormGroup, FormControl, Navbar,NavItem , Nav, Button} from 'react-bootstrap'
import { CheckCircle, Check, AlertCircle, ChevronDown, ArrowRight, ArrowLeft} from 'react-feather'
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
import icoComidaActivado from './icons/icoComida-activado.svg'
import icoCena from './icons/icoCena.svg'
import icoCenaActivado from './icons/icoCena-activado.svg'


import CCG from './dbAlimentos/cerealesConGrasa.json'

import Platillo1Desayuno from './dieta/desayuno/Platillo-1'
import Platillo2Desayuno from './dieta/desayuno/Platillo-2'
import Platillo3Desayuno from './dieta/desayuno/Platillo-3'
import Platillo1Colacion1 from './dieta/colacion-1/Platillo-1'
import Platillo2Colacion1 from './dieta/colacion-1/Platillo-2'
import Platillo3Colacion1 from './dieta/colacion-1/Platillo-3'
import Platillo1Comida from './dieta/comida/Platillo-1'
import Platillo2Comida from './dieta/comida/Platillo-2'
import Platillo3Comida from './dieta/comida/Platillo-3'
import Platillo1Colacion2 from './dieta/colacion-2/Platillo-1'
import Platillo2Colacion2 from './dieta/colacion-2/Platillo-2'
import Platillo3Colacion2 from './dieta/colacion-2/Platillo-3'
import TablaNutrimentalComida from './dieta/comida/infNutrimental'
import Platillo1Cena from './dieta/cena/Platillo-1'
import Platillo2Cena from './dieta/cena/Platillo-2'
import Platillo3Cena from './dieta/cena/Platillo-3'
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
        platillo1colacion1:'platillo-1-desactivado',
        platillo2colacion1:'platillo-2-desactivado',
        platillo3colacion1:'platillo-3-desactivado',
        platillo1comida:'platillo-1-desactivado',
        platillo2comida:'platillo-2-desactivado',
        platillo3comida:'platillo-3-desactivado',
        platillo1colacion2:'platillo-1-desactivado',
        platillo2colacion2:'platillo-2-desactivado',
        platillo3colacion2:'platillo-3-desactivado',
        platillo1cena:'platillo-1-desactivado',
        platillo2cena:'platillo-2-desactivado',
        platillo3cena:'platillo-3-desactivado',
        mostrarPaso2:'mostrarPaso2',
        cargando:false,
        mostrar:"nohayquemostrar",
        mostrarPlatillo3:"nohayquemostrar",
        
        
        mostrarColacion1:"nohayquemostrar",
        mostrarPlatillo3Colacion1:"nohayquemostrar",
        cargandoComidaPlatillo1:false,
        mostrarComida:"nohayquemostrar",
        mostrarPlatillo3Comida:"nohayquemostrar",
        cargandoColacion2Platillo1:false,
        mostrarColacion2:"nohayquemostrar",
        mostrarPlatillo3Colacion2:"nohayquemostrar",
        cargandoCenaPlatillo1:false,
        mostrarCena:"nohayquemostrar",
        mostrarPlatillo3Cena:"nohayquemostrar",


        stepDesayuno:true,
        stepColacion1:false,
        stepComida:false,
        stepColacion2:false,
        stepCena:false,
        checkDesayuno:true,
        checkComida:false,
        checkColacion2:false,
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
  
activarPlatillo1Colacion1 = () =>{
    this.setState({
        platillo1colacion1:"platillo-1-activado",
        mostrarColacion1:'hayquemostrar'
    })
}
activarPlatillo2Colacion1 = () =>{
  this.setState({
      platillo2colacion1:"platillo-2-activado",
      platillo3colacion1:"platillo-3-desactivado",
      mostrarPlatillo3Colacion1:"hayquemostrar"
  })  
}
activarPlatillo3Colacion1 = () =>{
  this.setState({
      platillo3colacion1:"platillo-3-activado"
  })  
}
activarPlatillo1Comida = () =>{
    this.setState({
        platillo1comida:"platillo-1-activado",
        mostrarComida:'hayquemostrar'
    })
}
activarPlatillo2Comida = () =>{
  this.setState({
      platillo2comida:"platillo-2-activado",
      platillo3comida:"platillo-3-desactivado",
      mostrarPlatillo3Comida:"hayquemostrar"
  })  
}
activarPlatillo3Comida = () =>{
  this.setState({
      platillo3comida:"platillo-3-activado"
  })  
}

activarPlatillo1Colacion2 = () =>{
    this.setState({
        platillo1colacion2:"platillo-1-activado",
        mostrarColacion2:'hayquemostrar'
    })
}
activarPlatillo2Colacion2 = () =>{
  this.setState({
      platillo2colacion2:"platillo-2-activado",
      platillo3colacion2:"platillo-3-desactivado",
      mostrarPlatillo3Colacion2:"hayquemostrar"
  })  
}
activarPlatillo3Colacion2 = () =>{
  this.setState({
      platillo3colacion2:"platillo-3-activado"
  })  
}
activarPlatillo1Cena = () =>{
    this.setState({
        platillo1cena:"platillo-1-activado",
        mostrarCena:'hayquemostrar'
    })
}
activarPlatillo2Cena = () =>{
  this.setState({
      platillo2cena:"platillo-2-activado",
      platillo3cena:"platillo-3-desactivado",
      mostrarPlatillo3Cena:"hayquemostrar"
  })  
}
activarPlatillo3Cena = () =>{
  this.setState({
      platillo3cena:"platillo-3-activado"
  })  
}

fuera = () =>{
    this.setState({filteredAlimento:[],filteredAlimento2:[],filteredAlimento3:[],filteredAlimento3:[],
        filteredAlimentoColacion1:[],filteredAlimento2Colacion1:[],filteredAlimento3Colacion1:[],
        filteredAlimentoComida:[],filteredAlimento2Comida:[],filteredAlimento3Comida1:[],
        filteredAlimentoColacion2:[],filteredAlimento2Colacion2:[],filteredAlimento3Colacion2:[],
        filteredAlimentoCena:[],filteredAlimento2Cena:[],filteredAlimento3Cena:[]  })
  } 
buscarPlatillo1Desayuno = (e) => {
       e.target.value == '' ?this.setState({filteredAlimento:[], cargando:false}) :null
       this.setState({cargando:true})
       this.setAlimentosPlatillo1(e.target.value.toLowerCase())
  }
  setAlimentosPlatillo1 = debounce(query =>{
    let filteredAlimento = CCG.filter((alimento) => {
    return alimento.alimento.toLowerCase().includes(query)
    });
   query === ""
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
       query === ""
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

buscarPlatillo1Colacion1 = (e) => {
    e.target.value == '' ?this.setState({filteredAlimentoColacion1:[], cargandoColacion1:false}) :null
    this.setState({cargandoColacion1:true})
    this.setAlimentosPlatillo1Colacion1(e.target.value.toLowerCase())
}
setAlimentosPlatillo1Colacion1 = debounce(query =>{
 let filteredAlimentoColacion1 = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimentoColacion1:[], cargandoColacion1:false })
:this.setState({filteredAlimentoColacion1, cargandoColacion1:false })
},1000)


buscarPlatillo2Colacion1 = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento2Colacion1:[], cargandoColacion1Platillo2:false}) :null
    this.setState({cargandoColacion1Platillo2:true})
    this.setAlimentosPlatillo2Colacion1(e.target.value.toLowerCase())
}
setAlimentosPlatillo2Colacion1 = debounce(query =>{
 let filteredAlimento2Colacion1 = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento2Colacion1:[], cargandoColacion1Platillo2:false })
:this.setState({filteredAlimento2Colacion1, cargandoColacion1Platillo2:false })
},1000)

buscarPlatillo3Colacion1 = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento3Colacion1:[], cargandoColacion1Platillo3:false}) :null
    this.setState({cargandoColacion1Platillo3:true})
    this.setAlimentosPlatillo3Colacion1(e.target.value.toLowerCase())
}
setAlimentosPlatillo3Colacion1 = debounce(query =>{
 let filteredAlimento3Colacion1 = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento3Colacion1:[], cargandoColacion1Platillo3:false })
:this.setState({filteredAlimento3Colacion1, cargandoColacion1Platillo3:false })
},1000)


buscarPlatillo1Comida = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento1Comida:[], cargandoComidaPlatillo1:false}) :null
    this.setState({cargandoComidaPlatillo1:true})
    this.setAlimentosPlatillo1Comida(e.target.value.toLowerCase())
}
setAlimentosPlatillo1Comida = debounce(query =>{
 let filteredAlimento1Comida = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento1Comida:[], cargandoComidaPlatillo1:false })
:this.setState({filteredAlimento1Comida, cargandoComidaPlatillo1:false })
},1000)

buscarPlatillo2Comida = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento2Comida:[], cargandoComidaPlatillo2:false}) :null
    this.setState({cargandoComidaPlatillo2:true})
    this.setAlimentosPlatillo2Comida(e.target.value.toLowerCase())
}
setAlimentosPlatillo2Comida = debounce(query =>{
 let filteredAlimento2Comida = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento2Comida:[], cargandoComidaPlatillo2:false })
:this.setState({filteredAlimento2Comida, cargandoComidaPlatillo2:false })
},1000)

buscarPlatillo3Comida = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento3Comida:[], cargandoComidaPlatillo3:false}) :null
    this.setState({cargandoComidaPlatillo3:true})
    this.setAlimentosPlatillo3Comida(e.target.value.toLowerCase())
}
setAlimentosPlatillo3Comida = debounce(query =>{
 let filteredAlimento3Comida = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento3Comida:[], cargandoComidaPlatillo3:false })
:this.setState({filteredAlimento3Comida, cargandoComidaPlatillo3:false })
},1000)

buscarPlatillo1Colacion2 = (e) => {
    e.target.value == '' ?this.setState({filteredAlimentoColacion2:[], cargandoColacion2:false}) :null
    this.setState({cargandoColacion2:true})
    this.setAlimentosPlatillo1Colacion2(e.target.value.toLowerCase())
}
setAlimentosPlatillo1Colacion2 = debounce(query =>{
 let filteredAlimentoColacion2 = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimentoColacion2:[], cargandoColacion2:false })
:this.setState({filteredAlimentoColacion2, cargandoColacion2:false })
},1000)


buscarPlatillo2Colacion2 = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento2Colacion2:[], cargandoColacion2Platillo2:false}) :null
    this.setState({cargandoColacion2Platillo2:true})
    this.setAlimentosPlatillo2Colacion2(e.target.value.toLowerCase())
}
setAlimentosPlatillo2Colacion2 = debounce(query =>{
 let filteredAlimento2Colacion2 = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento2Colacion2:[], cargandoColacion2Platillo2:false })
:this.setState({filteredAlimento2Colacion2, cargandoColacion2Platillo2:false })
},1000)

buscarPlatillo3Colacion2 = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento3Colacion2:[], cargandoColacion2Platillo3:false}) :null
    this.setState({cargandoColacion2Platillo3:true})
    this.setAlimentosPlatillo3Colacion2(e.target.value.toLowerCase())
}
setAlimentosPlatillo3Colacion2 = debounce(query =>{
 let filteredAlimento3Colacion2 = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento3Colacion2:[], cargandoColacion2Platillo3:false })
:this.setState({filteredAlimento3Colacion2, cargandoColacion2Platillo3:false })
},1000)

/*** C  E  N  A */

buscarPlatillo1Cena = (e) => {
    e.target.value == '' ?this.setState({filteredAlimentoCena:[], cargandoCena:false}) :null
    this.setState({cargandoCena:true})
    this.setAlimentosPlatillo1Cena(e.target.value.toLowerCase())
}
setAlimentosPlatillo1Cena = debounce(query =>{
 let filteredAlimentoCena = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimentoCena:[], cargandoCena:false })
:this.setState({filteredAlimentoCena, cargandoCena:false })
},1000)


buscarPlatillo2Cena = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento2Cena:[], cargandoCenaPlatillo2:false}) :null
    this.setState({cargandoCenaPlatillo2:true})
    this.setAlimentosPlatillo2Cena(e.target.value.toLowerCase())
}
setAlimentosPlatillo2Cena = debounce(query =>{
 let filteredAlimento2Cena = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento2Cena:[], cargandoCenaPlatillo2:false })
:this.setState({filteredAlimento2Cena, cargandoCenaPlatillo2:false })
},1000)

buscarPlatillo3Cena = (e) => {
    e.target.value == '' ?this.setState({filteredAlimento3Cena:[], cargandoCenaPlatillo3:false}) :null
    this.setState({cargandoCenaPlatillo3:true})
    this.setAlimentosPlatillo3Cena(e.target.value.toLowerCase())
}
setAlimentosPlatillo3Cena = debounce(query =>{
 let filteredAlimento3Cena = CCG.filter((alimento) => {
 return alimento.alimento.toLowerCase().includes(query)
 });
query == ""
?this.setState({filteredAlimento3Cena:[], cargandoCenaPlatillo3:false })
:this.setState({filteredAlimento3Cena, cargandoCenaPlatillo3:false })
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

enviarEqColacion1Platillo1 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo1/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEqColacion1Platillo2 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo2/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEqColacion1Platillo3 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo3/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}


borrarAlimentoColacion1Platillo1 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo1/alimentos/${ref}/`).remove()
}
borrarAlimentoColacion1Platillo2 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo2/alimentos/${ref}/`).remove()
}
borrarAlimentoColacion1Platillo3 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo3/alimentos/${ref}/`).remove()
}


borrarAlimentoComidaPlatillo1 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo1/alimentos/${ref}/`).remove()
}
borrarAlimentoComidaPlatillo2 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo2/alimentos/${ref}/`).remove()
}
borrarAlimentoComidaPlatillo3 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo3/alimentos/${ref}/`).remove()
}

enviarEqColacion2Platillo1 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo1/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEqColacion2Platillo2 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo2/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEqColacion2Platillo3 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo3/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}

   enviarNombre = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 1" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/desayuno/platillo1`).update({
      nombre: valor
   });
   this.setState({
       nombrePlatilloDesayuno:e
   })
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
  

  

/*** C  O  L  A  C  I  O  N  1   -   C  O  L  A  C  I  O  N  1  */

enviarNombre1Colacion1 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 1" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo1`).update({
      nombre: valor
   });
   }
   enviarNombre2Colacion1 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 2" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo2`).update({
      nombre: valor
   });
   }
   enviarNombre3Colacion1 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 3" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo3`).update({
      nombre: valor
   });
   }
   enviarAlientoColacion1 = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo1/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo1/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo1Colacion1Array: snapshot.val()
            })
         })
    this.setState({filteredAlimentoColacion1:[]})
  }

  enviarAlimentoPlatillo2Colacion1 = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo2/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo2/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo2Colacion1Array: snapshot.val()
            })
         })
    this.setState({filteredAlimento2Colacion1:[]})
  }
  enviarAlimentoPlatillo3Colacion1 = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo3/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion1/platillo3/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo3Colacion1Array: snapshot.val()
            })
         })
    this.setState({filteredAlimento3Colacion1:[]})
  }

  /***   C  O  M  I  D  A  -   C  O  M  I  D  A -   C  O  M  I  D  A */


  enviarNombre1Comida = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 1" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo1`).update({
      nombre: valor
   });
   }
   enviarNombre2Comida = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 2" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo2`).update({
      nombre: valor
   });
   }
   enviarNombre3Comida = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 3" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo3`).update({
      nombre: valor
   });
   }
  enviarAlimentoPlatillo1Comida = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo1/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo1/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo1ComidaArray: snapshot.val()
            })
         })
    this.setState({filteredAlimento1Comida:[]})
  }
  enviarAlimentoPlatillo2Comida = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo2/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo2/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo2ComidaArray: snapshot.val()
            })
         })
    this.setState({filteredAlimento2Comida:[]})
  }
  enviarAlimentoPlatillo3Comida = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo3/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/comida/platillo3/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo3ComidaArray: snapshot.val()
            })
         })
    this.setState({filteredAlimento3Comida:[]})
  }

  /**** C  O  L  A  C  I  O  N  2   -   C  O  L  A  C  I  O  N  2 */

  enviarNombre1Colacion2 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 1" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo1`).update({
      nombre: valor
   });
   }
   enviarNombre2Colacion2 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 2" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo2`).update({
      nombre: valor
   });
   }
   enviarNombre3Colacion2 = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 3" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo3`).update({
      nombre: valor
   });
   }

  enviarAlimentoColacion2 = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo1/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo1/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo1Colacion2Array: snapshot.val()
            })
         })
    this.setState({filteredAlimentoColacion2:[]})
  }

  enviarAlimentoPlatillo2Colacion2 = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo2/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo2/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo2Colacion2Array: snapshot.val()
            })
         })
    this.setState({filteredAlimento2Colacion2:[]})
  }
  enviarAlimentoPlatillo3Colacion2 = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo3/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo3/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo3Colacion2Array: snapshot.val()
            })
         })
    this.setState({filteredAlimento3Colacion2:[]})
  }
  borrarAlimentoColacion2Platillo1 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo1/alimentos/${ref}/`).remove()
}
borrarAlimentoColacion2Platillo2 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo2/alimentos/${ref}/`).remove()
}
borrarAlimentoColacion2Platillo3 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/colacion2/platillo3/alimentos/${ref}/`).remove()
}

/*** C  E  N  A      C  E  N  A      C  E  N  A */
enviarNombre1Cena = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 1" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo1`).update({
      nombre: valor
   });
   }
   enviarNombre2Cena = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 2" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo2`).update({
      nombre: valor
   });
   }
   enviarNombre3Cena = (e) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?"platillo 3" :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo3`).update({
      nombre: valor
    });
}
  enviarAlimentoCena = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo1/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo1/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo1CenaArray: snapshot.val()
            })
         })
    this.setState({filteredAlimentoCena:[]})
  }

  enviarAlimentoPlatillo2Cena = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo2/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo2/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo2CenaArray: snapshot.val()
            })
         })
    this.setState({filteredAlimento2Cena:[]})
  }
  enviarAlimentoPlatillo3Cena = (nombre, categoria, unidad, kcal,clase, grm, cantidad,lipidos,sodio,hco) => {
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const claveAlimento = dbfb.ref().push();
    const key = claveAlimento.key      
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo3/alimentos/${key}`).set({
        nombre: nombre, categoria:categoria, unidad:unidad,  kcal:parseInt(kcal), ref:key, eq:1, clase:clase, gramos:grm, cantidad:cantidad,
        lipidos:lipidos, sodio:sodio, hco:hco
      });
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo3/alimentos`).on('value', snapshot =>{
          this.setState({
           platillo3CenaArray: snapshot.val()
            })
         })
    this.setState({filteredAlimento3Cena:[]})
  }
  borrarAlimentoCenaPlatillo1 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo1/alimentos/${ref}/`).remove()
}
borrarAlimentoCenaPlatillo2 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo2/alimentos/${ref}/`).remove()
}
borrarAlimentoCenaPlatillo3 = (ref)=>{
    const uid = authfb.currentUser.uid 
    const idRecetaEnProceso = this.props.idReceta
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo3/alimentos/${ref}/`).remove()
}

enviarEqCenaPlatillo1 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo1/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEqCenaPlatillo2 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo2/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}
enviarEqCenaPlatillo3 = (e, ref)=>{
    const uid = authfb.currentUser.uid
    const idRecetaEnProceso = this.props.idReceta
    const valor = e == "" ?0 :e
    dbfb.ref(`users/nutriologos/${uid}/dietas/${idRecetaEnProceso}/dieta/cena/platillo3/alimentos/${ref}/`).update({
      eq: parseInt(valor)
   });
}


   stepDieta1 = () =>{
    this.setState({
     stepDesayuno:true,
     stepColacion1:false,
     stepComida:false,
     bottomNavDesayuno:true,
        bottomNavColacion1:false,
        bottomNavComida:false,
        bottomNavColacion2:false,
        stepColacion2:false,
        stepCena:false,
        bottomNavCena:false

    })
}
   stepDieta2 = () =>{
       this.setState({
        stepDesayuno:false,
        stepColacion1:true,
        stepComida:false,
        checkColacion1:true,
        bottomNavDesayuno:false,
        bottomNavColacion1:true,
        bottomNavComida:false,
        bottomNavColacion2:false,
        stepColacion2:false,
        stepCena:false,
        bottomNavCena:false
       })
      
   }
   stepDieta3 = () =>{
    this.setState({
     stepDesayuno:false,
     stepColacion1:false,
     stepComida:true,
     stepCena:false,
     checkComida:true,
     bottomNavDesayuno:false,
     bottomNavColacion1:false,
     bottomNavComida:true,
     bottomNavColacion2:false,
     stepColacion2:false,
     bottomNavCena:false
    })
}
stepDieta4 = () =>{
    this.setState({
     stepDesayuno:false,
     stepComida:false,
     stepColacion1:false,
     stepColacion2:true,
     stepCena:false,
     checkColacion2:true,
     bottomNavDesayuno:false,
     bottomNavColacion1:false,
     bottomNavComida:false,
     bottomNavColacion2:true,
     bottomNavCena:false
    })
}
stepDieta5 = () =>{
    this.setState({
     stepDesayuno:false,
     stepColacion1:false,
     stepComida:false,
     stepColacion2:false,
     stepCena:true,
     checkCena:true,
     bottomNavDesayuno:false,
     bottomNavColacion1:false,
     bottomNavComida:false,
     bottomNavColacion2:false,
     bottomNavCena:true
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
        const arrayColacion1Platillo1 = this.state.platillo1Colacion1Array
        const arrayColacion1Platillo2 = this.state.platillo2Colacion1Array
        const arrayColacion1Platillo3 = this.state.platillo3Colacion1Array
        const arrayComidaPlatillo1 = this.state.platillo1ComidaArray
        const arrayComidaPlatillo2 = this.state.platillo2ComidaArray
        const arrayComidaPlatillo3 = this.state.platillo3ComidaArray
        const arrayColacion2Platillo1 = this.state.platillo1Colacion2Array
        const arrayColacion2Platillo2 = this.state.platillo2Colacion2Array
        const arrayColacion2Platillo3 = this.state.platillo3Colacion2Array
        const arrayCenaPlatillo1 = this.state.platillo1CenaArray
        const arrayCenaPlatillo2 = this.state.platillo2CenaArray
        const arrayCenaPlatillo3 = this.state.platillo3CenaArray
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
    const DesayunoEqGrasas = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "4" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqGrasas = !! arrayPlatillo && DesayunoEqGrasas.reduce((a,b) => a + b)
    const DesayunoEqGrasas2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "4" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqGrasas2 = !! arrayPlatillo2 && DesayunoEqGrasas2.reduce((a,b) => a + b)
    const DesayunoEqGrasas3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "4" ?arrayPlatillo3[key].eq:0)
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
    /** Agua */
    const DesayunoEqAgua = !!arrayPlatillo &&  Object.keys(arrayPlatillo).map((key)=> arrayPlatillo[key].clase === "9" ?arrayPlatillo[key].eq:0)
    const sumDesayunoEqAgua = !! arrayPlatillo && DesayunoEqAgua.reduce((a,b) => a + b)
    const DesayunoEqAgua2 = !!arrayPlatillo2 &&  Object.keys(arrayPlatillo2).map((key)=> arrayPlatillo2[key].clase === "9" ?arrayPlatillo2[key].eq:0)
    const sumDesayunoEqAgua2 = !! arrayPlatillo2 && DesayunoEqAgua2.reduce((a,b) => a + b)
    const DesayunoEqAgua3 = !!arrayPlatillo3 &&  Object.keys(arrayPlatillo3).map((key)=> arrayPlatillo3[key].clase === "9" ?arrayPlatillo3[key].eq:0)
    const sumDesayunoEqAgua3 = !! arrayPlatillo3 && DesayunoEqAgua3.reduce((a,b) => a + b)
    const totalEqAguaDesayuno1 = sumDesayunoEqAgua+sumDesayunoEqAgua2+sumDesayunoEqAgua3
    const eqAgua = parseInt(DisAguaDesayunoVal) - totalEqAguaDesayuno1

    /** COLACION 1 */
    /** Platillo 1 */
    /** Frutas */
    const Colacion1EqFrutas = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "7" ?arrayColacion1Platillo1[key].eq:0)
    const sumColacion1EqFrutas = !! arrayColacion1Platillo1 && Colacion1EqFrutas.reduce((a,b) => a + b)
    const Colacion1EqFrutas2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "7" ?arrayColacion1Platillo2[key].eq:0)
    const sumColacion1EqFrutas2 = !! arrayColacion1Platillo2 && Colacion1EqFrutas2.reduce((a,b) => a + b)
    const Colacion1EqFrutas3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "7" ?arrayColacion1Platillo3[key].eq:0)
    const sumColacion1EqFrutas3 = !! arrayColacion1Platillo3 && Colacion1EqFrutas3.reduce((a,b) => a + b)
    const totalEqColacion11 = sumColacion1EqFrutas + sumColacion1EqFrutas2 + sumColacion1EqFrutas3
    const eqFrutasColacion1 = parseInt(DisfrutaColacion1Val) - totalEqColacion11

     /** Verduras */
     const Colacion1EqVerduras = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "2" ?arrayColacion1Platillo1[key].eq:0)
     const sumColacion1EqVerduras = !! arrayColacion1Platillo1 && Colacion1EqVerduras.reduce((a,b) => a + b)
     const Colacion1EqVerduras2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "2" ?arrayColacion1Platillo2[key].eq:0)
     const sumColacion1EqVerduras2 = !! arrayColacion1Platillo2 && Colacion1EqVerduras2.reduce((a,b) => a + b)
     const Colacion1EqVerduras3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "2" ?arrayColacion1Platillo3[key].eq:0)
     const sumColacion1EqVerduras3 = !! arrayColacion1Platillo3 && Colacion1EqVerduras3.reduce((a,b) => a + b)
     const totalEqColacion1Verduras1 = sumColacion1EqVerduras + sumColacion1EqVerduras2 + sumColacion1EqVerduras3
     const eqVerdurasColacion1 = parseInt(DisVerdurasColacion1Val) - totalEqColacion1Verduras1

     /** Proteinas */
     const Colacion1EqProteinas = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "6" ?arrayColacion1Platillo1[key].eq:0)
     const sumColacion1EqProteinas = !! arrayColacion1Platillo1 && Colacion1EqProteinas.reduce((a,b) => a + b)
     const Colacion1EqProteinas2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "6" ?arrayColacion1Platillo2[key].eq:0)
     const sumColacion1EqProteinas2 = !! arrayColacion1Platillo2 && Colacion1EqProteinas2.reduce((a,b) => a + b)
     const Colacion1EqProteinas3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "6" ?arrayColacion1Platillo3[key].eq:0)
     const sumColacion1EqProteinas3 = !! arrayColacion1Platillo3 && Colacion1EqProteinas3.reduce((a,b) => a + b)
     const totalEqColacion1Proteinas1 = sumColacion1EqProteinas + sumColacion1EqProteinas2 + sumColacion1EqProteinas3
     const eqProteinasColacion1 = parseInt(DisProteinasColacion1Val) - totalEqColacion1Proteinas1
     /** Cereales */
     const Colacion1EqCereales = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "1" ?arrayColacion1Platillo1[key].eq:0)
     const sumColacion1EqCereales = !! arrayColacion1Platillo1 && Colacion1EqCereales.reduce((a,b) => a + b)
     const Colacion1EqCereales2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "1" ?arrayColacion1Platillo2[key].eq:0)
     const sumColacion1EqCereales2 = !! arrayColacion1Platillo2 && Colacion1EqCereales2.reduce((a,b) => a + b)
     const Colacion1EqCereales3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "1" ?arrayColacion1Platillo3[key].eq:0)
     const sumColacion1EqCereales3 = !! arrayColacion1Platillo3 && Colacion1EqCereales3.reduce((a,b) => a + b)
     const totalEqColacion1Cereales1 = sumColacion1EqCereales + sumColacion1EqCereales2 + sumColacion1EqCereales3
     const eqCerealesColacion1 = parseInt(DisCerealesColacion1Val) - totalEqColacion1Cereales1
     /** Lacteos */
     const Colacion1EqLacteos = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "8" ?arrayColacion1Platillo1[key].eq:0)
     const sumColacion1EqLacteos = !! arrayColacion1Platillo1 && Colacion1EqLacteos.reduce((a,b) => a + b)
     const Colacion1EqLacteos2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "8" ?arrayColacion1Platillo2[key].eq:0)
     const sumColacion1EqLacteos2 = !! arrayColacion1Platillo2 && Colacion1EqLacteos2.reduce((a,b) => a + b)
     const Colacion1EqLacteos3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "8" ?arrayColacion1Platillo3[key].eq:0)
     const sumColacion1EqLacteos3 = !! arrayColacion1Platillo3 && Colacion1EqLacteos3.reduce((a,b) => a + b)
     const totalEqColacion1Lacteos1 = sumColacion1EqLacteos + sumColacion1EqLacteos2 + sumColacion1EqLacteos3
     const eqLacteosColacion1 = parseInt(DisLacteosColacion1Val) - totalEqColacion1Lacteos1

     /** Grasas */
     const Colacion1EqGrasas = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "4" ?arrayColacion1Platillo1[key].eq:0)
     const sumColacion1EqGrasas = !! arrayColacion1Platillo1 && Colacion1EqGrasas.reduce((a,b) => a + b)
     const Colacion1EqGrasas2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "4" ?arrayColacion1Platillo2[key].eq:0)
     const sumColacion1EqGrasas2 = !! arrayColacion1Platillo2 && Colacion1EqGrasas2.reduce((a,b) => a + b)
     const Colacion1EqGrasas3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "4" ?arrayColacion1Platillo3[key].eq:0)
     const sumColacion1EqGrasas3 = !! arrayColacion1Platillo3 && Colacion1EqGrasas3.reduce((a,b) => a + b)
     const totalEqColacion1Grasas1 = sumColacion1EqGrasas + sumColacion1EqGrasas2 + sumColacion1EqGrasas3
     const eqGrasasColacion1 = parseInt(DisGrasasColacion1Val) - totalEqColacion1Grasas1
       /** Azucares */
       const Colacion1EqAzucares = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "5" ?arrayColacion1Platillo1[key].eq:0)
       const sumColacion1EqAzucares = !! arrayColacion1Platillo1 && Colacion1EqAzucares.reduce((a,b) => a + b)
       const Colacion1EqAzucares2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "5" ?arrayColacion1Platillo2[key].eq:0)
       const sumColacion1EqAzucares2 = !! arrayColacion1Platillo2 && Colacion1EqAzucares2.reduce((a,b) => a + b)
       const Colacion1EqAzucares3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "5" ?arrayColacion1Platillo3[key].eq:0)
       const sumColacion1EqAzucares3 = !! arrayColacion1Platillo3 && Colacion1EqAzucares3.reduce((a,b) => a + b)
       const totalEqColacion1Azucares1 = sumColacion1EqAzucares + sumColacion1EqAzucares2 + sumColacion1EqAzucares3
       const eqAzucaresColacion1 = parseInt(DisAzucaresColacion1Val) - totalEqColacion1Azucares1
      /** Leguminosas */
      const Colacion1EqLeguminosas = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "3" ?arrayColacion1Platillo1[key].eq:0)
      const sumColacion1EqLeguminosas = !! arrayColacion1Platillo1 && Colacion1EqLeguminosas.reduce((a,b) => a + b)
      const Colacion1EqLeguminosas2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "3" ?arrayColacion1Platillo2[key].eq:0)
      const sumColacion1EqLeguminosas2 = !! arrayColacion1Platillo2 && Colacion1EqLeguminosas2.reduce((a,b) => a + b)
      const Colacion1EqLeguminosas3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "3" ?arrayColacion1Platillo3[key].eq:0)
      const sumColacion1EqLeguminosas3 = !! arrayColacion1Platillo3 && Colacion1EqLeguminosas3.reduce((a,b) => a + b)
      const totalEqColacion1Leguminosas1 = sumColacion1EqLeguminosas + sumColacion1EqLeguminosas2 + sumColacion1EqLeguminosas3
      const eqLeguminosasColacion1 = parseInt(DisLeguminosasColacion1Val) - totalEqColacion1Leguminosas1
       /** Agua */
       const Colacion1EqAgua = !!arrayColacion1Platillo1 &&  Object.keys(arrayColacion1Platillo1).map((key)=> arrayColacion1Platillo1[key].clase === "9" ?arrayColacion1Platillo1[key].eq:0)
       const sumColacion1EqAgua = !! arrayColacion1Platillo1 && Colacion1EqAgua.reduce((a,b) => a + b)
       const Colacion1EqAgua2 = !!arrayColacion1Platillo2 &&  Object.keys(arrayColacion1Platillo2).map((key)=> arrayColacion1Platillo2[key].clase === "9" ?arrayColacion1Platillo2[key].eq:0)
       const sumColacion1EqAgua2 = !! arrayColacion1Platillo2 && Colacion1EqAgua2.reduce((a,b) => a + b)
       const Colacion1EqAgua3 = !!arrayColacion1Platillo3 &&  Object.keys(arrayColacion1Platillo3).map((key)=> arrayColacion1Platillo3[key].clase === "9" ?arrayColacion1Platillo3[key].eq:0)
       const sumColacion1EqAgua3 = !! arrayColacion1Platillo3 && Colacion1EqAgua3.reduce((a,b) => a + b)
       const totalEqColacion1Agua1 = sumColacion1EqAgua + sumColacion1EqAgua2 + sumColacion1EqAgua3
       const eqAguaColacion1 = parseInt(DisAguaColacion1Val) - totalEqColacion1Agua1

    /** COMIDA */
    /** Platillo 1 */
    /** Frutas */
    const ComidaEqFrutas = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "7" ?arrayComidaPlatillo1[key].eq:0)
    const sumComidaEqFrutas = !! arrayComidaPlatillo1 && ComidaEqFrutas.reduce((a,b) => a + b)
    const ComidaEqFrutas2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "7" ?arrayComidaPlatillo2[key].eq:0)
    const sumComidaEqFrutas2 = !! arrayComidaPlatillo2 && ComidaEqFrutas2.reduce((a,b) => a + b)
    const ComidaEqFrutas3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "7" ?arrayComidaPlatillo3[key].eq:0)
    const sumComidaEqFrutas3 = !! arrayComidaPlatillo3 && ComidaEqFrutas3.reduce((a,b) => a + b)
    const totalEqComida1 = sumComidaEqFrutas + sumComidaEqFrutas2 + sumComidaEqFrutas3
    const eqFrutasComida = parseInt(DisfrutaComidaVal) - totalEqComida1

     /** Verduras */
     const ComidaEqVerduras = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "2" ?arrayComidaPlatillo1[key].eq:0)
     const sumComidaEqVerduras = !! arrayComidaPlatillo1 && ComidaEqVerduras.reduce((a,b) => a + b)
     const ComidaEqVerduras2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "2" ?arrayComidaPlatillo2[key].eq:0)
     const sumComidaEqVerduras2 = !! arrayComidaPlatillo2 && ComidaEqVerduras2.reduce((a,b) => a + b)
     const ComidaEqVerduras3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "2" ?arrayComidaPlatillo3[key].eq:0)
     const sumComidaEqVerduras3 = !! arrayComidaPlatillo3 && ComidaEqVerduras3.reduce((a,b) => a + b)
     const totalEqComidaVerduras1 = sumComidaEqVerduras + sumComidaEqVerduras2 + sumComidaEqVerduras3
     const eqVerdurasComida = parseInt(DisVerdurasComidaVal) - totalEqComidaVerduras1

     /** Proteinas */
     const ComidaEqProteinas = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "6" ?arrayComidaPlatillo1[key].eq:0)
     const sumComidaEqProteinas = !! arrayComidaPlatillo1 && ComidaEqProteinas.reduce((a,b) => a + b)
     const ComidaEqProteinas2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "6" ?arrayComidaPlatillo2[key].eq:0)
     const sumComidaEqProteinas2 = !! arrayComidaPlatillo2 && ComidaEqProteinas2.reduce((a,b) => a + b)
     const ComidaEqProteinas3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "6" ?arrayComidaPlatillo3[key].eq:0)
     const sumComidaEqProteinas3 = !! arrayComidaPlatillo3 && ComidaEqProteinas3.reduce((a,b) => a + b)
     const totalEqComidaProteinas1 = sumComidaEqProteinas + sumComidaEqProteinas2 + sumComidaEqProteinas3
     const eqProteinasComida = parseInt(DisProteinasComidaVal) - totalEqComidaProteinas1
     /** Cereales */
     const ComidaEqCereales = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "1" ?arrayComidaPlatillo1[key].eq:0)
     const sumComidaEqCereales = !! arrayComidaPlatillo1 && ComidaEqCereales.reduce((a,b) => a + b)
     const ComidaEqCereales2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "1" ?arrayComidaPlatillo2[key].eq:0)
     const sumComidaEqCereales2 = !! arrayComidaPlatillo2 && ComidaEqCereales2.reduce((a,b) => a + b)
     const ComidaEqCereales3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "1" ?arrayComidaPlatillo3[key].eq:0)
     const sumComidaEqCereales3 = !! arrayComidaPlatillo3 && ComidaEqCereales3.reduce((a,b) => a + b)
     const totalEqComidaCereales1 = sumComidaEqCereales + sumComidaEqCereales2 + sumComidaEqCereales3
     const eqCerealesComida = parseInt(DisCerealesComidaVal) - totalEqComidaCereales1
     /** Lacteos */
     const ComidaEqLacteos = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "8" ?arrayComidaPlatillo1[key].eq:0)
     const sumComidaEqLacteos = !! arrayColacion1Platillo1 && ComidaEqLacteos.reduce((a,b) => a + b)
     const ComidaEqLacteos2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "8" ?arrayComidaPlatillo2[key].eq:0)
     const sumComidaEqLacteos2 = !! arrayComidaPlatillo2 && ComidaEqLacteos2.reduce((a,b) => a + b)
     const ComidaEqLacteos3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "8" ?arrayComidaPlatillo3[key].eq:0)
     const sumComidaEqLacteos3 = !! arrayComidaPlatillo3 && ComidaEqLacteos3.reduce((a,b) => a + b)
     const totalEqComidaLacteos1 = sumComidaEqLacteos + sumComidaEqLacteos2 + sumComidaEqLacteos3
     const eqLacteosComida = parseInt(DisLacteosComidaVal) - totalEqComidaLacteos1

     /** Grasas */
     const ComidaEqGrasas = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "4" ?arrayComidaPlatillo1[key].eq:0)
     const sumComidaEqGrasas = !! arrayComidaPlatillo1 && ComidaEqGrasas.reduce((a,b) => a + b)
     const ComidaEqGrasas2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "4" ?arrayComidaPlatillo2[key].eq:0)
     const sumComidaEqGrasas2 = !! arrayComidaPlatillo2 && ComidaEqGrasas2.reduce((a,b) => a + b)
     const ComidaEqGrasas3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "4" ?arrayComidaPlatillo3[key].eq:0)
     const sumComidaEqGrasas3 = !! arrayComidaPlatillo3 && ComidaEqGrasas3.reduce((a,b) => a + b)
     const totalEqComidaGrasas1 = sumComidaEqGrasas + sumComidaEqGrasas2 + sumComidaEqGrasas3
     const eqGrasasComida = parseInt(DisGrasasComidaVal) - totalEqComidaGrasas1
       /** Azucares */
       const ComidaEqAzucares = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "5" ?arrayComidaPlatillo1[key].eq:0)
       const sumComidaEqAzucares = !! arrayComidaPlatillo1 && ComidaEqAzucares.reduce((a,b) => a + b)
       const ComidaEqAzucares2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "5" ?arrayComidaPlatillo2[key].eq:0)
       const sumComidaEqAzucares2 = !! arrayComidaPlatillo2 && ComidaEqAzucares2.reduce((a,b) => a + b)
       const ComidaEqAzucares3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "5" ?arrayComidaPlatillo3[key].eq:0)
       const sumComidaEqAzucares3 = !! arrayComidaPlatillo3 && ComidaEqAzucares3.reduce((a,b) => a + b)
       const totalEqComidaAzucares1 = sumComidaEqAzucares + sumComidaEqAzucares2 + sumComidaEqAzucares3
       const eqAzucaresComida = parseInt(DisAzucaresComidaVal) - totalEqComidaAzucares1
      /** Leguminosas */
      const ComidaEqLeguminosas = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "3" ?arrayComidaPlatillo1[key].eq:0)
      const sumComidaEqLeguminosas = !! arrayComidaPlatillo1 && ComidaEqLeguminosas.reduce((a,b) => a + b)
      const ComidaEqLeguminosas2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "3" ?arrayComidaPlatillo2[key].eq:0)
      const sumComidaEqLeguminosas2 = !! arrayComidaPlatillo2 && ComidaEqLeguminosas2.reduce((a,b) => a + b)
      const ComidaEqLeguminosas3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "3" ?arrayComidaPlatillo3[key].eq:0)
      const sumComidaEqLeguminosas3 = !! arrayComidaPlatillo3 && ComidaEqLeguminosas3.reduce((a,b) => a + b)
      const totalEqComidaLeguminosas1 = sumComidaEqLeguminosas + sumComidaEqLeguminosas2 + sumComidaEqLeguminosas3
      const eqLeguminosasComida = parseInt(DisLeguminosasComidaVal) - totalEqComidaLeguminosas1
       /** Agua */
       const ComidaEqAgua = !!arrayComidaPlatillo1 &&  Object.keys(arrayComidaPlatillo1).map((key)=> arrayComidaPlatillo1[key].clase === "9" ?arrayComidaPlatillo1[key].eq:0)
       const sumComidaEqAgua = !! arrayComidaPlatillo1 && ComidaEqAgua.reduce((a,b) => a + b)
       const ComidaEqAgua2 = !!arrayComidaPlatillo2 &&  Object.keys(arrayComidaPlatillo2).map((key)=> arrayComidaPlatillo2[key].clase === "9" ?arrayComidaPlatillo2[key].eq:0)
       const sumComidaEqAgua2 = !! arrayComidaPlatillo2 && ComidaEqAgua2.reduce((a,b) => a + b)
       const ComidaEqAgua3 = !!arrayComidaPlatillo3 &&  Object.keys(arrayComidaPlatillo3).map((key)=> arrayComidaPlatillo3[key].clase === "9" ?arrayComidaPlatillo3[key].eq:0)
       const sumComidaEqAgua3 = !! arrayComidaPlatillo3 && ComidaEqAgua3.reduce((a,b) => a + b)
       const totalEqComidaAgua1 = sumComidaEqAgua + sumComidaEqAgua2 + sumComidaEqAgua3
       const eqAguaComida = parseInt(DisAguaComidaVal) - totalEqComidaAgua1


       /** COLACION 2 */
    /** Platillo 1 */
    /** Frutas */
    const Colacion2EqFrutas = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "7" ?arrayColacion2Platillo1[key].eq:0)
    const sumColacion2EqFrutas = !! arrayColacion2Platillo1 && Colacion2EqFrutas.reduce((a,b) => a + b)
    const Colacion2EqFrutas2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "7" ?arrayColacion2Platillo2[key].eq:0)
    const sumColacion2EqFrutas2 = !! arrayColacion2Platillo2 && Colacion2EqFrutas2.reduce((a,b) => a + b)
    const Colacion2EqFrutas3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "7" ?arrayColacion2Platillo3[key].eq:0)
    const sumColacion2EqFrutas3 = !! arrayColacion2Platillo3 && Colacion2EqFrutas3.reduce((a,b) => a + b)
    const totalEqColacion21 = sumColacion2EqFrutas + sumColacion2EqFrutas2 + sumColacion2EqFrutas3
    const eqFrutasColacion2 = parseInt(DisfrutaColacion2Val) - totalEqColacion21

     /** Verduras */
     const Colacion2EqVerduras = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "2" ?arrayColacion2Platillo1[key].eq:0)
     const sumColacion2EqVerduras = !! arrayColacion2Platillo1 && Colacion2EqVerduras.reduce((a,b) => a + b)
     const Colacion2EqVerduras2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "2" ?arrayColacion2Platillo2[key].eq:0)
     const sumColacion2EqVerduras2 = !! arrayColacion2Platillo2 && Colacion2EqVerduras2.reduce((a,b) => a + b)
     const Colacion2EqVerduras3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "2" ?arrayColacion2Platillo3[key].eq:0)
     const sumColacion2EqVerduras3 = !! arrayColacion2Platillo3 && Colacion2EqVerduras3.reduce((a,b) => a + b)
     const totalEqColacion2Verduras1 = sumColacion2EqVerduras + sumColacion2EqVerduras2 + sumColacion2EqVerduras3
     const eqVerdurasColacion2 = parseInt(DisVerdurasColacion2Val) - totalEqColacion2Verduras1

     /** Proteinas */
     const Colacion2EqProteinas = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "6" ?arrayColacion2Platillo1[key].eq:0)
     const sumColacion2EqProteinas = !! arrayColacion2Platillo1 && Colacion2EqProteinas.reduce((a,b) => a + b)
     const Colacion2EqProteinas2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "6" ?arrayColacion2Platillo2[key].eq:0)
     const sumColacion2EqProteinas2 = !! arrayColacion2Platillo2 && Colacion2EqProteinas2.reduce((a,b) => a + b)
     const Colacion2EqProteinas3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "6" ?arrayColacion2Platillo3[key].eq:0)
     const sumColacion2EqProteinas3 = !! arrayColacion2Platillo3 && Colacion2EqProteinas3.reduce((a,b) => a + b)
     const totalEqColacion2Proteinas1 = sumColacion2EqProteinas + sumColacion2EqProteinas2 + sumColacion2EqProteinas3
     const eqProteinasColacion2 = parseInt(DisProteinasColacion2Val) - totalEqColacion2Proteinas1
    
    
    
     /** Cereales */
     const Colacion2EqCereales = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "1" ?arrayColacion2Platillo1[key].eq:0)
     const sumColacion2EqCereales = !! arrayColacion2Platillo1 && Colacion2EqCereales.reduce((a,b) => a + b)
     const Colacion2EqCereales2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "1" ?arrayColacion2Platillo2[key].eq:0)
     const sumColacion2EqCereales2 = !! arrayColacion2Platillo2 && Colacion2EqCereales2.reduce((a,b) => a + b)
     const Colacion2EqCereales3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "1" ?arrayColacion2Platillo3[key].eq:0)
     const sumColacion2EqCereales3 = !! arrayColacion2Platillo3 && Colacion2EqCereales3.reduce((a,b) => a + b)
     const totalEqColacion2Cereales1 = sumColacion2EqCereales + sumColacion2EqCereales2 + sumColacion2EqCereales3
     const eqCerealesColacion2 = parseInt(DisCerealesColacion2Val) - totalEqColacion2Cereales1
     /** Lacteos */
     const Colacion2EqLacteos = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "8" ?arrayColacion2Platillo1[key].eq:0)
     const sumColacion2EqLacteos = !! arrayColacion2Platillo1 && Colacion2EqLacteos.reduce((a,b) => a + b)
     const Colacion2EqLacteos2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "8" ?arrayColacion2Platillo2[key].eq:0)
     const sumColacion2EqLacteos2 = !! arrayColacion2Platillo2 && Colacion2EqLacteos2.reduce((a,b) => a + b)
     const Colacion2EqLacteos3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "8" ?arrayColacion2Platillo3[key].eq:0)
     const sumColacion2EqLacteos3 = !! arrayColacion2Platillo3 && Colacion2EqLacteos3.reduce((a,b) => a + b)
     const totalEqColacion2Lacteos1 = sumColacion2EqLacteos + sumColacion2EqLacteos2 + sumColacion2EqLacteos3
     const eqLacteosColacion2 = parseInt(DisLacteosColacion2Val) - totalEqColacion2Lacteos1

     /** Grasas */
     const Colacion2EqGrasas = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "4" ?arrayColacion2Platillo1[key].eq:0)
     const sumColacion2EqGrasas = !! arrayColacion2Platillo1 && Colacion2EqGrasas.reduce((a,b) => a + b)
     const Colacion2EqGrasas2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "4" ?arrayColacion2Platillo2[key].eq:0)
     const sumColacion2EqGrasas2 = !! arrayColacion2Platillo2 && Colacion2EqGrasas2.reduce((a,b) => a + b)
     const Colacion2EqGrasas3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "4" ?arrayColacion2Platillo3[key].eq:0)
     const sumColacion2EqGrasas3 = !! arrayColacion2Platillo3 && Colacion2EqGrasas3.reduce((a,b) => a + b)
     const totalEqColacion2Grasas1 = sumColacion2EqGrasas + sumColacion2EqGrasas2 + sumColacion2EqGrasas3
     const eqGrasasColacion2 = parseInt(DisGrasasColacion2Val) - totalEqColacion2Grasas1
    
     /** Azucares */
       const Colacion2EqAzucares = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "5" ?arrayColacion2Platillo1[key].eq:0)
       const sumColacion2EqAzucares = !! arrayColacion2Platillo1 && Colacion2EqAzucares.reduce((a,b) => a + b)
       const Colacion2EqAzucares2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "5" ?arrayColacion2Platillo2[key].eq:0)
       const sumColacion2EqAzucares2 = !! arrayColacion2Platillo2 && Colacion2EqAzucares2.reduce((a,b) => a + b)
       const Colacion2EqAzucares3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "5" ?arrayColacion2Platillo3[key].eq:0)
       const sumColacion2EqAzucares3 = !! arrayColacion2Platillo3 && Colacion2EqAzucares3.reduce((a,b) => a + b)
       const totalEqColacion2Azucares1 = sumColacion2EqAzucares + sumColacion2EqAzucares2 + sumColacion2EqAzucares3
       const eqAzucaresColacion2 = parseInt(DisAzucaresColacion2Val) - totalEqColacion2Azucares1
      /** Leguminosas */
      const Colacion2EqLeguminosas = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "3" ?arrayColacion2Platillo1[key].eq:0)
      const sumColacion2EqLeguminosas = !! arrayColacion2Platillo1 && Colacion2EqLeguminosas.reduce((a,b) => a + b)
      const Colacion2EqLeguminosas2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "3" ?arrayColacion2Platillo2[key].eq:0)
      const sumColacion2EqLeguminosas2 = !! arrayColacion2Platillo2 && Colacion2EqLeguminosas2.reduce((a,b) => a + b)
      const Colacion2EqLeguminosas3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "3" ?arrayColacion2Platillo3[key].eq:0)
      const sumColacion2EqLeguminosas3 = !! arrayColacion2Platillo3 && Colacion2EqLeguminosas3.reduce((a,b) => a + b)
      const totalEqColacion2Leguminosas1 = sumColacion2EqLeguminosas + sumColacion2EqLeguminosas2 + sumColacion2EqLeguminosas3
      const eqLeguminosasColacion2 = parseInt(DisLeguminosasColacion2Val) - totalEqColacion2Leguminosas1
       /** Agua */
       const Colacion2EqAgua = !!arrayColacion2Platillo1 &&  Object.keys(arrayColacion2Platillo1).map((key)=> arrayColacion2Platillo1[key].clase === "9" ?arrayColacion2Platillo1[key].eq:0)
       const sumColacion2EqAgua = !! arrayColacion2Platillo1 && Colacion2EqAgua.reduce((a,b) => a + b)
       const Colacion2EqAgua2 = !!arrayColacion2Platillo2 &&  Object.keys(arrayColacion2Platillo2).map((key)=> arrayColacion2Platillo2[key].clase === "9" ?arrayColacion2Platillo2[key].eq:0)
       const sumColacion2EqAgua2 = !! arrayColacion2Platillo2 && Colacion2EqAgua2.reduce((a,b) => a + b)
       const Colacion2EqAgua3 = !!arrayColacion2Platillo3 &&  Object.keys(arrayColacion2Platillo3).map((key)=> arrayColacion2Platillo3[key].clase === "9" ?arrayColacion2Platillo3[key].eq:0)
       const sumColacion2EqAgua3 = !! arrayColacion2Platillo3 && Colacion2EqAgua3.reduce((a,b) => a + b)
       const totalEqColacion2Agua1 = sumColacion2EqAgua + sumColacion2EqAgua2 + sumColacion2EqAgua3
       const eqAguaColacion2 = parseInt(DisAguaColacion2Val) - totalEqColacion2Agua1




       /** C   E   N   A  -  C  E   N  A */
    /** Platillo 1 */
    /** Frutas */
    const CenaEqFrutas = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "7" ?arrayCenaPlatillo1[key].eq:0)
    const sumCenaEqFrutas = !! arrayCenaPlatillo1 && CenaEqFrutas.reduce((a,b) => a + b)
    const CenaEqFrutas2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "7" ?arrayCenaPlatillo2[key].eq:0)
    const sumCenaEqFrutas2 = !! arrayCenaPlatillo2 && CenaEqFrutas2.reduce((a,b) => a + b)
    const CenaEqFrutas3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "7" ?arrayCenaPlatillo3[key].eq:0)
    const sumCenaEqFrutas3 = !! arrayCenaPlatillo3 && CenaEqFrutas3.reduce((a,b) => a + b)
    const totalEqCena1 = sumCenaEqFrutas + sumCenaEqFrutas2 + sumCenaEqFrutas3
    const eqFrutasCena = parseInt(DisfrutaCenaVal) - totalEqCena1

     /** Verduras */
     const CenaEqVerduras = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "2" ?arrayCenaPlatillo1[key].eq:0)
     const sumCenaEqVerduras = !! arrayCenaPlatillo1 && CenaEqVerduras.reduce((a,b) => a + b)
     const CenaEqVerduras2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "2" ?arrayCenaPlatillo2[key].eq:0)
     const sumCenaEqVerduras2 = !! arrayCenaPlatillo2 && CenaEqVerduras2.reduce((a,b) => a + b)
     const CenaEqVerduras3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "2" ?arrayCenaPlatillo3[key].eq:0)
     const sumCenaEqVerduras3 = !! arrayCenaPlatillo3 && CenaEqVerduras3.reduce((a,b) => a + b)
     const totalEqCenaVerduras1 = sumCenaEqVerduras + sumCenaEqVerduras2 + sumCenaEqVerduras3
     const eqVerdurasCena = parseInt(DisVerdurasCenaVal) - totalEqCenaVerduras1

     /** Proteinas */
     const CenaEqProteinas = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "6" ?arrayCenaPlatillo1[key].eq:0)
     const sumCenaEqProteinas = !! arrayCenaPlatillo1 && CenaEqProteinas.reduce((a,b) => a + b)
     const CenaEqProteinas2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "6" ?arrayCenaPlatillo2[key].eq:0)
     const sumCenaEqProteinas2 = !! arrayCenaPlatillo2 && CenaEqProteinas2.reduce((a,b) => a + b)
     const CenaEqProteinas3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "6" ?arrayCenaPlatillo3[key].eq:0)
     const sumCenaEqProteinas3 = !! arrayCenaPlatillo3 && CenaEqProteinas3.reduce((a,b) => a + b)
     const totalEqCenaProteinas1 = sumCenaEqProteinas + sumCenaEqProteinas2 + sumCenaEqProteinas3
     const eqProteinasCena = parseInt(DisProteinasCenaVal) - totalEqCenaProteinas1
    
    
    
     /** Cereales */
     const CenaEqCereales = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "1" ?arrayCenaPlatillo1[key].eq:0)
     const sumCenaEqCereales = !! arrayCenaPlatillo1 && CenaEqCereales.reduce((a,b) => a + b)
     const CenaEqCereales2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "1" ?arrayCenaPlatillo2[key].eq:0)
     const sumCenaEqCereales2 = !! arrayCenaPlatillo2 && CenaEqCereales2.reduce((a,b) => a + b)
     const CenaEqCereales3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "1" ?arrayCenaPlatillo3[key].eq:0)
     const sumCenaEqCereales3 = !! arrayCenaPlatillo3 && CenaEqCereales3.reduce((a,b) => a + b)
     const totalEqCenaCereales1 = sumCenaEqCereales + sumCenaEqCereales2 + sumCenaEqCereales3
     const eqCerealesCena = parseInt(DisCerealesCenaVal) - totalEqCenaCereales1
     /** Lacteos */
     const CenaEqLacteos = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "8" ?arrayCenaPlatillo1[key].eq:0)
     const sumCenaEqLacteos = !! arrayCenaPlatillo1 && CenaEqLacteos.reduce((a,b) => a + b)
     const CenaEqLacteos2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "8" ?arrayCenaPlatillo2[key].eq:0)
     const sumCenaEqLacteos2 = !! arrayCenaPlatillo2 && CenaEqLacteos2.reduce((a,b) => a + b)
     const CenaEqLacteos3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "8" ?arrayCenaPlatillo3[key].eq:0)
     const sumCenaEqLacteos3 = !! arrayCenaPlatillo3 && CenaEqLacteos3.reduce((a,b) => a + b)
     const totalEqCenaLacteos1 = sumCenaEqLacteos + sumCenaEqLacteos2 + sumCenaEqLacteos3
     const eqLacteosCena = parseInt(DisLacteosCenaVal) - totalEqCenaLacteos1

     /** Grasas */
     const CenaEqGrasas = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "4" ?arrayCenaPlatillo1[key].eq:0)
     const sumCenaEqGrasas = !! arrayCenaPlatillo1 && CenaEqGrasas.reduce((a,b) => a + b)
     const CenaEqGrasas2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "4" ?arrayCenaPlatillo2[key].eq:0)
     const sumCenaEqGrasas2 = !! arrayCenaPlatillo2 && CenaEqGrasas2.reduce((a,b) => a + b)
     const CenaEqGrasas3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "4" ?arrayCenaPlatillo3[key].eq:0)
     const sumCenaEqGrasas3 = !! arrayCenaPlatillo3 && CenaEqGrasas3.reduce((a,b) => a + b)
     const totalEqCenaGrasas1 = sumCenaEqGrasas + sumCenaEqGrasas2 + sumCenaEqGrasas3
     const eqGrasasCena = parseInt(DisGrasasCenaVal) - totalEqCenaGrasas1
    
     /** Azucares */
       const CenaEqAzucares = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "5" ?arrayCenaPlatillo1[key].eq:0)
       const sumCenaEqAzucares = !! arrayCenaPlatillo1 && CenaEqAzucares.reduce((a,b) => a + b)
       const CenaEqAzucares2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "5" ?arrayCenaPlatillo2[key].eq:0)
       const sumCenaEqAzucares2 = !! arrayCenaPlatillo2 && CenaEqAzucares2.reduce((a,b) => a + b)
       const CenaEqAzucares3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "5" ?arrayCenaPlatillo3[key].eq:0)
       const sumCenaEqAzucares3 = !! arrayCenaPlatillo3 && CenaEqAzucares3.reduce((a,b) => a + b)
       const totalEqCenaAzucares1 = sumCenaEqAzucares + sumCenaEqAzucares2 + sumCenaEqAzucares3
       const eqAzucaresCena = parseInt(DisAzucaresCenaVal) - totalEqCenaAzucares1
      /** Leguminosas */
      const CenaEqLeguminosas = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "3" ?arrayCenaPlatillo1[key].eq:0)
      const sumCenaEqLeguminosas = !! arrayCenaPlatillo1 && CenaEqLeguminosas.reduce((a,b) => a + b)
      const CenaEqLeguminosas2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "3" ?arrayCenaPlatillo2[key].eq:0)
      const sumCenaEqLeguminosas2 = !! arrayCenaPlatillo2 && CenaEqLeguminosas2.reduce((a,b) => a + b)
      const CenaEqLeguminosas3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "3" ?arrayCenaPlatillo3[key].eq:0)
      const sumCenaEqLeguminosas3 = !! arrayCenaPlatillo3 && CenaEqLeguminosas3.reduce((a,b) => a + b)
      const totalEqCenaLeguminosas1 = sumCenaEqLeguminosas + sumCenaEqLeguminosas2 + sumCenaEqLeguminosas3
      const eqLeguminosasCena = parseInt(DisLeguminosasCenaVal) - totalEqCenaLeguminosas1
       /** Agua */
       const CenaEqAgua = !!arrayCenaPlatillo1 &&  Object.keys(arrayCenaPlatillo1).map((key)=> arrayCenaPlatillo1[key].clase === "9" ?arrayCenaPlatillo1[key].eq:0)
       const sumCenaEqAgua = !! arrayCenaPlatillo1 && CenaEqAgua.reduce((a,b) => a + b)
       const CenaEqAgua2 = !!arrayCenaPlatillo2 &&  Object.keys(arrayCenaPlatillo2).map((key)=> arrayCenaPlatillo2[key].clase === "9" ?arrayCenaPlatillo2[key].eq:0)
       const sumCenaEqAgua2 = !! arrayCenaPlatillo2 && CenaEqAgua2.reduce((a,b) => a + b)
       const CenaEqAgua3 = !!arrayCenaPlatillo3 &&  Object.keys(arrayCenaPlatillo3).map((key)=> arrayCenaPlatillo3[key].clase === "9" ?arrayCenaPlatillo3[key].eq:0)
       const sumCenaEqAgua3 = !! arrayCenaPlatillo3 && CenaEqAgua3.reduce((a,b) => a + b)
       const totalEqCenaAgua1 = sumCenaEqAgua + sumCenaEqAgua2 + sumCenaEqAgua3
       const eqAguaCena = parseInt(DisAguaCenaVal) - totalEqCenaAgua1


   
    const valido = eqFrutas <= -1 || eqVerduras <= -1 || eqProteinas <= -1 || eqCereales <= -1 || eqAzucares <= -1 || eqGrasas <= -1
                                  || eqLeguminosas <= -1 || eqAgua <= -1
    const validoColacion1 = eqFrutasColacion1 <= -1 || eqVerdurasColacion1 <= -1 || eqProteinasColacion1 <= -1 || eqCerealesColacion1 <= -1 || eqAzucaresColacion1 <= -1 || eqGrasasColacion1 <= -1
                                  || eqLeguminosasColacion1 <= -1 || eqAguaColacion1 <= -1
    const validoComida = eqFrutasComida <= -1 || eqVerdurasComida <= -1 || eqProteinasComida <= -1 || eqCerealesComida <= -1 || eqAzucaresComida <= -1 || eqGrasasComida <= -1
                                  || eqLeguminosasComida <= -1 || eqAguaComida <= -1
    const validoColacion2 = eqFrutasColacion2 <= -1 || eqVerdurasColacion2 <= -1 || eqProteinasColacion2 <= -1 || eqCerealesColacion2 <= -1 || eqAzucaresColacion2 <= -1 || eqGrasasColacion2 <= -1
                                  || eqLeguminosasColacion2 <= -1 || eqAguaColacion2 <= -1
    const validoCena = eqFrutasCena <= -1 || eqVerdurasCena <= -1 || eqProteinasCena <= -1 || eqCerealesCena <= -1 || eqAzucaresCena <= -1 || eqGrasasCena <= -1
                                  || eqLeguminosasCena <= -1 || eqAguaCena <= -1

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
      ? validoColacion1
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

    <NavItem eventKey={3} onClick={this.stepDieta3}>
   { this.state.checkComida == true
      ? validoComida
        ? <div className="circuloCheckRed"><AlertCircle  className="icoCheckDietas" size={20} /></div>
        : <div className="circuloCheck"><Check  className="icoCheckDietas" size={20} /></div>
    :null
    }  
    { this.state.stepComida == true
    ? <img className="iconDieta"src={icoComidaActivado} />
    : <img className="iconDieta"src={icoComida} />
    }
    <p className="parrafoDieta">Comida</p>      
     </NavItem>
    </Col>
     <Col md="2">
     <NavItem eventKey={3} onClick={this.stepDieta4}>
     { this.state.checkColacion2 == true
      ? validoColacion2
        ? <div className="circuloCheckRed"><AlertCircle  className="icoCheckDietas" size={20} /></div>
        : <div className="circuloCheck"><Check  className="icoCheckDietas" size={20} /></div>
    :null
    } 
     { this.state.stepColacion2 == true
    ? <img className="iconDieta"src={icoColacionActivado} />
    : <img className="iconDieta"src={icoColacion} />
    }
    <p className="parrafoDieta">Colación 2</p>
    </NavItem>
    </Col>
   
    <Col md="2">
    <NavItem eventKey={3} onClick={this.stepDieta5}>
    { this.state.checkCena == true
      ? validoCena
        ? <div className="circuloCheckRed"><AlertCircle  className="icoCheckDietas" size={20} /></div>
        : <div className="circuloCheck"><Check  className="icoCheckDietas" size={20} /></div>
    :null
    } 
    { this.state.stepCena == true
    ? <img className="iconDieta"src={icoCenaActivado} />
    : <img className="iconDieta"src={icoCena} />
    }
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
                        nombre={this.state.nombrePlatilloDesayuno}
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
                         {  
                             this.state.stepColacion1 === true
                             ? <span>
                        <Col md="8">
                        <Platillo1Colacion1 
                        arrayPlatillo={this.state.platillo1Colacion1Array} 
                        alimentosFiltro={this.state.filteredAlimentoColacion1}
                        busqueda={this.buscarPlatillo1Colacion1}
                        mostrarAlimento={this.enviarAlientoColacion1}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo1Colacion1}
                        clase={this.state.platillo1colacion1}
                        borrar={this.borrarAlimentoColacion1Platillo1}
                        Eq={this.enviarEqColacion1Platillo1}
                        fuera={this.fuera}
                        cargador={this.state.cargandoColacion1}
                        />
                        <Platillo2Colacion1 
                        arrayPlatillo={this.state.platillo2Colacion1Array} 
                        alimentosFiltro={this.state.filteredAlimento2Colacion1}
                        busqueda={this.buscarPlatillo2Colacion1}
                        mostrarAlimento={this.enviarAlimentoPlatillo2Colacion1}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo2Colacion1}
                        clase={this.state.platillo2colacion1}
                        mostrar={this.state.mostrarColacion1}
                        borrar={this.borrarAlimentoColacion1Platillo2}
                        Eq={this.enviarEqColacion1Platillo2}
                        fuera={this.fuera}
                        cargador={this.state.cargandoColacion1Platillo2}
                        />


                        <Platillo3Colacion1 
                        arrayPlatillo={this.state.platillo3Colacion1Array} 
                        alimentosFiltro={this.state.filteredAlimento3Colacion1}
                        busqueda={this.buscarPlatillo3Colacion1}
                        mostrarAlimento={this.enviarAlimentoPlatillo3Colacion1}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo3Colacion1}
                        clase={this.state.platillo3colacion1}
                        mostrar={this.state.mostrarPlatillo3Colacion1}
                        borrar={this.borrarAlimentoColacion1Platillo3}
                        Eq={this.enviarEqColacion1Platillo3}
                        fuera={this.fuera}
                        cargador={this.state.cargandoColacion1Platillo3}
                        />
                        </Col>
                        <TablaNutrimentalDesayuno
                        sumaKcal={sumar}
                        suma={sumatoria}
                        />
                        </span>
                         
                         :null

                         }
                         {this.state.stepComida === true
                             ? <span>
                             <Col md="8">
                        <Platillo1Comida 
                        arrayPlatillo={this.state.platillo1ComidaArray} 
                        alimentosFiltro={this.state.filteredAlimento1Comida} 
                        busqueda={this.buscarPlatillo1Comida}
                        mostrarAlimento={this.enviarAlimentoPlatillo1Comida}
                        nombrePlatillo={this.enviarNombre1Comida}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo1Comida}
                        clase={this.state.platillo1comida}
                        borrar={this.borrarAlimentoComidaPlatillo1}
                        Eq={this.enviarEqComidaPlatillo1}
                        fuera={this.fuera}
                        cargador={this.state.cargandoComidaPlatillo1}
                        />
                        <Platillo2Comida 
                        arrayPlatillo={this.state.platillo2ComidaArray} 
                        alimentosFiltro={this.state.filteredAlimento2Comida}
                        busqueda={this.buscarPlatillo2Comida}
                        mostrarAlimento={this.enviarAlimentoPlatillo2Comida}
                        nombrePlatillo={this.enviarNombre2Comida}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo2Comida}
                        clase={this.state.platillo2comida}
                        mostrar={this.state.mostrarComida}
                        borrar={this.borrarAlimentoComidaPlatillo2}
                        Eq={this.enviarEqComidaPlatillo2}
                        fuera={this.fuera}
                        cargador={this.state.cargandoComidaPlatillo2}
                        />


                        <Platillo3Comida 
                        arrayPlatillo={this.state.platillo3ComidaArray} 
                        alimentosFiltro={this.state.filteredAlimento3Comida}
                        busqueda={this.buscarPlatillo3Comida}
                        mostrarAlimento={this.enviarAlimentoPlatillo3Comida}
                        nombrePlatillo={this.enviarNombre3Comida}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo3Comida}
                        clase={this.state.platillo3comida}
                        mostrar={this.state.mostrarPlatillo3Comida}
                        borrar={this.borrarAlimentoComidaPlatillo3}
                        Eq={this.enviarEqComidaPlatillo3}
                        fuera={this.fuera}
                        cargador={this.state.cargandoComidaPlatillo3}
                        />
                        </Col>
                        <TablaNutrimentalComida
                        sumaKcal={sumar}
                        suma={sumatoria}
                        />
                        </span>
                         
                         :null

                         }

                         {  
                             this.state.stepColacion2 === true
                             ? <span>
                        <Col md="8">
                        <Platillo1Colacion2 
                        arrayPlatillo={this.state.platillo1Colacion2Array} 
                        alimentosFiltro={this.state.filteredAlimentoColacion2}
                        busqueda={this.buscarPlatillo1Colacion2}
                        mostrarAlimento={this.enviarAlimentoColacion2}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo1Colacion2}
                        clase={this.state.platillo1colacion2}
                        borrar={this.borrarAlimentoColacion2Platillo1}
                        Eq={this.enviarEqColacion2Platillo1}
                        fuera={this.fuera}
                        cargador={this.state.cargandoColacion2}
                        />
                        <Platillo2Colacion2 
                        arrayPlatillo={this.state.platillo2Colacion2Array} 
                        alimentosFiltro={this.state.filteredAlimento2Colacion2}
                        busqueda={this.buscarPlatillo2Colacion2}
                        mostrarAlimento={this.enviarAlimentoPlatillo2Colacion2}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo2Colacion2}
                        clase={this.state.platillo2colacion2}
                        mostrar={this.state.mostrarColacion2}
                        borrar={this.borrarAlimentoColacion2Platillo2}
                        Eq={this.enviarEqColacion2Platillo2}
                        fuera={this.fuera}
                        cargador={this.state.cargandoColacion2Platillo2}
                        />

                        <Platillo3Colacion2 
                        arrayPlatillo={this.state.platillo3Colacion2Array} 
                        alimentosFiltro={this.state.filteredAlimento3Colacion2}
                        busqueda={this.buscarPlatillo3Colacion2}
                        mostrarAlimento={this.enviarAlimentoPlatillo3Colacion2}
                        nombrePlatillo={this.enviarNombre}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo3Colacion2}
                        clase={this.state.platillo3colacion2}
                        mostrar={this.state.mostrarPlatillo3Colacion2}
                        borrar={this.borrarAlimentoColacion2Platillo3}
                        Eq={this.enviarEqColacion2Platillo3}
                        fuera={this.fuera}
                        cargador={this.state.cargandoColacion2Platillo3}
                        />
                        </Col>
                        <TablaNutrimentalDesayuno
                        sumaKcal={sumar}
                        suma={sumatoria}
                        />
                        </span>
                         
                         :null

                         }
                         {  
                             this.state.stepCena === true
                             ? <span>
                        <Col md="8">
                        <Platillo1Cena 
                        arrayPlatillo={this.state.platillo1CenaArray} 
                        alimentosFiltro={this.state.filteredAlimentoCena} 
                        busqueda={this.buscarPlatillo1Cena}
                        mostrarAlimento={this.enviarAlimentoCena}
                        nombrePlatillo={this.enviarNombre1Cena}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo1Cena}
                        clase={this.state.platillo1cena}
                        borrar={this.borrarAlimentoCenaPlatillo1}
                        Eq={this.enviarEqCenaPlatillo1}
                        fuera={this.fuera}
                        cargador={this.state.cargandoCena}
                        />
                        <Platillo2Cena 
                        arrayPlatillo={this.state.platillo2CenaArray} 
                        alimentosFiltro={this.state.filteredAlimento2Cena}
                        busqueda={this.buscarPlatillo2Cena}
                        mostrarAlimento={this.enviarAlimentoPlatillo2Cena}
                        nombrePlatillo={this.enviarNombre2Cena}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo2Cena}
                        clase={this.state.platillo2cena}
                        mostrar={this.state.mostrarCena}
                        borrar={this.borrarAlimentoCenaPlatillo2}
                        Eq={this.enviarEqCenaPlatillo2}
                        fuera={this.fuera}
                        cargador={this.state.cargandoCenaPlatillo2}
                        />


                        <Platillo3Cena 
                        arrayPlatillo={this.state.platillo3CenaArray} 
                        alimentosFiltro={this.state.filteredAlimento3Cena}
                        busqueda={this.buscarPlatillo3Cena}
                        mostrarAlimento={this.enviarAlimentoPlatillo3Cena}
                        nombrePlatillo={this.enviarNombre3Cena}
                        resultadoAlimentos={this.state.mostrarAlimentos}
                        activar={this.activarPlatillo3Cena}
                        clase={this.state.platillo3cena}
                        mostrar={this.state.mostrarPlatillo3Cena}
                        borrar={this.borrarAlimentoCenaPlatillo3}
                        Eq={this.enviarEqCenaPlatillo3}
                        fuera={this.fuera}
                        cargador={this.state.cargandoCenaPlatillo3}
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
          
          {this.state.bottomNavColacion1 == true ?<div>
           <div className="eqTablero">
           <div className={eqFrutasColacion1 === 0 ?"triggerGrey": eqFrutasColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqFrutasColacion1}</span></div><img className="icon" src={ico1} /></div>
           <div className="eqTablero">
               <div className={eqVerdurasColacion1 === 0 ?"triggerGrey": eqVerdurasColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqVerdurasColacion1}</span></div><img className="icon" src={ico2} /></div>
           <div className="eqTablero">
               <div className={eqProteinasColacion1 === 0 ?"triggerGrey": eqProteinasColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqProteinasColacion1}</span></div><img className="icon" src={ico3} /></div>
           <div className="eqTablero"> 
               <div className={eqGrasasColacion1 === 0 ?"triggerGrey": eqGrasasColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqGrasasColacion1}</span></div><img className="icon" src={ico4} /></div>
           <div className="eqTablero"> 
               <div className={eqLacteosColacion1 === 0 ?"triggerGrey": eqLacteosColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqLacteosColacion1}</span></div><img className="icon" src={ico5} /></div>
           <div className="eqTablero"> 
               <div className={eqAzucaresColacion1 === 0 ?"triggerGrey": eqAzucaresColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqAzucaresColacion1}</span></div><img className="icon" src={ico6} /></div>
           <div className="eqTablero"> 
               <div className={eqCerealesColacion1 === 0 ?"triggerGrey": eqCerealesColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqCerealesColacion1}</span></div><img className="icon" src={ico7} /></div>
           <div className="eqTablero">  
               <div className={eqLeguminosasColacion1 === 0 ?"triggerGrey": eqLeguminosasColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqLeguminosasColacion1}</span></div><img className="icon" src={ico9} /></div>
           <div className="eqTablero">  
               <div className={eqAguaColacion1 === 0 ?"triggerGrey": eqAguaColacion1 >= 0 ?"trigger": "triggerRed"}><span>{eqAguaColacion1}</span></div><img className="icon" src={ico8} /></div>
               </div>
          :null }
          {this.state.bottomNavComida == true ?<div>
           <div className="eqTablero">
           <div className={eqFrutasComida === 0 ?"triggerGrey": eqFrutasComida >= 0 ?"trigger": "triggerRed"}><span>{eqFrutasComida}</span></div><img className="icon" src={ico1} /></div>
           <div className="eqTablero">
               <div className={eqVerdurasComida === 0 ?"triggerGrey": eqVerdurasComida >= 0 ?"trigger": "triggerRed"}><span>{eqVerdurasComida}</span></div><img className="icon" src={ico2} /></div>
           <div className="eqTablero">
               <div className={eqProteinasComida === 0 ?"triggerGrey": eqProteinasComida >= 0 ?"trigger": "triggerRed"}><span>{eqProteinasComida}</span></div><img className="icon" src={ico3} /></div>
           <div className="eqTablero"> 
               <div className={eqGrasasComida === 0 ?"triggerGrey": eqGrasasComida >= 0 ?"trigger": "triggerRed"}><span>{eqGrasasComida}</span></div><img className="icon" src={ico4} /></div>
           <div className="eqTablero"> 
               <div className={eqLacteosComida === 0 ?"triggerGrey": eqLacteosComida >= 0 ?"trigger": "triggerRed"}><span>{eqLacteosComida}</span></div><img className="icon" src={ico5} /></div>
           <div className="eqTablero"> 
               <div className={eqAzucaresComida === 0 ?"triggerGrey": eqAzucaresComida >= 0 ?"trigger": "triggerRed"}><span>{eqAzucaresComida}</span></div><img className="icon" src={ico6} /></div>
           <div className="eqTablero"> 
               <div className={eqCerealesComida === 0 ?"triggerGrey": eqCerealesComida >= 0 ?"trigger": "triggerRed"}><span>{eqCerealesComida}</span></div><img className="icon" src={ico7} /></div>
           <div className="eqTablero">  
               <div className={eqLeguminosasComida === 0 ?"triggerGrey": eqLeguminosasComida >= 0 ?"trigger": "triggerRed"}><span>{eqLeguminosasComida}</span></div><img className="icon" src={ico9} /></div>
           <div className="eqTablero">  
               <div className={eqAguaComida === 0 ?"triggerGrey": eqAguaComida >= 0 ?"trigger": "triggerRed"}><span>{eqAguaComida}</span></div><img className="icon" src={ico8} /></div>
               </div>
          :null }

          {this.state.bottomNavColacion2 == true ?<div>
           <div className="eqTablero">
           <div className={eqFrutasColacion2 === 0 ?"triggerGrey": eqFrutasColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqFrutasColacion2}</span></div><img className="icon" src={ico1} /></div>
           <div className="eqTablero">
               <div className={eqVerdurasColacion2 === 0 ?"triggerGrey": eqVerdurasColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqVerdurasColacion2}</span></div><img className="icon" src={ico2} /></div>
           <div className="eqTablero">
               <div className={eqProteinasColacion2 === 0 ?"triggerGrey": eqProteinasColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqProteinasColacion2}</span></div><img className="icon" src={ico3} /></div>
           <div className="eqTablero"> 
               <div className={eqGrasasColacion2 === 0 ?"triggerGrey": eqGrasasColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqGrasasColacion2}</span></div><img className="icon" src={ico4} /></div>
           <div className="eqTablero"> 
               <div className={eqLacteosColacion2 === 0 ?"triggerGrey": eqLacteosColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqLacteosColacion2}</span></div><img className="icon" src={ico5} /></div>
           <div className="eqTablero"> 
               <div className={eqAzucaresColacion2 === 0 ?"triggerGrey": eqAzucaresColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqAzucaresColacion2}</span></div><img className="icon" src={ico6} /></div>
           <div className="eqTablero"> 
               <div className={eqCerealesColacion2 === 0 ?"triggerGrey": eqCerealesColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqCerealesColacion2}</span></div><img className="icon" src={ico7} /></div>
           <div className="eqTablero">  
               <div className={eqLeguminosasColacion2 === 0 ?"triggerGrey": eqLeguminosasColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqLeguminosasColacion2}</span></div><img className="icon" src={ico9} /></div>
           <div className="eqTablero">  
               <div className={eqAguaColacion2 === 0 ?"triggerGrey": eqAguaColacion2 >= 0 ?"trigger": "triggerRed"}><span>{eqAguaColacion2}</span></div><img className="icon" src={ico8} /></div>
               </div>
          :null }
          {this.state.bottomNavCena == true ?<div>
           <div className="eqTablero">
           <div className={eqFrutasCena === 0 ?"triggerGrey": eqFrutasCena >= 0 ?"trigger": "triggerRed"}><span>{eqFrutasCena}</span></div><img className="icon" src={ico1} /></div>
           <div className="eqTablero">
               <div className={eqVerdurasCena === 0 ?"triggerGrey": eqVerdurasCena >= 0 ?"trigger": "triggerRed"}><span>{eqVerdurasCena}</span></div><img className="icon" src={ico2} /></div>
           <div className="eqTablero">
               <div className={eqProteinasCena === 0 ?"triggerGrey": eqProteinasCena >= 0 ?"trigger": "triggerRed"}><span>{eqProteinasCena}</span></div><img className="icon" src={ico3} /></div>
           <div className="eqTablero"> 
               <div className={eqGrasasCena === 0 ?"triggerGrey": eqGrasasCena >= 0 ?"trigger": "triggerRed"}><span>{eqGrasasCena}</span></div><img className="icon" src={ico4} /></div>
           <div className="eqTablero"> 
               <div className={eqLacteosCena === 0 ?"triggerGrey": eqLacteosCena >= 0 ?"trigger": "triggerRed"}><span>{eqLacteosCena}</span></div><img className="icon" src={ico5} /></div>
           <div className="eqTablero"> 
               <div className={eqAzucaresCena === 0 ?"triggerGrey": eqAzucaresCena >= 0 ?"trigger": "triggerRed"}><span>{eqAzucaresCena}</span></div><img className="icon" src={ico6} /></div>
           <div className="eqTablero"> 
               <div className={eqCerealesCena === 0 ?"triggerGrey": eqCerealesCena >= 0 ?"trigger": "triggerRed"}><span>{eqCerealesCena}</span></div><img className="icon" src={ico7} /></div>
           <div className="eqTablero">  
               <div className={eqLeguminosasCena === 0 ?"triggerGrey": eqLeguminosasCena >= 0 ?"trigger": "triggerRed"}><span>{eqLeguminosasCena}</span></div><img className="icon" src={ico9} /></div>
           <div className="eqTablero">  
               <div className={eqAguaCena === 0 ?"triggerGrey": eqAguaCena >= 0 ?"trigger": "triggerRed"}><span>{eqAguaCena}</span></div><img className="icon" src={ico8} /></div>
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