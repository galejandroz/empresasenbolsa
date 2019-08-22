import React from 'react';

const Formulario = ({verCotizacion, EMPRESAS}) => {

    const obtenerValor = e => {
        const empresa = e.target.value;
        verCotizacion(empresa);
    }

    return ( 
        <div className="row">
            <label>Seleccione empresa</label>
            <select
                onChange={obtenerValor}
                name="monempresaeda"
                className="u-full-width">
                    <option value="">Seleccione empresa</option>
                    {EMPRESAS.map(empresa => (
                        <option value={empresa.id} key={empresa.id}>{empresa.name}</option>
                    ))}
            </select>
        </div>
    );
}
 
export default Formulario;