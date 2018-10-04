import { db, auth } from './firebase';

// User API

export const doCreateUser = (id, nombre, apellido, email, telefono, matricula, pacientes, dietas, recetas, agenda, roll) =>
  db.ref(`users/nutriologos/${id}`).set({
    nombre,
    apellido,
    pacientes,
    email,
    telefono,
    matricula,
    dietas,
    pacientes,
    agenda,
    roll
  });


  const uid = () => auth.currentUser.uid

export const onceGetUsers = () =>

  db.ref('users/nutriologos/').once('value', snapshot => {

    return(
        snapshot.val()

    )
  })

