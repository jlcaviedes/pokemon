import { pokemonMapping } from "./pokemon.mapping";
import type {
  Pokemon,
  PokemonDetail,
  PokemonResponse,
  PokemonTypesResponse,
} from "./pokemon.types";

const API_URL = "https://pokeapi.co/api/v2";

const getPokemonWeaknesses = async (types: string[]): Promise<string[]> => {
  const responses = await Promise.all(
    types.map((type) => fetch(`${API_URL}/type/${type}`)),
  );

  const data = await Promise.all(responses.map((response) => response.json()));

  const weaknesses = data.flatMap(
    (type) => type.damage_relations.double_damage_from,
  );

  return [...new Set(weaknesses.map((weakness) => weakness.name))];
};

export const getPokemonTypes = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/type`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los tipos de Pokémon");
  }

  const data: PokemonTypesResponse = await response.json();

  return data.results
    .map((type) => type.name)
    .filter((type) => type !== "unknown" && type !== "shadow");
};

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
        // image: detail.sprites.other["official-artwork"].front_default,
        image: detail.sprites.other["showdown"].front_default,
        types: detail.types.map(
          (type: { type: { name: string } }) => type.type.name,
        ),
      };
    }),
  );

  return pokemons;
};

export const getPokemonByName = async (
  name: string,
): Promise<PokemonDetail> => {
  const [pokemonResponse, speciesResponse] = await Promise.all([
    fetch(`${API_URL}/pokemon/${name}`),
    fetch(`${API_URL}/pokemon-species/${name}`),
  ]);

  if (!pokemonResponse.ok || !speciesResponse.ok) {
    throw new Error("No se pudo obtener el Pokémon");
  }

  const pokemon = await pokemonResponse.json();
  const species = await speciesResponse.json();
  console.log(species);

  const description =
    species.flavor_text_entries.find(
      (entry: any) => entry.language.name === "es",
    )?.flavor_text ?? "";

  const category =
    species.genera.find((entry: any) => entry.language.name === "es")?.genus ??
    "";

  const color = species.color.name ?? "";

  const categorySplit = category.split(" ") as string[];

  const femaleRate = species.gender_rate;

  const female = femaleRate === -1 ? 0 : (femaleRate / 8) * 100;

  const male = femaleRate === -1 ? 0 : 100 - female;

  const result = {
    ...pokemon,
    description,
    category: categorySplit.reverse()[0],
    gender: {
      female,
      male,
    },
    weaknesses: [],
    color,
  };
  let pokemonMap = pokemonMapping(result);
  const weaknesses = await getPokemonWeaknesses(pokemonMap.types);
  return { ...pokemonMap, weaknesses };
};
