import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ButtonDeleteAll from "../../common/ButtonDeleteAll/ButtonDeleteAll";
import ItemPointList from "../ItemPointList/ItemPointList";
import { MapItemProps } from "@/src/app/(ui)/types/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFilter } from "../../hooks/useFilter";
import fetchData from "../../../services/fetchData";
import SearchBar from "../../common/SearchBar/SearchBar";

export default function PointsMenu({map, onSelectPoint}: MapItemProps){
  const [allPoints, setAllPoints] = useState<POIsOnMapDTO[]>([]);
  const {searchQuery, setSearchQuery, filteredData} = useFilter(allPoints, (pois) => pois.name);
  const {mapsId} = useParams();
  
  useEffect(() => {    
      const loadAll = async () => {
        console.log(mapsId);
        const url = `http://localhost:3000/api/maps/${mapsId}`
        const list = await fetchData(url); // TODO - TRANSFORMAR BASE URL EM CONST .ENV
        setAllPoints(list.pois);
      }
      loadAll();
    }, [mapsId]);

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
          <ItemPointList pointList={filteredData} onSelectPointAction={onSelectPoint}/>
        </div>
        <ButtonDeleteAll id={map.id} entity={ENTITIES.POI} />
      </div>
  )
}
