'use client';

import { MapWindow } from "@/src/app/(ui)/components/features/MapWindow/MapWindow";
import PointsMenu from "@/src/app/(ui)/components/features/PointsMenu/PointsMenu";
import { MapRef } from "react-map-gl/maplibre";
import { useCallback, useRef, useState } from 'react';
import { POINT_DEFAULT_ZOOM } from "@/src/app/(ui)/components/config";
import { MapProps } from "@/src/app/(ui)/types/interfaces";
import { HiCursorClick } from "react-icons/hi";
import { useFilter } from "../../../components/hooks/useFilter";
import { useParams } from "next/navigation";
import usePoints from "../../../components/hooks/useMapPoints";
import useNominatim from "../../../components/hooks/useNominating";
import { NominatingResponse } from "../../../types/types";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

type TempMarkerData = { lat: number; lng: number; name: string } | null;

//TODO - REFATORAR MAPWINDOW -> QUEBRAR EM COMPONENTES MENORES: MAP, POPUP E MARKER
export default function MapScreen({mapWithPOIs}: MapProps){
    const [tempMarker, setTempMarker] = useState<TempMarkerData>(null);
    const [pointToEdit, setPointToEdit] = useState<POIsOnMapDTO | null>(null);

    const[showDropdown, setShowDropdown] = useState(false);

    const mapRef = useRef<MapRef | null>(null);

    const {mapsId} = useParams();
    const {allPoints, updatePoints} = usePoints(mapsId);
    const {searchQuery, setSearchQuery, filteredData} = useFilter(allPoints, (pois) => pois.name);
    const {query, setQuery, suggestions, setSuggestions} = useNominatim();
    
    const onSelectPoint = useCallback((lat: number,lng: number) => {
        mapRef.current?.flyTo({center: [lng,lat], zoom: POINT_DEFAULT_ZOOM });
    },[]);

    const handleEditPoint = (point: POIsOnMapDTO) => {
        onSelectPoint(point.latitude, point.longitude);
        setPointToEdit(point);
        setTempMarker(null);
    }

    const handleSelect = (item: NominatingResponse) => {
        const name = item.name || item.display_name.split(',')[0]
        const lat = Number(item.lat);
        const lng = Number(item.lon);

        setQuery(name);
        setShowDropdown(false);
        setSuggestions([]);
        setTempMarker({lat, lng, name});
        setPointToEdit(null);
        onSelectPoint(lat,lng);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowDropdown(true);
    }

    return (
        <div className="h-screen p-5 overflow-hidden">
            <main className="grid grid-cols-[1fr_3fr] gap-10 h-full">
                <div className="min-h-0 h-full">
                    <div>
                        <SearchBar
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Digite um endereço..."
                            suggestions={showDropdown ? suggestions : []}
                            onSelectSuggestion={handleSelect}
                        />
                    </div>
                    <PointsMenu
                        map={mapWithPOIs}
                        onSelectPoint={onSelectPoint}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        points={filteredData}
                        onUpdate={updatePoints}
                        onEditPoint={handleEditPoint}
                        />
                </div>
                <section className="relative min-h-0">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-100 w-full max-w-md px-4">
                    </div>
                    <h2 className="absolute -top-5 left-8 txt-title">
                       {mapWithPOIs.name}
                    </h2>
                    <div className="h-full border p-5 grow">

                        <div className="tooltip-default absolute top-8 z-10 px-4 py-2 ml-2 gap-2">
                            <HiCursorClick/> {/*TODO - AJUSTAR RESPONSIVIDADE DA TOOLTIP*/}
                            Clique com o botão direito para começar!
                        </div>
                        <MapWindow 
                            map={mapWithPOIs} 
                            mapRef={mapRef}
                            points={filteredData}
                            onUpdate={updatePoints}
                            tempMarker={tempMarker}
                            onClearTemp={() => setTempMarker(null)}
                            pointToEdit={pointToEdit}
                            onCancelEdit={() => setPointToEdit(null)}

                        />
                    </div>
                </section>
            </main>
        </div>
    );
}