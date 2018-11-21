import React from 'react'
import Alimento  from './alimento'


const ListaDeAlimentos = ( props ) => (
  <ul className="CoursesList">
    {
      props.alimentos.map(alimento => (
        <Alimento
          
          name={alimento.alimento}
          unidad={alimento.unidad}
         
        />
      )).reverse()
    }
  </ul>
)

export default ListaDeAlimentos