import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ButtonDeleteAll from "../../common/ButtonDeleteAll/ButtonDeleteAll";
import ItemPointList from "../ItemPointList/ItemPointList";
import { MapItemProps } from "@/src/app/(ui)/types/interfaces";

export default function PointsMenu({map, onSelectPoint}: MapItemProps){
    return(
        <div className="relative w-full h-full border flex flex-col">
          <span className="absolute left-8 -translate-y-1/2 txt-title z-10">
            Pontos
          </span>
          <div className="h-full w-full p-6 pt-10 overflow-y-auto custom-scrollbar text-blue-300">
            <ItemPointList pointList={map.pois} onSelectPointAction={onSelectPoint}/>
          </div>
          <ButtonDeleteAll id={map.id} entity={ENTITIES.POI} />
        </div>
    )
}
