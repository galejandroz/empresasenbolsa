import React from 'react';

const Resultado = ({resultado}) => {

     if(Object.entries(resultado).length === 0) return null;

     const {close, date, yesterday, closeYesterday, empresa} = resultado;

     const dif = parseFloat(close - closeYesterday).toFixed(2);
     const percentage = parseFloat((dif / close)*100).toFixed(2);
     const color = percentage < 0 ? 'rgba(255,0,0,0.7)' : 'rgba(0,255,0,0.7)';
     
     return ( 
          <div className="resultado">
               <h2>Cotización en bolsa {empresa}</h2>
               <p>Date: {date} </p>
               <p>Close: {close}</p>
               <p>Yesterday: {yesterday}</p>
               <p>Close yesterday: {closeYesterday}</p>
               <p className="diff">Difference: {dif}</p>
               <p style={{color: color}}>Percentage: {percentage} %</p>
          </div>
     );
}
 
export default Resultado;
