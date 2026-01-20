'use client';

import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";
import { PointListProps } from "@/src/app/(ui)/types/interfaces";
import { HiLocationMarker, HiPencil } from "react-icons/hi";

export default function ItemPointList({ pointList, onSelectPointAction, onUpdate, onEditPointAction }: PointListProps) {
  
  return (
    <ul className="flex flex-col gap-2 w-full">
      {pointList.length > 0 ? (
        pointList.map((point) => (
          <li 
            key={point.id} 
            className="group flex items-center justify-between p-3 rounded-md bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all"
          >
            <button
              onClick={() => onSelectPointAction?.(point.latitude, point.longitude)}
              className="flex items-center gap-3 text-left grow min-w-0"
              title="Clique para ver no mapa"
            >
              <HiLocationMarker className="text-emerald-500 shrink-0" />
              <span className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors cursor-pointer hover:text-blue-400">
                {point.name}
              </span>
            </button>
            <div className="flex items-center gap-1 ml-4 border-l border-white/10 pl-3">
              <button
                onClick={() => onEditPointAction(point)}
                className="p-1.5 rounded-md text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors cursor-pointer"
                title="Editar"
              >
                <HiPencil className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                 <ButtonDelete
                    id={point.id}
                    entity={ENTITIES.POINTS}
                    onUpdate={onUpdate}
                 />
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500 opacity-60">
           <p className="text-sm">Nenhum ponto cadastrado.</p>
        </div>
      )}
    </ul>
  );
}