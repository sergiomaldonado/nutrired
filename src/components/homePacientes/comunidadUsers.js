import React, { Component } from 'react'
import Comunidad from '../comunidad'
import withAutorization from '../withAutorization'
// 
class ComunidadPacientes extends Component {
  render() {
    const { auth } = this.props
    return <Comunidad auth={auth} type="pacientes" />
  }
}

const authCondition = authUser => !!authUser

export default withAutorization(authCondition)(ComunidadPacientes)
