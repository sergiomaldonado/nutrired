import { db, auth } from './firebase';

// User API

export const doCreateUser = (id, nombre, apellido, email, telefono, matricula, pacientes, dietas, recetas, agenda,alertas, roll, ref) =>
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
    roll,
    ref
  });

  export const doCreatePaciente = (id, nombre, apellido, email, telefono, roll) =>
  db.ref(`users/pacientes/${id}`).set({
    nombre,
    apellido,
    email,
    telefono,
    roll
  });

  export const solicitud = (ref, mensaje) =>
  db.ref(`users/nutriologos/${ref}/alertas`).push({
    mensaje
  });

  export const actualizarPerfil = ( uid, anoNacimiento, diaNacimiento, mesNacimiento, sexo, peso, estatura, meta) =>
  db.ref(`users/pacientes/${uid}/datospersonales`).set({
    anoNacimiento,
    diaNacimiento,
    mesNacimiento,
    sexo,
    peso,
    estatura,
    meta
  });

  export const actualizarHistorialMedico = ( uid, enfermedadesFamiliares, enfermedadActual, medicamentos, cirujia, ejercicio, cigarro, alcohol, suplementos ) =>
  db.ref(`users/pacientes/${uid}/historialmedico`).set({
    enfermedadesFamiliares,
    enfermedadActual,
    medicamentos, 
    cirujia,
    ejercicio, 
    cigarro,
    alcohol, 
    suplementos 
  });
  export const actualizarDietaHabitual = ( uid, desayuno,comida, cena ) =>
  db.ref(`users/pacientes/${uid}/dietaHabitual`).set({
    desayuno,
    comida, 
    cena
  });

const uid = () => auth.currentUser.uid

export const onceGetUsers = () =>

  db.ref('users/nutriologos').once('value', snapshot => {

    return(
        snapshot.val()
    )
  })

