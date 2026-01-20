import { mapWithPOIs, MapWithPOIsDTO } from "@/src/app/api/maps/types";
import { POIsDTO } from "../../api/points/[pointId]/types";
import { RefObject } from "react";
import { MapRef } from "react-map-gl/maplibre";

export interface MapProps {
    mapWithPOIs:MapWithPOIsDTO;
}

export interface ListMapsProps {
  maps: mapWithPOIs[];
  onUpdate: () => void
}

export interface PointListProps {
  onSelectPointAction?: (lat: number, lng: number) => void;
  pointList: POIsDTO[];
  onUpdate: () => void;
  onEditPointAction: (point:POIsDTO) => void;
}

export interface MapItemProps {
    map: MapWithPOIsDTO;
    onSelectPoint: (lat: number, lng: number) => void;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    points: POIsOnMapDTO[];
    onUpdate: () => void
    onEditPoint: (point: POIsDTO) => void;
}

export interface MapWindowProps {
  map: MapWithPOIsDTO;
  mapRef: RefObject<MapRef | null>;
  points: POIsOnMapDTO[];
  onUpdate: () => void;
  tempMarker?: { lat: number; lng: number; name: string } | null;
  onClearTemp?: () => void;
  pointToEdit?: POIsDTO | null;
  onCancelEdit: () => void;

}

export interface LandingPageProps {
    maps: MapWithPOIsDTO[]
}

export interface CreateMapBarProps {
  onUpdate: () => void;
}