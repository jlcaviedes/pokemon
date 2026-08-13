export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}
