<script setup lang="ts">
import type { Pokemon } from "../../../core/pokemon/pokemon.types.ts";
import PokemonCard from "../card/Card.vue";

const { pokemons, favorites } = defineProps<{
  pokemons: Pokemon[];
  favorites: Number[];
}>();

const emit = defineEmits();

const onFavorite = (pokemonId: number) => {
  const favoritesCurrent = [...favorites] as number[];
  favoritesCurrent.includes(pokemonId)
    ? favoritesCurrent.splice(favoritesCurrent.indexOf(pokemonId))
    : favoritesCurrent.push(pokemonId);

  emit("select-favorites", favoritesCurrent);
};
</script>

<template>
  <section class="pokemon-grid">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :favorite="favorites.includes(pokemon.id)"
      @click-favorite="onFavorite(pokemon.id)"
      @click="() => emit('select-pokemon', pokemon.name)"
    />
  </section>
</template>

<style scoped>
.pokemon-grid {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

  gap: 20px;
}
</style>
