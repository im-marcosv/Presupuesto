import React, {useState} from 'react';
import Error from './Error'
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    //Defino states
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState('');
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        //Eliminar mensaje previo
        guardarError(false);

        //Construir gasto
        const gasto = {
            nombre, cantidad, id: shortid.generate()
        }

        //Enviar gasto a componente principal
        guardarGasto(gasto)
        guardarCrearGasto(true);

        //Resetar el form
        guardarNombre('');
        guardarCantidad(0);
    }    
    
    return ( 
        <form onSubmit={agregarGasto}>
            <h2>Agrega tus gastos</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto"/> : null}
            <div className="campo">
                <label>Nombre del gasto</label>
            </div>
            <div className="campo">
                <input type="text" className="u-full-width" placeholder="Ej. Transporte" value={nombre} onChange={e => guardarNombre(e.target.value)}/>
                <label>Cantidad del gasto</label>
            </div>
                <input type="number" className="u-full-width" placeholder="Ej. 300" value={cantidad} onChange={e => guardarCantidad(parseInt(e.target.value), 10)}/>
            <input type="submit" value="Añadir gasto" className="u-full-width button-primary" />
        </form>
     );
}
Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
} 
export default Formulario;