import React, {Fragment, useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {
    
    //Defino State
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Leer el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad(parseInt(e.target.value, 10))       
    }

    //Funcion submit para agregar presupusto
    const agregarPresupuesto = e => {
        e.preventDefault();
        if(cantidad < 0 || isNaN(cantidad)){
            guardarError(true);
            return;
        }

        //Si se pasa la validación
        guardarError(false);

        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }
    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            <form onSubmit={agregarPresupuesto}>
            {error ? <Error mensaje="El presupuesto es incorrecto"/> : null}
                <input type="number" className="u-full-width" placeholder="Coloca tu presupuesto" onChange={definirPresupuesto}/>
                <input type="submit" value="Definir presupuesto" className="button-primary u-full-width"/>
            </form>  
        </Fragment>
    );
        
}
Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
} 
export default Pregunta;