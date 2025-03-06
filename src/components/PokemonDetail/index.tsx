import { FC, useEffect, useState } from "react";
import PokemonCard from "../PokemonCard";
import GridFilter from "../Grid Filter";
import Header from "../Header";
import Dropdown from "../Dropdown";
import getAllPokemonDetails from "@/hooks/getAllPokemonDetails";
import { cn } from "@/utils/cn";

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

const PokemonDetail: FC = () => {

    const [filter, setFilter] = useState("id");
    const [grid, setGrid] = useState("single");
    const [query, setQuery] = useState('');
    const { pokemonDetails, loading, error } = getAllPokemonDetails();
    const [sortedPokemon, setSortedPokemon] = useState<PokemonDetails[]>([]);

    useEffect(() => {
        let allPokemonList = [...pokemonDetails].sort((a, z) => {
            switch (filter) {
                case "name":
                    return a.name.localeCompare(z.name);
                case "health":
                    return a.health - z.health;
                case "attack":
                    return a.attack - z.attack;
                case "defense":
                    return a.defense - z.defense;
                case "types":
                    return a.types.localeCompare(z.types);
                default:
                    return a.id - z.id;
            }
        });

        if (query) {
            allPokemonList = allPokemonList.filter((item) => {
                return Object.values(item).join('').toLocaleLowerCase().includes(query.toLowerCase());
            })
        }
        setSortedPokemon(allPokemonList);
    }, [filter, pokemonDetails, query]);


    return (
        <div className="flex-col justify-center items-center">
            <div>
                <Header setQuery={setQuery} query={query}/>
            </div>
            <div className="flex w-full gap-6 px-6 py-4">
                <Dropdown setFilter={setFilter} filter={filter} />
                <GridFilter setGrid={setGrid} grid={grid} />
            </div>
            <div className={cn("gap-4 mx-6", grid === "single" ? "flex flex-wrap" : "grid grid-cols-2")}>
                {sortedPokemon.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.name} grid={grid} />
                ))}
            </div>
        </div>
    );
};

export default PokemonDetail;