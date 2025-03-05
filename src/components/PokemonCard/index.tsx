import { FC } from "react";
import usePokemonDetails from "../../hooks/usePokemonDetail";
import { cn } from "../../utils/cn";


interface PokemonCardProps {
    pokemonName: string;
    grid: string;
}

const PokemonCard : FC<PokemonCardProps> = ({ pokemonName, grid}) => {

    const { pokemonDetails } = usePokemonDetails(pokemonName);

    return (
        <div className={cn("capitalize flex", grid === "single" ? "w-full" : "w-fit")}>
            <div className={cn("flex flex-col justify-center items-center p-3 bg-white rounded-lg", grid === "single" ? "w-full" : "w-32")}>
                <div className={cn("w-full justify-between", grid === "single" ? "flex" : "hidden")}>
                    <p className="text-base font-bold text-[#11B047]">{pokemonDetails?.types}</p>
                    <p className="text-base font-bold">{pokemonDetails?.id}</p>
                </div>
                <img src={pokemonDetails?.artworkFront} alt="" className="w-44 block" />
                <p className="text-lg font-bold text-[#212E4C]">{pokemonDetails?.name}</p>
            </div>
        </div>
    );
};

export default PokemonCard;