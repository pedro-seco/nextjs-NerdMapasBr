'use client';

import { useActionState, useEffect, useRef } from "react";
import { createMapAction } from "./actions";
import { CreateMapFormState } from '@/src/app/(ui)/types/types';
import { CreateMapBarProps } from "../../../types/interfaces";
import { HiPlus } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im"; 

const initialState: CreateMapFormState = { ok: true };

export default function CreateMapBar({ onUpdate }: CreateMapBarProps) {
    const [state, formAction, isPending] = useActionState(createMapAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.ok && state.data) {
            formRef.current?.reset();
            if (onUpdate) {
                onUpdate();
            };
        };
    }, [state.ok, state.data, onUpdate])

    return (
        <div className="w-full">
            <form ref={formRef} action={formAction} className="relative w-full">
                <div className="flex shadow-lg rounded-lg overflow-hidden border border-gray-700 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
                    <input
                        name="mapName"
                        type="text"
                        placeholder="Nome do novo mapa"
                        maxLength={35}
                        disabled={isPending}
                        required
                        className="grow bg-neutral-900 text-white px-4 py-3 outline-none placeholder-gray-500 text-sm md:text-base disabled:opacity-50"
                    />

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2 transition-all disabled:bg-neutral-700 disabled:cursor-not-allowed flex items-center justify-center min-w-30"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2 text-gray-300">
                                <ImSpinner8 className="animate-spin" />
                                <span>Criando...</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                <HiPlus className="text-lg" />
                                <span>Criar</span>
                            </span>
                        )}
                    </button>
                </div>

                {!state.ok && state.error && (
                    <div className="absolute top-full left-0 mt-2 w-full animate-fade-in">
                        <p className="text-red-400 text-xs bg-red-900/20 border border-red-900/50 p-2 rounded text-center">
                            {state.error}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}