import React, { Component } from 'react';
import imagen from './ticker-stock.png';
import Formulario from './componentes/Formulario';
import Resultado from './componentes/Resultado';
import Spiner from './componentes/Spiner';
import Axios from 'axios';

const EMPRESAS = [{id:'FB', name:'Facebook'}, {id:'AAPL', name:'Apple'}, {id:'MSFT', name:'Microsoft'}, {id:'GOOGL', name:'Google'}, {id:'AMZN', name:'Amazon'}];

class App extends Component {

    state = {
        resultado: {},
        cargando: false
    }

    verCotizacion = async (empresa) => {
        this.setState({
            cargando: true
        });

        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${empresa}&outputsize=compact&apikey=X86NOH6II01P7R24`;

        const res = await Axios.get(url);

        if(res.data['Time Series (Daily)'] === undefined ){
            this.setState({
                cargando: false,
                resultado:{}
            });
        }else{
            const dias = res.data['Time Series (Daily)'];

            const resultado = {
                    close:dias[Object.keys(dias)[0]]['4. close'], 
                    date:Object.keys(dias)[0], 
                    closeYesterday:dias[Object.keys(dias)[1]]['4. close'], 
                    yesterday:Object.keys(dias)[1], 
                    empresa:EMPRESAS.find(obj => obj.id === empresa).name
                };

            this.setState({
                resultado,
                cargando: false
            });
        }
    } 
  
    render() {
        const resultado = (this.state.cargando) ? <Spiner /> : <Resultado resultado={this.state.resultado} />;       

        return (
            <div className="container">
                <div className="row">
                <div className="one-half column">
                    <img src={imagen} alt="imagen" className="logotipo" />
                </div>
                <div className="one-half column">
                    <h1>Valores al instante</h1>
                    <Formulario verCotizacion={this.verCotizacion} EMPRESAS={EMPRESAS} />
                    {resultado}
                </div>
                </div>
            </div>
        );
    }
}  

export default App;