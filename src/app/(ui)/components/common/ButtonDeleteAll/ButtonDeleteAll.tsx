'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ENTITIES } from "@/src/app/(ui)/types/enums"
import { deleteAllMapAction, deleteAllPointsAction } from "./actions";
import { ButtonDeleteAllInputProps } from "@/src/app/(ui)/types/types";

type deleteAllProp = {
    action: () => Promise<void>,
    msg: string,
    buttonMsg: string,
}

export default function ButtonDeleteAll({entity,id}: ButtonDeleteAllInputProps){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const currDelProps = getDeleteProp(entity,id);
    
    async function handleDelete() {
        const isConfirmed = confirm(currDelProps.msg);

        if (!isConfirmed){
            return;
        }
        setLoading(true);

        try {
            currDelProps.action();
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }

    return (
        <button
            onClick={handleDelete} disabled={loading}
            className={"btn-delete-default text-2xl border-b-0 border-l-0 border-r-0 py-3"}>
                {loading ? "Deletando..." : `${currDelProps.buttonMsg}`}
        </button>
    );
}


function getDeleteProp(entity:ENTITIES, id?:number):deleteAllProp{
    if(entity == ENTITIES.MAP){
        return {
            action: deleteAllMapAction,
            msg: "Tem certeza que deseja excluir TODOS os Mapas?",
            buttonMsg: "Excluir TODOS os Mapas"
        }
    }

    return {
        action: () => deleteAllPointsAction(id!),
        msg: "Tem certeza que deseja excluir TODOS os Pontos?",
        buttonMsg: "Excluir TODOS os Pontos"
    }
}

