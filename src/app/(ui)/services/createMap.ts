import { createMapBody } from "../../api/maps/types";

export default async function createMap(payload: createMapBody) {
    //TODO - IMPLEMENTAR .ENV
    try{
        const response = await fetch('http://localhost:3000/api/maps', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(payload),
        });
        
        if (!response.ok){
            throw new Error (`Erro ao enviar dados: ${response.statusText}`);
        }

        return await response.json();
    } catch(error) {console.error(error); return;} 
}