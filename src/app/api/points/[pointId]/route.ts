import { NextResponse } from "next/server";
import {isBodyValid, isIdValid} from "../../helper/commonFunctions";
import { badRequest, prismaToHttp } from "../../helper/httpUtils";
import { deletePOIs, editPOIs, searchPOIs } from "./service";

// /api/points/[pointId]

export async function GET(
    request: Request,
    context: {params: Promise<{pointId:string}>}
    ){
        try{
            const {pointId} = await context.params;
            const id = Number(pointId);
            
            if (!isIdValid(id)){
                return badRequest()
            }

            const data = await searchPOIs(id);

            return NextResponse.json(data, { status: 200});
        } catch(error) {return prismaToHttp(error)}
}

export async function PUT(
    request: Request, 
    context: {params: Promise<{pointId:string}>}){

    try {
        const {pointId} = await context.params; 
        const id = Number(pointId);
        
        if (!isIdValid(id)) {
            return badRequest();
        }

        const body = await request.json();

        if(isBodyValid(body)){
            return badRequest()
        }
        
        const editedPOIs = await editPOIs(id,body);        

        return NextResponse.json(editedPOIs, {status: 200});
    }catch (error) {return prismaToHttp(error);}
}

export async function DELETE(
    request:Request,
    context: {params: Promise<{pointId:string}>}
    ){
        try{
            const {pointId} = await context.params;
            const id = Number(pointId);

            if (!isIdValid(id)){
                return badRequest()
            }
            
            await deletePOIs(id);
            
            return new NextResponse(null, {status: 204});
        }catch(error) {return prismaToHttp(error)}
    }