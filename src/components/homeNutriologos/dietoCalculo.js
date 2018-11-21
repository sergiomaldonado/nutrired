import React, { Component } from 'react'
import './../App.css'
import { Grid,Row, Col, FormGroup, FormControl,Navbar, Button} from 'react-bootstrap'
import { CheckCircle, AlertCircle, ChevronDown, ArrowRight} from 'react-feather'
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

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class DietoCalculo extends Component {
  constructor(props, context) {
    
    super(props, context);
    this.state = {
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
    }
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

  /** Funciones Set de Valores de Tablero de resultados de meta  */
  metaKcalDieta = (value) => { this.setState({ metaKcalDieta: value }) }

  cerrarDieta = () =>{
      this.setState({
          show:true
      })
  }

  alertDesde =()=>{
      alert("holaDesdeHijo")
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
      return(
          <div>
         
           
                <div className="dietoCalculo" onClick={this}>
                    
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
      )}}


export default DietoCalculo;