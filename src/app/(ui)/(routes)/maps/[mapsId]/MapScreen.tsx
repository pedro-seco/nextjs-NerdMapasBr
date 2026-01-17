'use client';

import { MapWindow } from "@/src/app/(ui)/components/features/MapWindow/MapWindow";
import PointsMenu from "@/src/app/(ui)/components/features/PointsMenu/PointsMenu";
import { MapRef } from "react-map-gl/maplibre";
import { useCallback, useRef } from 'react';
import { POINT_DEFAULT_ZOOM } from "@/src/app/(ui)/components/config";
import { MapProps } from "@/src/app/(ui)/types/interfaces";
import { HiCursorClick } from "react-icons/hi";

export default function MapScreen({mapWithPOIs}: MapProps){
    const mapRef = useRef<MapRef | null>(null);
    
    const onSelectPoint = useCallback((lat: number,lng: number) => {
        mapRef.current?.flyTo({center: [lng,lat], zoom: POINT_DEFAULT_ZOOM })
    },[]);
    
    return (
        <div className="h-screen p-5 overflow-hidden">
            <main className="grid grid-cols-[1fr_3fr] gap-10 h-full">
                <div className="min-h-0 h-full">
                    <PointsMenu map={mapWithPOIs} onSelectPoint={onSelectPoint} />
                </div>
                <section className="relative min-h-0">
                    <h2 className="absolute -top-5 left-8 txt-title">
                       {mapWithPOIs.name}
                    </h2>
                    <div className="h-full border p-5 grow">
                        <div className="tooltip-default absolute top-8 z-10 px-4 py-2 ml-2 gap-2">
                            <HiCursorClick/>
                            Clique com o botão direito para começar!
                        </div>
                        <MapWindow map={mapWithPOIs} mapRef={mapRef} />
                    </div>
                </section>
            </main>
        </div>
    );
}