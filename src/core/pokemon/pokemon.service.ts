import type { Pokemon, PokemonResponse } from "./pokemon.types";

const API_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<Pokemon[]> => {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los Pokémon");
  }

  const data: PokemonResponse = await response.json();

  const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);

      if (!detailResponse.ok) {
        throw new Error(`No se pudo obtener ${pokemon.name}`);
      }

      const detail = await detailResponse.json();

      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other["official-artwork"].front_default,
        types: detail.types.map(
          (type: { type: { name: string } }) => type.type.name,
        ),
      };
    }),
  );

  return pokemons;
};
