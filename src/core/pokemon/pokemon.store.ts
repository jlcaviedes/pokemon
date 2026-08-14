import { defineStore } from "pinia";
import { ref } from "vue";

import { getPokemonByName, getPokemons } from "./pokemon.service";
import type { Pokemon, PokemonDetail } from "./pokemon.types";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemonDetail = ref<PokemonDetail | null>(null);
  const pokemons = ref<Pokemon[]>([]);
  const favorites = ref<Number[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadPokemons = async (limit = 20, offset = 0) => {
    try {
      loading.value = true;
      error.value = null;

      pokemons.value = await getPokemons(limit, offset);
    } catch (err) {
      error.value = "No se pudieron cargar los Pokémon";
    } finally {
      loading.value = false;
    }
  };

  const getPokemon = async (name: string) => {
    try {
      loading.value = true;
      error.value = null;

      pokemonDetail.value = await getPokemonByName(name);
    } catch (err) {
      error.value = "No se pudo cargar el Pokémon";
    } finally {
      loading.value = false;
    }
  };

  const setFavorites = async (newFavorites: number[]) => {
    favorites.value = [...newFavorites];
  };

  return {
    pokemons,
    pokemonDetail,
    loading,
    error,
    favorites,
    getPokemon,
    loadPokemons,
    setFavorites,
  };
});
