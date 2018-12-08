import { db, auth } from './firebase';

// User API


export const crearDieta = (id,key) =>{

  db.ref(`users/nutriologos/${id}/dietas/${key}`).set({
    key
  });
}
export const dietoCalculoReceta = (uid,idReceta, metaKcalDieta, metaLipDieta,metaHCODieta, metaProDieta, dietoCalculo, nombre) =>{
db.ref(`users/nutriologos/${uid}/dietas/${idReceta}`).set({
   idReceta, 
   metaKcalDieta, 
   metaLipDieta,
   metaHCODieta, 
   metaProDieta,
   dietoCalculo,
   nombre:nombre?nombre:"Sin Titulo",
})
}
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

  export const solicitud = (ref, emisorid,nombre, apellido, datospersonales, historialmedico, mensaje, refEmisor, urlPic, email, telefono, dietaHabitual) =>
  db.ref(`users/nutriologos/${ref}/solicitudes/${emisorid}`).set({
     nombre,
     apellido,
     datospersonales, 
     historialmedico,
     mensaje,
     refEmisor,
     urlPic,
     email,
     telefono,
     dietaHabitual
  });
  export const aceptarPaciente = (ref, pacienteId, nombre, apellido, datospersonales, historialmedico, urlPic, email, telefono, dietaHabitual) =>
  db.ref(`users/nutriologos/${ref}/pacientes/${pacienteId}`).set({
     pacienteId,
     nombre,
     apellido,
     datospersonales,
     historialmedico,
     urlPic,
     email,
     telefono,
     dietaHabitual
  });
  export const confirmacionUsuario = (refEmisor, ref, nombre, apellido, mail, telefono) =>
  db.ref(`users/pacientes/${refEmisor}/minutriologo/`).set({
     ref,
     nombre,
     apellido,
     mail,
     telefono
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
  export const actualizarDietaHabitual = ( uid, horarioDesayuno, alimentoDesayuno, bebidaDesayuno,horarioComida, alimentoComida, bebidaComida,  horarioCena, alimentoCena, bebidaCena ) =>
  db.ref(`users/pacientes/${uid}/dietaHabitual`).set({
     desayuno:{ horario: horarioDesayuno, alimento:alimentoDesayuno, bebida:bebidaDesayuno},
     comida:{horario:horarioComida, alimento:alimentoComida, bebida:bebidaComida },
     cena:{horario:horarioCena, alimento:alimentoCena, bebida:bebidaCena,}
  
  });

  export const cambiarFotoPaciente = (uid, urlPic) =>
  db.ref(`users/pacientes/${uid}`).set({
    urlPic
  });

  
  export const obtenerPacientes = () => 

  db.ref("users/nutriologos/pacientes").once('value', snapshot => {

    return(
        snapshot.val()
    )
  })  

   
   

export const onceGetUsers = () => 

  db.ref("users/nutriologos").once('value', snapshot => {

    return(
        snapshot.val()
    )
  })



  

