import { Prisma } from "@/prisma/generated/prisma/client";
import { NextResponse } from "next/server";

export function prismaToHttp(error: unknown){
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({error: 'Registro não encontrado.'},{ status: 404 });
            }
        }
        console.log(error);
        return NextResponse.json({error: 'Algo deu errado.'}, { status: 500 });
}  

export function badRequest(){
    return NextResponse.json({error: "Erro na requisição"},{ status: 400 });
}