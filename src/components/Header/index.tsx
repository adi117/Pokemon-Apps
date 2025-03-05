import { FC, useState } from "react";
import Logo from "../../assets/logo.webp"
import SearchIcon from "@/assets/magnifier.svg"
import { cn } from "@/utils/cn";

const Header : FC = () => {

    const [searchMenu, setSearchMenu] = useState("icon");
    
    const handleSearchClick = (searchMenu: string) =>{
        setSearchMenu(searchMenu);
    }

    return (
        <div
        className="flex border-b-[1px] border-[#3D4466] justify-between items-center px-6 py-1.5"
        >
            <img src={Logo} alt="" />
            <div
                onClick={() => {
                    searchMenu === "icon" ? handleSearchClick("box") : handleSearchClick ("icon")
                }}
            >
                <img src={SearchIcon} alt="" className={cn(searchMenu === "icon" ? "block" : "hidden")}/>
                <input type="text"  placeholder="Search..." className={cn("bg-white rounded-lg px-3 py-1 text-sm max-w-36 border-[1px] border-[#3D4466]", searchMenu === "box" ? "block" : "hidden")}/>
            </div>
        </div>
    );
}

export default Header;