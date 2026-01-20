'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import { IoIosPin } from "react-icons/io";
import { Map, Marker, Popup } from 'react-map-gl/maplibre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LABEL_PIN_ZOOM_THRESHOLD, MAP_DEFAULT_ZOOM } from '../../config';
import { lngLatEvent } from '@/src/app/(ui)/types/types';
import { MapWindowProps } from '../../../types/interfaces';
import createPoint from '../../../services/createPoint';
import updatePoint from '../../../services/updatePoint';
import useSupercluster from "use-supercluster";
import { HiX } from 'react-icons/hi';
import { useSnackbar } from 'notistack';

export function MapWindow({ map, mapRef, points, onUpdate, tempMarker, onClearTemp, pointToEdit, onCancelEdit }: MapWindowProps) {
    const zoomNum = MAP_DEFAULT_ZOOM;
    const labelPinZoom = LABEL_PIN_ZOOM_THRESHOLD;

    const [currentZoom, setCurrentZoom] = useState(zoomNum);
    const [loading, setLoading] = useState(false);
    const [bounds, setBounds] = useState<any>(null);
    const [pointName, setPointName] = useState("");
    const [activePoint, setActivePoint] = useState<{ lat: number; lng: number } | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const pointsGeoJSON = useMemo(() => {
        return points.map(point => ({
            type: "Feature" as const,
            properties: {
                cluster: false,
                pointId: point.id,
                name: point.name,
            },
            geometry: {
                type: "Point" as const,
                coordinates: [point.longitude, point.latitude]
            }
        }));
    }, [points]);

    const { clusters, supercluster } = useSupercluster({
        points: pointsGeoJSON,
        bounds: bounds,
        zoom: currentZoom,
        options: { radius: 75, maxZoom: 18 }
    });

    const updateMapBounds = useCallback(() => {
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            const b = mapInstance.getBounds();
            setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
            setCurrentZoom(mapInstance.getZoom());
        }
    }, [mapRef]);

    const handleMove = (e: any) => { updateMapBounds(); };

    useEffect(() => {
        if (pointToEdit) {
            setActivePoint({ lat: pointToEdit.latitude, lng: pointToEdit.longitude });
            setPointName(pointToEdit.name);
            setIsEditing(true);
            if (onClearTemp) onClearTemp();
        }
    }, [pointToEdit, isEditing, onClearTemp]);

    const handleRightClick = (event: lngLatEvent) => {
        if (onClearTemp) onClearTemp();
        onCancelEdit();
        setIsEditing(false);
        const { lat, lng } = event.lngLat;
        setActivePoint({ lat, lng });
        setPointName("");
    }

    const handleClosePopup = () => {
        setActivePoint(null);
        setPointName("");
        setIsEditing(false);
        onCancelEdit();
    }

    const handleClusterClick = (clusterId: number, lat: number, lng: number) => {
        if (supercluster) {
            const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(clusterId), 20);
            mapRef.current?.flyTo({ center: [lng, lat], zoom: expansionZoom, duration: 500 });
        }
    };

    async function handlePoint() {
        if (loading || !activePoint || !pointName) return;
        if (pointName.trim().length === 0){
            enqueueSnackbar("O nome do local não pode ser vazio.", { variant: 'warning' });
            return;
        }
        setLoading(true);
        const body = { name: pointName, lat: activePoint.lat, lng: activePoint.lng }
        try {
            if (isEditing && pointToEdit) {
                await updatePoint(String(pointToEdit.id), body);
                enqueueSnackbar("Local atualizado com sucesso!", { variant: 'success' });
            } else {
                await createPoint(map.id, body);
                enqueueSnackbar("Novo local criado!", { variant: 'success' });
            }
            handleClosePopup();
            onUpdate();
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Erro ao salvar o ponto. Tente novamente.", { variant: 'error' });
        } finally { setLoading(false); }
    }

    return (
        <div className='relative w-full h-full'>
            <Map
                ref={mapRef}
                initialViewState={{ longitude: map.longitude, latitude: map.latitude, zoom: zoomNum }}
                style={{ position: 'absolute', inset: 0 }}
                onMove={handleMove}
                onContextMenu={handleRightClick}
                maxBounds={[[map.borders.sw.longitude, map.borders.sw.latitude], [map.borders.ne.longitude, map.borders.ne.latitude]]}
                mapStyle={`${process.env.NEXT_PUBLIC_MAP_STYLE}?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
            >

                {clusters.map((cluster) => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { cluster: isCluster } = cluster.properties;

                    if (isCluster) {
                        const properties = cluster.properties as any;
                        const pointCount = properties.point_count;
                        const clusterId = cluster.id as number;

                        return (
                            <Marker key={`cluster-${clusterId}`} latitude={latitude} longitude={longitude}>
                                <div
                                    onClick={(e) => { e.stopPropagation(); handleClusterClick(clusterId, latitude, longitude); }}
                                    className="flex items-center justify-center bg-red-600 text-white rounded-full font-bold border-4 border-white/20 shadow-xl cursor-pointer hover:scale-110 transition-transform"
                                    style={{
                                        width: `${30 + (pointCount / points.length) * 20}px`,
                                        height: `${30 + (pointCount / points.length) * 20}px`,
                                        fontSize: '14px'
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker key={`point-${cluster.properties.pointId}`} longitude={longitude} latitude={latitude} anchor='bottom'>
                            <div className="flex flex-col items-center justify-end group cursor-pointer hover:-translate-y-1 transition-transform">
                                {currentZoom > labelPinZoom && (
                                    <span className="text-white text-xs px-2 py-0.5 font-bold bg-[#1A1A1A] rounded shadow-md whitespace-nowrap mb-1 border border-gray-300">
                                        {cluster.properties.name}
                                    </span>
                                )}
                                <IoIosPin className='text-red-500 text-4xl drop-shadow-md' />
                            </div>
                        </Marker>
                    );
                })}

                {tempMarker && (
                    <Marker longitude={tempMarker.lng} latitude={tempMarker.lat} anchor='bottom'>
                        <div className="flex flex-col items-center justify-end group">
                            <span className="text-white text-xs px-2 py-0.5 font-bold bg-[#1A1A1A] rounded shadow-md whitespace-nowrap mb-1">
                                {tempMarker.name}
                            </span>
                            <IoIosPin className='text-blue-500 text-5xl drop-shadow-lg' />
                        </div>
                    </Marker>
                )}

                {activePoint && (
                    <Popup
                        longitude={activePoint.lng}
                        latitude={activePoint.lat}
                        anchor="bottom"
                        onClose={handleClosePopup}
                        closeOnClick={false}
                        closeButton={false}
                        maxWidth="300px"
                    >
                        <div className="flex flex-col gap-3 p-3 min-w-55">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-1">
                                <h3 className="font-bold text-sm text-gray-200">
                                    {isEditing ? "Editar Local" : "Novo Local"}
                                </h3>
                                <button 
                                    onClick={handleClosePopup} 
                                    className="text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <HiX size={16} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Nome do local (ex: Padaria)"
                                value={pointName}
                                maxLength={35}
                                onChange={(e) => setPointName(e.target.value)}
                                className="w-full bg-[#262626] border border-white/10 rounded-md p-2 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                autoFocus
                            />
                            <div className="flex gap-2 justify-end mt-1">
                                <button
                                    onClick={handlePoint}
                                    disabled={loading || !pointName}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Salvando..." : (isEditing ? "Atualizar" : "Salvar")}
                                </button>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}