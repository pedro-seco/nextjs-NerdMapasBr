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

export default function MapScreen({ mapWithPOIs }: MapProps) {
    const [tempMarker, setTempMarker] = useState<TempMarkerData>(null);
    const [pointToEdit, setPointToEdit] = useState<POIsOnMapDTO | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const mapRef = useRef<MapRef | null>(null);

    const { mapsId } = useParams();
    const { allPoints, updatePoints } = usePoints(mapsId);
    
    const { searchQuery, setSearchQuery, filteredData } = useFilter(allPoints, (pois) => pois.name);
    const { query, setQuery, suggestions, setSuggestions } = useNominatim();

    const onSelectPoint = useCallback((lat: number, lng: number) => {
        mapRef.current?.flyTo({ center: [lng, lat], zoom: POINT_DEFAULT_ZOOM });
    }, []);

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
        setTempMarker({ lat, lng, name });
        setPointToEdit(null);
        onSelectPoint(lat, lng);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowDropdown(true);
    }

    return (
        <div className="flex h-[calc(100vh-5rem)] w-full overflow-hidden bg-neutral-900">
            <aside className="w-96 flex flex-col border-r border-white/10 bg-[#141414] z-20 shadow-2xl shrink-0">
                <div className="p-6 border-b border-white/5 bg-[#1A1A1A]">
                    <h1 className="text-2xl font-bold text-white truncate" title={mapWithPOIs.name}>
                        {mapWithPOIs.name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {allPoints?.length || 0} pontos mapeados
                    </p>
                </div>
                <div className="p-4 bg-[#141414]">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filtrar pontos da lista..."
                    />
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                    <PointsMenu
                        map={mapWithPOIs}
                        onSelectPoint={onSelectPoint}
                        points={filteredData}
                        onUpdate={updatePoints}
                        onEditPoint={handleEditPoint}
                    />
                </div>
            </aside>
            <main className="flex-1 relative h-full bg-gray-900">
                <div className="absolute top-6 left-6 z-10 w-full max-w-sm">
                    <div className="bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-1">
                        <SearchBar
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Buscar endereço (Nominatim)..."
                            suggestions={showDropdown ? suggestions : []}
                            onSelectSuggestion={handleSelect}
                        />
                    </div>
                </div>
                <div className="absolute bottom-8 left-6 z-10 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg border border-white/10 shadow-lg flex items-center gap-3 animate-fade-in-up">
                        <div className="p-1 bg-emerald-500/20 rounded text-emerald-400">
                             <HiCursorClick size={14} />
                        </div>
                        <span className="text-xs font-medium text-gray-300">
                            <strong>Botão direito</strong> para adicionar ponto
                        </span>
                    </div>
                </div>
                <div className="w-full h-full relative z-0">
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
            </main>
        </div>
    );
}