import React, { Component } from 'react'
import withAutorization from '../withAutorization'
import Comunidad from '../comunidad'

class ComunidadNutriologos extends Component {
  render() {
    const { auth } = this.props
    return <Comunidad auth={auth} type="nutriologos" />
  }
}

const authCondition = authUser => !!authUser

export default withAutorization(authCondition)(ComunidadNutriologos)
