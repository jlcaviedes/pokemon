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
  await pokemonStore.loadPokemons();
  favorites.value = pokemonStore.favorites;
  pokemons.value = pokemonStore.pokemons.filter((pokemon) =>
    favorites.value.includes(pokemon.id),
  );
});
</script>

<template>
  <main class="pokemon-view" v-if="favorites.length">
    <header class="pokemon-header">
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
