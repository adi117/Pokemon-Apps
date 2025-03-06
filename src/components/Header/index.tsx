import { FC, useState, useMemo} from "react";
import Logo from "../../assets/logo.webp"
import SearchIcon from "@/assets/magnifier.svg"
import { cn } from "@/utils/cn";
import debounce from 'debounce';

interface SearchQuery {
    setQuery: (grid: string) => void;
    query: string;
}

const Header : FC<SearchQuery> = ({setQuery, query}) => {

    const [searchMenu, setSearchMenu] = useState("icon");
    
    const handleSearchClick = (searchMenu: string) =>{
        setSearchMenu(searchMenu);
    }

    const handleInputChange = (query: string) => {
        setQuery(query);
    };

    const debounceQuery = useMemo(() => {
        return debounce(handleInputChange, 300);
    }, []);

    return (
        <div
        className="flex border-b-[1px] border-[#3D4466] justify-between items-center px-6 py-1.5"
        >
            <img src={Logo} alt="" />
            <div
            >
                <img
                src={SearchIcon}
                className={cn(searchMenu === "icon" ? "block" : "hidden")}
                onClick={() => {
                    searchMenu === "icon" ? handleSearchClick("box") : handleSearchClick ("icon")
                }}
                />
                <input
                type="text"
                placeholder="Search..."
                className={cn("bg-white rounded-lg px-3 py-1 text-sm max-w-36 border-[1px] border-[#3D4466]", searchMenu === "box" ? "block" : "hidden")}
                value={query}
                onChange={(e) => debounceQuery(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Header;