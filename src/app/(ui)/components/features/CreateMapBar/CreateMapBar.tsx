'use client';

import { useActionState, useEffect, useRef } from "react";
import { createMapAction } from "./actions";
import { CreateMapFormState } from '@/src/app/(ui)/types/types';
import { CreateMapBarProps } from "../../../types/interfaces";

const initialState: CreateMapFormState = { ok: true};

export default function CreateMapBar({onUpdate} : CreateMapBarProps) {
    const [state, formAction, isPending] = useActionState(createMapAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      if (state.ok && state.data){
        formRef.current?.reset();
        if (onUpdate){
          onUpdate();
        };
      };
    }, [state.ok, state.data, onUpdate])

    return(
      <div>
        <div className="flex w-full max-w-2xl">
          <form action={formAction}>
            <div className='flex w-full h-13'>
              <input 
                name="mapName" 
                type="text" 
                placeholder="Todas as Cafeterias do Brasil"
                maxLength={35}
                disabled={isPending}
                className="grow bg-[#D9D9D9] rounded-l-2xl text-black px-6 text-lg outline-none placeholder-gray-500"
              />
              <button 
                type="submit" 
                disabled={isPending}
                className="btn-create-default border-0 rounded-r-2xl md:px-8 text-lg"
              >
                {isPending ? 'Criando' : '+ Criar Mapa'}
              </button>    
            </div>

            {!state.ok && (
              <div className='text-center italic text-red-400 text-sm'>
                <br/>
                <p>{state.error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    );
}