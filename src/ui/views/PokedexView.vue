<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Pokemon } from "../../core/pokemon/pokemon.types";

import { usePokemonStore } from "../../core/pokemon/pokemon.store.ts";
import Empty from "../components/empty/Empty.vue";
import FilterModal from "../components/filter/FilterModal.vue";
import PokemonList from "../components/list/List.vue";
import Search from "../components/search/Search.vue";
import router from "../router/index.ts";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const pokemonStore = usePokemonStore();
const pokemons = ref<Pokemon[]>([]);
const favorites = ref<Number[]>([]);
const search = ref("");
const filter = ref(false);
const typesFilter = ref<string[]>([]);
const filtersSelected = ref<string[]>([]);
const okRequest = ref(false);
const pokemonList = ref<InstanceType<typeof PokemonList> | null>(null);

const handleScrollDown = () => {
  pokemonStore.nextGroupOfPokemons();
  if (filtersSelected.value.length) {
    applyFilter();
  }
};

const applyFilter = () => {
  const filters = new Set(filtersSelected.value);
  pokemons.value = pokemons.value.filter((pokemon) =>
    pokemon.types.some((type) => filters.has(type)),
  );
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
  applyFilter();
};

const onCancelFilter = () => {
  filter.value = false;
};

const onShowFilter = () => {
  filter.value = true;
};

onMounted(() => {
  load();
  const intervalId = setInterval(() => {
    !pokemonList.value?.hasScroll()
      ? pokemonStore.nextGroupOfPokemons()
      : clearInterval(intervalId);
  }, 1000);
});
</script>

<template>
  <main v-if="okRequest" class="pokedex">
    <FilterModal
      :open="filter"
      :types="typesFilter"
      :selectedTypes="filtersSelected"
      @close="onCancelFilter"
      @apply="onApplyFilter"
    />
    <header class="pokedex__header">
      <Search
        :search="filtersSelected.map(t).join(', ')"
        @click-search="onShowFilter"
      />
      <div v-if="filtersSelected.length" class="pokedex__filters">
        Se han encontrado {{ pokemons.length }} resultados
        <button
          type="button"
          @click="onEraseFilters"
          class="pokedex__link-erase"
        >
          Borrar filtro
        </button>
      </div>
    </header>
    <PokemonList
      ref="pokemonList"
      :search="search"
      :pokemons="pokemons"
      :favorites="favorites"
      @select-favorites="onFavorites"
      @select-pokemon="onSelectPokemon"
      @scroll-down="handleScrollDown"
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
.pokedex {
  padding: 32px;
  overflow: hidden;
  height: 100%;
}

.pokedex__filters {
  display: flex;
  font-size: 14px;
  align-items: center;
}

.pokedex__link-erase {
  color: #1e88e5;
  background-color: transparent;
  text-decoration: underline;
  font-size: 14px;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
}

.pokedex__header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding-left: 20px;
}

@media (max-width: 768px) {
  .pokedex {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .pokedex__header {
    flex-direction: column;
    align-items: stretch;
    padding-left: 0px;
  }
}
</style>
