import { NextResponse } from "next/server";
import { badRequest, prismaToHttp } from "@/src/app/api/helper/httpUtils";
import { isAtributeMissing, isBodyValid, isIdValid } from "@/src/app/api/helper/commonFunctions";
import { createPOIsOnMap, deleteAllPOIsOnMap } from "./services";

// /api/maps/[mapsId]/points
export async function POST(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
    ){

    try{
        const {mapsId} = await context.params;
        const id = Number(mapsId);

        if (!isIdValid(id) ){
            return badRequest()
        }

        const body = await request.json();
        
        if(isBodyValid(body)){
            return badRequest()
        }

        for (const atributo in body){
            if(isAtributeMissing(atributo)){
                return badRequest();
            }
        }
        
        const createdPOI = await createPOIsOnMap(id,body)
        
        return NextResponse.json(createdPOI,{status: 200});
    } catch(error) {return prismaToHttp(error)}
    
}

export async function DELETE(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
        ){
        try{
            const {mapsId} = await context.params;
            const id = Number(mapsId);
            
            if (!isIdValid(id)){
                return badRequest()
            }

            await deleteAllPOIsOnMap(id);

            return new NextResponse(null, {status: 204});
        } catch(error) {return prismaToHttp(error)}
    }