import type { PokemonDetail, PokemonDetailResult } from "./pokemon.types";

export const pokemonMapping = (data: PokemonDetailResult): PokemonDetail => {
  console.log(JSON.stringify(data, null, 2));

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    abilities: data.abilities.map((ability) => ability.ability.name),
    types: data.types.map((type) => type.type.name),
    weight: data.weight / 10,
    height: data.height / 10,
    category: data.category,
    description: data.description,
    gender: data.gender,
    weaknesses: data.weaknesses,
  };
};
