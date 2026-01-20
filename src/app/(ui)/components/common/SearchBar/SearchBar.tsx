'use client';

import { FaSearch } from "react-icons/fa";
import { NominatingResponse } from "../../../types/types";
import { getAddress } from "../../utils/getAddress";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    suggestions?: NominatingResponse[];
    onSelectSuggestion?: (item: NominatingResponse) => void;
    onSearchEnter?: () => void;
}

export default function SearchBar({
    value,
    onChange,
    placeholder,
    suggestions = [],
    onSelectSuggestion,
    onSearchEnter,
}: SearchBarProps) {

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearchEnter) {
            onSearchEnter();
        }
    };

    return (
        <div className="relative w-full">
            <div className="flex items-center w-full px-3 py-2 bg-[#262626] border border-white/10 rounded-lg focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 hover:border-white/20 transition-all">
                <FaSearch className="text-gray-500 mr-2 text-xs" />
                <input
                    className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500 h-full"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleEnter}
                />
            </div>
            <div className="relative">
                {suggestions.length > 0 && onSelectSuggestion && (
                    <ul className="absolute z-50 top-1 left-0 w-full bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto custom-scrollbar">
                        {suggestions.map((item) => (
                            <li
                                key={item.place_id}
                                onClick={() => onSelectSuggestion(item)}
                                className="p-3 hover:bg-white/5 cursor-pointer text-sm border-b border-white/5 last:border-b-0 text-gray-300 text-left transition-colors"
                            >
                                <span className="font-medium text-white block mb-0.5">
                                    {item.name}
                                </span>
                                <span className="text-xs text-gray-500 block">
                                    {getAddress(item.address)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}