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
  <section class="list">
    <PokemonCard
      class="list__card"
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
.list {
  gap: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.list__card {
  width: 330px;
  height: 110px;
}
</style>
