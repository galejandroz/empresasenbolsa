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

        let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${empresa}&outputsize=compact&apikey=X86NOH6II01P7R24`;

        await Axios.get(url)
            .then(respuesta => respuesta.data['Time Series (Daily)'])
            .then(dias => [dias[Object.keys(dias)[0]], Object.keys(dias)[0], dias[Object.keys(dias)[1]], Object.keys(dias)[1]])
            .then(resp => {
                this.setState({
                    resultado: {
                        close: resp[0]['4. close'],
                        date: resp[1],
                        closeYesterday: resp[2]['4. close'],
                        yesterday: resp[3],
                        empresa: EMPRESAS.find(obj => obj.id === empresa).name
                    },
                    cargando: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            cargando: false
                        })
                    }, 1000);
                })
            })
            .catch(e => {
                this.setState({
                    cargando: false,
                    resultado:{}
                })
            })
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