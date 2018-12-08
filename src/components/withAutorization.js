import React from 'react'
import { withRouter } from 'react-router-dom'
import AuthUserContext from './AuthUserContext'
import { firebase } from '../firebase'
import * as routes from '../constants/routes'

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {

    state = { auth: null }
    
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LANDING)
        } else {
          this.setState({ auth: authUser })
        }
      })
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component {...this.state} /> : null)}
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
