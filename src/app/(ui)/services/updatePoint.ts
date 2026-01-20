import { createPointBody } from "../../api/maps/types";

export default async function updatePoint(pointId: string, payload: createPointBody) {
    try {
        const response = await fetch(`/api/points/${pointId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar ponto: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao atualizar ponto: ", error);
    }
}