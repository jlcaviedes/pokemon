<script setup lang="ts">
import type { Pokemon } from "../../../core/pokemon/pokemon.types";

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
  <article class="pokemon-card">
    <div class="pokemon-card__container-favorite">
      <button
        class="favorite-button"
        :class="{ active: favorite }"
        type="button"
        aria-label="Agregar a favoritos"
        @click.stop="toggleFavorite"
      >
        ♥
      </button>
    </div>
    <div class="pokemon-image">
      <img :src="pokemon.image" :alt="pokemon.name" />
    </div>

    <div class="pokemon-info">
      <span class="pokemon-id">
        No{{ pokemon.id.toString().padStart(3, "0") }}
      </span>

      <h2>
        {{ pokemon.name }}
      </h2>
      <div class="pokemon-types">
        <span
          v-for="type in pokemon.types"
          :key="type"
          class="type-tag"
          :class="`type-${type}`"
        >
          {{ type }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  background: #ffffff;

  border-radius: 16px;
  border: 1px solid #e5e5e5;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.pokemon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 10%);
}

.pokemon-image {
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1;

  background: #f5f5f5;
}

.pokemon-image img {
  width: 80%;
  height: 80%;

  object-fit: contain;
}

.pokemon-info {
  padding: 16px;
}

.pokemon-id {
  display: block;

  margin-bottom: 4px;

  color: #888;

  font-size: 13px;
  font-weight: 600;
}

.pokemon-info h2 {
  margin: 0;

  font-size: 18px;
  font-weight: 700;

  text-transform: capitalize;
}

.pokemon-card__container-favorite {
  position: relative;
  width: 100%;
  height: 0px;
}

.favorite-button {
  position: absolute;

  top: 12px;
  right: 12px;

  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;

  background: white;

  color: #aaa;

  font-size: 20px;

  cursor: pointer;

  z-index: 2;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.1);
}

.favorite-button.active {
  color: #e63946;
}

.pokemon-types {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.type-tag {
  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  text-transform: capitalize;

  background: #eee;
}
</style>
