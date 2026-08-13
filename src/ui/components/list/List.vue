<script setup lang="ts">
import { ref } from "vue";
import PokemonCard from "../card/Card.vue";

defineProps<{
  pokemons: Pokemon[];
}>();

const favorites = ref([]);
const emit = defineEmits<{
  favorites: [];
}>();

const onFavorite = (pokemonId: number) => {
  favorites.value.includes(pokemonId)
    ? (favorites.value = favorites.value.filter((id) => id !== pokemonId))
    : favorites.value.push(pokemonId);
  emit("favorites", favorites.value);
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
