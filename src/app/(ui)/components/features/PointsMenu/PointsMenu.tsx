'use client';

import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ItemPointList from "../ItemPointList/ItemPointList";
import { MapItemProps } from "@/src/app/(ui)/types/interfaces";
import SearchBar from "../../common/SearchBar/SearchBar";
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";

export default function PointsMenu({map, onSelectPoint, searchQuery, setSearchQuery, points, onUpdate, onEditPoint}: MapItemProps){

  return(
      <div className="relative w-full h-full border flex flex-col">
        <div>
          <SearchBar
          placeholder=""
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <span className="absolute left-8 -translate-y-1/2 txt-title z-10">
            Pontos
          </span>
        </div>
        <div className="h-full w-full p-6 pt-10 overflow-y-auto custom-scrollbar text-blue-300">
          <ItemPointList
            pointList={points}
            onSelectPointAction={onSelectPoint}
            onUpdate={onUpdate}
            onEditPointAction={onEditPoint}
          />
        </div>
        <ButtonDelete
          id={map.id} 
          entity={ENTITIES.ALLPOINTS}
          onUpdate={onUpdate}
        />
      </div>
  )
}
