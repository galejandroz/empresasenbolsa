import React, { Component } from 'react';

class Formulario extends Component {

     obtenerValor = e => {
         const empresa = e.target.value;
         this.props.verCotizacion(empresa);
     }     
     
    render() { 

        return ( 
            <div className="row">
                <label>Seleccione empresa</label>
                <select
                    onChange={this.obtenerValor}
                    name="monempresaeda"
                    className="u-full-width">
                        <option value="">Seleccione empresa</option>
                        <option value="FB">Facebook</option>
                        <option value="AAPL">Apple</option>
                        <option value="MSFT">Microsoft</option>
                        <option value="GOOGL">Google</option>
                        <option value="AMZN">Amazon</option>
                </select>
            </div>
         );
    }
}
 
export default Formulario;