'use client';

import Form from 'next/form';
import { useActionState } from "react";
import { FormState } from '@/src/app/(ui)/types/types';
import { createMapAction } from '../CreateMapPageBar/actions';
import { editPointAction } from './actions';


const initialState: FormState = { ok: true };

interface EditPointPageProps {
    point :{
        id: number;
        name: string;
        mapId: number;
    }
}

export default function EditPointPageBar({point}: EditPointPageProps) {
    const [state, formAction] = useActionState(editPointAction, initialState);

    return(
      <div>
        <div className='flex justify-center text-3xl p-5' >
          <h1>Ponto: {point.name}</h1>
        </div>
        <Form action={formAction} className="flex flex-col w-full max-w-2xl">
          <div className='flex w-full h-13'>
            <input type="hidden" name="pointId" value={point.id}/>
            <input type="hidden" name="mapId" value={point.mapId}/>
            <input 
              name="pointName"
              type="text" 
              placeholder="Padaria -> Padaria do Wesley"
              maxLength={35}
              className="grow bg-[#D9D9D9] rounded-l-2xl text-black px-6 text-lg outline-none placeholder-gray-500"
            />
            <button 
              type="submit" 
              className="btn-create-default border-0 rounded-r-2xl md:px-8 text-lg"
            >
              Editar Nome
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
    );
}