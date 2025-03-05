import { FC, useEffect, useState } from "react";
import usePokemonList from "../../hooks/usePokemonList";
import PokemonCard from "../PokemonCard";
import GridFilter from "../Grid Filter";
import Header from "../Header";
import Dropdown from "../Dropdown";

interface PokemonDetails {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    types: string;
}

const PokemonDetail: FC = () => {

    const [filter, setFilter] = useState("id");
    const [grid, setGrid] = useState("single");
    const { pokemonList } = usePokemonList();
    const [sortPokemon, setSortedPokemon] = useState<PokemonDetails[]>([]);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const detailsPokemon = await Promise.all(pokemonList.map(async (pokemon) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon details.");
                }
                const data = await response.json();
                return {
                    id: data.id,
                    name: data.name,
                    health: data.stats.find((stat: any) => stat.stat.name === "hp")?.base_stat,
                    attack: data.stats.find((stat: any) => stat.stat.name === "attack")?.base_stat,
                    defense: data.stats.find((stat: any) => stat.stat.name === "defense")?.base_stat,
                    types: data.types.map((type: any) => type.type.name).join(", "),
                };
            }));
            setSortedPokemon(detailsPokemon);
        }

        fetchPokemonDetails();
    }, [pokemonList]);


    useEffect(() => {
        const sortedPokemon = [...sortPokemon].sort((a, z) => {
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
                    break;
            }

            return a.id - z.id;
        });
        setSortedPokemon(sortedPokemon);
    }, [filter]);


    return (
        <div className="flex-col justify-center items-center">
            <div>
                <Header></Header>
            </div>
            <div className="flex w-full gap-6 px-6 py-4">
                <Dropdown setFilter={setFilter} filter={filter}/>
                <GridFilter setGrid={setGrid} grid={grid} />
            </div>
            <div className="flex flex-wrap gap-4 mx-6">
                {sortPokemon.map((pokemon) => (
                    <PokemonCard pokemonName={pokemon.name} key={pokemon.name} grid={grid} />
                ))}
            </div>
        </div>
    );
};

export default PokemonDetail;