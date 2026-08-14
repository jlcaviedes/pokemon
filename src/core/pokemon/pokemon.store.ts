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
  const hasMore = ref(true);
  const limit = 20;
  const offset = ref(0);

  const nextGroupOfPokemons = async () => {
    if (loading.value || !hasMore.value) {
      return;
    }

    try {
      loading.value = true;
      const newPokemons = await getPokemons(limit, offset.value);

      pokemons.value.push(...newPokemons);

      offset.value += limit;

      if (newPokemons.length < limit) {
        hasMore.value = false;
      }
    } catch (error) {
      console.error("Error cargando Pokémon:", error);
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

  const getPokemonsByFavorites = () => {
    return pokemons.value.filter((pokemon: Pokemon) =>
      favorites.value.includes(pokemon.id),
    );
  };

  return {
    pokemons,
    pokemonDetail,
    loading,
    error,
    favorites,
    getPokemon,
    getPokemonsByFavorites,
    nextGroupOfPokemons,
    async preLoadPokemons() {
      if (!pokemons.value.length) await nextGroupOfPokemons();
    },
    setFavorites,
  };
});
