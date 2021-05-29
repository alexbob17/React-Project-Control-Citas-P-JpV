import React, { Fragment , useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

//primero se instala luego se importa sirve para generar id sin una base de datos
//----npm install uuid

const Formulario = ({crearCita}) => {

  // Crear state de citas
  const [cita, actualizarCita]= useState({
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''
  });

//Agregando un segundo state
  const [error, actualizarError]= useState(false)

//Funcion que guarda los valores ingresados dentro de un state
  const actualizarState = e =>{
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }


  //Extraer los valores
  //Esto es un destructuring(simplifica el codigo)
  const {mascota, propietario,fecha,hora,sintomas}=cita;

  //Agregando Usuario
  const submitCita = e =>{
      e.preventDefault();

      //Validar
      if(mascota.trim() ==='' || propietario.trim() ==='' || fecha.trim() ==='' ||hora.trim() ==='' ||sintomas.trim() ===''){
        actualizarError(true);
        return;
      }

      //Elimando el mensaje previo de error
      actualizarError(false);
 
      //Asignado un ID
      cita.id = uuidv4();;
  

      //Crear una cita
      crearCita(cita);

      //Reiniciar el form
      actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
      })
      
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>



      {/* Agregando si existe un error al ingresar datos */}
      {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
      : null
      }

      <form
      // Agregando un evento en el formulario
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          //agregando un evento de guardar datos ingresados dentro del state
          onChange={actualizarState}
          //Valor para resetear formulario
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha}/>

        <label>Hora</label>
        <input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora}/>

        <label>Sintomas</label>
            <textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={sintomas}>
            </textarea>
            <button type="submit" className="u-full-width button-primary">
                Agregar Cita
            </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes ={
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
