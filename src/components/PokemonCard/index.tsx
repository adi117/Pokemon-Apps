import { FC } from "react";
import { cn } from "../../utils/cn";


interface PokemonCardProps {
    pokemon: PokemonDetails;
    grid: string;
}

interface PokemonDetails {
    name: string;
    id: number;
    health: number;
    attack: number;
    defense: number;
    spriteFront: string;
    artworkFront: string;
    types: string;
}

const PokemonCard : FC<PokemonCardProps> = ({ pokemon, grid}) => {

    return (
        <div className={cn("capitalize flex", grid === "single" ? "w-full" : "w-fit ")}>
            <div className={cn("flex flex-col justify-center items-center p-3 bg-white rounded-lg", grid === "single" ? "w-full" : "w-full")}>
                <div className={cn("w-full justify-between", grid === "single" ? "flex" : "hidden")}>
                    <p className="text-base font-bold text-[#11B047]">{pokemon.name}</p>
                    <p className="text-base font-bold">{pokemon.id}</p>
                </div>
                <img src={pokemon.artworkFront} alt="" className="w-44 block" />
                <p className="text-lg font-bold text-[#212E4C]">{pokemon.name}</p>
            </div>
        </div>
    );
};

export default PokemonCard;