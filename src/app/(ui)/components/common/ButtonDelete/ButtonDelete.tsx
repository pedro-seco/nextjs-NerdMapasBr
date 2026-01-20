
import { ButtonDeleteInputProps, deleteProp } from "@/src/app/(ui)/types/types";
import { useState } from "react";
import { ENTITIES } from "@/src/app/(ui)/types/enums";
import deleteData from "../../../services/deleteData";
import { HiTrash, HiExclamation } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";

export default function ButtonDelete({ id, entity, onUpdate }: ButtonDeleteInputProps) {
    const [loading, setLoading] = useState(false);
    
    const config = getDeleteProp(entity);

    async function handleDelete() {
        const isConfirmed = confirm(config.msg);
        if (!isConfirmed) return;

        setLoading(true);

        try {
            if (config.action) await config.action(id!);
            if (onUpdate) onUpdate();

        } catch (error) { console.error("Erro ao deletar:", error);
        } finally {setLoading(false);}
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className={`transition-all flex items-center justify-center ${config.className} cursor-pointer`}
            title={config.title || "Excluir"}
            type="button"
        >
            {loading ? (
                <ImSpinner8 className="animate-spin" />
            ) : (
                config.label
            )}
        </button>
    );
}

function getDeleteProp(entity: ENTITIES): deleteProp {
    const baseUrl = "http://localhost:3000/api"; // TODO: Usar process.env.NEXT_PUBLIC_API_URL

    switch (entity) {
        case ENTITIES.POINTS:
            return {
                action: async (id: number) => deleteData(`${baseUrl}/points/${id}`),
                msg: "Tem certeza que deseja excluir este ponto?",
                className: "p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer",
                label: <HiTrash size={18} />, 
                title: "Excluir Ponto"
            };

        case ENTITIES.MAP:
            return {
                action: async (id: number) => deleteData(`${baseUrl}/maps/${id}`),
                msg: "Tem certeza que deseja excluir este mapa e todos os seus pontos?",
                className: "p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer",
                label: <HiTrash size={20} />,
                title: "Excluir Mapa"
            };

        case ENTITIES.ALLMAPS:
            return {
                action: async () => deleteData(`${baseUrl}/maps/`),
                msg: "Isso excluirá TODOS os mapas do sistema. Essa ação é irreversível.",
                className: "w-full py-2 px-4 bg-red-900/20 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-900/40 hover:border-red-500 font-bold text-sm flex gap-2 uppercase tracking-wide cursor-pointer",
                label: (
                    <>
                        <HiExclamation className="text-lg" />
                        Excluir TODOS os mapas
                    </>
                )
            };

        default:
            return {
                action: async (id: number) => deleteData(`${baseUrl}/maps/${id}/points`),
                msg: "Tem certeza que deseja limpar todos os pontos deste mapa?",
                className: "w-full py-2 px-4 bg-red-900/20 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-900/40 hover:border-red-500 font-bold text-sm flex gap-2 uppercase tracking-wide cursor-pointer",
                label: (
                    <>
                        <HiExclamation className="text-lg" />
                        Limpar todos os pontos
                    </>
                )
            };
    }
}
