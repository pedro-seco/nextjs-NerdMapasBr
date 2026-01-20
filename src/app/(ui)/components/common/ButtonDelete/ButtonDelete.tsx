import { useState } from "react";
import { ENTITIES } from "@/src/app/(ui)/types/enums"
import { ButtonDeleteInputProps, deleteProp } from "@/src/app/(ui)/types/types";
import deleteData from "../../../services/deleteData";

export default function ButtonDelete({id, entity, onUpdate}: ButtonDeleteInputProps){
    const [loading, setLoading] = useState(false);
    const currDelProps = getDeleteProp(entity);

    async function handleDelete() {
        const isConfirmed = confirm(currDelProps.msg);

        if (!isConfirmed) return;

        setLoading(true);

        try {
            await currDelProps.action(id!);

            if(onUpdate){
                await onUpdate();
            }

        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }

    return (
        <button
            onClick={handleDelete} disabled={loading}
            className={currDelProps.className}>
                {loading ? "Deletando..." : currDelProps.btnMsg}
        </button>
    );
}

function getDeleteProp(entity:ENTITIES): deleteProp{
    if(entity == ENTITIES.MAP){
        return {
            action: async (id:number) => deleteData(`http://localhost:3000/api/maps/${id}`), // TODO - IMPLEMENTAR VARIAVEL .ENV
            msg: "Tem certeza que deseja excluir este mapa?",
            className: "btn-delete-default ",
            btnMsg: "Excluir"
        }
    }

    if(entity == ENTITIES.ALLMAPS){
        return {
            action: async () => deleteData(`http://localhost:3000/api/maps/`), // TODO - IMPLEMENTAR VARIAVEL .ENV
            msg: "Tem certeza que deseja excluir TODOS os mapa?",
            className: "btn-delete-xl text-xl",
            btnMsg: "Excluir TODOS os mapas"
        }
    }

    if(entity == ENTITIES.POINTS){
        return {
            action: async (id:number) => deleteData(`http://localhost:3000/api/points/${id}`), // TODO - IMPLEMENTAR VARIAVEL .ENV
            msg: "Tem certeza que deseja excluir este ponto?",
            className: "btn-delete-default text-sm",
            btnMsg: "Excluir"
        }
    }

    return {
        action: async (id:number) => deleteData(`http://localhost:3000/api/maps/${id}/points`), // TODO - IMPLEMENTAR VARIAVEL .ENV
        msg: "Tem certeza que deseja excluir TODOS os pontos desse mapa?",
        className: "btn-delete-xl text-xl",
        btnMsg: "Excluir TODOS os pontos desse mapa"
    }
}
