import React from 'react';
import { Button} from 'react-bootstrap'

import { auth } from '../firebase';

const SignOutButton = () =>
  <Button 
    className="btn-primary"
    type="button"
    onClick={auth.doSignOut}
  >
    Salir
  </Button>

export default SignOutButton;