'use client';

import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ItemPointList from "../ItemPointList/ItemPointList";
import { MapItemProps } from "@/src/app/(ui)/types/interfaces";
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function PointsMenu({ map, onSelectPoint, points, onUpdate, onEditPoint }: MapItemProps) {

  const hasPoints = points && points.length > 0;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
        {hasPoints ? (
          <ItemPointList
            pointList={points}
            onSelectPointAction={onSelectPoint}
            onUpdate={onUpdate}
            onEditPointAction={onEditPoint}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 opacity-60">
            <HiOutlineLocationMarker className="text-4xl mb-2" />
            <p className="text-sm text-center">Nenhum ponto encontrado.<br/>Use o mapa para criar.</p>
          </div>
        )}
      </div>

      {hasPoints && (
        <div className="p-4 mt-auto border-t border-white/5 bg-[#141414]">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">
                Zona de Perigo
            </p>
            <ButtonDelete
                id={map.id}
                entity={ENTITIES.ALLPOINTS}
                onUpdate={onUpdate}
            />
        </div>
      )}
    </div>
  );
}