<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Pokemon } from "../../core/pokemon/pokemon.types";

import { usePokemonStore } from "../../core/pokemon/pokemon.store.ts";
import Empty from "../components/empty/Empty.vue";
import PokemonList from "../components/list/List.vue";

const pokemonStore = usePokemonStore();
const pokemons = ref<Pokemon[]>([]);
const favorites = ref<Number[]>([]);

onMounted(async () => {
  favorites.value = pokemonStore.favorites;
  pokemons.value = pokemonStore.getPokemonsByFavorites();
});
</script>

<template>
  <main class="favorites" v-if="favorites.length">
    <header class="favorites__header">
      <h1>Favoritos</h1>
    </header>
    <PokemonList :pokemons="pokemons" :favorites="favorites" />
  </main>
  <Empty
    v-else
    title="No has marcado ningún Pokémon como favorito"
    description="Haz clic en el ícono de corazón de tus Pokémon favoritos y aparecerán aquí."
  />
</template>

<style scoped>
.favorites {
  width: 100%;
  padding: 32px;
}

.favorites__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .favorites {
    padding: 20px;
  }

  .favorites__header {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
