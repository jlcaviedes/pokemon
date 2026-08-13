<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Pokemon } from "../../core/pokemon/pokemon.types";
import { getPokemons } from "../../core/pokemon/pokemon.service";

import PokemonList from "../components/list/List.vue";
import Search from "../components/search/Search.vue";

const pokemons = ref<Pokemon[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const search = ref("");

const loadPokemons = async () => {
  try {
    loading.value = true;
    error.value = null;

    pokemons.value = await getPokemons(20, 0);
  } catch (err) {
    error.value = "No se pudieron cargar los Pokémon";
  } finally {
    loading.value = false;
  }
};

const onFavorites = (favorites) => {};

onMounted(() => {
  loadPokemons();
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
      @favorites="onFavorites"
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
