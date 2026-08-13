import { defineStore } from "pinia";
import { ref } from "vue";

import type { Pokemon } from "./pokemon.types";
import { getPokemons } from "./pokemon.service";

export const usePokemonStore = defineStore("pokemon", () => {
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

  const setFavorites = async (newFavorites: number[]) => {
    favorites.value = [...newFavorites];
  };

  return {
    pokemons,
    loading,
    error,
    loadPokemons,
    favorites,
    setFavorites,
  };
});
