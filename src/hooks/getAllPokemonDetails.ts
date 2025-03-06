import { useEffect, useRef, useState } from "react";
import usePokemonList from "./usePokemonList";

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

const getAllPokemonDetails = () => {

    const {pokemonList, loading: listLoading, error: listError} = usePokemonList();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

        if (listLoading || listError || pokemonList.length === 0) {
            return;
        }
        const fetchPokemonDetails = async () => {
            try {
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
                        spriteFront : data.sprites.front_default,
                        artworkFront : data.sprites.other["official-artwork"].front_default,
                        types: data.types.map((type: any) => type.type.name).join(", "),
                    };
                }));
                setPokemonDetails(detailsPokemon);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchPokemonDetails();
        console.log(pokemonList);
    }, [pokemonList]);

    return {pokemonDetails, loading, error}
};

export default getAllPokemonDetails;