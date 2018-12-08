import React, {Component} from 'react';
import * as d3 from "d3";
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import { LineChart, Line, CartesianGrid,YAxis,XAxis, Tooltip,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis, Radar } from 'recharts';

const data = [
      {name: 'Enero', IMC: 42, META: 30, amt: 2400},
      {name: 'Febrero', IMC: 39, META: 30, amt: 2210},
      {name: 'Marzo', IMC: 40, META: 30, amt: 2290},
      {name: 'Abril', IMC: 35, META: 30, amt: 2000},
      {name: 'Mayo', IMC: 34, META: 30, amt: 2181},
      {name: 'Junio', IMC: 29, META: 30, amt: 2500},
      {name: 'Agosto', IMC: 36, META: 30, amt: 2100},
             ]

             const data2 = [
                { subject: 'Math', A: 120, B: 110, fullMark: 150 },
                { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
                { subject: 'English', A: 86, B: 130, fullMark: 150 },
                { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
                { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
                { subject: 'History', A: 65, B: 85, fullMark: 150 },
                
                
            ];


class BarChart extends Component {

    componentDidMount () {
        
      
      }
     
 



      render(){
          return(
            <LineChart width={800} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  <Line type="monotone" dataKey="IMC" stroke="#EB0E54" />
  <Line type="monotone" dataKey="META" stroke="#6FD904" />
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
</LineChart>
    
       

         

    

      )
      }
}


export default BarChart;