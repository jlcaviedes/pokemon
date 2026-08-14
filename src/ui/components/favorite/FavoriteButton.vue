<script setup lang="ts">
import PokeHeart from "../../../assets/icons/PokeHeart.svg";
import PokeHeartActive from "../../../assets/icons/PokeHeartActive.svg";
defineProps<{
  favorite?: boolean;
}>();
</script>

<template>
  <button
    class="favorite-button"
    :class="{ active: favorite }"
    type="button"
    aria-label="Agregar a favoritos"
  >
    <img :src="favorite ? PokeHeartActive : PokeHeart" alt="PokeHeartActive" />
  </button>
</template>
<style scoped>
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
</style>
