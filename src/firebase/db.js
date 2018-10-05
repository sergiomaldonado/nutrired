import { db, auth } from './firebase';

// User API

export const doCreateUser = (id, nombre, apellido, email, telefono, matricula, pacientes, dietas, recetas, agenda,alertas, roll) =>
  db.ref(`users/nutriologos/${id}`).set({
    nombre,
    apellido,
    pacientes,
    email,
    telefono,
    matricula,
    dietas,
    recetas,
    pacientes,
    agenda,
    alertas,
    roll
  });

  export const doCreatePaciente = (id, nombre, apellido, email, telefono, roll) =>
  db.ref(`users/pacientes/${id}`).set({
    nombre,
    apellido,
    email,
    telefono,
    roll
  });


  const uid = () => auth.currentUser.uid

export const onceGetUsers = () =>

  db.ref('users/nutriologos/').once('value', snapshot => {

    return(
        snapshot.val()

    )
  })

