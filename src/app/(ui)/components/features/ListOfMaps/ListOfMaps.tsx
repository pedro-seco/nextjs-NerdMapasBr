'use client';

import Link from "next/link";
import { ListMapsProps } from "../../../types/interfaces"
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";
import { ENTITIES } from "@/src/app/(ui)/types/enums";
import { HiMap, HiLocationMarker } from "react-icons/hi"; // Sugestão de ícones para dar vida ao card

export default function ListOfMaps({ maps, onUpdate }: ListMapsProps) {
  
  if (!maps || maps.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed border-gray-700 rounded-xl text-gray-500">
        <HiMap className="text-4xl mb-2 opacity-50"/>
        <p>Nenhum mapa encontrado.</p>
      </div>
    );
  }

  return (
    <>
      {maps.map((item) => (
        <div 
          key={item.id} 
          className="group relative flex flex-col justify-between bg-[#1A1A1A] border border-white/10 rounded-xl p-6 transition-all duration-200 hover:border-white/30 hover:-translate-y-1 hover:shadow-xl"
        >
          
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-black/50 rounded-lg border border-white/5 text-emerald-400">
               <HiMap size={24} />
            </div>
            
            <div className="opacity-50 hover:opacity-100 transition-opacity">
                <ButtonDelete
                    id={item.id}
                    entity={ENTITIES.MAP}
                    onUpdate={onUpdate}
                />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 truncate" title={item.name}>
                {item.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <HiLocationMarker />
                <span>{item.pois?.length || 0} pontos cadastrados</span>
            </div>
          </div>

          <div className="mt-auto">
            <Link
              href={`/maps/${item.id}`}
              className="block w-full text-center py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all"
            >
              Acessar Mapa
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}