'use client';

import Form from 'next/form';
import { useActionState } from "react";
import { createMapAction } from "./actions";
import { FormState } from '@/src/app/(ui)/types/types';

const initialState: FormState = { ok: true };

export default function CreateMapPageBar() {
    const [state, formAction] = useActionState(createMapAction, initialState);

    return(
      <div>
        <div className="flex w-full max-w-2xl">
          <Form action={formAction}>
            <div className='flex w-full h-13'>
              <input 
                name="mapName" 
                type="text" 
                placeholder="Rio de Janeiro, RJ"
                maxLength={35}
                className="grow bg-[#D9D9D9] rounded-l-2xl text-black px-6 text-lg outline-none placeholder-gray-500"
              />
              <button 
                type="submit" 
                className="btn-create-default border-0 rounded-r-2xl md:px-8 text-lg"
              >
                + Criar Mapa
              </button>    
            </div>

            {!state.ok && (
              <div className='text-center italic text-red-400 text-sm'>
                <br/>
                <p>{state.error}</p>
              </div>
            )}
          </Form>
        </div>
      </div>
    );
}