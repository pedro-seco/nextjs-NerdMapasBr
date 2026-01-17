import { mapWithPOIs, MapWithPOIsDTO } from "@/src/app/api/maps/types";
import { POIsDTO } from "../../api/points/[pointId]/types";

export interface MapProps {
    mapWithPOIs:MapWithPOIsDTO;
}

export interface ListMapsProps {
  maps: mapWithPOIs[];
}

export interface PointListProps {
  onSelectPointAction?: (lat: number, lng: number) => void;
  pointList: POIsDTO[];
}

export interface MapItemProps {
    map: MapWithPOIsDTO;
    onSelectPoint: (lat: number, lng: number) => void;
}
