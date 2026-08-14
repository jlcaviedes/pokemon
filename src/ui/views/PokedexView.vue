<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Pokemon } from "../../core/pokemon/pokemon.types";

import { usePokemonStore } from "../../core/pokemon/pokemon.store.ts";
import PokemonList from "../components/list/List.vue";
import FilterModal from "../components/filter/FilterModal.vue";
import Search from "../components/search/Search.vue";
import router from "../router/index.ts";
import Empty from "../components/empty/Empty.vue";

const pokemonStore = usePokemonStore();
const pokemons = ref<Pokemon[]>([]);
const favorites = ref<Number[]>([]);
const search = ref("");
const filter = ref(false);
const typesFilter = ref<string[]>([]);
const filtersSelected = ref<string[]>([]);
const okRequest = ref(false);

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= pageHeight - 300) {
    pokemonStore.nextGroupOfPokemons();
  }
};

const load = async () => {
  await pokemonStore.preLoadPokemons();
  okRequest.value = pokemonStore.error === null;
  await pokemonStore.loadTypes();
  pokemons.value = pokemonStore.pokemons;
  favorites.value = pokemonStore.favorites;
  typesFilter.value = pokemonStore.types;
};

const onFavorites = (newFavorites: number[]) => {
  pokemonStore.setFavorites(newFavorites);
  favorites.value = newFavorites;
};

const onSelectPokemon = (pokemonName: string) => {
  router.push(`/detail/${pokemonName}`);
};

const onEraseFilters = () => {
  filtersSelected.value = [];
  pokemons.value = pokemonStore.pokemons;
};

const onApplyFilter = (newFilters: string[]) => {
  filter.value = false;
  filtersSelected.value = newFilters;
  if (!newFilters.length) {
    pokemons.value = pokemonStore.pokemons;
    return;
  }
  const filters = new Set(newFilters);
  pokemons.value = pokemons.value.filter((pokemon) =>
    pokemon.types.some((type) => filters.has(type)),
  );
};

const onCancelFilter = () => {
  filter.value = false;
};

const onShowFilter = () => {
  filter.value = true;
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
  <main v-if="okRequest" class="pokemon-view">
    <FilterModal
      :open="filter"
      :types="typesFilter"
      :selectedTypes="filtersSelected"
      @close="onCancelFilter"
      @apply="onApplyFilter"
    />
    <header class="pokemon-header">
      <Search @click-search="onShowFilter" />
      <div v-if="filtersSelected.length" class="pokemon-view__filters">
        Se han encontrado {{ pokemons.length }} resultados
        <button
          type="button"
          @click="onEraseFilters"
          class="pokemon-view__link-erase"
        >
          Borrar filtro
        </button>
      </div>
    </header>
    <PokemonList
      :search="search"
      :pokemons="pokemons"
      :favorites="favorites"
      @select-favorites="onFavorites"
      @select-pokemon="onSelectPokemon"
    />
  </main>
  <Empty
    v-else
    title="Algo salió mal..."
    description="No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde."
    :isRetry="true"
    @retry="load"
  />
</template>

<style scoped>
.pokemon-view {
  width: 100%;
  padding: 32px;
}

.pokemon-view__filters {
  display: flex;
  font-size: 14px;
  align-items: center;
}

.pokemon-view__link-erase {
  color: #1e88e5;
  background-color: transparent;
  text-decoration: underline;
  font-size: 14px;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
}

.pokemon-header {
  display: flex;
  align-items: center;
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
