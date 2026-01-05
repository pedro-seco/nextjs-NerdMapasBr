import Link from "next/link";
import { ListMapsProps } from "../../../types/interfaces"
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";
import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ButtonDeleteAll from "../../common/ButtonDeleteAll/ButtonDeleteAll";

export default async function ListOfMaps({map}: ListMapsProps){
    return(
      <div className="relative w-full h-140 border flex flex-col">
        <span className="absolute -top-5 left-8 txt-title">
          Cidades
        </span>
        <div className="h-full w-full p-6 pt-10 overflow-y-auto custom-scrollbar">
          <ol className="flex flex-col gap-4 font-sans">
            {map.length > 0 ? (
              map.map((item) => (
                <li key={item.id} className="w-full">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <div>
                      <p className="font-bold text-2xl">{item.name}</p>
                      <p className="text-gray-400 font-light text-sm">Pontos Cadastrados: {item.pois?.length || 0}</p>
                    </div>
                    <div className="flex justify-between gap-4" >
                      <Link 
                        href={`/maps/${item.id}`} 
                        className="btn-create-default"
                      >
                        Acessar
                      </Link>
                      <ButtonDelete id={item.id} entity={ENTITIES.MAP}/>
                    </div>
                  </div>
                </li>
              ))
            ) : (
               <p className="txt-notfound mt-10">Nenhum mapa encontrado.</p>
            )}
          </ol>
        </div>
        <ButtonDeleteAll entity={ENTITIES.MAP} />
      </div>
    );
}