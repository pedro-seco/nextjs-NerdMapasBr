'use client';

import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";
import { PointListProps } from "@/src/app/(ui)/types/interfaces";
import Link from "next/link";
import ButtonBack from "../../common/ButtonBack/ButtonBack";

export default function ItemPointList({pointList, onSelectPointAction}: PointListProps){
  return (
    <ol  className="flex flex-col flex-1 overflow-y-auto min-h-0 text-2xl gap-3">
      <div className="absolute text-xl -top-5 right-4 px-2 bg-[#232121] z-10">
        <ButtonBack route={''}/>
      </div>
      {pointList.length > 0 ? (
        pointList.map((point) => (
          <li key={point.id}>
            <div className="flex grow items-center border-b border-white/10 pb-2 mb-2">
              <button 
              onClick={() => onSelectPointAction?.(point.latitude,point.longitude)} 
              className="hover:opacity-80 cursor-pointer text-left wrap-break-words">{point.name}</button>
              <div className="flex justify-between gap-5 ml-auto ">
                <Link href={`../editpoint/${point.id}`} className="btn-default text-sm"> Editar</Link>
                <ButtonDelete id={point.id} entity={ENTITIES.POI} />
              </div>
            </div> 
          </li>
        ))
      ) : (
        <p className="txt-notfound mt-4 text-xl">
          Nenhum ponto cadastrado.
        </p>
      )}
    </ol>
  )
}
