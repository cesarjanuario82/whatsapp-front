import axios from 'axios';
import { useState } from 'react';



export const useServices = () => {

    const [isLoading, setIsLoading] = useState(false);

    const urlApi = '/api/';
    const urlApiReporte ='https://cesarjanuario82.github.io/tiendas/reportewm.json';  //este es un json  dummy simula el resultado del servicio de reportes


    const enviarMensaje = (payload) => {

        setIsLoading(true);


        const request = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: urlApi,
            data: payload
        }



        let result = axios(request)
            .then(response => {
                console.log('servicio responde: ', response.data);
                setIsLoading(false);
                return response.data;
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('servicio error: ', error);
                return error.response;
            });
        return result;
    };


const solicitarReporte = (dn) => {

    const request =   {
        url: urlApiReporte,
        //method: 'POST',
        method: 'GET',//aqui lo puse GET solo para consumir el json dummy
        headers: {
        'Content-Type': 'application/json',
        },
        //data: dn,
    }
   
    console.log('REQ REPORTE: ', request);
    const result =axios(request)
    .then(response => {
       // console.log('servicio reporte responde: ', response.data);
        setIsLoading(false);
            return response.data;
        })
        .catch((error) => {
            setIsLoading(false);
            console.error('servicio reporte error: ',error);
            return error.response;
        });

    return result;
}



  
return {
        enviarMensaje,
        solicitarReporte,
        isLoading
}
}
