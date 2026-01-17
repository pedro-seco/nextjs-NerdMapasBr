import { notFound } from "next/navigation";
import MapScreen from "./MapScreen";
import fetchData from "../../../services/fetchData";

export default async function MapPage(context: {params: Promise<{mapsId:string}>}){    
    const {mapsId} = await context.params;
    const mapWithPOIs = await fetchData(`http://localhost:3000/api/maps/${mapsId}`, {cache: 'no-store'});

    if (!mapWithPOIs){
        notFound();
    }
        
    return(
        <MapScreen mapWithPOIs={mapWithPOIs}/>
    );
}