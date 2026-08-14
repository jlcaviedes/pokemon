export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export interface PokemonTypesResponse {
  count: number;
  results: PokemonType[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonAbilityResult {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: false;
  slot: 1;
}

export interface PokemonDetailResult {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: PokemonAbilityResult[];
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
  category: string;
  description: string;
  gender: {
    female: number;
    male: number;
  };
  weaknesses: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  description: string;
  weight: number;
  height: number;
  category: string;
  abilities: string[];
  gender: {
    female: number;
    male: number;
  };
  weaknesses: string[];
}
