import { NextResponse } from "next/server";
import { badRequest, prismaToHttp } from "../../helper/httpUtils";
import { isIdValid } from "../../helper/commonFunctions";
import { searchMapWithPOIs, deleteMapWithPOIs, deleteAllMaps } from "./service";

//app/api/maps/[mapsId]

export async function GET(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
    ){
        try{
            const {mapsId} = await context.params;
            const id = Number(mapsId);
            
            if (!isIdValid(id)){
                return badRequest()
            }

            const data = await searchMapWithPOIs(id);

            return NextResponse.json(data, { status: 200});
        } catch(error) {return prismaToHttp(error)}
}

export async function DELETE(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
){
    try{
        const {mapsId} =  await context.params;
        const id = Number(mapsId);

        if (!isIdValid(id)){
            return badRequest()
        }

        await deleteMapWithPOIs(id);

        return new NextResponse(null, {status: 204})
    } catch(error)  {return prismaToHttp(error)}
}

