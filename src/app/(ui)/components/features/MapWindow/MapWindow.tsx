'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import { IoIosPin } from "react-icons/io";
import { Map, Marker, Popup } from 'react-map-gl/maplibre';
import { useEffect, useState } from 'react';
import { LABEL_PIN_ZOOM_THRESHOLD, MAP_DEFAULT_ZOOM } from '../../config';
import { lngLatEvent } from '@/src/app/(ui)/types/types';
import { MapWindowProps } from '../../../types/interfaces';
import createPoint from '../../../services/createPoint';
import updatePoint from '../../../services/updatePoint';

export function MapWindow({map, mapRef, points, onUpdate, tempMarker, onClearTemp, pointToEdit, onCancelEdit} : MapWindowProps) {
  const zoomNum = MAP_DEFAULT_ZOOM;
  const labelPinZoom = LABEL_PIN_ZOOM_THRESHOLD;

  const [currentZoom, setCurrentZoom] = useState(zoomNum);
  const [loading, setLoading] = useState(false);
  const [pointName, setPointName] = useState("");
  const [activePoint, setActivePoint] = useState<{lat: number; lng: number} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
      if (pointToEdit) {
        setActivePoint({ lat: pointToEdit.latitude, lng: pointToEdit.longitude });
        setPointName(pointToEdit.name);
        setIsEditing(true);
        
        if(onClearTemp) onClearTemp();

      }
    }, [pointToEdit, isEditing, onClearTemp]);

  const handleRightClick = (event: lngLatEvent) =>{
            if(onClearTemp) onClearTemp();

    onCancelEdit();
    setIsEditing(false);

    const {lat,lng} = event.lngLat;

    setActivePoint({lat,lng});
    setPointName("");

  }

  const handleClosePopup = () => {
        setActivePoint(null);
        setPointName("");
        setIsEditing(false);
        onCancelEdit();
    }

  async function handlePoint(){
    if (loading || !activePoint || !pointName) return;
    if (pointName.trim().length === 0) return alert("Nome inválido.");

    setLoading(true);

    const body = {
      name: pointName,
      lat: activePoint.lat,
      lng: activePoint.lng
    }

    try {
      if (isEditing && pointToEdit) {
        await updatePoint(String(pointToEdit.id), body);
      } else {
        await createPoint(map.id, body);
      }
      
      handleClosePopup();
      onUpdate(); 
    } catch(error) { alert("Erro ao salvar o ponto: " + error);
    } finally { setLoading(false); }
  }

  //TODO - DESACOPLAR MAP WINDOW
  //TODO - IMPLEMENTAR SUPERCLUSTER 

  return(
    <div className='relative w-full h-full'>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: map.longitude,
          latitude: map.latitude,
          zoom: zoomNum
        }}
        style={{ 
          position: 'absolute',
          inset:0
        }}
        onMove={(e) => setCurrentZoom(e.viewState.zoom)}
        onContextMenu={handleRightClick}
        maxBounds={[[map.borders.sw.longitude, map.borders.sw.latitude],
                    [map.borders.ne.longitude,map.borders.ne.latitude]]} 
        mapStyle={`${process.env.NEXT_PUBLIC_MAP_STYLE}?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
        >

        {points.map((point) =>(
          <Marker key={point.id} longitude={point.longitude} latitude={point.latitude} anchor='bottom'>
            <div className="flex flex-col items-center justify-end group">
              { currentZoom > labelPinZoom &&(
                <span className=" text-gray-600 text-xl px-1" >{point.name}</span>
              )}
              <IoIosPin className='text-red-500 text-4xl'/>
            </div>
          </Marker>
        ))}

        {tempMarker && (
           <Marker longitude={tempMarker.lng} latitude={tempMarker.lat} anchor='bottom'>
             <div className="flex flex-col items-center justify-end group">
               <span className="text-gray-600 text-xl px-1">
                 {tempMarker.name}
               </span>
               <IoIosPin className='text-blue-500 text-5xl'/>
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
          >
            <div className="flex flex-col gap-2 p-3 text-white min-w-50">
              <h3 className="font-bold text-sm">
                {isEditing ? "Editar Ponto" : "Novo Ponto"}
              </h3>
              <input
                type="text"
                placeholder="Padaria, Academia..."
                value={pointName}
                maxLength={35}
                onChange={(e) => setPointName(e.target.value)}
                className="border p-1 text-sm  w-full"
                autoFocus
              />
              <div className="flex gap-2 justify-end mt-1">
                <button 
                  onClick={handleClosePopup}
                  className="btn-delete-default"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handlePoint}
                  disabled={loading || !pointName}
                  className="btn-create-default"
                >
                  {loading ? "..." : (isEditing ? "Atualizar" : "Salvar")}
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}