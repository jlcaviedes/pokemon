<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Pokemon } from "../../core/pokemon/pokemon.types";

import { usePokemonStore } from "../../core/pokemon/pokemon.store.ts";
import PokemonList from "../components/list/List.vue";
import Search from "../components/search/Search.vue";
import router from "../router/index.ts";

const pokemonStore = usePokemonStore();
const pokemons = ref<Pokemon[]>([]);
const favorites = ref<Number[]>([]);
const search = ref("");

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= pageHeight - 300) {
    pokemonStore.nextGroupOfPokemons();
  }
};

const load = async () => {
  await pokemonStore.preLoadPokemons();
  pokemons.value = pokemonStore.pokemons;
  favorites.value = pokemonStore.favorites;
};

const onFavorites = (newFavorites: number[]) => {
  pokemonStore.setFavorites(newFavorites);
  favorites.value = newFavorites;
};

const onSelectPokemon = (pokemonName: string) => {
  router.push(`/detail/${pokemonName}`);
};

onMounted(() => {
  load();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
      @select-pokemon="onSelectPokemon"
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
