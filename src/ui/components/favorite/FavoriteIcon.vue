<script setup lang="ts">
import PokeHeart from "../../../assets/icons/PokeHeartOnly.svg";
import PokeHeartActive from "../../../assets/icons/HeartSolid.svg";
defineProps<{
  favorite?: boolean;
}>();
</script>

<template>
  <img
    class="favorite-icon"
    :src="favorite ? PokeHeartActive : PokeHeart"
    alt="PokeHeartActive"
  />
</template>
<style scoped>
.favorite-icon {
  width: 28px;
  height: 28px;
}
</style>
