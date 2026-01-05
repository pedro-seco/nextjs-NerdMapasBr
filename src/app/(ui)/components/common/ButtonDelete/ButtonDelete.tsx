'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ENTITIES } from "@/src/app/(ui)/types/enums"
import { deleteMapAction, deletePOIsAction } from "./actions";
import { ButtonDeleteInputProps } from "@/src/app/(ui)/types/types";

type deleteProp = {
    action: (id:number) => Promise<void>,
    msg: string,
    className: string,
}

export default function ButtonDelete({id,entity}: ButtonDeleteInputProps){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const currDelProps = getDeleteProp(entity);

    async function handleDelete() {
        const isConfirmed = confirm(currDelProps.msg)

        if (!isConfirmed){
            return;
        }
        setLoading(true);

        try {
            currDelProps.action(id);
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }

    return (
        <button
            onClick={handleDelete} disabled={loading}
            className={currDelProps.className}>
                {loading ? "Deletando..." : "Excluir"}
        </button>
    );
}

function getDeleteProp(entity:ENTITIES):deleteProp{
    if(entity == ENTITIES.MAP){
        return {
            action: deleteMapAction,
            msg: "Tem certeza que deseja excluir este mapa?",
            className: "btn-delete-default"
        }
    }

    return {
        action: deletePOIsAction,
        msg: "Tem certeza que deseja excluir este ponto?",
        className: "btn-delete-default text-sm"
    }
}
