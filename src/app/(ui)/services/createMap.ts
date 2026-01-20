import { createMapBody } from "../../api/maps/types";

export default async function createMap(payload: createMapBody) {
    try {
        const response = await fetch('/api/maps', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(payload),
        });
        
        if (!response.ok) throw new Error (`Erro ao enviar dados: ${response.statusText}`);

        return await response.json();
    } catch(error) {console.error("Erro ao enviar dados: ", error); return;} 
}