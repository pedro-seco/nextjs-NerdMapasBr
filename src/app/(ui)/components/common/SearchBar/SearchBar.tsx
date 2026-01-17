import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    value: string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function SearchBar({value, onChange, placeholder}: SearchBarProps){
    return (
    <div className="search-default gap-2">
        <FaSearch />
        <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
    </div>
    )
}