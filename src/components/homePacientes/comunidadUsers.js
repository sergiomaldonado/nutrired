import React, { Component } from 'react'
import Comunidad from '../comunidad'
import withAutorization from '../withAutorization'

class ComunidadPacientes extends Component {
  // componentDidMount() {
  //   const { auth } = this.props
  //   if (!auth) return
  //   this.getUser(auth)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.auth === this.props.auth) return
  // }

  render() {
    const { auth } = this.props
    return <Comunidad auth={auth} type="pacientes" />
  }
}

const authCondition = authUser => !!authUser

export default withAutorization(authCondition)(ComunidadPacientes)
