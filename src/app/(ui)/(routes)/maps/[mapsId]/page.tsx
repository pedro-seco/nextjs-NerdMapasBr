import { searchMapWithPOIs } from "@/src/app/api/maps/[mapsId]/service";
import { notFound } from "next/navigation";
import MapScreen from "./MapScreen";

export default async function MapPage(
    context: {params: Promise<{mapsId:string}>}){
    
    const {mapsId} = await context.params;
    const id = Number(mapsId);
    const mapWithPOIs = await searchMapWithPOIs(id);
    
    if (!mapWithPOIs){
        notFound();
    }
        
    return(
        <MapScreen mapWithPOIs={mapWithPOIs}/>
        );
}