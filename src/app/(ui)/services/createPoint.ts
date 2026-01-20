import { createPointBody } from "../../api/maps/types";

export default async function createPoint(mapId: number, payload: createPointBody) {
    try {
        const response = await fetch(`/api/maps/${mapId}/points`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar ponto: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {console.error("Erro ao enviar dados do ponto: ", error); return;}
}