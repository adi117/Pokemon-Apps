import { FC } from "react";

interface SortFilterProps {
    setFilter: (filter: string) => void;
    filter: string;
}
const Dropdown : FC<SortFilterProps> = ({setFilter, filter}) => {
    return (
        <select
        className="bg-[#3D4466] appearance-none p-2 text-[#97A0CC] flex justify-between items-center text-[16px] font-normal w-full rounded-lg"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        >
            <option value="ID">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="health">Sort by Health</option>
            <option value="attack">Sort by Attack</option>
            <option value="defense">Sort by Defense</option>
            <option value="type">Sort by Type</option>
        </select>
    );
};

export default Dropdown;