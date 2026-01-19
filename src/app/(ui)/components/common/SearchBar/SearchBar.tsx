import { FaSearch } from "react-icons/fa";
import { NominatingResponse } from "../../../types/types";
import { getAddress } from "../../utils/getAddress";

interface SearchBarProps {
    value: string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    suggestions?: NominatingResponse[];
    onSelectSuggestion?: (item: NominatingResponse) => void;
    onSearchEnter?: () => void;
}


//TODO - IMPLEMENTAR BUTTON X DA MUI
export default function SearchBar({
        value,
        onChange,
        placeholder,
        suggestions = [],
        onSelectSuggestion,
        onSearchEnter,
    }: SearchBarProps){

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearchEnter) {
            onSearchEnter();
        }
    };

    return (
        <div className="relative">
            <div className="search-default gap-2">
                <FaSearch />
                <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={handleEnter}
                />
            </div>
            <div>
                {suggestions.length > 0 && onSelectSuggestion && (
                    <ul className="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded-b shadow-lg mt-1 max-h-60 overflow-y-auto">
                        {suggestions.map((item) => (
                            <li 
                                key={item.place_id}
                                onClick={() => onSelectSuggestion(item)}
                                className="p-3 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0 text-gray-700 text-left"
                            >
                                {item.name} <br></br>
                                {getAddress(item.address)}
                            </li>
                        ))}
                    </ul>
                )}      
            </div>
        </div>
    )
}