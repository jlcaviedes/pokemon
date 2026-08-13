<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Pokemon } from "../../core/pokemon/pokemon.types";

import { usePokemonStore } from "../../core/pokemon/pokemon.store.ts";
import PokemonList from "../components/list/List.vue";
import Search from "../components/search/Search.vue";

const pokemonStore = usePokemonStore();
const pokemons = ref<Pokemon[]>([]);
const favorites = ref<Number[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const search = ref("");

const load = async () => {
  await pokemonStore.loadPokemons();
  pokemons.value = pokemonStore.pokemons;
  favorites.value = pokemonStore.favorites;
};

const onFavorites = (newFavorites: number[]) => {
  pokemonStore.setFavorites(newFavorites);
  favorites.value = newFavorites;
};

onMounted(() => {
  load();
});
</script>

<template>
  <main class="pokemon-view">
    <header class="pokemon-header">
      <Search />
    </header>
    <PokemonList
      :search="search"
      :pokemons="pokemons"
      :favorites="favorites"
      @select-favorites="onFavorites"
    />
  </main>
</template>

<style scoped>
.pokemon-view {
  width: 100%;
  padding: 32px;
}

.pokemon-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .pokemon-view {
    padding: 20px;
  }

  .pokemon-header {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
