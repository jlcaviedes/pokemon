<script setup lang="ts">
import type { Pokemon } from "../../../core/pokemon/pokemon.types";
import FavoriteButton from "../favorite/FavoriteButton.vue";
import TypeTag from "../type-tag/TypeTag.vue";
defineProps<{
  pokemon: Pokemon;
  favorite?: boolean;
}>();

const emit = defineEmits();

const toggleFavorite = () => {
  emit("click-favorite");
};
</script>

<template>
  <article :class="`card bg-${pokemon.types[0]}`">
    <div class="pokemon-image" :class="`bg-${pokemon.types[0]}-dark`">
      <div class="card__container-favorite">
        <FavoriteButton :favorite="favorite" @click.stop="toggleFavorite" />
      </div>
      <img :src="pokemon.image" :alt="pokemon.name" />
    </div>

    <div class="info">
      <span class="id"> Nº{{ pokemon.id.toString().padStart(3, "0") }} </span>

      <h2>
        {{ pokemon.name }}
      </h2>
      <div class="pokemon-types">
        <TypeTag
          v-for="type in pokemon.types"
          :key="type"
          class="type-tag"
          :type="type"
        >
        </TypeTag>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  overflow: hidden;

  border-radius: 16px;
  border: 1px solid #e5e5e5;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 10%);
}

.pokemon-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1;

  padding: 8px;
  border-radius: 16px;
}

.pokemon-image img {
  width: 80%;
  height: 80%;

  object-fit: contain;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
}

.id {
  display: block;
  color: #424242;
  font-size: 12px;
  font-weight: 600;
}

.info h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  text-transform: capitalize;
}

.card__container-favorite {
  position: absolute;
  width: 100%;
  height: 0px;
  display: flex;
  top: 4px;
  right: 4px;
  justify-content: flex-end;
}

.pokemon-types {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin-top: 4px;
}
</style>
